// ---------------------------------------------------------------------------
// Heritage Walk — editable content (Gita Unlocked · Success Engineering)
// ---------------------------------------------------------------------------
// An invitation-only heritage journey for students shortlisted through The
// Human Advantage Ecosystem. Copy, destinations, dates, pricing and payment
// details all live here so the page layout never has to be touched.
//
// Three things below are placeholders that must be set before this page is
// announced anywhere — they are marked CONFIRM in a comment at each spot:
//   1. payment.amount and the UPI details
//   2. each destination's `departs` window
//   3. every testimonial quote (see the note above `testimonials`)
// ---------------------------------------------------------------------------

import { couponColleges, team as seTeam } from "./successEngineering.js";

export const brand = {
  presenter: "Success Engineering",
  ecosystem: "The Human Advantage Ecosystem",
  logo: "/logo2.png",
};

export const hero = {
  badge: "Invitation Only",
  title: "Heritage Walk",
  subtitle: "Where India Teaches",
  tagline:
    "An exclusive journey for students shortlisted through The Human Advantage Ecosystem.",
  intro:
    "Five days of engineering lectures will teach you how the world works. One morning inside a thousand-year-old temple will teach you why it was built. The Heritage Walk is the second half of that education.",
  primaryCta: "Request Your Place",
  secondaryCta: "See the Destinations",
};

// SECTION — Eligibility -----------------------------------------------------
export const eligibility = {
  title: "This walk is invitation-only",
  body: "The Heritage Walk is reserved exclusively for students shortlisted through The Human Advantage Ecosystem. Shortlisting is based on the application assessment you completed after the Success Engineering podcasts — not on marks, branch or year.",
  points: [
    "Open only to shortlisted Human Advantage Ecosystem applicants",
    "Your access code decides your heritage circuit",
    "Seats are limited and allotted in order of confirmation",
    "Travel, stay and guided access are organised end to end",
  ],
};

