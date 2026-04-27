function getCategoryIconUrl(category) {
  return getIcon(category)?.options?.iconUrl || "";
}

function buildLegendStatic(container, dayObj) {
  if (!container || !dayObj) return;
  const cats = getDayCategories(dayObj);
  container.innerHTML = "";
  categoryLegendOrder.filter((cat) => cats.includes(cat)).forEach((cat) => {
    const row = document.createElement("div");
    row.className = "legendStaticItem";
    row.innerHTML = `<img src="${getCategoryIconUrl(cat)}" alt="" /><span>${categoryLegendNames[cat] || categoryLabels[cat] || cat}</span>`;
    container.appendChild(row);
  });
}

function getDayCategories(dayObj) {
  return [...new Set(dayObj.stops.map((s) => s.category))];
}

function setStoredActiveCategories(dayObj, categories) {
  const next = new Set(categories);
  activeCategoriesByDay.set(getDayKey(dayObj), next);
  activeCategories = new Set(next);
}

function syncActiveCategories(dayObj) {
  const cats = getDayCategories(dayObj);
  const dayKey = getDayKey(dayObj);
  const stored = activeCategoriesByDay.get(dayKey);

  if (!stored) {
    setStoredActiveCategories(dayObj, cats);
    return;
  }

  setStoredActiveCategories(dayObj, [...stored].filter((c) => cats.includes(c)));
}

function buildLegend(container, dayObj) {
  if (!container || !dayObj) return;
  syncActiveCategories(dayObj);
  const cats = getDayCategories(dayObj);
  container.innerHTML = "";

  cats.forEach((cat) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `legendFilterRow ${activeCategories.has(cat) ? "active" : "inactive"}`;
    btn.innerHTML = `
      <img src="${getCategoryIconUrl(cat)}" alt="" />
      <span>${categoryLegendNames[cat] || categoryLabels[cat] || cat}</span>
      <span class="filterStatus">${activeCategories.has(cat) ? "Shown" : "Hidden"}</span>
    `;
    btn.addEventListener("click", () => {
      const next = new Set(activeCategories);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      setStoredActiveCategories(dayObj, next);
      updateLegendAndMap();
    });
    container.appendChild(btn);
  });
}

function selectAllLegendCategories() {
  if (!currentDay) return;
  setStoredActiveCategories(currentDay, getDayCategories(currentDay));
  updateLegendAndMap();
}

function clearAllLegendCategories() {
  if (!currentDay) return;
  setStoredActiveCategories(currentDay, []);
  updateLegendAndMap();
}

function updateLegendAndMap() {
  if (!currentDay) return;
  buildLegendStatic(document.getElementById("legendStaticList"), currentDay);
  buildLegendStatic(document.getElementById("mobileLegendStaticList"), currentDay);
  buildLegend(document.getElementById("legendFilters"), currentDay);
  buildLegend(document.getElementById("mobileLegendFilters"), currentDay);
  showDay(currentDay);
}

const footprintByCategory = {
  hotel: "Estimated footprint: 0.1-0.3 kg CO2e for this route stop. Mainly a base/start node rather than a separate attraction trip.",
  mtr: "Estimated footprint: 0.2-0.6 kg CO2e per stop-to-stop segment. Rail is one of the lighter-impact transport choices on this route.",
  bus: "Estimated footprint: 0.4-1.0 kg CO2e per shared bus/minibus segment. Still lower-impact than point-to-point private rides.",
  hiking: "Estimated footprint: 0.3-1.0 kg CO2e when the trail is reached by shared transport and completed on foot.",
  restaurant: "Estimated footprint: 0.8-3.0 kg CO2e per meal, depending on how meat-heavy the food is.",
  "convenience-store": "Estimated footprint: 0.1-0.4 kg CO2e for a quick purchase stop, excluding any larger packaged-food load.",
  store: "Estimated footprint: 0.1-0.5 kg CO2e for a short supplies stop, assuming it is combined with the existing route.",
  toilet: "Estimated footprint: less than 0.1 kg CO2e for a short utility stop within the existing walking route.",
  mall: "Estimated footprint: 0.2-0.8 kg CO2e if visited as part of the same walking/transit cluster rather than a separate trip.",
  garden: "Estimated footprint: 0.1-0.4 kg CO2e. Mostly walking-based with very low additional impact.",
  museum: "Estimated footprint: 0.2-0.7 kg CO2e when visited within the same walkable day cluster.",
  railway: "Estimated footprint: 0.2-0.6 kg CO2e. Works best as a short walk between nearby attractions.",
  tree: "Estimated footprint: 0.2-0.7 kg CO2e, mostly from the shared public-transport access rather than the stop itself.",
  temple: "Estimated footprint: 0.2-0.8 kg CO2e when combined with walking or shared transport.",
  exhibition: "Estimated footprint: 0.3-1.0 kg CO2e depending on how much extra transport is needed to reach it."
};

function getDayKey(dayObj) {
  return dayObj === day2 ? "day2" : "day1";
}

