import { scoreBreakdown } from "../utils/duelLogic";

export default function ScoreBreakdown({ duel, users }) {
  const [p1id, p2id] = duel.players;
  const result = duel.result;

  return (
    <div className="space-y-4">
      {[p1id, p2id].map((pid) => {
        const u = users[pid] || { displayName: pid };
        const bd = scoreBreakdown(duel, pid);
        const isW = result?.winner === pid;
        const isDraw = result?.draw;

        return (
          <div
            key={pid}
            className={`rounded-xl p-5 border-2 transition-all ${
              isW && !isDraw
                ? "border-gold bg-amber-50"
                : "border-border bg-cream"
            }`}
          >
            {/* Player header */}
            <div className="flex items-center justify-between mb-3">
              <span className="font-bold text-base text-ink">
                {u.displayName}
                {isW && !isDraw && " 🥇"}
              </span>
              <span className="text-2xl font-black font-display text-ink">
                {bd.total} pts
              </span>
            </div>

            {/* Breakdown rows */}
            <div className="text-sm space-y-0 divide-y divide-cream">
              <div className="score-row">
                <span className="text-muted">Votes × {10}</span>
                <span className="font-semibold">
                  {bd.voteCount} × 10 = {bd.votePoints}
                </span>
              </div>
              <div className="score-row">
                <span className="text-muted">
                  Length bonus <span className="text-xs">(max 5)</span>
                </span>
                <span className="font-semibold">+{bd.lengthBonus}</span>
              </div>
              <div className="score-row">
                <span className="text-muted">Clarity bonus</span>
                <span className="font-semibold">+{bd.clarityBonus}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
