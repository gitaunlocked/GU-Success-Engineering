// Human Potential Assessment — Session 2 ("The Hidden Dimension")
// Questions, scoring, and result copy.
// Shareable link: https://www.gitaunlocked.com/human-potential
//
// Design notes:
//   - 7 multiple-choice questions (q1–q7) are scored.
//   - 3 short-answer questions (q8–q10) are reflective; they are saved and
//     echoed back in the report, but never scored.
//   - The report intentionally avoids jargon labels (no "SQ", "EQ", etc.).
//     It groups the seven scored questions into four plain-language strengths.

export const assessmentMeta = {
  title: "Human Potential Assessment",
  subtitle:
    "In an age where intelligence is becoming abundant, discover what truly makes you stand out.",
  duration: "10 Questions • 3 Minutes",
  sharePath: "/human-potential",
  instructions:
    "Select the option that best reflects you. There are no right or wrong answers — answer honestly to receive meaningful insights.",
};

export const questions = [
  {
    id: "q1",
    section: "The AI Advantage",
    text: "A powerful new AI tool emerges that could significantly improve how you study or work.",
    type: "choice",
    options: [
      { id: "a", label: "I usually ignore such tools unless required.", score: 25 },
      { id: "b", label: "I wait until others validate its usefulness.", score: 50 },
      { id: "c", label: "I explore it and use it occasionally.", score: 75 },
      { id: "d", label: "I actively experiment with it and integrate it into my workflow.", score: 100 },
    ],
  },
  {
    id: "q2",
    section: "Solving Difficult Problems",
    text: "When faced with a challenging problem with no obvious solution, I typically:",
    type: "choice",
    options: [
      { id: "a", label: "Feel stuck and seek immediate guidance.", score: 25 },
      { id: "b", label: "Try a few approaches and move on if progress is slow.", score: 50 },
      { id: "c", label: "Break it into smaller parts and work systematically.", score: 80 },
      { id: "d", label: "Enjoy the challenge and persist until I gain clarity.", score: 100 },
    ],
  },
  {
    id: "q3",
    section: "Handling Pressure",
    text: "When important deadlines, exams, or responsibilities begin to pile up:",
    type: "choice",
    options: [
      { id: "a", label: "I become overwhelmed and lose focus.", score: 25 },
      { id: "b", label: "I manage to cope, though stress affects my performance.", score: 55 },
      { id: "c", label: "I prioritize tasks and remain reasonably focused.", score: 80 },
      { id: "d", label: "I stay calm, adapt quickly, and continue performing effectively.", score: 100 },
    ],
  },
  {
    id: "q4",
    section: "Learning from Failure",
    text: "After experiencing a major setback or disappointment, I usually:",
    type: "choice",
    options: [
      { id: "a", label: "Lose motivation for a significant period.", score: 25 },
      { id: "b", label: "Move on but avoid similar risks in the future.", score: 50 },
      { id: "c", label: "Reflect on lessons learned and try again.", score: 80 },
      { id: "d", label: "Treat it as feedback and use it to improve immediately.", score: 100 },
    ],
  },
  {
    id: "q5",
    section: "Working with Others",
    text: "When collaborating with people whose opinions or working styles differ from mine:",
    type: "choice",
    options: [
      { id: "a", label: "I avoid engagement whenever possible.", score: 25 },
      { id: "b", label: "I tolerate differences and focus only on my responsibilities.", score: 50 },
      { id: "c", label: "I try to understand their perspective and work effectively together.", score: 80 },
      { id: "d", label: "I actively leverage diverse viewpoints to improve outcomes.", score: 100 },
    ],
  },
  {
    id: "q6",
    section: "Long-Term Decisions",
    text: "When choosing between opportunities, I am most likely to prioritize:",
    type: "choice",
    options: [
      { id: "a", label: "Immediate rewards and convenience.", score: 35 },
      { id: "b", label: "Prestige and external recognition.", score: 55 },
      { id: "c", label: "Long-term growth and learning.", score: 85 },
      { id: "d", label: "Alignment with both growth and my broader life direction.", score: 100 },
    ],
  },
  {
    id: "q7",
    section: "The Future of Human Value",
    text: "As AI becomes increasingly capable, which quality do you believe will become most valuable?",
    type: "choice",
    options: [
      { id: "a", label: "Technical expertise alone.", score: 50 },
      { id: "b", label: "Speed and efficiency.", score: 45 },
      { id: "c", label: "Communication and collaboration.", score: 80 },
      { id: "d", label: "Judgment, self-awareness, and wise decision-making.", score: 100 },
    ],
  },
  {
    id: "q8",
    section: "Beyond Achievement",
    text: "If you were to achieve every academic, career, and financial goal you currently have, what would you ultimately hope to gain from that success?",
    type: "text",
    optional: false,
    placeholder: "Take a moment — what are you really after beneath the goals?",
  },
  {
    id: "q9",
    section: "The Modern Challenge",
    text: "In your opinion, what is the single biggest challenge facing young people today?",
    type: "text",
    optional: false,
    placeholder: "Share what you genuinely feel is the biggest challenge…",
  },
  {
    id: "q10",
    section: "The Bigger Question",
    text: "What is one question about life, success, happiness, or human potential that you genuinely wish you understood better?",
    type: "text",
    optional: false,
    placeholder: "The one question you'd love a real answer to…",
  },
];

