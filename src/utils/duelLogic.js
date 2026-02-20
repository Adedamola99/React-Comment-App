// ─── CONSTANTS ────────────────────────────────────────────────────────────────
export const PHASES = ["argument", "rebuttal", "closing"];
export const CHAR_LIMIT = 280;
export const POINTS_PER_VOTE = 10;

export const PHASE_META = {
  argument: { label: "Opening Argument", icon: "⚔️", color: "#e85d04" },
  rebuttal: { label: "Rebuttal", icon: "🛡️", color: "#7209b7" },
  closing: { label: "Closing Statement", icon: "🏛️", color: "#0077b6" },
};

export const STATUS_META = {
  in_progress: { label: "In Progress", bg: "bg-orange-100 text-orange-700" },
  awaiting_votes: {
    label: "Awaiting Votes",
    bg: "bg-purple-100 text-purple-700",
  },
  completed: { label: "Completed", bg: "bg-green-100  text-green-700" },
};

const PROFANITY_LIST = ["badword", "spam", "toxic"];

export const containsProfanity = (text) =>
  PROFANITY_LIST.some((w) => text.toLowerCase().includes(w));

export const getNextTurn = (duel) => {
  const sequence = [];
  for (const phase of PHASES) {
    for (const player of duel.players) {
      sequence.push({ phase, player });
    }
  }
  return sequence[duel.turns.length] ?? null;
};

export const submitTurn = (duel, playerId, phase, text) => {
  if (duel.status !== "in_progress")
    throw new Error("This duel is not accepting turns right now.");
  const next = getNextTurn(duel);
  if (!next) throw new Error("All turns are already submitted.");
  if (next.player !== playerId) throw new Error("It's not your turn yet.");
  if (next.phase !== phase)
    throw new Error(`Expected phase: ${PHASE_META[next.phase].label}`);
  if (!text.trim()) throw new Error("Your submission cannot be empty.");
  if (text.length > CHAR_LIMIT)
    throw new Error(`Max ${CHAR_LIMIT} characters allowed.`);
  if (containsProfanity(text))
    throw new Error("Your text contains prohibited language.");
  const newTurns = [
    ...duel.turns,
    { phase, player: playerId, text: text.trim(), createdAt: Date.now() },
  ];
  return {
    ...duel,
    turns: newTurns,
    status: newTurns.length === 6 ? "awaiting_votes" : "in_progress",
  };
};

export const castVote = (duel, voterId, winnerId) => {
  if (duel.status !== "awaiting_votes")
    throw new Error("This duel is not open for voting.");
  if (duel.players.includes(voterId))
    throw new Error("Players can't vote on their own duel.");
  if (duel.votes?.[voterId])
    throw new Error("You have already voted on this duel.");
  if (!duel.players.includes(winnerId))
    throw new Error("Invalid winner selection.");
  return { ...duel, votes: { ...(duel.votes ?? {}), [voterId]: winnerId } };
};

export const scoreBreakdown = (duel, playerId) => {
  const voteCount = Object.values(duel.votes ?? {}).filter(
    (v) => v === playerId,
  ).length;
  const playerTurns = duel.turns.filter((t) => t.player === playerId);
  const totalChars = playerTurns.reduce((sum, t) => sum + t.text.length, 0);
  const sentences = playerTurns.reduce(
    (sum, t) => sum + (t.text.match(/[.!?]+/g) ?? []).length,
    0,
  );
  const votePoints = voteCount * POINTS_PER_VOTE;
  const lengthBonus = Math.min(5, Math.floor(totalChars / 100));
  const clarityBonus = sentences >= 1 && sentences < 5 ? 2 : 0;
  return {
    voteCount,
    votePoints,
    lengthBonus,
    clarityBonus,
    total: votePoints + lengthBonus + clarityBonus,
  };
};

export const calculateResult = (duel) => {
  const [p1, p2] = duel.players;
  const s1 = scoreBreakdown(duel, p1).total;
  const s2 = scoreBreakdown(duel, p2).total;
  const draw = s1 === s2;
  return {
    winner: draw ? null : s1 > s2 ? p1 : p2,
    scores: { [p1]: s1, [p2]: s2 },
    draw,
  };
};

export const createDuel = (motion, players) => ({
  id: "duel_" + Math.random().toString(36).slice(2, 9),
  motion,
  players,
  turns: [],
  status: "in_progress",
  votes: {},
  result: null,
  createdAt: Date.now(),
});

export const createUser = (displayName) => ({
  id: "user_" + Math.random().toString(36).slice(2, 9),
  displayName,
  rating: 1200,
  points: 0,
  wins: 0,
  losses: 0,
  createdAt: Date.now(),
});
