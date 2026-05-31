// ---------------------------------------------------------------------------
// Success Engineering — editable content
// ---------------------------------------------------------------------------
// Everything the marketing/content team is likely to change lives here.
// Update text, dates, speakers, links etc. without touching the page layout.
// ---------------------------------------------------------------------------

export const event = {
  presenter: "Presented by Gita Unlocked",
  title: "Success Engineering",
  tagline: "Building the Human Edge in the Age of AI",
  description:
    "A 3-Part Live Interactive Series with IIT Alumni, Industry Leaders and Global Technology Professionals.",
  date: "5 June 2026 · Saturday",
  venue: "Live on Zoom",
  venueNote: "Link shared after registration",
  pricing: "Free for IIT / NIT Students",
  currency: "₹",
  basePrice: 500, // shown as the struck-off total once a valid code is applied
  couponCode: "IITK26_SE", // featured code displayed on the page
};

// Access codes that unlock free registration.
// Add more codes here later (e.g. per-college codes) — any match unlocks FREE.
export const validCoupons = ["IITK26_SE"];

// SECTION 4 — Speakers ------------------------------------------------------
// `photo` can be a path under /public (e.g. "/speakers/name.jpg") or a full URL.
// Leave `photo` empty ("") to fall back to a clean gold monogram avatar.
export const speakers = [
  {
    name: "Mr. Niranjan Pendarkhar",
    designation: "Architect",
    company: "Google",
    photo: "/speakers/niranjan.jpg",
  },
  {
    name: "Mr. Gaurav Rai",
    designation: "Senior Product Manager",
    company: "Microsoft Copilot",
    photo: "/speakers/gaurav.jpg",
  },
  {
    name: "Mr. Sandeep",
    designation: "JEE Advanced AIR 10 · IIT Bombay",
    company: "Rubrix",
    photo: "/speakers/sandeep.jpg",
  },
  {
    name: "Mr. Prashant",
    designation: "AI Scientist · IIT Hyderabad",
    company: "Bosch Research",
    photo: "/speakers/prashant.jpg",
  },
];

// SECTION 3 — Why this series ----------------------------------------------
export const whyCards = [
  {
    title: "AI is changing everything",
    body: "The rules of work, learning and value creation are being rewritten. Standing still is the only real risk.",
    icon: "chip",
  },
  {
    title: "Career success alone is not enough",
    body: "Titles and packages fade fast. Lasting fulfilment comes from clarity, purpose and direction.",
    icon: "trophy",
  },
  {
    title: "Human skills are becoming more valuable",
    body: "As machines automate the routine, judgement, creativity and emotional depth become your edge.",
    icon: "spark",
  },
  {
    title: "Understand both technology and yourself",
    body: "The future belongs to those who can pair cutting-edge tools with deep self-awareness.",
    icon: "compass",
  },
];

// SECTION 5 — What you will gain -------------------------------------------
export const gains = [
  "Internship & Placement Insights",
  "AI-Era Skills & Opportunities",
  "High Performance Mindset",
  "Networking with Alumni",
  "Human Potential Frameworks",
  "Leadership Development",
  "Certificate of Participation",
  "Prizes & Quizzes",
  "Sponsored Guided Leadership Camp",
];

// SECTION 6 — Program journey ----------------------------------------------
export const journey = [
  {
    kind: "session",
    label: "Session 1",
    title: "Success Beyond Skills",
    tags: ["AI", "Careers", "Future Opportunities", "Human Intelligence"],
  },
  {
    kind: "session",
    label: "Session 2",
    title: "The Science of Human Potential",
    tags: ["IQ", "EQ", "SQ", "Consciousness", "Decision Making"],
  },
  {
    kind: "session",
    label: "Session 3",
    title: "The Human Edge",
    tags: ["Purpose", "Identity", "Meaning", "Self Discovery"],
  },
  {
    kind: "milestone",
    label: "Outcome",
    title: "Human Potential Assessment Report",
    tags: [],
  },
  {
    kind: "milestone",
    label: "Next",
    title: "Discover Yourself Series",
    tags: [],
  },
];

// Meet Our Team ------------------------------------------------------------
export const team = [
  { name: "Kandula Srinivas", detail: "IIT BHU", photo: "/Srinivas_Pr.jpg" },
  { name: "Chandra Mohan", detail: "IIT Madras", photo: "/Chandra_Mohan_Pr.jpg" },
  { name: "Deepak Kumar", detail: "IIT Dhanbad", photo: "/Deepak.jpg" },
  { name: "Sankalp Dwivedi", detail: "IIT Delhi", photo: "/Sankalp_D_Pr_2.png" },
  { name: "Aman Tiwari", detail: "IIT BHU", photo: "/Aman_T_Pr.jpg" },
  { name: "Sri Ram", detail: "IIT Kharagpur", photo: "/Lakshman.jpg" },
];

// SECTION 8 — Testimonials (placeholders, future-ready) ---------------------
export const testimonials = [
  {
    quote:
      "Your space is reserved for the first cohort. Real student stories will appear here soon.",
    name: "Future Participant",
    detail: "IIT · 2026",
  },
  {
    quote:
      "We are gathering feedback from our pilot sessions. Be one of the first to share yours.",
    name: "Future Participant",
    detail: "NIT · 2026",
  },
  {
    quote:
      "This is your seat. Register, attend, and your reflection could feature right here.",
    name: "Future Participant",
    detail: "Premier College · 2026",
  },
];

// SECTION 9 — FAQ -----------------------------------------------------------
export const faqs = [
  {
    q: "Who can join?",
    a: "Students of IITs, NITs and other premier institutes who want to build a real edge for the AI era. Motivated learners from all backgrounds are welcome.",
  },
  {
    q: "Is it free?",
    a: "Yes. The full 3-part series is free for IIT / NIT students (a ₹500 value) when you register with the access code.",
  },
  {
    q: "Do I need AI knowledge?",
    a: "Not at all. The series is designed to be accessible whether you are an AI beginner or already building with it.",
  },
  {
    q: "Will certificates be provided?",
    a: "Yes. Participants receive a Certificate of Participation, along with access to prizes, quizzes and the assessment report.",
  },
  {
    q: "How will Zoom links be shared?",
    a: "After you register, the Zoom joining link and reminders are sent directly to your email and WhatsApp number.",
  },
];

// SECTION 10 — Contact ------------------------------------------------------
export const contact = {
  email: "gitaunlocked@gmail.com",
  phone: "+91 81256 30802",
  whatsapp: "https://whatsapp.com/channel/0029Vb9c7bB7IUYSUbEyJx3X",
  instagram: "https://www.instagram.com/gitaunlocked",
  youtube: "https://www.youtube.com/@GitaUnlocked-w8n",
};

// Registration form — college year options
export const yearOptions = [
  "1st Year",
  "2nd Year",
  "3rd Year",
  "4th Year",
  "5th Year",
  "Postgraduate",
  "Other",
];
