function renderSuggestedChecklist(container, dayObj) {
  if (!container || !dayObj) return;
  const items = routePlans[getDayKey(dayObj)] || [];
  container.innerHTML = "";

  items.forEach((item, index) => {
    const row = document.createElement("div");
    row.className = "checkItem suggestedItem";
    row.innerHTML = `
      <div class="checkOrder suggestedOrder">${index + 1}</div>
      <div class="checkText">
        <div class="checkTitle">${item.label}</div>
        <div class="checkMeta">${item.meta || ""}</div>
      </div>
      <div class="suggestedType suggestedType-${item.type}">${item.type}</div>
    `;
    container.appendChild(row);
  });
}

function updateChecklistPanels(dayObj) {
  renderChecklist(document.getElementById("routeChecklist"), dayObj);
  renderChecklist(document.getElementById("mobileChecklist"), dayObj);
  renderSuggestedChecklist(document.getElementById("suggestedChecklist"), dayObj);
  renderSuggestedChecklist(document.getElementById("mobileSuggestedChecklist"), dayObj);
}

function renderDefaultDayInfo(dayObj) {
  const titleEl = document.getElementById("stopTitle");
  if (!titleEl) return;
  document.getElementById("badge").textContent = dayObj.name;
  document.getElementById("badge").style.background = dayObj.color;
  titleEl.textContent = dayObj.name;
  document.getElementById("stopSubtitle").textContent = "Select a marker to open a full stop page.";
  document.getElementById("stopStory").textContent = "This one-day route uses walking and fully electric buses from Hyatt Regency Hengqin to Erjingwan Wetland, Hengqin Planning Exhibition Hall, Zhuhai Museum, and Xiangshan Cloud Trail.";
  document.getElementById("stopRouteHeading").textContent = "Route overview";
  document.getElementById("stopRouteSummary").textContent = "Total distance: 17.7 km. Total transit time: 50-60 minutes. Fare: 2 RMB per person. Transport: 100% electric buses with one transfer.";
  document.getElementById("stopRouteSteps").innerHTML = `
    <li>09:00-11:00: Hengqin Erjingwan National Wetland Park.</li>
    <li>11:30-13:30: Hengqin Planning Exhibition Hall.</li>
    <li>Optional nearby cultural add-on: Zhuhai Museum.</li>
    <li>14:00-17:00: Xiangshan Cloud Trail and Xiangshan Park.</li>
  `;
  document.getElementById("stopFacts").innerHTML = "";
  document.getElementById("stopFacts").classList.add("hidden");
  document.getElementById("stopFootprint").textContent = "Total day low-carbon footprint: about 0.30 kg CO2, using electric buses and walking.";
  document.getElementById("gallery").innerHTML = `<p class="muted">Open a stop to browse photos.</p>`;
  document.getElementById("audioBox").innerHTML = `<p class="muted">Open a stop to see available guide media.</p>`;
  document.getElementById("tips").innerHTML = `
    <li>Wear comfortable shoes for wetland boardwalks and Xiangshan Cloud Trail.</li>
    <li>Bring a reusable water bottle and sun protection.</li>
    <li>Follow Leave No Trace principles: no littering and stay on trails.</li>
  `;
  document.getElementById("sdgNote").textContent = "";
  document.getElementById("sdgNote").classList.add("hidden");
  const todoBtn = document.getElementById("stopTodoBtn");
  if (todoBtn) {
    todoBtn.classList.remove("is-added");
    todoBtn.textContent = "âœ“ Add to to-do list";
    todoBtn.setAttribute("aria-pressed", "false");
  }
}

function showLanding() {
  mapViewEl().classList.add("hidden");
  landingViewEl().classList.remove("hidden");
  closeStopPage();
  closeLegendDrawer();
  closeTodoDrawer();
  closeSuggestedDrawer();
  closeMobileUtilitySheet();
}

function openLegendDrawer() {
  closeTodoDrawer();
  closeSuggestedDrawer();
  document.getElementById("legendDrawer")?.classList.remove("hidden");
}

function closeLegendDrawer() {
  document.getElementById("legendDrawer")?.classList.add("hidden");
}

function openTodoDrawer() {
  closeLegendDrawer();
  closeSuggestedDrawer();
  document.getElementById("todoDrawer")?.classList.remove("hidden");
}

function closeTodoDrawer() {
  document.getElementById("todoDrawer")?.classList.add("hidden");
}

function openSuggestedDrawer() {
  closeLegendDrawer();
  closeTodoDrawer();
  document.getElementById("suggestedDrawer")?.classList.remove("hidden");
}

