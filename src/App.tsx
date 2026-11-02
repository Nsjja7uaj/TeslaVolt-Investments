import { useEffect, useMemo, useState } from "react";
import { getCountries, getCountryCallingCode } from "libphonenumber-js";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BatteryCharging,
  Cable,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  Clock3,
  Gauge,
  Globe2,
  LockKeyhole,
  Mail,
  Menu,
  MessageCircle,
  Minus,
  Play,
  Plus,
  Radio,
  ShieldCheck,
  Sparkles,
  Sun,
  UsersRound,
  X,
  Zap,
} from "lucide-react";

type PhotoCredit = {
  label: string;
  url: string;
  license: string;
  licenseUrl: string;
};

type VehicleImage = {
  image: string;
  alt: string;
  caption: string;
  credit?: PhotoCredit;
};

type Vehicle = {
  name: string;
  category: string;
  description: string;
  range: string;
  acceleration: string;
  charging: string;
  seating: string;
  features: string[];
  interior: string;
  storage: string;
  performanceDetails: string;
  gallery: VehicleImage[];
  officialUrl: string;
  specificationsNote?: string;
  accent: string;
};

const commonsCredit = (
  fileName: string,
  label: string,
  license: "CC BY-SA 4.0" | "CC BY 4.0" | "CC BY-SA 2.0" | "CC BY 2.0" | "CC0",
): PhotoCredit => ({
  label,
  url: `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(fileName.replace(/ /g, "_"))}`,
  license,
  licenseUrl:
    license === "CC0"
      ? "https://creativecommons.org/publicdomain/zero/1.0/"
      : `https://creativecommons.org/licenses/${
          license === "CC BY-SA 4.0"
            ? "by-sa/4.0"
            : license === "CC BY 4.0"
              ? "by/4.0"
              : license === "CC BY-SA 2.0"
                ? "by-sa/2.0"
                : "by/2.0"
        }/`,
});

