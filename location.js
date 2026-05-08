let lastNearbyResults = [];
let toastTimer;
let progressTimer;
let progressIndex = 0;

const useLocationButton = document.querySelector("#useLocation");
const nearbyCategory = document.querySelector("#nearbyCategory");
const nearbyRadius = document.querySelector("#nearbyRadius");
const locationStatus = document.querySelector("#locationStatus");
const nearbyResults = document.querySelector("#nearbyResults");
const exportNearby = document.querySelector("#exportNearby");
const toast = document.querySelector("#toast");
const searchProgress = document.querySelector("#searchProgress");
const progressTitle = document.querySelector("#progressTitle");
const progressTip = document.querySelector("#progressTip");
const progressBar = document.querySelector("#progressBar");
const askForm = document.querySelector("#askForm");
const askInput = document.querySelector("#askInput");
const askChat = document.querySelector("#askChat");

const progressSteps = [
  ["Checking permission", "Tip: tighter categories return cleaner lists for bigger radius scans.", 14],
  ["Reading location", "Yayzar only uses the coordinates for this search. Nothing is saved by the static site.", 28],
  ["Opening map index", "Pulling business records from OpenStreetMap place data.", 43],
  ["Filtering companies", "Prioritizing named places with useful business signals like category, website, or phone.", 61],
  ["Measuring distance", "Sorting records by proximity so the closest opportunities show first.", 78],
  ["Almost done", "Packaging the results into a clean prospecting view.", 92],
];

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function csvEscape(value) {
  const string = String(value ?? "");
  return /[",\n]/.test(string) ? `"${string.replaceAll('"', '""')}"` : string;
}

function cleanUrl(value) {
  if (!value) return "";
  try {
    const url = new URL(value.startsWith("http") ? value : `https://${value}`);
    return ["http:", "https:"].includes(url.protocol) ? url.href : "";
  } catch {
    return "";
  }
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}

function setProgressStep(index) {
  const [title, tip, width] = progressSteps[Math.min(index, progressSteps.length - 1)];
  progressTitle.textContent = title;
  progressTip.textContent = tip;
  progressBar.style.width = `${width}%`;
}

function startSearchProgress() {
  clearInterval(progressTimer);
  progressIndex = 0;
  searchProgress.classList.add("active");
  searchProgress.setAttribute("aria-hidden", "false");
  setProgressStep(progressIndex);
  progressTimer = setInterval(() => {
    progressIndex = Math.min(progressIndex + 1, progressSteps.length - 1);
    setProgressStep(progressIndex);
  }, 1050);
}

function finishSearchProgress(message = "Search complete") {
  clearInterval(progressTimer);
  progressTitle.textContent = message;
  progressTip.textContent = "Ask Yayzar can now analyze these results for outreach, categories, and next steps.";
  progressBar.style.width = "100%";
  setTimeout(() => {
    searchProgress.classList.remove("active");
    searchProgress.setAttribute("aria-hidden", "true");
  }, 1600);
}

function milesFromMeters(meters) {
  return (meters / 1609.344).toFixed(meters < 1609 ? 2 : 1);
}

function getDistanceMeters(lat1, lon1, lat2, lon2) {
  const earthRadius = 6371000;
  const toRadians = (degree) => (degree * Math.PI) / 180;
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) ** 2;
  return earthRadius * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function getPlaceCategory(tags = {}) {
  if (tags.office) return tags.office.replaceAll("_", " ");
  if (tags.shop) return `${tags.shop.replaceAll("_", " ")} retail`;
  if (tags.amenity) return tags.amenity.replaceAll("_", " ");
  if (tags.tourism) return tags.tourism.replaceAll("_", " ");
  if (tags.craft) return tags.craft.replaceAll("_", " ");
  return "local business";
}

function getCategoryQuery(category, radius, latitude, longitude) {
  const base = `[out:json][timeout:35];(`;
  const close = `);out center tags 100;`;
  const around = `(around:${radius},${latitude},${longitude})`;
  const select = (filters) => `node${around}${filters};way${around}${filters};relation${around}${filters};`;
  const queries = {
    office: `${select('["name"]["office"]')}${select('["name"]["craft"]')}`,
    retail: `${select('["name"]["shop"]')}${select('["name"]["amenity"~"bank|pharmacy|clinic|dentist"]')}`,
    food: select('["name"]["amenity"~"restaurant|cafe|bar|fast_food|pub"]'),
    health: `${select('["name"]["amenity"~"clinic|dentist|doctors|pharmacy|hospital"]')}${select('["name"]["healthcare"]')}`,
    all: `${select('["name"]["office"]')}${select('["name"]["shop"]')}${select('["name"]["craft"]')}${select('["name"]["tourism"="hotel"]')}${select('["name"]["amenity"~"restaurant|cafe|bar|bank|clinic|dentist|doctors|pharmacy|coworking_space|fast_food|pub"]')}`,
  };
  return `${base}${queries[category] || queries.all}${close}`;
}

function normalizeNearbyElements(elements, latitude, longitude) {
  const seen = new Set();
  return elements
    .map((element) => {
      const lat = element.lat ?? element.center?.lat;
      const lon = element.lon ?? element.center?.lon;
      const tags = element.tags || {};
      const name = tags.name?.trim();
      if (lat == null || lon == null || !name || seen.has(name.toLowerCase())) return null;
      seen.add(name.toLowerCase());
      const distance = getDistanceMeters(latitude, longitude, lat, lon);
      return {
        id: `${element.type}-${element.id}`,
        name,
        category: getPlaceCategory(tags),
        address: [tags["addr:housenumber"], tags["addr:street"], tags["addr:city"]].filter(Boolean).join(" ") || "Address not listed",
        website: cleanUrl(tags.website || tags["contact:website"]),
        phone: tags.phone || tags["contact:phone"] || "",
        distance,
        mapsUrl: `https://www.openstreetmap.org/${element.type}/${element.id}`,
      };
    })
    .filter(Boolean)
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 100);
}

