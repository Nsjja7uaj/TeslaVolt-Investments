import { useEffect, useMemo, useState } from "react";
import { getCountries, getCountryCallingCode } from "libphonenumber-js";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BatteryCharging,
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
  Plus,
  ShieldCheck,
  Sparkles,
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

type Opportunity = {
  name: string;
  type: string;
  minimum: string;
  term: string;
  target: string;
  progress: number;
  image: string;
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
        image: "https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-S-Main-Hero-Desktop",
        alt: "Tesla Model S official exterior image",
        caption: "Model S exterior",
      },
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
        image: "https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-S-Interior-Desktop",
        alt: "Tesla Model S cabin and dashboard",
        caption: "Model S cabin and dashboard",
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
        image: "https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Hero-Desktop",
        alt: "Tesla Model 3 Performance official exterior image",
        caption: "Model 3 Performance exterior",
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
        image: "https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Performance-Interior-Desktop",
        alt: "Tesla Model 3 cabin and center touchscreen",
        caption: "Model 3 cabin and center touchscreen",
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
        image: "https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-X-Main-Hero-Desktop",
        alt: "Tesla Model X official exterior image",
        caption: "Model X exterior",
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
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c6/Tesla_Model_X_100D_1X7A6736.jpg/1920px-Tesla_Model_X_100D_1X7A6736.jpg",
        alt: "Tesla Model X 100D displayed at Retro Classics in 2023",
        caption: "Model X 100D · 2023 display",
        credit: commonsCredit("Tesla Model X 100D 1X7A6736.jpg", "Alexander Migl", "CC BY-SA 4.0"),
      },
      {
        image: "https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-X-Interior-Desktop",
        alt: "Tesla Model X cabin and dashboard",
        caption: "Model X cabin and dashboard",
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
        image: "https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-Y-Main-Hero-Desktop-NA",
        alt: "Tesla Model Y official exterior image",
        caption: "Model Y exterior",
      },
      {
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bd/Tesla_Model_Y_Standard_front_view_dllu.jpg/1920px-Tesla_Model_Y_Standard_front_view_dllu.jpg",
        alt: "Front view of the 2025 Tesla Model Y Standard",
        caption: "2025 Model Y Standard · front view",
        credit: commonsCredit("Tesla Model Y Standard front view dllu.jpg", "Dllu", "CC BY-SA 4.0"),
      },
      {
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e2/Tesla_Model_Y_2025_at_Santana_Row_dllu_02.jpg/1920px-Tesla_Model_Y_2025_at_Santana_Row_dllu_02.jpg",
        alt: "Refreshed 2025 Tesla Model Y at Santana Row",
        caption: "2025 refreshed Model Y · exterior",
        credit: commonsCredit("Tesla Model Y 2025 at Santana Row dllu 02.jpg", "Dllu", "CC BY-SA 4.0"),
      },
      {
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0c/Tesla_Model_Y_%282025%29_DSC_8297.jpg/1920px-Tesla_Model_Y_%282025%29_DSC_8297.jpg",
        alt: "2025 Tesla Model Y exterior in Böblingen",
        caption: "2025 Model Y · exterior detail",
        credit: commonsCredit("Tesla Model Y (2025) DSC 8297.jpg", "Alexander Migl", "CC BY-SA 4.0"),
      },
      {
        image: "https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-Y-Interior-Desktop",
        alt: "Tesla Model Y cabin and center touchscreen",
        caption: "Model Y cabin and center touchscreen",
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
        image: "https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Cybertruck-Main-Hero-Desktop",
        alt: "Tesla Cybertruck official exterior image",
        caption: "Cybertruck exterior",
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
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e5/Tesla_Cybertruck_%282024%29.jpg/1920px-Tesla_Cybertruck_%282024%29.jpg",
        alt: "Tesla Cybertruck displayed in 2024",
        caption: "Cybertruck · 2024 exterior",
        credit: commonsCredit("Tesla Cybertruck (2024).jpg", "Amaury Laporte", "CC BY 2.0"),
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
      "Tesla has announced a next-generation Roadster, but it is not represented here as a production vehicle. The available photographs show the announced prototype, not a confirmed final design.",
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
    gallery: [
      {
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3f/Tesla_roadster_2020_prototype.jpg/1920px-Tesla_roadster_2020_prototype.jpg",
        alt: "Tesla next-generation Roadster prototype unveiled in 2017",
        caption: "Announced Roadster · 2017 prototype",
        credit: commonsCredit("Tesla roadster 2020 prototype.jpg", "Smnt", "CC BY-SA 4.0"),
      },
      {
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c4/Tesla_Roadster_2.0_%2847619421652%29.jpg/1920px-Tesla_Roadster_2.0_%2847619421652%29.jpg",
        alt: "Tesla Roadster 2.0 prototype at Tesla headquarters",
        caption: "Roadster 2.0 · prototype exterior",
        credit: commonsCredit("Tesla Roadster 2.0 (47619421652).jpg", "Steve Jurvetson", "CC BY 2.0"),
      },
    ],
    officialUrl: "https://www.tesla.com/roadster",
    specificationsNote:
      "Tesla has not confirmed final production specifications, availability, or pricing. Earlier announced targets are not treated here as confirmed production figures.",
    accent: "06",
  },
];