const vehicles: Vehicle[] = [
  {
    name: "Tesla Model S",
    category: "Luxury electric sedan",
    description:
      "A long-range electric sedan pairing a spacious cabin with available all-wheel-drive performance and access to Tesla's charging network.",
    range: "EPA-est. up to 402 mi (Long Range)",
    acceleration: "1.99 sec 0–60 mph (Plaid)",
    charging: "Tesla Supercharger network; charge speed varies by charger and conditions.",
    seating: "5 seats",
    features: [
      "Available dual-motor all-wheel drive and Plaid configuration",
      "Panoramic glass roof with front and rear cargo areas",
      "Central touchscreen with a separate driver display",
    ],
    interior:
      "A minimalist cabin with a central touchscreen, driver display, panoramic glass roof, and seating for five. Specific trim and cabin equipment can vary by model year.",
    storage:
      "Front and rear cargo areas provide enclosed storage. Cargo layout and capacity vary by configuration; consult Tesla's current model information.",
    performanceDetails:
      "Available dual-motor all-wheel drive; 1.99 seconds to 60 mph is Tesla's stated Plaid figure with rollout subtracted.",
    gallery: [
      {
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b6/2021_Tesla_Model_S_P2_Long_Range_front_right_view.jpg/1920px-2021_Tesla_Model_S_P2_Long_Range_front_right_view.jpg",
        alt: "2021 Tesla Model S Long Range front three-quarter view",
        caption: "2021 Long Range · front three-quarter",
        credit: commonsCredit("2021 Tesla Model S P2 Long Range front right view.jpg", "Dllu", "CC BY-SA 4.0"),
      },
      {
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9f/20180630_Tesla_Model_S_70D_2015_midnight_blue_left_front.jpg/1920px-20180630_Tesla_Model_S_70D_2015_midnight_blue_left_front.jpg",
        alt: "2015 Tesla Model S 70D front-left exterior view",
        caption: "2015 Model S 70D · front-left view",
        credit: commonsCredit("20180630 Tesla Model S 70D 2015 midnight blue left front.jpg", "Granada", "CC BY-SA 4.0"),
      },
      {
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fc/20180630_Tesla_Model_S_70D_midnight_blue_Tesla_Model_S_70D_2015_rear_right-2.jpg/1920px-20180630_Tesla_Model_S_70D_midnight_blue_Tesla_Model_S_70D_2015_rear_right-2.jpg",
        alt: "2015 Tesla Model S 70D rear-right exterior view",
        caption: "2015 Model S 70D · rear-right view",
        credit: commonsCredit("20180630 Tesla Model S 70D midnight blue Tesla Model S 70D 2015 rear right-2.jpg", "Granada", "CC BY-SA 4.0"),
      },
      {
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/55/Tesla_Model_S%2C_Geneva_2014.jpg/1920px-Tesla_Model_S%2C_Geneva_2014.jpg",
        alt: "Tesla Model S displayed at Geneva in 2014",
        caption: "Model S · Geneva display, 2014",
        credit: commonsCredit("Tesla Model S, Geneva 2014.jpg", "Ank Kumar", "CC BY-SA 4.0"),
      },
      {
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/15/Resized_Tesla_Model_S_rear_NAIAS_2012.jpg/1920px-Resized_Tesla_Model_S_rear_NAIAS_2012.jpg",
        alt: "Tesla Model S rear cargo area with the rear seats folded",
        caption: "Model S · rear cargo area",
        credit: commonsCredit("Resized Tesla Model S rear NAIAS 2012.jpg", "Autoviva, uploaded by TM", "CC BY-SA 2.0"),
      },
      {
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c7/The_interior_of_TESLA_MODEL_S_P100D.jpg/1920px-The_interior_of_TESLA_MODEL_S_P100D.jpg",
        alt: "Interior of a Tesla Model S P100D",
        caption: "Model S P100D · interior detail",
        credit: commonsCredit("The interior of TESLA MODEL S P100D.jpg", "Tokumeigakarinoaoshima", "CC BY-SA 4.0"),
      },
      {
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8c/Tesla_Model_S_Interior.jpg/1920px-Tesla_Model_S_Interior.jpg",
        alt: "Tesla Model S interior view",
        caption: "Model S · cabin view",
        credit: commonsCredit("Tesla Model S Interior.jpg", "Peteratkins", "CC BY-SA 4.0"),
      },
    ],
    officialUrl: "https://www.tesla.com/models",
    specificationsNote:
      "Range and acceleration are stated figures for selected U.S. configurations, not guarantees. Model year, market, wheels, and conditions affect results; verify current details with Tesla.",
    accent: "01",
  },
  {
    name: "Tesla Model 3",
    category: "Electric sedan",
    description:
      "A compact all-electric sedan designed for everyday driving and longer trips, with a quiet cabin, responsive handling, and broad charging access.",
    range: "EPA-est. up to 363 mi (Long Range)",
    acceleration: "2.9 sec 0–60 mph (Performance)",
    charging: "Tesla Supercharger network; charge speed varies by charger and conditions.",
    seating: "5 seats",
    features: [
      "Available dual-motor all-wheel drive and Performance configuration",
      "Central touchscreen with minimalist dashboard layout",
      "Panoramic glass roof and front/rear cargo areas",
    ],
    interior:
      "A minimalist cabin centered around a touchscreen, with a broad dashboard and panoramic glass roof. Interior layout and controls have changed across model years.",
    storage:
      "The sedan has front and rear cargo areas. Available space and details vary by model year and configuration; check Tesla's current specifications.",
    performanceDetails:
      "Available rear-wheel and dual-motor all-wheel-drive configurations; the acceleration figure shown is for a selected Performance configuration.",
    gallery: [
      {
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/69/Tesla_Model_3_%27Highland%27_%282024%29.jpg/1920px-Tesla_Model_3_%27Highland%27_%282024%29.jpg",
        alt: "2024 Tesla Model 3 Highland beside an earlier Model 3",
        caption: "Model 3 Highland · 2024 exterior",
        credit: commonsCredit("Tesla Model 3 'Highland' (2024).jpg", "Mliu92", "CC BY-SA 4.0"),
      },
      {
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ed/Tesla_Model_3_%282023%29_1X7A1678.jpg/1920px-Tesla_Model_3_%282023%29_1X7A1678.jpg",
        alt: "Tesla Model 3 exterior in Filderstadt in 2023",
        caption: "2023 Model 3 · exterior",
        credit: commonsCredit("Tesla Model 3 (2023) 1X7A1678.jpg", "Alexander-93", "CC BY-SA 4.0"),
      },
      {
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e6/Tesla_Model_3_%282023%29_Auto_Zuerich_2023_1X7A1313.jpg/1920px-Tesla_Model_3_%282023%29_Auto_Zuerich_2023_1X7A1313.jpg",
        alt: "Tesla Model 3 displayed at Auto Zürich in 2023",
        caption: "2023 Model 3 · Auto Zürich",
        credit: commonsCredit("Tesla Model 3 (2023) Auto Zuerich 2023 1X7A1313.jpg", "Alexander-93", "CC BY-SA 4.0"),
      },
      {
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ab/Tesla_Model_3_%282023%29_Autofr%C3%BChling_Ulm_IMG_9282.jpg/1920px-Tesla_Model_3_%282023%29_Autofr%C3%BChling_Ulm_IMG_9282.jpg",
        alt: "Tesla Model 3 displayed at Autofrühling Ulm in 2023",
        caption: "2023 Model 3 · exterior detail",
        credit: commonsCredit("Tesla Model 3 (2023) Autofrühling Ulm IMG 9282.jpg", "Alexander-93", "CC BY-SA 4.0"),
      },
      {
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/93/Tesla_Model_3_RWD_Facelift_-_interior_view.jpg/1920px-Tesla_Model_3_RWD_Facelift_-_interior_view.jpg",
        alt: "Refreshed Tesla Model 3 RWD cabin interior",
        caption: "Refreshed Model 3 · cabin",
        credit: commonsCredit("Tesla Model 3 RWD Facelift - interior view.jpg", "Ethan Llamas", "CC BY-SA 4.0"),
      },
      {
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/29/Tesla_Model_3_Performance_Facelift_-_interior_view.jpg/1920px-Tesla_Model_3_Performance_Facelift_-_interior_view.jpg",
        alt: "Refreshed Tesla Model 3 Performance interior view",
        caption: "Refreshed Model 3 Performance · interior",
        credit: commonsCredit("Tesla Model 3 Performance Facelift - interior view.jpg", "Ethan Llamas", "CC BY-SA 4.0"),
      },
      {
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/69/Tesla_Model_3_Premium_2023_%283%29.jpg/1920px-Tesla_Model_3_Premium_2023_%283%29.jpg",
        alt: "Tesla Model 3 Premium 2023 interior detail",
        caption: "2023 Model 3 Premium · cabin detail",
        credit: commonsCredit("Tesla Model 3 Premium 2023 (3).jpg", "Oq10pass", "CC0"),
      },
      {
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3b/Tesla_Model_3_%282023%29%2C_Japan%2C_front_trunk.jpg/1920px-Tesla_Model_3_%282023%29%2C_Japan%2C_front_trunk.jpg",
        alt: "Front trunk of a 2023 Tesla Model 3 Japanese specification",
        caption: "2023 Model 3 · front trunk",
        credit: commonsCredit("Tesla Model 3 (2023), Japan, front trunk.jpg", "Kazyakuruma", "CC0"),
      },
      {
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1f/Tesla_Model_3_%282023%29%2C_Japan%2C_rear_trunk.jpg/1920px-Tesla_Model_3_%282023%29%2C_Japan%2C_rear_trunk.jpg",
        alt: "Rear trunk of a 2023 Tesla Model 3 Japanese specification",
        caption: "2023 Model 3 · rear trunk",
        credit: commonsCredit("Tesla Model 3 (2023), Japan, rear trunk.jpg", "Kazyakuruma", "CC0"),
      },
    ],
    officialUrl: "https://www.tesla.com/model3",
    specificationsNote:
      "Range and acceleration are stated figures for selected U.S. configurations, not guarantees. Model year, market, wheels, and conditions affect results; verify current details with Tesla.",
    accent: "02",
  },
  {
    name: "Tesla Model X",
    category: "Electric SUV",
    description:
      "A three-row electric SUV with flexible passenger and cargo space, available all-wheel drive, and distinctive Falcon Wing rear doors.",
    range: "EPA-est. up to 335 mi (Long Range)",
    acceleration: "2.5 sec 0–60 mph (Plaid)",
    charging: "Tesla Supercharger network; charge speed varies by charger and conditions.",
    seating: "Up to 7 seats",
    features: [
      "Falcon Wing rear doors",
      "Available five-, six-, or seven-seat layouts",
      "Available dual-motor all-wheel drive and Plaid configuration",
    ],
    interior:
      "The cabin can be configured for up to three rows, with a wide central touchscreen and rear passenger display on applicable configurations. Seating layout varies.",
    storage:
      "Passenger and cargo space can be reconfigured by folding rear seats. Capacity depends on seat layout; consult Tesla for current measurements.",
    performanceDetails:
      "Available dual-motor all-wheel drive; the acceleration figure shown is for a selected Plaid configuration.",
    gallery: [
      {
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c6/Tesla_Model_X_100D_1X7A6736.jpg/1920px-Tesla_Model_X_100D_1X7A6736.jpg",
        alt: "Tesla Model X 100D displayed at Retro Classics in 2023",
        caption: "Model X 100D · 2023 display",
        credit: commonsCredit("Tesla Model X 100D 1X7A6736.jpg", "Alexander Migl", "CC BY-SA 4.0"),
      },
      {
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fe/Tesla_Model_X_Plaid_Front_3.jpg/1920px-Tesla_Model_X_Plaid_Front_3.jpg",
        alt: "Tesla Model X Plaid front exterior view",
        caption: "Model X Plaid · front view",
        credit: commonsCredit("Tesla Model X Plaid Front 3.jpg", "Mpelas199", "CC0"),
      },
      {
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b5/Tesla_Model_X_Plaid_Back.jpg/1920px-Tesla_Model_X_Plaid_Back.jpg",
        alt: "Tesla Model X Plaid rear exterior view",
        caption: "Model X Plaid · rear view",
        credit: commonsCredit("Tesla Model X Plaid Back.jpg", "Mpelas199", "CC0"),
      },
      {
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0f/Tesla_Model_X_Plaid_Interior.jpg/1920px-Tesla_Model_X_Plaid_Interior.jpg",
        alt: "Tesla Model X Plaid driver cabin with steering yoke",
        caption: "Model X Plaid · driver cabin",
        credit: commonsCredit("Tesla Model X Plaid Interior.jpg", "Mpelas199", "CC0"),
      },
      {
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d2/Tesla_Model_X_Plaid_Interior_2.jpg/1920px-Tesla_Model_X_Plaid_Interior_2.jpg",
        alt: "View of the third row inside a Tesla Model X Plaid",
        caption: "Model X Plaid · third-row view",
        credit: commonsCredit("Tesla Model X Plaid Interior 2.jpg", "Mpelas199", "CC0"),
      },
      {
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/14/Tesla_Model_X_Interior.jpg/1920px-Tesla_Model_X_Interior.jpg",
        alt: "Tesla Model X 2020 interior with wood trim",
        caption: "2020 Model X · interior detail",
        credit: commonsCredit("Tesla Model X Interior.jpg", "Grassbag", "CC BY-SA 4.0"),
      },
    ],
    officialUrl: "https://www.tesla.com/modelx",
    specificationsNote:
      "Range and acceleration are stated figures for selected U.S. configurations, not guarantees. Model year, market, wheels, and conditions affect results; verify current details with Tesla.",
    accent: "03",
  },
  {
    name: "Tesla Model Y",
    category: "Electric crossover SUV",
    description:
      "A versatile electric crossover built around everyday comfort, flexible cargo space, and available all-wheel drive.",
    range: "EPA-est. up to 337 mi (Long Range)",
    acceleration: "3.3 sec 0–60 mph (Performance)",
    charging: "Tesla Supercharger network; charge speed varies by charger and conditions.",
    seating: "5 seats; optional third row in select configurations",
    features: [
      "Raised seating position and flexible cargo space",
      "Available dual-motor all-wheel drive",
      "Panoramic glass roof and central touchscreen",
    ],
    interior:
      "A spacious, minimalist cabin with a central touchscreen and folding rear seating. Interior details and available seat layouts vary by model year and market.",
    storage:
      "Front and rear cargo areas plus fold-flat rear seating provide flexible storage. Optional seating configurations and cargo capacity vary by market.",
    performanceDetails:
      "Available rear-wheel and dual-motor all-wheel-drive configurations; acceleration depends on the selected trim.",
    gallery: [
      {
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e2/Tesla_Model_Y_2025_at_Santana_Row_dllu_02.jpg/1920px-Tesla_Model_Y_2025_at_Santana_Row_dllu_02.jpg",
        alt: "Refreshed 2025 Tesla Model Y at Santana Row",
        caption: "2025 refreshed Model Y · exterior",
        credit: commonsCredit("Tesla Model Y 2025 at Santana Row dllu 02.jpg", "Dllu", "CC BY-SA 4.0"),
      },
      {
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bd/Tesla_Model_Y_Standard_front_view_dllu.jpg/1920px-Tesla_Model_Y_Standard_front_view_dllu.jpg",
        alt: "Front view of the 2025 Tesla Model Y Standard",
        caption: "2025 Model Y Standard · front view",
        credit: commonsCredit("Tesla Model Y Standard front view dllu.jpg", "Dllu", "CC BY-SA 4.0"),
      },
      {
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0c/Tesla_Model_Y_%282025%29_DSC_8297.jpg/1920px-Tesla_Model_Y_%282025%29_DSC_8297.jpg",
        alt: "2025 Tesla Model Y exterior in Böblingen",
        caption: "2025 Model Y · exterior detail",
        credit: commonsCredit("Tesla Model Y (2025) DSC 8297.jpg", "Alexander Migl", "CC BY-SA 4.0"),
      },
      {
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/54/Tesla_Model_Y_2025_interior.jpg/1920px-Tesla_Model_Y_2025_interior.jpg",
        alt: "Interior of a 2025 Tesla Model Y",
        caption: "2025 Model Y · cabin",
        credit: commonsCredit("Tesla Model Y 2025 interior.jpg", "Ethan Llamas", "CC BY-SA 4.0"),
      },
      {
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4c/Tesla_Model_Y_Juniper_Long_Range_AWD_White_%2B_Black_02.jpg/1920px-Tesla_Model_Y_Juniper_Long_Range_AWD_White_%2B_Black_02.jpg",
        alt: "Interior of a Tesla Model Y Juniper Long Range AWD",
        caption: "Model Y Juniper · interior view",
        credit: commonsCredit("Tesla Model Y Juniper Long Range AWD White + Black 02.jpg", "Ethan Llamas", "CC BY-SA 4.0"),
      },
      {
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/05/Tesla_Model_Y_Juniper_Long_Range_AWD_White_%2B_Black_04.jpg/1920px-Tesla_Model_Y_Juniper_Long_Range_AWD_White_%2B_Black_04.jpg",
        alt: "Second cabin detail of a Tesla Model Y Juniper Long Range AWD",
        caption: "Model Y Juniper · cabin detail",
        credit: commonsCredit("Tesla Model Y Juniper Long Range AWD White + Black 04.jpg", "Ethan Llamas", "CC BY-SA 4.0"),
      },
    ],
    officialUrl: "https://www.tesla.com/modely",
    specificationsNote:
      "Range and acceleration are stated figures for selected U.S. configurations, not guarantees. Model year, market, wheels, and conditions affect results; verify current details with Tesla.",
    accent: "04",
  },
  {
    name: "Tesla Cybertruck",
    category: "All-electric pickup",
    description:
      "Tesla's stainless-steel electric pickup pairs a distinctive angular exterior with a covered cargo bed and available all-wheel-drive configurations.",
    range: "EPA-est. up to 325 mi (AWD)",
    acceleration: "2.6 sec 0–60 mph (Cyberbeast)",
    charging: "Tesla Supercharger network; charge speed varies by charger and conditions.",
    seating: "5 seats",
    features: [
      "Stainless-steel exterior",
      "Covered cargo bed and front cargo area",
      "Available all-wheel drive and Cyberbeast configuration",
    ],
    interior:
      "A five-seat cabin with a central touchscreen and a wide front bench-style seating layout. Equipment shown in early concept photos may differ from production vehicles.",
    storage:
      "A covered rear cargo bed and front cargo area provide separate storage spaces. Confirm dimensions and accessories against the current Tesla configuration.",
    performanceDetails:
      "Available all-wheel drive; the acceleration figure shown is Tesla's stated Cyberbeast figure and is configuration-dependent.",
    gallery: [
      {
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e5/Tesla_Cybertruck_%282024%29.jpg/1920px-Tesla_Cybertruck_%282024%29.jpg",
        alt: "Tesla Cybertruck displayed in 2024",
        caption: "Cybertruck · 2024 exterior",
        credit: commonsCredit("Tesla Cybertruck (2024).jpg", "Amaury Laporte", "CC BY 2.0"),
      },
      {
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b6/2024_Tesla_Cybertruck_Foundation_Series_IMG_0634.jpg/1920px-2024_Tesla_Cybertruck_Foundation_Series_IMG_0634.jpg",
        alt: "2024 Tesla Cybertruck Foundation Series exterior",
        caption: "2024 Foundation Series · exterior",
        credit: commonsCredit("2024 Tesla Cybertruck Foundation Series IMG 0634.jpg", "Alexander-93", "CC BY-SA 4.0"),
      },
      {
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/57/2024_Tesla_Cybertruck_Foundation_Series_IMG_0629.jpg/1920px-2024_Tesla_Cybertruck_Foundation_Series_IMG_0629.jpg",
        alt: "2024 Tesla Cybertruck Foundation Series front-side view",
        caption: "2024 Foundation Series · front-side",
        credit: commonsCredit("2024 Tesla Cybertruck Foundation Series IMG 0629.jpg", "Alexander-93", "CC BY-SA 4.0"),
      },
      {
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/dc/2024_Tesla_Cybertruck_Foundation_Series_IMG_0642.jpg/1920px-2024_Tesla_Cybertruck_Foundation_Series_IMG_0642.jpg",
        alt: "2024 Tesla Cybertruck Foundation Series rear-side view",
        caption: "2024 Foundation Series · rear-side",
        credit: commonsCredit("2024 Tesla Cybertruck Foundation Series IMG 0642.jpg", "Alexander-93", "CC BY-SA 4.0"),
      },
      {
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c8/Tesla_Cybertruck_-_Interior_-_Tesla_Store_Athens_2024.jpg/1920px-Tesla_Cybertruck_-_Interior_-_Tesla_Store_Athens_2024.jpg",
        alt: "Tesla Cybertruck cabin interior on display in 2024",
        caption: "Cybertruck · cabin",
        credit: commonsCredit("Tesla Cybertruck - Interior - Tesla Store Athens 2024.jpg", "Mpelas199", "CC0"),
      },
      {
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fb/Tesla_Cybertruck_-_Interior_2_-_Tesla_Store_Athens_2024.jpg/1920px-Tesla_Cybertruck_-_Interior_2_-_Tesla_Store_Athens_2024.jpg",
        alt: "Second view of the Tesla Cybertruck cabin on display in 2024",
        caption: "Cybertruck · cabin detail",
        credit: commonsCredit("Tesla Cybertruck - Interior 2 - Tesla Store Athens 2024.jpg", "Mpelas199", "CC0"),
      },
      {
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/68/Tesla_Cybertruck_-_Interior_3_-_Tesla_Store_Athens_2024.jpg/1920px-Tesla_Cybertruck_-_Interior_3_-_Tesla_Store_Athens_2024.jpg",
        alt: "Third view of the Tesla Cybertruck cabin on display in 2024",
        caption: "Cybertruck · interior controls",
        credit: commonsCredit("Tesla Cybertruck - Interior 3 - Tesla Store Athens 2024.jpg", "Mpelas199", "CC0"),
      },
    ],
    officialUrl: "https://www.tesla.com/cybertruck",
    specificationsNote:
      "Range and acceleration are stated figures for selected U.S. configurations, not guarantees. Model year, market, wheels, and conditions affect results; verify current details with Tesla.",
    accent: "05",
  },
  {
    name: "Tesla Roadster",
    category: "Announced next-generation electric sports car",
    description:
      "Tesla has announced a next-generation Roadster, but it is not represented here as a production vehicle. Official Tesla video is embedded below; a verified license for standalone Roadster still images was not found.",
    range: "Not confirmed",
    acceleration: "Not confirmed",
    charging: "Not confirmed",
    seating: "Not confirmed",
    features: [
      "Announced as an all-electric sports car",
      "Shown as a prototype; production design is not confirmed",
      "Timing, availability, pricing, and specifications are unconfirmed",
    ],
    interior:
      "No confirmed production cabin or interior controls are presented. The prototype imagery is not a specification for a production vehicle.",
    storage:
      "Production cargo or storage layout has not been confirmed.",
    performanceDetails:
      "No confirmed production range, acceleration, power, or charging specifications are available here.",
    gallery: [],
    officialUrl: "https://www.tesla.com/roadster",
    specificationsNote:
      "Tesla has not confirmed final production specifications, availability, or pricing. Earlier announced targets are not treated here as confirmed production figures.",
    accent: "06",
  },
];

