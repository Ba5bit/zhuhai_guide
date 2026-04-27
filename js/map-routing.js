function openStop(dayObj, stop) {
  renderStopContent(dayObj, stop);
  openStopPage();
  map.flyTo(stop.latlng, Math.max(map.getZoom(), 15), { duration: 0.45 });
}

function switchDay(dayObj) {
  currentDay = dayObj;
  currentStop = null;
  syncActiveCategories(dayObj);
  document.getElementById("day1Btn")?.classList.toggle("active", dayObj === day1);
  document.getElementById("day2Btn")?.classList.toggle("active", dayObj === day2);
  updateChecklistPanels(dayObj);
  renderDefaultDayInfo(dayObj);
  updateLegendAndMap();
  closeStopPage();
}

function showLanding() {
  mapViewEl().classList.add("hidden");
  landingViewEl().classList.remove("hidden");
  closeStopPage();
  closeLegendDrawer();
  closeTodoDrawer();
  closeMobileUtilitySheet();
}

function openMapForDay(dayKey) {
  landingViewEl().classList.add("hidden");
  mapViewEl().classList.remove("hidden");
  setTimeout(() => {
    refreshMapSize();
    switchDay(dayKey === "day2" ? day2 : day1);
  }, 40);
}

function showDay(dayObj) {
  markersLayer.clearLayers();
  const bounds = [];

  dayObj.stops.forEach((stop) => {
    if (!activeCategories.has(stop.category)) return;
    bounds.push(stop.latlng);
    const marker = L.marker(stop.latlng, {
      icon: getIcon(stop.category),
      keyboard: true,
      title: stop.title
    }).addTo(markersLayer);

    const tooltipOptions = {
      direction: "top",
      opacity: 1,
      className: isTransportStop(stop) ? "customTooltip transportTooltip" : "customTooltip",
      offset: [0, -14]
    };

    if (isTooltipOnlyStop(stop)) {
      marker.bindPopup(tooltipHtml(stop), {
        className: isTransportStop(stop) ? "transportPopup" : "infoPopup",
        autoPan: true,
        autoPanPadding: [18, 18],
        closeButton: !isMobileView(),
        maxWidth: 320,
        minWidth: 220,
        offset: [0, -12]
      });
      marker.on("click", () => {
        currentStop = null;
        closeStopPage();
        marker.openPopup();
        map.flyTo(stop.latlng, Math.max(map.getZoom(), 15), { duration: 0.35 });
      });
    } else {
      marker.on("click", () => openStop(dayObj, stop));

      if (!isMobileView()) {
        marker.bindTooltip(tooltipHtml(stop), tooltipOptions);
      }
    }
  });

  if (bounds.length) {
    const pad = isMobileView() ? [28, 28] : [48, 48];
    map.fitBounds(bounds, { padding: pad, maxZoom: dayObj.zoom || 15 });
  } else {
    map.setView(dayObj.center, dayObj.zoom);
  }
}

function bindLanding() {
  document.querySelectorAll('.siteNavLinks a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      const target = targetId ? document.querySelector(targetId) : null;
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  document.querySelectorAll("[data-day-toggle]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const dayKey = btn.getAttribute("data-day-toggle");
      const body = document.getElementById(`dayCardBody-${dayKey}`);
      const willOpen = body.classList.contains("hidden");
      syncLandingSelection(dayKey, willOpen);
      if (!willOpen) {
        btn.setAttribute("aria-expanded", "false");
        btn.closest(".dayCard")?.classList.remove("is-open");
        body.classList.add("hidden");
      }
    });
  });

  document.querySelectorAll("[data-select-day]").forEach((btn) => {
    btn.addEventListener("click", () => {
      syncLandingSelection(btn.getAttribute("data-select-day"), true);
    });
  });

  document.querySelectorAll("[data-open-map]").forEach((btn) => {
    btn.addEventListener("click", () => openMapForDay(btn.getAttribute("data-open-map")));
  });

  document.getElementById("landingGoToMapBtn")?.addEventListener("click", () => openMapForDay(selectedLandingDay));
  document.getElementById("landingPreviewBtn")?.addEventListener("click", () => {
    syncLandingSelection(selectedLandingDay, true);
    document.getElementById("itinerarySection")?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

