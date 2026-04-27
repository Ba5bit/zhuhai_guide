/* ---------- ROUTE CONFIG ---------- */
const routePlans = {
  day1: [
    { type: "stay", label: "09:00 - Start at Hyatt Regency Hengqin", meta: "Walk 8 minutes to Hengqin Port Bus Stop." },
    { type: "transfer", label: "Electric Bus Z58 to Erjingwan Wetland", meta: "6 stops, about 8.2 km, about 0.12 kg CO2." },
    { type: "stop", label: "09:00-11:00 - Hengqin Erjingwan National Wetland Park", meta: "Mangrove forest, migratory birds, eco-education, and wetland habitat." },
    { type: "transfer", label: "Electric Bus 86 + Electric Bus 13", meta: "1 transfer toward Xiangshan Park East Gate, about 9.5 km, about 0.18 kg CO2." },
    { type: "stop", label: "11:30-13:30 - Hengqin Planning Exhibition Hall", meta: "Blue Zhuhai exhibition, sand tables, interactive displays, free admission." },
    { type: "optional", label: "Nearby add-on - Zhuhai Museum", meta: "Connected local history museum, open Tuesday-Sunday 09:00-17:00." },
    { type: "stop", label: "14:00-17:00 - Xiangshan Cloud Trail and Xiangshan Park", meta: "11.2 km elevated trail with mountain-sea-city views and gentle slopes." },
    { type: "optional", label: "Food and mall option - Powerlong Plaza", meta: "Dining, supermarket, restrooms, seating areas, and Yexiang Yipin Coconut Chicken Hot Pot." }
  ]
};

const landingDayMeta = {
  day1: {
    title: "Low-carbon one-day Zhuhai route",
    summary: "Hyatt Regency Hengqin, Erjingwan Wetland, Hengqin Planning Exhibition Hall, Zhuhai Museum, and Xiangshan Cloud Trail by electric bus and walking."
  }
};

const categoryLabels = {
  all: "All",
  hotel: "Hotels",
  mtr: "MTR",
  bus: "Bus stops",
  hiking: "Hiking spots",
  restaurant: "Restaurants",
  "convenience-store": "Convenience stores",
  store: "Stores",
  toilet: "Public toilets",
  mall: "Malls",
  garden: "Wetlands / gardens",
  museum: "Museums",
  railway: "Railway",
  tree: "Nature",
  temple: "Temples",
  exhibition: "Exhibitions"
};

const categoryLegendOrder = [
  "hotel",
  "garden",
  "exhibition",
  "museum",
  "hiking",
  "mall",
  "restaurant",
  "bus",
  "toilet",
  "store",
  "convenience-store",
  "mtr",
  "tree",
  "temple",
  "railway"
];

const categoryLegendNames = {
  hotel: "Hotel / start",
  garden: "Wetland / park",
  exhibition: "Exhibition hall",
  museum: "Museum",
  hiking: "Cloud trail",
  mall: "Mall / area",
  restaurant: "Restaurant",
  bus: "Electric bus",
  toilet: "Public toilet",
  store: "Store",
  "convenience-store": "Convenience store",
  mtr: "MTR",
  tree: "Nature",
  temple: "Temple",
  railway: "Railway"
};

const audioGuideLabels = {
  cn: "Chinese",
  ct: "Cantonese",
  en: "English"
};

const audioGuideCatalog = {
  "hengqin-wetland": {
    cn: ["./assets/voices/cn/hengqin_cn.flac"],
    en: ["./assets/voices/en/hengqin.flac"]
  },
  "hengqin-planning": {
    cn: ["./assets/voices/cn/exhibition_cn.flac"],
    en: ["./assets/voices/en/exhibition.flac"]
  },
  "xiangshan-trail": {
    cn: ["./assets/voices/cn/xiangshan_cn.flac"],
    en: ["./assets/voices/en/xiangshan.flac"]
  }
};
const audioGuideChoiceCache = new Map();
let selectedAudioGuideLanguage = "en";
