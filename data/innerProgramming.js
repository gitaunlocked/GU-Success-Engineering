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
  supporting: "Ancient Wisdom · Modern Technology · Extraordinary Lives",
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
  basePrice: 5000, // struck-off once a valid code is applied
  featuredCoupon: "GUWAHATI2026", // primary code (not shown publicly)
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
  orientation: "Orientation: Quotients of Extraordinary Success",
  focus: [
    "Discover Your Real Self",
    "Mastermind Behind Universe",
    "The User Manual for Life",
    "Science Meets Ancient Wisdom",
    "Solving Life's Biggest Questions",
    "The Science of Mantra Meditation",
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
  label: "Launch Session · Special Guest",
  name: "Mr. Avelo Roy",
  role: "Managing Director, Kolkata Ventures",
  image: "/speakers/avelo-roy.png",
  hook:
    "Serial tech entrepreneur, investor & educator whose graphical password technology is used by 1.3 billion+ mobile users worldwide.",
  // Punchy numbers for low-attention-span scanning.
  stats: [
    { value: "1.3B+", label: "Users of his tech" },
    { value: "9", label: "Businesses founded" },
    { value: "550+", label: "Startups mentored" },
    { value: "3×", label: "TEDx speaker" },
    { value: "500+", label: "Talks delivered" },
  ],
  highlights: [
    "Guest lecturer at Harvard, IITs & IIMs",
    "Spoke at the White House & Rashtrapati Bhavan",
    "Built his 1st company at 19 — multi-million by 22",
    "MD of East India's largest startup incubator (5,200+ jobs created)",
    "Great-great-grandson of Sarojini Naidu",
    "Blends Bhagavad Gita wisdom with modern business",
  ],
  meetNote: "Attending students get an exclusive offline meet with Mr. Avelo Roy.",
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
    title: "Discover Your Real Self",
    summary:
      "Go beyond your roles and labels to understand who you truly are. Build honest self-awareness as the foundation for every change that follows.",
  },
  {
    track: "Inner Track",
    number: 2,
    title: "Mastermind Behind Universe",
    summary:
      "Explore the intelligence and order behind creation, and your place within it — a bigger-picture view that reshapes how you see life.",
  },
  {
    track: "Inner Track",
    number: 3,
    title: "The User Manual for Life",
    summary:
      "Timeless principles for making better decisions, handling relationships, and navigating challenges with clarity and calm.",
  },
  {
    track: "Inner Track",
    number: 4,
    title: "Science Meets Ancient Wisdom",
    summary:
      "Where modern science and timeless wisdom agree — practical insights that bridge the lab and the Gita for a modern student.",
  },
  {
    track: "Inner Track",
    number: 5,
    title: "Solving Life's Biggest Questions",
    summary:
      "Confront the questions of purpose, meaning, and success — and build a personal framework to answer them for yourself.",
  },
  {
    track: "Inner Track",
    number: 6,
    title: "The Science of Mantra Meditation",
    summary:
      "Learn a simple, proven meditation practice to steady the mind, sharpen focus, and carry inner calm into daily life.",
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
