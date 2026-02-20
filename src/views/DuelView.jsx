import { useState } from "react";
import {
  CHAR_LIMIT,
  PHASE_META,
  STATUS_META,
  getNextTurn,
} from "../utils/duelLogic";
import PhaseProgress from "../components/PhaseProgress";
import TurnCard from "../components/TurnCard";
import ScoreBreakdown from "../components/ScoreBreakdown";

export default function DuelView({
  duel,
  users,
  currentUser,
  onSubmitTurn,
  onVote,
  onCloseVoting,
  onBack,
}) {
  const [text, setText] = useState("");

  if (!duel) {
    return (
      <div className="text-center py-16 text-muted">
        <div className="text-5xl mb-3">⚔️</div>
        <p>Duel not found</p>
        <button className="btn btn-ghost mt-4" onClick={onBack}>
          ← Back
        </button>
      </div>
    );
  }

  const [p1id, p2id] = duel.players;
  const p1 = users[p1id] || { displayName: p1id };
  const p2 = users[p2id] || { displayName: p2id };

  const next = getNextTurn(duel);
  const isMyTurn = next && currentUser?.id === next.player;
  const voteCount = Object.keys(duel.votes ?? {}).length;
  const iHaveVoted = currentUser && duel.votes?.[currentUser.id];
  const isPlayer = currentUser && duel.players.includes(currentUser.id);
  const charLeft = CHAR_LIMIT - text.length;
  const statusMeta = STATUS_META[duel.status] ?? {
    label: duel.status,
    bg: "bg-gray-100 text-gray-600",
  };

  const handleSubmit = () => {
    if (!text.trim() || charLeft < 0) return;
    const ok = onSubmitTurn(duel.id, currentUser.id, next.phase, text);
    if (ok) setText("");
  };

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      {/* Back */}
      <button className="btn btn-ghost btn-sm" onClick={onBack}>
        ← Back
      </button>

      {/* Duel Header Card */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <span className={`badge ${statusMeta.bg}`}>{statusMeta.label}</span>
          <span className="text-xs text-muted">
            {voteCount} vote{voteCount !== 1 ? "s" : ""}
          </span>
        </div>

        <div className="motion-display mb-5">"{duel.motion}"</div>

        {/* Players */}
        <div className="grid grid-cols-3 items-center gap-2 mb-4">
          <div className="text-center">
            <div className="font-bold text-ink">{p1.displayName}</div>
            <div className="text-xs text-muted">⭐ {p1.rating ?? 1200}</div>
          </div>
          <div className="text-center text-xl font-black text-border">VS</div>
          <div className="text-center">
            <div className="font-bold text-ink">{p2.displayName}</div>
            <div className="text-xs text-muted">⭐ {p2.rating ?? 1200}</div>
          </div>
        </div>

        <PhaseProgress turns={duel.turns} nextTurn={next} />
      </div>

      {/* Transcript */}
      <div className="card">
        <h3 className="text-lg text-ink mb-4">📜 Transcript</h3>
        {duel.turns.length === 0 ? (
          <p className="text-muted text-sm text-center py-6">
            No turns yet — the debate hasn't started.
          </p>
        ) : (
          <div className="space-y-3">
            {duel.turns.map((t, i) => (
              <TurnCard key={i} turn={t} user={users[t.player]} />
            ))}
          </div>
        )}
      </div>

      {/* Turn Input — only when in progress */}
      {duel.status === "in_progress" && (
        <div className="card">
          {isMyTurn ? (
            <>
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="phase-pill"
                  style={{
                    background: PHASE_META[next.phase].color + "22",
                    color: PHASE_META[next.phase].color,
                  }}
                >
                  {PHASE_META[next.phase].icon} {PHASE_META[next.phase].label}
                </span>
                <span className="font-semibold text-ink text-sm">
                  Your turn, {currentUser.displayName}!
                </span>
              </div>

              <textarea
                className="input-field mb-2 min-h-[100px]"
                placeholder={`Write your ${next.phase}… (max ${CHAR_LIMIT} chars)`}
                value={text}
                onChange={(e) => setText(e.target.value)}
                aria-label={`${next.phase} text input`}
                aria-describedby="char-count"
              />

              <div className="flex items-center justify-between">
                <span
                  id="char-count"
                  className={`text-xs ${charLeft < 40 ? "text-ember font-semibold" : "text-muted"}`}
                >
                  {charLeft} characters remaining
                </span>
                <button
                  className="btn btn-primary"
                  disabled={!text.trim() || charLeft < 0}
                  onClick={handleSubmit}
                  aria-label="Submit your turn"
                >
                  Submit Turn →
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-6 text-muted text-sm">
              {next ? (
                <>
                  ⏳ Waiting for{" "}
                  <strong className="text-ink">
                    {
                      (users[next.player] ?? { displayName: next.player })
                        .displayName
                    }
                  </strong>{" "}
                  to submit their {next.phase}…
                </>
              ) : (
                "All turns submitted!"
              )}
            </div>
          )}
        </div>
      )}

      {/* Voting Panel */}
      {duel.status === "awaiting_votes" && (
        <div className="card">
          <h3 className="text-lg text-ink mb-2">🗳️ Cast Your Vote</h3>
          <p className="text-sm text-muted mb-4">
            {voteCount} vote{voteCount !== 1 ? "s" : ""} cast. Read the
            transcript above, then vote for the winner.
          </p>

          {isPlayer ? (
            <div className="bg-cream border border-border rounded-lg px-4 py-3 text-sm text-muted mb-4">
              Players cannot vote on their own duel.
            </div>
          ) : iHaveVoted ? (
            <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-3 text-sm text-green-700 mb-4">
              ✅ You voted for{" "}
              <strong>
                {(users[duel.votes[currentUser.id]] ?? {}).displayName}
              </strong>
            </div>
          ) : currentUser ? (
            <div className="grid grid-cols-2 gap-3 mb-4">
              {[p1id, p2id].map((pid) => (
                <button
                  key={pid}
                  className="btn btn-ocean w-full justify-center"
                  onClick={() => onVote(duel.id, currentUser.id, pid)}
                  aria-label={`Vote for ${(users[pid] ?? { displayName: pid }).displayName}`}
                >
                  Vote for {(users[pid] ?? { displayName: pid }).displayName}
                </button>
              ))}
            </div>
          ) : (
            <div className="bg-cream border border-border rounded-lg px-4 py-3 text-sm text-muted mb-4">
              Log in to cast your vote.
            </div>
          )}

          {/* Vote tally bars */}
          {voteCount > 0 && (
            <div className="border-t border-cream pt-4 space-y-3">
              <p className="text-xs font-semibold text-muted uppercase tracking-wide">
                Current Tally
              </p>
              {[p1id, p2id].map((pid) => {
                const u = users[pid] ?? { displayName: pid };
                const count = Object.values(duel.votes).filter(
                  (v) => v === pid,
                ).length;
                const pct = Math.round((count / voteCount) * 100);
                return (
                  <div key={pid}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-semibold">{u.displayName}</span>
                      <span className="text-muted">
                        {count} vote{count !== 1 ? "s" : ""} ({pct}%)
                      </span>
                    </div>
                    <div className="h-2 bg-cream rounded-full overflow-hidden">
                      <div
                        className="h-full bg-ocean rounded-full transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Finalize button (players only) */}
          {isPlayer && (
            <button
              className="btn btn-primary w-full mt-4 justify-center"
              onClick={() => onCloseVoting(duel.id)}
            >
              🏁 Close Voting & Finalize Result
            </button>
          )}
        </div>
      )}

      {/* Result */}
      {duel.status === "completed" && duel.result && (
        <div className="card text-center">
          <div className="text-6xl mb-3">{duel.result.draw ? "🤝" : "🏆"}</div>
          <h2 className="text-2xl text-ink mb-1">
            {duel.result.draw
              ? "It's a Draw!"
              : `${(users[duel.result.winner] ?? { displayName: duel.result.winner }).displayName} Wins!`}
          </h2>
          <p className="text-muted text-sm mb-6">
            {duel.result.draw
              ? "Both players scored equally. A rare outcome!"
              : "Decided by community votes and performance bonuses."}
          </p>

          <div className="border-t border-cream pt-5 text-left">
            <p className="text-xs font-semibold text-muted uppercase tracking-wide mb-3">
              Score Breakdown
            </p>
            <ScoreBreakdown duel={duel} users={users} />
          </div>
        </div>
      )}
    </div>
  );
}
