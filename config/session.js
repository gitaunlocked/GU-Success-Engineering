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
// ---------------------------------------------------------------------------

export const session = {
  // 🔴 PASTE THE ZOOM LINK HERE WHEN READY (leave "" until then)
  joinUrl: "https://servicenow.zoom.us/j/92527977934",

  eventName: "The Success Code",
  sessionLabel: "Session 1 of 3",
  title: "The Success Code",
  subtitle: "AI, Careers & Building Your Future",
  // Human-readable schedule shown on the page
  dateLabel: "7 June 2026 · Sunday",
  timeLabel: "7:00 – 8:00 PM IST",
  platform: "Live on Zoom",

  // Speaker featured for this session
  speaker: {
    name: "Mr. Samyak Jain",
    photo: "/speakers/samyak.png",
    credentials: [
      "Incoming CS PhD at UC Berkeley",
      "Research Fellow @ Microsoft",
      "AI Intern @ Mastercard",
      "CSE at IIT BHU, Varanasi",
    ],
  },

  // Small note under the join button
  note: "Keep this page handy — the Join button activates here as soon as the meeting link is live.",
};
