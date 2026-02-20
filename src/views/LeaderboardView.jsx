import { useState } from "react";

export default function LeaderboardView({ users }) {
  const [sortBy, setSortBy] = useState("points");

  const sorted = Object.values(users).sort(
    (a, b) => (b[sortBy] ?? 0) - (a[sortBy] ?? 0),
  );

  const sortOptions = [
    { value: "points", label: "Points" },
    { value: "wins", label: "Wins" },
    { value: "rating", label: "Rating" },
  ];

  const rankIcon = (i) =>
    i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : null;

  return (
    <div>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <h2 className="text-2xl text-ink">🏆 Leaderboard</h2>
        <div className="flex gap-2">
          {sortOptions.map((o) => (
            <button
              key={o.value}
              className={`btn btn-sm ${sortBy === o.value ? "btn-primary" : "btn-secondary"}`}
              onClick={() => setSortBy(o.value)}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>

      <div className="card">
        {sorted.length === 0 ? (
          <div className="text-center py-10 text-muted">
            <div className="text-5xl mb-3">🏆</div>
            <p>No players yet</p>
          </div>
        ) : (
          sorted.map((u, i) => {
            const icon = rankIcon(i);
            const winRate =
              (u.wins ?? 0) + (u.losses ?? 0) > 0
                ? Math.round(
                    ((u.wins ?? 0) / ((u.wins ?? 0) + (u.losses ?? 0))) * 100,
                  )
                : 0;

            return (
              <div key={u.id} className="lb-row">
                {/* Rank */}
                <div
                  className={`w-10 text-center font-black text-xl flex-shrink-0 ${
                    i < 3 ? "text-gold" : "text-border"
                  }`}
                >
                  {icon ?? `#${i + 1}`}
                </div>

                {/* Avatar + Name */}
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white font-black text-sm flex-shrink-0"
                    style={{
                      background:
                        i === 0
                          ? "linear-gradient(135deg, #f4a261, #e85d04)"
                          : i === 1
                            ? "linear-gradient(135deg, #adb5bd, #6c757d)"
                            : i === 2
                              ? "linear-gradient(135deg, #cd7f32, #8b4513)"
                              : "#d4c9b8",
                    }}
                  >
                    {u.displayName[0].toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-ink text-sm truncate">
                      {u.displayName}
                    </div>
                    <div className="text-xs text-muted">
                      {winRate}% win rate
                    </div>
                  </div>
                </div>

                {/* W/L */}
                <div className="text-sm text-right tabular-nums hidden sm:block">
                  <span className="text-green-600 font-semibold">
                    W{u.wins ?? 0}
                  </span>
                  <span className="text-muted mx-1">/</span>
                  <span className="text-red-500 font-semibold">
                    L{u.losses ?? 0}
                  </span>
                </div>

                {/* Rating */}
                <div className="text-right min-w-[52px] hidden sm:block">
                  <div className="text-xs text-muted">Rating</div>
                  <div className="font-semibold text-sm text-ink">
                    ⭐ {u.rating ?? 1200}
                  </div>
                </div>

                {/* Primary sort stat */}
                <div className="text-right min-w-[60px]">
                  <div className="text-xs text-muted capitalize">{sortBy}</div>
                  <div className="font-black text-lg font-display text-ink">
                    {u[sortBy] ?? 0}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
