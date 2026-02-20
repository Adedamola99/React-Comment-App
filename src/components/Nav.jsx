export default function Nav({
  view,
  setView,
  currentUser,
  onLoginClick,
  activeDuels,
  votingDuels,
}) {
  const links = [
    { id: "home", label: "Home" },
    { id: "duels", label: `Duels (${activeDuels})` },
    { id: "vote", label: `Vote (${votingDuels})` },
    { id: "leaderboard", label: "Leaderboard" },
    { id: "profile", label: "Profile" },
  ];

  return (
    <nav className="bg-ink px-6 flex items-center gap-8 h-14 sticky top-0 z-40 shadow-lg">
      <span className="font-display text-gold text-xl font-black tracking-tight mr-auto">
        ⚔️ Debate Duels
      </span>

      <div className="hidden sm:flex items-center gap-6">
        {links.map((l) => (
          <button
            key={l.id}
            className={`nav-link ${view === l.id ? "active" : ""}`}
            onClick={() => setView(l.id)}
            aria-current={view === l.id ? "page" : undefined}
          >
            {l.label}
          </button>
        ))}
      </div>

      <button
        className="btn btn-secondary btn-sm whitespace-nowrap"
        onClick={onLoginClick}
        aria-label="Switch player"
      >
        👤 {currentUser ? currentUser.displayName : "Login"}
      </button>

      {/* Mobile nav dropdown hint */}
      <div className="sm:hidden flex gap-3">
        {links.map((l) => (
          <button
            key={l.id}
            className={`text-xs ${view === l.id ? "text-gold" : "text-gray-500"}`}
            onClick={() => setView(l.id)}
          >
            {l.id === "home"
              ? "🏠"
              : l.id === "duels"
                ? "⚔️"
                : l.id === "vote"
                  ? "🗳️"
                  : l.id === "leaderboard"
                    ? "🏆"
                    : "👤"}
          </button>
        ))}
      </div>
    </nav>
  );
}
