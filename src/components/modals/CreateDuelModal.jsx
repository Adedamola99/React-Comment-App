import { useState } from "react";
import { SAMPLE_MOTIONS } from "../../data/seed";
import { CHAR_LIMIT } from "../../utils/duelLogic";

export default function CreateDuelModal({
  users,
  currentUser,
  onCreate,
  onClose,
}) {
  const [motion, setMotion] = useState("");
  const [opponentId, setOpponentId] = useState("");

  const others = Object.values(users).filter((u) => u.id !== currentUser?.id);
  const canSubmit = motion.trim() && opponentId;

  const handleSubmit = () => {
    if (!canSubmit) return;
    onCreate(motion.trim(), opponentId);
  };

  return (
    <div
      className="modal-overlay animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="create-duel-title"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal-box animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 id="create-duel-title" className="text-2xl text-ink">
            ⚔️ New Duel
          </h2>
          <button
            className="btn btn-ghost btn-sm"
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Motion */}
        <label
          className="block text-sm font-semibold text-ink mb-1.5"
          htmlFor="motion-input"
        >
          Debate Motion <span className="text-red-500">*</span>
        </label>
        <textarea
          id="motion-input"
          className="input-field mb-1 min-h-[72px]"
          placeholder="Enter the motion to debate…"
          value={motion}
          onChange={(e) => setMotion(e.target.value)}
          maxLength={200}
          aria-required="true"
        />
        <p className="text-xs text-muted text-right mb-3">
          {motion.length}/200
        </p>

        {/* Sample motions */}
        <p className="text-xs font-semibold text-muted uppercase tracking-wide mb-2">
          💡 Try one of these
        </p>
        <div className="flex flex-wrap gap-2 mb-5">
          {SAMPLE_MOTIONS.map((m) => (
            <button
              key={m}
              className="btn btn-ghost btn-sm text-xs"
              onClick={() => setMotion(m)}
              type="button"
            >
              {m}
            </button>
          ))}
        </div>

        {/* Opponent */}
        <label
          className="block text-sm font-semibold text-ink mb-1.5"
          htmlFor="opponent-select"
        >
          Choose Opponent <span className="text-red-500">*</span>
        </label>
        <select
          id="opponent-select"
          className="input-field mb-6"
          value={opponentId}
          onChange={(e) => setOpponentId(e.target.value)}
          aria-required="true"
        >
          <option value="">Select a player…</option>
          {others.map((u) => (
            <option key={u.id} value={u.id}>
              {u.displayName} — ⭐ {u.rating} · {u.wins}W/{u.losses}L
            </option>
          ))}
        </select>

        {/* Turn order info */}
        <div className="bg-cream border border-border rounded-lg px-4 py-3 text-xs text-muted mb-6">
          <span className="font-semibold text-ink block mb-1">
            How it works:
          </span>
          Both players submit 3 turns each — Argument → Rebuttal → Closing. Max{" "}
          {CHAR_LIMIT} characters per turn.
        </div>

        {/* Actions */}
        <div className="flex gap-3 justify-end">
          <button className="btn btn-secondary" onClick={onClose} type="button">
            Cancel
          </button>
          <button
            className="btn btn-primary"
            disabled={!canSubmit}
            onClick={handleSubmit}
            type="button"
          >
            Create Duel ⚔️
          </button>
        </div>
      </div>
    </div>
  );
}
