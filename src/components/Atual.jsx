export default function Atual({ elementoAtual }) {
    if (!elementoAtual) return null;

    return (
        <div className="atual-container">
            <div className="atual-content">
                <h3 className="atual-nome">Elemento: {elementoAtual.nome}</h3>
                <p className="atual-dica">Dica: {elementoAtual.dica}</p>
            </div>
        </div>
    );
}
