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
  date: "9 August 2026 · Sunday",
  venue: "Live on Zoom",
  venueNote: "Link shared after registration",
  pricing: "Free for IIT / NIT Students",
  currency: "₹",
  basePrice: 500, // shown as the struck-off total once a valid code is applied
  couponCode: "IITK26_SE", // featured code displayed on the page
};

// Hero edition badge — shown as a small pill above the H1.
// Edit `badgeText` when the session/edition changes.
export const sessionEdition = {
  badgeText: "Academic Session 2026 Edition",
};

// "What's New" — short intro paragraph shown under the section title.
// Preserves the "we're back, evolved" narrative from the earlier Returning
// banner in a single, focused block.
export const whatsNewIntro =
  "Following the overwhelming response received from students across premier engineering institutions during our Summer edition, Success Engineering returns with updated discussions, new speakers and enhanced learning experiences.";

// "What's New" — icon cards under the intro.
// `icon` maps to an inline SVG defined in Landing.vue.
export const whatsNewCards = [
  { icon: "ai", title: "Updated Discussions on AI, Careers & the Future" },
  { icon: "briefcase", title: "Startup, Research & Industry Exposure Opportunities" },
  { icon: "mic", title: "New Industry Leaders & IIT Alumni Speakers" },
  { icon: "clipboard", title: "Refined Interactive Assessments" },
  { icon: "users", title: "Enhanced Networking & Student Community" },
];

// "Success Engineering So Far" — animated statistics rendered under Speakers.
// Numeric `value` items count up from 0 when the section enters the viewport;
// text-only items (e.g. "Hundreds", "Growing") render as-is with a fade-up.
export const seFarStats = [
  { value: 20, suffix: "+", label: "Premier Institutions Reached" },
  { value: 1800, suffix: "+", label: "Students Engaged" },
  { value: 40, suffix: "+", label: "Industry Leaders & IIT Alumni" },
  { text: "Hundreds", label: "Human Potential Assessments Completed" },
  { text: "Growing", label: "Student Community Across India" },
];

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
  CU26_SE: "Chandigarh University",
  RGIPT26_SE: "RGIPT",
};

// Any of these codes unlocks FREE registration.
export const validCoupons = Object.keys(couponColleges);

// SECTION 4 — Speakers ------------------------------------------------------
// `photo` can be a path under /public (e.g. "/speakers/name.jpg") or a full URL.
// Leave `photo` empty ("") to fall back to a clean monogram avatar.
// `companyLogo` is optional — the company pill renders the name alone without it.
// `designation2` is an optional secondary credential shown under the role.
//
// NOTE: `bio`, `tags` and `linkedin` are currently unused — the speaker cards
// are front-only (the flip-to-bio back face was removed). They're retained so
// the back face can be reinstated without re-sourcing the copy.
export const speakers = [
  {
    name: "Mr. Sriraj Chellapan",
    designation: "Senior Manager, AI Chip Design",
    company: "Texas Instruments",
    companyLogo: "/logos/texasinstruments.svg",
    photo: "/speakers/sriraj.png",
    bio: "",
    tags: [],
    linkedin: "",
  },
  {
    name: "Mr. Gaurav Rai",
    designation: "Senior Manager, AI Copilot Security",
    company: "Microsoft",
    companyLogo: "/logos/microsoft.svg",
    photo: "/speakers/gaurav.png",
    bio: "20+ years in cybersecurity, now leading AI security at Microsoft — Copilot, MCP security, Responsible AI and privacy. BITS Pilani.",
    tags: ["Microsoft", "AI Copilot", "AI Security", "BITS Pilani"],
    linkedin: "https://www.linkedin.com/in/gauravsecurity/",
  },
  {
    name: "Mr. Samyak Jain",
    designation: "AI Research PhD at UC Berkeley",
    company: "UC Berkeley",
    companyLogo: "/logos/ucberkeley.png",
    photo: "/speakers/samyak.png",
    bio: "Research Fellow at Microsoft Research and incoming CS PhD at UC Berkeley. Work spans AI safety, mechanistic interpretability, and adversarial robustness. IIT BHU CSE (9.60 CPI).",
    tags: ["Microsoft Research", "AI Safety", "UC Berkeley", "IIT BHU"],
    linkedin: "https://www.linkedin.com/in/samyak-jain-276738178/",
  },
  {
    name: "Mr. Anurag Pindiproli",
    designation: "AI Defense Engineer, Cisco",
    designation2: "Amazon AI — ML School",
    company: "Cisco",
    companyLogo: "/logos/cisco.png",
    photo: "/speakers/anurag.png",
    bio: "",
    tags: [],
    linkedin: "",
  },
  {
    name: "Mr. Akhilender Bongirwar",
    designation: "AI Engineer, Adobe",
    company: "Adobe",
    companyLogo: "/logos/adobe.png",
    photo: "/speakers/akhilender.png",
    bio: "",
    tags: [],
    linkedin: "",
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
  { icon: "trophy", title: "Exciting Prizes & Quizzes", highlight: true },
  { icon: "trip", title: "Sponsored Trip Opportunities", highlight: true },
  { icon: "certificate", title: "Certificate of Participation", highlight: true },
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
    date: "9 August 2026 · Sunday",
    topic: "AI, Careers & Building Your Future",
  },
  {
    kind: "session",
    label: "Session 2",
    title: "The Missing Dimension",
    date: "14 August 2026 · Saturday",
    topic: "Exploring the Dimensions of Human Potential",
  },
  {
    kind: "session",
    label: "Session 3",
    title: "The Human Edge",
    date: "15 August 2026 · Sunday",
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
// Six members render as a clean 3 × 2 grid on desktop (lg:grid-cols-3).
// `role` is optional and currently unused — every member shows just their
// name and institute badge, which keeps the row heights uniform.
export const team = [
  { name: "Shantanu Tiwari", detail: "IIT Guwahati", photo: "/team/shantanu.png" },
  { name: "Tushar Maini", detail: "IIT Roorkee", photo: "/team/tushar.png" },
  { name: "Mourya Sai Sandeep Yanamadala", detail: "IIT Madras", photo: "/team/mourya.png" },
  { name: "Shashanka Mouli", detail: "IIT Delhi", photo: "/team/shashanka.png" },
  { name: "Koduri Chaitanya", detail: "IIT BHU", photo: "/team/chaitanya.png" },
  { name: "Adarsh C", detail: "IIM Bengaluru", photo: "/team/adarsh.png" },
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

// Registration form — course / degree the student is currently pursuing.
// Kept separate from `branch` (which captures the discipline, e.g. "Computer Science").
export const courseOptions = [
  "B.Tech",
  "M.Tech",
  "Dual Degree (B.Tech + M.Tech)",
  "B.Sc",
  "M.Sc",
  "MBA",
  "PhD",
  "Other",
];

// Registration form — gender options.
export const genderOptions = ["Male", "Female", "Prefer not to say"];

// Official WhatsApp group invite for registered students.
// Shown on the post-registration success/duplicate screens and in the
// confirmation email, in addition to the broadcast-only WhatsApp channel.
export const WHATSAPP_GROUP_URL =
  "https://chat.whatsapp.com/J8GXxYlD1oEIN9dwOB2twf?s=sh&p=a&ilr=1&amv=3";
