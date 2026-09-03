// ---------------------------------------------------------------------------
// Success Engineering — editable content
// ---------------------------------------------------------------------------
// Everything the marketing/content team is likely to change lives here.
// Update text, dates, speakers, links etc. without touching the page layout.
// ---------------------------------------------------------------------------

import { WHATSAPP_GROUP_URL } from "./whatsapp.js";

export const event = {
  presenter: "Presented by Gita Unlocked",
  title: "Success Engineering",
  tagline: "Making the Most of Your Engineering Journey",
  description:
    "A 2-part live, interactive podcast series with IIT alumni, industry leaders and global technology professionals.",
  date: "5 & 6 September 2026",
  days: "Saturday & Sunday",
  dateLong: "5 & 6 September 2026 · Saturday & Sunday",
  venue: "Live on Zoom",
  venueNote: "Link shared after registration",
  pricing: "Free for students of partner institutions",
  currency: "₹",
  basePrice: 500, // shown as the struck-off total once a valid code is applied
};

// Hero edition badge — shown as a small pill beside the "Interactive Podcast
// Series" tag. Edit when the edition changes.
export const sessionEdition = {
  badgeText: "Exclusive Engineering Edition",
};

// The three-part promise carried across the poster and the hero.
// Rendered as a slim strip above the H1, then expanded into the pillars below.
export const motto = ["Think Deeper", "Perform Better", "Build Your Future"];

// The premise of this edition — the paragraph that frames why the series
// exists right now. Shown in the band directly under the hero.
export const premise =
  "In an era of rapid AI and technological change, learn best practices, make smarter choices, build the right mindset and skills, and unlock your unique potential for a meaningful future.";

// Phrases inside `premise` that get painted in the brand gradient. Each must
// appear verbatim in the paragraph above; anything that doesn't match is
// quietly ignored, so editing the prose can never break the sentence.
export const premiseHighlights = [
  "best practices",
  "smarter choices",
  "right mindset and skills",
  "unlock your unique potential",
];

// "What's New" — short intro paragraph shown under the section title.
export const whatsNewIntro =
  "Following the overwhelming response received from students across premier engineering institutions during our past editions, Success Engineering returns with updated discussions, new speakers and enhanced learning experiences.";

// "What's New" — icon cards under the intro.
// `icon` maps to an inline SVG defined in Landing.vue.
export const whatsNewCards = [
  { icon: "mic", title: "Two Focused Podcasts, One Continuous Journey" },
  { icon: "briefcase", title: "Career Insights From Industry Leaders" },
  { icon: "clipboard", title: "New Success Potential Assessment" },
  { icon: "users", title: "A Wider Alumni & Professional Network" },
];

// "Success Engineering So Far" — animated statistics rendered under Speakers.
// Numeric `value` items count up from 0 when the section enters the viewport;
// text-only items (e.g. "Growing") render as-is with a fade-up.
export const seFarStats = [
  { value: 23, suffix: "+", label: "Premier Institutions Reached" },
  { value: 1900, suffix: "+", label: "Students Engaged" },
  { value: 45, suffix: "+", label: "Industry Leaders & IIT Alumni" },
  { value: 1200, suffix: "+", label: "Success Potential Assessments" },
  { text: "Growing", label: "Student Community Across India" },
];

// Per-college access codes that unlock free registration.
// The applied code identifies the student's college, which is used to
// personalise the confirmation email. Add new colleges/codes here.
//
// NOTE: server/utils/registration-emails.js keeps its own copy of this map
// (the server bundle can't reach across directories). Add codes to both.
export const couponColleges = {
  // IITs
  IITB26_SE: "IIT Bombay",
  IITD26_SE: "IIT Delhi",
  IITK26_SE: "IIT Kanpur",
  IITG26_SE: "IIT Guwahati",
  IITPKD26_SE: "IIT Palakkad",
  IITBHU26_SE: "IIT BHU",
  IITBH26_SE: "IIT Bhilai",
  IITJMU26_SE: "IIT Jammu",
  // Superseded by IITJMU26_SE but kept valid: it was advertised in the earlier
  // outreach email, so students working from that copy aren't turned away.
  IITJ26_SE: "IIT Jammu",
  // NITs
  NITT26_SE: "NIT Trichy",
  NITC26_SE: "NIT Calicut",
  NITA26_SE: "NIT Agartala",
  NITS26_SE: "NIT Silchar",
  // Other institutions
  CU26_SE: "Chandigarh University",
  RGIPT26_SE: "RGIPT",
  SNU26_SE: "Shiv Nadar University",
  GLBITM26_SE: "GL Bajaj Institute of Technology & Management",
};

