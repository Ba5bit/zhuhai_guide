function initMap() {
  map = L.map("map", { zoomControl: false });
  L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
    maxZoom: 20,
    attribution: "&copy; OpenStreetMap contributors &copy; CARTO"
  }).addTo(map);
  markersLayer.addTo(map);
}

function init() {
  initMap();
  renderLandingPlans();
  bindLanding();
  syncLandingSelection("day1", true);
  initLandingPhotoRail();
  bindMapUi();
  bindLightbox();
  bindPanoramaViewer();

  window.addEventListener("resize", () => {
    refreshMapSize();
    if (!map || !currentDay) return;
    showDay(currentDay);
  });

  showLanding();
}

window.addEventListener("DOMContentLoaded", init);
