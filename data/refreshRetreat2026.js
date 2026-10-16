// ---------------------------------------------------------------------------
// Refresh Retreat 2026 — editable content (Gita Unlocked · Success Engineering)
// ---------------------------------------------------------------------------
// This page reuses the Heritage Walk's structure and content, with three
// differences:
//
//   1. Guruvayur is added as a circuit (third in the list) and is the one
//      NIT Calicut travels to.
//   2. The retreat-specific blocks — Retreat Details, What You'll Experience
//      and the pricing breakdown — are revealed only once NIT Calicut is
//      selected, because they describe that campus's retreat specifically.
//   3. Payment goes to Devendra Gurnani rather than the Heritage Walk account.
//
// Everything shared with the Heritage Walk is imported rather than copied, so
// editing a testimonial or a destination there updates both pages. The two
// exceptions are `destinations` and `team`, which are new arrays built from
// the Heritage Walk's — never mutations of them.
// ---------------------------------------------------------------------------

import {
  destinations as hwDestinations,
  collegeRegions as hwCollegeRegions,
  regionSpot as hwRegionSpot,
  team as hwTeam,
  eligibility as hwEligibility,
  inclusions as hwInclusions,
  testimonials as hwTestimonials,
  collegeOptions,
  genderOptions,
  moreDestinations as hwMoreDestinations,
} from "./heritageWalk.js";

export { collegeOptions, genderOptions };
export const testimonials = hwTestimonials;

// Same inclusions as the Heritage Walk, with the two labels that name the
// walk itself reworded for this page.
export const inclusions = hwInclusions.map((item) =>
  item.label === "Travel"
    ? { ...item, value: "Group travel to and from the destination" }
    : item,
);

export const brand = {
  presenter: "Success Engineering",
  ecosystem: "The Human Advantage Ecosystem",
  logo: "/logo2.png",
};

// The one fixed date on this page. Guruvayur runs on 1 November; the other
// circuits are still dated per campus, which is why only Guruvayur carries a
// `date` field below.
export const retreatDate = "1 November 2026";
export const retreatDay = "Sunday";

export const hero = {
  badge: "Invitation Only",
  title: "Refresh Retreat",
  subtitle: "Beyond the Classroom",
  tagline:
    "An exclusive journey for students shortlisted through The Human Advantage Ecosystem.",
  intro:
    "Five days of engineering lectures will teach you how the world works. One morning inside a thousand-year-old temple will teach you why it was built. The Refresh Retreat is the second half of that education.",
  primaryCta: "Register Now",
  secondaryCta: "See the Destinations",
  image: "/refresh-retreat/hero.jpg",
};

// Same shortlisting rules as the Heritage Walk; only the wording that names
// the walk is changed.
export const eligibility = {
  ...hwEligibility,
  title: "This retreat is invitation-only",
  body: "The Refresh Retreat is reserved exclusively for students shortlisted through The Human Advantage Ecosystem. Shortlisting is based on the application assessment you completed after the Success Engineering podcasts — not on marks, branch or year.",
  points: [
    "Open only to shortlisted Human Advantage Ecosystem applicants",
    "Your campus decides the destination you travel to",
    "Seats are limited and allotted in order of confirmation",
    "Travel, stay and guided access are organised end to end",
  ],
};

export const moreDestinations = {
  ...hwMoreDestinations,
  body: "Konark, Khajuraho, Madurai, Varanasi, Mahabalipuram, Bhubaneswar, Badami, Thanjavur and Leh are all on the map for the rounds ahead — the retreat is built to keep going long after this one.",
};

// SECTION — Destinations ----------------------------------------------------
// Guruvayur, inserted third. Everything else is the Heritage Walk's list, in
// its original order.
export const guruvayur = {
  id: "guruvayur",
  name: "Guruvayur",
  state: "Kerala",
  region: "kerala",
  tagline: "Bhuloka Vaikuntha",
  unesco: false,
  duration: "One Day",
  date: `${retreatDate} · ${retreatDay}`,
  photo: "/heritage-walk/places/guruvayur.jpg",
  photoAlt: "The tiered Kerala roofs and mural wall of the Guruvayur temple",
  // CC0 — no attribution required, unlike the other circuit photographs.
  credit: null,
  blurb:
    "Guruvayur has kept the same daily rhythm for longer than most countries have existed. The temple opens at three in the morning and moves tens of thousands of people through a single sanctum without anyone directing traffic. Next door at Punnathurkotta, a herd of elephants is cared for by families who have done it for generations. It is one day, and it is the oldest working system you will ever stand inside.",
  highlights: [
    "Darshan at the Guruvayur Sri Krishna temple",
    "Punnathurkotta — the elephant sanctuary at Anakotta",
    "A sadya, the traditional Kerala meal served on a banana leaf",
    "Interactive fun activities and memorable experiences",
  ],
  lens: "A thousand years of routine, still running without a manager.",
  accent: "#0F766E",
};

