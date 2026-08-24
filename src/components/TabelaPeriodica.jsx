import React from 'react';
import { elementos } from '../data/elementos';
import './TabelaPeriodica.css';

const TabelaPeriodica = ({ onClick, statusMap }) => {
  return (
    <section className="table-section" aria-labelledby="table-title">
      <header className="table-header">
        <h2 className="table-title" id="table-title">Tabela periódica</h2>
        <p className="table-hint">Deslize para os lados e toque em um elemento</p>
      </header>

      <div
        className="tabela-scroll"
        tabIndex="0"
        role="region"
        aria-label="Tabela periódica interativa com rolagem horizontal"
      >
        <div className="tabela">
          {elementos.map((el) => {
            const elementStatus = statusMap?.[el.symbol] ?? "";

            return (
              <button
                key={el.number}
                type="button"
                className={`elemento ${elementStatus}`}
                aria-label={`${el.name}, símbolo ${el.symbol}, número atômico ${el.number}`}
                onClick={() => onClick(el.symbol)}
                style={{ gridColumn: el.group, gridRow: el.period }}
              >
                <span className="elemento-symbol">{el.symbol}</span>
                <span className="elemento-number">{el.number}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TabelaPeriodica;
