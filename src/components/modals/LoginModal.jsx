import { useState } from "react";

export default function LoginModal({
  users,
  currentUser,
  onSelect,
  onClose,
  onCreateUser,
}) {
  const [showCreate, setShowCreate] = useState(false);
  const [newName, setNewName] = useState("");

  const handleCreate = () => {
    if (!newName.trim()) return;
    onCreateUser(newName.trim());
  };

  return (
    <div
      className="modal-overlay animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-title"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal-box animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 id="login-title" className="text-2xl text-ink">
            👤 Select Player
          </h2>
          <button
            className="btn btn-ghost btn-sm"
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {!showCreate ? (
          <>
            {/* Player list */}
            <div className="flex flex-col gap-2 mb-6">
              {Object.values(users).map((u) => {
                const isActive = currentUser?.id === u.id;
                return (
                  <button
                    key={u.id}
                    className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl border-2 text-left transition-all ${
                      isActive
                        ? "border-ember bg-orange-50"
                        : "border-border bg-cream hover:border-ember/50"
                    }`}
                    onClick={() => onSelect(u)}
                  >
                    {/* Avatar */}
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-lg flex-shrink-0 ${
                        isActive ? "bg-ember" : "bg-muted"
                      }`}
                    >
                      {u.displayName[0].toUpperCase()}
                    </div>

                    {/* Name + stats */}
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-ink text-sm">
                        {u.displayName}
                      </div>
                      <div className="text-xs text-muted">
                        ⭐ {u.rating} · {u.wins}W / {u.losses}L · {u.points} pts
                      </div>
                    </div>

                    {isActive && (
                      <span className="text-xs font-bold text-ember uppercase tracking-wide">
                        Active
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="flex gap-3 justify-end">
              <button className="btn btn-ghost" onClick={onClose}>
                Cancel
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setShowCreate(true)}
              >
                + New Player
              </button>
            </div>
          </>
        ) : (
          <>
            <label
              className="block text-sm font-semibold text-ink mb-1.5"
              htmlFor="new-player-name"
            >
              Display Name
            </label>
            <input
              id="new-player-name"
              className="input-field mb-6"
              placeholder="Enter your name…"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCreate()}
              autoFocus
              maxLength={30}
            />

            <div className="flex gap-3 justify-end">
              <button
                className="btn btn-ghost"
                onClick={() => setShowCreate(false)}
              >
                ← Back
              </button>
              <button
                className="btn btn-primary"
                disabled={!newName.trim()}
                onClick={handleCreate}
              >
                Create & Login
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