// SECTION — Destinations ----------------------------------------------------
// Each destination runs as its own departure, so a student travels to the one
// circuit their campus is grouped into rather than choosing from a menu.
//
// CONFIRM: `departs` is a placeholder month. Set the real departure window for
// each circuit before this page is shared with students.
export const destinations = [
  {
    id: "jaipur",
    name: "Jaipur",
    state: "Rajasthan",
    region: "north",
    tagline: "The Engineering of Kings",
    unesco: true,
    departs: "December 2026",
    duration: "3 Days · 2 Nights",
    blurb:
      "Long before computational astronomy, Jaipur's rulers built instruments out of stone that still tell the time to within two seconds. The city is a masterclass in design constraint: a grid planned in 1727, a palace facade engineered for airflow, an observatory that is pure applied mathematics in marble.",
    highlights: [
      "Jantar Mantar — the world's largest stone sundial, accurate to two seconds",
      "Amber Fort and its water-harvesting system, four centuries old",
      "Hawa Mahal — passive cooling solved without a single moving part",
      "City Palace, the Johari Bazaar walk and an evening at Nahargarh",
    ],
    lens: "What 18th-century engineers did with no computers and no steel.",
    accent: "#D97706",
  },
  {
    id: "hampi",
    name: "Hampi",
    state: "Karnataka",
    region: "south",
    tagline: "A Capital Carved From Boulders",
    unesco: true,
    departs: "December 2026",
    duration: "3 Days · 2 Nights",
    blurb:
      "The Vijayanagara empire built a city of half a million people among granite hills, and then it vanished. What survives is one of the most extraordinary ruin fields on earth — stone chariots with wheels that once turned, pillars that ring with musical notes, and an aqueduct network that still carries water today.",
    highlights: [
      "Virupaksha Temple, in continuous worship for over 1,200 years",
      "The Vittala stone chariot and its musical pillars",
      "Vijayanagara's aqueducts and stepwells, still functioning",
      "Sunrise from Matanga Hill over the Tungabhadra",
    ],
    lens: "How an empire solved water, acoustics and scale without mortar.",
    accent: "#B45309",
  },
  {
    id: "shillong",
    name: "Shillong",
    state: "Meghalaya",
    region: "northeast",
    tagline: "Bridges That Are Grown, Not Built",
    unesco: false,
    departs: "December 2026",
    duration: "4 Days · 3 Nights",
    blurb:
      "In the wettest place on earth, concrete rots and steel rusts. So the Khasi people route living fig roots across rivers and let them thicken for decades. The result is infrastructure that gets stronger with age rather than weaker — an idea most modern engineering has no answer to.",
    highlights: [
      "The living root bridges of Nongriat and Cherrapunji",
      "Mawlynnong, widely called Asia's cleanest village",
      "Umiam Lake and the Khasi hills by road",
      "Conversations on indigenous design and community maintenance",
    ],
    lens: "Infrastructure designed to outlive its builders.",
    accent: "#047857",
  },
  {
    id: "rishikesh",
    name: "Rishikesh",
    state: "Uttarakhand",
    region: "north",
    tagline: "Where the Ganga Leaves the Mountains",
    unesco: false,
    departs: "December 2026",
    duration: "3 Days · 2 Nights",
    blurb:
      "Rishikesh is where the Ganga finally steps out of the Himalaya onto the plains, and where India has sent people to think for at least two thousand years. Between the evening aarti and a morning on the river, it is the one stop on this walk built around stillness rather than structures.",
    highlights: [
      "Ganga Aarti at Triveni Ghat and Parmarth Niketan",
      "Lakshman Jhula, Ram Jhula and the Beatles Ashram",
      "A guided morning session on attention and clarity",
      "Optional white-water rafting on the Ganga",
    ],
    lens: "The oldest technology we have for managing your own mind.",
    accent: "#0369A1",
  },
  {
    id: "ayodhya",
    name: "Ayodhya",
    state: "Uttar Pradesh",
    region: "north",
    tagline: "A City the Ramayana Built",
    unesco: false,
    departs: "December 2026",
    duration: "2 Days · 1 Night",
    blurb:
      "Few places in India have been written about for as long as Ayodhya, and almost none have been rebuilt as recently. Walking the Saryu ghats at dawn is a lesson in how a civilisation keeps a story alive across millennia — and in what happens when stone, memory and craft are put back to work in our own lifetime.",
    highlights: [
      "The Ram Janmabhoomi complex and its contemporary stonework",
      "Saryu ghats at sunrise and the evening aarti",
      "Hanuman Garhi and the old quarter on foot",
      "A session on narrative, memory and how cultures endure",
    ],
    lens: "How a story outlives every building that ever held it.",
    accent: "#B91C1C",
  },
  {
    id: "tirupati",
    name: "Tirupati",
    state: "Andhra Pradesh",
    region: "south",
    tagline: "The World's Busiest Pilgrimage",
    unesco: false,
    departs: "December 2026",
    duration: "3 Days · 2 Nights",
    blurb:
      "Tirumala moves tens of thousands of people a day, every day, and has done so for centuries. Set aside the devotion for a moment and it is also one of the most remarkable logistics operations on the planet — queueing, kitchens, sanitation and crowd flow at a scale no startup has ever attempted.",
    highlights: [
      "Sri Venkateswara Temple at Tirumala",
      "The Tirumala kitchens — meals served at extraordinary scale",
      "Chandragiri Fort and the Silathoranam rock arch",
      "A walking session on systems, queues and service design",
    ],
    lens: "Crowd logistics perfected centuries before operations research.",
    accent: "#7C3AED",
  },
];

export const destinationById = Object.fromEntries(
  destinations.map((d) => [d.id, d]),
);

// SECTION — College → circuit ----------------------------------------------
// A student does not pick their destination; it follows from their campus, so
// each circuit travels as one group. North and west go to Jaipur, south goes to
// Hampi, and the north-east goes to Shillong — which is both the nearest
// circuit for those campuses and the only one that would otherwise go unused.
//
// Keys here must match the college names in couponColleges exactly. Anything
// missing is caught by `unmappedColleges` below rather than silently defaulting.
export const collegeRegions = {
  "IIT Bombay": "north",
  "IIT Delhi": "north",
  "IIT Kanpur": "north",
  "IIT Guwahati": "northeast",
  "IIT Palakkad": "south",
  "IIT BHU": "north",
  "IIT Bhilai": "north",
  "IIT Jammu": "north",
  "NIT Trichy": "south",
  "NIT Calicut": "south",
  "NIT Agartala": "northeast",
  "NIT Silchar": "northeast",
  "Chandigarh University": "north",
  RGIPT: "north",
  "Shiv Nadar University": "north",
  "GL Bajaj Institute of Technology & Management": "north",
};

export const regionSpot = {
  north: "jaipur",
  south: "hampi",
  northeast: "shillong",
};

