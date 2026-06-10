// Human Potential Assessment — server-side scoring.
//
// Kept self-contained inside server/utils (no cross-dir import of /data) so the
// Nitro server bundle has no fragile relative-path dependency. Keep the option
// scores in sync with data/humanPotentialAssessment.js.

// Option scores for the seven scored questions (q1–q7).
const OPTION_SCORES = {
  q1: { a: 25, b: 50, c: 75, d: 100 },
  q2: { a: 25, b: 50, c: 80, d: 100 },
  q3: { a: 25, b: 55, c: 80, d: 100 },
  q4: { a: 25, b: 50, c: 80, d: 100 },
  q5: { a: 25, b: 50, c: 80, d: 100 },
  q6: { a: 35, b: 55, c: 85, d: 100 },
  q7: { a: 50, b: 45, c: 80, d: 100 },
}

const SECTIONS = {
  q1: 'The AI Advantage',
  q2: 'Solving Difficult Problems',
  q3: 'Handling Pressure',
  q4: 'Learning from Failure',
  q5: 'Working with Others',
  q6: 'Long-Term Decisions',
  q7: 'The Future of Human Value',
  q8: 'Beyond Achievement',
  q9: 'The Modern Challenge',
  q10: 'The Bigger Question',
}

export const scoredQuestionIds = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7']
export const textQuestionIds = ['q8', 'q9', 'q10']

const DIMENSIONS = [
  { key: 'futureReadiness', title: 'Future Readiness', questionIds: ['q1', 'q7'] },
  { key: 'resilience', title: 'Resilience & Composure', questionIds: ['q3', 'q4'] },
  { key: 'problemSolving', title: 'Problem-Solving', questionIds: ['q2'] },
  { key: 'peopleAndDirection', title: 'People & Direction', questionIds: ['q5', 'q6'] },
]

const INSIGHTS = {
  futureReadiness: (s) =>
    s >= 80
      ? 'You lean into new tools and value uniquely human judgment — exactly the mindset that thrives as AI reshapes every field.'
      : s >= 55
        ? "You're open to change. Turning occasional curiosity into deliberate experimentation will sharpen your edge fast."
        : 'The biggest shift is starting. Picking up one new tool and trusting your own judgment will compound quickly.',
  resilience: (s) =>
    s >= 80
      ? "Pressure and setbacks don't shake you for long — you recover, learn, and keep performing. This steadiness is rare."
      : s >= 55
        ? 'You cope well, though stress and disappointment still cost you some momentum. Small recovery habits will protect your focus.'
        : 'Setbacks hit hard right now. Learning to treat them as feedback — not verdicts — is one of the highest-leverage skills you can build.',
  problemSolving: (s) =>
    s >= 80
      ? 'You break hard problems down and stay with them until they yield. That persistence is where real capability is forged.'
      : s >= 55
        ? 'You make progress on tough problems. Building a habit of structuring them before reacting will take you further.'
        : 'Hard problems feel stuck right now. A simple practice — break it into parts, attempt one — turns paralysis into progress.',
  peopleAndDirection: (s) =>
    s >= 80
      ? 'You work well across differences and choose opportunities aligned with long-term growth and meaning — a powerful combination.'
      : s >= 55
        ? 'You collaborate and think ahead. Actively seeking out different viewpoints will deepen both your relationships and your decisions.'
        : "There's room to engage more with others and to weigh decisions beyond the immediate. Both quietly shape where you end up.",
}

const tier = (score) => {
  if (score >= 80) return { label: 'Strong', color: '#D61C75' }
  if (score >= 55) return { label: 'Growing', color: '#FF7A00' }
  return { label: 'Emerging', color: '#7A10FF' }
}

export function computeScores(answers) {
  const scoreFor = (qId) => {
    const optionId = answers?.[qId]?.optionId
    return OPTION_SCORES[qId]?.[optionId] ?? 0
  }

  const dimensions = DIMENSIONS.map((dim) => {
    const avg = Math.round(
      dim.questionIds.reduce((sum, qId) => sum + scoreFor(qId), 0) / dim.questionIds.length,
    )
    return {
      key: dim.key,
      title: dim.title,
      score: avg,
      ...tier(avg),
      insight: INSIGHTS[dim.key](avg),
    }
  })

  const overall = Math.round(
    dimensions.reduce((sum, d) => sum + d.score, 0) / dimensions.length,
  )

  return { dimensions, overall, ...tier(overall) }
}

export function serializeAnswers(answers) {
  const out = {}
  for (const qId of scoredQuestionIds) {
    const optionId = answers?.[qId]?.optionId
    if (!optionId) continue
    out[qId] = {
      optionId,
      label: answers[qId]?.label ?? optionId,
      section: SECTIONS[qId],
    }
  }
  for (const qId of textQuestionIds) {
    const text = answers?.[qId]?.text?.trim?.()
    if (text) out[qId] = { text, section: SECTIONS[qId] }
  }
  return out
}
