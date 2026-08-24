import { elementos } from "../data/elementos";
import { PHASES } from "./gameConfig";

export const GAME_ACTIONS = {
  answer: "answer",
  nextPhase: "next-phase",
  restart: "restart",
};

const elementsBySymbol = new Map(
  elementos.map((element) => [element.symbol, element]),
);

export function chooseNextTarget(phaseIndex, solvedElements, random = Math.random) {
  const remaining = PHASES[phaseIndex].elements.filter(
    (symbol) => !solvedElements.includes(symbol),
  );

  if (remaining.length === 0) return null;

  const index = Math.min(
    remaining.length - 1,
    Math.floor(random() * remaining.length),
  );
  return remaining[index];
}

export function createInitialGameState(random = Math.random) {
  return {
    phaseIndex: 0,
    currentTarget: chooseNextTarget(0, [], random),
    solvedElements: [],
    lastIncorrectSymbol: null,
    lastAttempt: null,
    phaseStatus: "playing",
    campaignStatus: "playing",
  };
}

export function createGameReducer(random = Math.random) {
  return function gameReducer(state, action) {
    switch (action.type) {
      case GAME_ACTIONS.answer: {
        if (
          state.phaseStatus !== "playing" ||
          state.campaignStatus !== "playing" ||
          !state.currentTarget
        ) {
          return state;
        }

        const selectedElement = elementsBySymbol.get(action.symbol);
        if (!selectedElement) return state;

        if (action.symbol !== state.currentTarget) {
          return {
            ...state,
            lastIncorrectSymbol: action.symbol,
            lastAttempt: {
              result: "incorrect",
              symbol: action.symbol,
              name: selectedElement.name,
            },
          };
        }

        const solvedElements = state.solvedElements.includes(action.symbol)
          ? state.solvedElements
          : [...state.solvedElements, action.symbol];
        const phaseSolvedCount = PHASES[state.phaseIndex].elements.filter(
          (symbol) => solvedElements.includes(symbol),
        ).length;
        const phaseComplete = phaseSolvedCount === PHASES[state.phaseIndex].elements.length;
        const campaignComplete = phaseComplete && state.phaseIndex === PHASES.length - 1;

        return {
          ...state,
          currentTarget: phaseComplete
            ? null
            : chooseNextTarget(state.phaseIndex, solvedElements, random),
          solvedElements,
          lastIncorrectSymbol: null,
          lastAttempt: {
            result: "correct",
            symbol: action.symbol,
            name: selectedElement.name,
          },
          phaseStatus: phaseComplete ? "complete" : "playing",
          campaignStatus: campaignComplete ? "complete" : "playing",
        };
      }

      case GAME_ACTIONS.nextPhase: {
        if (
          state.phaseStatus !== "complete" ||
          state.campaignStatus === "complete" ||
          state.phaseIndex >= PHASES.length - 1
        ) {
          return state;
        }

        const phaseIndex = state.phaseIndex + 1;
        return {
          ...state,
          phaseIndex,
          currentTarget: chooseNextTarget(phaseIndex, state.solvedElements, random),
          lastIncorrectSymbol: null,
          lastAttempt: null,
          phaseStatus: "playing",
        };
      }

      case GAME_ACTIONS.restart:
        return createInitialGameState(random);

      default:
        return state;
    }
  };
}

export const gameReducer = createGameReducer();
