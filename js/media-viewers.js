function buildGallery(container, stop) {
  container.innerHTML = "";
  if (!stop.photos || stop.photos.length === 0) {
    container.innerHTML = `<p class="muted">No photos yet.</p>`;
    return;
  }

  stop.photos.forEach((src, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "galleryItem";
    button.setAttribute("aria-label", `Open photo ${index + 1} of ${stop.photos.length}`);

    const img = document.createElement("img");
    img.src = src;
    img.alt = `${stop.title} photo ${index + 1}`;
    img.loading = "lazy";

    button.appendChild(img);
    button.addEventListener("click", () => openLightbox(stop.photos, index, stop.title));
    container.appendChild(button);
  });
}

function updateLightbox() {
  const overlay = document.getElementById("galleryLightbox");
  const image = document.getElementById("lightboxImage");
  const counter = document.getElementById("lightboxCounter");
  const title = document.getElementById("lightboxTitle");
  const prevBtn = document.getElementById("lightboxPrev");
  const nextBtn = document.getElementById("lightboxNext");

  if (!overlay || !image || !lightboxPhotos.length) return;

  image.src = lightboxPhotos[lightboxIndex];
  image.alt = `${activeLightboxTitle} photo ${lightboxIndex + 1}`;
  counter.textContent = `${lightboxIndex + 1} / ${lightboxPhotos.length}`;
  title.textContent = activeLightboxTitle || "Photo gallery";
  prevBtn.disabled = lightboxPhotos.length <= 1;
  nextBtn.disabled = lightboxPhotos.length <= 1;
}

function openLightbox(photos, index = 0, title = "Photo gallery") {
  const overlay = document.getElementById("galleryLightbox");
  if (!overlay || !photos || !photos.length) return;

  lightboxPhotos = photos.slice();
  lightboxIndex = index;
  activeLightboxTitle = title;
  overlay.classList.add("is-open");
  overlay.setAttribute("aria-hidden", "false");
  document.body.classList.add("lightbox-open");
  updateLightbox();
}

function closeLightbox() {
  const overlay = document.getElementById("galleryLightbox");
  if (!overlay) return;
  overlay.classList.remove("is-open");
  overlay.setAttribute("aria-hidden", "true");
  document.body.classList.remove("lightbox-open");
}

function moveLightbox(step) {
  if (!lightboxPhotos.length) return;
  lightboxIndex = (lightboxIndex + step + lightboxPhotos.length) % lightboxPhotos.length;
  updateLightbox();
}

function getStopPanoramas(stop) {
  return (stop?.panoramas || []).map((item, index) => (
    typeof item === "string" ? { src: item, label: `View ${index + 1}` } : item
  ));
}

function renderPanoramaSection(stop) {
  const card = document.getElementById("panoramaCard");
  const list = document.getElementById("panoramaList");
  const caption = document.getElementById("panoramaCaption");
  const openBtn = document.getElementById("panoramaOpenBtn");
  const panoramas = getStopPanoramas(stop);

  if (!card || !list || !caption || !openBtn) return;

  if (!panoramas.length) {
    card.classList.add("hidden");
    list.innerHTML = "";
    return;
  }

  card.classList.remove("hidden");
  caption.textContent = panoramas.length === 1
    ? "Open the immersive panorama and drag around this stop."
    : `Choose one of ${panoramas.length} immersive panoramas for this stop.`;

  list.innerHTML = "";
  panoramas.forEach((panorama, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "panoramaChip";
    button.textContent = panorama.label || `View ${index + 1}`;
    button.addEventListener("click", () => openPanoramaViewer(panoramas, index, stop.title));
    list.appendChild(button);
  });

  openBtn.onclick = () => openPanoramaViewer(panoramas, 0, stop.title);
}

function updatePanoramaViewer() {
  const overlay = document.getElementById("panoramaViewer");
  const canvas = document.getElementById("panoramaCanvas");
  const counter = document.getElementById("panoramaCounter");
  const title = document.getElementById("panoramaTitle");
  const prevBtn = document.getElementById("panoramaPrev");
  const nextBtn = document.getElementById("panoramaNext");

  if (!overlay || !canvas || !panoramaItems.length) return;

  const current = panoramaItems[panoramaIndex];
  canvas.style.backgroundImage = `url("${current.src}")`;
  canvas.style.backgroundPosition = `${panoramaOffsetX}px center`;
  canvas.setAttribute("aria-label", `${activePanoramaTitle} ${current.label || `view ${panoramaIndex + 1}`}`);
  counter.textContent = `${panoramaIndex + 1} / ${panoramaItems.length}`;
  title.textContent = current.label ? `${activePanoramaTitle} - ${current.label}` : activePanoramaTitle || "360 view";
  prevBtn.disabled = panoramaItems.length <= 1;
  nextBtn.disabled = panoramaItems.length <= 1;
}