// Any of these codes unlocks FREE registration.
export const validCoupons = Object.keys(couponColleges);

// Hero countdown, ticking down to the first podcast.
//
// `startsAt` needs a time and an offset, not just a date: without them the
// browser assumes UTC and the counter reads five and a half hours out for
// everyone in India. The start time isn't published on the page — it's only
// here to make the countdown land on the right moment.
export const countdown = {
  startsAt: "2026-09-05T15:00:00+05:30",
  label: "Podcast 01 begins in",
  liveLabel: "The series is live",
  liveNote: "Podcast 01 is under way — register to join the next one.",
};

// SECTION — Speakers --------------------------------------------------------
// `photo` can be a path under /public (e.g. "/speakers/name.jpg") or a full URL.
// Leave `photo` empty ("") to fall back to a clean monogram avatar.
// `companyLogo` is optional — the pill renders the name on its own without one.
// Marks live in /public/logos and want a transparent background: the pill is
// white and lifts to a subtle tint on hover, so anything with its own baked-in
// backdrop shows up as a visible rectangle.
// `designation2` is an optional secondary credential shown under the role.
export const speakers = [
  {
    name: "Mr. Niranjan Pendharkar",
    designation: "Senior AI Leader, Google",
    designation2: "80+ US Patents",
    company: "Google",
    companyLogo: "/logos/google.png",
    photo: "/speakers/niranjan-pendharkar.jpg",
  },
  {
    name: "Mr. Vaibhav Joshi",
    designation: "AI Operations Specialist, GlobalLogic",
    designation2: "MBA, IESEG Paris",
    company: "GlobalLogic",
    companyLogo: "/logos/globallogic.svg",
    photo: "/speakers/vaibhav-joshi.jpg",
  },
  {
    name: "Mr. Indraneel Natu",
    designation: "PhD, IIM Bengaluru",
    designation2: "B.Tech, IIT BHU",
    company: "IIM Bengaluru",
    companyLogo: "/logos/iimb.png",
    photo: "/speakers/indraneel-natu.jpg",
  },
  {
    name: "Mr. Aman Tiwari",
    designation: "AI Engineer, NVIDIA",
    designation2: "B.Tech, IIT BHU",
    company: "NVIDIA",
    companyLogo: "/logos/nvidia.png",
    // Shot arrived portrait; padded to square with white so the circular
    // crop doesn't clip the top of his head.
    photo: "/speakers/aman-tiwari.jpg",
  },
];

// SECTION — Why this series -------------------------------------------------
export const whyCards = [
  {
    title: "These Four Years Compound",
    body: "The subjects you take seriously, the people you build with and the risks you take now quietly set the range of everything that follows.",
    icon: "route",
  },
  {
    title: "Technology Outruns the Syllabus",
    body: "What industry is building today reaches a curriculum years later. Practitioners are the shortest path to an honest signal.",
    icon: "chip",
  },
  {
    title: "Smarter Choices, Not Just Harder Work",
    body: "Effort is abundant in engineering colleges. Direction is what's scarce — and direction is what actually changes outcomes.",
    icon: "compass",
  },
  {
    title: "Mindset Is the Multiplier",
    body: "Skills get you the interview. How you think, decide and recover is what carries you through the decade after it.",
    icon: "spark",
  },
];

// SECTION — What you will gain ---------------------------------------------
export const gains = [
  { icon: "rocket", title: "Career Insights from Industry Leaders", highlight: true },
  { icon: "users", title: "Networking with IIT Alumni & Professionals", highlight: true },
  { icon: "certificate", title: "Certificate Opportunities", highlight: true },
  { icon: "trophy", title: "Exciting Prizes & Quizzes" },
  { icon: "trip", title: "Sponsored Trip Opportunities" },
  { icon: "frameworks", title: "Success Potential Assessment" },
];