function closeSuggestedDrawer() {
  document.getElementById("suggestedDrawer")?.classList.add("hidden");
}

function openStopPage() {
  const page = document.getElementById("stopPage");
  if (!page) return;
  page.classList.remove("is-closing");
  page.classList.remove("hidden");
  requestAnimationFrame(() => page.classList.add("is-open"));
  page.setAttribute("aria-hidden", "false");
  document.body.classList.add("stop-page-open");
}

function closeStopPage() {
  const page = document.getElementById("stopPage");
  if (!page) return;
  if (page.classList.contains("hidden")) return;
  closePanoramaViewer();
  page.classList.remove("is-open");
  page.classList.add("is-closing");
  page.setAttribute("aria-hidden", "true");
  document.body.classList.remove("stop-page-open");
  setTimeout(() => {
    page.classList.add("hidden");
    page.classList.remove("is-closing");
  }, 320);
}

function setUtilityMode(mode) {
  utilityMode = mode;
  document.getElementById("utilityTabFilters")?.classList.toggle("active", mode === "filters");
  document.getElementById("utilityTabTodo")?.classList.toggle("active", mode === "todo");
  document.getElementById("utilityTabSuggested")?.classList.toggle("active", mode === "suggested");
  document.getElementById("utilityFiltersPane")?.classList.toggle("hidden", mode !== "filters");
  document.getElementById("utilityTodoPane")?.classList.toggle("hidden", mode !== "todo");
  document.getElementById("utilitySuggestedPane")?.classList.toggle("hidden", mode !== "suggested");

  const eyebrow = document.getElementById("utilitySheetEyebrow");
  const title = document.getElementById("utilitySheetTitle");

  if (eyebrow) {
    eyebrow.textContent = mode === "filters"
      ? "Map legend"
      : mode === "todo"
        ? "Your route"
        : "Suggested itinerary";
  }

  if (title) {
    title.textContent = mode === "filters"
      ? "Show or hide categories"
      : mode === "todo"
        ? "Your ordered to-do list"
        : "Follow our recommended flow";
  }
}

function resetMobileUtilitySheetPosition(animate = true) {
  const sheet = document.getElementById("mobileUtilitySheet");
  if (!sheet) return;
  sheet.style.transition = animate ? "transform 240ms cubic-bezier(.22,.9,.24,1)" : "none";
  sheet.style.transform = "translateY(0px)";
}

function openMobileUtilitySheet(mode = "filters") {
  const sheet = document.getElementById("mobileUtilitySheet");
  if (!sheet) return;
  if (utilitySheetHideTimer) {
    clearTimeout(utilitySheetHideTimer);
    utilitySheetHideTimer = null;
  }
  setUtilityMode(mode);
  sheet.classList.remove("hidden");
  resetMobileUtilitySheetPosition(false);
  requestAnimationFrame(() => resetMobileUtilitySheetPosition(true));
  setMobileBackdrop(true);
}

function closeMobileUtilitySheet() {
  const sheet = document.getElementById("mobileUtilitySheet");
  if (!sheet) return;
  if (utilitySheetHideTimer) clearTimeout(utilitySheetHideTimer);
  sheet.style.transition = "transform 220ms cubic-bezier(.22,.9,.24,1)";
  sheet.style.transform = "translateY(100%)";
  setMobileBackdrop(false);
  utilitySheetHideTimer = window.setTimeout(() => {
    sheet.classList.add("hidden");
    sheet.style.transition = "";
    sheet.style.transform = "";
    utilitySheetHideTimer = null;
  }, 220);
}

function bindMobileUtilitySheetGestures() {
  const sheet = document.getElementById("mobileUtilitySheet");
  const handle = document.getElementById("utilitySheetHandle");
  const header = sheet?.querySelector(".utilitySheetHeader");
  const tabs = sheet?.querySelector(".utilityTabs");
  const dragTargets = [handle, header, tabs].filter(Boolean);

  if (!sheet || !dragTargets.length) return;

  let startY = 0;
  let startX = 0;
  let currentY = 0;
  let dragging = false;

  const startDrag = (touch) => {
    if (sheet.classList.contains("hidden")) return;
    dragging = true;
    startY = touch.clientY;
    startX = touch.clientX;
    currentY = 0;
    sheet.style.transition = "none";
  };

  const moveDrag = (touch, event) => {
    if (!dragging) return;
    const deltaY = touch.clientY - startY;
    const deltaX = touch.clientX - startX;
    if (deltaY <= 0 || Math.abs(deltaY) < Math.abs(deltaX)) {
      currentY = 0;
      sheet.style.transform = "translateY(0px)";
      return;
    }
    currentY = deltaY;
    sheet.style.transform = `translateY(${deltaY}px)`;
    event.preventDefault();
  };

  const endDrag = () => {
    if (!dragging) return;
    dragging = false;
    if (currentY > 90) closeMobileUtilitySheet();
    else resetMobileUtilitySheetPosition(true);
  };

  dragTargets.forEach((target) => {
    target.addEventListener("touchstart", (event) => {
      if (event.touches?.length !== 1) return;
      startDrag(event.touches[0]);
    }, { passive: true });

    target.addEventListener("touchmove", (event) => {
      if (event.touches?.length !== 1) return;
      moveDrag(event.touches[0], event);
    }, { passive: false });

    target.addEventListener("touchend", endDrag, { passive: true });
    target.addEventListener("touchcancel", endDrag, { passive: true });
  });
}

