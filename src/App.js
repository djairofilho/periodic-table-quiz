import { useReducer, useState } from "react";
import "./App.css";
import ChallengeBar from "./components/ChallengeBar";
import CompletionPanel from "./components/CompletionPanel";
import OrientationHint, { ORIENTATION_HINT_KEY } from "./components/OrientationHint";
import PeriodicTable from "./components/PeriodicTable";
import TopBar from "./components/TopBar";
import { barcos } from "./data/barcos";
import { PHASES } from "./game/gameConfig";
import { createInitialGameState, GAME_ACTIONS, gameReducer } from "./game/gameReducer";
import { useTheme } from "./hooks/useTheme";

function App() {
  const [game, dispatch] = useReducer(gameReducer, undefined, createInitialGameState);
  const [orientationHintDismissed, setOrientationHintDismissed] = useState(
    () => window.sessionStorage.getItem(ORIENTATION_HINT_KEY) === "true",
  );
  const { theme, toggleTheme } = useTheme();
  const phase = PHASES[game.phaseIndex];
  const phaseSolvedCount = phase.elements.filter((symbol) =>
    game.solvedElements.includes(symbol),
  ).length;
  const clue = barcos[game.currentTarget];
  const selectedClue = game.lastAttempt ? barcos[game.lastAttempt.symbol] : null;
  const clueUnavailable = game.phaseStatus === "playing" && !clue;

  function dismissOrientationHint() {
    window.sessionStorage.setItem(ORIENTATION_HINT_KEY, "true");
    setOrientationHintDismissed(true);
  }

  return (
    <div className="game-shell">
      <TopBar
        phaseIndex={game.phaseIndex}
        solvedCount={phaseSolvedCount}
        theme={theme}
        onToggleTheme={toggleTheme}
        onRestart={() => dispatch({ type: GAME_ACTIONS.restart })}
      />

      <OrientationHint
        dismissed={orientationHintDismissed}
        onDismiss={dismissOrientationHint}
      />

      {game.phaseStatus === "complete" ? (
        <CompletionPanel
          phaseIndex={game.phaseIndex}
          campaignComplete={game.campaignStatus === "complete"}
          onNextPhase={() => dispatch({ type: GAME_ACTIONS.nextPhase })}
          onRestart={() => dispatch({ type: GAME_ACTIONS.restart })}
        />
      ) : (
        <ChallengeBar
          clue={clue}
          lastAttempt={game.lastAttempt}
          selectedClue={selectedClue}
          disabled={clueUnavailable}
        />
      )}

      <main className="board-area">
        <h1 className="sr-only">Periodic Table Quiz</h1>
        <PeriodicTable
          onAnswer={(symbol) => dispatch({ type: GAME_ACTIONS.answer, symbol })}
          solvedElements={game.solvedElements}
          lastIncorrectSymbol={game.lastIncorrectSymbol}
          disabled={clueUnavailable || game.phaseStatus === "complete"}
        />
      </main>
    </div>
  );
}

export default App;
