// ---------------------------------------------------------------------------
// Inner Programming Workshop — editable content (Gita Unlocked)
// ---------------------------------------------------------------------------
// Update copy, dates, speakers and outcomes here without touching the layout.
// ---------------------------------------------------------------------------

export const brand = {
  name: "Gita Unlocked",
  tagline: "Unlocking Timeless Wisdom for Modern Life",
  logo: "/logo2.png",
}

export const hero = {
  title: "Inner Programming Workshop",
  subtitle: "Beyond Grades. Beyond Placements. Beyond Success.",
  supporting: "Ancient Wisdom. Modern Technology. Extraordinary Lives.",
  description:
    "A transformational journey designed for IIT students to develop self-mastery, purpose, leadership, and technical excellence. This workshop integrates timeless wisdom with practical modern skills to help participants succeed in academics, career, and life.",
  primaryCta: "Register Now",
  secondaryCta: "Explore the Journey",
}

export const registration = {
  seats: "Only 80 Seats",
  deadline: "30 July",
  deadlineLabel: "Registration Deadline: 30 July",
}

// Pricing + access codes.
// The workshop has a base price; a valid access code unlocks it for FREE.
// The applied code also identifies the student's college.
export const pricing = {
  currency: "₹",
  basePrice: 999, // struck-off once a valid code is applied
  featuredCoupon: "GUWAHATI2026", // primary code shown to students
}

// Access code -> college. Add campus codes here.
export const couponColleges = {
  GUWAHATI2026: "IIT Guwahati",
  IITG2026: "IIT Guwahati",
  IITBHU2026: "IIT BHU",
  IITPKD2026: "IIT Palakkad",
  IITJODH2026: "IIT Jodhpur",
  IITROPAR2026: "IIT Ropar",
  IITJAMMU2026: "IIT Jammu",
  IITBHILAI2026: "IIT Bhilai",
  MNITJAIPUR2026: "MNIT Jaipur",
}

// Any of these codes unlocks FREE registration.
export const validCoupons = Object.keys(couponColleges)

export const about = {
  heading: "One Journey. Two Tracks. Nine Transformative Sessions.",
  body:
    "This is not just a workshop—it's a complete growth journey that helps students become better thinkers, better leaders, and better professionals by combining inner development with technical learning.",
}

export const innerTrack = {
  label: "Track 1 — Inner Track",
  sessions: "6 Transformative Sessions",
  focus: [
    "Decode Yourself",
    "Master Your Mind",
    "Discover Your Purpose",
    "Build Strong Character",
    "Practical Bhagavad Gita Wisdom",
    "Applying Timeless Principles in Daily Life",
  ],
  outcomes: [
    "Better Focus",
    "Emotional Stability",
    "Clarity in Decision Making",
    "Self-Discipline",
    "Leadership Qualities",
    "Purpose-Driven Living",
  ],
}

export const technicalTrack = {
  label: "Track 2 — Technical Master Track",
  sessions: "3 Hands-on Sessions",
  note: "Participants can choose ONE specialization:",
  specializations: ["DSA with C++", "Data Analysis", "Machine Learning"],
  outcomes: [
    "Practical Technical Skills",
    "Career Readiness",
    "Industry Exposure",
    "Hands-on Learning",
  ],
}

export const launchSession = {
  label: "Launch Session · Special Guest Speaker",
  name: "Mr. Avelo Roy",
  role: "Founder, Kolkata Ventures",
  image: "/speakers/avelo-roy.png",
  highlights: [
    "Startup Mentor",
    "4× TEDx Speaker",
    "Mentored 550+ Startups",
    "Guest Lecturer at IITs, IIMs & US Universities",
  ],
}

export const mentors = [
  "IIT Alumni",
  "Startup Founders",
  "Industry Experts",
  "Vedic Scholars",
]

export const differentiators = [
  "One integrated 9-session transformation journey",
  "Ancient Wisdom combined with Modern Technology",
  "Learn from IIT Alumni and Startup Mentors",
  "Practical life skills alongside technical expertise",
  "Exclusive Mentor Retreat with Mr. Avelo Roy",
  "Completion Certificate by VVF, MIT",
  "Trusted by 15,000+ Students Across India",
]