// The Heritage Walk's accents are ambers, reds and violets, which fight the
// blue-green theme here. Each place keeps a distinct colour, drawn from the
// cool family instead. Overridden per page, never mutated on the shared data.
const coolAccents = {
  jaipur: "#0369A1",
  hampi: "#0E7490",
  shillong: "#047857",
  rishikesh: "#1D4ED8",
  ayodhya: "#0891B2",
  tirupati: "#15803D",
};
const recolour = (d) => ({ ...d, accent: coolAccents[d.id] || d.accent });

export const destinations = [
  ...hwDestinations.slice(0, 2).map(recolour),
  guruvayur,
  ...hwDestinations.slice(2).map(recolour),
];

export const destinationById = Object.fromEntries(
  destinations.map((d) => [d.id, d]),
);

// SECTION — College → circuit ----------------------------------------------
// Identical to the Heritage Walk, except NIT Calicut, which travels to
// Guruvayur on this page. Overriding the one college rather than rewriting the
// whole table means new colleges added to the Heritage Walk map appear here too.
export const collegeRegions = {
  ...hwCollegeRegions,
  "NIT Calicut": "kerala",
};

export const regionSpot = { ...hwRegionSpot, kerala: "guruvayur" };

export const spotForCollege = (college) => {
  const region = collegeRegions[college];
  return region ? destinationById[regionSpot[region]] : null;
};

// Any college in the dropdown that would be allotted nothing. Checked against
// this page's own mapping, not the Heritage Walk's.
export const unmappedColleges = collegeOptions.filter((c) => !collegeRegions[c]);

// The college whose retreat this page is built around. Selecting it reveals
// the retreat detail, experience and pricing blocks.
export const featuredCollege = "NIT Calicut";

// SECTION — Retreat details (revealed for NIT Calicut) ----------------------
export const retreatDetails = [
  { icon: "calendar", label: "Date", value: `${retreatDate} (${retreatDay})` },
  { icon: "pin", label: "Destination", value: "Guruvayur, Kerala" },
  { icon: "users", label: "Eligibility", value: "NIT Calicut students" },
  { icon: "bus", label: "Transportation", value: "To & From Included" },
  { icon: "meal", label: "Meals", value: "Breakfast + Lunch + Snacks" },
  { icon: "bed", label: "Accommodation", value: "Included" },
];

export const experiences = [
  {
    emoji: "🤝",
    title: "Meet New Friends",
    body: "Bond with peers from your own campus and beyond over a shared, unforgettable day.",
  },
  {
    emoji: "🛕",
    title: "Visit Bhuloka Vaikuntha",
    body: "Experience Guruvayur — one of the most revered Krishna temples in India.",
  },
  {
    emoji: "🐘",
    title: "Explore the Elephant Sanctuary",
    body: "Meet the gentle giants at Punnathurkotta up close in their natural habitat.",
  },
  {
    emoji: "🍛",
    title: "Enjoy Authentic Kerala Food",
    body: "Sadya-style traditional meals served on banana leaves — a treat for the senses.",
  },
  {
    emoji: "💬",
    title: "Inspiring Spiritual Discussions",
    body: "Conversations rooted in the Bhagavad Gita, life design and finding your edge.",
  },
  {
    emoji: "✨",
    title: "Create Lifelong Memories",
    body: "A day of laughter, reflection and friendships that outlast the retreat itself.",
  },
];

export const pricing = {
  currency: "₹",
  breakdown: [
    { label: "Transportation (To & Fro)", amount: 500 },
    { label: "Accommodation", amount: 400 },
    { label: "Food", amount: 300 },
    { label: "Internal Transportation", amount: 100 },
  ],
  actualCost: 1300,
  studentContribution: 250,
};

// SECTION — Payment ---------------------------------------------------------
// `upiId` matches the handle encoded in the QR, so scanning and typing reach
// the same account.
export const payment = {
  currency: "₹",
  amount: pricing.studentContribution,
  fullCost: pricing.actualCost,
  note: "You are not paying less for a smaller trip. You are paying less because someone who walked out of your own campus decided you should go.",
  upiId: "devendragurnani07@okhdfcbank",
  accountName: "Devendra Gurnani",
  bank: "HDFC Bank",
  qrImage: "/refresh-retreat/upi-qr-square.png",
};