// SECTION — Program journey ------------------------------------------------
//
// Kept under the name `journey` because server/utils/registration-emails.js
// reads this export (filtering on `kind === "session"`) to build the line-up
// printed in every confirmation email. Renaming it silently changes that email.
export const journey = [
  {
    kind: "session",
    icon: "mic",
    label: "Podcast 01",
    title: "The Engineering Landscape",
    date: "5 September 2026 · Saturday",
    topic: "Technology, Careers & New Perspectives",
  },
  {
    kind: "session",
    icon: "mic",
    label: "Podcast 02",
    title: "Building Your Advantage",
    date: "6 September 2026 · Sunday",
    topic: "Mindset, Choices & Growth for the Journey Ahead",
  },
  {
    kind: "milestone",
    icon: "target",
    label: "Outcome",
    title: "Success Potential Assessment",
    date: "",
    topic: "Discover your strengths, direction & opportunities for growth.",
  },
];

// Meet Our Team ------------------------------------------------------------
// Six members render as a clean 3 × 2 grid on desktop (lg:grid-cols-3).
export const team = [
  { name: "Shantanu Tiwari", detail: "IIT Guwahati", photo: "/team/shantanu.png" },
  { name: "Tushar Maini", detail: "IIT Roorkee", photo: "/team/tushar.png" },
  { name: "Mourya Sai Sandeep Yanamadala", detail: "IIT Madras", photo: "/team/mourya.png" },
  { name: "Shashanka Mouli", detail: "IIT Delhi", photo: "/team/shashanka.png" },
  { name: "Koduri Chaitanya", detail: "IIT BHU", photo: "/team/chaitanya.png" },
  { name: "Adarsh C", detail: "IIM Bengaluru", photo: "/team/adarsh.png" },
];

// SECTION — FAQ -----------------------------------------------------------
export const faqs = [
  {
    q: "Who is this series for?",
    a: "Students of IITs, NITs and other premier institutes — first year to final year, and every branch. If you're trying to work out how to make your engineering years actually count, this was built for you.",
  },
  {
    q: "Is it only for CS branch students?",
    a: "No. Success Engineering is open to students from every branch and discipline. Both podcasts are built to be followed by a complete beginner and still be worth the time of someone already building.",
  },
  {
    q: "Do I need any AI or technical background?",
    a: "Not at all. We talk about technology and AI in terms of the choices in front of you, not in jargon. Nothing is assumed beyond curiosity.",
  },
  {
    q: "When exactly are the two podcasts?",
    a: "Saturday 5 September and Sunday 6 September 2026, live on Zoom. The joining link and exact timings are sent to your email and shared in our WhatsApp group once you register.",
  },
  {
    q: "Do I have to attend both?",
    a: "They're designed to build on each other, so attending both gets you far more. If you can only make one, you're still very welcome.",
  },
  {
    q: "What is the Success Potential Assessment?",
    a: "A short interactive assessment that follows the podcasts and gives you a personal read on your strengths, your direction and the areas with the most room to grow.",
  },
  {
    q: "Is it really free?",
    a: "Yes. Access is sponsored for students of our partner institutions — the access code shared with your campus unlocks registration at no cost.",
  },
  {
    q: "How will the Zoom link reach me?",
    a: "By email to the address you register with, and in our WhatsApp group. Please join the group after registering, as that's where every reminder and link is posted.",
  },
];

// Shown on the post-registration success/duplicate screens and in the
// confirmation email. Defined in data/whatsapp.js and re-exported here so the
// existing importers keep working off the shared definition.
export { WHATSAPP_GROUP_URL };

// SECTION — Contact -------------------------------------------------------
export const contact = {
  email: "gitaunlocked@gmail.com",
  phone: "+91 81256 30802",
  whatsapp: WHATSAPP_GROUP_URL,
  instagram: "https://www.instagram.com/gitaunlocked",
  youtube: "https://www.youtube.com/@GitaUnlocked-w8n",
};

// People a student can reach directly, shown in the Contact section.
// `phone` is displayed as written; the tel: link strips the spaces.
export const contactPeople = [
  {
    name: "Mr. Anurag Pindiproli",
    role: "AI Engineer, Cisco",
    detail: "Alumnus, IIIT Lucknow",
    phone: "+91 93475 09554",
    email: "anuanura@cisco.com",
  },
  {
    name: "Mr. Animesh Dhara",
    role: "Embedded SW Engineer, Texas Instruments",
    detail: "Alumnus, Jadavpur University",
    phone: "+91 62978 62916",
    email: "a-dhara@ti.com",
  },
  {
    name: "Mr. Srinivas Kandula",
    role: "PD Engineer, Texas Instruments",
    detail: "Alumnus, IIT BHU",
    phone: "+91 81256 30802",
    email: "s-kandula@ti.com",
  },
];

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
