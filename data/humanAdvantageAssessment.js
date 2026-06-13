// The Human Advantage Series — Application (Shortlisting) Assessment
// Shareable link: https://www.gitaunlocked.com/human-advantage
//
// Design notes:
//   - 8 multiple-choice questions (q1–q8) + 2 short-response questions (q9–q10).
//   - There is NO scoring. Responses are collected for shortlisting only.
//   - No section tags / labels are shown — questions stand on their own.

export const assessmentMeta = {
  title: "The Human Advantage Series",
  subtitle:
    "Application Assessment — a short reflection to help us understand you. Selected applicants will be contacted.",
  duration: "10 Questions • 5 Minutes",
  sharePath: "/human-advantage",
  instructions:
    "Answer honestly — there are no right or wrong answers. This is an application, and we'll reach out to those who are shortlisted.",
};

export const questions = [
  {
    id: "q1",
    text: "AI can increasingly perform tasks involving information processing, analysis, and problem-solving. Which human ability do you believe will become most valuable in the coming decade?",
    type: "choice",
    options: [
      { id: "a", label: "Technical knowledge" },
      { id: "b", label: "Ability to learn and adapt" },
      { id: "c", label: "Creativity and innovation" },
      { id: "d", label: "Understanding oneself and others" },
    ],
  },
  {
    id: "q2",
    text: "When faced with an unfamiliar challenge, what is your usual approach?",
    type: "choice",
    options: [
      { id: "a", label: "Wait for guidance" },
      { id: "b", label: "Learn independently and experiment" },
      { id: "c", label: "Observe how others solve it first" },
      { id: "d", label: "Avoid taking responsibility until necessary" },
    ],
  },
  {
    id: "q3",
    text: "Which statement best describes your current focus?",
    type: "choice",
    options: [
      { id: "a", label: "Securing a good placement/job" },
      { id: "b", label: "Building skills and career opportunities" },
      { id: "c", label: "Understanding what I truly want from life" },
      { id: "d", label: "Trying to balance all of the above" },
    ],
  },
  {
    id: "q4",
    text: "Imagine that you achieve everything you currently desire: a successful career, financial security, recognition, and the goals you have set for yourself. A few years later, you still feel that something is missing. What would you most likely do?",
    type: "choice",
    options: [
      { id: "a", label: "Set bigger goals and chase new achievements" },
      { id: "b", label: "Focus on gaining more wealth and success" },
      { id: "c", label: "Explore deeper questions about purpose, fulfillment, and meaning" },
      { id: "d", label: "Assume this feeling is normal and ignore it" },
    ],
  },
  {
    id: "q5",
    text: "Have you ever attended any session, workshop, course, or discussion related to topics such as self-development, purpose, happiness, philosophy, mindfulness, or personal growth?",
    type: "choice",
    options: [
      { id: "a", label: "Frequently" },
      { id: "b", label: "A few times" },
      { id: "c", label: "Once or twice" },
      { id: "d", label: "Never" },
    ],
  },
  {
    id: "q6",
    text: "When making an important decision, what influences you the most?",
    type: "choice",
    options: [
      { id: "a", label: "Logic and facts" },
      { id: "b", label: "Advice from others" },
      { id: "c", label: "My values and principles" },
      { id: "d", label: "A combination of the above" },
    ],
  },
  {
    id: "q7",
    text: "Which question interests you the most?",
    type: "choice",
    options: [
      { id: "a", label: "How can I build a successful career?" },
      { id: "b", label: "How can I become a better leader?" },
      { id: "c", label: "What creates lasting happiness and fulfillment?" },
      { id: "d", label: "How can society solve major future challenges?" },
    ],
  },
  {
    id: "q8",
    text: "How often do you spend time reflecting on your life, choices, or future direction?",
    type: "choice",
    options: [
      { id: "a", label: "Regularly" },
      { id: "b", label: "Occasionally" },
      { id: "c", label: "Rarely" },
      { id: "d", label: "Almost never" },
    ],
  },
  {
    id: "q9",
    text: "What is one question about life, success, happiness, purpose, human potential, or the future that you genuinely want to understand better?",
    type: "text",
    placeholder: "2–4 sentences…",
  },
  {
    id: "q10",
    text: "Why would you like to be selected for The Human Advantage Series? What do you hope to gain from this journey?",
    type: "text",
    placeholder: "3–5 sentences…",
  },
];

export const choiceQuestionIds = questions
  .filter((q) => q.type === "choice")
  .map((q) => q.id);

export const textQuestionIds = questions
  .filter((q) => q.type === "text")
  .map((q) => q.id);
