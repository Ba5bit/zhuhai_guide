function saveChecklistState(dayKey, index, checked) {
  localStorage.setItem(`tour-check-${dayKey}-${index}`, checked ? "1" : "0");
}

function loadChecklistState(dayKey, index) {
  return localStorage.getItem(`tour-check-${dayKey}-${index}`) === "1";
}

function getTodoStorageKey(dayObj) {
  return `tour-stop-todo-${getDayKey(dayObj)}`;
}

function loadTodoIds(dayObj) {
  try {
    const raw = localStorage.getItem(getTodoStorageKey(dayObj));
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveTodoIds(dayObj, ids) {
  localStorage.setItem(getTodoStorageKey(dayObj), JSON.stringify(ids));
}

function isStopInTodo(dayObj, stop) {
  return loadTodoIds(dayObj).includes(stop.id);
}

function getTodoOrder(dayObj, stop) {
  return loadTodoIds(dayObj).indexOf(stop.id) + 1;
}

function getOrderedTodoStops(dayObj) {
  const stopById = new Map(dayObj.stops.map((stop) => [stop.id, stop]));
  return loadTodoIds(dayObj)
    .map((id) => stopById.get(id))
    .filter(Boolean);
}

function toggleStopTodo(dayObj, stop) {
  const ids = loadTodoIds(dayObj);
  const nextIds = ids.includes(stop.id) ? ids.filter((id) => id !== stop.id) : [...ids, stop.id];
  saveTodoIds(dayObj, nextIds);
  updateChecklistPanels(dayObj);
  updateStopTodoButton(dayObj, stop);
}

function clearAllTodoStops(dayObj) {
  if (!dayObj) return;
  saveTodoIds(dayObj, []);
  updateChecklistPanels(dayObj);
  if (currentStop && currentDay === dayObj) updateStopTodoButton(dayObj, currentStop);
}

function updateStopTodoButton(dayObj, stop) {
  const btn = document.getElementById("stopTodoBtn");
  if (!btn || !dayObj || !stop) return;
  const added = isStopInTodo(dayObj, stop);
  btn.classList.toggle("is-added", added);
  btn.textContent = added ? "âœ“ Added to to-do list" : "âœ“ Add to to-do list";
  btn.setAttribute("aria-pressed", added ? "true" : "false");
}

function getPlanDotClass(type) {
  if (type === "transfer") return "planDot transfer";
  if (type === "optional") return "planDot optional";
  return "planDot";
}

function syncLandingSelection(dayKey, expandCard = false) {
  selectedLandingDay = dayKey === "day2" ? "day2" : "day1";
  const meta = landingDayMeta[selectedLandingDay];

  const landingCta = document.getElementById("landingGoToMapBtn");
  const selectedDayEl = document.getElementById("landingSelectedDay");
  const selectedSummaryEl = document.getElementById("landingSelectedSummary");

  if (landingCta) landingCta.textContent = `Open ${meta.title} on map`;
  if (selectedDayEl) selectedDayEl.textContent = meta.title;
  if (selectedSummaryEl) selectedSummaryEl.textContent = meta.summary;

  document.querySelectorAll("[data-select-day]").forEach((btn) => {
    btn.classList.toggle("active", btn.getAttribute("data-select-day") === selectedLandingDay);
  });

  if (!expandCard) return;

  document.querySelectorAll(".dayCard").forEach((otherCard) => {
    otherCard.classList.remove("is-open");
    otherCard.querySelector(".dayCardHeader")?.setAttribute("aria-expanded", "false");
  });
  document.querySelectorAll(".dayCardBody").forEach((otherBody) => otherBody.classList.add("hidden"));

  const body = document.getElementById(`dayCardBody-${selectedLandingDay}`);
  const card = document.getElementById(`dayCard-${selectedLandingDay}`);
  const header = card?.querySelector(".dayCardHeader");

  card?.classList.add("is-open");
  header?.setAttribute("aria-expanded", "true");
  body?.classList.remove("hidden");
}

function initLandingPhotoRail() {
  const viewport = document.querySelector(".landingPhotoRailViewport");
  const rail = document.querySelector(".landingPhotoRail");
  if (!viewport || !rail) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  let paused = false;
  let frameId = null;
  let lastTimestamp = 0;
  let offset = 0;

  const visibleItems = [...rail.children].filter((item) => item.getAttribute("aria-hidden") !== "true");
  const getLoopWidth = () => {
    if (!visibleItems.length) return rail.scrollWidth / 2;
    const gap = parseFloat(window.getComputedStyle(rail).columnGap || window.getComputedStyle(rail).gap || "14");
    return visibleItems.reduce((sum, item) => sum + item.getBoundingClientRect().width, 0) + gap * Math.max(visibleItems.length - 1, 0);
  };

  const applyTransform = () => {
    rail.style.transform = `translate3d(${-offset}px, 0, 0)`;
  };

  const tick = (timestamp) => {
    if (!lastTimestamp) lastTimestamp = timestamp;
    const delta = timestamp - lastTimestamp;
    lastTimestamp = timestamp;

    if (!paused) {
      const loopWidth = getLoopWidth();
      offset += delta * 0.035;
      if (offset >= loopWidth) {
        offset -= loopWidth;
      }
      applyTransform();
    }

    frameId = window.requestAnimationFrame(tick);
  };

  const pause = () => { paused = true; };
  const resume = () => { paused = false; };

  viewport.addEventListener("mouseenter", pause);
  viewport.addEventListener("mouseleave", resume);
  viewport.addEventListener("focusin", pause);
  viewport.addEventListener("focusout", resume);
  viewport.addEventListener("touchstart", pause, { passive: true });
  viewport.addEventListener("touchend", resume, { passive: true });
  window.addEventListener("resize", () => {
    const loopWidth = getLoopWidth();
    if (offset >= loopWidth) offset = 0;
    applyTransform();
  });

  if (frameId) window.cancelAnimationFrame(frameId);
  applyTransform();
  frameId = window.requestAnimationFrame(tick);
}

function renderLandingPlans() {
  Object.entries(routePlans).forEach(([dayKey, items]) => {
    const container = document.getElementById(`landingPlan-${dayKey}`);
    if (!container) return;
    container.innerHTML = "";
    items.forEach((item) => {
      const row = document.createElement("div");
      row.className = "landingPlanItem";
      row.innerHTML = `
        <div class="${getPlanDotClass(item.type)}"></div>
        <div class="planText">
          <div class="planLabel">${item.label}</div>
          <div class="planMeta">${item.meta || ""}</div>
        </div>
      `;
      container.appendChild(row);
    });
  });
}

function renderChecklist(container, dayObj) {
  if (!container || !dayObj) return;
  const selectedIds = loadTodoIds(dayObj);
  const items = dayObj.stops.filter((stop) => selectedIds.includes(stop.id));
  container.innerHTML = "";

  if (!items.length) {
    container.innerHTML = `<div class="checkEmpty">Your to-do list is empty. Open a stop and add it with the check button.</div>`;
    return;
  }

  items.forEach((stop) => {
    const row = document.createElement("label");
    row.className = "checkItem";
    row.innerHTML = `
      <input type="checkbox" checked />
      <div class="checkText">
        <div class="checkTitle">${stop.title}</div>
        <div class="checkMeta">${stop.subtitle || dayObj.name}</div>
      </div>
    `;
    const checkbox = row.querySelector("input");
    checkbox.addEventListener("change", () => {
      toggleStopTodo(dayObj, stop);
      if (currentStop?.id === stop.id && currentDay === dayObj) updateStopTodoButton(dayObj, stop);
    });
    container.appendChild(row);
  });
}

function updateChecklistPanels(dayObj) {
  renderChecklist(document.getElementById("routeChecklist"), dayObj);
  renderChecklist(document.getElementById("mobileChecklist"), dayObj);
}
