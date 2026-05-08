const prospects = [
  {
    account: "Adobe",
    industry: "Creative and enterprise software",
    area: "Downtown",
    source: "Salesforce",
    fit: 84,
    intent: "hot",
    owner: "Ava",
    summary:
      "Adobe is a San Jose-headquartered software company with FY2025 revenue of $23.77B and total ARR exiting the year at $25.20B. The account is a strong fit for AI-assisted sales intelligence because its public reporting emphasizes AI-driven product adoption and enterprise workflows.",
    signals: ["FY2025 revenue reported at $23.77B", "Total Adobe ARR exited FY2025 at $25.20B", "Public AI adoption narrative is active"],
  },
  {
    account: "Cisco",
    industry: "Networking and AI infrastructure",
    area: "North San Jose",
    source: "HubSpot",
    fit: 82,
    intent: "warm",
    owner: "Milo",
    summary:
      "Cisco is headquartered in San Jose and reported FY2025 revenue of $56.7B. Its public earnings highlighted more than $2B in FY2025 AI infrastructure orders from webscale customers, making pipeline visibility and account routing realistic GTM themes.",
    signals: ["FY2025 revenue reported at $56.7B", "AI infrastructure orders exceeded $2B", "Complex enterprise account motion"],
  },
  {
    account: "eBay",
    industry: "Global marketplace",
    area: "North San Jose",
    source: "HubSpot",
    fit: 76,
    intent: "warm",
    owner: "Jules",
    summary:
      "eBay is based at 2025 Hamilton Avenue in San Jose. Public 2025 results show $11.1B in revenue, $79.6B in GMV, and 12,300 employees, making it a believable account for marketplace, ads, and account expansion workflows.",
    signals: ["FY2025 revenue reported at $11.1B", "FY2025 GMV reported at $79.6B", "12,300 employees reported for 2025"],
  },
  {
    account: "Roku",
    industry: "Streaming and advertising platform",
    area: "San Jose",
    source: "Salesforce",
    fit: 69,
    intent: "risk",
    owner: "Nia",
    summary:
      "Roku is headquartered in San Jose. Public metrics show 145.6B hours streamed in FY2025 and 89.8M active accounts in FY2024, making it useful for an advertiser-facing sales intelligence sample with high-volume engagement context.",
    signals: ["FY2025 hours streamed reported at 145.6B", "FY2024 active accounts reported at 89.8M", "Advertising platform motion"],
  },
  {
    account: "Zoom",
    industry: "Enterprise collaboration",
    area: "Downtown",
    source: "HubSpot",
    fit: 78,
    intent: "hot",
    owner: "Theo",
    summary:
      "Zoom is headquartered in San Jose and reported FY2025 revenue of $4.665B, including $2.754B in enterprise revenue. The account is a credible fit for secure integrations, AI productivity positioning, and enterprise sequence analytics.",
    signals: ["FY2025 revenue reported at $4.665B", "Enterprise revenue reported at $2.754B", "AI collaboration workflow relevance"],
  },
  {
    account: "Bloom Energy",
    industry: "Clean energy systems",
    area: "North San Jose",
    source: "Salesforce",
    fit: 79,
    intent: "warm",
    owner: "Rhea",
    summary:
      "Bloom Energy is listed by the San Jose Chamber with a North First Street San Jose address. It is a strong local account for energy, facilities, and enterprise operations workflows.",
    signals: ["Chamber-listed technology account", "4353 North First St. listed address", "Clean energy systems category"],
  },
  {
    account: "Accelx Inc (AccelEye)",
    industry: "Security software",
    area: "Midtown",
    source: "HubSpot",
    fit: 74,
    intent: "hot",
    owner: "Ava",
    summary:
      "AccelEye is a San Jose Chamber-listed software and security company. Its profile describes AI-assisted threat detection, which makes it a relevant account for security-minded CRM and alert workflows.",
    signals: ["Chamber-listed software company", "447 Downing Ave. listed address", "Security and alerting relevance"],
  },
  {
    account: "BC Networks",
    industry: "IT services and networking",
    area: "North San Jose",
    source: "Salesforce",
    fit: 71,
    intent: "warm",
    owner: "Milo",
    summary:
      "BC Networks is listed in the San Jose Chamber technology directory with an address on Technology Drive. It is a practical local account for IT services, networking, and managed operations motions.",
    signals: ["Chamber technology listing", "1735 Technology Drive listed address", "IT services category"],
  },
  {
    account: "RobotLAB San Jose",
    industry: "Robotics education and automation",
    area: "San Jose",
    source: "HubSpot",
    fit: 72,
    intent: "warm",
    owner: "Jules",
    summary:
      "RobotLAB San Jose appears in the San Jose Chamber technology results. The account fits robotics, education, and automation outreach plays.",
    signals: ["Chamber technology listing", "Robotics category", "Local San Jose market fit"],
  },
  {
    account: "Syvatech",
    industry: "Software consulting",
    area: "San Jose",
    source: "Salesforce",
    fit: 63,
    intent: "warm",
    owner: "Nia",
    summary:
      "Syvatech is listed in the San Jose Chamber technology directory as software and consulting. It is useful as a smaller B2B account in the local scan set.",
    signals: ["Chamber technology listing", "Software and consultants category", "Mid-market routing candidate"],
  },
  {
    account: "Veltec Networks",
    industry: "IT services",
    area: "San Jose",
    source: "HubSpot",
    fit: 61,
    intent: "risk",
    owner: "Theo",
    summary:
      "Veltec Networks is listed by the San Jose Chamber under IT services and professional business services. The account needs enrichment before outbound prioritization.",
    signals: ["Chamber technology listing", "IT services category", "Additional enrichment recommended"],
  },
  {
    account: "Quantum Vision Consulting",
    industry: "Digital marketing and IT consulting",
    area: "San Jose",
    source: "Salesforce",
    fit: 58,
    intent: "risk",
    owner: "Rhea",
    summary:
      "Quantum Vision Consulting appears in the Chamber technology directory. It is a smaller account with consulting and software tags, so the workflow flags it for qualification.",
    signals: ["Chamber listing", "Consulting and software category", "Qualification needed"],
  },
  {
    account: "NextFlex",
    industry: "Advanced manufacturing hardware",
    area: "San Jose",
    source: "HubSpot",
    fit: 70,
    intent: "warm",
    owner: "Ava",
    summary:
      "NextFlex appears in the Chamber technology directory under hardware. It adds manufacturing and hardware diversity to the San Jose scan set.",
    signals: ["Chamber technology listing", "Hardware category", "Advanced manufacturing relevance"],
  },
  {
    account: "SensTek",
    industry: "Hardware technology",
    area: "San Jose",
    source: "Salesforce",
    fit: 66,
    intent: "warm",
    owner: "Milo",
    summary:
      "SensTek is listed in the San Jose Chamber technology results under hardware and technology. It is a useful account for technical buyer segmentation.",
    signals: ["Chamber technology listing", "Hardware category", "Technical buyer segment"],
  },
  {
    account: "Sidely",
    industry: "Civic technology software",
    area: "San Jose",
    source: "HubSpot",
    fit: 68,
    intent: "warm",
    owner: "Jules",
    summary:
      "Sidely is listed by the San Jose Chamber as a software company with a civic and local economic development angle. It is a strong fit for local-market account intelligence.",
    signals: ["Chamber software listing", "Civic technology positioning", "Local economic development relevance"],
  },
  {
    account: "Journies.ai",
    industry: "AI and hospitality software",
    area: "San Jose",
    source: "Salesforce",
    fit: 67,
    intent: "warm",
    owner: "Nia",
    summary:
      "Journies.ai appears in the Chamber technology directory with artificial intelligence and software context. It is a relevant local software account for AI workflow demos.",
    signals: ["Chamber software listing", "Artificial intelligence category", "Hospitality software context"],
  },
  {
    account: "Mesa Security",
    industry: "Security software",
    area: "San Jose",
    source: "HubSpot",
    fit: 65,
    intent: "risk",
    owner: "Theo",
    summary:
      "Mesa Security is listed in the Chamber technology directory under software and technology. The account is scored as a watch item until stronger engagement appears.",
    signals: ["Chamber technology listing", "Security software category", "Watch status"],
  },
  {
    account: "California Low Voltage",
    industry: "Low voltage and IT infrastructure",
    area: "San Jose",
    source: "Salesforce",
    fit: 60,
    intent: "risk",
    owner: "Rhea",
    summary:
      "California Low Voltage appears in the Chamber directory with contractor, electronics, and IT service categories. It is a service-oriented account for local infrastructure routing.",
    signals: ["Chamber directory listing", "IT services and electronics category", "Local infrastructure motion"],
  },
  {
    account: "The Network Installers",
    industry: "Networking and cabling",
    area: "Downtown",
    source: "HubSpot",
    fit: 62,
    intent: "warm",
    owner: "Ava",
    summary:
      "The Network Installers is listed in SanJose.com networking results with a Downtown San Jose address. It is a practical small-business account for infrastructure and services workflows.",
    signals: ["SanJose.com networking listing", "75 E Santa Clara St. listed address", "Network installation category"],
  },
  {
    account: "Clearstreme Technologies",
    industry: "Technology services",
    area: "Downtown",
    source: "Salesforce",
    fit: 64,
    intent: "warm",
    owner: "Milo",
    summary:
      "Clearstreme Technologies appears in the Downtown San Jose directory. It provides a smaller downtown technology account for area-based scanning.",
    signals: ["Downtown directory listing", "46 W Julian St. listed address", "Technology services context"],
  },
  {
    account: "Client One",
    industry: "Professional services",
    area: "Downtown",
    source: "HubSpot",
    fit: 57,
    intent: "risk",
    owner: "Jules",
    summary:
      "Client One is listed in the Downtown San Jose directory. It is included as a lighter-fit professional services account for qualification scanning.",
    signals: ["Downtown directory listing", "257 N 1st St. listed address", "Qualification required"],
  },
  {
    account: "Clubzz",
    industry: "Local services",
    area: "Downtown",
    source: "Salesforce",
    fit: 52,
    intent: "risk",
    owner: "Nia",
    summary:
      "Clubzz is listed in the Downtown San Jose directory. It broadens the sample beyond technology and shows how lower-fit local records remain visible but not over-prioritized.",
    signals: ["Downtown directory listing", "2 N 1st St. listed address", "Lower-fit local record"],
  },
  {
    account: "Academic Coffee",
    industry: "Coffee and retail",
    area: "Downtown",
    source: "HubSpot",
    fit: 55,
    intent: "warm",
    owner: "Theo",
    summary:
      "Academic Coffee is a featured Downtown San Jose business. It demonstrates how local retail accounts can be scanned and routed without pretending they are enterprise software buyers.",
    signals: ["Downtown directory featured business", "Local retail segment", "Area-based scan record"],
  },
  {
    account: "San Jose Brew Bike",
    industry: "Experiences and events",
    area: "Downtown",
    source: "Salesforce",
    fit: 54,
    intent: "warm",
    owner: "Rhea",
    summary:
      "San Jose Brew Bike is listed as a featured downtown business. It adds event and experience context to the local account universe.",
    signals: ["Downtown featured business", "Events and experiences segment", "Local outreach candidate"],
  },
  {
    account: "Stage One Creative Spaces",
    industry: "Creative spaces",
    area: "Downtown",
    source: "HubSpot",
    fit: 56,
    intent: "warm",
    owner: "Ava",
    summary:
      "Stage One Creative Spaces appears as a featured downtown business. It is a useful local account for creative and venue-based segmentation.",
    signals: ["Downtown featured business", "Creative space segment", "Location-based account"],
  },
  {
    account: "New Ballet",
    industry: "Arts organization",
    area: "Downtown",
    source: "Salesforce",
    fit: 50,
    intent: "risk",
    owner: "Milo",
    summary:
      "New Ballet is listed as a featured downtown organization. It is included as a lower-commercial-fit local account to show realistic mixed-market scanning.",
    signals: ["Downtown featured organization", "Arts and culture segment", "Lower commercial fit"],
  },
  {
    account: "Good Karma Artisan Ales + Cafe",
    industry: "Restaurant and cafe",
    area: "Downtown",
    source: "HubSpot",
    fit: 53,
    intent: "warm",
    owner: "Jules",
    summary:
      "Good Karma Artisan Ales + Cafe is listed in the Downtown San Jose directory with a South First Street address. It represents restaurant and cafe records in the scan set.",
    signals: ["Downtown directory listing", "37 S 1st St. listed address", "Restaurant and cafe segment"],
  },
  {
    account: "Good Spot",
    industry: "Local hospitality",
    area: "SoFA",
    source: "Salesforce",
    fit: 52,
    intent: "warm",
    owner: "Nia",
    summary:
      "Good Spot appears in the Downtown San Jose directory with a South First Street address. It is included for SoFA-area hospitality scanning.",
    signals: ["Downtown directory listing", "386 S 1st St. listed address", "SoFA area record"],
  },
  {
    account: "Goodtime Bar",
    industry: "Hospitality",
    area: "Downtown",
    source: "HubSpot",
    fit: 51,
    intent: "risk",
    owner: "Theo",
    summary:
      "Goodtime Bar is listed in the Downtown San Jose directory. It adds nightlife and hospitality context to a realistic local-market dataset.",
    signals: ["Downtown directory listing", "Fountain Alley listed address", "Hospitality segment"],
  },
  {
    account: "Grace Deli & Cafe",
    industry: "Food service",
    area: "Downtown",
    source: "Salesforce",
    fit: 49,
    intent: "risk",
    owner: "Rhea",
    summary:
      "Grace Deli & Cafe is listed in the Downtown San Jose directory with an Almaden Boulevard address. It is a local food service record for area scans.",
    signals: ["Downtown directory listing", "303 Almaden Blvd listed address", "Food service segment"],
  },
  {
    account: "Gray Area Marketing",
    industry: "Marketing services",
    area: "Downtown",
    source: "HubSpot",
    fit: 59,
    intent: "warm",
    owner: "Ava",
    summary:
      "Gray Area Marketing appears in the Downtown San Jose directory. It is a small services account with relevant outreach and campaign operations context.",
    signals: ["Downtown directory listing", "Marketing services context", "Service-firm account"],
  },
  {
    account: "Good Karma Bikes",
    industry: "Retail and nonprofit services",
    area: "Willow Glen",
    source: "Salesforce",
    fit: 48,
    intent: "risk",
    owner: "Milo",
    summary:
      "Good Karma Bikes is listed in the Downtown San Jose directory with a Lincoln Avenue address. It is included as a local retail and nonprofit-oriented record.",
    signals: ["Downtown directory listing", "460 Lincoln Ave listed address", "Retail and nonprofit segment"],
  },
  {
    account: "Xactly",
    industry: "Sales performance software",
    area: "Downtown",
    source: "HubSpot",
    fit: 77,
    intent: "hot",
    owner: "Jules",
    summary:
      "The City of San Jose downtown business district page lists Xactly among companies that thrive downtown. It is a very relevant account for sales operations and revenue intelligence positioning.",
    signals: ["City downtown company reference", "Sales performance software", "High product relevance"],
  },
  {
    account: "Pinger",
    industry: "Communications software",
    area: "Downtown",
    source: "Salesforce",
    fit: 73,
    intent: "warm",
    owner: "Nia",
    summary:
      "The City of San Jose downtown page lists Pinger among downtown companies. It fits communications, customer engagement, and sales workflow use cases.",
    signals: ["City downtown company reference", "Communications software", "Engagement workflow fit"],
  },
  {
    account: "NeuroSky",
    industry: "Biosensor technology",
    area: "Downtown",
    source: "HubSpot",
    fit: 62,
    intent: "warm",
    owner: "Theo",
    summary:
      "The City of San Jose downtown page lists NeuroSky among downtown companies. It expands the dataset into biosensor hardware and specialized technology.",
    signals: ["City downtown company reference", "Biosensor technology", "Specialized tech account"],
  },
  {
    account: "Cohesity",
    industry: "Data security and management",
    area: "Downtown",
    source: "Salesforce",
    fit: 75,
    intent: "hot",
    owner: "Rhea",
    summary:
      "The City of San Jose downtown page lists Cohesity among downtown companies. It is a strong account for secure integrations, enterprise data, and workflow routing.",
    signals: ["City downtown company reference", "Data security category", "Enterprise workflow fit"],
  },
  {
    account: "Focus Bank",
    industry: "Banking",
    area: "Downtown",
    source: "HubSpot",
    fit: 60,
    intent: "warm",
    owner: "Ava",
    summary:
      "The City of San Jose downtown page lists Focus Bank among downtown companies. It adds a local financial-services account for security-focused sales motions.",
    signals: ["City downtown company reference", "Banking segment", "Security-led outreach fit"],
  },
  {
    account: "Heritage Bank",
    industry: "Banking",
    area: "Downtown",
    source: "Salesforce",
    fit: 59,
    intent: "warm",
    owner: "Milo",
    summary:
      "The City of San Jose downtown page lists Heritage Bank among downtown companies. It is useful for financial-services routing and compliance-aware messaging.",
    signals: ["City downtown company reference", "Banking segment", "Compliance-aware messaging"],
  },
  {
    account: "Mercury News",
    industry: "Media and publishing",
    area: "Downtown",
    source: "HubSpot",
    fit: 58,
    intent: "warm",
    owner: "Jules",
    summary:
      "The City of San Jose downtown page lists Mercury News among downtown companies. It provides a local media account for advertising and audience workflow examples.",
    signals: ["City downtown company reference", "Media segment", "Advertising workflow relevance"],
  },
  {
    account: "Orbit Design Agency",
    industry: "Design and web development",
    area: "Downtown",
    source: "Salesforce",
    fit: 57,
    intent: "warm",
    owner: "Nia",
    summary:
      "Orbit Design Agency appears in SanJose.com technology listings with a Park Avenue downtown address. It is a local creative services account for outreach segmentation.",
    signals: ["SanJose.com technology listing", "177 Park Avenue listed address", "Design and web segment"],
  },
  {
    account: "Level Up MSP",
    industry: "Managed IT support",
    area: "Midtown",
    source: "HubSpot",
    fit: 62,
    intent: "warm",
    owner: "Theo",
    summary:
      "Level Up MSP appears in SanJose.com technology listings with an Old Oakland Road address. It adds managed service provider context to the account center.",
    signals: ["SanJose.com technology listing", "1630 Old Oakland Rd. listed address", "Managed IT services segment"],
  },
  {
    account: "Los Gatos Design Studio",
    industry: "Web design and branding",
    area: "Willow Glen",
    source: "Salesforce",
    fit: 54,
    intent: "risk",
    owner: "Rhea",
    summary:
      "Los Gatos Design Studio appears in SanJose.com web development listings with a San Jose address. It is a small creative services account in the local scan pool.",
    signals: ["SanJose.com web development listing", "San Jose address listed", "Creative services segment"],
  },
];

