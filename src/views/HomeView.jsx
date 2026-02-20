import DuelListCard from "../components/DuelListCard";

export default function HomeView({
  currentUser,
  duels,
  users,
  onCreateDuel,
  onOpenDuel,
  onExport,
  onImport,
  activeDuels,
  votingDuels,
  completedDuels,
}) {
  const recentDuels = Object.values(duels).slice(-6).reverse();

  return (
    <div>
      {/* Hero */}
      <section className="text-center py-14 px-4">
        <h1 className="font-display text-5xl sm:text-6xl leading-tight text-ink mb-4">
          Where Arguments
          <br />
          <span className="text-ember">Become Duels</span>
        </h1>
        <p className="text-muted text-lg max-w-xl mx-auto mb-8 leading-relaxed">
          Face off in structured three-phase debates. Submit arguments,
          rebuttals, and closings. Let the community decide who won.
        </p>

        <div className="flex flex-wrap gap-3 justify-center">
          <button className="btn btn-primary btn-lg" onClick={onCreateDuel}>
            ⚔️ Create a Duel
          </button>
          <label className="btn btn-secondary btn-lg cursor-pointer">
            📥 Import Data
            <input
              type="file"
              accept=".json"
              className="hidden"
              onChange={(e) => e.target.files[0] && onImport(e.target.files[0])}
              aria-label="Import data from JSON file"
            />
          </label>
          <button className="btn btn-ghost btn-lg" onClick={onExport}>
            📤 Export Data
          </button>
        </div>
      </section>

      {/* Stats strip */}
      <div className="grid grid-cols-3 gap-4 mb-10">
        {[
          { val: activeDuels.length, label: "Active Duels", icon: "⚔️" },
          { val: votingDuels.length, label: "Awaiting Votes", icon: "🗳️" },
          { val: completedDuels.length, label: "Completed", icon: "🏆" },
        ].map((s) => (
          <div key={s.label} className="stat-pill">
            <div className="text-3xl mb-1">{s.icon}</div>
            <div className="font-display text-3xl font-black text-ink">
              {s.val}
            </div>
            <div className="text-xs text-muted uppercase tracking-wide mt-0.5">
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* How to play */}
      <div className="card mb-8">
        <h2 className="text-xl mb-4 text-ink">How it works</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            {
              step: "1",
              icon: "⚔️",
              title: "Create a Duel",
              desc: "Pick a motion and challenge another player.",
            },
            {
              step: "2",
              icon: "🗣️",
              title: "Debate in 3 Phases",
              desc: "Argument → Rebuttal → Closing. 280 chars each.",
            },
            {
              step: "3",
              icon: "🗳️",
              title: "Community Votes",
              desc: "Spectators vote. Scores calculated transparently.",
            },
          ].map((h) => (
            <div key={h.step} className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-ember text-white flex items-center justify-center font-black text-sm flex-shrink-0 mt-0.5">
                {h.step}
              </div>
              <div>
                <div className="font-semibold text-ink text-sm mb-0.5">
                  {h.icon} {h.title}
                </div>
                <div className="text-xs text-muted leading-relaxed">
                  {h.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent duels */}
      {recentDuels.length > 0 && (
        <section>
          <h2 className="text-xl text-ink mb-4">Recent Duels</h2>
          <div className="flex flex-col gap-3">
            {recentDuels.map((d) => (
              <DuelListCard
                key={d.id}
                duel={d}
                users={users}
                onClick={() => onOpenDuel(d.id)}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
