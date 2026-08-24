import { fireEvent, render, screen } from "@testing-library/react";
import App from "../App";
import ChallengeBar from "./ChallengeBar";
import CompletionPanel from "./CompletionPanel";
import OrientationHint, { ORIENTATION_HINT_KEY } from "./OrientationHint";
import PeriodicTable from "./PeriodicTable";
import { mockMatchMedia } from "../setupTests";

describe("interface do quiz", () => {
  test("o tema segue o sistema e persiste a escolha explícita", () => {
    mockMatchMedia({ "(prefers-color-scheme: dark)": true });
    render(<App />);

    expect(document.documentElement).toHaveAttribute("data-theme", "dark");
    fireEvent.click(screen.getByRole("button", { name: "Usar tema claro" }));
    expect(document.documentElement).toHaveAttribute("data-theme", "light");
    expect(window.localStorage.getItem("periodic-table-quiz:theme")).toBe("light");
  });

  test("o aviso aparece somente em retrato móvel e pode ser dispensado", () => {
    mockMatchMedia({
      "(pointer: coarse) and (orientation: portrait) and (max-width: 500px)": true,
    });
    const dismiss = jest.fn();
    const { rerender } = render(<OrientationHint dismissed={false} onDismiss={dismiss} />);

    fireEvent.click(screen.getByRole("button", { name: "Entendi" }));
    expect(dismiss).toHaveBeenCalledTimes(1);

    rerender(<OrientationHint dismissed onDismiss={dismiss} />);
    expect(screen.queryByText("Melhor em modo paisagem")).not.toBeInTheDocument();
    expect(window.sessionStorage.getItem(ORIENTATION_HINT_KEY)).toBeNull();
  });

  test("feedback de acerto e erro usa texto e região anunciada", () => {
    const { rerender } = render(
      <ChallengeBar
        clue="Pista"
        lastAttempt={{ result: "correct", name: "Oxigênio", symbol: "O" }}
        selectedClue="Sou essencial para a respiração."
      />,
    );

    expect(screen.getByText("Correto! Oxigênio encontrado.")).toBeInTheDocument();
    expect(document.querySelector("[aria-live='polite']")).toBeInTheDocument();

    rerender(
      <ChallengeBar
        clue="Pista"
        lastAttempt={{ result: "incorrect", name: "Hélio", symbol: "He" }}
        selectedClue="Sou um gás nobre."
      />,
    );
    expect(screen.getByText("Ainda não. Hélio não corresponde à dica.")).toBeInTheDocument();
  });

  test("setas percorrem a tabela e Enter responde", () => {
    const onAnswer = jest.fn();
    render(
      <PeriodicTable
        onAnswer={onAnswer}
        solvedElements={[]}
        lastIncorrectSymbol={null}
        disabled={false}
      />,
    );

    const hydrogen = screen.getByRole("gridcell", { name: /Hidrogênio/ });
    hydrogen.focus();
    fireEvent.keyDown(hydrogen, { key: "ArrowRight" });
    const helium = screen.getByRole("gridcell", { name: /Hélio/ });
    expect(helium).toHaveFocus();
    fireEvent.keyDown(helium, { key: "Enter" });
    fireEvent.click(helium);
    expect(onAnswer).toHaveBeenCalledWith("He");
  });

  test("a conclusão da fase exige ação explícita", () => {
    const onNextPhase = jest.fn();
    render(
      <CompletionPanel
        phaseIndex={0}
        campaignComplete={false}
        onNextPhase={onNextPhase}
        onRestart={jest.fn()}
      />,
    );

    expect(onNextPhase).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole("button", { name: /Próxima fase/ }));
    expect(onNextPhase).toHaveBeenCalledTimes(1);
  });
});
