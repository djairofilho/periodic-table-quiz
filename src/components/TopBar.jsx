import { useState } from "react";
import { Atom, Moon, RotateCcw, Sun } from "lucide-react";
import { PHASES, TARGETS_PER_PHASE } from "../game/gameConfig";

function TopBar({ phaseIndex, solvedCount, theme, onToggleTheme, onRestart }) {
  const [confirmingRestart, setConfirmingRestart] = useState(false);
  const phase = PHASES[phaseIndex];

  return (
    <header className="top-bar">
      <div className="brand" aria-label="Periodic Table Quiz">
        <span className="brand-mark" aria-hidden="true"><Atom /></span>
        <span className="brand-name">Periodic Table Quiz</span>
        <span className="brand-name-short">PT Quiz</span>
      </div>

      <div className="phase-summary">
        <span className="phase-kicker">Fase {phaseIndex + 1} de {PHASES.length}</span>
        <strong className="phase-name">{phase.shortTitle}</strong>
      </div>

      <div className="phase-progress" aria-label={`${solvedCount} de ${TARGETS_PER_PHASE} elementos encontrados nesta fase`}>
        {Array.from({ length: TARGETS_PER_PHASE }, (_, index) => (
          <span
            className={index < solvedCount ? "progress-dot is-complete" : "progress-dot"}
            key={index}
            aria-hidden="true"
          />
        ))}
        <span className="progress-count">{solvedCount}/{TARGETS_PER_PHASE}</span>
      </div>

      <div className="top-actions">
        {confirmingRestart ? (
          <div className="restart-confirmation" role="group" aria-label="Confirmar reinício">
            <button className="button button-danger" type="button" onClick={() => { onRestart(); setConfirmingRestart(false); }}>
              Confirmar reinício
            </button>
            <button className="button button-quiet" type="button" onClick={() => setConfirmingRestart(false)}>
              Cancelar
            </button>
          </div>
        ) : (
          <button className="icon-button restart-button" type="button" onClick={() => setConfirmingRestart(true)} aria-label="Reiniciar jogo" title="Reiniciar jogo">
            <RotateCcw aria-hidden="true" />
            <span className="control-label">Reiniciar</span>
          </button>
        )}

        <button className="icon-button" type="button" onClick={onToggleTheme} aria-label={`Usar tema ${theme === "dark" ? "claro" : "escuro"}`} title={`Usar tema ${theme === "dark" ? "claro" : "escuro"}`}>
          {theme === "dark" ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
          <span className="control-label">Tema</span>
        </button>
      </div>
    </header>
  );
}

export default TopBar;
