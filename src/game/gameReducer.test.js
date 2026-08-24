import { GAME_ACTIONS, createGameReducer, createInitialGameState } from "./gameReducer";
import { PHASES } from "./gameConfig";

const reducer = createGameReducer(() => 0);

function answer(state, symbol) {
  return reducer(state, { type: GAME_ACTIONS.answer, symbol });
}

describe("gameReducer", () => {
  test("um erro não avança o progresso", () => {
    const initial = createInitialGameState(() => 0);
    const next = answer(initial, "O");

    expect(next.solvedElements).toEqual([]);
    expect(next.currentTarget).toBe("H");
    expect(next.lastIncorrectSymbol).toBe("O");
  });

  test("errar um alvo futuro não o elimina", () => {
    let state = createInitialGameState(() => 0);
    state = answer(state, "O");
    state = answer(state, "H");

    expect(state.currentTarget).toBe("O");
    expect(state.solvedElements).toEqual(["H"]);
  });

  test("um acerto incrementa uma única vez", () => {
    let state = createInitialGameState(() => 0);
    state = answer(state, "H");
    state = answer(state, "H");

    expect(state.solvedElements).toEqual(["H"]);
  });

  test("quatro acertos concluem a fase", () => {
    let state = createInitialGameState(() => 0);
    PHASES[0].elements.forEach((symbol) => {
      state = answer(state, symbol);
    });

    expect(state.phaseStatus).toBe("complete");
    expect(state.campaignStatus).toBe("playing");
    expect(state.currentTarget).toBeNull();
  });

  test("nove fases concluem a campanha", () => {
    let state = createInitialGameState(() => 0);

    PHASES.forEach((phase, phaseIndex) => {
      phase.elements.forEach((symbol) => {
        state = answer(state, symbol);
      });
      if (phaseIndex < PHASES.length - 1) {
        state = reducer(state, { type: GAME_ACTIONS.nextPhase });
      }
    });

    expect(state.phaseIndex).toBe(8);
    expect(state.phaseStatus).toBe("complete");
    expect(state.campaignStatus).toBe("complete");
    expect(state.solvedElements).toHaveLength(36);
  });

  test("reiniciar limpa todo o progresso", () => {
    let state = createInitialGameState(() => 0);
    state = answer(state, "H");
    state = reducer(state, { type: GAME_ACTIONS.restart });

    expect(state).toEqual(createInitialGameState(() => 0));
  });
});
