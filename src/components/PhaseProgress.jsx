import { PHASES, PHASE_META } from "../utils/duelLogic";

export default function PhaseProgress({ turns, nextTurn }) {
  const phaseCount = {};
  for (const t of turns) {
    phaseCount[t.phase] = (phaseCount[t.phase] || 0) + 1;
  }

  return (
    <div className="flex" role="list" aria-label="Phase progress">
      {PHASES.map((ph) => {
        const done = (phaseCount[ph] || 0) === 2;
        const active = !done && nextTurn?.phase === ph;
        const meta = PHASE_META[ph];

        return (
          <div
            key={ph}
            role="listitem"
            className={`flex-1 text-center py-2.5 px-1 text-xs font-bold uppercase tracking-wide border-b-2 transition-all duration-300 ${
              done
                ? "border-green-500 text-green-600"
                : active
                  ? "border-ember text-ember"
                  : "border-border text-muted"
            }`}
          >
            {meta.icon} {meta.label}
            {done && " ✓"}
          </div>
        );
      })}
    </div>
  );
}
