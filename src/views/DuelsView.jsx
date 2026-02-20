import { useState } from "react";
import DuelListCard from "../components/DuelListCard";

export default function DuelsView({ duels, users, onOpen, currentUser }) {
  const [filter, setFilter] = useState("all");

  const all = Object.values(duels);
  const filtered =
    filter === "all"
      ? all
      : filter === "mine"
        ? all.filter((d) => d.players.includes(currentUser?.id))
        : all.filter((d) => d.status === filter);

  const filters = [
    { value: "all", label: `All (${all.length})` },
    { value: "mine", label: "My Duels" },
    { value: "in_progress", label: "In Progress" },
    { value: "awaiting_votes", label: "Voting" },
    { value: "completed", label: "Completed" },
  ];

  return (
    <div>
      {/* Header */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <h2 className="text-2xl text-ink mr-auto">All Duels</h2>
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.value}
              className={`btn btn-sm ${filter === f.value ? "btn-primary" : "btn-secondary"}`}
              onClick={() => setFilter(f.value)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-muted">
          <div className="text-5xl mb-3">⚔️</div>
          <p className="font-semibold">No duels found</p>
          <p className="text-sm mt-1">
            Try a different filter, or create a new duel
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((d) => (
            <DuelListCard
              key={d.id}
              duel={d}
              users={users}
              onClick={() => onOpen(d.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