function openPanoramaViewer(items, index = 0, title = "360 view") {
  const overlay = document.getElementById("panoramaViewer");
  if (!overlay || !items?.length) return;

  panoramaItems = items.slice();
  panoramaIndex = index;
  activePanoramaTitle = title;
  panoramaOffsetX = 0;
  overlay.classList.add("is-open");
  overlay.setAttribute("aria-hidden", "false");
  document.body.classList.add("panorama-open");
  updatePanoramaViewer();
}

function closePanoramaViewer() {
  const overlay = document.getElementById("panoramaViewer");
  if (!overlay) return;
  overlay.classList.remove("is-open");
  overlay.setAttribute("aria-hidden", "true");
  document.body.classList.remove("panorama-open");
}

function movePanorama(step) {
  if (!panoramaItems.length) return;
  panoramaIndex = (panoramaIndex + step + panoramaItems.length) % panoramaItems.length;
  panoramaOffsetX = 0;
  updatePanoramaViewer();
}

function bindPanoramaViewer() {
  const overlay = document.getElementById("panoramaViewer");
  const stage = document.getElementById("panoramaStage");
  const canvas = document.getElementById("panoramaCanvas");
  if (!overlay || !stage || !canvas) return;

  document.getElementById("panoramaClose")?.addEventListener("click", closePanoramaViewer);
  document.getElementById("panoramaPrev")?.addEventListener("click", () => movePanorama(-1));
  document.getElementById("panoramaNext")?.addEventListener("click", () => movePanorama(1));

  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) closePanoramaViewer();
  });

  let dragging = false;
  let startX = 0;
  let startOffset = 0;

  const onPointerMove = (event) => {
    if (!dragging) return;
    panoramaOffsetX = startOffset + (event.clientX - startX);
    canvas.style.backgroundPosition = `${panoramaOffsetX}px center`;
  };

  const endPointer = () => {
    dragging = false;
    canvas.classList.remove("is-dragging");
  };

  stage.addEventListener("pointerdown", (event) => {
    dragging = true;
    startX = event.clientX;
    startOffset = panoramaOffsetX;
    canvas.classList.add("is-dragging");
    stage.setPointerCapture?.(event.pointerId);
  });

  stage.addEventListener("pointermove", onPointerMove);
  stage.addEventListener("pointerup", endPointer);
  stage.addEventListener("pointercancel", endPointer);
  stage.addEventListener("wheel", (event) => {
    event.preventDefault();
    panoramaOffsetX -= event.deltaY * 0.45;
    canvas.style.backgroundPosition = `${panoramaOffsetX}px center`;
  }, { passive: false });

  document.addEventListener("keydown", (event) => {
    if (!overlay.classList.contains("is-open")) return;
    if (event.key === "Escape") closePanoramaViewer();
    if (event.key === "ArrowLeft") movePanorama(-1);
    if (event.key === "ArrowRight") movePanorama(1);
  });
}

function bindLightbox() {
  const overlay = document.getElementById("galleryLightbox");
  if (!overlay) return;
  const stage = document.getElementById("lightboxStage");

  document.getElementById("lightboxClose")?.addEventListener("click", closeLightbox);
  document.getElementById("lightboxPrev")?.addEventListener("click", () => moveLightbox(-1));
  document.getElementById("lightboxNext")?.addEventListener("click", () => moveLightbox(1));

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeLightbox();
  });

  let startX = 0;
  let trackingTouch = false;
  stage?.addEventListener("touchstart", (e) => {
    if (e.touches?.length !== 1) return;
    startX = e.touches[0].clientX;
    trackingTouch = true;
  }, { passive: true });
  stage?.addEventListener("touchend", (e) => {
    if (!trackingTouch || e.changedTouches?.length !== 1) return;
    const deltaX = e.changedTouches[0].clientX - startX;
    if (Math.abs(deltaX) > 45) moveLightbox(deltaX > 0 ? -1 : 1);
    trackingTouch = false;
  }, { passive: true });

  document.addEventListener("keydown", (e) => {
    if (!overlay.classList.contains("is-open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") moveLightbox(-1);
    if (e.key === "ArrowRight") moveLightbox(1);
  });
}

