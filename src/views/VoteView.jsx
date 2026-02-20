export default function VoteView({
  duels,
  users,
  currentUser,
  onVote,
  onClose,
  onOpen,
}) {
  if (duels.length === 0) {
    return (
      <div>
        <h2 className="text-2xl text-ink mb-6">🗳️ Voting</h2>
        <div className="text-center py-16 text-muted">
          <div className="text-5xl mb-3">🗳️</div>
          <p className="font-semibold">No duels open for voting</p>
          <p className="text-sm mt-1">
            Complete a duel to open it for community votes.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl text-ink mb-6">🗳️ Vote on Duels</h2>
      <div className="flex flex-col gap-5">
        {duels.map((d) => {
          const [p1id, p2id] = d.players;
          const p1 = users[p1id] ?? { displayName: p1id };
          const p2 = users[p2id] ?? { displayName: p2id };
          const voteCount = Object.keys(d.votes ?? {}).length;
          const iHaveVoted = currentUser && d.votes?.[currentUser.id];
          const isPlayer = currentUser && d.players.includes(currentUser.id);

          return (
            <div key={d.id} className="card">
              {/* Motion */}
              <div className="motion-display mb-4">"{d.motion}"</div>

              {/* VS row */}
              <div className="grid grid-cols-3 items-center gap-2 mb-4">
                <div className="text-center">
                  <div className="font-bold text-ink">{p1.displayName}</div>
                  <div className="text-xs text-muted">
                    ⭐ {p1.rating ?? 1200}
                  </div>
                </div>
                <div className="text-center font-black text-border text-lg">
                  VS
                </div>
                <div className="text-center">
                  <div className="font-bold text-ink">{p2.displayName}</div>
                  <div className="text-xs text-muted">
                    ⭐ {p2.rating ?? 1200}
                  </div>
                </div>
              </div>

              <p className="text-xs text-muted mb-4">
                {voteCount} vote{voteCount !== 1 ? "s" : ""} cast so far
              </p>

              {/* Vote actions */}
              {isPlayer ? (
                <div className="flex flex-wrap gap-3">
                  <button
                    className="btn btn-secondary"
                    onClick={() => onOpen(d.id)}
                  >
                    📜 View Transcript
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => onClose(d.id)}
                  >
                    🏁 Finalize Result
                  </button>
                </div>
              ) : iHaveVoted ? (
                <div className="flex items-center justify-between">
                  <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-2.5 text-sm text-green-700">
                    ✅ You voted for{" "}
                    <strong>
                      {(users[d.votes[currentUser.id]] ?? {}).displayName}
                    </strong>
                  </div>
                  <button
                    className="btn btn-ghost btn-sm"
                    onClick={() => onOpen(d.id)}
                  >
                    View →
                  </button>
                </div>
              ) : currentUser ? (
                <div className="flex flex-col gap-3">
                  <button
                    className="btn btn-ghost btn-sm self-start"
                    onClick={() => onOpen(d.id)}
                  >
                    📜 Read full transcript first
                  </button>
                  <div className="grid grid-cols-2 gap-3">
                    {[p1id, p2id].map((pid) => (
                      <button
                        key={pid}
                        className="btn btn-ocean justify-center"
                        onClick={() => onVote(d.id, currentUser.id, pid)}
                        aria-label={`Vote for ${(users[pid] ?? { displayName: pid }).displayName}`}
                      >
                        Vote for{" "}
                        {(users[pid] ?? { displayName: pid }).displayName}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-cream border border-border rounded-lg px-4 py-3 text-sm text-muted">
                  Log in to cast your vote.
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
