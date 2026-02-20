import { useState } from "react";
import { useDebateDuels } from "./hooks/useDebateDuels";

import Nav from "./components/Nav";
import Toast from "./components/Toast";
import CreateDuelModal from "./components/modals/CreateDuelModal";
import LoginModal from "./components/modals/LoginModal";

import HomeView from "./views/HomeView";
import DuelsView from "./views/DuelsView";
import DuelView from "./views/DuelView";
import VoteView from "./views/VoteView";
import LeaderboardView from "./views/LeaderboardView";
import ProfileView from "./views/ProfileView";

export default function App() {
  const [view, setView] = useState("home");
  const [selectedDuel, setSelectedDuel] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [showCreate, setShowCreate] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const {
    users,
    duels,
    duelList,
    activeDuels,
    votingDuels,
    completedDuels,
    toasts,
    toast,
    handleCreateDuel,
    handleSubmitTurn,
    handleVote,
    handleCloseVoting,
    handleCreateUser,
    handleExport,
    handleImport,
  } = useDebateDuels();

  // If no current user yet, default to first user in store
  const activeUser = currentUser ?? Object.values(users)[0] ?? null;

  const openDuel = (duelId) => {
    setSelectedDuel(duelId);
    setView("duel");
  };

  const onCreateDuel = (motion, opponentId) => {
    if (!activeUser) {
      toast("Please log in first", "error");
      return;
    }
    const id = handleCreateDuel(motion, opponentId, activeUser.id);
    setShowCreate(false);
    openDuel(id);
  };

  const onVote = (duelId, voterId, winnerId) =>
    handleVote(duelId, voterId, winnerId);

  return (
    <div className="min-h-screen bg-paper">
      {/* Navigation */}
      <Nav
        view={view}
        setView={setView}
        currentUser={activeUser}
        onLoginClick={() => setShowLogin(true)}
        activeDuels={activeDuels.length}
        votingDuels={votingDuels.length}
      />

      {/* Main content */}
      <main className="max-w-3xl mx-auto px-4 py-8" role="main">
        {view === "home" && (
          <HomeView
            currentUser={activeUser}
            duels={duels}
            users={users}
            onCreateDuel={() => setShowCreate(true)}
            onOpenDuel={openDuel}
            onExport={handleExport}
            onImport={handleImport}
            activeDuels={activeDuels}
            votingDuels={votingDuels}
            completedDuels={completedDuels}
          />
        )}

        {view === "duels" && (
          <DuelsView
            duels={duels}
            users={users}
            onOpen={openDuel}
            currentUser={activeUser}
          />
        )}

        {view === "duel" && (
          <DuelView
            duel={selectedDuel ? duels[selectedDuel] : null}
            users={users}
            currentUser={activeUser}
            onSubmitTurn={handleSubmitTurn}
            onVote={onVote}
            onCloseVoting={handleCloseVoting}
            onBack={() => setView("home")}
          />
        )}

        {view === "vote" && (
          <VoteView
            duels={votingDuels}
            users={users}
            currentUser={activeUser}
            onVote={onVote}
            onClose={handleCloseVoting}
            onOpen={openDuel}
          />
        )}

        {view === "leaderboard" && <LeaderboardView users={users} />}

        {view === "profile" && (
          <ProfileView
            currentUser={activeUser}
            users={users}
            duels={duels}
            onSwitchUser={() => setShowLogin(true)}
          />
        )}
      </main>

      {/* Modals */}
      {showCreate && (
        <CreateDuelModal
          users={users}
          currentUser={activeUser}
          onCreate={onCreateDuel}
          onClose={() => setShowCreate(false)}
        />
      )}

      {showLogin && (
        <LoginModal
          users={users}
          currentUser={activeUser}
          onSelect={(u) => {
            setCurrentUser(u);
            setShowLogin(false);
            toast(`Logged in as ${u.displayName} 👤`, "success");
          }}
          onClose={() => setShowLogin(false)}
          onCreateUser={(name) => {
            const u = handleCreateUser(name);
            setCurrentUser(u);
            setShowLogin(false);
          }}
        />
      )}

      {/* Toast notifications */}
      <Toast toasts={toasts} />
    </div>
  );
}