const workflowSteps = [
  ["OAuth token refresh", "Validated HubSpot and Salesforce scopes"],
  ["Webhook intake", "Normalized contact, company, and deal events"],
  ["Record enrichment", "Filled firmographic, intent, and technographic fields"],
  ["LLM summarization", "Generated account brief and buying committee notes"],
  ["Classification", "Scored ICP fit, urgency, and routing priority"],
  ["Slack/email alert", "Sent owner-ready insight and next best action"],
];

const eventFeed = [
  ["Slack", "Adobe account brief routed to #enterprise-sdr"],
  ["Email", "Zoom outbound draft prepared for Theo"],
  ["Webhook", "Salesforce account update normalized"],
  ["Slack", "Cisco AI infrastructure signal detected"],
];

const chartSeries = {
  response: [8, 9, 10, 11, 12, 13, 13, 15, 16, 17, 18, 19],
  conversion: [2, 3, 3, 4, 5, 5, 6, 6, 7, 7, 8, 8],
};

let selectedProspect = prospects[0];
let activeFilter = "all";
let activeChart = "response";
let activeArea = "all";
let toastTimer;
let lastNearbyResults = [];

const table = document.querySelector("#prospectTable");
const searchInput = document.querySelector("#searchInput");
const threshold = document.querySelector("#fitThreshold");
const thresholdValue = document.querySelector("#thresholdValue");
const selectedAccount = document.querySelector("#selectedAccount");
const accountSummary = document.querySelector("#accountSummary");
const signalList = document.querySelector("#signalList");
const confidenceBadge = document.querySelector("#confidenceBadge");
const draftOutput = document.querySelector("#draftOutput");
const events = document.querySelector("#events");
const timeline = document.querySelector("#workflowTimeline");
const runState = document.querySelector("#runState");
const toast = document.querySelector("#toast");
const scanCount = document.querySelector("#scanCount");
const scanLabel = document.querySelector("#scanLabel");
const pricingPopover = document.querySelector("#pricingPopover");
const useLocationButton = document.querySelector("#useLocation");
const nearbyCategory = document.querySelector("#nearbyCategory");
const nearbyRadius = document.querySelector("#nearbyRadius");
const locationStatus = document.querySelector("#locationStatus");
const nearbyResults = document.querySelector("#nearbyResults");

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