function bindMapUi() {
  document.getElementById("day1Btn")?.addEventListener("click", () => switchDay(day1));
  document.getElementById("day2Btn")?.addEventListener("click", () => switchDay(day2));
  document.getElementById("backToLandingBtn")?.addEventListener("click", showLanding);
  document.getElementById("menuToggleBtn")?.addEventListener("click", () => {
    if (document.getElementById("legendDrawer")?.classList.contains("hidden")) openLegendDrawer();
    else closeLegendDrawer();
  });
  document.getElementById("todoToggleBtn")?.addEventListener("click", () => {
    if (document.getElementById("todoDrawer")?.classList.contains("hidden")) openTodoDrawer();
    else closeTodoDrawer();
  });
  document.getElementById("suggestedToggleBtn")?.addEventListener("click", () => {
    if (document.getElementById("suggestedDrawer")?.classList.contains("hidden")) openSuggestedDrawer();
    else closeSuggestedDrawer();
  });
  document.getElementById("legendCloseBtn")?.addEventListener("click", closeLegendDrawer);
  document.getElementById("todoCloseBtn")?.addEventListener("click", closeTodoDrawer);
  document.getElementById("suggestedCloseBtn")?.addEventListener("click", closeSuggestedDrawer);
  document.getElementById("mobileFilterFab")?.addEventListener("click", () => openMobileUtilitySheet("filters"));
  document.getElementById("mobileTodoFab")?.addEventListener("click", () => openMobileUtilitySheet("todo"));
  document.getElementById("mobileSuggestedFab")?.addEventListener("click", () => openMobileUtilitySheet("suggested"));
  document.getElementById("mobileUtilityCloseBtn")?.addEventListener("click", closeMobileUtilitySheet);
  document.getElementById("utilityTabFilters")?.addEventListener("click", () => setUtilityMode("filters"));
  document.getElementById("utilityTabTodo")?.addEventListener("click", () => setUtilityMode("todo"));
  document.getElementById("utilityTabSuggested")?.addEventListener("click", () => setUtilityMode("suggested"));
  document.getElementById("todoClearAllBtn")?.addEventListener("click", () => clearAllTodoStops(currentDay));
  document.getElementById("mobileTodoClearAllBtn")?.addEventListener("click", () => clearAllTodoStops(currentDay));
  document.getElementById("legendSelectAllBtn")?.addEventListener("click", selectAllLegendCategories);
  document.getElementById("legendClearAllBtn")?.addEventListener("click", clearAllLegendCategories);
  document.getElementById("mobileLegendSelectAllBtn")?.addEventListener("click", selectAllLegendCategories);
  document.getElementById("mobileLegendClearAllBtn")?.addEventListener("click", clearAllLegendCategories);
  mobileBackdropEl()?.addEventListener("click", closeMobileUtilitySheet);
  document.getElementById("stopPageBackBtn")?.addEventListener("click", closeStopPage);
  document.getElementById("stopPageIntroBtn")?.addEventListener("click", showLanding);
  document.getElementById("stopTodoBtn")?.addEventListener("click", () => {
    if (!currentDay || !currentStop) return;
    toggleStopTodo(currentDay, currentStop);
  });
  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-tooltip-todo]");
    if (!button || !currentDay) return;
    event.preventDefault();
    event.stopPropagation();

    const stop = currentDay.stops.find((item) => item.id === button.dataset.tooltipTodo);
    if (!stop) return;

    toggleStopTodo(currentDay, stop);
    const order = getTodoOrder(currentDay, stop);
    const added = order > 0;
    button.classList.toggle("is-added", added);
    button.setAttribute("aria-pressed", added ? "true" : "false");
    button.textContent = added ? `Added as stop #${order}` : "Add to to-do list";
  });
  bindMobileUtilitySheetGestures();
}

