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
  date: "7 June 2026 · Sunday",
  venue: "Live on Zoom",
  venueNote: "Link shared after registration",
  pricing: "Free for IIT / NIT Students",
  currency: "₹",
  basePrice: 500, // shown as the struck-off total once a valid code is applied
  couponCode: "IITK26_SE", // featured code displayed on the page
};

// Per-college access codes that unlock free registration.
// The applied code identifies the student's college, which is used to
// personalise the confirmation email. Add new colleges/codes here.
export const couponColleges = {
  IITK26_SE: "IIT Kanpur",
  IITBHU26_SE: "IIT BHU",
  IITPKD26_SE: "IIT Palakkad",
  IITBH26_SE: "IIT Bhilai",
  IITJ26_SE: "IIT Jammu",
  NITC26_SE: "NIT Calicut",
  NITA26_SE: "NIT Agartala",
};

// Any of these codes unlocks FREE registration.
export const validCoupons = Object.keys(couponColleges);

// SECTION 4 — Speakers ------------------------------------------------------
// `photo` can be a path under /public (e.g. "/speakers/name.jpg") or a full URL.
// Leave `photo` empty ("") to fall back to a clean gold monogram avatar.
export const speakers = [
  {
    name: "Mr. Gaurav Rai",
    designation: "AI Copilot Security · Microsoft",
    designation2: "Senior Architect at PayPal",
    company: "Microsoft",
    companyLogo: "/logos/microsoft.svg",
    photo: "/speakers/gaurav.png",
    bio: "20+ years in cybersecurity, now leading AI security at Microsoft — Copilot, MCP security, Responsible AI and privacy. Previously at PayPal, Blackstone, Teradata and AT&T. BITS Pilani.",
    tags: ["Microsoft", "AI Copilot", "AI Security", "BITS Pilani"],
    linkedin: "https://www.linkedin.com/in/gauravsecurity/",
  },
  {
    name: "Samyak Jain",
    designation: "AI Researcher · Mastercard",
    designation2: "PhD at UC Berkeley",
    company: "Mastercard",
    companyLogo: "/logos/mastercard.svg",
    photo: "/speakers/samyak.png",
    bio: "Research Fellow at Microsoft Research and incoming CS PhD at UC Berkeley. AI intern at Mastercard AI Garage; work spans AI safety, mechanistic interpretability, and adversarial robustness. IIT BHU CSE (9.60 CPI).",
    tags: ["Mastercard", "Microsoft Research", "AI Safety", "UC Berkeley", "IIT BHU"],
    linkedin: "https://www.linkedin.com/in/samyak-jain-276738178/",
  },
  {
    name: "Yashas",
    designation: "AI Lead · Texas Instruments",
    designation2: "AI, IIT Hyderabad",
    company: "Texas Instruments",
    companyLogo: "/logos/texasinstruments.svg",
    photo: "/speakers/yashas.png",
    bio: "Data Engineer at Texas Instruments and an AI graduate from IIT Hyderabad (9.36 CGPA). Research spans forecasting, model explainability and GAN-based video generation.",
    tags: ["Texas Instruments", "AI / ML", "IIT Hyderabad"],
    linkedin: "https://www.linkedin.com/in/yashas-tadikamalla-2b3908211/",
  },
  {
    name: "Vaibhav",
    designation: "AI & Business Operations · GlobalLogic",
    designation2: "MBA, IÉSEG",
    company: "GlobalLogic",
    companyLogo: "/logos/globallogic.svg",
    photo: "/speakers/vaibhav.png",
    bio: "Project Management Officer and Senior Business Analyst at GlobalLogic, focused on operational excellence and data-driven delivery. Ex–Maruti Suzuki (Supplier Quality Manager), Hello Tomorrow (Paris), and edtech founder. MBA from IÉSEG; Generative AI certified.",
    tags: ["GlobalLogic", "Generative AI", "Ex-Maruti Suzuki", "IÉSEG MBA"],
    linkedin: "https://www.linkedin.com/in/vaibhavjoshi108/",
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
  { icon: "certificate", title: "Certificate of Participation", highlight: true },
  { icon: "trophy", title: "Exciting Prizes & Quizzes", highlight: true },
  { icon: "trip", title: "Sponsored Guided Leadership Trip", highlight: true },
  { icon: "rocket", title: "Internship & Placement Insights" },
  { icon: "users", title: "Networking with IIT Alumni" },
  { icon: "spark", title: "High Performance Mindset" },
  { icon: "frameworks", title: "Human Potential Frameworks" },
  { icon: "leader", title: "Leadership Development" },
];

// SECTION 6 — Program journey ----------------------------------------------
export const journey = [
  {
    kind: "session",
    label: "Session 1",
    title: "The Success Code",
    date: "7 June 2026 · Sunday",
    topic: "AI, Careers & Building Your Future",
  },
  {
    kind: "session",
    label: "Session 2",
    title: "The Missing Dimension",
    date: "10 June 2026 · Wednesday",
    topic: "Human Potential Beyond IQ",
  },
  {
    kind: "session",
    label: "Session 3",
    title: "The Human Edge",
    date: "13 June 2026 · Saturday",
    topic: "What Makes Us Stand Out?",
  },
  {
    kind: "milestone",
    label: "Outcome",
    title: "Human Potential Assessment Report",
    date: "",
    topic: "",
  },
];

// Meet Our Team ------------------------------------------------------------
export const team = [
  { name: "Shantanu Tiwari", role: "Founder & CEO, Bright Studio", detail: "IIT Guwahati", photo: "/team/shantanu.png" },
  { name: "Avinash Ranjan", role: "Software Engineer at Microsoft", detail: "IIT BHU", photo: "/team/avinash.png" },
  { name: "Tushar Maini", role: "ASIC Engineer at Nvidia", detail: "IIT Roorkee 2025", photo: "/team/tushar.png" },
  { name: "Mourya Sai Sandeep Yanamadala", detail: "IIT Madras", photo: "/team/mourya.png" },
  { name: "Indraneel Natu", detail: "IIM Bangalore", photo: "/team/indraneel.png" },
  { name: "Chandra Mohan", detail: "IIT Madras", photo: "/Chandra_Mohan_Pr.jpg" },
  { name: "Deepak Kumar", detail: "IIT Dhanbad", photo: "/Deepak.jpg" },
  { name: "Sankalp Dwivedi", detail: "IIT Delhi", photo: "/Sankalp_D_Pr_2.png" },
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
    q: "Is it only for CS branch students?",
    a: "No. Success Engineering is open to students from every branch and discipline. The series is built for complete beginners as well as advanced learners — no prior background is required, just the curiosity to grow.",
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