function getVisibleProspects() {
  const query = searchInput.value.trim().toLowerCase();
  const minFit = Number(threshold.value);
  return prospects.filter((prospect) => {
    const matchesFilter = activeFilter === "all" || prospect.intent === activeFilter;
    const matchesArea = activeArea === "all" || prospect.area === activeArea;
    const matchesQuery = [prospect.account, prospect.industry, prospect.area, prospect.source, prospect.owner, ...prospect.signals]
      .join(" ")
      .toLowerCase()
      .includes(query);
    return matchesFilter && matchesArea && matchesQuery && prospect.fit >= minFit;
  });
}

function updateScanSummary(rows) {
  scanCount.textContent = rows.length;
  scanLabel.textContent = activeArea === "all" ? "accounts visible" : `${activeArea} accounts visible`;
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}

function setLocationStatus(message) {
  if (locationStatus) locationStatus.textContent = message;
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
  const base = `[out:json][timeout:25];(`;
  const close = `);out center tags 60;`;
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
        lat,
        lon,
        distance,
        mapsUrl: `https://www.openstreetmap.org/${element.type}/${element.id}`,
      };
    })
    .filter(Boolean)
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 18);
}

function nearbyPlaceToProspect(place, index) {
  const fit = Math.max(54, Math.min(88, 86 - Math.round(place.distance / 140) + (place.website ? 4 : 0)));
  return {
    account: place.name,
    industry: place.category,
    area: "Near me",
    source: "OpenStreetMap",
    fit,
    intent: fit >= 78 ? "hot" : fit >= 64 ? "warm" : "risk",
    owner: ["Ava", "Milo", "Jules", "Nia", "Theo", "Rhea"][index % 6],
    summary: `${place.name} is a nearby ${place.category} found about ${milesFromMeters(place.distance)} miles from the visitor's location. The record comes from OpenStreetMap place data and can be used as a real local account lead after verification.`,
    signals: [
      `${milesFromMeters(place.distance)} miles from visitor location`,
      place.address,
      place.website ? "Website listed in map record" : "Website not listed; manual enrichment recommended",
    ],
  };
}

