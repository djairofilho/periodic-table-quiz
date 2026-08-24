import { useMemo, useRef, useState } from "react";
import { Check, X } from "lucide-react";
import { CATEGORY_LABELS, elementos } from "../data/elementos";
import CategoryLegend from "./CategoryLegend";

function findKeyboardNeighbor(current, key) {
  const horizontal = key === "ArrowLeft" || key === "ArrowRight";
  const direction = key === "ArrowLeft" || key === "ArrowUp" ? -1 : 1;
  const candidates = elementos.filter((element) => {
    if (horizontal) {
      return element.period === current.period && Math.sign(element.group - current.group) === direction;
    }
    return Math.sign(element.period - current.period) === direction;
  });

  return candidates.sort((first, second) => {
    const firstDistance = horizontal
      ? Math.abs(first.group - current.group)
      : Math.abs(first.period - current.period) * 20 + Math.abs(first.group - current.group);
    const secondDistance = horizontal
      ? Math.abs(second.group - current.group)
      : Math.abs(second.period - current.period) * 20 + Math.abs(second.group - current.group);
    return firstDistance - secondDistance;
  })[0];
}

function PeriodicTable({ onAnswer, solvedElements, lastIncorrectSymbol, disabled }) {
  const [activeSymbol, setActiveSymbol] = useState("H");
  const buttonRefs = useRef(new Map());
  const solvedSet = useMemo(() => new Set(solvedElements), [solvedElements]);

  function handleKeyDown(event, element) {
    if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) return;
    const neighbor = findKeyboardNeighbor(element, event.key);
    if (!neighbor) return;

    event.preventDefault();
    setActiveSymbol(neighbor.symbol);
    buttonRefs.current.get(neighbor.symbol)?.focus();
  }

  return (
    <section className="periodic-table-section" aria-label="Tabela periódica interativa">
      <div className="table-scroll-cue">
        <div className="table-scroll" role="region" aria-label="Tabela periódica; deslize horizontalmente no modo retrato">
          <div className="periodic-table" role="grid" aria-rowcount="9" aria-colcount="18">
            {Array.from({ length: 9 }, (_, index) => index + 1).map((period) => (
              <div className="period-row" role="row" key={period}>
                {elementos.filter((element) => element.period === period).map((element) => {
                  const isSolved = solvedSet.has(element.symbol);
                  const isIncorrect = lastIncorrectSymbol === element.symbol;
                  const state = isSolved ? "correto" : isIncorrect ? "incorreto" : "disponível";

                  return (
                    <button
                      key={element.number}
                      ref={(node) => {
                        if (node) buttonRefs.current.set(element.symbol, node);
                      }}
                      type="button"
                      role="gridcell"
                      className={`element-cell category-${element.category}${isSolved ? " is-solved" : ""}${isIncorrect ? " is-incorrect" : ""}`}
                      style={{ gridColumn: element.group, gridRow: element.period }}
                      aria-label={`${element.name}, símbolo ${element.symbol}, número atômico ${element.number}, ${CATEGORY_LABELS[element.category]}, ${state}`}
                      aria-disabled={disabled}
                      tabIndex={activeSymbol === element.symbol ? 0 : -1}
                      onFocus={() => setActiveSymbol(element.symbol)}
                      onKeyDown={(event) => handleKeyDown(event, element)}
                      onClick={() => !disabled && onAnswer(element.symbol)}
                    >
                      <span className="atomic-number">{element.number}</span>
                      <strong className="element-symbol">{element.symbol}</strong>
                      {(isSolved || isIncorrect) && (
                        <span className="element-state-icon" aria-hidden="true">
                          {isSolved ? <Check /> : <X />}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
      <CategoryLegend />
    </section>
  );
}

export default PeriodicTable;
