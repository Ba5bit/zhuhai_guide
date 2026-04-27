
let map;
let markersLayer = L.layerGroup();

const panelEl = () => document.getElementById("infoPanel");
const menuToggleBtn = () => document.getElementById("menuToggleBtn");
const mobileSheetEl = () => document.getElementById("mobileSheet");
const mobileSheetBodyEl = () => document.getElementById("mobileSheetBody");
const mobileBackdropEl = () => document.getElementById("mobileBackdrop");
const landingViewEl = () => document.getElementById("landingView");
const mapViewEl = () => document.getElementById("mapView");

let mobileHideTimer = null;
let mobileState = "hidden";
let currentDay = null;
let currentStop = null;
let lightboxPhotos = [];
let lightboxIndex = 0;
let activeLightboxTitle = "";
let panoramaItems = [];
let panoramaIndex = 0;
let activePanoramaTitle = "";
let panoramaOffsetX = 0;
let activeCategories = new Set();
const activeCategoriesByDay = new Map();
let legendCollapsed = false;
let selectedLandingDay = "day1";
let utilityMode = "filters";
let utilitySheetHideTimer = null;

function isMobileView() {
  const landscapeCompact = window.matchMedia("(orientation: landscape) and (max-height: 520px)").matches;
  return window.innerWidth <= 768 && !landscapeCompact;
}

function refreshMapSize() {
  if (!map) return;
  requestAnimationFrame(() => map.invalidateSize());
}

/* ---------- DESKTOP ---------- */
function expandDesktopPanel() {
  const panel = panelEl();
  if (!panel) return;
  panel.classList.remove("panel-collapsed");
  setTimeout(refreshMapSize, 240);
}

function collapseDesktopPanel() {
  const panel = panelEl();
  if (!panel) return;
  panel.classList.add("panel-collapsed");
  setTimeout(refreshMapSize, 240);
}

/* ---------- MOBILE ---------- */
function getMobileOffsets() {
  const vh = window.innerHeight;
  return {
    hidden: vh + 24,
    peek: Math.round(vh * 0.70),
    half: Math.round(vh * 0.36),
    full: 12
  };
}

function setMobileBackdrop(isVisible) {
  const backdrop = mobileBackdropEl();
  if (!backdrop) return;
  backdrop.classList.toggle("is-open", !!isVisible);
}

function setMobilePosition(px, animate = true) {
  const sheet = mobileSheetEl();
  if (!sheet) return;
  sheet.style.transition = animate ? "transform 320ms cubic-bezier(.22,.9,.24,1)" : "none";
  sheet.style.transform = `translateY(${px}px)`;
}

function syncMobileSheetModeClasses(state) {
  document.body.classList.toggle("has-mobile-sheet", state !== "hidden");
  document.body.classList.toggle("has-mobile-sheet-full", state === "full");
}

function openMobileSheet(state = "peek", animate = true) {
  const sheet = mobileSheetEl();
  if (!sheet) return;
  if (mobileHideTimer) {
    clearTimeout(mobileHideTimer);
    mobileHideTimer = null;
  }
  mobileState = state;
  sheet.classList.remove("hidden");
  sheet.dataset.state = state;
  setMobilePosition(getMobileOffsets()[state], animate);
  setMobileBackdrop(state !== "hidden");
  syncMobileSheetModeClasses(state);
  setTimeout(refreshMapSize, 340);
}

function closeMobileSheet() {
  const sheet = mobileSheetEl();
  if (!sheet) return;
  if (mobileHideTimer) {
    clearTimeout(mobileHideTimer);
    mobileHideTimer = null;
  }
  mobileState = "hidden";
  sheet.dataset.state = "hidden";
  setMobileBackdrop(false);
  setMobilePosition(getMobileOffsets().hidden, true);

  mobileHideTimer = setTimeout(() => {
    sheet.classList.add("hidden");
    syncMobileSheetModeClasses("hidden");
    mobileHideTimer = null;
    refreshMapSize();
  }, 330);
}

