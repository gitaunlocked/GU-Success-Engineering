// The Human Advantage Ecosystem — Application (Shortlisting) Assessment
// Shareable link: https://www.gitaunlocked.com/human-advantage
//
// Design notes:
//   - 5 multiple-choice questions + 2 short-response questions. All compulsory.
//   - There is NO scoring. Responses are collected for shortlisting only.
//   - No section tags / labels are shown — questions stand on their own.
//   - Question ids are historical, not sequential. Earlier rounds used q1–q11;
//     the September set that replaced them is q12–q18. Never reuse a retired id —
//     the stored records from those rounds still carry the old meaning, and an id
//     serving two different questions makes them impossible to tell apart when
//     the answers are read back together.
//   - `subtext` is optional: a second paragraph for questions that set up a
//     scenario before asking the actual question.

export const assessmentMeta = {
  title: "The Human Advantage Ecosystem",
  subtitle:
    "Application Assessment — a short reflection to help us understand you. Selected applicants will be contacted.",
  duration: "7 Questions • 4 Minutes",
  sharePath: "/human-advantage",
  instructions:
    "Answer honestly — there are no right or wrong answers. Every question is required. This is an application, and we'll reach out to those who are shortlisted.",
};

export const questions = [
  {
    id: "q12",
    text: "Technology is evolving rapidly, and many technical skills are changing faster than ever. Which ability do you think will be most valuable throughout your engineering journey?",
    type: "choice",
    options: [
      { id: "a", label: "Building strong technical knowledge" },
      { id: "b", label: "Learning, adapting and picking up new skills" },
      { id: "c", label: "Thinking creatively and finding new solutions" },
      { id: "d", label: "Understanding yourself, your strengths and how you work best" },
    ],
  },
  {
    id: "q13",
    text: "When you encounter a problem or challenge you have never faced before, what do you usually do?",
    type: "choice",
    options: [
      { id: "a", label: "Wait for someone to guide me" },
      { id: "b", label: "Try to understand it, learn independently and experiment" },
      { id: "c", label: "First observe how others approach it" },
      { id: "d", label: "Avoid taking responsibility until I am confident" },
    ],
  },
  {
    id: "q14",
    text: "Which statement best describes where you are currently in your engineering journey?",
    type: "choice",
    options: [
      { id: "a", label: "I am mainly focused on getting a good placement/job" },
      { id: "b", label: "I am focused on building skills and exploring career opportunities" },
      { id: "c", label: "I am still figuring out what direction suits me best" },
      {
        id: "d",
        label:
          "I am trying to balance academics, career, personal growth and other priorities",
      },
    ],
  },
  {
    id: "q15",
    text: "Imagine you achieve the major goals you currently have — a good career, financial security, recognition and the opportunities you are working towards.",
    subtext:
      "A few years later, what do you think you would be most likely to focus on?",
    type: "choice",
    options: [
      { id: "a", label: "Setting bigger goals and pursuing new achievements" },
      { id: "b", label: "Building greater financial success and security" },
      { id: "c", label: "Exploring what gives me deeper fulfillment and meaning" },
      { id: "d", label: "I am not sure yet" },
    ],
  },
  {
    id: "q16",
    text: "Engineering can open doors to careers, innovation and opportunities not only in India but around the world. As an engineering student, where do you think you can create the greatest impact?",
    type: "choice",
    options: [
      { id: "a", label: "Building technology and solutions that solve important problems" },
      { id: "b", label: "Creating businesses, products and opportunities for others" },
      {
        id: "c",
        label:
          "Contributing to society through responsible innovation and meaningful work",
      },
      {
        id: "d",
        label: "I am still exploring where I can make the greatest contribution",
      },
    ],
  },
  {
    id: "q17",
    text: "What is one question about your engineering journey, career, success, personal growth or future that you genuinely want to understand better?",
    type: "text",
    placeholder: "2–4 sentences…",
  },
  {
    id: "q18",
    text: "Why would you like to be part of Success Engineering?",
    subtext: "What would you hope to learn, explore or gain from the journey?",
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
