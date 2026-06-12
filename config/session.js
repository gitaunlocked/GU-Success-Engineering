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
  joinUrl: "",

  eventName: "The Human Edge",
  sessionLabel: "Session 3 of 3",
  title: "The Human Edge",
  subtitle: "Building what AI cannot replace.",
  dateLabel: "13 June 2026 · Saturday",
  timeLabel: "4:00 – 5:00 PM IST",
  platform: "Live on Zoom",

  speaker: {
    name: "Mr. Vaibhav Joshi",
    photo: "/speakers/vaibhav.png",
    credentials: [
      "Senior AI Operations Specialist @ GlobalLogic",
      "Ex- Operations Specialist @ Hello Tomorrow, Paris",
      "MBA @ IESEG School of Management, Paris",
      "Ex- Manager @ Maruti Suzuki",
    ],
  },

  note: "Keep this page handy — the Join button activates here as soon as the meeting link is live.",

  // 🔴 PASTE ASSESSMENT LINK HERE WHEN READY (leave "" until then)
  assessmentUrl: "",
};