function getFootprintText(stop) {
  return stop.footprint || footprintByCategory[stop.category] || "Estimated footprint: 0.3-1.0 kg CO2e for a short stop within the suggested route.";
}

function getPreviewPhoto(stop) {
  if (stop.photos?.length) return stop.photos[0];
  const escapeSvgText = (value) => String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const title = escapeSvgText(stop?.title || "Location preview");
  const category = escapeSvgText(categoryLabels[stop?.category] || "Route stop");
  return "data:image/svg+xml;utf8," + encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="420" viewBox="0 0 800 420">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#fff7ea"/>
          <stop offset="100%" stop-color="#f2dcc2"/>
        </linearGradient>
      </defs>
      <rect width="800" height="420" fill="url(#bg)"/>
      <rect x="38" y="38" width="724" height="344" rx="28" fill="rgba(255,255,255,0.72)" stroke="rgba(186,122,38,0.16)"/>
      <text x="50%" y="44%" dominant-baseline="middle" text-anchor="middle" fill="#8a5417" font-size="24" font-family="Arial, sans-serif" letter-spacing="3">
        ${category.toUpperCase()}
      </text>
      <text x="50%" y="58%" dominant-baseline="middle" text-anchor="middle" fill="#2d3d4c" font-size="34" font-family="Arial, sans-serif" font-weight="700">
        ${title}
      </text>
    </svg>
  `);
}

function isTransportStop(stop) {
  return stop?.category === "bus" || stop?.category === "mtr";
}

function isTooltipOnlyStop(stop) {
  return isTransportStop(stop) || !!stop?.tooltipOnly;
}

function getTransportTooltipSteps(stop) {
  return (stop.steps || []).filter(Boolean).slice(0, 4);
}

function getStopMapUrl(stop) {
  const [lat, lng] = stop?.latlng || [];
  if (typeof lat !== "number" || typeof lng !== "number") return "";
  return `https://www.google.com/maps?q=${lat},${lng}`;
}

function getTooltipLinks(stop) {
  const links = [];
  if (stop.websiteUrl && stop.websiteLabel && stop.websiteLabel !== "Google Maps") {
    links.push(`<a class="tooltipLink" href="${stop.websiteUrl}" target="_blank" rel="noreferrer">${stop.websiteLabel}</a>`);
  }

  return links.join("");
}

function getTooltipTodoButton(stop) {
  if (stop?.category !== "mall" || !currentDay) return "";
  const order = getTodoOrder(currentDay, stop);
  const added = order > 0;
  return `
    <button
      class="tooltipTodoBtn ${added ? "is-added" : ""}"
      type="button"
      data-tooltip-todo="${stop.id}"
      aria-pressed="${added ? "true" : "false"}"
    >
      ${added ? `Added as stop #${order}` : "Add to to-do list"}
    </button>
  `;
}

function getAudioGuideOptions(stop) {
  const entry = audioGuideCatalog[stop?.id];
  if (!entry) return null;

  const result = {};
  Object.entries(entry).forEach(([lang, files]) => {
    if (!files?.length) return;
    const cacheKey = `${stop.id}:${lang}`;
    if (!audioGuideChoiceCache.has(cacheKey)) {
      const choice = files[Math.floor(Math.random() * files.length)];
      audioGuideChoiceCache.set(cacheKey, choice);
    }
    result[lang] = audioGuideChoiceCache.get(cacheKey);
  });

  return Object.keys(result).length ? result : null;
}

function renderAudioGuide(stop) {
  const audioBox = document.getElementById("audioBox");
  if (!audioBox) return;

  const guideOptions = getAudioGuideOptions(stop);
  audioBox.innerHTML = "";

  if (!guideOptions) {
    audioBox.innerHTML = `<p class="muted">No audio guide for this stop yet.</p>`;
    return;
  }

  const languages = Object.keys(guideOptions);
  if (!languages.includes(selectedAudioGuideLanguage)) {
    selectedAudioGuideLanguage = languages[0];
  }

  const tabs = document.createElement("div");
  tabs.className = "audioGuideTabs";
  languages.forEach((lang) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `audioGuideTab ${lang === selectedAudioGuideLanguage ? "active" : ""}`;
    button.textContent = audioGuideLabels[lang] || lang.toUpperCase();
    button.addEventListener("click", () => {
      selectedAudioGuideLanguage = lang;
      if (currentStop?.id === stop.id) renderAudioGuide(stop);
    });
    tabs.appendChild(button);
  });

  const meta = document.createElement("div");
  meta.className = "audioGuideMeta";
  meta.textContent = `Guide available in ${languages.map((lang) => audioGuideLabels[lang] || lang.toUpperCase()).join(", ")}.`;

  const playerWrap = document.createElement("div");
  playerWrap.className = "audioGuidePlayer";
  const audio = document.createElement("audio");
  audio.controls = true;
  audio.preload = "none";
  audio.src = guideOptions[selectedAudioGuideLanguage];
  playerWrap.appendChild(audio);

  audioBox.appendChild(tabs);
  audioBox.appendChild(meta);
  audioBox.appendChild(playerWrap);
}
