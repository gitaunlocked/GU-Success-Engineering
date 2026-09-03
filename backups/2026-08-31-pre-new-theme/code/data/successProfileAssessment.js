// Success Profile Assessment — questions, scoring, and result copy
// Shareable link: https://www.gitaunlocked.com/assessment

export const assessmentMeta = {
  title: "Success Profile Assessment",
  subtitle: "Discover Your Edge in the Age of AI",
  duration: "8 Questions • 2 Minutes",
  sharePath: "/assessment",
};

export const questions = [
  {
    id: "q1",
    text: "When a new technology like AI emerges, what is usually your first reaction?",
    measure: "AI Adaptability",
    type: "choice",
    options: [
      { id: "explore", label: "I immediately explore and experiment with it", score: 100 },
      { id: "learn-later", label: "I learn about it after some time", score: 75 },
      { id: "wait", label: "I wait until it becomes necessary", score: 50 },
      { id: "overwhelmed", label: "I feel overwhelmed by rapid change", score: 25 },
    ],
  },
  {
    id: "q2",
    text: "Which statement best describes you today?",
    measure: "Career Clarity",
    type: "choice",
    options: [
      { id: "clear", label: "I have a clear career direction", score: 100 },
      { id: "few-paths", label: "I have a few possible paths in mind", score: 75 },
      { id: "exploring", label: "I am still exploring options", score: 50 },
      { id: "confused", label: "I feel confused about my future", score: 25 },
    ],
  },
  {
    id: "q3",
    text: "What excites you the most right now?",
    measure: "Funnel",
    type: "choice",
    funnel: true,
    options: [
      { id: "career", label: "Building a strong career" },
      { id: "placements", label: "Securing internships/placements" },
      { id: "growth", label: "Becoming a better version of myself" },
      { id: "wisdom", label: "Gaining deeper knowledge and wisdom" },
    ],
  },
  {
    id: "q4",
    text: "How often do you intentionally invest time in your personal growth?",
    measure: "Growth Potential",
    type: "choice",
    options: [
      { id: "daily", label: "Every day", score: 100 },
      { id: "weekly", label: "Every week", score: 75 },
      { id: "occasionally", label: "Occasionally", score: 50 },
      { id: "rarely", label: "Rarely", score: 25 },
    ],
  },
  {
    id: "q5",
    text: "If AI could perform 80% of your future job, what would make you valuable?",
    measure: "Human Edge",
    type: "choice",
    options: [
      { id: "technical", label: "Technical expertise", score: 70 },
      { id: "creativity", label: "Creativity", score: 85 },
      { id: "communication", label: "Communication", score: 80 },
      { id: "leadership", label: "Leadership", score: 75 },
      { id: "adaptability", label: "Adaptability", score: 90 },
    ],
  },
  {
    id: "q6",
    text: "Have you attended career, AI, leadership, or self-development sessions before?",
    measure: "Session Experience",
    type: "choice-with-followup",
    options: [
      { id: "many", label: "Many times", score: 100 },
      { id: "few", label: "A few times", score: 75 },
      { id: "once", label: "Once or twice", score: 50 },
      { id: "never", label: "Never", score: 30 },
    ],
    followup: {
      id: "q6-followup",
      text: "What was the most impactful session you've attended?",
      placeholder: "Share the session topic, speaker, or what stood out…",
      optional: true,
    },
  },
  {
    id: "q7",
    text: "Which area would create the biggest positive change in your life right now?",
    measure: "Priority Area",
    type: "choice",
    options: [
      { id: "focus", label: "More focus and discipline", score: 65 },
      { id: "confidence", label: "Greater confidence", score: 75 },
      { id: "career", label: "Career clarity", score: 80 },
      { id: "communication", label: "Better communication skills", score: 70 },
      { id: "strengths", label: "Understanding my strengths", score: 100 },
      { id: "purpose", label: "A stronger sense of purpose", score: 95 },
    ],
  },
  {
    id: "q8",
    text: "If you could gain one outcome from Success Engineering, what would it be?",
    measure: "Expected Outcome",
    type: "choice",
    options: [
      { id: "ai-readiness", label: "AI & future readiness insights" },
      { id: "placement", label: "Placement & internship guidance" },
      { id: "roadmap", label: "A roadmap for success" },
      { id: "potential", label: "Understanding my potential" },
      { id: "wisdom", label: "Practical wisdom for life" },
    ],
  },
];