function renderNearbyResults(places) {
  exportNearby.disabled = !places.length;
  if (!places.length) {
    nearbyResults.innerHTML = `
      <article class="nearby-empty">
        <strong>No nearby companies found</strong>
        <span>Try a larger radius or a broader category.</span>
      </article>
    `;
    return;
  }

  nearbyResults.innerHTML = places
    .map(
      (place) => `
        <article class="nearby-card">
          <header>
            <div>
              <h3>${escapeHtml(place.name)}</h3>
              <small>${escapeHtml(place.category)}</small>
            </div>
            <span class="nearby-pill">${milesFromMeters(place.distance)} mi</span>
          </header>
          <p>${escapeHtml(place.address)}</p>
          <footer>
            <a class="primary-button small" href="${place.mapsUrl}" target="_blank" rel="noreferrer">Map record</a>
            ${place.website ? `<a class="secondary-button small" href="${escapeHtml(place.website)}" target="_blank" rel="noreferrer">Website</a>` : ""}
            ${place.phone ? `<span class="nearby-pill">${escapeHtml(place.phone)}</span>` : ""}
          </footer>
        </article>
      `,
    )
    .join("");
}

function addChatMessage(role, text) {
  const message = document.createElement("div");
  message.className = role === "user" ? "user-message" : "agent-message";
  message.innerHTML = `<strong>${role === "user" ? "You" : "Yayzar"}</strong><p>${escapeHtml(text)}</p>`;
  askChat.appendChild(message);
  askChat.scrollTop = askChat.scrollHeight;
}

function summarizeCategories(results) {
  const counts = results.reduce((map, place) => {
    map.set(place.category, (map.get(place.category) || 0) + 1);
    return map;
  }, new Map());
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([category, count]) => `${category}: ${count}`)
    .join(", ");
}

function formatPlace(place, index) {
  const website = place.website ? "website listed" : "no website listed";
  return `${index + 1}. ${place.name} (${place.category}, ${milesFromMeters(place.distance)} mi, ${website})`;
}

