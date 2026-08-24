import { CheckCircle2, Lightbulb, XCircle } from "lucide-react";

function ChallengeBar({ clue, lastAttempt, selectedClue, disabled }) {
  const feedback = lastAttempt?.result === "correct"
    ? `Correto! ${lastAttempt.name} encontrado.`
    : lastAttempt
      ? `Ainda não. ${lastAttempt.name} não corresponde à dica.`
      : null;

  return (
    <section className={`challenge-bar${lastAttempt ? ` is-${lastAttempt.result}` : ""}`} aria-labelledby="challenge-title">
      <div className="challenge-clue">
        <Lightbulb className="challenge-icon" aria-hidden="true" />
        <div className="challenge-copy">
          <span className="challenge-label" id="challenge-title">Dica atual</span>
          <strong>{disabled ? "Dica indisponível. Reinicie o jogo." : clue}</strong>
        </div>
      </div>

      <div className="attempt-feedback" aria-live="polite" aria-atomic="true">
        {lastAttempt && (
          <>
            {lastAttempt.result === "correct"
              ? <CheckCircle2 aria-hidden="true" />
              : <XCircle aria-hidden="true" />}
            <div>
              <strong>{feedback}</strong>
              {selectedClue && <span>{selectedClue}</span>}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default ChallengeBar;
