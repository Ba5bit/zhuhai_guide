/* ---------- ACTIVE ROUTE DATA ---------- */
const zhuhaiPhotoBase = "./assets/photos";

const planningPhotos = [
  "20260426_100532.jpg", "20260426_100918.jpg", "20260426_101434.jpg", "20260426_101448.jpg",
  "20260426_101716.jpg", "20260426_102338.jpg", "20260426_102715.jpg", "20260426_103825.jpg",
  "IMG_1953.JPG", "IMG_1954.JPG", "IMG_1955.JPG", "IMG_1956.JPG", "IMG_1958.JPG", "IMG_1959.JPG",
  "IMG_1960.JPG", "IMG_1962.JPG", "IMG_1963.JPG", "IMG_1964.JPG", "IMG_1965.JPG", "IMG_1966.JPG", "IMG_1967.JPG"
].map((name) => `${zhuhaiPhotoBase}/heng-qin_planning_exhibition/${name}`);

const wetlandPhotos = [
  "20260426_110357.jpg", "20260426_110733.jpg", "20260426_110948.jpg", "20260426_111014.jpg",
  "20260426_115011.jpg", "20260426_120328.jpg", "20260426_120728.jpg", "20260426_120800.jpg",
  "IMG_1984.JPG", "IMG_1985.JPG", "IMG_1986.JPG", "IMG_1987.JPG", "IMG_1988.JPG",
  "IMG_1989.JPG", "IMG_1990.JPG", "IMG_1991.JPG", "IMG_1992.JPG"
].map((name) => `${zhuhaiPhotoBase}/heng-qun_national_wetland_park/${name}`);

const museumPhotos = [
  "20260425_133116.jpg", "20260425_134626.jpg", "20260425_140147.jpg", "20260425_141400.jpg",
  "photo_2026-04-27_01-00-25.jpg", "photo_2026-04-27_01-00-28.jpg"
].map((name) => `${zhuhaiPhotoBase}/zhuhai_museum/${name}`);

const trailPhotos = ["IMG_2024.JPG", "IMG_2025.JPG", "IMG_2028.JPG", "IMG_2029.JPG"]
  .map((name) => `${zhuhaiPhotoBase}/xiang-shan_trail/${name}`);

