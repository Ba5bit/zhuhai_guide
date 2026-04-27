const day1 = {};
const day2 = {};
/* ---------- ZHUHAI SINGLE-DAY ROUTE ---------- */
const zhuhaiPhotoBase = "./assets/photos";

Object.assign(day1, {
  name: "One-day Zhuhai route",
  color: "#2f6624",
  center: [22.166, 113.54],
  zoom: 11,
  stops: [
    {
      id: "zhuhai-museum",
      category: "museum",
      title: "Zhuhai Museum",
      subtitle: "Culture and city-history starting point",
      latlng: [22.2558, 113.5788],
      story: "Zhuhai Museum is the cultural anchor for the day, giving the route a slower start through local history, urban identity, and exhibition spaces before moving south toward Hengqin's planning and ecology stops.",
      routeHeading: "Starting the route",
      routeSummary: "Begin in central Zhuhai, then continue toward Hengqin by public transport, shared ride, or a planned group transfer.",
      steps: [
        "Start at Zhuhai Museum and browse the permanent or temporary exhibitions.",
        "Refill water and prepare reusable items before leaving the city-center area.",
        "Continue south toward Hengqin for the planning exhibition and wetland stops."
      ],
      photos: [
        `${zhuhaiPhotoBase}/zhuhai_museum/20260425_133116.jpg`,
        `${zhuhaiPhotoBase}/zhuhai_museum/20260425_134626.jpg`,
        `${zhuhaiPhotoBase}/zhuhai_museum/20260425_140147.jpg`,
        `${zhuhaiPhotoBase}/zhuhai_museum/20260425_141400.jpg`,
        `${zhuhaiPhotoBase}/zhuhai_museum/photo_2026-04-27_01-00-25.jpg`,
        `${zhuhaiPhotoBase}/zhuhai_museum/photo_2026-04-27_01-00-28.jpg`
      ],
      audio: [],
      footprint: "Estimated footprint: 0.2-0.7 kg CO2e when visited as the city-center starting point and combined with the onward route.",
      tips: [
        "Starting with a museum supports SDG 11 by keeping cultural heritage and local identity visible within the trip.",
        "Use refillable bottles and avoid single-use packaging before moving to the outdoor stops.",
        "Keep the museum visit compact and linked to the same onward route to avoid extra transport loops."
      ]
    },
    {
      id: "hengqin-planning",
      category: "exhibition",
      title: "Hengqin Planning Exhibition",
      subtitle: "Urban planning and sustainable development exhibit",
      latlng: [22.129, 113.546],
      story: "The Hengqin Planning Exhibition connects the trip to Zhuhai's future-facing development story, showing how land use, transport, public space, and regional cooperation shape the island's growth.",
      routeHeading: "Getting there from Zhuhai Museum",
      routeSummary: "Travel south from central Zhuhai into Hengqin, then pair this indoor planning stop with the nearby wetland landscape.",
      steps: [
        "Leave Zhuhai Museum and travel toward Hengqin.",
        "Visit the planning exhibition before the outdoor wetland stop, especially during the hotter part of the day.",
        "Use the exhibition as context for reading Hengqin's roads, public spaces, and ecological zones later in the route."
      ],
      photos: [
        `${zhuhaiPhotoBase}/heng-qin_planning_exhibition/20260426_100532.jpg`,
        `${zhuhaiPhotoBase}/heng-qin_planning_exhibition/20260426_100918.jpg`,
        `${zhuhaiPhotoBase}/heng-qin_planning_exhibition/20260426_101434.jpg`,
        `${zhuhaiPhotoBase}/heng-qin_planning_exhibition/20260426_101448.jpg`,
        `${zhuhaiPhotoBase}/heng-qin_planning_exhibition/20260426_101716.jpg`,
        `${zhuhaiPhotoBase}/heng-qin_planning_exhibition/20260426_102338.jpg`,
        `${zhuhaiPhotoBase}/heng-qin_planning_exhibition/20260426_102715.jpg`,
        `${zhuhaiPhotoBase}/heng-qin_planning_exhibition/20260426_103825.jpg`,
        `${zhuhaiPhotoBase}/heng-qin_planning_exhibition/IMG_1953.JPG`,
        `${zhuhaiPhotoBase}/heng-qin_planning_exhibition/IMG_1954.JPG`,
        `${zhuhaiPhotoBase}/heng-qin_planning_exhibition/IMG_1955.JPG`,
        `${zhuhaiPhotoBase}/heng-qin_planning_exhibition/IMG_1956.JPG`,
        `${zhuhaiPhotoBase}/heng-qin_planning_exhibition/IMG_1958.JPG`,
        `${zhuhaiPhotoBase}/heng-qin_planning_exhibition/IMG_1959.JPG`,
        `${zhuhaiPhotoBase}/heng-qin_planning_exhibition/IMG_1960.JPG`,
        `${zhuhaiPhotoBase}/heng-qin_planning_exhibition/IMG_1962.JPG`,
        `${zhuhaiPhotoBase}/heng-qin_planning_exhibition/IMG_1963.JPG`,
        `${zhuhaiPhotoBase}/heng-qin_planning_exhibition/IMG_1964.JPG`,
        `${zhuhaiPhotoBase}/heng-qin_planning_exhibition/IMG_1965.JPG`,
        `${zhuhaiPhotoBase}/heng-qin_planning_exhibition/IMG_1966.JPG`,
        `${zhuhaiPhotoBase}/heng-qin_planning_exhibition/IMG_1967.JPG`
      ],
      panoramas: [
        { src: `${zhuhaiPhotoBase}/heng-qin_planning_exhibition/360/20260426_103449.jpg`, label: "Exhibition panorama" },
        { src: `${zhuhaiPhotoBase}/heng-qin_planning_exhibition/360/20260426_103717.jpg`, label: "Planning display" },
        { src: `${zhuhaiPhotoBase}/heng-qin_planning_exhibition/360/IMG_1969.JPG`, label: "Interior view" },
        { src: `${zhuhaiPhotoBase}/heng-qin_planning_exhibition/360/IMG_1970.JPG`, label: "Model area" }
      ],
      audio: [],
      footprint: "Estimated footprint: 0.3-0.9 kg CO2e when combined with the Hengqin wetland stop in one continuous route.",
      tips: [
        "Use this stop to compare development choices with SDG 11 goals such as inclusive public space and sustainable urban planning.",
        "Keep the indoor stop paired with nearby outdoor visits to reduce repeated cross-city travel.",
        "Avoid disposable exhibition handouts unless they are needed for learning or accessibility."
      ]
    },
    {
      id: "hengqin-wetland",
      category: "garden",
      title: "Hengqin National Wetland Park",
      subtitle: "Mangrove, wetland, and bird habitat",
      latlng: [22.143, 113.508],
      story: "Hengqin National Wetland Park shifts the day from urban planning to ecological restoration, with wetland scenery, mangrove habitat, and open-air paths that make the sustainability theme visible on the ground.",
      routeHeading: "Getting there from Hengqin Planning Exhibition",
      routeSummary: "Continue within Hengqin and keep this as the main slow outdoor stop of the day.",
      steps: [
        "Travel from the planning exhibition toward the wetland park entrance.",
        "Walk slowly through the wetland paths and lookout areas.",
        "Keep distance from birds and sensitive vegetation, then continue to Xiangshan Trail if time and weather allow."
      ],
      photos: [
        `${zhuhaiPhotoBase}/heng-qun_national_wetland_park/20260426_110357.jpg`,
        `${zhuhaiPhotoBase}/heng-qun_national_wetland_park/20260426_110733.jpg`,
        `${zhuhaiPhotoBase}/heng-qun_national_wetland_park/20260426_110948.jpg`,
        `${zhuhaiPhotoBase}/heng-qun_national_wetland_park/20260426_111014.jpg`,
        `${zhuhaiPhotoBase}/heng-qun_national_wetland_park/20260426_115011.jpg`,
        `${zhuhaiPhotoBase}/heng-qun_national_wetland_park/20260426_120328.jpg`,
        `${zhuhaiPhotoBase}/heng-qun_national_wetland_park/20260426_120728.jpg`,
        `${zhuhaiPhotoBase}/heng-qun_national_wetland_park/20260426_120800.jpg`,
        `${zhuhaiPhotoBase}/heng-qun_national_wetland_park/IMG_1984.JPG`,
        `${zhuhaiPhotoBase}/heng-qun_national_wetland_park/IMG_1985.JPG`,
        `${zhuhaiPhotoBase}/heng-qun_national_wetland_park/IMG_1986.JPG`,
        `${zhuhaiPhotoBase}/heng-qun_national_wetland_park/IMG_1987.JPG`,
        `${zhuhaiPhotoBase}/heng-qun_national_wetland_park/IMG_1988.JPG`,
        `${zhuhaiPhotoBase}/heng-qun_national_wetland_park/IMG_1989.JPG`,
        `${zhuhaiPhotoBase}/heng-qun_national_wetland_park/IMG_1990.JPG`,
        `${zhuhaiPhotoBase}/heng-qun_national_wetland_park/IMG_1991.JPG`,
        `${zhuhaiPhotoBase}/heng-qun_national_wetland_park/IMG_1992.JPG`
      ],
      audio: [],
      footprint: "Estimated footprint: 0.2-0.6 kg CO2e when reached as part of the existing Hengqin route and explored on foot.",
      tips: [
        "Stay on marked paths to protect wetland edges and planted areas, supporting SDG 15.",
        "Keep voices low around bird habitat and avoid feeding wildlife.",
        "Pack out all litter and reduce packaged snacks to support SDG 12."
      ]
    },
    {
      id: "xiangshan-trail",
      category: "hiking",
      title: "Xiangshan Trail",
      subtitle: "Short nature walk to finish the day",
      latlng: [22.256, 113.56],
      story: "Xiangshan Trail adds a light walking finish to the one-day route, giving the trip a more active close without turning it into a long hike. It works best as a flexible final stop depending on heat, daylight, and group energy.",
      routeHeading: "Flexible final stop",
      routeSummary: "Use this as the final active stop if weather, daylight, and transport timing are suitable.",
      difficulty: "Easy to moderate",
      distance: "Short local trail section",
      duration: "Allow 45-90 minutes",
      steps: [
        "Check weather and daylight before committing to the trail.",
        "Bring water from earlier stops and avoid single-use bottles.",
        "Walk only the section that fits the group's timing, then end the route in Zhuhai."
      ],
      photos: [
        `${zhuhaiPhotoBase}/xiang-shan_trail/IMG_2024.JPG`,
        `${zhuhaiPhotoBase}/xiang-shan_trail/IMG_2025.JPG`,
        `${zhuhaiPhotoBase}/xiang-shan_trail/IMG_2028.JPG`,
        `${zhuhaiPhotoBase}/xiang-shan_trail/IMG_2029.JPG`
      ],
      panoramas: [
        { src: `${zhuhaiPhotoBase}/xiang-shan_trail/360/20260426_144221.jpg`, label: "Trail panorama" },
        { src: `${zhuhaiPhotoBase}/xiang-shan_trail/360/IMG_2019.JPG`, label: "Trail view" }
      ],
      audio: [],
      footprint: "Estimated footprint: 0.1-0.4 kg CO2e when added as a walking stop within the same day route.",
      tips: [
        "Stay on the trail surface to reduce erosion and support SDG 15.",
        "Use refillable water and take all waste back out.",
        "Skip the trail in poor weather rather than creating avoidable transport or safety pressure."
      ]
    }
  ]
});

Object.assign(day2, {
  name: "Unused",
  center: day1.center,
  zoom: day1.zoom,
  stops: []
});