function renderNearbyResults(places) {
  if (!nearbyResults) return;
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
      (place, index) => `
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
            <button class="primary-button small" data-nearby-index="${index}" type="button">Load account</button>
            <a class="secondary-button small" href="${place.mapsUrl}" target="_blank" rel="noreferrer">Map record</a>
            ${place.website ? `<a class="secondary-button small" href="${escapeHtml(place.website)}" target="_blank" rel="noreferrer">Website</a>` : ""}
          </footer>
        </article>
      `,
    )
    .join("");

  nearbyResults.querySelectorAll("[data-nearby-index]").forEach((button) => {
    button.addEventListener("click", () => {
      const place = lastNearbyResults[Number(button.dataset.nearbyIndex)];
      const prospect = nearbyPlaceToProspect(place, Number(button.dataset.nearbyIndex));
      prospects.unshift(prospect);
      activeArea = "Near me";
      document.querySelectorAll("#areaGrid button").forEach((item) => item.classList.remove("selected"));
      searchInput.value = "";
      threshold.value = "45";
      thresholdValue.textContent = "45";
      renderProspects();
      selectProspect(prospect, true);
      document.querySelector("#cockpit").scrollIntoView({ behavior: "smooth" });
    });
  });
}

async function fetchNearbyCompanies(latitude, longitude) {
  const radius = nearbyRadius.value;
  const category = nearbyCategory.value;
  const query = getCategoryQuery(category, radius, latitude, longitude);
  const url = `https://overpass-api.de/api/interpreter?${new URLSearchParams({ data: query })}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Location server returned ${response.status}`);
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
  setLocationStatus("Asking the browser for location permission.");
  try {
    const position = await getBrowserPosition();
    const { latitude, longitude } = position.coords;
    setLocationStatus("Location approved. Searching mapped businesses nearby.");
    useLocationButton.textContent = "Searching...";
    lastNearbyResults = await fetchNearbyCompanies(latitude, longitude);
    renderNearbyResults(lastNearbyResults);
    setLocationStatus(`${lastNearbyResults.length} nearby companies found from OpenStreetMap data.`);
    showToast("Nearby company search complete");
  } catch (error) {
    renderNearbyResults([]);
    setLocationStatus(error.message.includes("denied") ? "Location permission was denied. Allow location access and try again." : error.message);
    showToast("Location search could not complete");
  } finally {
    useLocationButton.disabled = false;
    useLocationButton.textContent = "Use my location";
  }
}

