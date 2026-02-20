export const SEED_DATA = {
  users: {
    user_alice: {
      id: "user_alice",
      displayName: "Alice",
      rating: 1250,
      points: 120,
      wins: 3,
      losses: 1,
      createdAt: 1700000000000,
    },
    user_bob: {
      id: "user_bob",
      displayName: "Bob",
      rating: 1180,
      points: 95,
      wins: 2,
      losses: 2,
      createdAt: 1700000000000,
    },
    user_carol: {
      id: "user_carol",
      displayName: "Carol",
      rating: 1310,
      points: 200,
      wins: 5,
      losses: 0,
      createdAt: 1700000000000,
    },
  },
  duels: {
    duel_demo: {
      id: "duel_demo",
      motion: "Should schools ban homework?",
      players: ["user_alice", "user_bob"],
      turns: [
        {
          phase: "argument",
          player: "user_alice",
          text: "Homework steals childhood. Kids need unstructured time to develop creativity and vital social skills that no worksheet can teach.",
          createdAt: 1700000000000,
        },
        {
          phase: "argument",
          player: "user_bob",
          text: "Homework builds discipline and reinforces classroom lessons. Without deliberate practice, knowledge fades — that's just how memory works.",
          createdAt: 1700000001000,
        },
        {
          phase: "rebuttal",
          player: "user_alice",
          text: "Discipline can be built through sports, music, and collaborative projects — without adding pressure and anxiety at home after long school days.",
          createdAt: 1700000002000,
        },
        {
          phase: "rebuttal",
          player: "user_bob",
          text: "Research consistently shows that spaced repetition is key to long-term retention. Homework is precisely the mechanism that enables this critical cycle.",
          createdAt: 1700000003000,
        },
        {
          phase: "closing",
          player: "user_alice",
          text: "Learning should be joyful, not a burden. Let's trust children to own their curiosity and rediscover a love of learning on their own terms.",
          createdAt: 1700000004000,
        },
        {
          phase: "closing",
          player: "user_bob",
          text: "Preparation matters for exams and life. Homework, done well, is the bridge between classroom knowledge and real-world readiness.",
          createdAt: 1700000005000,
        },
      ],
      status: "awaiting_votes",
      votes: {},
      result: null,
      createdAt: 1700000000000,
    },
  },
};

export const SAMPLE_MOTIONS = [
  "Should AI replace human judges?",
  "Is social media doing more harm than good?",
  "Should voting be mandatory?",
  "Is space exploration worth the cost?",
  "Should universities be free?",
  "Should junk food be taxed heavily?",
  "Is remote work better than office work?",
  "Should social media have an age limit of 18?",
];
