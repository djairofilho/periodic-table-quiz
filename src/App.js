import { useState, useEffect } from "react";
import { barcos } from "./data/barcos";
import TabelaPeriodica from "./components/TabelaPeriodica";
import Dica from "./components/Dica";
import Atual from "./components/Atual";
import Fase from "./components/Fase";
import './App.css';

function App() {
  const [elementoAtual, setElementoAtual] = useState("");
  const [status, setStatus] = useState({});
  const [dicaAtual, setDicaAtual] = useState("");
  const [fase, setFase] = useState(1);
  const [acertos, setAcertos] = useState(0);
  const [elementoClicado, setElementoClicado] = useState(null);

  const descricoesFases = {
    1: "Elementos básicos - Encontre os elementos mais comuns do dia a dia",
    2: "Metais - Hora de descobrir metais importantes",
    3: "Gases Nobres - Encontre os elementos mais estáveis",
    4: "Metais Alcalinos - Descubra os elementos reativos do grupo 1",
    5: "Halogênios - Encontre os elementos do grupo 17",
    6: "Elementos da Vida - Localize os elementos essenciais para os seres vivos",
    7: "Metais de Transição - Encontre os elementos do bloco d",
    8: "Elementos Tecnológicos - Encontre elementos usados em eletrônicos",
    9: "Metais interessantes - Localize alguns elementos raros na Terra",
  };

  const elementosPorFase = {
    1: ["H", "O", "C", "N"],
    2: ["Fe", "Cu", "Al", "Ca"],
    3: ["He", "Ne", "Ar", "Kr"],
    4: ["Li", "Na", "K", "Rb"],
    5: ["F", "Cl", "Br", "I"],
    6: ["P", "S", "Mg", "K"],
    7: ["Mn", "Cr", "Ni", "Co"],
    8: ["Si", "Ge", "Ga", "In"],
    9: ["Au", "Pt", "Ag", "Os"],
  };

  // Escolhe um novo elemento da fase atual
  const escolherNovoElemento = () => {
    const elementosDaFase = elementosPorFase[fase];
    const restantes = elementosDaFase.filter((el) => !["acerto", "erro"].includes(status[el]));


    if (restantes.length === 0) {
      setElementoAtual(null);
      setDicaAtual("");
      return;
    }

    const novo = restantes[Math.floor(Math.random() * restantes.length)];
    setElementoAtual(novo);
    setDicaAtual(barcos[novo]);
  };

  // Efeito: toda vez que os acertos ou a fase mudam
  useEffect(() => {
    const elementosDaFase = elementosPorFase[fase];
    const total = elementosDaFase.length;
    const respondidos = elementosDaFase.filter((el) => ["acerto", "erro"].includes(status[el])).length;    if (respondidos === total) {
      if (fase < 9) {
        setFase((prev) => prev + 1);
        setAcertos(0);
      } else {
        setDicaAtual("Parabéns! Você completou todas as fases!");
        setElementoAtual(null);
      }
    } else {
      escolherNovoElemento();
    }
  }, [acertos, fase]);

  const handleClick = (simbolo) => {
    if (!elementoAtual) return;

    // Atualiza o elemento clicado com sua descrição
    setElementoClicado({
      nome: simbolo,
      dica: barcos[simbolo]
    });

    if (simbolo === elementoAtual) {
      setStatus((prev) => ({ ...prev, [simbolo]: "acerto" }));
      setAcertos((prev) => prev + 1);
    } else {
      setStatus((prev) => ({ ...prev, [simbolo]: "erro" }));
    }
  };

  return (
    <div className="app-container">
      <h1 className="app-title">🧪 Periodic Table Quiz</h1>
      <div className="info-container">
        <Dica texto={dicaAtual} />
        <Fase numero={fase} descricao={descricoesFases[fase]} />
        <Atual elementoAtual={elementoClicado} />
      </div>

      <TabelaPeriodica onClick={handleClick} statusMap={status} />
    </div>
  );
}

export default App;
