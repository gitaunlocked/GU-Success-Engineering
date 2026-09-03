// The one WhatsApp destination we publish anywhere: site, confirmation emails
// and the post-registration screens for every programme. Earlier editions ran a
// broadcast channel plus a separate Inner Programming group; both were retired
// so that registrants all land in the same place.
//
// Lives in its own module because the consumers span client components, server
// email templates and two different programmes' data files. A single export
// keeps them from drifting apart, which is the failure mode that matters here:
// a stale link silently strands whoever follows it.
//
// The matching QR card is public/wa-group-qr.png. Regenerate it with
// `node scripts/make-whatsapp-qr.mjs` whenever this URL changes, or the card
// will keep pointing at the old group.
export const WHATSAPP_GROUP_URL =
  "https://chat.whatsapp.com/LcRx3yvWxwECrgep2eRP5L";