function openModal(name) {
  const modal = document.querySelector(`#${name}Modal`);
  if (!modal) return;
  document.querySelectorAll("dialog[open]").forEach((dialog) => {
    if (dialog !== modal) dialog.close();
  });
  pricingPopover.classList.remove("show");
  pricingPopover.setAttribute("aria-hidden", "true");
  modal.showModal();
}

function renderProspects() {
  const rows = getVisibleProspects();
  updateScanSummary(rows);

  table.innerHTML = `
    <div class="row header" role="row">
      <div>Account</div><div>Intent</div><div>Location</div><div>Fit</div><div>Action</div>
    </div>
  `;

  rows.forEach((prospect) => {
    const row = document.createElement("div");
    row.className = "row";
    row.setAttribute("role", "row");
    row.innerHTML = `
      <div class="account"><strong>${prospect.account}</strong><span>${prospect.industry} · ${prospect.area} · Owner ${prospect.owner}</span></div>
      <div class="tag-wrap"><span class="tag ${prospect.intent}">${prospect.intent}</span></div>
      <div class="source"><strong>${prospect.area}</strong><span>${prospect.source}</span></div>
      <div class="fit"><strong>${prospect.fit}%</strong><div class="score"><span style="width:${prospect.fit}%"></span></div></div>
      <button class="open-button" type="button">Open</button>
    `;
    row.querySelector("button").addEventListener("click", () => selectProspect(prospect, true));
    table.appendChild(row);
  });

  if (!rows.length) {
    const empty = document.createElement("div");
    empty.className = "row";
    empty.innerHTML = `<div class="account"><strong>No matching accounts</strong><span>Lower the threshold, change the area, or clear the search.</span></div>`;
    table.appendChild(empty);
  }
}

