let lastNearbyResults = [];
let toastTimer;

const useLocationButton = document.querySelector("#useLocation");
const nearbyCategory = document.querySelector("#nearbyCategory");
const nearbyRadius = document.querySelector("#nearbyRadius");
const locationStatus = document.querySelector("#locationStatus");
const nearbyResults = document.querySelector("#nearbyResults");
const exportNearby = document.querySelector("#exportNearby");
const toast = document.querySelector("#toast");

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
  try {
    const position = await getBrowserPosition();
    const { latitude, longitude } = position.coords;
    locationStatus.textContent = "Location approved. Searching mapped businesses nearby.";
    useLocationButton.textContent = "Searching...";
    lastNearbyResults = await fetchNearbyCompanies(latitude, longitude);
    renderNearbyResults(lastNearbyResults);
    locationStatus.textContent = `${lastNearbyResults.length} businesses found within ${nearbyRadius.selectedOptions[0].textContent}.`;
    showToast("Nearby business search complete");
  } catch (error) {
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
