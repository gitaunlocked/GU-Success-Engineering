// ---------------------------------------------------------------------------
// Refresh Retreat 2026 — editable content (Gita Unlocked · Success Engineering)
// ---------------------------------------------------------------------------
// One-day retreat to Guruvayur for IIT Palakkad × NIT Calicut boys.
// Update copy, dates, pricing, UPI details, etc. here without touching layout.
// ---------------------------------------------------------------------------

export const brand = {
  presenter: "Success Engineering",
  ecosystem: "The Human Advantage Ecosystem",
  logo: "/logo2.png",
}

export const hero = {
  eyebrowBadge: "IIT Palakkad × NIT Calicut",
  title: "Refresh Retreat",
  subtitle: "Beyond the Classroom",
  tagline: "A One-Day Journey to Guruvayur",
  primaryCta: "Register Now",
  // Drop a real photo at /public/refresh-retreat/hero.jpg to override the
  // premium gradient fallback rendered by the page.
  image: "/refresh-retreat/hero.jpg",
}

export const retreatDetails = [
  { icon: "calendar", label: "Date", value: "2 August 2026" },
  { icon: "pin", label: "Destination", value: "Guruvayur, Kerala" },
  { icon: "clock", label: "Reporting Time", value: "9:00 AM" },
  { icon: "users", label: "Eligibility", value: "IIT Palakkad & NIT Calicut Boys" },
  { icon: "bus", label: "Transportation", value: "To & From Included" },
  { icon: "meal", label: "Meals", value: "Breakfast + Lunch + Snacks" },
  { icon: "bed", label: "Accommodation", value: "Included" },
]

export const activities = [
  "Temple Visit",
  "Elephant Sanctuary",
  "Spiritual Discourses",
  "Group Activities",
  "Traditional Kerala Meals",
]

export const experiences = [
  {
    emoji: "🤝",
    title: "Meet New Friends",
    body: "Bond with peers from IIT Palakkad and NIT Calicut over a shared, unforgettable day.",
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
]

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
  sponsorNote:
    "Thanks to generous alumni sponsorship, students only need to contribute ₹250 to confirm their registration.",
}

export const payment = {
  upiId: "devendragurnani07@okhdfcbank",
  accountName: "Devendra Gurnani",
  bank: "HDFC Bank",
  // QR shipped at /public/refresh-retreat/upi-qr.png.
  qrImage: "/refresh-retreat/upi-qr.png",
}

export const institutes = ["IIT Palakkad", "NIT Calicut"]

export const trustBullets = [
  "Limited Seats",
  "Curated Experience",
  "Alumni Sponsored",
  "Safe & Organized",
  "Organized by Success Engineering",
]

export const footer = {
  presenter: "Success Engineering",
  ecosystem: "The Human Advantage Ecosystem",
  retreatName: "Refresh Retreat",
  retreatTagline: "Beyond the Classroom",
}

export const seo = {
  title: "Refresh Retreat 2026 — A One-Day Journey to Guruvayur | Success Engineering",
  description:
    "An exclusive one-day retreat to Guruvayur, Kerala for IIT Palakkad × NIT Calicut students. Temple visit, elephant sanctuary, Kerala meals, spiritual discourses. Alumni sponsored — only ₹250 to confirm.",
}
