// The Human Advantage Ecosystem — server-side response handling.
//
// Kept self-contained inside server/utils (no cross-dir import of /data) so the
// Nitro server bundle has no fragile relative-path dependency. Keep the
// question text / option labels in sync with data/humanAdvantageAssessment.js.
//
// There is NO scoring here — this assessment only collects and stores answers.
//
// Ids are historical, not sequential: q5–q8 were retired after the earlier round
// and q11 was added in their place. Never reuse a retired id — stored records
// from the earlier round still carry the old meaning.

const QUESTIONS = {
  q1: {
    text: 'AI can increasingly perform tasks involving information processing, analysis, and problem-solving. Which human ability do you believe will become most valuable in the coming decade?',
    options: {
      a: 'Technical knowledge',
      b: 'Ability to learn and adapt',
      c: 'Creativity and innovation',
      d: 'Understanding oneself and others',
    },
  },
  q2: {
    text: 'When faced with an unfamiliar challenge, what is your usual approach?',
    options: {
      a: 'Wait for guidance',
      b: 'Learn independently and experiment',
      c: 'Observe how others solve it first',
      d: 'Avoid taking responsibility until necessary',
    },
  },
  q3: {
    text: 'Which statement best describes your current focus?',
    options: {
      a: 'Securing a good placement/job',
      b: 'Building skills and career opportunities',
      c: 'Understanding what I truly want from life',
      d: 'Trying to balance all of the above',
    },
  },
  q4: {
    text: 'Imagine that you achieve everything you currently desire: a successful career, financial security, recognition, and the goals you have set for yourself. A few years later, you still feel that something is missing. What would you most likely do?',
    options: {
      a: 'Set bigger goals and chase new achievements',
      b: 'Focus on gaining more wealth and success',
      c: 'Explore deeper questions about purpose, fulfillment, and meaning',
      d: 'Assume this feeling is normal and ignore it',
    },
  },
  q11: {
    text: 'As India steps into the age of AI, the generation graduating today will shape what the country offers the world. As an emerging leader from India, where do you believe India can contribute most meaningfully?',
    options: {
      a: 'Building technology and enterprise the world depends on',
      b: 'Setting the standard for the ethical, humane use of AI',
      c: 'Sharing its timeless wisdom on purpose, character, and inner growth',
      d: 'Creating opportunity and dignity for every citizen at home first',
    },
  },
  q9: {
    text: 'What is one question about life, success, happiness, purpose, human potential, or the future that you genuinely want to understand better?',
    type: 'text',
  },
  q10: {
    text: 'Why would you like to be selected for The Human Advantage Ecosystem? What do you hope to gain from this journey?',
    type: 'text',
  },
}

export const choiceQuestionIds = ['q1', 'q2', 'q3', 'q4', 'q11']
export const textQuestionIds = ['q9', 'q10']

// Builds a readable, self-describing record of the submitted answers.
export function serializeAnswers(answers) {
  const out = {}
  for (const qId of choiceQuestionIds) {
    const optionId = answers?.[qId]?.optionId
    if (!optionId) continue
    out[qId] = {
      question: QUESTIONS[qId].text,
      optionId,
      label: QUESTIONS[qId].options?.[optionId] ?? optionId,
    }
  }
  for (const qId of textQuestionIds) {
    const text = answers?.[qId]?.text?.trim?.()
    if (text) {
      out[qId] = {
        question: QUESTIONS[qId].text,
        text,
      }
    }
  }
  return out
}
