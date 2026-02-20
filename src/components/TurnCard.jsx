import { PHASE_META } from "../utils/duelLogic";

export default function TurnCard({ turn, user }) {
  const meta = PHASE_META[turn.phase];

  return (
    <div
      className="turn-card"
      style={{ borderLeftColor: meta.color }}
      aria-label={`${meta.label} by ${user?.displayName || turn.player}`}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <span
          className="phase-pill text-xs"
          style={{ background: meta.color + "22", color: meta.color }}
        >
          {meta.icon} {meta.label}
        </span>
        <span className="font-semibold text-sm text-ink">
          {user?.displayName || turn.player}
        </span>
        <span className="ml-auto text-xs text-muted tabular-nums">
          {new Date(turn.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>

      {/* Content */}
      <p className="text-sm text-gray-700 leading-relaxed">{turn.text}</p>
    </div>
  );
}