const energyProducts = [
  {
    name: "Solar panels",
    category: "GENERATE",
    alt: "Solar panels in a rooftop renewable energy installation",
    description:
      "Explore rooftop solar options and learn what questions to ask when planning a home energy system.",
    image: "/images/commons/Rooftop_Solar_Panels_3KW.jpg",
    credit: commonsCredit("Rooftop Solar Panels 3KW.jpg", "Dr. Chinchu C.", "CC BY 4.0"),
    icon: Sun,
  },
  {
    name: "Powerwall",
    category: "STORE",
    alt: "Home energy storage in a clean, modern energy setting",
    description:
      "Discover home battery storage and how a connected energy system may fit your household.",
    image: "/images/commons/TeslaPowerwall2-2.jpg",
    credit: commonsCredit("TeslaPowerwall2-2.jpg", "Raysonho @ Open Grid Scheduler / Grid Engine", "CC0"),
    icon: BatteryCharging,
  },
  {
    name: "Charging solutions",
    category: "CHARGE",
    alt: "Electric vehicle connected to a charging station",
    description:
      "Compare home and destination charging considerations for your vehicle and location.",
    image: "/images/commons/Tesla_Supercharger_Inyokern_California_2026_dllu.jpg",
    credit: commonsCredit("Tesla Supercharger Inyokern California 2026 dllu.jpg", "Daniel Lu (User:dllu)", "CC BY-SA 4.0"),
    icon: Cable,
  },
];

const countryNames = new Intl.DisplayNames(["en"], { type: "region" });
const countries = getCountries()
  .map((country) => ({
    name: countryNames.of(country) ?? country,
    code: `+${getCountryCallingCode(country)}`,
    flag: Array.from(country, (letter) =>
      String.fromCodePoint(127397 + letter.charCodeAt(0)),
    ).join(""),
  }))
  .sort((first, second) => first.name.localeCompare(second.name));

type AuthMode = "register" | "login" | null;
type Page = "home" | "investment" | "dashboard" | "admin";

type ChaportApi = {
  _q?: unknown[][];
  _l?: Record<string, Array<(...args: unknown[]) => void>>;
  q?: (...args: unknown[]) => void;
  on?: (event: string, listener: (...args: unknown[]) => void) => void;
  open?: () => void;
};

declare global {
  interface Window {
    chaport?: ChaportApi;
    chaportConfig?: { appId: string };
  }
}

const chaportAppId =
  import.meta.env.VITE_CHAPORT_APP_ID?.trim() || "6ae63163fd3025974d40d8db";

const vehicleImageFallback = "/images/fallbacks/vehicle.svg";
const energyImageFallback = "/images/fallbacks/energy.svg";

function localImageUrl(image: string) {
  const thumbName = image.match(
    /^https:\/\/thumb\.wikimedia\.org\/wikipedia\/commons\/thumb\/(?:[^/]+\/){3}([^/]+)$/,
  )?.[1];
  if (!thumbName) return image;

  const fileName = decodeURIComponent(thumbName).replace(/^\d+px-/, "");
  return `/images/commons/${encodeURIComponent(fileName)}`;
}

function ImageWithFallback({
  src,
  alt,
  fallback = vehicleImageFallback,
  className,
  loading = "lazy",
}: {
  src: string;
  alt: string;
  fallback?: string;
  className?: string;
  loading?: "eager" | "lazy";
}) {
  const [failed, setFailed] = useState(false);

  useEffect(() => setFailed(false), [src]);

  return (
    <img
      className={className}
      src={failed ? fallback : src}
      alt={alt}
      loading={loading}
      decoding="async"
      onError={() => {
        if (!failed) setFailed(true);
      }}
    />
  );
}

function TeslaVoltMark({ size = 18 }: { size?: number }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4.5 6h15M12 6v5.1M6.4 11.1 12 19l5.6-7.9M8.9 14.6h6.2" />
    </svg>
  );
}

function SelfDrivingMedia({ poster }: { poster: string }) {
  const [videoUnavailable, setVideoUnavailable] = useState(false);
  const videoUrl = import.meta.env.VITE_FSD_VIDEO_URL?.trim();

  return (
    <div className="self-driving-media">
      {videoUrl && videoUnavailable ? (
        <div className="self-driving-poster">
          <ImageWithFallback
            src={poster}
            alt="Illustrative electric vehicle image shown because the configured video could not load"
            fallback={vehicleImageFallback}
          />
          <span className="video-unavailable"><Play size={16} /> The configured video could not be loaded.</span>
        </div>
      ) : videoUrl ? (
        <video
          controls
          playsInline
          preload="metadata"
          poster={poster}
          aria-label="Full Self-Driving (Supervised) demonstration video"
          onError={() => setVideoUnavailable(true)}
        >
          <source src={videoUrl} />
          Your browser does not support this video.
        </video>
      ) : (
        <OfficialVideoEmbed
          videoId="TUDiG7PcLBs"
          title="Full Self-Driving (Supervised) — official Tesla video"
        />
      )}
    </div>
  );
}

