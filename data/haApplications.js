// ---------------------------------------------------------------------------
// Where Human Advantage Ecosystem applications are stored
// ---------------------------------------------------------------------------
// Each round of applications writes to its own collection, for the same reason
// registrations do (see data/registrations.js): a finished round's numbers stay
// fixed instead of drifting as the next one fills up.
//
// It matters more here than it does for registrations. The application questions
// are replaced between rounds, so a collection holding two rounds holds answers
// to two different sets of questions side by side, and a shortlisting export
// reading it cannot tell which question a given answer belongs to. Splitting on
// the round keeps each collection answering one questionnaire.
//
// Imported by server/api/human-advantage-submit.post.js, which writes, and by
// the reporting scripts, which read.
//
// Starting a new round means changing the two constants below and moving the
// old collection name into the history list.
// ---------------------------------------------------------------------------

// The round currently taking applications — the q12–q18 question set.
export const HA_APPLICATIONS_COLLECTION = "seHumanAdvantageSep2026";

// Stamped onto every document, so records stay self-describing even if
// collections are merged later.
export const HA_APPLICATIONS_EDITION = "september-2026";

// Earlier rounds, newest first. Read-only history — nothing writes to these.
export const PAST_HA_APPLICATIONS_COLLECTIONS = [
  "seHumanAdvantageApplications", // Jun + Aug 2026, the q1–q11 question sets
];

// Deliberately a new variable name rather than reusing
// MONGODB_HA_APPLICATION_COLLECTION. That one may already be set to the previous
// collection in the deployed environment, and reading it here would let the
// deployed value override this default and send new applications back into the
// old round's data — the exact failure the registration split had to work
// around.
export const haApplicationsCollectionName = () =>
  (process.env.MONGODB_HA_SEP2026_COLLECTION || HA_APPLICATIONS_COLLECTION).trim();