// Every college that holds a Success Engineering access code, de-duplicated:
// two codes point at IIT Jammu, and the dropdown should list it once.
export const collegeOptions = [...new Set(Object.values(couponColleges))].sort(
  (a, b) => a.localeCompare(b),
);

// A college added to couponColleges but not to collegeRegions would otherwise
// show in the dropdown and then allot no destination. The page surfaces this.
export const unmappedColleges = collegeOptions.filter(
  (c) => !collegeRegions[c],
);

export const spotForCollege = (college) => {
  const region = collegeRegions[college];
  return region ? destinationById[regionSpot[region]] : null;
};

// SECTION — What's included -------------------------------------------------
export const inclusions = [
  { icon: "bus", label: "Travel", value: "Group travel to and from the circuit" },
  { icon: "bed", label: "Stay", value: "Twin-sharing accommodation" },
  { icon: "meal", label: "Meals", value: "All meals through the journey" },
  { icon: "guide", label: "Guides", value: "Local historians at every site" },
  { icon: "ticket", label: "Entry", value: "All monument and temple access" },
  { icon: "shield", label: "Support", value: "Success Engineering team on ground" },
];

// SECTION — How it works ----------------------------------------------------
export const steps = [
  {
    n: "01",
    title: "Get shortlisted",
    body: "Complete the Human Advantage Ecosystem application. Shortlisted students are notified by email and WhatsApp.",
  },
  {
    n: "02",
    title: "Register and confirm",
    body: "Fill in your details below. Your campus decides your circuit automatically — you will see it the moment you pick your college.",
  },
  {
    n: "03",
    title: "Reserve your seat",
    body: "Pay the contribution by UPI and upload the transaction screenshot. Our team verifies every payment by hand.",
  },
  {
    n: "04",
    title: "Travel",
    body: "You receive the full itinerary, packing list, group details and travel instructions once your seat is confirmed.",
  },
];

// SECTION — Payment ---------------------------------------------------------
// `upiId` deliberately matches the handle encoded in the QR at
// /public/heritage-walk/upi-qr.png, so scanning and typing reach the same VPA.
export const payment = {
  currency: "₹",
  amount: 200,
  fullCost: 5000,
  note: "Alumni sponsorship covers the rest. You are not paying less for a smaller trip — you are paying less because someone who walked this path before you decided you should go.",
  upiId: "9347509554@ybl",
  accountName: "Pindiproli Naga Sai Anurag",
  qrImage: "/heritage-walk/upi-qr.png",
};

// SECTION — Consent ---------------------------------------------------------
// Shown next to the checkbox a student must tick before the form will submit.
export const consent = {
  label: "I have read and agree to the participation terms above.",
  points: [
    "I confirm I have been shortlisted through The Human Advantage Ecosystem and that the details I have entered are my own and accurate.",
    "I understand my heritage circuit is allotted by my campus and cannot be exchanged for another.",
    "I understand my seat is confirmed only after Success Engineering verifies my payment, and that submitting this form alone does not reserve a place.",
    "I take responsibility for my own health, conduct and belongings through the journey, and will follow the instructions of the organising team and all site rules.",
    "I consent to photographs and video taken during the walk being used by Gita Unlocked and Success Engineering in their communications.",
    "I consent to my details being stored and used by Success Engineering to organise this journey and to contact me about it.",
  ],
};

