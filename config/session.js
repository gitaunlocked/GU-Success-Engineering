// ---------------------------------------------------------------------------
// Live Session Room — single source of truth for the /session page
// ---------------------------------------------------------------------------
// Share this stable link everywhere:  https://www.gitaunlocked.com/session
// The shared link NEVER changes. When you get the Zoom link, just paste it
// into `joinUrl` below and push — the same /session link keeps working.
//
//   joinUrl = ""              -> button is disabled, shows "Meeting link will
//                                be updated shortly"
//   joinUrl = "https://..."   -> button becomes the live "Join Session" link
//
// Assessment quiz (stable share link):
//   assessmentUrl = ""        -> shows "Assessment link will be updated shortly"
//   assessmentUrl = "/assessment" or full URL -> active button
// ---------------------------------------------------------------------------

export const session = {
  // 🔴 PASTE THE ZOOM LINK HERE WHEN READY (leave "" until then)
  joinUrl: "https://servicenow.zoom.us/j/95741828206",

  eventName: "The Hidden Dimension",
  sessionLabel: "Session 2 of 3",
  title: "The Hidden Dimension",
  subtitle: "Some perspectives change everything.",
  dateLabel: "10 June 2026 · Wednesday",
  timeLabel: "5:00 – 6:00 PM IST",
  platform: "Live on Zoom",

  speaker: {
    name: "Yashas Tadikamalla",
    photo: "/speakers/yashas.png",
    credentials: [
      "B.Tech in Artificial Intelligence, IIT Hyderabad (2024)",
      "AIR 215 in JEE Mains · AIR 613 in JEE Advanced · AIR 276 in KVPY SX",
      "Academic Excellence Award for outstanding CGPA at IIT Hyderabad",
      "Data Scientist Intern at Blend 360 (6-month semester internship)",
      "Data Engineer at Texas Instruments, Bengaluru",
    ],
  },

  note: "Keep this page handy — the Join button activates here as soon as the meeting link is live.",

  // 🔴 PASTE ASSESSMENT LINK HERE WHEN READY (leave "" until then)
  assessmentUrl: "",
};