export const outcomes = [
  "Develop stronger focus and concentration",
  "Improve decision-making skills",
  "Build confidence and leadership qualities",
  "Learn practical self-management techniques",
  "Gain technical knowledge in their chosen specialization",
  "Connect with like-minded high-achieving students",
  "Build a purpose-driven approach to career and life",
]

export const retreat = {
  heading: "Exclusive Mentor Retreat",
  body:
    "Outstanding participants will get the opportunity to attend an exclusive mentor retreat with Mr. Avelo Roy for deeper discussions on entrepreneurship, leadership, innovation, and personal growth.",
}

export const certification = {
  heading: "Certification",
  body:
    "Participants who successfully complete the workshop will receive a Completion Certificate issued by VVF, MIT.",
}

export const faqs = [
  {
    q: "Who can join?",
    a: "Open to IIT students.",
  },
  {
    q: "Is there any registration fee?",
    a: "The workshop becomes completely free once you apply your campus access code during registration. Ask your college coordinator for the code if you don't have it.",
  },
  {
    q: "Do I need prior coding experience?",
    a: "No. Participants can choose the technical track best suited to their current level.",
  },
  {
    q: "Will I receive a certificate?",
    a: "Yes. Eligible participants will receive a Completion Certificate from VVF, MIT.",
  },
]

export const finalCta = {
  heading: "Your IIT journey is about more than grades and placements.",
  body:
    "Join a unique 9-session journey that combines timeless wisdom, technical excellence, and mentorship to help you become the best version of yourself.",
  points: [
    "Free with Access Code",
    "Only 80 Seats",
    "Register by 30 July",
  ],
}

// The nine sessions, expanded for the "Explore the Journey" page.
export const journey = [
  {
    track: "Inner Track",
    number: 1,
    title: "Decode Yourself",
    summary:
      "Understand the mind, ego, and the layers of your personality. Build honest self-awareness as the foundation for every change that follows.",
  },
  {
    track: "Inner Track",
    number: 2,
    title: "Master Your Mind",
    summary:
      "Practical techniques to steady attention, manage emotions, and stop the mental noise that drains focus and energy.",
  },
  {
    track: "Inner Track",
    number: 3,
    title: "Discover Your Purpose",
    summary:
      "Move beyond chasing grades and placements. Clarify what genuinely drives you and how to align daily action with it.",
  },
  {
    track: "Inner Track",
    number: 4,
    title: "Build Strong Character",
    summary:
      "Develop integrity, discipline, and resilience — the traits that make leaders trusted and effective under pressure.",
  },
  {
    track: "Inner Track",
    number: 5,
    title: "Practical Bhagavad Gita Wisdom",
    summary:
      "Timeless principles from the Gita translated into a modern student's decisions, relationships, and ambitions.",
  },
  {
    track: "Inner Track",
    number: 6,
    title: "Applying Timeless Principles in Daily Life",
    summary:
      "Turn insight into habit — a simple system to keep practising self-mastery long after the workshop ends.",
  },
  {
    track: "Technical Master Track",
    number: 7,
    title: "Specialization · Session 1",
    summary:
      "Begin your chosen track — DSA with C++, Data Analysis, or Machine Learning — with hands-on fundamentals.",
  },
  {
    track: "Technical Master Track",
    number: 8,
    title: "Specialization · Session 2",
    summary:
      "Go deeper with guided, project-style problems that mirror real industry and interview scenarios.",
  },
  {
    track: "Technical Master Track",
    number: 9,
    title: "Specialization · Session 3",
    summary:
      "Consolidate skills into a mini-project and a clear roadmap for continued growth and career readiness.",
  },
]

export const seo = {
  title: "Inner Programming Workshop | Gita Unlocked",
  description:
    "A transformational 9-session journey for IIT students — inner mastery plus a technical track (DSA, Data Analysis, or Machine Learning). Free. Only 80 seats.",
}