const opportunities: Opportunity[] = [
  {
    name: "Volt Mobility Fund I",
    type: "EV infrastructure",
    minimum: "$5,000",
    term: "36 months",
    target: "8–12%*",
    progress: 68,
    image:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1000&q=80",
  },
  {
    name: "Next Mile Charging",
    type: "Charging network",
    minimum: "$2,500",
    term: "24 months",
    target: "7–10%*",
    progress: 42,
    image:
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1000&q=80",
  },
  {
    name: "Clean Grid Notes",
    type: "Renewable energy",
    minimum: "$1,000",
    term: "18 months",
    target: "6–9%*",
    progress: 84,
    image:
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1000&q=80",
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
type Page = "home" | "dashboard" | "admin";

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

function App() {
  const [page, setPage] = useState<Page>("home");
  const [authMode, setAuthMode] = useState<AuthMode>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [vehicleImageIndex, setVehicleImageIndex] = useState(0);
  const [chatStatus, setChatStatus] = useState<string | null>(null);
  const [preparedChatMessage, setPreparedChatMessage] = useState<string | null>(null);
  const [chatLoadFailed, setChatLoadFailed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeName, setActiveName] = useState("Alex Morgan");

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

  const openSupportChat = (vehicleName?: string) => {
    const preparedMessage = vehicleName
      ? `Hello, I am interested in investing in the ${vehicleName}. Please provide more information.`
      : null;
    setPreparedChatMessage(preparedMessage);
    setChatStatus(
      preparedMessage
        ? "Chaport is opening. This prepared message has not been sent."
        : null,
    );

    if (chatLoadFailed) {
      setChatStatus("Chaport could not be loaded. Check your connection and reload the page to try again.");
      return;
    }

    if (!chaportAppId) return;

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

  const scrollTo = (id: string) => {
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
        <span>A concept platform for the next era of mobility</span>
        <span className="announcement-separator">·</span>
        <button onClick={() => scrollTo("opportunities")}>Explore demos</button>
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
          <span className="brand-mark"><Zap size={18} fill="currentColor" /></span>
          <span>TESLA<span className="brand-light">VOLT</span></span>
        </button>
        <nav className="desktop-nav" aria-label="Main navigation">
          <button onClick={() => scrollTo("vehicles")}>Vehicles</button>
          <button onClick={() => scrollTo("opportunities")}>Opportunities</button>
          <button onClick={() => scrollTo("about")}>Our vision</button>
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
          <button onClick={() => scrollTo("opportunities")}>Opportunities</button>
          <button onClick={() => scrollTo("about")}>Our vision</button>
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
          onInvest={(vehicleName) => openSupportChat(vehicleName)}
        />
      ) : page === "home" ? (
        <HomePage
          onVehicleSelect={(vehicle) => {
            setSelectedVehicle(vehicle);
            setVehicleImageIndex(0);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          onInquire={() => openSupportChat()}
          onRegister={() => openAuth("register")}
          onDashboard={enterDashboard}
          onAdmin={() => {
            setPage("admin");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />
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

    </div>
  );
}

function HomePage({
  onVehicleSelect,
  onInquire,
  onRegister,
  onDashboard,
  onAdmin,
}: {
  onVehicleSelect: (vehicle: Vehicle) => void;
  onInquire: () => void;
  onRegister: () => void;
  onDashboard: () => void;
  onAdmin: () => void;
}) {
  return (
    <main>
      <section className="hero">
        <div className="hero-image" />
        <div className="hero-vignette" />
        <div className="hero-content">
          <div className="eyebrow"><span className="eyebrow-line" /> ELECTRIC. ELEVATED. EMPOWERED.</div>
          <h1>The road ahead<br />is <span>electric.</span></h1>
          <p>Discover the vehicles shaping tomorrow, and explore a new perspective on the future of mobility.</p>
          <div className="hero-buttons">
            <button className="button button-red" onClick={() => document.getElementById("vehicles")?.scrollIntoView({ behavior: "smooth" })}>
              Explore vehicles <ArrowRight size={16} />
            </button>
            <button className="button button-outline" onClick={() => document.getElementById("opportunities")?.scrollIntoView({ behavior: "smooth" })}>
              Explore opportunities <ArrowUpRight size={15} />
            </button>
          </div>
          <div className="hero-caption"><span className="hero-caption-line" /> A concept for what's next</div>
        </div>
        <div className="hero-side-label"><span>01 — 06</span><span className="side-label-rule" /> THE ELECTRIC COLLECTION</div>
        <a className="hero-scroll" href="#vehicles" aria-label="Scroll to vehicles"><ArrowDown size={16} /></a>
        <div className="hero-coordinates"><span>37°23'17.4"N</span><span>122°08'50.1"W</span></div>
      </section>

      <section className="trust-strip">
        <div><ShieldCheck size={18} /><span>Built around transparency</span></div>
        <span className="trust-divider" />
        <div><Globe2 size={18} /><span>A global EV community</span></div>
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
              <div className="vehicle-card-image" style={{ backgroundImage: `url("${vehicle.gallery[0].image}")` }}>
                <span className="vehicle-number">{vehicle.accent} / 06</span>
                <span className="vehicle-open"><ArrowUpRight size={18} /></span>
                <span className="vehicle-image-shade" />
                <div className="vehicle-card-title">
                  <span>{vehicle.category}</span>
                  <strong>{vehicle.name}</strong>
                </div>
              </div>
              <div className="vehicle-card-meta"><span>{vehicle.seating === "Not confirmed" ? "Planned vehicle" : vehicle.seating}</span><span>Explore Vehicle <ArrowRight size={14} /></span></div>
            </button>
          ))}
        </div>
        <div className="section-bottom-note"><span>01 — 06</span><span>Explore the all-electric collection</span><span className="note-line" /></div>
      </section>

      <section className="manifesto" id="about">
        <div className="manifesto-image" />
        <div className="manifesto-overlay" />
        <div className="manifesto-content">
          <div className="eyebrow"><span className="eyebrow-line" /> A DIFFERENT KIND OF DRIVE</div>
          <h2>Progress isn't<br />a destination.<br /><span>It's a direction.</span></h2>
          <p>We believe the shift to electric is bigger than what we drive. It's a chance to rethink what moving forward looks like.</p>
          <button className="text-button" onClick={() => document.getElementById("opportunities")?.scrollIntoView({ behavior: "smooth" })}>
            Discover our perspective <ArrowRight size={16} />
          </button>
        </div>
        <div className="manifesto-caption">THE FUTURE DOESN'T WAIT FOR GREEN LIGHTS.</div>
      </section>

      <section className="section opportunity-section" id="opportunities">
        <div className="section-heading opportunity-heading">
          <div>
            <div className="eyebrow"><span className="eyebrow-line" /> THE OPPORTUNITY</div>
            <h2>Back what <span>moves us.</span></h2>
          </div>
          <p>Explore demonstration-only opportunities inspired by the electric transition. Nothing shown is a real investment offer.</p>
        </div>
        <div className="demo-banner">
          <span className="demo-banner-icon"><CircleHelp size={17} /></span>
          <span><strong>Demonstration only.</strong> These fictional examples are not genuine investment offers, Tesla products, or financial advice. TeslaVolt is not authorized, affiliated with, or endorsed by Tesla, Inc. No returns are promised.</span>
        </div>
        <div className="opportunity-grid">
          {opportunities.map((opportunity) => (
            <article className="opportunity-card" key={opportunity.name}>
              <div className="opportunity-image" style={{ backgroundImage: `url("${opportunity.image}")` }}>
                <span className="demo-tag"><span /> SAMPLE OPPORTUNITY</span>
                <span className="opportunity-type">{opportunity.type}</span>
              </div>
              <div className="opportunity-content">
                <h3>{opportunity.name}</h3>
                <div className="opportunity-stats">
                  <div><span>Illustrative target*</span><strong>{opportunity.target}</strong></div>
                  <div><span>Example minimum</span><strong>{opportunity.minimum}</strong></div>
                  <div><span>Example term</span><strong>{opportunity.term}</strong></div>
                </div>
                <div className="funding-label"><span>Sample allocation</span><span>{opportunity.progress}%</span></div>
                <div className="progress-track"><span style={{ width: `${opportunity.progress}%` }} /></div>
                <button className="opportunity-cta" onClick={onInquire}>Ask about this demo <ArrowRight size={15} /></button>
              </div>
            </article>
          ))}
        </div>
        <p className="opportunity-footnote">*Illustrative figures only. Fictional demonstration content—not a financial product, offer, solicitation, or prediction of future results. TeslaVolt is independent and not authorized, affiliated with, or endorsed by Tesla, Inc. Not investment advice. Consult qualified professionals before making financial decisions.</p>
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
        <div className="modal-brand"><span className="brand-mark"><Zap size={16} fill="currentColor" /></span> TESLAVOLT</div>
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
              <input autoComplete="name" required placeholder="Alex Morgan" value={name} onChange={(event) => setName(event.target.value)} />
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
  onInvest,
}: {
  vehicle: Vehicle;
  imageIndex: number;
  setImageIndex: (index: number) => void;
  onBack: () => void;
  onInvest: (vehicleName: string) => void;
}) {
  const gallery = vehicle.gallery;
  const activeImage = gallery[imageIndex];

  return (
    <main className="vehicle-page">
      <div className="vehicle-page-inner">
        <button className="vehicle-back-link" onClick={onBack}><ArrowLeft size={15} /> Back to the collection</button>
        <section className="vehicle-page-layout">
          <div className="vehicle-page-gallery">
            <div
              className="vehicle-detail-image"
              role="img"
              aria-label={activeImage.alt}
              style={{ backgroundImage: `url("${activeImage.image}")` }}
            >
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
                  style={{ backgroundImage: `url("${image.image}")` }}
                  aria-label={`Show ${image.caption}`}
                  title={image.caption}
                  aria-pressed={index === imageIndex}
                  onClick={() => setImageIndex(index)}
                />
              ))}
            </div>
          </div>
          <div className="vehicle-page-details">
            <div className="vehicle-detail-body">
              <div className="eyebrow"><span className="eyebrow-line" /> {vehicle.category.toUpperCase()}</div>
              <div className="vehicle-detail-heading">
                <div><h1>{vehicle.name}</h1><p>{vehicle.name === "Tesla Roadster" ? "Announced prototype · not in production" : "All-electric vehicle"}</p></div>
                <button
                  className="button button-red vehicle-invest-button"
                  onClick={() => onInvest(vehicle.name)}
                >
                  INVEST IN THIS MODEL <ArrowRight size={15} />
                </button>
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
              <p className="vehicle-invest-disclaimer">TeslaVolt is an independent concept platform. This button opens Chaport with a prepared enquiry only; no investment is offered and no message is sent until you send it yourself.</p>
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
        <button className="account-sidebar-brand" onClick={onBack}><span className="brand-mark"><Zap size={16} fill="currentColor" /></span> TESLAVOLT</button>
        <span className="sidebar-label">{isAdmin ? "ADMINISTRATION" : "YOUR SPACE"}</span>
        <button className="sidebar-item sidebar-item-active"><span className="sidebar-icon">▦</span> {isAdmin ? "Overview" : "Dashboard"}</button>
        <button className="sidebar-item" onClick={onBack}><span className="sidebar-icon">⌁</span> Explore opportunities</button>
        <button className="sidebar-item" onClick={onInquire}><span className="sidebar-icon">◌</span> Support</button>
        {isAdmin && <><span className="sidebar-label sidebar-label-lower">MANAGE</span><button className="sidebar-item"><span className="sidebar-icon">◷</span> Inquiries <span className="sidebar-count">3</span></button><button className="sidebar-item"><span className="sidebar-icon">◉</span> Demo users</button></>}
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
          <p className="account-subtitle">{isAdmin ? "A preview of platform activity and sample inquiries." : "Your space to explore the electric transition."}</p>
          <div className="account-demo-alert"><CircleHelp size={17} /><span><strong>Demo dashboard.</strong> This is a front-end preview. No real accounts, activity, customer records, or investments are connected.</span></div>
          <div className="dashboard-stat-grid">
            {(isAdmin ? [
              { label: "Total demo users", value: "128", change: "+12 this month", icon: "◉" },
              { label: "Sample inquiries", value: "24", change: "8 awaiting review", icon: "◷" },
              { label: "Demo opportunities", value: "03", change: "All marked as samples", icon: "⌁" },
            ] : [
              { label: "Portfolio value", value: "$0.00", change: "No holdings", icon: "$" },
              { label: "Active investments", value: "0", change: "Explore demo opportunities", icon: "⌁" },
              { label: "Account status", value: "Preview", change: "No account created", icon: "◉" },
            ]).map((stat) => <div className="dashboard-stat" key={stat.label}><div className="stat-top"><span>{stat.label}</span><i>{stat.icon}</i></div><strong>{stat.value}</strong><small>{stat.change}</small></div>)}
          </div>
          {isAdmin ? (
            <div className="admin-dashboard-grid">
              <section className="dashboard-panel admin-inquiries"><div className="dashboard-panel-heading"><div><span className="panel-overline">RECENT ACTIVITY</span><h3>Sample inquiries</h3></div><button>View all <ArrowRight size={14} /></button></div>
                {[
                  ["JD", "Jordan Davis", "Volt Mobility Fund I", "2 min ago", "New"],
                  ["SK", "Sam Kim", "Next Mile Charging", "1 hour ago", "Review"],
                  ["RT", "Riley Taylor", "Clean Grid Notes", "Yesterday", "Replied"],
                ].map((item) => <div className="inquiry-row" key={item[1]}><div className="inquiry-avatar">{item[0]}</div><div className="inquiry-person"><strong>{item[1]}</strong><span>{item[2]}</span></div><span className="inquiry-time">{item[3]}</span><span className={`inquiry-status status-${item[4].toLowerCase()}`}>{item[4]}</span></div>)}
                <p className="table-demo-caption">Fictional demo entries — not real customers or inquiries.</p>
              </section>
              <section className="dashboard-panel admin-quick"><div className="panel-overline">QUICK ACTION</div><h3>Keep the platform moving.</h3><p>This admin panel is a visual prototype. Connect a secure backend before managing users, opportunities, or customer data.</p><button className="button button-red" onClick={onInquire}>Open live chat <ArrowRight size={15} /></button><button className="admin-return" onClick={onRegister}>Open sign-up preview <ArrowUpRight size={14} /></button></section>
            </div>
          ) : (
            <div className="dashboard-lower-grid">
              <section className="dashboard-panel welcome-panel"><div className="welcome-panel-glow" /><div className="panel-overline">A NEW WAY FORWARD</div><h3>Explore the ideas<br />moving us forward.</h3><p>Browse fictional example opportunities inspired by the changing world of electric mobility.</p><button className="button button-red" onClick={onBack}>Explore the platform <ArrowRight size={15} /></button><span className="welcome-panel-tag">TESLAVOLT · CONCEPT</span></section>
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
    ["Are the investment opportunities real?", "No. The opportunities on this site are fictional examples for demonstration only. No live offers or financial products are configured."],
    ["Can I create a real account or invest?", "Not at this time. Sign-up and dashboard experiences are front-end prototypes only. No personal data is saved or transmitted."],
  ];

  return (
    <footer>
      <div className="faq-section">
        <div className="faq-heading"><div className="eyebrow"><span className="eyebrow-line" /> GOOD QUESTIONS</div><h2>Clarity comes<br /><span>standard.</span></h2><p>A few things worth knowing before you explore.</p></div>
        <div className="faq-list">{faqs.map(([question, answer], index) => <div className={`faq-item ${openFaq === index ? "faq-item-open" : ""}`} key={question}><button onClick={() => setOpenFaq(openFaq === index ? null : index)} aria-expanded={openFaq === index}><span>0{index + 1}</span><strong>{question}</strong><i>{openFaq === index ? <Minus size={16} /> : <Plus size={16} />}</i></button>{openFaq === index && <p>{answer}</p>}</div>)}</div>
      </div>
      <div className="footer-main">
        <div className="footer-brand-col"><button className="brand footer-brand" onClick={() => onNavigate("top")}><span className="brand-mark"><Zap size={18} fill="currentColor" /></span><span>TESLA<span className="brand-light">VOLT</span></span></button><p>Electric ideas for a world<br />in motion.</p><span className="footer-location"><Globe2 size={13} /> A concept for the curious, everywhere.</span></div>
        <div className="footer-link-col"><span>EXPLORE</span><button onClick={() => onNavigate("vehicles")}>The vehicles</button><button onClick={() => onNavigate("opportunities")}>Opportunities</button><button onClick={() => onNavigate("about")}>Our vision</button></div>
        <div className="footer-link-col"><span>CONNECT</span><button onClick={() => document.querySelector<HTMLButtonElement>(".chat-launcher")?.click()}>Get in touch</button><button onClick={() => onNavigate("opportunities")}>Investment demo</button><button onClick={() => onNavigate("top")}>Back to top <ArrowUpRight size={12} /></button></div>
        <div className="footer-disclaimer"><span><ShieldCheck size={15} /> IMPORTANT INFORMATION</span><p>TeslaVolt is a concept website, not authorized by, affiliated with, or endorsed by Tesla, Inc. All opportunities are fictional demonstrations—not investment offers, advice, or financial products. No real accounts, services, or investment activity are available.</p></div>
      </div>
      <div className="footer-bottom"><span>© 2026 TESLAVOLT. A CONCEPT FOR WHAT'S NEXT.</span><span>BUILT FOR AN ELECTRIC FUTURE <i /> NOT AFFILIATED WITH TESLA, INC.</span><button onClick={() => onNavigate("top")}>BACK TO TOP <ArrowUpRight size={12} /></button></div>
    </footer>
  );
}

export default App;
