// The Human Advantage Ecosystem — server-side response handling.
//
// Kept self-contained inside server/utils (no cross-dir import of /data) so the
// Nitro server bundle has no fragile relative-path dependency. Keep the
// question text / option labels in sync with data/humanAdvantageAssessment.js.
//
// There is NO scoring here — this assessment only collects and stores answers.
//
// Ids are historical, not sequential: q1–q11 served the June and August rounds
// and were retired when the September set replaced them, so the current
// questions are q12–q18. Never reuse a retired id — stored records from those
// rounds still carry the old meaning, and an id serving two different questions
// makes them impossible to tell apart when the answers are read back together.
//
// The full question text is written into each record below, so a retired
// question stays legible in its own records long after it leaves this file.

const QUESTIONS = {
  q12: {
    text: 'Technology is evolving rapidly, and many technical skills are changing faster than ever. Which ability do you think will be most valuable throughout your engineering journey?',
    options: {
      a: 'Building strong technical knowledge',
      b: 'Learning, adapting and picking up new skills',
      c: 'Thinking creatively and finding new solutions',
      d: 'Understanding yourself, your strengths and how you work best',
    },
  },
  q13: {
    text: 'When you encounter a problem or challenge you have never faced before, what do you usually do?',
    options: {
      a: 'Wait for someone to guide me',
      b: 'Try to understand it, learn independently and experiment',
      c: 'First observe how others approach it',
      d: 'Avoid taking responsibility until I am confident',
    },
  },
  q14: {
    text: 'Which statement best describes where you are currently in your engineering journey?',
    options: {
      a: 'I am mainly focused on getting a good placement/job',
      b: 'I am focused on building skills and exploring career opportunities',
      c: 'I am still figuring out what direction suits me best',
      d: 'I am trying to balance academics, career, personal growth and other priorities',
    },
  },
  q15: {
    text: 'Imagine you achieve the major goals you currently have — a good career, financial security, recognition and the opportunities you are working towards. A few years later, what do you think you would be most likely to focus on?',
    options: {
      a: 'Setting bigger goals and pursuing new achievements',
      b: 'Building greater financial success and security',
      c: 'Exploring what gives me deeper fulfillment and meaning',
      d: 'I am not sure yet',
    },
  },
  q16: {
    text: 'Engineering can open doors to careers, innovation and opportunities not only in India but around the world. As an engineering student, where do you think you can create the greatest impact?',
    options: {
      a: 'Building technology and solutions that solve important problems',
      b: 'Creating businesses, products and opportunities for others',
      c: 'Contributing to society through responsible innovation and meaningful work',
      d: 'I am still exploring where I can make the greatest contribution',
    },
  },
  q17: {
    text: 'What is one question about your engineering journey, career, success, personal growth or future that you genuinely want to understand better?',
    type: 'text',
  },
  q18: {
    text: 'Why would you like to be part of Success Engineering? What would you hope to learn, explore or gain from the journey?',
    type: 'text',
  },
}

export const choiceQuestionIds = ['q12', 'q13', 'q14', 'q15', 'q16']
export const textQuestionIds = ['q17', 'q18']

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
