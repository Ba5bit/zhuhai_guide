# Zhuhai Sustainable Guide

Zhuhai Sustainable Guide is a static interactive travel website for a one-day low-carbon trip in Zhuhai. The experience combines a blue-themed landing page, an interactive Leaflet map, route stops, photo galleries, audio guides, optional 360 panorama views, and a small personal trip checklist.

## Project Overview

This project is built as a client-side web app with no build step or backend. Everything is served from static files:

- `index.html` defines the landing page, map layout, mobile drawers, stop detail page, lightbox, and panorama viewer.
- `style.css` handles the blue visual theme, responsive layout, overlays, drawers, map controls, and gallery controls.
- `app.js` is only a compatibility note. The real application code is split into focused files under `js/`.
- `js/` contains the route data, map logic, UI rendering, checklist behavior, audio guide handling, and media viewers.
- `assets/` stores icons, logo files, photos, panoramas, and multilingual audio files.

## Highlights

- One-day sustainable Zhuhai route centered on Hengqin, central Zhuhai, and nearby cultural/nature stops.
- Interactive Leaflet map centered on Zhuhai with custom route markers and compact mobile controls.
- Suggested trip flow with start point, nature stop, planning exhibition, museum add-on, Xiangshan trail, shopping, and dinner.
- Personal trip checklist stored in `localStorage`.
- Stop detail pages with:
  - route guidance
  - sustainability notes
  - photo galleries with a lightbox viewer
  - English and Chinese audio guides for selected stops
  - optional 360 panorama views for selected locations
- Responsive layout for desktop and mobile.

## Stops Included

The current one-day route includes:

- Hyatt Regency Hengqin
- Hengqin Erjingwan National Wetland Park
- Hengqin Planning Exhibition Hall
- Zhuhai Museum
- Xiangshan Cloud Trail and Xiangshan Park
- Zhuhai Powerlong Plaza
- Yexiang Yipin Coconut Chicken Hot Pot

## JavaScript Structure

The app logic is modularized into smaller classic JavaScript files loaded by `index.html`:

- `js/core.js` - shared state, DOM references, helpers, and base map setup.
- `js/route-data.js` - stop data, coordinates, descriptions, photos, and stop metadata.
- `js/route-config.js` - itinerary configuration, transport notes, and audio guide references.
- `js/legend-and-guides.js` - map legend, guide panels, and supporting route UI.
- `js/checklists-and-landing.js` - landing selection behavior and trip checklist controls.
- `js/media-viewers.js` - lightbox and panorama viewer behavior.
- `js/stop-rendering.js` - stop detail page rendering.
- `js/map-routing.js` - marker rendering, filters, route layers, and map interactions.
- `js/utility-ui.js` - drawers, utility panels, and mobile controls.
- `js/init.js` - application initialization.

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript
- [Leaflet](https://leafletjs.com/) for interactive maps
- CARTO Voyager raster tiles with OpenStreetMap attribution
- Google Fonts for typography

## Running Locally

Because this is a static project, you can run it with any simple static server.

### Option 1: Open directly

Open `index.html` in your browser.

### Option 2: Serve locally

If you prefer a local server, you can use one of these:

```powershell
python -m http.server 8000
```

or

```powershell
npx serve .
```

Then open `http://localhost:8000` or the URL shown by your server.

## Deployment

The repository includes a GitHub Actions workflow at `.github/workflows/static.yml` that deploys the full site to GitHub Pages whenever changes are pushed to the `main` branch.

## Project Structure

```text
zhuhai_guide/
|-- .github/
|   `-- workflows/
|       `-- static.yml
|-- assets/
|   |-- icons/
|   |-- logo/
|   |-- photos/
|   |   |-- heng-qin_planning_exhibition/
|   |   |-- heng-qun_national_wetland_park/
|   |   |-- hotel/
|   |   |-- plaza/
|   |   |-- xiang-shan_trail/
|   |   `-- zhuhai_museum/
|   |-- sounds/
|   `-- voices/
|       |-- cn/
|       `-- en/
|-- js/
|   |-- checklists-and-landing.js
|   |-- core.js
|   |-- init.js
|   |-- legend-and-guides.js
|   |-- map-routing.js
|   |-- media-viewers.js
|   |-- route-config.js
|   |-- route-data.js
|   |-- stop-rendering.js
|   `-- utility-ui.js
|-- app.js
|-- index.html
|-- style.css
`-- README.md
```

## Notes for Future Development

- Route content is currently hardcoded in `js/route-data.js` and `js/route-config.js`.
- External assets such as Leaflet, map tiles, and Google Fonts require an internet connection.
- If the itinerary grows, the stop data could be moved into JSON files or a small data layer for easier editing.