function bindMobileSheetGestures() {
  const sheet = mobileSheetEl();
  const handle = document.getElementById("sheetHandle");
  const header = document.getElementById("mobileSheetHeader");
  const body = mobileSheetBodyEl();

  let startY = 0;
  let startOffset = 0;
  let currentOffset = 0;
  let dragging = false;

  function offsets() {
    return getMobileOffsets();
  }

  function getOffsetForState(state) {
    return offsets()[state];
  }

  function nearestState(offset) {
    const o = offsets();
    const snapPoints = [
      ["full", o.full],
      ["half", o.half],
      ["peek", o.peek],
      ["hidden", o.hidden]
    ];
    let nearest = "peek";
    let nearestDist = Infinity;
    for (const [name, value] of snapPoints) {
      const d = Math.abs(offset - value);
      if (d < nearestDist) {
        nearest = name;
        nearestDist = d;
      }
    }
    return nearest;
  }

  function startDrag(y) {
    if (sheet.classList.contains("hidden")) return;
    dragging = true;
    startY = y;
    startOffset = getOffsetForState(mobileState === "hidden" ? "peek" : mobileState);
    currentOffset = startOffset;
    sheet.style.transition = "none";
  }

  function moveDrag(y) {
    if (!dragging) return;
    const o = offsets();
    const delta = y - startY;
    currentOffset = Math.min(Math.max(startOffset + delta, o.full), o.hidden);
    sheet.style.transform = `translateY(${currentOffset}px)`;
  }

  function endDrag() {
    if (!dragging) return;
    dragging = false;
    const next = nearestState(currentOffset);
    if (next === "hidden") closeMobileSheet();
    else openMobileSheet(next, true);
  }

  [handle, header].forEach((el) => {
    if (!el) return;
    el.addEventListener("touchstart", (e) => {
      if (e.touches?.length !== 1) return;
      startDrag(e.touches[0].clientY);
    }, { passive: true });
    el.addEventListener("touchmove", (e) => {
      if (e.touches?.length !== 1) return;
      moveDrag(e.touches[0].clientY);
    }, { passive: false });
    el.addEventListener("touchend", endDrag, { passive: true });
  });

  handle?.addEventListener("click", () => {
    if (mobileState === "half") openMobileSheet("full", true);
    else if (mobileState === "peek") openMobileSheet("half", true);
    else if (mobileState === "full") openMobileSheet("half", true);
  });

  header?.addEventListener("dblclick", () => {
    openMobileSheet(mobileState === "full" ? "half" : "full", true);
  });

  body?.addEventListener("touchend", () => {
    if (dragging) endDrag();
  }, { passive: true });

  mobileBackdropEl()?.addEventListener("click", closeMobileSheet);
}

/* ---------- ICONS ---------- */
const ICON_SIZE = [34, 34];
const ICON_ANCHOR = [17, 34];
const POPUP_ANCHOR = [0, -30];

function makeSvgIcon(url) {
  return L.icon({
    iconUrl: url,
    iconSize: ICON_SIZE,
    iconAnchor: ICON_ANCHOR,
    popupAnchor: POPUP_ANCHOR,
  });
}

const ICONS = {
  bus: makeSvgIcon("./assets/icons/bus-stop-svgrepo-com.svg"),
  mtr: makeSvgIcon("./assets/icons/hong-kong-metro-logo-svgrepo-com.svg"),
  restaurant: makeSvgIcon("./assets/icons/restaurant-svgrepo-com.svg"),
  "convenience-store": makeSvgIcon("./assets/icons/convenience-store-svgrepo-com.svg"),
  store: makeSvgIcon("./assets/icons/store-svgrepo-com.svg"),
  toilet: makeSvgIcon("./assets/icons/toilet-restroom-svgrepo-com.svg"),
  hotel: makeSvgIcon("./assets/icons/building-big-svgrepo-com.svg"),
  mall: makeSvgIcon("./assets/icons/shopping-center-svgrepo-com.svg"),
  hiking: makeSvgIcon("./assets/icons/mountain-road-svgrepo-com.svg"),
  garden: makeSvgIcon("./assets/icons/garden-svgrepo-com.svg"),
  museum: makeSvgIcon("./assets/icons/museum-svgrepo-com.svg"),
  railway: makeSvgIcon("./assets/icons/train-svgrepo-com (1).svg"),
  tree: makeSvgIcon("./assets/icons/tree-svgrepo-com.svg"),
  temple: makeSvgIcon("./assets/icons/temple.svg"),
  exhibition: makeSvgIcon("./assets/icons/pavilion-svgrepo-com.svg"),
};

function getIcon(category) {
  return ICONS[category] || ICONS.museum;
}

