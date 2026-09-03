// ---------------------------------------------------------------------------
// Where Success Engineering registrations are stored
// ---------------------------------------------------------------------------
// Each phase of the programme writes to its own collection. Two reasons:
// a finished phase's numbers stay fixed instead of drifting as the next one
// fills up, and a student who registered in an earlier phase isn't rejected by
// the unique email index when they come back for the current one.
//
// Imported by server/api/se-register.post.js, which writes, and by the
// reporting scripts, which read. Keeping one definition matters more than it
// looks: a script left pointing at the previous phase doesn't fail, it quietly
// reports that phase's frozen numbers as though they were today's.
//
// Starting a new phase means changing the two constants below and moving the
// old collection name into the history list.
// ---------------------------------------------------------------------------

// The phase currently taking registrations.
export const REGISTRATIONS_COLLECTION = "successEngineeringSep2026";

// Stamped onto every document, so records stay self-describing even if
// collections are merged later.
export const REGISTRATIONS_EDITION = "september-2026";

// Earlier phases, newest first. Read-only history — nothing writes to these.
export const PAST_REGISTRATIONS_COLLECTIONS = [
  "successEngineering2026", // Aug 2026, tagged edition: academic-session-2026
  "seRegistrations", // Jun 2026, the summer edition
];

// Deliberately a new variable name rather than reusing MONGODB_SE_2026_COLLECTION.
// That one is set to the August collection in the deployed environment, so
// reading it here would let the deployed value override this default and send
// September signups into August's data — which is the exact failure the
// previous phase hit with the older, generic MONGODB_COLLECTION.
export const registrationsCollectionName = () =>
  (process.env.MONGODB_SE_SEP2026_COLLECTION || REGISTRATIONS_COLLECTION).trim();
