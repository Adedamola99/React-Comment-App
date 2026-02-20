import { useState, useCallback } from "react";
import { storage } from "../utils/storage";
import { SEED_DATA } from "../data/seed";
import {
  createDuel,
  createUser,
  submitTurn,
  castVote,
  calculateResult,
} from "../utils/duelLogic";

function loadInitialState() {
  const stored = storage.get();
  if (Object.keys(stored.users).length === 0) {
    storage.set(SEED_DATA);
    return SEED_DATA;
  }
  return stored;
}

export function useDebateDuels() {
  const [state, setState] = useState(loadInitialState);
  const [toasts, setToasts] = useState([]);

  // ── Persist & update via functional updater — no stale closures ──────────
  const updateState = useCallback((updater) => {
    setState((prev) => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      storage.set(next);
      return next;
    });
  }, []);

  // ── Toast ─────────────────────────────────────────────────────────────────
  const toast = useCallback((msg, type = "default") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, msg, type }]);
    setTimeout(
      () => setToasts((prev) => prev.filter((t) => t.id !== id)),
      3500,
    );
  }, []);

  // ── Create Duel ───────────────────────────────────────────────────────────
  const handleCreateDuel = useCallback(
    (motion, opponentId, currentUserId) => {
      const duel = createDuel(motion, [currentUserId, opponentId]);
      updateState((prev) => ({
        ...prev,
        duels: { ...prev.duels, [duel.id]: duel },
      }));
      toast("Duel created! ⚔️", "success");
      return duel.id;
    },
    [updateState, toast],
  );

  // ── Submit Turn ───────────────────────────────────────────────────────────
  const handleSubmitTurn = useCallback(
    (duelId, playerId, phase, text) => {
      let succeeded = false;
      let nextStatus = null;
      try {
        updateState((prev) => {
          const duel = prev.duels[duelId];
          const updated = submitTurn(duel, playerId, phase, text); // throws on error
          succeeded = true;
          nextStatus = updated.status;
          return { ...prev, duels: { ...prev.duels, [duelId]: updated } };
        });
        setTimeout(() => {
          if (nextStatus === "awaiting_votes") {
            toast(
              "All turns submitted — duel is now open for voting! 🗳️",
              "success",
            );
          } else {
            toast("Turn submitted!", "success");
          }
        }, 0);
        return true;
      } catch (e) {
        toast(e.message, "error");
        return false;
      }
    },
    [updateState, toast],
  );

  // ── Vote ──────────────────────────────────────────────────────────────────
  const handleVote = useCallback(
    (duelId, voterId, winnerId) => {
      try {
        updateState((prev) => {
          const duel = prev.duels[duelId];
          const updated = castVote(duel, voterId, winnerId); // throws on error
          return { ...prev, duels: { ...prev.duels, [duelId]: updated } };
        });
        toast("Vote cast! 🗳️", "success");
        return true;
      } catch (e) {
        toast(e.message, "error");
        return false;
      }
    },
    [updateState, toast],
  );

  // ── Finalize ──────────────────────────────────────────────────────────────
  const handleCloseVoting = useCallback(
    (duelId) => {
      updateState((prev) => {
        const duel = prev.duels[duelId];
        const result = calculateResult(duel);
        const finalized = { ...duel, status: "completed", result };
        const newUsers = { ...prev.users };
        for (const pid of duel.players) {
          const u = { ...(newUsers[pid] ?? createUser(pid)) };
          const pts = result.scores[pid] ?? 0;
          if (!result.draw) {
            if (result.winner === pid) {
              u.wins = (u.wins ?? 0) + 1;
              u.points = (u.points ?? 0) + pts;
            } else {
              u.losses = (u.losses ?? 0) + 1;
            }
          }
          newUsers[pid] = u;
        }
        return {
          ...prev,
          users: newUsers,
          duels: { ...prev.duels, [duelId]: finalized },
        };
      });
      toast("Duel finalized! 🏆", "success");
    },
    [updateState, toast],
  );

  // ── Create User ───────────────────────────────────────────────────────────
  const handleCreateUser = useCallback(
    (displayName) => {
      const u = createUser(displayName);
      updateState((prev) => ({ ...prev, users: { ...prev.users, [u.id]: u } }));
      toast(`Welcome, ${displayName}!`, "success");
      return u;
    },
    [updateState, toast],
  );

  // ── Export ────────────────────────────────────────────────────────────────
  const handleExport = useCallback(() => {
    const blob = new Blob([storage.export()], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "debate-duels-data.json";
    a.click();
    toast("Data exported!", "success");
  }, [toast]);

  // ── Import ────────────────────────────────────────────────────────────────
  const handleImport = useCallback(
    (file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = storage.import(e.target.result);
          setState(data);
          storage.set(data);
          toast("Data imported!", "success");
        } catch {
          toast("Invalid JSON file — import failed.", "error");
        }
      };
      reader.readAsText(file);
    },
    [toast],
  );

  // ── Derived ───────────────────────────────────────────────────────────────
  const duelList = Object.values(state.duels);
  const activeDuels = duelList.filter((d) => d.status === "in_progress");
  const votingDuels = duelList.filter((d) => d.status === "awaiting_votes");
  const completedDuels = duelList.filter((d) => d.status === "completed");

  return {
    state,
    users: state.users,
    duels: state.duels,
    duelList,
    activeDuels,
    votingDuels,
    completedDuels,
    toasts,
    handleCreateDuel,
    handleSubmitTurn,
    handleVote,
    handleCloseVoting,
    handleCreateUser,
    handleExport,
    handleImport,
    toast,
  };
}
