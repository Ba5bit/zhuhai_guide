function renderStopContent(dayObj, stop) {
  currentStop = stop;
  document.getElementById("badge").textContent = dayObj.name;
  document.getElementById("badge").style.background = dayObj.color;
  document.getElementById("stopTitle").textContent = stop.title;
  document.getElementById("stopSubtitle").textContent = stop.subtitle || "";
  document.getElementById("stopStory").textContent = stop.story || "";
  document.getElementById("stopFootprint").textContent = getFootprintText(stop);
  updateStopTodoButton(dayObj, stop);

  const routeHeading = document.getElementById("stopRouteHeading");
  const routeSummary = document.getElementById("stopRouteSummary");
  const routeSteps = document.getElementById("stopRouteSteps");
  const stopFacts = document.getElementById("stopFacts");
  if (routeHeading) routeHeading.textContent = stop.routeHeading || "Getting there";
  if (routeSummary) routeSummary.textContent = stop.routeSummary || "Use the route steps below to reach this stop from the current day area.";
  if (routeSteps) {
    routeSteps.innerHTML = "";
    (stop.steps || []).forEach((step) => {
      const li = document.createElement("li");
      li.textContent = step;
      routeSteps.appendChild(li);
    });
  }
  if (stopFacts) {
    const facts = [
      stop.difficulty ? { label: "Difficulty", value: stop.difficulty } : null,
      stop.distance ? { label: "Distance", value: stop.distance } : null,
      stop.duration ? { label: "Time", value: stop.duration } : null
    ].filter(Boolean);
    stopFacts.innerHTML = "";
    stopFacts.classList.toggle("hidden", !facts.length);
    facts.forEach((fact) => {
      const item = document.createElement("div");
      item.className = "stopFact";
      item.innerHTML = `<span class="stopFactLabel">${fact.label}</span><span class="stopFactValue">${fact.value}</span>`;
      stopFacts.appendChild(item);
    });
  }

  buildGallery(document.getElementById("gallery"), stop);
  renderPanoramaSection(stop);
  renderAudioGuide(stop);

  const tipsUl = document.getElementById("tips");
  const sdgNote = document.getElementById("sdgNote");
  tipsUl.innerHTML = "";
  (stop.tips || []).forEach((t) => {
    const li = document.createElement("li");
    li.textContent = t;
    tipsUl.appendChild(li);
  });
  if (sdgNote) {
    const tipText = (stop.tips || []).join(" ");
    const notes = [];
    if (tipText.includes("SDG 11")) {
      notes.push("SDG 11 focuses on sustainable cities and communities, including heritage protection, walkable public space, and inclusive urban life.");
    }
    if (tipText.includes("SDG 12")) {
      notes.push("SDG 12 focuses on responsible consumption and production, such as reducing waste, reusing items, and choosing lower-impact travel habits.");
    }
    if (tipText.includes("SDG 15")) {
      notes.push("SDG 15 focuses on life on land, including care for trails, forests, streams, and biodiversity.");
    }
    sdgNote.textContent = notes.join(" ");
    sdgNote.classList.toggle("hidden", !notes.length);
  }
}

function renderDefaultDayInfo(dayObj) {
  const titleEl = document.getElementById("stopTitle");
  if (!titleEl) return;
  document.getElementById("badge").textContent = dayObj.name;
  document.getElementById("badge").style.background = dayObj.color;
  titleEl.textContent = dayObj.name;
  document.getElementById("stopSubtitle").textContent = "Select a marker to open a full stop page.";
  document.getElementById("stopStory").textContent = "Each place opens as its own full page, where you can review photos, story notes, and decide whether to save it for your trip.";
  document.getElementById("stopRouteHeading").textContent = "Getting there";
  document.getElementById("stopRouteSummary").textContent = "Open a stop to see access steps, difficulty, and route details.";
  document.getElementById("stopRouteSteps").innerHTML = `<li>Use the map to choose a stop, then open it for route guidance.</li>`;
  document.getElementById("stopFacts").innerHTML = "";
  document.getElementById("stopFacts").classList.add("hidden");
  document.getElementById("stopFootprint").textContent = "Use the map tools for filters, then add the stops you actually want into your own to-do list.";
  document.getElementById("gallery").innerHTML = `<p class="muted">Open a stop to browse photos.</p>`;
  document.getElementById("audioBox").innerHTML = `<p class="muted">Open a stop to see available guide media.</p>`;
  document.getElementById("tips").innerHTML = `<li>Build your own to-do list by adding stops from their individual pages.</li>`;
  document.getElementById("sdgNote").textContent = "";
  document.getElementById("sdgNote").classList.add("hidden");
  const todoBtn = document.getElementById("stopTodoBtn");
  if (todoBtn) {
    todoBtn.classList.remove("is-added");
    todoBtn.textContent = "âœ“ Add to to-do list";
    todoBtn.setAttribute("aria-pressed", "false");
  }
}

function tooltipHtml(stop) {
  if (isTransportStop(stop)) {
    const steps = getTransportTooltipSteps(stop);
    return `
      <div class="transportInfoCard">
        <div class="tooltipBody">
          <div class="tooltipTransportTag">${stop.category === "mtr" ? "MTR connection" : "Bus connection"}</div>
          <div class="tooltipTitle">${stop.title}</div>
          <div class="tooltipSubtitle">${stop.subtitle || ""}</div>
          ${steps.length ? `<div class="tooltipSteps">${steps.map((step) => `<div class="tooltipStep">${step}</div>`).join("")}</div>` : ""}
        </div>
      </div>
    `;
  }

  if (stop?.tooltipOnly) {
    const links = getTooltipLinks(stop);
    const todoButton = getTooltipTodoButton(stop);
    const previewImage = stop.category === "toilet"
      ? ""
      : `<img class="tooltipImg" src="${getPreviewPhoto(stop)}" alt="${stop.title} preview" />`;
    return `
      <div class="tooltipCard tooltipInfoCard">
        ${previewImage}
        <div class="tooltipBody">
          <div class="tooltipTitle">${stop.title}</div>
          ${stop.subtitle ? `<div class="tooltipSubtitle">${stop.subtitle}</div>` : ""}
          ${stop.openingHours ? `<div class="tooltipLine"><strong>Opening:</strong> ${stop.openingHours}</div>` : ""}
          ${stop.shortInfo ? `<div class="tooltipLine">${stop.shortInfo}</div>` : ""}
          ${stop.footprintEstimate ? `<div class="tooltipLine"><strong>Carbon:</strong> ${stop.footprintEstimate}</div>` : ""}
          ${links ? `<div class="tooltipLinks">${links}</div>` : ""}
          ${todoButton}
        </div>
      </div>
    `;
  }

  return `
    <div class="tooltipCard">
      <img class="tooltipImg" src="${getPreviewPhoto(stop)}" alt="${stop.title} preview" />
      <div class="tooltipBody">
        <div class="tooltipTitle">${stop.title}</div>
        ${stop.difficulty ? `<div class="tooltipLine"><strong>Difficulty:</strong> ${stop.difficulty}</div>` : ""}
        <div class="tooltipFootprint">${getFootprintText(stop)}</div>
      </div>
    </div>
  `;
}

