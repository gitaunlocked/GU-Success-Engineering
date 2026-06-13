// The Human Advantage Series — server-side response handling.
//
// Kept self-contained inside server/utils (no cross-dir import of /data) so the
// Nitro server bundle has no fragile relative-path dependency. Keep the
// question text / option labels in sync with data/humanAdvantageAssessment.js.
//
// There is NO scoring here — this assessment only collects and stores answers.

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
  q5: {
    text: 'Have you ever attended any session, workshop, course, or discussion related to topics such as self-development, purpose, happiness, philosophy, mindfulness, or personal growth?',
    options: {
      a: 'Frequently',
      b: 'A few times',
      c: 'Once or twice',
      d: 'Never',
    },
  },
  q6: {
    text: 'When making an important decision, what influences you the most?',
    options: {
      a: 'Logic and facts',
      b: 'Advice from others',
      c: 'My values and principles',
      d: 'A combination of the above',
    },
  },
  q7: {
    text: 'Which question interests you the most?',
    options: {
      a: 'How can I build a successful career?',
      b: 'How can I become a better leader?',
      c: 'What creates lasting happiness and fulfillment?',
      d: 'How can society solve major future challenges?',
    },
  },
  q8: {
    text: 'How often do you spend time reflecting on your life, choices, or future direction?',
    options: {
      a: 'Regularly',
      b: 'Occasionally',
      c: 'Rarely',
      d: 'Almost never',
    },
  },
  q9: {
    text: 'What is one question about life, success, happiness, purpose, human potential, or the future that you genuinely want to understand better?',
    type: 'text',
  },
  q10: {
    text: 'Why would you like to be selected for The Human Advantage Series? What do you hope to gain from this journey?',
    type: 'text',
  },
}

export const choiceQuestionIds = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8']
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
