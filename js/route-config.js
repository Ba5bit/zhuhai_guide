const routePlans = {
  day1: [
    { type: "stay", label: "Start at Royal Park Hotel", meta: "Prepare for a public-transport first day." },
    { type: "transfer", label: "MTR + bus/minibus into Tai Po", meta: "Use rail first, then local public transport." },
    { type: "stop", label: "Lam Tsuen", meta: "Main heritage and village stop." },
    { type: "optional", label: "Man Mo Temple", meta: "Optional stop inside the market district." },
    { type: "stop", label: "Hong Kong Railway Museum", meta: "Easy walkable cultural stop." },
    { type: "optional", label: "Tai Po Market free exploration", meta: "Optional local wandering time." },
    { type: "transfer", label: "Return by MTR to Sha Tin", meta: "Simple rail transfer back." },
    { type: "stop", label: "Ten Thousand Buddhas Monastery", meta: "Optional higher-effort cultural climb before ending the day." },
    { type: "stay", label: "Return to hotel", meta: "End of Day 1." }
  ],
  day2: [
    { type: "stay", label: "Start at Royal Park Hotel", meta: "Compact walking-focused second day." },
    { type: "stop", label: "Hong Kong Heritage Museum", meta: "Main cultural anchor for the day." },
    { type: "stop", label: "Che Kung Temple", meta: "Classic heritage stop in Sha Tin." },
    { type: "optional", label: "Free exploration around Sha Tin", meta: "Use the riverfront, mall, or cafe cluster as you like." },
    { type: "stay", label: "Leave / end route", meta: "Flexible finish depending on your schedule." }
  ]
};

const landingDayMeta = {
  day1: {
    title: "Day 1 - Tai Po",
    summary: "Village heritage, temple streets, railway stories, practical food stops, and optional hiking add-ons linked by public transport."
  },
  day2: {
    title: "Day 2 - Sha Tin",
    summary: "Museum visits, temple heritage, riverside walking, city conveniences, and optional Lion Rock exploration around Sha Tin."
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

const categoryLegendOrder = ["restaurant", "convenience-store", "store", "toilet", "mtr", "bus", "hiking", "exhibition", "tree", "temple", "museum", "hotel", "railway", "mall", "garden"];
const categoryLegendNames = {
  restaurant: "Canteen | Restaurant",
  "convenience-store": "Convenience store",
  store: "Store",
  toilet: "Public toilet",
  mtr: "MTR",
  bus: "Bus stop",
  hiking: "Hiking spot",
  exhibition: "Exhibition",
  tree: "Lam Tsuen Wishing Tree",
  temple: "Temple",
  museum: "Museum",
  hotel: "Hotel",
  railway: "Railway",
  mall: "Shopping",
  garden: "Wetland / garden"
};

const audioGuideLabels = {
  cn: "Chinese",
  ct: "Cantonese",
  en: "English"
};

const audioGuideCatalog = {
  "d2-chekung": {
    cn: ["./assets/sounds/cn/Che Kung Temple.mp3"],
    ct: ["./assets/sounds/ct/Che Kung Temple(Female).mp3", "./assets/sounds/ct/Che Kung Temple(Male).mp3"],
    en: ["./assets/sounds/en/Che Kung Temple(Female).mp3", "./assets/sounds/en/Che Kung Temple (Male).mp3"]
  },
  "d2-heritage": {
    cn: ["./assets/sounds/cn/Hong Kong Heritage Museum.mp3"],
    ct: ["./assets/sounds/ct/Hong Kong Heritage Museum(Female).mp3", "./assets/sounds/ct/Hong Kong Heritage Museumï¼ˆMaleï¼‰.mp3"],
    en: ["./assets/sounds/en/Hong Kong Heritage Museumï¼ˆFemaleï¼‰.mp3", "./assets/sounds/en/Hong Kong Heritage Museumï¼ˆMaleï¼‰.mp3"]
  },
  "d1-railway": {
    cn: ["./assets/sounds/cn/Hong Kong Railway Museum.mp3"],
    ct: ["./assets/sounds/ct/Hong Kong Railway Museum(Female).mp3", "./assets/sounds/ct/Hong Kong Railway Museum(Male).mp3"],
    en: ["./assets/sounds/en/Hong Kong Railway Museumï¼ˆFemaleï¼‰.mp3", "./assets/sounds/en/Hong Kong Railway Museumï¼ˆMaleï¼‰.mp3"]
  },
  "d1-lamtsuen": {
    cn: ["./assets/sounds/cn/Lam Tsuen Village.mp3"],
    ct: ["./assets/sounds/ct/Lam Tsuen Village(Female).mp3", "./assets/sounds/ct/Lam Tsuen Village(Male).mp3"],
    en: ["./assets/sounds/en/Lam Tsuenï¼ˆFemaleï¼‰.mp3", "./assets/sounds/en/Lam Tsuenï¼ˆMaleï¼‰.mp3"]
  },
  "d1-manmo": {
    cn: ["./assets/sounds/cn/Tai Po Man Mo Temple.mp3"],
    ct: ["./assets/sounds/ct/Tai Po Man Mo Temple(Female).mp3", "./assets/sounds/ct/Tai Po Man Mo Temple(Male).mp3"],
    en: ["./assets/sounds/en/Tai Po Man Mo Templeï¼ˆFemaleï¼‰.mp3", "./assets/sounds/en/Tai Po Man Mo Templeï¼ˆMaleï¼‰.mp3"]
  },
  "d1-buddhas": {
    cn: ["./assets/sounds/cn/Ten Thousand Buddhas Monastery.mp3"],
    ct: ["./assets/sounds/ct/Ten Thousand Buddhas Monastery(Female).mp3", "./assets/sounds/ct/Ten Thousand Buddhas Monastery(Male).mp3"],
    en: ["./assets/sounds/en/Ten Thousand Buddhas Monasteryï¼ˆFemaleï¼‰.mp3", "./assets/sounds/en/Ten Thousand Buddhas Monasteryï¼ˆMaleï¼‰.mp3"]
  }
};

routePlans.day1 = [
  { type: "stop", label: "Zhuhai Museum", meta: "Start with culture, history, and a lower-intensity indoor visit." },
  { type: "transfer", label: "Travel south to Hengqin", meta: "Use public transport, shared ride, or group transfer instead of separate car trips." },
  { type: "stop", label: "Hengqin Planning Exhibition", meta: "Understand the island's urban development and public-space planning." },
  { type: "stop", label: "Hengqin National Wetland Park", meta: "Slow outdoor stop focused on wetland ecology and low-impact walking." },
  { type: "optional", label: "Xiangshan Trail", meta: "Flexible short trail finish if weather and daylight are suitable." },
  { type: "stay", label: "End in Zhuhai", meta: "Finish as a single-day sustainable route." }
];
delete routePlans.day2;

landingDayMeta.day1 = {
  title: "One-day Zhuhai route",
  summary: "Museum, Hengqin planning, wetland ecology, and a light trail linked into one lower-impact day."
};
delete landingDayMeta.day2;

Object.assign(audioGuideCatalog, {
  "zhuhai-museum": {},
  "hengqin-planning": {},
  "hengqin-wetland": {},
  "xiangshan-trail": {}
});

