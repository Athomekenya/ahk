export interface EquipmentItem {
  id: string;
  name: string;
  category: "pharmaceutical" | "mobility" | "respiratory" | "patient-care" | "diagnostics";
  availableFor: "buy" | "lease" | "both";
  purchasePrice?: number;
  dailyRate?: number;
  weeklyRate?: number;
  description: string;
  imageUrl: string;
  available: boolean;
}

export const equipmentData: EquipmentItem[] = [
  {
    id: "eq-1",
    name: "5-Function Electric Hospital Bed",
    category: "patient-care",
    availableFor: "both",
    purchasePrice: 185000,
    dailyRate: 1500,
    weeklyRate: 9000,
    description: "Fully motorized hospital bed with backrest, knee rest, height adjustment, trendelenburg, and reverse trendelenburg positioning. Includes mattress.",
    imageUrl: "/images/equipment/electric-bed.jpg",
    available: true,
  },
  {
    id: "eq-2",
    name: "Medical Oxygen Concentrator (5L/min)",
    category: "respiratory",
    availableFor: "both",
    purchasePrice: 120000,
    dailyRate: 1200,
    weeklyRate: 7500,
    description: "Continuous flow oxygen concentrator delivering up to 96% purity. Ideal for chronic respiratory care and recovery at home. Quiet and energy-efficient.",
    imageUrl: "/images/equipment/oxygen-concentrator.jpg",
    available: true,
  },
  {
    id: "eq-3",
    name: "Lightweight Foldable Wheelchair",
    category: "mobility",
    availableFor: "both",
    purchasePrice: 28000,
    dailyRate: 400,
    weeklyRate: 2500,
    description: "Durable, lightweight steel frame wheelchair with breathable seat upholstery, flip-back armrests, and swing-away footrests. Easy to fold and transport.",
    imageUrl: "/images/equipment/wheelchair.jpg",
    available: true,
  },
  {
    id: "eq-4",
    name: "Digital Blood Pressure Monitor",
    category: "diagnostics",
    availableFor: "buy",
    purchasePrice: 6500,
    description: "Fully automatic upper-arm blood pressure monitor with cuff, memory storage, and large digital screen. Certified medical grade.",
    imageUrl: "/images/equipment/bp-monitor.jpg",
    available: true,
  },
  {
    id: "eq-5",
    name: "Pulse Oximeter & Heart Rate Monitor",
    category: "diagnostics",
    availableFor: "buy",
    purchasePrice: 3200,
    description: "Fingertip pulse oximeter for fast SPO2 and pulse rate measurement with clear OLED display.",
    imageUrl: "/images/equipment/bp-monitor.jpg",
    available: true,
  },
  {
    id: "eq-6",
    name: "Heavy-Duty Suction Machine",
    category: "patient-care",
    availableFor: "both",
    purchasePrice: 45000,
    dailyRate: 500,
    weeklyRate: 3000,
    description: "High vacuum, high flow medical suction pump for airway clearance. Suitable for tracheostomy care and patient recovery at home.",
    imageUrl: "/images/equipment/suction-machine.jpg",
    available: true,
  },
  {
    id: "eq-7",
    name: "Alternating Pressure Mattress",
    category: "patient-care",
    availableFor: "both",
    purchasePrice: 24000,
    dailyRate: 300,
    weeklyRate: 1800,
    description: "Medical-grade bubble pad mattress with adjustable pressure pump. Prevents bed sores and pressure ulcers for bedridden patients.",
    imageUrl: "/images/equipment/pressure-mattress.jpg",
    available: true,
  },
  {
    id: "eq-8",
    name: "Prescription Wound Dressing Kit (Sterile Pack)",
    category: "pharmaceutical",
    availableFor: "buy",
    purchasePrice: 4800,
    description: "Complete clinical-grade sterile dressing kit containing antiseptics, gauze, non-stick dressings, medical tape, and gloves.",
    imageUrl: "/images/equipment/overbed-table.jpg",
    available: true,
  },
  {
    id: "eq-9",
    name: "Hydraulic Patient Lifter (Hoist)",
    category: "mobility",
    availableFor: "lease",
    dailyRate: 1000,
    weeklyRate: 6000,
    description: "Safe, hydraulic patient hoist for transfer between bed, wheelchair, and bath. Heavy-duty construction with comfortable 4-point sling.",
    imageUrl: "/images/equipment/patient-lifter.jpg",
    available: true,
  },
  {
    id: "eq-10",
    name: "Adjustable Overbed Table",
    category: "patient-care",
    availableFor: "both",
    purchasePrice: 16500,
    dailyRate: 200,
    weeklyRate: 1200,
    description: "Sturdy overbed table with height adjustment and wood-grain laminate top. Swivel casters allow easy maneuvering and locks for stability.",
    imageUrl: "/images/equipment/overbed-table.jpg",
    available: true,
  },
];