// SECTION — How it works ----------------------------------------------------
export const steps = [
  {
    n: "01",
    title: "Get shortlisted",
    body: "Complete the Human Advantage Ecosystem application, attend all the sessions and be interactive with the seniors. Shortlisted students are notified by email and WhatsApp.",
  },
  {
    n: "02",
    title: "Register and confirm",
    body: "Fill in your details below. Your campus decides your destination automatically — you will see it the moment you pick your college.",
  },
  {
    n: "03",
    title: "Reserve your seat",
    body: "Pay the contribution by UPI and upload the transaction screenshot. Our team verifies every payment by hand.",
  },
  {
    n: "04",
    title: "Travel",
    body: "You receive the reporting point, timings, packing list and group details once your seat is confirmed.",
  },
];

// SECTION — Consent ---------------------------------------------------------
export const consent = {
  label: "I have read and agree to the participation terms above.",
  points: [
    "I confirm I have been shortlisted through The Human Advantage Ecosystem and that the details I have entered are my own and accurate.",
    "I understand my destination is allotted by my campus and cannot be exchanged for another.",
    "I understand my seat is confirmed only after Success Engineering verifies my payment, and that submitting this form alone does not reserve a place.",
    "I take responsibility for my own health, conduct and belongings through the journey, and will follow the instructions of the organising team and all site rules.",
    "I consent to my details being stored and used by Success Engineering to organise this journey and to contact me about it.",
  ],
};

// SECTION — Team ------------------------------------------------------------
// The Heritage Walk team, plus the three organisers running this retreat.
// Photo paths are the ones the rest of the site already uses for these people:
// `/speakers/indraneel-natu.jpg` rather than the unrelated `/team/indraneel.png`,
// which shows someone else entirely.
export const team = [
  ...hwTeam,
  {
    name: "Anurag Pindiproli",
    detail: "AI Engineer, Cisco · IIIT Lucknow",
    photo: "/speakers/anurag.png",
  },
  {
    name: "Srinivas Kandula",
    detail: "PD Engineer, Texas Instruments · IIT BHU",
    photo: "/Srinivas_Pr.jpg",
  },
  {
    // No photograph on file for Animesh yet, so the card falls back to his
    // initials. Drop one at /public/team/animesh-dhara.jpg and add the path.
    name: "Animesh Dhara",
    detail: "Embedded SW Engineer, Texas Instruments · Jadavpur University",
  },
  {
    name: "Indraneel Natu",
    detail: "PhD, IIM Bengaluru · IIT BHU",
    photo: "/speakers/indraneel-natu.jpg",
  },
];

// SECTION — FAQ -------------------------------------------------------------
export const faqs = [
  {
    q: "Who can join the Refresh Retreat?",
    a: "Only students shortlisted through The Human Advantage Ecosystem. Shortlisting comes from the assessment you completed after the Success Engineering podcasts — not from marks, branch or year.",
  },
  {
    q: "Can I choose which destination I travel to?",
    a: "No. Your destination follows from your campus so that each group travels together. NIT Calicut travels to Guruvayur on 1 November. You will see your own destination the moment you pick your college in the form.",
  },
  {
    q: "What does the contribution cover?",
    a: "Travel to and from the destination, accommodation, all meals through the day, internal transport, entry wherever it applies, and the Success Engineering team on the ground.",
  },
  {
    q: "Why is it so much cheaper than a normal trip?",
    a: "The real cost is ₹1,300 per student. Alumni sponsorship covers ₹1,050 of that, which is why your share is ₹250.",
  },
  {
    q: "How do I know my seat is confirmed?",
    a: "Our team verifies every payment by hand and writes to you once your seat is confirmed. Submitting the form on its own does not reserve a place.",
  },
  {
    q: "What should I carry?",
    a: "Your college ID, a modest set of clothes appropriate for a temple visit, and any personal medication. A full packing list is sent once your seat is confirmed.",
  },
  {
    q: "Is it safe, and will there be supervision?",
    a: "Yes. The Success Engineering team travels with the group for the whole journey, and the group stays together throughout.",
  },
];

export const seo = {
  title:
    "Refresh Retreat 2026 — A One-Day Journey to Guruvayur | Success Engineering",
  description:
    "An exclusive one-day retreat to Guruvayur, Kerala on 1 November 2026 for students shortlisted through The Human Advantage Ecosystem. Temple visit, elephant sanctuary, Kerala meals and spiritual discourses. Alumni sponsored — ₹250 to confirm.",
};

export const footer = {
  presenter: "Success Engineering",
  ecosystem: "The Human Advantage Ecosystem",
  name: "Refresh Retreat",
  tagline: "Beyond the Classroom",
  email: "gitaunlocked@gmail.com",
};