// Four plain-language strengths, each built from specific scored questions.
const DIMENSIONS = [
  {
    key: "futureReadiness",
    title: "Future Readiness",
    questionIds: ["q1", "q7"],
    insight: (s) =>
      s >= 80
        ? "You lean into new tools and value uniquely human judgment — exactly the mindset that thrives as AI reshapes every field."
        : s >= 55
          ? "You're open to change. Turning occasional curiosity into deliberate experimentation will sharpen your edge fast."
          : "The biggest shift is starting. Picking up one new tool and trusting your own judgment will compound quickly.",
  },
  {
    key: "resilience",
    title: "Resilience & Composure",
    questionIds: ["q3", "q4"],
    insight: (s) =>
      s >= 80
        ? "Pressure and setbacks don't shake you for long — you recover, learn, and keep performing. This steadiness is rare."
        : s >= 55
          ? "You cope well, though stress and disappointment still cost you some momentum. Small recovery habits will protect your focus."
          : "Setbacks hit hard right now. Learning to treat them as feedback — not verdicts — is one of the highest-leverage skills you can build.",
  },
  {
    key: "problemSolving",
    title: "Problem-Solving",
    questionIds: ["q2"],
    insight: (s) =>
      s >= 80
        ? "You break hard problems down and stay with them until they yield. That persistence is where real capability is forged."
        : s >= 55
          ? "You make progress on tough problems. Building a habit of structuring them before reacting will take you further."
          : "Hard problems feel stuck right now. A simple practice — break it into parts, attempt one — turns paralysis into progress.",
  },
  {
    key: "peopleAndDirection",
    title: "People & Direction",
    questionIds: ["q5", "q6"],
    insight: (s) =>
      s >= 80
        ? "You work well across differences and choose opportunities aligned with long-term growth and meaning — a powerful combination."
        : s >= 55
          ? "You collaborate and think ahead. Actively seeking out different viewpoints will deepen both your relationships and your decisions."
          : "There's room to engage more with others and to weigh decisions beyond the immediate. Both quietly shape where you end up.",
  },
];

const tier = (score) => {
  if (score >= 80) return { label: "Strong", color: "#D61C75" };
  if (score >= 55) return { label: "Growing", color: "#FF7A00" };
  return { label: "Emerging", color: "#7A10FF" };
};

const scoredQuestionIds = questions
  .filter((q) => q.type === "choice")
  .map((q) => q.id);

const textQuestionIds = questions
  .filter((q) => q.type === "text")
  .map((q) => q.id);

export { scoredQuestionIds, textQuestionIds };

export function computeScores(answers) {
  const scoreFor = (qId) => {
    const q = questions.find((item) => item.id === qId);
    const optionId = answers[qId]?.optionId;
    return q?.options?.find((o) => o.id === optionId)?.score ?? 0;
  };

  const dimensions = DIMENSIONS.map((dim) => {
    const avg = Math.round(
      dim.questionIds.reduce((sum, qId) => sum + scoreFor(qId), 0) /
        dim.questionIds.length,
    );
    return {
      key: dim.key,
      title: dim.title,
      score: avg,
      ...tier(avg),
      insight: dim.insight(avg),
    };
  });

  const overall = Math.round(
    dimensions.reduce((sum, d) => sum + d.score, 0) / dimensions.length,
  );

  return { dimensions, overall, ...tier(overall) };
}

export function serializeAnswers(answers) {
  const out = {};
  for (const q of questions) {
    if (q.type === "choice") {
      const a = answers[q.id];
      if (!a?.optionId) continue;
      const option = q.options.find((o) => o.id === a.optionId);
      out[q.id] = {
        optionId: a.optionId,
        label: option?.label ?? a.optionId,
        section: q.section,
      };
    } else if (q.type === "text") {
      const text = answers[q.id]?.text?.trim();
      if (text) {
        out[q.id] = { text, section: q.section };
      }
    }
  }
  return out;
}
