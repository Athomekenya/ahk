import {
  Activity,
  Heart,
  Dumbbell,
  Bandage,
  Baby,
  Video,
  Apple,
  Wrench,
  LucideIcon,
} from "lucide-react";

export interface ServiceData {
  slug: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  icon: LucideIcon;
  priceFrom: string | null;
  benefits: string[];
  whatToExpect: { title: string; description: string }[];
  faqs: { question: string; answer: string }[];
}

export const servicesData: ServiceData[] = [
  {
    slug: "chronic-disease-management",
    name: "Chronic Disease Management",
    shortDescription: "Ongoing in-home care for diabetes, hypertension, and other long-term conditions.",
    longDescription: "Living with a chronic illness can be challenging, but managing it shouldn't be. Our dedicated nursing team provides ongoing, personalized care in the comfort of your home, ensuring medications are administered, vitals are monitored, and complications are prevented before they arise.",
    icon: Activity,
    priceFrom: null,
    benefits: [
      "Regular vital signs monitoring (blood pressure, sugar levels, etc.)",
      "Medication administration and management",
      "Coordination with your primary physician",
      "Lifestyle and diet guidance specific to the condition",
    ],
    whatToExpect: [
      { title: "Initial Assessment", description: "A senior nurse visits to assess the patient's current condition, medical history, and home environment." },
      { title: "Care Plan Creation", description: "We develop a tailored care plan in consultation with the patient's primary doctor." },
      { title: "Ongoing Support", description: "Regular scheduled visits from our nurses to monitor progress and adjust care as needed." },
    ],
    faqs: [
      { question: "Which conditions do you manage?", answer: "We primarily manage Diabetes, Hypertension, Stroke recovery, Asthma, and Arthritis, but our team is equipped to handle various other chronic conditions." },
      { question: "Do you provide 24/7 care?", answer: "Yes, we can arrange for live-in nurses or shifts to provide round-the-clock care based on the patient's needs." },
    ],
  },
  {
    slug: "palliative-care",
    name: "Palliative Care",
    shortDescription: "Dignified, compassionate support for patients and families facing serious illness.",
    longDescription: "Our palliative care service focuses on providing relief from the symptoms, pain, and stress of a serious illness. Our goal is to improve quality of life for both the patient and the family. We offer compassionate, dignified care that respects the wishes of the patient.",
    icon: Heart,
    priceFrom: null,
    benefits: [
      "Pain and symptom management",
      "Emotional and psychological support for the patient and family",
      "Assistance with daily living activities",
    ],
    whatToExpect: [
      { title: "Family Consultation", description: "We sit down with the family and the patient to understand their wishes, needs, and current medical status." },
      { title: "Holistic Care Delivery", description: "Our trained caregivers and nurses provide physical, emotional, and practical support daily." },
      { title: "Continuous Adjustment", description: "As the condition evolves, we adjust the level of care and pain management accordingly." },
    ],
    faqs: [
      { question: "Is palliative care only for advanced illness?", answer: "No. Palliative care can be provided at any stage of a serious illness, often alongside curative treatments." },
      { question: "How quickly can care begin?", answer: "We understand the urgency and can usually arrange for care to begin within 12-24 hours of the initial consultation." },
    ],
  },
  {
    slug: "home-physiotherapy",
    name: "Home Physiotherapy",
    shortDescription: "In-home physiotherapy and rehabilitation by registered physiotherapists across Nairobi, Kenya.",
    longDescription: "Recovering from surgery, injury, or managing a physical disability is most successful in a familiar environment. Our registered physiotherapists provide in-home physiotherapy services across Nairobi — bringing the clinic to your living room with customized rehabilitation programs for post-surgical recovery, stroke rehab, orthopedic care, and chronic pain management.",
    icon: Dumbbell,
    priceFrom: null,
    benefits: [
      "Post-surgical rehabilitation (e.g., hip/knee joint replacements)",
      "Stroke recovery and neuro-physiotherapy at home",
      "Orthopedic rehab for fractures, ACL tears, and back pain",
      "Pain management techniques and progressive home exercise programs",
      "Fall prevention and balance training for the elderly",
    ],
    whatToExpect: [
      { title: "Physical Assessment", description: "The physiotherapist evaluates mobility, strength, and pain levels at your home." },
      { title: "Therapy Sessions", description: "Guided, hands-on sessions with portable clinical equipment delivered to your home." },
      { title: "Progress Tracking", description: "Regular updates on recovery milestones and adjustments to the exercise regimen, shared directly with your doctor." },
    ],
    faqs: [
      { question: "Do I need to buy equipment for home physiotherapy?", answer: "Our physiotherapists bring all essential portable equipment. For larger items like parallel bars or orthotics, we can assist via our medical equipment leasing service." },
      { question: "How soon can home physiotherapy start after surgery?", answer: "In most cases we can dispatch a licensed physiotherapist within 12–24 hours of discharge from hospital, helping you start rehabilitation immediately while still in the comfort of your home." },
      { question: "Do you provide home physiotherapy services outside Nairobi?", answer: "Our primary coverage area is Nairobi and surrounding counties. Contact us to confirm availability for your specific location." },
    ],
  },
  {
    slug: "wound-care",
    name: "Wound & Post-Surgical Care",
    shortDescription: "Professional dressing changes, wound monitoring, and post-op support.",
    longDescription: "Proper wound care is crucial for preventing infection and ensuring quick healing. Our certified wound care nurses are trained in the latest techniques for managing surgical wounds, pressure ulcers, and diabetic foot ulcers right in your home.",
    icon: Bandage,
    priceFrom: null,
    benefits: [
      "Infection prevention and monitoring",
      "Advanced dressing applications",
      "Suture and staple removal",
      "Education for family members on basic wound hygiene",
    ],
    whatToExpect: [
      { title: "Wound Evaluation", description: "Measuring the wound, checking for signs of infection, and assessing the healing stage." },
      { title: "Cleaning and Dressing", description: "Professional cleaning and application of appropriate sterile dressings." },
      { title: "Doctor Updates", description: "Sending progress photos and reports to the patient's primary surgeon or doctor." },
    ],
    faqs: [
      { question: "Do you provide the dressings?", answer: "We can provide the necessary medical supplies and bill them at cost, or use supplies prescribed and purchased by the patient." },
      { question: "How often will the nurse visit?", answer: "This depends entirely on the doctor's orders and the severity of the wound, ranging from daily to twice a week." },
    ],
  },
  {
    slug: "newborn-postnatal-care",
    name: "Newborn & Postnatal Care",
    shortDescription: "Expert night nurses and maternity caregivers for new mothers and newborns in the comfort of home.",
    longDescription: "Bringing a new baby home is joyful but can be overwhelming, especially at night. Our trained maternity nurses and night nurses provide essential postnatal support for both the newborn and the mother — including overnight newborn monitoring, breastfeeding coaching, and postpartum recovery care — ensuring a smooth, well-rested transition during those crucial first weeks.",
    icon: Baby,
    priceFrom: null,
    benefits: [
      "Dedicated night nurse for overnight newborn monitoring and feeding support",
      "Breastfeeding coaching and bottle-feeding assistance",
      "Newborn hygiene, bathing, and umbilical cord care",
      "Monitoring mother's post-delivery recovery and vital signs",
      "Allowing parents to get essential restorative sleep",
    ],
    whatToExpect: [
      { title: "Introduction", description: "The night nurse or caregiver meets the family to understand routines and specific needs." },
      { title: "Overnight Support", description: "Hands-on help with baby care through the night, ensuring parents can rest." },
      { title: "Guidance", description: "Gentle coaching on sleep routines, settling techniques, and reading newborn cues." },
    ],
    faqs: [
      { question: "Can we hire a night nurse in Kenya for overnight baby care?", answer: "Absolutely. Night nurses are one of our most in-demand services in Nairobi, allowing parents to sleep while a licensed nurse monitors and cares for the baby overnight." },
      { question: "Are your caregivers trained in infant CPR?", answer: "Yes, all our pediatric and maternity caregivers are certified in basic life support and infant CPR." },
      { question: "How quickly can you arrange a night nurse in Nairobi?", answer: "In most cases we can match a vetted, experienced night nurse within 12–24 hours of your request." },
    ],
  },
  {
    slug: "telemedicine",
    name: "Telemedicine Consultation",
    shortDescription: "Secure video consultations with our clinical team — from anywhere in the world.",
    longDescription: "Skip the waiting room. Our telemedicine service connects you or your loved ones with qualified doctors and specialists via secure video call. It's ideal for follow-ups, minor ailments, or consultations for diaspora families managing care from afar.",
    icon: Video,
    priceFrom: null,
    benefits: [
      "No travel time or waiting rooms",
      "Ability for overseas family members to join the call",
      "E-prescriptions sent directly to your local pharmacy",
      "Quick access to medical advice",
    ],
    whatToExpect: [
      { title: "Booking", description: "Schedule a time that works for you through our platform or WhatsApp." },
      { title: "Consultation", description: "A secure link is sent for a video call with a licensed medical practitioner." },
      { title: "Follow-up", description: "Receive a digital summary of the visit and any necessary prescriptions or referrals." },
    ],
    faqs: [
      { question: "What if I need a physical exam?", answer: "If the doctor determines a physical exam is necessary, we can dispatch a nurse to your home or refer you to a clinic." },
      { question: "Is my data secure?", answer: "Yes, our telemedicine platform complies with all data privacy and healthcare confidentiality regulations." },
    ],
  },
  {
    slug: "nutrition-consultation",
    name: "Nutrition Consultation",
    shortDescription: "Personalised dietary guidance for recovery, chronic illness, or healthy ageing.",
    longDescription: "Good health starts with good nutrition. Our clinical nutritionists provide tailored dietary plans to help manage chronic illnesses like diabetes, aid in post-operative recovery, or ensure the elderly are receiving adequate nourishment.",
    icon: Apple,
    priceFrom: null,
    benefits: [
      "Custom meal plans based on medical needs and local Kenyan ingredients",
      "Weight management and nutritional deficiency correction",
      "Ongoing monitoring of nutritional status",
    ],
    whatToExpect: [
      { title: "Dietary Assessment", description: "Review of current eating habits, medical conditions, and nutritional goals." },
      { title: "Plan Creation", description: "Developing a practical, culturally appropriate meal plan." },
      { title: "Consultation & Review", description: "Regular follow-ups to track nutritional milestones and adjust meal plans." },
    ],
    faqs: [
      { question: "Are the meal plans expensive to maintain?", answer: "Our nutritionists focus on accessible, affordable local foods that meet nutritional requirements without breaking the bank." },
      { question: "Can consultations be done online?", answer: "Yes, nutrition consultations can be done either in-person at your home or via telemedicine." },
    ],
  },
  {
    slug: "equipment-leasing",
    name: "Medical Shop & Equipment Leasing",
    shortDescription: "Rent or buy hospital beds, oxygen concentrators, wheelchairs, and medical supplies delivered to your home in Nairobi.",
    longDescription: "Need a hospital bed for home use in Kenya? Transforming your home into a safe care environment requires specialized equipment. We sell and lease high-quality, fully sanitized hospital-grade medical equipment across Nairobi — with professional delivery, installation, and demonstration included. Choose to rent for your recovery period or purchase outright.",
    icon: Wrench,
    priceFrom: null,
    benefits: [
      "Hospital bed hire in Kenya — electric and manual options available",
      "Buy outright or lease on flexible plans based on your care timeline",
      "Same-day or next-day delivery and installation in Nairobi",
      "Regular maintenance and sanitization for all leased items",
      "Thoroughly quality-checked and hospital-grade certified items",
    ],
    whatToExpect: [
      { title: "Requirement Analysis", description: "We help you determine exactly what equipment or supplies are needed based on your doctor's recommendation." },
      { title: "Delivery & Setup", description: "Our team delivers products to your home in Nairobi and sets up the equipment safely." },
      { title: "Support & Maintenance", description: "Continuous maintenance support for all leased items throughout your rental period." },
    ],
    faqs: [
      { question: "Can I hire a hospital bed for home use in Nairobi?", answer: "Yes! We offer hospital bed rental in Nairobi for both short and long-term use. We stock manual hospital beds, electric adjustable beds, and pressure-relief mattresses with fast delivery." },
      { question: "What medical equipment is available to rent or buy?", answer: "We stock electric and manual hospital beds, oxygen concentrators, wheelchairs, suction machines, patient hoists, crutches, pressure-relief mattresses, pharmaceuticals, and diagnostics." },
      { question: "Can I buy equipment outright instead of leasing?", answer: "Yes! Our shop offers both direct purchase and leasing options. Items available for purchase show clear prices, while leasing items allow you to request a quote." },
    ],
  },
];