function selectProspect(prospect, announce = false) {
  selectedProspect = prospect;
  selectedAccount.textContent = prospect.account;
  confidenceBadge.textContent = `${prospect.fit}% fit`;
  accountSummary.textContent = prospect.summary;
  signalList.innerHTML = prospect.signals.map((signal) => `<div class="signal">${signal}</div>`).join("");
  draftOutput.textContent = "Select an account, then draft an outbound email.";
  if (announce) showToast(`${prospect.account} opened in account brief`);
}

function renderWorkflow(completed = 0) {
  timeline.innerHTML = workflowSteps
    .map(
      ([title, detail], index) => `
        <li class="${index < completed ? "done" : ""}">
          <span>${index < completed ? "✓" : index + 1}</span>
          <div><strong>${title}</strong><small>${detail}</small></div>
        </li>
      `,
    )
    .join("");
}

function renderEvents(extraEvent) {
  const feed = extraEvent ? [extraEvent, ...eventFeed] : eventFeed;
  events.innerHTML = feed
    .map(
      ([type, message], index) => `
        <div class="event">
          <strong>${type}: ${message}</strong>
          <time>${index + 2} min ago</time>
        </div>
      `,
    )
    .join("");
}

function drawChart() {
  const canvas = document.querySelector("#trendChart");
  const ctx = canvas.getContext("2d");
  const values = chartSeries[activeChart];
  const width = canvas.width;
  const height = canvas.height;
  const padding = 38;
  const max = Math.max(...values) + 8;

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#fdfbf6";
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = "#e5dfd2";
  ctx.lineWidth = 1;
  for (let i = 0; i < 5; i += 1) {
    const y = padding + ((height - padding * 2) / 4) * i;
    ctx.beginPath();
    ctx.moveTo(padding, y);
    ctx.lineTo(width - padding, y);
    ctx.stroke();
  }

  const points = values.map((value, index) => {
    const x = padding + ((width - padding * 2) / (values.length - 1)) * index;
    const y = height - padding - (value / max) * (height - padding * 2);
    return [x, y];
  });

  const gradient = ctx.createLinearGradient(0, padding, 0, height - padding);
  gradient.addColorStop(0, activeChart === "response" ? "rgba(17, 17, 17, 0.16)" : "rgba(154, 123, 79, 0.22)");
  gradient.addColorStop(1, "rgba(17, 17, 17, 0)");

  ctx.beginPath();
  points.forEach(([x, y], index) => {
    if (index === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.lineTo(width - padding, height - padding);
  ctx.lineTo(padding, height - padding);
  ctx.closePath();
  ctx.fillStyle = gradient;
  ctx.fill();

  ctx.beginPath();
  points.forEach(([x, y], index) => {
    if (index === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.strokeStyle = activeChart === "response" ? "#111111" : "#9a7b4f";
  ctx.lineWidth = 4;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.stroke();

  points.forEach(([x, y]) => {
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    ctx.strokeStyle = activeChart === "response" ? "#111111" : "#9a7b4f";
    ctx.lineWidth = 3;
    ctx.stroke();
  });

  ctx.fillStyle = "#69645b";
  ctx.font = "600 13px -apple-system, BlinkMacSystemFont, sans-serif";
  ctx.fillText(activeChart === "response" ? "Response rate" : "Conversion rate", padding, 24);
}

function runWorkflow() {
  let complete = 0;
  runState.textContent = "Running";
  showToast("Enrichment workflow started");
  renderWorkflow(complete);
  const timer = setInterval(() => {
    complete += 1;
    renderWorkflow(complete);
    if (complete === workflowSteps.length) {
      clearInterval(timer);
      runState.textContent = "Complete";
      if (document.querySelector("#notifyToggle").checked) {
        renderEvents(["Slack", `${selectedProspect.account} enrichment completed for ${selectedProspect.owner}`]);
      }
      showToast("Workflow complete. Owner alert generated.");
    }
  }, 360);
}

document.querySelectorAll("[data-scroll]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelector(button.dataset.scroll).scrollIntoView({ behavior: "smooth" });
  });
});

document.querySelectorAll("[data-modal]").forEach((button) => {
  button.addEventListener("click", () => openModal(button.dataset.modal));
});

document.querySelector("#pricingToggle").addEventListener("click", () => {
  const isOpen = pricingPopover.classList.toggle("show");
  pricingPopover.setAttribute("aria-hidden", String(!isOpen));
});

document.querySelector("#pricingClose").addEventListener("click", () => {
  pricingPopover.classList.remove("show");
  pricingPopover.setAttribute("aria-hidden", "true");
});

document.addEventListener("click", (event) => {
  if (!pricingPopover.classList.contains("show")) return;
  const clickedInside = pricingPopover.contains(event.target);
  const clickedToggle = event.target.closest("#pricingToggle");
  if (!clickedInside && !clickedToggle) {
    pricingPopover.classList.remove("show");
    pricingPopover.setAttribute("aria-hidden", "true");
  }
});

document.querySelectorAll(".segment button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".segment button").forEach((item) => item.classList.remove("selected"));
    button.classList.add("selected");
    activeFilter = button.dataset.filter;
    renderProspects();
  });
});

