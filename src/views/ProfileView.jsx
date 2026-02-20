import { STATUS_META } from "../utils/duelLogic";

export default function ProfileView({
  currentUser,
  users,
  duels,
  onSwitchUser,
}) {
  if (!currentUser) {
    return (
      <div className="text-center py-16 text-muted">
        <div className="text-5xl mb-3">👤</div>
        <p className="font-semibold text-ink mb-1">Not logged in</p>
        <p className="text-sm mb-6">
          Select a player to view your profile and duel history.
        </p>
        <button className="btn btn-primary" onClick={onSwitchUser}>
          Login
        </button>
      </div>
    );
  }

  const myDuels = Object.values(duels).filter((d) =>
    d.players.includes(currentUser.id),
  );
  const winRate =
    (currentUser.wins ?? 0) + (currentUser.losses ?? 0) > 0
      ? Math.round(
          ((currentUser.wins ?? 0) /
            ((currentUser.wins ?? 0) + (currentUser.losses ?? 0))) *
            100,
        )
      : 0;

  return (
    <div>
      {/* Profile header card */}
      <div className="card mb-6">
        <div className="flex items-start gap-4 mb-5">
          {/* Avatar */}
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-white font-black text-2xl flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #e85d04, #7209b7)" }}
            aria-hidden="true"
          >
            {currentUser.displayName[0].toUpperCase()}
          </div>

          <div className="flex-1">
            <h2 className="text-2xl text-ink mb-0.5">
              {currentUser.displayName}
            </h2>
            <p className="text-sm text-muted">
              ⭐ {currentUser.rating ?? 1200} Elo rating
            </p>
          </div>

          <button className="btn btn-ghost btn-sm" onClick={onSwitchUser}>
            Switch Player
          </button>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            {
              val: currentUser.wins ?? 0,
              label: "Wins",
              color: "text-green-600",
            },
            {
              val: currentUser.losses ?? 0,
              label: "Losses",
              color: "text-red-500",
            },
            { val: `${winRate}%`, label: "Win Rate", color: "text-ember" },
            {
              val: currentUser.points ?? 0,
              label: "Points",
              color: "text-violet",
            },
          ].map((s) => (
            <div key={s.label} className="stat-pill">
              <div className={`font-display text-3xl font-black ${s.color}`}>
                {s.val}
              </div>
              <div className="text-xs text-muted uppercase tracking-wide mt-0.5">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Duel history */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl text-ink">Duel History</h3>
        <span className="text-sm text-muted">{myDuels.length} total</span>
      </div>

      {myDuels.length === 0 ? (
        <div className="text-center py-12 text-muted">
          <div className="text-4xl mb-3">⚔️</div>
          <p>No duels yet — create one to get started!</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {myDuels.map((d) => {
            const oppId = d.players.find((p) => p !== currentUser.id);
            const opp = users[oppId] ?? { displayName: oppId };
            const isWin = d.result?.winner === currentUser.id;
            const isDraw = d.result?.draw;
            const meta = STATUS_META[d.status] ?? {
              label: d.status,
              bg: "bg-gray-100 text-gray-600",
            };

            return (
              <div
                key={d.id}
                className="card flex items-center gap-4 py-4 px-5"
              >
                {/* Outcome icon */}
                <div className="text-2xl flex-shrink-0">
                  {d.status !== "completed"
                    ? "⚔️"
                    : isDraw
                      ? "🤝"
                      : isWin
                        ? "🏆"
                        : "💔"}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-display italic text-sm text-ink truncate">
                    "{d.motion}"
                  </p>
                  <p className="text-xs text-muted mt-0.5">
                    vs {opp.displayName}
                  </p>
                </div>

                {/* Status / Result badge */}
                {d.status === "completed" ? (
                  <span
                    className={`badge flex-shrink-0 ${
                      isDraw
                        ? "bg-gray-100 text-gray-600"
                        : isWin
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-600"
                    }`}
                  >
                    {isDraw ? "Draw" : isWin ? "Won" : "Lost"}
                  </span>
                ) : (
                  <span className={`badge flex-shrink-0 ${meta.bg}`}>
                    {meta.label}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