function answerQuestion(question) {
  const text = question.toLowerCase();
  const results = lastNearbyResults;

  if (!results.length) {
    return "Run a location search first, then I can rank nearby businesses, summarize categories, find websites, and suggest what to contact first.";
  }

  const namedMatch = results.find((place) => text.includes(place.name.toLowerCase()));
  if (namedMatch) {
    return `${namedMatch.name} is listed as ${namedMatch.category}, about ${milesFromMeters(namedMatch.distance)} miles away. Address: ${namedMatch.address}. ${namedMatch.website ? `Website: ${namedMatch.website}` : "No website is listed in the map record, so I would verify it manually before outreach."}`;
  }

  if (text.includes("closest") || text.includes("near") || text.includes("nearest")) {
    return `Closest matches: ${results.slice(0, 5).map(formatPlace).join(" ")}`;
  }

  if (text.includes("website") || text.includes("site")) {
    const withWebsites = results.filter((place) => place.website).slice(0, 6);
    if (!withWebsites.length) return "I do not see websites in this result set. Try a larger radius or a different category, then verify the best accounts manually.";
    return `Businesses with websites: ${withWebsites.map(formatPlace).join(" ")}`;
  }

  if (text.includes("contact") || text.includes("first") || text.includes("best") || text.includes("priority")) {
    const ranked = [...results]
      .sort((a, b) => (b.website ? 1 : 0) - (a.website ? 1 : 0) || a.distance - b.distance)
      .slice(0, 5);
    return `I would start with these because they are close and easier to verify: ${ranked.map(formatPlace).join(" ")} Use a short opener based on location, category, and one visible business detail.`;
  }

  if (text.includes("category") || text.includes("types") || text.includes("industries")) {
    return `Category mix: ${summarizeCategories(results)}. This helps you decide whether to target one segment or split the export into separate outreach lists.`;
  }

  if (text.includes("summary") || text.includes("summarize") || text.includes("overview")) {
    const closest = results[0];
    return `This scan found ${results.length} businesses within ${nearbyRadius.selectedOptions[0].textContent}. The closest is ${closest.name} at ${milesFromMeters(closest.distance)} miles. Category mix: ${summarizeCategories(results)}. ${results.filter((place) => place.website).length} records include websites.`;
  }

  if (text.includes("export") || text.includes("csv")) {
    return "Press Export results to download a CSV with name, category, distance, address, phone, website, and OpenStreetMap URL. I would export after narrowing category and radius so the file is more useful.";
  }

  return `I can help with this result set. I see ${results.length} businesses. Try asking “which are closest,” “which have websites,” “what should I contact first,” “summarize this search,” or mention a business name from the list.`;
}

async function fetchNearbyCompanies(latitude, longitude) {
  const query = getCategoryQuery(nearbyCategory.value, nearbyRadius.value, latitude, longitude);
  const url = `https://overpass-api.de/api/interpreter?${new URLSearchParams({ data: query })}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Location server returned ${response.status}. Try a smaller radius or narrower category.`);
  const data = await response.json();
  return normalizeNearbyElements(data.elements || [], latitude, longitude);
}

function getBrowserPosition() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Your browser does not support location access."));
      return;
    }
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
      timeout: 12000,
      maximumAge: 60000,
    });
  });
}

async function runNearbySearch() {
  useLocationButton.disabled = true;
  useLocationButton.textContent = "Finding location...";
  locationStatus.textContent = "Asking the browser for location permission.";
  startSearchProgress();
  try {
    const position = await getBrowserPosition();
    const { latitude, longitude } = position.coords;
    locationStatus.textContent = "Location approved. Searching mapped businesses nearby.";
    useLocationButton.textContent = "Searching...";
    lastNearbyResults = await fetchNearbyCompanies(latitude, longitude);
    renderNearbyResults(lastNearbyResults);
    locationStatus.textContent = `${lastNearbyResults.length} businesses found within ${nearbyRadius.selectedOptions[0].textContent}.`;
    finishSearchProgress("Results ready");
    addChatMessage("agent", `I found ${lastNearbyResults.length} businesses. Ask me which ones are closest, which have websites, or what to contact first.`);
    showToast("Nearby business search complete");
  } catch (error) {
    clearInterval(progressTimer);
    searchProgress.classList.remove("active");
    searchProgress.setAttribute("aria-hidden", "true");
    lastNearbyResults = [];
    renderNearbyResults([]);
    locationStatus.textContent = error.message.includes("denied") ? "Location permission was denied. Allow location access and try again." : error.message;
    showToast("Location search could not complete");
  } finally {
    useLocationButton.disabled = false;
    useLocationButton.textContent = "Use my location";
  }
}

function exportResults() {
  const header = ["name", "category", "distance_miles", "address", "phone", "website", "map_url"];
  const rows = lastNearbyResults.map((place) =>
    [place.name, place.category, milesFromMeters(place.distance), place.address, place.phone, place.website, place.mapsUrl].map(csvEscape).join(","),
  );
  const blob = new Blob([[header.join(","), ...rows].join("\n")], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "yayzar-nearby-businesses.csv";
  link.click();
  URL.revokeObjectURL(url);
  showToast("Nearby businesses exported");
}

useLocationButton.addEventListener("click", runNearbySearch);
exportNearby.addEventListener("click", exportResults);

askForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const question = askInput.value.trim();
  if (!question) return;
  addChatMessage("user", question);
  askInput.value = "";
  setTimeout(() => addChatMessage("agent", answerQuestion(question)), 280);
});

document.querySelectorAll("[data-question]").forEach((button) => {
  button.addEventListener("click", () => {
    askInput.value = button.dataset.question;
    askForm.requestSubmit();
  });
});