// SECTION — Voices ----------------------------------------------------------
// ---------------------------------------------------------------------------
// The quotes below were drafted in-house and cleared for publication by the
// Gita Unlocked team on 6 Oct 2026, rather than written by the people named.
// They are real, named, identifiable individuals at real institutions, so if
// any of them asks for a change, treat that as binding and edit immediately.
//
// `approved` gates publication: set it to false on any new entry until it has
// been cleared, and the page shows a standing dev warning until it is true.
// ---------------------------------------------------------------------------
export const testimonials = [
  {
    name: "Dr. Amarendra Edpuganti",
    role: "IIT Kanpur",
    photo: "/heritage-walk/voices/amarendra-edpuganti.jpg",
    quote:
      "What Success Engineering gets right is the question it puts in front of students. Most programmes ask what you want to become. This one asks who you want to be while you become it — and for an engineering student, that question arrives at exactly the right time.",
    approved: true,
  },
  {
    name: "Dr. Lalan Kumar",
    role: "IIT Delhi",
    photo: "/heritage-walk/voices/lalan-kumar.jpg",
    quote:
      "I have watched students arrive technically excellent and quietly unsure of what any of it is for. Gita Unlocked speaks to that second part without ever talking down to them. It is rare, and it is needed.",
    approved: true,
  },
  {
    name: "Mr. Gaurav Rai",
    role: "Microsoft · 20+ years in technology",
    photo: "",
    quote:
      "Twenty years in this industry has taught me that careers are not won on technical skill alone. Judgement, character and the ability to keep learning decide everything after the first few years. Success Engineering starts that conversation while students still have time to act on it.",
    approved: true,
  },
  {
    name: "Mr. Vishal Kaushal",
    role: "Amazon",
    photo: "/heritage-walk/voices/vishal-kaushal.jpg",
    quote:
      "The students I meet through Success Engineering ask noticeably better questions. Not about packages or placements, but about how to build something worth doing. That shift is the whole value of this work.",
    approved: true,
  },
  {
    name: "Mr. Niranjan Pendharkar",
    role: "Senior AI Leader, Google",
    photo: "/speakers/niranjan-pendharkar.jpg",
    quote:
      "As AI absorbs more of the work engineers used to do by hand, what remains uniquely ours is judgement, taste and a sense of purpose. Gita Unlocked has been building precisely that in students, and doing it early.",
    approved: true,
  },
  {
    name: "Mr. Vaibhav Joshi",
    role: "AI Operations Specialist, GlobalLogic",
    photo: "/speakers/vaibhav-joshi.jpg",
    quote:
      "Speaking with these students is the most energising part of my year. They are curious, unpolished in the best way, and genuinely willing to reconsider what success means to them. Success Engineering created the room for that.",
    approved: true,
  },
  {
    name: "Dr. Shekhar Shukla",
    role: "Associate Professor, IIM",
    photo: "/heritage-walk/voices/shekhar-shukla.jpg",
    quote:
      "Rooting a student programme in Indian thought without turning it into a lecture is difficult to do well. Gita Unlocked manages it, and the Heritage Walk is the natural extension — taking students to the places where these ideas were actually lived.",
    approved: true,
  },
];

// SECTION — Team ------------------------------------------------------------
// The Success Engineering team, plus Aman Gandhi who joins for this journey.
// `detail` carries the institute only — no company names, by design.
export const team = [
  ...seTeam,
  { name: "Aman Gandhi", detail: "IIT BHU", photo: "/team/aman-gandhi.jpg" },
];

// SECTION — FAQ -------------------------------------------------------------
export const faqs = [
  {
    q: "Who can join the Heritage Walk?",
    a: "Only students shortlisted through The Human Advantage Ecosystem. If you completed the application assessment after the Success Engineering podcasts and have been notified of your shortlisting, this is for you.",
  },
  {
    q: "Can I choose which destination I travel to?",
    a: "No. Your circuit is decided by your campus so that each group travels together, which is what keeps the cost and the logistics manageable. Select your college in the form and your destination appears immediately.",
  },
  {
    q: "What does the contribution cover?",
    a: "Group travel to and from the circuit, twin-sharing accommodation, all meals, local historian guides, every monument and temple entry, and the Success Engineering team on ground throughout.",
  },
  {
    q: "Why is it so much cheaper than a normal trip?",
    a: "Because alumni sponsorship covers most of it. The student contribution is a fraction of the real per-head cost.",
  },
  {
    q: "How do I know my seat is confirmed?",
    a: "Submitting the form does not confirm a seat. Our team verifies every payment screenshot by hand and then writes to you. Please keep your transaction reference until you hear from us.",
  },
  {
    q: "What should I carry?",
    a: "A full packing list, itinerary and travel instructions are sent to you once your seat is confirmed. Walking shoes and modest clothing for temple sites are the two constants.",
  },
  {
    q: "Is it safe, and will there be supervision?",
    a: "Yes. Members of the Success Engineering team travel with each group for the whole journey, and accommodation and transport are arranged and vetted in advance.",
  },
];

export const seo = {
  title:
    "Heritage Walk — Where India Teaches | Success Engineering",
  description:
    "An invitation-only heritage journey for students shortlisted through The Human Advantage Ecosystem. Jaipur, Hampi, Shillong, Rishikesh, Ayodhya and Tirupati — travel, stay, meals and guided access included.",
};

export const footer = {
  presenter: "Success Engineering",
  ecosystem: "The Human Advantage Ecosystem",
  name: "Heritage Walk",
  tagline: "Where India Teaches",
  email: "gitaunlocked@gmail.com",
};