document.querySelectorAll(".mini-tabs button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".mini-tabs button").forEach((item) => item.classList.remove("selected"));
    button.classList.add("selected");
    activeChart = button.dataset.chart;
    drawChart();
  });
});

document.querySelectorAll("#areaGrid button").forEach((button) => {
  button.addEventListener("click", () => {
    if (!button.dataset.area) return;
    document.querySelectorAll("#areaGrid button").forEach((item) => item.classList.remove("selected"));
    button.classList.add("selected");
    activeArea = button.dataset.area;
    renderProspects();
    showToast(activeArea === "all" ? "Showing all San Jose accounts" : `${activeArea} scan loaded`);
  });
});

if (useLocationButton) {
  useLocationButton.addEventListener("click", runNearbySearch);
}

document.querySelectorAll(".connect-button").forEach((button) => {
  button.addEventListener("click", () => {
    const integration = button.closest(".integration-card").dataset.integration;
    button.classList.add("connected");
    button.textContent = "Connected";
    button.disabled = true;
    renderEvents(["OAuth", `${integration} demo connection authorized`]);
    showToast(`${integration} connected in demo mode`);
  });
});

searchInput.addEventListener("input", renderProspects);
threshold.addEventListener("input", () => {
  thresholdValue.textContent = threshold.value;
  renderProspects();
});