function OfficialVideoEmbed({
  videoId,
  title,
}: {
  videoId: string;
  title: string;
}) {
  return (
    <iframe
      className="official-video-embed"
      src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0`}
      title={title}
      loading="lazy"
      referrerPolicy="strict-origin-when-cross-origin"
      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    />
  );
}

function App() {
  const [page, setPage] = useState<Page>("home");
  const [authMode, setAuthMode] = useState<AuthMode>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [orderProduct, setOrderProduct] = useState<string | null>(null);
  const [vehicleImageIndex, setVehicleImageIndex] = useState(0);
  const [chatStatus, setChatStatus] = useState<string | null>(null);
  const [preparedChatMessage, setPreparedChatMessage] = useState<string | null>(null);
  const [chatLoadFailed, setChatLoadFailed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeName, setActiveName] = useState("Visitor");

  useEffect(() => {
    if (!chaportAppId) return;

    window.chaportConfig = { appId: chaportAppId };
    if (window.chaport) return;

    const widget: ChaportApi = {
      _q: [],
      _l: {},
      q: (...args) => widget._q?.push(args),
      on: (event, listener) => {
        const listeners = widget._l ?? (widget._l = {});
        (listeners[event] ?? (listeners[event] = [])).push(listener);
      },
    };
    window.chaport = widget;

    const script = document.createElement("script");
    script.async = true;
    script.src = "https://app.chaport.com/javascripts/insert.js";
    script.dataset.chaportIntegration = "teslavolt";
    script.addEventListener("error", () => {
      setChatLoadFailed(true);
      setChatStatus("Chaport could not be loaded. Please check the installation ID and try again.");
    });
    document.head.appendChild(script);
  }, []);

  const openSupportChat = (preparedMessage?: string) => {
    setPreparedChatMessage(preparedMessage ?? null);
    setChatStatus(
      preparedMessage
        ? "Chaport is opening. Review the prepared enquiry, then send it yourself; it has not been sent."
        : null,
    );

    if (chatLoadFailed) {
      setChatStatus("Chaport could not be loaded. Check your connection and reload the page to try again.");
      return;
    }

    if (!chaportAppId) {
      setChatStatus("Chaport is not configured. Please contact the site operator.");
      return;
    }

    if (window.chaport?.open) {
      window.chaport.open();
      return;
    }
    if (window.chaport?.q) {
      window.chaport.q("open");
      return;
    }

    setChatStatus("Chaport is not ready yet. Please try again in a moment.");
  };

  const openAuth = (mode: Exclude<AuthMode, null>) => {
    setAuthMode(mode);
    setMobileMenuOpen(false);
  };

  const openInvestmentPage = () => {
    setMobileMenuOpen(false);
    setSelectedVehicle(null);
    setPage("investment");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollTo = (id: string) => {
    if (id === "investment") {
      openInvestmentPage();
      return;
    }

    setMobileMenuOpen(false);
    setSelectedVehicle(null);
    setPage("home");
    window.setTimeout(
      () => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }),
      20,
    );
  };

  const enterDashboard = () => {
    setPage("dashboard");
    setAuthMode(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div id="top" className="min-h-screen bg-ink text-white">
      <div className="announcement">
        <Sparkles size={13} />
        <span>TeslaVolt is independent and not affiliated with Tesla, Inc.</span>
        <span className="announcement-separator">·</span>
        <button onClick={() => scrollTo("investment")}>Investment information</button>
      </div>

      <header className="site-header">
        <button
          className="brand"
          onClick={() => {
            setPage("home");
            setSelectedVehicle(null);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          aria-label="TeslaVolt home"
        >
          <span className="brand-mark"><TeslaVoltMark /></span>
          <span>TESLA<span className="brand-light">VOLT</span></span>
        </button>
        <nav className="desktop-nav" aria-label="Main navigation">
          <button onClick={() => scrollTo("vehicles")}>Vehicles</button>
          <button onClick={() => scrollTo("energy")}>Energy</button>
          <button onClick={() => scrollTo("self-driving")}>Full Self-Driving</button>
          <button onClick={() => scrollTo("about")}>About</button>
          <button onClick={() => openSupportChat()}>Support</button>
          <button onClick={() => scrollTo("investment")}>Investment</button>
        </nav>
        <div className="header-actions">
          <button className="login-link" onClick={() => openAuth("login")}>Log in</button>
          <button className="button button-small button-red" onClick={() => openAuth("register")}>
            Get started <ArrowUpRight size={14} />
          </button>
        </div>
        <button
          className="mobile-menu-button"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileMenuOpen((open) => !open)}
        >
          {mobileMenuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </header>

      {mobileMenuOpen && (
        <nav className="mobile-nav">
          <button onClick={() => scrollTo("vehicles")}>Vehicles</button>
          <button onClick={() => scrollTo("energy")}>Energy</button>
          <button onClick={() => scrollTo("self-driving")}>Full Self-Driving</button>
          <button onClick={() => scrollTo("about")}>About</button>
          <button onClick={() => scrollTo("investment")}>Investment</button>
          <button onClick={() => { setMobileMenuOpen(false); openSupportChat(); }}>Customer support</button>
          <button onClick={() => openAuth("login")}>Log in</button>
          <button onClick={() => openAuth("register")}>Create an account <ArrowUpRight size={15} /></button>
        </nav>
      )}

      {selectedVehicle ? (
        <VehicleDetailPage
          vehicle={selectedVehicle}
          imageIndex={vehicleImageIndex}
          setImageIndex={setVehicleImageIndex}
          onBack={() => {
            scrollTo("vehicles");
          }}
          onOrder={() => setOrderProduct(selectedVehicle.name)}
        />
      ) : page === "home" ? (
        <HomePage
          onVehicleSelect={(vehicle) => {
            setSelectedVehicle(vehicle);
            setVehicleImageIndex(0);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          onInvestment={openInvestmentPage}
          onOrder={(product) => setOrderProduct(product)}
          onRegister={() => openAuth("register")}
          onDashboard={enterDashboard}
          onAdmin={() => {
            setPage("admin");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />
      ) : page === "investment" ? (
        <InvestmentPage onBack={() => {
          setPage("home");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }} />
      ) : (
        <AccountPage
          page={page}
          name={activeName}
          onBack={() => setPage("home")}
          onInquire={() => openSupportChat()}
          onRegister={() => openAuth("register")}
          onLogout={() => setPage("home")}
        />
      )}

      <Footer onNavigate={scrollTo} />

      <button
        className="chat-launcher"
        aria-label="Open Chaport live chat"
        onClick={() => openSupportChat()}
      >
        <MessageCircle size={21} />
      </button>

      {chatStatus && (
        <section className="chat-status-panel" role="status" aria-live="polite">
          <p>{chatStatus}</p>
          {preparedChatMessage && (
            <div className="prepared-chat-message">
              <label htmlFor="prepared-chat-message">Prepared message (not sent)</label>
              <textarea
                id="prepared-chat-message"
                readOnly
                rows={3}
                value={preparedChatMessage}
                onFocus={(event) => event.currentTarget.select()}
              />
              <button
                className="button button-red prepared-message-copy"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(preparedChatMessage);
                    setChatStatus("Message copied. Paste it into the Chaport chat and send it when you are ready; it has not been sent.");
                  } catch {
                    setChatStatus("Clipboard access is unavailable. Select the prepared message above and copy it into Chaport; it has not been sent.");
                  }
                }}
              >
                Copy prepared message
              </button>
              <small>Paste this into the Chaport chat and tap Send when you are ready.</small>
            </div>
          )}
          <button
            aria-label="Dismiss chat status"
            onClick={() => {
              setChatStatus(null);
              setPreparedChatMessage(null);
            }}
          >
            <X size={16} />
          </button>
        </section>
      )}

      {authMode && (
        <AuthModal
          mode={authMode}
          onClose={() => setAuthMode(null)}
          onChangeMode={setAuthMode}
          onSuccess={(name) => {
            setActiveName(name || "Alex Morgan");
            enterDashboard();
          }}
        />
      )}
      {orderProduct && (
        <OrderModal
          product={orderProduct}
          onClose={() => setOrderProduct(null)}
          onSubmit={(message) => {
            setOrderProduct(null);
            openSupportChat(message);
          }}
        />
      )}

    </div>
  );
}

function HomePage({
  onVehicleSelect,
  onInvestment,
  onOrder,
  onRegister,
  onDashboard,
  onAdmin,
}: {
  onVehicleSelect: (vehicle: Vehicle) => void;
  onInvestment: () => void;
  onOrder: (product: string) => void;
  onRegister: () => void;
  onDashboard: () => void;
  onAdmin: () => void;
}) {
  return (
    <main>
      <section className="hero">
        <ImageWithFallback
          className="hero-image"
          src={localImageUrl(vehicles[0].gallery[0].image)}
          alt="Tesla Model S Long Range in a front three-quarter view"
          fallback={vehicleImageFallback}
          loading="eager"
        />
        <div className="hero-vignette" />
        <div className="hero-content">
          <div className="eyebrow"><span className="eyebrow-line" /> ELECTRIC. ELEVATED. EMPOWERED.</div>
          <h1>The road ahead<br />is <span>electric.</span></h1>
          <p>Discover the vehicles shaping tomorrow, and explore a new perspective on the future of mobility.</p>
          <div className="hero-buttons">
            <button className="button button-red" onClick={() => document.getElementById("vehicles")?.scrollIntoView({ behavior: "smooth" })}>
              Explore vehicles <ArrowRight size={16} />
            </button>
            <button className="button button-outline" onClick={onInvestment}>
              Investment information <ArrowUpRight size={15} />
            </button>
          </div>
          <div className="hero-caption"><span className="hero-caption-line" /> A concept for what's next</div>
        </div>
        <div className="hero-side-label"><span>01 — 06</span><span className="side-label-rule" /> THE ELECTRIC COLLECTION</div>
        <a className="hero-scroll" href="#vehicles" aria-label="Scroll to vehicles"><ArrowDown size={16} /></a>
        {vehicles[0].gallery[0].credit && (
          <div className="hero-image-credit">
            Photo by <a href={vehicles[0].gallery[0].credit.url} target="_blank" rel="noreferrer">{vehicles[0].gallery[0].credit.label}</a>
            {" · "}
            <a href={vehicles[0].gallery[0].credit.licenseUrl} target="_blank" rel="noreferrer">{vehicles[0].gallery[0].credit.license}</a>
          </div>
        )}
      </section>

      <section className="trust-strip">
        <div><ShieldCheck size={18} /><span>Independent TeslaVolt experience</span></div>
        <span className="trust-divider" />
        <div><Globe2 size={18} /><span>Vehicle and energy discovery</span></div>
        <span className="trust-divider" />
        <div><Zap size={17} /><span>Electric ideas, in motion</span></div>
      </section>

      <section className="section vehicles-section" id="vehicles">
        <div className="section-heading">
          <div>
            <div className="eyebrow"><span className="eyebrow-line" /> THE COLLECTION</div>
            <h2>Meet your <span>next move.</span></h2>
          </div>
          <p>Six Tesla vehicles, from everyday electric driving to a next-generation sports-car announcement.</p>
        </div>
        <div className="vehicle-grid">
          {vehicles.map((vehicle) => (
            <button
              className="vehicle-card"
              key={vehicle.name}
              aria-label={`Explore ${vehicle.name}`}
              onClick={() => onVehicleSelect(vehicle)}
            >
              <div className="vehicle-card-image">
                {vehicle.gallery[0] ? (
                  <ImageWithFallback
                    src={localImageUrl(vehicle.gallery[0].image)}
                    alt={vehicle.gallery[0].alt}
                    fallback={vehicleImageFallback}
                    loading="eager"
                  />
                ) : (
                  <div className="vehicle-card-no-image">
                    <span>ROADSTER · OFFICIAL MEDIA</span>
                    <strong>Explore Tesla video</strong>
                  </div>
                )}
                <span className="vehicle-number">{vehicle.accent} / 06</span>
                <span className="vehicle-open"><ArrowUpRight size={18} /></span>
                <span className="vehicle-image-shade" />
                <div className="vehicle-card-title">
                  <span>{vehicle.category}</span>
                  <strong>{vehicle.name}</strong>
                </div>
                {vehicle.gallery[0]?.credit && (
                  <span className="vehicle-card-credit">
                    Photo: {vehicle.gallery[0].credit.label} · {vehicle.gallery[0].credit.license}
                  </span>
                )}
              </div>
              <div className="vehicle-card-meta"><span>{vehicle.seating === "Not confirmed" ? "Planned vehicle" : vehicle.seating}</span><span>Explore Vehicle <ArrowRight size={14} /></span></div>
            </button>
          ))}
        </div>
        <div className="section-bottom-note"><span>01 — 06</span><span>Explore the all-electric collection</span><span className="note-line" /></div>
      </section>

      <RoadsterShowcase
        onOrder={() => onOrder("Tesla Roadster — registration of interest (not a reservation)")}
        onUpdates={() => onOrder("Tesla Roadster — updates (no reservation)")}
      />

      <section className="self-driving-section" id="self-driving">
        <SelfDrivingMedia poster={localImageUrl(vehicles[1].gallery[0].image)} />
        <div className="self-driving-copy">
          <div className="eyebrow"><span className="eyebrow-line" /> DRIVER-ASSISTANCE TECHNOLOGY</div>
          <h2>THE FUTURE OF<br />DRIVING IS <span>HERE.</span></h2>
          <p>Learn about Tesla's Full Self-Driving (Supervised) technology and its driver-assistance features. Availability and functionality vary by vehicle, region, software and conditions.</p>
          <p className="supervision-disclaimer"><ShieldCheck size={17} /> Full Self-Driving (Supervised) requires active driver supervision. It does not make a vehicle fully autonomous, and the driver remains responsible for the vehicle at all times.</p>
          <a className="button button-outline" href="https://www.tesla.com/fsd" target="_blank" rel="noreferrer">Explore Self-Driving <ArrowUpRight size={15} /></a>
          <p className="official-media-note">
            <a href="https://www.youtube.com/watch?v=TUDiG7PcLBs" target="_blank" rel="noreferrer">Official Tesla FSD (Supervised) video</a>. Available metadata does not verify every requested scene, including the complete city-intersection and passenger sequence.
          </p>
        </div>
      </section>

      <section className="section energy-section" id="energy">
        <div className="section-heading">
          <div>
            <div className="eyebrow"><span className="eyebrow-line" /> HOME ENERGY</div>
            <h2>Power your <span>everyday.</span></h2>
          </div>
          <p>Explore solar generation, home energy storage and charging. Product details and availability depend on your location.</p>
        </div>
        <div className="energy-grid">
          {energyProducts.map((product) => {
            const ProductIcon = product.icon;
            return (
              <article className="energy-card" key={product.name}>
                <div className="energy-card-image">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.alt}
                    fallback={energyImageFallback}
                    className={`energy-product-image energy-product-${product.category.toLowerCase()}`}
                  />
                  <span className="energy-category"><ProductIcon size={14} /> {product.category}</span>
                </div>
                <div className="energy-card-copy">
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <button className="text-button" onClick={() => onOrder(product.name)}>
                    Enquire about {product.name} <ArrowRight size={15} />
                  </button>
                  {product.credit && (
                    <span className="energy-image-credit">
                      Photo by <a href={product.credit.url} target="_blank" rel="noreferrer">{product.credit.label}</a>
                      {" · "}
                      <a href={product.credit.licenseUrl} target="_blank" rel="noreferrer">{product.credit.license}</a>
                    </span>
                  )}
                </div>
              </article>
            );
          })}
        </div>
        <p className="energy-disclaimer">TeslaVolt is an independent information and enquiry experience. Product names belong to their respective owners; this website does not represent product availability, pricing, installation or an order confirmation.</p>
      </section>

      <section className="manifesto" id="about">
        <ImageWithFallback
          className="manifesto-image"
          src="/images/energy/wind-turbines.jpg"
          alt="Wind turbines generating renewable energy"
          fallback={energyImageFallback}
        />
        <div className="manifesto-overlay" />
        <div className="manifesto-content">
          <div className="eyebrow"><span className="eyebrow-line" /> A DIFFERENT KIND OF DRIVE</div>
          <h2>Progress isn't<br />a destination.<br /><span>It's a direction.</span></h2>
          <p>We believe the shift to electric is bigger than what we drive. It's a chance to rethink what moving forward looks like.</p>
          <button className="text-button" onClick={onInvestment}>
            Discover our perspective <ArrowRight size={16} />
          </button>
        </div>
        <div className="manifesto-caption">THE FUTURE DOESN'T WAIT FOR GREEN LIGHTS.</div>
      </section>

      <section className="cta-section">
        <div className="cta-orb" />
        <div className="eyebrow"><span className="eyebrow-line" /> YOUR JOURNEY STARTS HERE</div>
        <h2>Curiosity is a<br /><span>powerful thing.</span></h2>
        <p>Sign up to explore our demo experience and join the conversation about what's next.</p>
        <div className="cta-buttons">
          <button className="button button-red" onClick={onRegister}>Create your account <ArrowRight size={16} /></button>
          <button className="button button-outline" onClick={onDashboard}>Preview dashboard <ArrowUpRight size={15} /></button>
        </div>
      </section>

      <section className="admin-preview">
        <div><span className="admin-preview-dot" /> PLATFORM PREVIEW</div>
        <span>Explore the interface from a member or administrator perspective.</span>
        <button onClick={onAdmin}>Preview admin view <ArrowUpRight size={14} /></button>
      </section>
    </main>
  );
}

function RoadsterShowcase({ onOrder, onUpdates }: { onOrder: () => void; onUpdates: () => void }) {
  const roadster = vehicles.find((vehicle) => vehicle.name === "Tesla Roadster");

  if (!roadster) {
    throw new Error("Tesla Roadster vehicle data is required for the Roadster showcase.");
  }

  const features = [
    {
      title: "Active Aero",
      detail: "Tesla concept footage discusses active aerodynamics. Production hardware and capabilities have not been verified.",
      icon: Radio,
      videoId: "cvKIR-c1SsU",
      videoTitle: "Roadster concept features — official Tesla video",
      source: "https://www.youtube.com/watch?v=cvKIR-c1SsU",
    },
    {
      title: "Cold-Gas Thrusters",
      detail: "Tesla presented this as a proposed concept. No production configuration or availability is confirmed.",
      icon: Zap,
      videoId: "r5vsHHPVhJg",
      videoTitle: "The Kickflip — Roadster concept — official Tesla video",
      source: "https://www.youtube.com/watch?v=r5vsHHPVhJg",
    },
    {
      title: "Multi-Mode Suction System",
      detail: "Tesla presented a fan-based downforce concept. No production system or capability is confirmed.",
      icon: Sparkles,
      videoId: "7p5LxFdc-Qg",
      videoTitle: "The Ramp — Roadster concept — official Tesla video",
      source: "https://www.youtube.com/watch?v=7p5LxFdc-Qg",
    },
  ];

  return (
    <>
      <section className="roadster-hero" id="roadster">
        <div className="roadster-hero-layout">
          <div className="roadster-content">
            <div className="eyebrow"><span className="eyebrow-line" /> ANNOUNCED PROTOTYPE · NOT IN PRODUCTION</div>
            <h2>ROADSTER</h2>
            <p>A look at Tesla's announced next-generation Roadster. Final production design, specifications, timing and availability have not been confirmed.</p>
            <div className="hero-buttons">
              <button className="button button-red" onClick={onOrder}>Register Interest <ArrowRight size={15} /></button>
              <button className="button button-outline" onClick={onUpdates}>Get Updates <ArrowRight size={15} /></button>
            </div>
            <button className="text-button roadster-explore-button" onClick={() => document.getElementById("roadster-features")?.scrollIntoView({ behavior: "smooth" })}>Explore concept features <ArrowDown size={14} /></button>
            <small>Interest enquiry only. This does not reserve or order a vehicle.</small>
          </div>
          <div className="roadster-hero-media">
            <OfficialVideoEmbed videoId="tw4jkyfY4HE" title="Roadster — official Tesla video" />
            <a href="https://www.youtube.com/watch?v=tw4jkyfY4HE" target="_blank" rel="noreferrer">Official Tesla Roadster video · open on YouTube <ArrowUpRight size={12} /></a>
          </div>
        </div>
      </section>
      <section className="roadster-official-media">
        <div className="roadster-features-heading">
          <div className="eyebrow"><span className="eyebrow-line" /> ORIGINAL TESLA MEDIA</div>
          <h2>Roadster, as presented.</h2>
          <p>These are Tesla-hosted videos embedded through YouTube. They are not standalone image files or a license to reuse Tesla media elsewhere.</p>
        </div>
        <div className="roadster-media-grid">
          <article className="roadster-media-card">
            <OfficialVideoEmbed videoId="qt5p-_tE8d0" title="Roadster Event — official Tesla video" />
            <h3>Roadster Event</h3>
            <p>Official reveal and concept demonstrations. The event footage is not a confirmation of production specifications.</p>
            <a href="https://www.youtube.com/watch?v=qt5p-_tE8d0" target="_blank" rel="noreferrer">View original video <ArrowUpRight size={12} /></a>
          </article>
          <article className="roadster-media-card">
            <OfficialVideoEmbed videoId="fdFyXTdJPLA" title="Roadster Interface — official Tesla video" />
            <h3>Roadster interface</h3>
            <p>Tesla's display/interface video; it does not establish a final production cockpit or interior configuration.</p>
            <a href="https://www.youtube.com/watch?v=fdFyXTdJPLA" target="_blank" rel="noreferrer">View original video <ArrowUpRight size={12} /></a>
          </article>
        </div>
      </section>
      <section className="roadster-features" id="roadster-features">
        <div className="roadster-features-heading">
          <div className="eyebrow"><span className="eyebrow-line" /> ROADSTER · CONCEPT FEATURES</div>
          <h2>Designed to<br /><span>defy ordinary.</span></h2>
          <p>These are concept categories requested for this showcase, not verified production specifications or confirmed equipment.</p>
        </div>
        <div className="roadster-feature-list">
          {features.map(({ title, detail, icon: Icon, videoId, videoTitle, source }) => (
            <article className="roadster-feature" key={title}>
              <span className="roadster-feature-icon"><Icon size={20} /></span>
              <div><h3>{title}</h3><p>{detail}</p></div>
              <span className="roadster-feature-mark">TESLA CONCEPT VIDEO</span>
              <OfficialVideoEmbed videoId={videoId} title={videoTitle} />
              <a className="roadster-feature-source" href={source} target="_blank" rel="noreferrer">View original video <ArrowUpRight size={12} /></a>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

function InvestmentPage({ onBack }: { onBack: () => void }) {
  return (
    <main className="investment-page">
      <section className="investment-hero">
        <div className="investment-hero-content">
          <div className="eyebrow"><span className="eyebrow-line" /> TESLAVOLT · INVESTMENT INFORMATION</div>
          <h1>Clarity before<br /><span>capital.</span></h1>
          <p>Investment information is separate from TeslaVolt's vehicle and energy experience. No investment offer or deposit service is currently available.</p>
          <div className="investment-status-pill"><span /> No active offer</div>
        </div>
      </section>

      <section className="investment-content">
        <div className="investment-notice" role="note">
          <CircleHelp size={20} />
          <div>
            <strong>Please do not send funds.</strong>
            <p>No investment product, payment address, or deposit submission service is configured on this website. Do not transfer USDT or share a transaction ID with anyone claiming this page accepts deposits.</p>
          </div>
        </div>

        <div className="investment-facts">
          <article>
            <span>01 · COMPANY REGISTRATION</span>
            <h2>Details not provided</h2>
            <p>No legal company name, registration number, or registered address has been supplied for an investment operator.</p>
          </article>
          <article>
            <span>02 · REGULATORY STATUS</span>
            <h2>Not established</h2>
            <p>No regulatory authorisation details or regulator records have been supplied. This site makes no claim that an investment operator is licensed or regulated.</p>
          </article>
          <article>
            <span>03 · TERMS &amp; RISKS</span>
            <h2>Not published</h2>
            <p>No offering terms or product-specific risk disclosures are available. Investments can lose value; crypto transfers may be irreversible.</p>
          </article>
          <article>
            <span>04 · COMPLAINTS</span>
            <h2>No process provided</h2>
            <p>No investment complaint or dispute-resolution procedure is documented on this website.</p>
          </article>
          <article>
            <span>05 · USDT DEPOSITS</span>
            <h2>Not enabled</h2>
            <p>No Bybit wallet address or supported network is configured. Never guess a network or send a test transfer.</p>
          </article>
        </div>

        <section className="investment-workflow">
          <div className="investment-section-heading">
            <div className="eyebrow"><span className="eyebrow-line" /> NO DEPOSIT SERVICE</div>
            <h2>Verification is <span>not connected.</span></h2>
            <p>This website cannot accept deposits or TXIDs. It has no payment instructions, transaction-verification service, or secure submission backend.</p>
          </div>
          <form className="investment-form" aria-label="Investment deposit submission unavailable">
            <fieldset disabled>
              <legend>Unavailable — do not submit funds</legend>
              <label>
                <span>Amount (USDT)</span>
                <input type="number" min="0" placeholder="Unavailable" />
              </label>
              <label>
                <span>Transaction ID (TXID)</span>
                <input type="text" placeholder="Unavailable" />
              </label>
              <label>
                <span>Email address</span>
                <input type="email" placeholder="Unavailable" />
              </label>
              <button className="button button-dark" type="submit">Submissions unavailable <ArrowRight size={15} /></button>
            </fieldset>
            <p>Fields are disabled. This page does not collect, store, or submit personal or payment information.</p>
          </form>
        </section>

        <div className="investment-records">
          <section>
            <div className="investment-record-heading">
              <div><span className="eyebrow"><span className="eyebrow-line" /> SUBMISSION STATUS</span><h2>Deposit reviews</h2></div>
              <Clock3 size={19} />
            </div>
            <div className="investment-empty-state">
              <strong>Deposit submissions are not available</strong>
              <p>No submissions are received or reviewed by this website. No pending-deposit queue is connected.</p>
            </div>
          </section>
          <section>
            <div className="investment-record-heading">
              <div><span className="eyebrow"><span className="eyebrow-line" /> PUBLIC ACTIVITY</span><h2>Recent investments</h2></div>
              <ShieldCheck size={19} />
            </div>
            <div className="investment-empty-state">
              <strong>No investment records are available</strong>
              <p>This website has no connected investment service or transaction records. It does not publish or imply verified investment activity.</p>
            </div>
          </section>
        </div>

        <div className="investment-independence">
          <ShieldCheck size={17} />
          <p>TeslaVolt is independent and is not affiliated with, authorized by, or endorsed by Tesla, Inc. Tesla's name is used only to identify the vehicles featured on this site. No company registration, regulatory authorisation, investment terms, or complaint-handling documents have been supplied for an investment service.</p>
        </div>
        <button className="investment-back-button" onClick={onBack}><ArrowLeft size={15} /> Return to the vehicle collection</button>
      </section>
    </main>
  );
}

function OrderModal({
  product,
  onClose,
  onSubmit,
}: {
  product: string;
  onClose: () => void;
  onSubmit: (message: string) => void;
}) {
  const [selectedProduct, setSelectedProduct] = useState(product);

  return (
    <div className="modal-backdrop order-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="order-modal" role="dialog" aria-modal="true" aria-labelledby="order-title">
        <button className="modal-close" onClick={onClose} aria-label="Close enquiry form"><X size={19} /></button>
        <div className="modal-brand"><span className="brand-mark"><TeslaVoltMark size={16} /></span> TESLAVOLT</div>
        <div className="eyebrow"><span className="eyebrow-line" /> PRODUCT ENQUIRY</div>
        <h2 id="order-title">Start a <span>conversation.</span></h2>
        <p className="order-description">Share your details and we’ll prepare an enquiry in the existing Chaport chat. Nothing is ordered, reserved, paid for or sent automatically.</p>
        <form className="order-form" onSubmit={(event) => {
          event.preventDefault();
          const form = new FormData(event.currentTarget);
          const enquiry = [
            "Hello, I would like information about:",
            `Product: ${String(form.get("product") ?? "")}`,
            `Name: ${String(form.get("name") ?? "")}`,
            `Country: ${String(form.get("country") ?? "")}`,
            `State / city: ${String(form.get("location") ?? "")}`,
            `Email: ${String(form.get("email") ?? "")}`,
            `Phone: ${String(form.get("phone") ?? "")}`,
          ].join("\n");
          onSubmit(enquiry);
        }}>
          <label className="form-field"><span>Full name</span><input name="name" autoComplete="name" required maxLength={120} /></label>
          <div className="order-form-row">
            <label className="form-field"><span>Country</span><input name="country" autoComplete="country-name" required maxLength={100} /></label>
            <label className="form-field"><span>State or city</span><input name="location" autoComplete="address-level1" required maxLength={120} /></label>
          </div>
          <label className="form-field"><span>Email address</span><input name="email" type="email" autoComplete="email" required maxLength={254} /></label>
          <label className="form-field"><span>Phone number</span><input name="phone" type="tel" autoComplete="tel" required maxLength={40} /></label>
          <label className="form-field"><span>Vehicle or product</span>
            <select name="product" value={selectedProduct} onChange={(event) => setSelectedProduct(event.target.value)} required>
              {[...vehicles.map((vehicle) => vehicle.name), ...energyProducts.map((item) => item.name), "Tesla Roadster — registration of interest (not a reservation)", "Tesla Roadster — updates (no reservation)"].map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </label>
          <p className="order-privacy-note">Your details are included in a draft for you to review in Chaport. They are not submitted until you choose to send the message in the chat.</p>
          <button type="submit" className="button button-red order-submit">Continue to Chaport <ArrowRight size={16} /></button>
        </form>
      </section>
    </div>
  );
}

function AuthModal({
  mode,
  onClose,
  onChangeMode,
  onSuccess,
}: {
  mode: Exclude<AuthMode, null>;
  onClose: () => void;
  onChangeMode: (mode: AuthMode) => void;
  onSuccess: (name: string) => void;
}) {
  const [country, setCountry] = useState(countries[0]);
  const [countrySearch, setCountrySearch] = useState("");
  const [countryOpen, setCountryOpen] = useState(false);
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const filteredCountries = useMemo(
    () => countries.filter((item) => `${item.name} ${item.code}`.toLowerCase().includes(countrySearch.toLowerCase())),
    [countrySearch],
  );

  return (
    <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="auth-modal" role="dialog" aria-modal="true" aria-labelledby="auth-title">
        <button className="modal-close" onClick={onClose} aria-label="Close"><X size={19} /></button>
        <div className="modal-brand"><span className="brand-mark"><TeslaVoltMark size={16} /></span> TESLAVOLT</div>
        <div className="eyebrow"><span className="eyebrow-line" /> {mode === "register" ? "START YOUR JOURNEY" : "WELCOME BACK"}</div>
        <h2 id="auth-title">{mode === "register" ? <>Create your<br /><span>account.</span></> : <>Good to see<br /><span>you again.</span></>}</h2>
        <p className="auth-description">This is a front-end demonstration. No account is created and information is not transmitted or stored.</p>
        <form
          className="auth-form"
          onSubmit={(event) => {
            event.preventDefault();
            onSuccess(name);
          }}
        >
          {mode === "register" && (
            <label className="form-field">
              <span>Full name</span>
              <input autoComplete="name" required placeholder="Your name" value={name} onChange={(event) => setName(event.target.value)} />
            </label>
          )}
          <label className="form-field">
            <span>Email address</span>
            <div className="input-with-icon"><Mail size={16} /><input type="email" autoComplete="email" required placeholder="you@example.com" /></div>
          </label>
          {mode === "register" && (
            <label className="form-field">
              <span>Phone number</span>
              <div className="phone-input">
                <div className="country-picker">
                  <button type="button" className="country-trigger" onClick={() => setCountryOpen((open) => !open)} aria-expanded={countryOpen}>
                    <span>{country.flag}</span><span>{country.code}</span><ChevronDown size={13} />
                  </button>
                  {countryOpen && (
                    <div className="country-menu">
                      <input autoFocus aria-label="Search countries" placeholder="Search countries..." value={countrySearch} onChange={(event) => setCountrySearch(event.target.value)} />
                      <div className="country-list">
                        {filteredCountries.length ? filteredCountries.map((item) => (
                          <button
                            type="button"
                            key={`${item.name}-${item.code}`}
                            onClick={() => {
                              setCountry(item);
                              setCountryOpen(false);
                              setCountrySearch("");
                            }}
                          >
                            <span>{item.flag} {item.name}</span><span>{item.code}</span>
                          </button>
                        )) : <p>No countries found</p>}
                      </div>
                    </div>
                  )}
                </div>
                <input type="tel" autoComplete="tel-national" required placeholder="(555) 000-0000" />
              </div>
            </label>
          )}
          <label className="form-field">
            <span>Password</span>
            <div className="input-with-icon password-input"><LockKeyhole size={15} /><input type={showPassword ? "text" : "password"} autoComplete={mode === "register" ? "new-password" : "current-password"} required minLength={8} placeholder="At least 8 characters" /><button type="button" onClick={() => setShowPassword((show) => !show)}>{showPassword ? "Hide" : "Show"}</button></div>
          </label>
          <button type="submit" className="button button-red auth-submit">{mode === "register" ? "Create demo account" : "Log in to demo"} <ArrowRight size={16} /></button>
        </form>
        <div className="auth-switch">
          {mode === "register" ? "Already have an account?" : "New to TeslaVolt?"}
          <button onClick={() => onChangeMode(mode === "register" ? "login" : "register")}>{mode === "register" ? "Log in" : "Create account"}</button>
        </div>
        <div className="auth-security"><ShieldCheck size={14} /> DEMO MODE · NO DATA IS STORED</div>
      </section>
    </div>
  );
}

function VehicleDetailPage({
  vehicle,
  imageIndex,
  setImageIndex,
  onBack,
  onOrder,
}: {
  vehicle: Vehicle;
  imageIndex: number;
  setImageIndex: (index: number) => void;
  onBack: () => void;
  onOrder: () => void;
}) {
  const gallery = vehicle.gallery
    .map((image) => ({ ...image, image: localImageUrl(image.image) }))
    .filter((image, index, images) => images.findIndex((candidate) => candidate.image === image.image) === index);
  const activeImage = gallery[imageIndex];

  return (
    <main className="vehicle-page">
      <div className="vehicle-page-inner">
        <button className="vehicle-back-link" onClick={onBack}><ArrowLeft size={15} /> Back to the collection</button>
        <section className="vehicle-page-layout">
          <div className="vehicle-page-gallery">
            {activeImage ? (
              <>
                <div className="vehicle-detail-image">
                  <ImageWithFallback
                    src={activeImage.image}
                    alt={activeImage.alt}
                    fallback={vehicleImageFallback}
                    loading="eager"
                  />
                  <span className="vehicle-detail-tag">THE ELECTRIC COLLECTION · {vehicle.accent}</span>
                  <div className="gallery-controls">
                    <button aria-label="Previous image" onClick={() => setImageIndex((imageIndex + gallery.length - 1) % gallery.length)}><ChevronLeft size={18} /></button>
                    <span>{String(imageIndex + 1).padStart(2, "0")} <i /> {String(gallery.length).padStart(2, "0")}</span>
                    <button aria-label="Next image" onClick={() => setImageIndex((imageIndex + 1) % gallery.length)}><ChevronRight size={18} /></button>
                  </div>
                </div>
                <div className="vehicle-gallery-caption">
                  <span>{activeImage.caption}</span>
                  {activeImage.credit && (
                    <span className="vehicle-image-credit">
                      Photo by <a href={activeImage.credit.url} target="_blank" rel="noreferrer">{activeImage.credit.label}</a>
                      {" · "}
                      <a href={activeImage.credit.licenseUrl} target="_blank" rel="noreferrer">{activeImage.credit.license}</a>
                    </span>
                  )}
                </div>
                <div className="vehicle-gallery-thumbnails">
                  {gallery.map((image, index) => (
                    <button
                      key={image.image}
                      className={index === imageIndex ? "vehicle-thumbnail vehicle-thumbnail-active" : "vehicle-thumbnail"}
                      aria-label={`Show ${image.caption}`}
                      title={image.caption}
                      aria-pressed={index === imageIndex}
                      onClick={() => setImageIndex(index)}
                    >
                      <ImageWithFallback
                        src={image.image}
                        alt=""
                        fallback={vehicleImageFallback}
                      />
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div className="vehicle-detail-no-image">
                <span>OFFICIAL TESLA VIDEO</span>
                <p>A verified license for standalone Roadster still images was not found. The official video embeds below provide the available primary-source media.</p>
                <a href="https://www.youtube.com/watch?v=tw4jkyfY4HE" target="_blank" rel="noreferrer">Open the official Roadster video <ArrowUpRight size={14} /></a>
              </div>
            )}
          </div>
          <div className="vehicle-page-details">
            <div className="vehicle-detail-body">
              <div className="eyebrow"><span className="eyebrow-line" /> {vehicle.category.toUpperCase()}</div>
              <div className="vehicle-detail-heading">
                <div><h1>{vehicle.name}</h1><p>{vehicle.name === "Tesla Roadster" ? "Announced prototype · not in production" : "All-electric vehicle"}</p></div>
                <div className="vehicle-detail-actions">
                  <button className="button button-red vehicle-invest-button" onClick={onOrder}>{vehicle.name === "Tesla Roadster" ? "Get updates" : "Order now"} <ArrowRight size={15} /></button>
                  <a className="button button-outline vehicle-learn-button" href={vehicle.officialUrl} target="_blank" rel="noreferrer">Learn more <ArrowUpRight size={15} /></a>
                </div>
              </div>
              <p className="vehicle-description">{vehicle.description}</p>
              <div className="spec-grid">
                <div><BatteryCharging size={17} /><span>Electric range</span><strong>{vehicle.range}</strong></div>
                <div><Gauge size={17} /><span>0–60 mph acceleration</span><strong>{vehicle.acceleration}</strong></div>
                <div><Zap size={17} /><span>Charging</span><strong>{vehicle.charging}</strong></div>
                <div><UsersRound size={17} /><span>Seating capacity</span><strong>{vehicle.seating}</strong></div>
              </div>
              <ul className="vehicle-feature-list">
                {vehicle.features.map((feature) => <li key={feature}>{feature}</li>)}
              </ul>
              <div className="vehicle-expanded-details">
                <article>
                  <h2>Interior and controls</h2>
                  <p>{vehicle.interior}</p>
                </article>
                <article>
                  <h2>Cargo and storage</h2>
                  <p>{vehicle.storage}</p>
                </article>
                <article>
                  <h2>Performance</h2>
                  <p>{vehicle.performanceDetails}</p>
                </article>
              </div>
              <p className="vehicle-invest-disclaimer">This opens an enquiry form only. No order or reservation is placed, and no message is sent until you review and send it in Chaport.</p>
              <p className="vehicle-detail-disclaimer">{vehicle.specificationsNote} Review <a href={vehicle.officialUrl} target="_blank" rel="noreferrer">Tesla's official vehicle information</a> for current configurations and market-specific specifications. TeslaVolt is an independent concept experience and is not affiliated with or endorsed by Tesla, Inc.</p>
            </div>
            <div className="vehicle-detail-note"><ShieldCheck size={17} /><span>THE ELECTRIC COLLECTION</span><strong>Six Tesla vehicles. One electric future.</strong></div>
          </div>
        </section>
      </div>
    </main>
  );
}

function AccountPage({
  page,
  name,
  onBack,
  onInquire,
  onRegister,
  onLogout,
}: {
  page: Exclude<Page, "home">;
  name: string;
  onBack: () => void;
  onInquire: () => void;
  onRegister: () => void;
  onLogout: () => void;
}) {
  const isAdmin = page === "admin";

  return (
    <main className="account-page">
      <aside className="account-sidebar">
        <button className="account-sidebar-brand" onClick={onBack}><span className="brand-mark"><TeslaVoltMark size={16} /></span> TESLAVOLT</button>
        <span className="sidebar-label">{isAdmin ? "ADMINISTRATION" : "YOUR SPACE"}</span>
        <button className="sidebar-item sidebar-item-active"><span className="sidebar-icon">▦</span> {isAdmin ? "Overview" : "Dashboard"}</button>
        <button className="sidebar-item" onClick={onBack}><span className="sidebar-icon">⌁</span> Explore TeslaVolt</button>
        <button className="sidebar-item" onClick={onInquire}><span className="sidebar-icon">◌</span> Support</button>
        {isAdmin && <><span className="sidebar-label sidebar-label-lower">MANAGE</span><button className="sidebar-item"><span className="sidebar-icon">◷</span> Inquiries</button><button className="sidebar-item"><span className="sidebar-icon">◉</span> Demo users</button></>}
        <div className="sidebar-bottom">
          <div className="sidebar-demo-note"><ShieldCheck size={15} /><span>Demo preview<br /><small>No real account data</small></span></div>
          <button className="sidebar-signout" onClick={onLogout}><ArrowLeft size={15} /> Return to website</button>
        </div>
      </aside>
      <div className="account-main">
        <header className="account-topbar"><button className="account-back" onClick={onBack}><ArrowLeft size={15} /> Website</button><div className="account-user"><span>{isAdmin ? "ADMIN PREVIEW" : "MEMBER PREVIEW"}</span><div className="user-avatar">{isAdmin ? "A" : name.split(" ").map((part) => part[0]).slice(0, 2).join("")}</div></div></header>
        <div className="account-content">
          <div className="account-eyebrow"><span className="account-green-dot" /> {isAdmin ? "PLATFORM OVERVIEW" : "YOUR TESLAVOLT SPACE"}</div>
          <h1>{isAdmin ? "Good morning, Admin." : `Welcome back, ${name.split(" ")[0]}.`}</h1>
          <p className="account-subtitle">{isAdmin ? "A preview of the platform interface. No live activity is connected." : "Your space to explore electric mobility and energy."}</p>
          <div className="account-demo-alert"><CircleHelp size={17} /><span><strong>Demo dashboard.</strong> This is a front-end preview. No real accounts, activity, customer records, or investments are connected.</span></div>
          <div className="dashboard-stat-grid">
            {(isAdmin ? [
              { label: "Connected user records", value: "Not connected", change: "No backend connected", icon: "◉" },
              { label: "Customer enquiries", value: "Not connected", change: "No records connected", icon: "◷" },
              { label: "Investment service", value: "None", change: "No service configured", icon: "⌁" },
            ] : [
              { label: "Investment service", value: "None", change: "Not available on this site", icon: "—" },
              { label: "Investment activity", value: "None", change: "No service is connected", icon: "⌁" },
              { label: "Account status", value: "Preview", change: "No account created", icon: "◉" },
            ]).map((stat) => <div className="dashboard-stat" key={stat.label}><div className="stat-top"><span>{stat.label}</span><i>{stat.icon}</i></div><strong>{stat.value}</strong><small>{stat.change}</small></div>)}
          </div>
          {isAdmin ? (
            <>
              <div className="admin-dashboard-grid">
                <section className="dashboard-panel admin-inquiries"><div className="dashboard-panel-heading"><div><span className="panel-overline">CUSTOMER ENQUIRIES</span><h3>No connected enquiries</h3></div><MessageCircle size={16} /></div>
                  <div className="empty-activity"><span className="empty-activity-icon"><MessageCircle size={18} /></span><strong>No customer records are connected.</strong><p>Enquiries open in Chaport and are managed through your Chaport account.</p></div>
                </section>
                <section className="dashboard-panel admin-quick"><div className="panel-overline">QUICK ACTION</div><h3>Keep the platform moving.</h3><p>This admin panel is a visual prototype. Connect a secure backend before managing users, opportunities, or customer data.</p><button className="button button-red" onClick={onInquire}>Open live chat <ArrowRight size={15} /></button><button className="admin-return" onClick={onRegister}>Open sign-up preview <ArrowUpRight size={14} /></button></section>
              </div>
              <section className="dashboard-panel admin-deposits">
                <div className="dashboard-panel-heading">
                  <div><span className="panel-overline">INVESTMENT SERVICE STATUS</span><h3>No deposit service configured</h3></div>
                  <ShieldCheck size={16} />
                </div>
                <div className="empty-activity">
                  <span className="empty-activity-icon"><Clock3 size={18} /></span>
                  <strong>No deposit submissions or pending reviews.</strong>
                  <p>This preview has no payment address, transaction service, or secure backend. It cannot receive TXIDs, verify transactions, or approve deposits.</p>
                </div>
              </section>
            </>
          ) : (
            <div className="dashboard-lower-grid">
              <section className="dashboard-panel welcome-panel"><div className="welcome-panel-glow" /><div className="panel-overline">A NEW WAY FORWARD</div><h3>Explore electric<br />mobility and energy.</h3><p>Discover vehicle galleries, home energy products and supervised-driving information.</p><button className="button button-red" onClick={onBack}>Explore the platform <ArrowRight size={15} /></button><span className="welcome-panel-tag">TESLAVOLT · CONCEPT</span></section>
              <section className="dashboard-panel activity-panel"><div className="dashboard-panel-heading"><div><span className="panel-overline">YOUR ACTIVITY</span><h3>Recent activity</h3></div><Clock3 size={16} /></div><div className="empty-activity"><span className="empty-activity-icon"><Zap size={18} /></span><strong>It's quiet in here.</strong><p>Your demo dashboard starts fresh. Explore the platform to see what's possible.</p><button onClick={onBack}>Explore TeslaVolt <ArrowRight size={14} /></button></div></section>
            </div>
          )}
          <p className="account-footer-note"><LockKeyhole size={12} /> PROTOTYPE INTERFACE · NOT CONNECTED TO A BACKEND OR FINANCIAL SERVICE</p>
        </div>
      </div>
    </main>
  );
}

function Footer({ onNavigate }: { onNavigate: (id: string) => void }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const faqs = [
    ["Is TeslaVolt affiliated with Tesla?", "No. TeslaVolt is an independent concept experience and is not authorized by, affiliated with, or endorsed by Tesla, Inc."],
    ["Can I place an order or reserve a vehicle here?", "No. The enquiry form prepares a message for you to review in Chaport. It does not place an order, reserve a vehicle, or take payment."],
    ["Is Full Self-Driving fully autonomous?", "No. Full Self-Driving (Supervised) requires active driver supervision and does not make a vehicle fully autonomous."],
    ["Is an investment service available?", "No investment service or offer is configured. Company registration, regulatory authorisation, investment terms, risk disclosures, and a complaint-handling process have not been provided. No deposits or investment records are accepted or displayed."],
  ];

  return (
    <footer>
      <div className="faq-section">
        <div className="faq-heading"><div className="eyebrow"><span className="eyebrow-line" /> GOOD QUESTIONS</div><h2>Clarity comes<br /><span>standard.</span></h2><p>A few things worth knowing before you explore.</p></div>
        <div className="faq-list">{faqs.map(([question, answer], index) => <div className={`faq-item ${openFaq === index ? "faq-item-open" : ""}`} key={question}><button onClick={() => setOpenFaq(openFaq === index ? null : index)} aria-expanded={openFaq === index}><span>0{index + 1}</span><strong>{question}</strong><i>{openFaq === index ? <Minus size={16} /> : <Plus size={16} />}</i></button>{openFaq === index && <p>{answer}</p>}</div>)}</div>
      </div>
      <div className="footer-main">
        <div className="footer-brand-col"><button className="brand footer-brand" onClick={() => onNavigate("top")}><span className="brand-mark"><TeslaVoltMark /></span><span>TESLA<span className="brand-light">VOLT</span></span></button><p>Electric ideas for a world<br />in motion.</p><span className="footer-location"><Globe2 size={13} /> A concept for the curious, everywhere.</span></div>
        <div className="footer-link-col"><span>EXPLORE</span><button onClick={() => onNavigate("vehicles")}>The vehicles</button><button onClick={() => onNavigate("energy")}>Home energy</button><button onClick={() => onNavigate("self-driving")}>Self-driving</button><button onClick={() => onNavigate("about")}>About TeslaVolt</button></div>
        <div className="footer-link-col"><span>CONNECT</span><button onClick={() => document.querySelector<HTMLButtonElement>(".chat-launcher")?.click()}>Customer support</button><button onClick={() => onNavigate("investment")}>Investment information</button><button onClick={() => onNavigate("top")}>Back to top <ArrowUpRight size={12} /></button></div>
        <div className="footer-disclaimer"><span><ShieldCheck size={15} /> IMPORTANT INFORMATION</span><p>TeslaVolt is independent and is not affiliated with or endorsed by Tesla, Inc. No investment service, product, or offer is available. No company registration, regulatory authorisation, investment terms, risk disclosures, or complaint-handling process have been supplied. Do not send funds or TXIDs. Product enquiries do not create an order or reservation.</p></div>
      </div>
      <div className="footer-bottom"><span>© 2026 TESLAVOLT. A CONCEPT FOR WHAT'S NEXT.</span><span>BUILT FOR AN ELECTRIC FUTURE <i /> NOT AFFILIATED WITH TESLA, INC.</span><button onClick={() => onNavigate("top")}>BACK TO TOP <ArrowUpRight size={12} /></button></div>
    </footer>
  );
}

export default App;
