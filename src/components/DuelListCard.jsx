import { STATUS_META } from "../utils/duelLogic";

export default function DuelListCard({ duel, users, onClick }) {
  const [p1id, p2id] = duel.players;
  const p1 = users[p1id] || { displayName: p1id };
  const p2 = users[p2id] || { displayName: p2id };
  const progress = Math.round((duel.turns.length / 6) * 100);
  const meta = STATUS_META[duel.status] || {
    label: duel.status,
    bg: "bg-gray-100 text-gray-600",
  };

  return (
    <div
      className="duel-list-card"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
      aria-label={`Open duel: ${duel.motion}`}
    >
      {/* Top row */}
      <div className="flex items-center justify-between mb-3">
        <span className={`badge ${meta.bg}`}>{meta.label}</span>
        <span className="text-xs text-muted">
          {new Date(duel.createdAt).toLocaleDateString()}
        </span>
      </div>

      {/* Motion */}
      <p className="font-display italic text-base text-ink mb-3 leading-snug">
        "{duel.motion}"
      </p>

      {/* Players + Progress */}
      <div className="flex items-center gap-3">
        <span className="bg-cream border border-border text-xs font-semibold text-muted px-2 py-0.5 rounded">
          {p1.displayName}
        </span>
        <span className="text-xs text-muted">vs</span>
        <span className="bg-cream border border-border text-xs font-semibold text-muted px-2 py-0.5 rounded">
          {p2.displayName}
        </span>
        <div className="flex-1 h-1.5 bg-cream rounded-full overflow-hidden ml-2">
          <div
            className="h-full bg-ember rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-xs text-muted tabular-nums">
          {duel.turns.length}/6
        </span>
      </div>
    </div>
  );
}