const day1 = {
  name: "Low-carbon one-day Zhuhai route",
  color: "#1677b7",
  center: [22.185, 113.53],
  zoom: 11,
  stops: [
    {
      id: "hyatt-hengqin",
      category: "hotel",
      title: "Hyatt Regency Hengqin",
      subtitle: "Start point: 09:00 from the hotel main entrance",
      latlng: [22.124932837634233, 113.51816640877098],
      visitTime: "Start at 09:00",
      story: "Hyatt Regency Hengqin is the starting point for the low-carbon day route. The hotel is positioned close to Hengqin Port transport connections, making it practical to begin the tour with walking and electric buses instead of private car transfers.",
      routeHeading: "Starting from the hotel",
      routeSummary: "Start at the main entrance, then walk to Hengqin Port Bus Stop for the fully electric Z58 bus toward Erjingwan Wetland.",
      steps: [
        "Start at Hyatt Regency Hengqin main entrance.",
        "Walk 8 minutes to Hengqin Port Bus Stop.",
        "Take Fully Electric Bus Z58 toward Erjingwan Wetland.",
        "Ride 6 stops to Erjingwan Wetland Park Stop."
      ],
      photos: [],
      websiteUrl: "https://maps.app.goo.gl/D4AVjTXSGqnKrfkP6",
      websiteLabel: "Google Maps",
      footprint: "First segment: 8.2 km by walking plus fully electric bus, about 0.12 kg CO2.",
      tips: [
        "Start with a reusable water bottle and sun protection before leaving the hotel.",
        "Walking to the bus stop and using an electric bus supports SDG 11 through lower-carbon urban mobility.",
        "Keep breakfast and takeaway packaging minimal to support SDG 12 before entering the wetland area."
      ]
    },
    {
      id: "hengqin-wetland",
      category: "garden",
      title: "Hengqin Erjingwan National Wetland Park",
      subtitle: "09:00-11:00 | Mangroves, migratory birds, eco-education",
      latlng: [22.10239327759265, 113.47459948552306],
      visitTime: "09:00-11:00",
      openingHours: "Summer (Apr 1-Oct 31): 08:30-18:30. Winter (Nov 1-Mar 31): 09:00-18:00.",
      reservation: "Reservation required through the Guangdong Nature Reserve Public Service WeChat mini-program.",
      admission: "Free entry, no ticket required.",
      story: "A national-level protected wetland in Hengqin where visitors can observe animal and insect habitats up close. Phase I, about 53 hectares, is open to the public; Phase II, about 263.76 hectares, remains a conservation area and is not currently open.",
      routeHeading: "Getting there from Hyatt Regency Hengqin",
      routeSummary: "Walk to Hengqin Port Bus Stop, then use Fully Electric Bus Z58 toward Erjingwan Wetland.",
      steps: [
        "Walk 8 minutes from Hyatt Regency Hengqin to Hengqin Port Bus Stop.",
        "Take Fully Electric Bus Z58 toward Erjingwan Wetland.",
        "Ride 6 stops to Erjingwan Wetland Park Stop.",
        "Distance: 8.2 km. Estimated carbon footprint: about 0.12 kg CO2."
      ],
      photos: wetlandPhotos,
      footprint: "Segment footprint: about 0.12 kg CO2 by walking plus fully electric bus.",
      tips: [
        "Highlights: mangrove forest, migratory birds, sunset view, and eco-education.",
        "Nearby food: Eco Cafe at Wetland Visitor Center; Hengqin Seafood Restaurant about 10 minutes by bus.",
        "Nearby spots: Hengqin Flower Corridor and Lijun Pangdu Plaza.",
        "Mall/area: Hengqin Huafa Shopping Mall is about 15 minutes by bus, with supermarket, eco-friendly shops, and rest areas.",
        "Stay on marked wetland paths and avoid disturbing birds or sensitive habitat to support SDG 15."
      ]
    },
    {
      id: "hengqin-planning",
      category: "exhibition",
      title: "Hengqin Planning Exhibition Hall",
      subtitle: "11:30-13:30 | Blue Zhuhai exhibition and interactive displays",
      latlng: [22.132382411217822, 113.52816521828755],
      visitTime: "11:30-13:30",
      admission: "Free admission.",
      story: "The Hengqin Planning Exhibition Hall presents the history of China, Zhuhai, and Hengqin, including the formation of Zhuhai and Hengqin, technological evolution, urban planning, and future goals for Zhuhai and Guangdong.",
      routeHeading: "Getting there from the wetland park",
      routeSummary: "Use fully electric buses with one transfer, then walk from Xiangshan Park East Gate.",
      steps: [
        "Return to Hengqin Port Bus Stop.",
        "Take Fully Electric Bus 86 toward Nanping.",
        "Ride 14 stops to Nanping Street Intersection.",
        "Transfer to Fully Electric Bus 13 toward Sports Center South.",
        "Ride 5 stops to Xiangshan Park East Gate.",
        "Walk 5 minutes to Zhuhai Urban Planning Exhibition Hall.",
        "Distance: 9.5 km. Estimated carbon footprint: about 0.18 kg CO2."
      ],
      photos: planningPhotos,
      panoramas: [
        { src: `${zhuhaiPhotoBase}/heng-qin_planning_exhibition/360/20260426_103449.jpg`, label: "Exhibition panorama" },
        { src: `${zhuhaiPhotoBase}/heng-qin_planning_exhibition/360/20260426_103717.jpg`, label: "Planning display" },
        { src: `${zhuhaiPhotoBase}/heng-qin_planning_exhibition/360/IMG_1969.JPG`, label: "Interior view" },
        { src: `${zhuhaiPhotoBase}/heng-qin_planning_exhibition/360/IMG_1970.JPG`, label: "Model area" }
      ],
      footprint: "Segment footprint: about 0.18 kg CO2 by fully electric buses with one transfer.",
      tips: [
        "Highlights: Blue Zhuhai exhibition, sand tables, interactive displays, and free admission.",
        "Nearby food: Green Bite Healthy Restaurant, 5-minute walk; Xiangshan Lake Cantonese Eatery, 8-minute walk.",
        "Nearby spots: Haitian Park and Zhuhai Museum.",
        "Mall/area: Xiangshan Lake Commercial Street has cafes, bookstores, and eco-friendly souvenirs.",
        "Use this stop to compare development choices with SDG 11 goals such as sustainable planning and public space."
      ]
    },
    {
      id: "zhuhai-museum",
      category: "museum",
      title: "Zhuhai Museum",
      subtitle: "Nearby cultural add-on connected to the planning hall",
      latlng: [22.25953799858723, 113.58316952424858],
      openingHours: "Tuesday-Sunday 09:00-17:00, last entry 16:30. Closed Mondays except public holidays.",
      story: "Zhuhai Museum has multiple exhibits focused on the culture, history, ancient artifacts, and local story of China and Zhuhai. It works as a connected cultural add-on around the exhibition hall area.",
      routeHeading: "Getting there",
      routeSummary: "Bus routes B2, B3, 4, 5, 12, 14, 15, 16, and 204 stop at Haihong Terminal; travel 300 meters east.",
      steps: [
        "Use bus routes B2, B3, 4, 5, 12, 14, 15, 16, or 204 to Haihong Terminal.",
        "Travel 300 meters east to Zhuhai Museum.",
        "Pair this with the planning exhibition if time allows."
      ],
      photos: museumPhotos,
      websiteUrl: "https://www.zhmuseum.org.cn/",
      websiteLabel: "Official website",
      footprint: "Estimated footprint: low when visited as a connected add-on near the planning exhibition area.",
      tips: [
        "Museums support SDG 11 by keeping local history and cultural heritage accessible.",
        "Check the final entry time before adding this stop to the route.",
        "Keep the museum visit linked with nearby stops to avoid extra transport loops."
      ]
    },
    {
      id: "xiangshan-trail",
      category: "hiking",
      title: "Xiangshan Cloud Trail and Xiangshan Park",
      subtitle: "14:00-17:00 | Elevated trail, lake views, mountain-sea-city scenery",
      latlng: [22.275459, 113.573523],
      address: "Xiangshan Trail: 2889 Qinglv Middle Road, Xiangzhou District. Xiangshan Lake Park: 244 Jianmin Road, Xiangzhou District.",
      visitTime: "14:00-17:00",
      openingHours: "East section near Haitian Park: 06:00-21:00. West/Xiangshan Lake section: 06:00-22:00.",
      difficulty: "Easy to moderate",
      distance: "11.2 km elevated trail system",
      duration: "Suggested visit: 3 hours",
      story: "Xiangshan Lake Park and Xiangshan Trail form a connected ecological leisure system in Zhuhai. Enter from Xiangshan Lake Park, walk east through Dajingshan Community Park, and continue toward Haitian Park, where the Zhuhai Grand Theater can be seen. The gentle slope and barrier-free design make it suitable for families, photography, city hiking, and older visitors.",
      routeHeading: "Getting there from the exhibition hall",
      routeSummary: "Walk 5 minutes from the exhibition hall to the Xiangshan Cloud Trail Entrance at the East Gate.",
      steps: [
        "Walk 5 minutes from the exhibition hall to Xiangshan Cloud Trail Entrance at East Gate.",
        "Suggested route: East Gate -> Xiangshan Lake Section -> Dajingshan Reservoir Viewing Platform -> Xiangshan Park.",
        "End at Xiangshan Park or continue toward nearby commercial areas if time allows."
      ],
      photos: trailPhotos,
      panoramas: [
        { src: `${zhuhaiPhotoBase}/xiang-shan_trail/360/20260426_144221.jpg`, label: "Trail panorama" },
        { src: `${zhuhaiPhotoBase}/xiang-shan_trail/360/IMG_2019.JPG`, label: "Trail view" }
      ],
      footprint: "Walking segment: very low additional footprint. Total day footprint remains about 0.30 kg CO2 for the electric-bus route.",
      tips: [
        "Highlights: 11.2 km elevated trail, mountain-sea-city views, gentle slope, and free access.",
        "Nearby food: Cloud Trail Tea House and Xiangshan Park Local Restaurant.",
        "Nearby spots: Xiangshan Lake Park and Dajingshan Mountain Forest Park.",
        "Mall/area: Sports Center Commercial Plaza is about 10 minutes from the south gate.",
        "Wear comfortable shoes, bring a reusable water bottle, and follow Leave No Trace principles."
      ]
    },
    {
      id: "powerlong-plaza",
      category: "mall",
      tooltipOnly: true,
      title: "Zhuhai Powerlong Plaza",
      subtitle: "Shopping, dining, supermarket, restrooms, and seating areas",
      latlng: [22.263, 113.526],
      address: "Jinfeng North Road, Xiangzhou District, Zhuhai",
      openingHours: "Sun-Thu 10:00-22:00; Fri-Sat 10:00-22:30",
      shortInfo: "A large shopping and dining hub in Xiangzhou District on Jinfeng North Road, useful for meals, retail, supermarket access, and rest areas.",
      websiteUrl: "https://www.google.com/maps/search/?api=1&query=Zhuhai%20Powerlong%20Plaza%20Jinfeng%20North%20Road",
      websiteLabel: "Google Maps",
      photos: []
    },
    {
      id: "yexiang-yipin",
      category: "restaurant",
      tooltipOnly: true,
      title: "Yexiang Yipin Coconut Chicken Hot Pot",
      subtitle: "L4-028, 4th Floor, Zhuhai Powerlong Plaza",
      latlng: [22.2632, 113.5262],
      address: "Shop L4-028, 4th Floor, Zhuhai Powerlong Plaza, Jinfeng North Road, Xiangzhou District",
      openingHours: "Use Powerlong Plaza opening hours as reference.",
      shortInfo: "Coconut chicken hot pot restaurant inside Powerlong Plaza. Enter the mall and take elevators or escalators to the 4th floor.",
      footprintEstimate: "Estimated meal footprint: moderate to high, about 1.5-3.0 kg CO2e per person depending on portion size and protein additions.",
      websiteUrl: "https://www.google.com/maps/search/?api=1&query=Yexiang%20Yipin%20Coconut%20Chicken%20Hot%20Pot%20Zhuhai%20Powerlong%20Plaza",
      websiteLabel: "Google Maps",
      photos: []
    }
  ]
};

const day2 = {
  name: "Unused",
  color: day1.color,
  center: day1.center,
  zoom: day1.zoom,
  stops: []
};