const tier = (score) => {
  if (score >= 80) return { label: "Strong", color: "#D61C75" };
  if (score >= 55) return { label: "Growing", color: "#FF7A00" };
  return { label: "Emerging", color: "#7A10FF" };
};

const insight = {
  aiAdaptability: (s) =>
    s >= 80
      ? "You lean into change — a powerful edge as AI reshapes every field."
      : s >= 55
        ? "You're open to new tech; small experiments will accelerate your adaptability."
        : "Start with one AI tool this week — curiosity beats waiting for the perfect moment.",
  careerClarity: (s) =>
    s >= 80
      ? "You have direction — Success Engineering can sharpen your next moves."
      : s >= 55
        ? "You're weighing paths — clarity comes from exposure to real practitioners."
        : "Exploration is normal — structured guidance can turn confusion into a plan.",
  growthPotential: (s) =>
    s >= 80
      ? "You invest in yourself consistently — that's the habit behind every breakthrough."
      : s >= 55
        ? "You grow regularly — turning that into a weekly ritual will compound fast."
        : "Even 15 minutes a week of intentional growth creates momentum over time.",
  selfAwareness: (s) =>
    s >= 80
      ? "You know what drives you — leverage that self-knowledge in career decisions."
      : s >= 55
        ? "You're building self-understanding — reflection plus feedback accelerates it."
        : "Discovering your strengths is a journey — assessments and mentors help you see clearly.",
};

export function computeScores(answers) {
  const pick = (qId) => answers[qId]?.optionId;
  const scoreFor = (qId) => {
    const q = questions.find((item) => item.id === qId);
    const optionId = pick(qId);
    return q?.options?.find((o) => o.id === optionId)?.score ?? null;
  };

  const aiAdaptability = scoreFor("q1") ?? 0;
  const careerClarity = scoreFor("q2") ?? 0;
  const growthPotential = scoreFor("q4") ?? 0;

  const q5 = scoreFor("q5") ?? 0;
  const q6 = scoreFor("q6") ?? 0;
  const q7 = scoreFor("q7") ?? 0;
  const followupBonus = answers["q6-followup"]?.text?.trim() ? 5 : 0;
  const selfAwareness = Math.min(100, Math.round((q5 + q6 + q7) / 3) + followupBonus);

  const dimensions = [
    {
      key: "aiAdaptability",
      title: "AI Adaptability Score",
      score: aiAdaptability,
      ...tier(aiAdaptability),
      insight: insight.aiAdaptability(aiAdaptability),
    },
    {
      key: "careerClarity",
      title: "Career Clarity Score",
      score: careerClarity,
      ...tier(careerClarity),
      insight: insight.careerClarity(careerClarity),
    },
    {
      key: "growthPotential",
      title: "Growth Potential Score",
      score: growthPotential,
      ...tier(growthPotential),
      insight: insight.growthPotential(growthPotential),
    },
    {
      key: "selfAwareness",
      title: "Self-Awareness Score",
      score: selfAwareness,
      ...tier(selfAwareness),
      insight: insight.selfAwareness(selfAwareness),
    },
  ];

  const overall = Math.round(
    dimensions.reduce((sum, d) => sum + d.score, 0) / dimensions.length,
  );

  return { dimensions, overall, ...tier(overall) };
}

export function serializeAnswers(answers) {
  const out = {};
  for (const q of questions) {
    const a = answers[q.id];
    if (!a?.optionId) continue;
    const option = q.options.find((o) => o.id === a.optionId);
    out[q.id] = {
      optionId: a.optionId,
      label: option?.label ?? a.optionId,
      measure: q.measure,
    };
    if (q.followup && answers[q.followup.id]?.text?.trim()) {
      out[q.followup.id] = {
        text: answers[q.followup.id].text.trim(),
      };
    }
  }
  return out;
}
