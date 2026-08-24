import { ArrowRight, RotateCcw, Trophy } from "lucide-react";
import { PHASES } from "../game/gameConfig";

function CompletionPanel({ phaseIndex, campaignComplete, onNextPhase, onRestart }) {
  if (campaignComplete) {
    return (
      <section className="completion-panel campaign-complete" aria-labelledby="completion-title">
        <Trophy aria-hidden="true" />
        <div>
          <span className="completion-kicker">Campanha concluída</span>
          <h2 id="completion-title">Você dominou as nove fases.</h2>
          <p>Todos os 36 desafios foram resolvidos. Que tal testar sua memória mais uma vez?</p>
        </div>
        <button className="button button-primary" type="button" onClick={onRestart}>
          <RotateCcw aria-hidden="true" /> Jogar novamente
        </button>
      </section>
    );
  }

  return (
    <section className="completion-panel" aria-labelledby="completion-title">
      <Trophy aria-hidden="true" />
      <div>
        <span className="completion-kicker">Fase concluída</span>
        <h2 id="completion-title">{PHASES[phaseIndex].title}</h2>
        <p>Quatro elementos encontrados. Avance quando estiver pronto.</p>
      </div>
      <button className="button button-primary" type="button" onClick={onNextPhase}>
        Próxima fase <ArrowRight aria-hidden="true" />
      </button>
    </section>
  );
}

export default CompletionPanel;