document.querySelector("#runSync").addEventListener("click", runWorkflow);
document.querySelector("#enrichAll").addEventListener("click", runWorkflow);

document.querySelector("#scanArea").addEventListener("click", () => {
  const rows = getVisibleProspects();
  renderEvents(["Scan", `${rows.length} account${rows.length === 1 ? "" : "s"} found for ${activeArea === "all" ? "San Jose" : activeArea}`]);
  showToast("Area scan complete");
});

document.querySelector("#copyWebhook").addEventListener("click", async () => {
  const url = "https://api.yayzar.com/webhooks/crm/events";
  try {
    await navigator.clipboard.writeText(url);
    showToast("Webhook URL copied");
  } catch {
    showToast(url);
  }
});

const copySecurity = document.querySelector("#copySecurity");
if (copySecurity) {
  copySecurity.addEventListener("click", async () => {
    const summary =
      "Yayzar uses OAuth scopes, webhook signature verification, encrypted token storage, audit logs, field-level mapping, and least-privilege alert routing.";
    try {
      await navigator.clipboard.writeText(summary);
      showToast("Security summary copied");
    } catch {
      showToast("Security summary ready");
    }
  });
}

document.querySelector("#draftButton").addEventListener("click", () => {
  const angle = document.querySelector("#angleSelect").selectedOptions[0].textContent.toLowerCase();
  draftOutput.textContent = `Subject: ${selectedProspect.account} account signal\n\nHi ${selectedProspect.owner},\n\n${selectedProspect.account} is showing ${angle} intent with a ${selectedProspect.fit}% fit score. I would lead with the strongest trigger: ${selectedProspect.signals[0].toLowerCase()}.\n\nRecommended next step: send a short value note, route the account to the active outbound sequence, and watch for reply activity in Slack.`;
  showToast("Outbound email drafted");
});

document.querySelector("#exportCsv").addEventListener("click", () => {
  const header = "account,industry,area,source,fit,intent,owner";
  const lines = prospects.map((p) => [p.account, p.industry, p.area, p.source, p.fit, p.intent, p.owner].map(csvEscape).join(","));
  const blob = new Blob([[header, ...lines].join("\n")], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "yayzar-prospects.csv";
  link.click();
  URL.revokeObjectURL(url);
  showToast("CSV export generated");
});

document.querySelector(".account-form").addEventListener("submit", () => {
  showToast("Workspace preview created in demo mode");
});

window.addEventListener("resize", drawChart);

selectProspect(selectedProspect);
renderProspects();
renderWorkflow();
renderEvents();
drawChart();
