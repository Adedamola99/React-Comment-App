# ⚔️ Debate Duels

A short-form, turn-based debate game where two players face off across three phases. Community votes decide the winner. Built with React + Vite + Tailwind CSS.

## Getting Started

```bash
npm install
npm run dev
# Open http://localhost:5173
```

## Project Structure

```
src/
├── App.jsx                     # Root — wires all views, modals, hooks
├── main.jsx                    # React entry point
├── index.css                   # Tailwind + custom component classes
├── utils/
│   ├── duelLogic.js            # Pure functions: state machine, scoring, factories
│   └── storage.js              # localStorage adapter (get/set/export/import)
├── data/
│   └── seed.js                 # Demo users, sample duel, motion suggestions
├── hooks/
│   └── useDebateDuels.js       # Central state + action hook
├── components/
│   ├── Nav.jsx
│   ├── Toast.jsx
│   ├── DuelListCard.jsx
│   ├── PhaseProgress.jsx
│   ├── TurnCard.jsx
│   ├── ScoreBreakdown.jsx
│   └── modals/
│       ├── CreateDuelModal.jsx
│       └── LoginModal.jsx
└── views/
    ├── HomeView.jsx
    ├── DuelsView.jsx
    ├── DuelView.jsx
    ├── VoteView.jsx
    ├── LeaderboardView.jsx
    └── ProfileView.jsx
```

## Scoring Algorithm

```
Score = (votes × 10) + lengthBonus + clarityBonus
lengthBonus  = min(5, floor(totalChars / 100))
clarityBonus = +2 if sentence count is between 1 and 4
```

## Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start dev server         |
| `npm run build`   | Production build         |
| `npm run preview` | Preview production build |
