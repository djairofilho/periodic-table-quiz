import { RotateCw, X } from "lucide-react";
import { useMediaQuery } from "../hooks/useMediaQuery";

export const ORIENTATION_HINT_KEY = "periodic-table-quiz:orientation-hint-dismissed";
const PORTRAIT_MOBILE_QUERY = "(pointer: coarse) and (orientation: portrait) and (max-width: 500px)";

function OrientationHint({ dismissed, onDismiss }) {
  const isPortraitMobile = useMediaQuery(PORTRAIT_MOBILE_QUERY);
  if (!isPortraitMobile || dismissed) return null;

  return (
    <aside className="orientation-hint" aria-label="Dica de orientação">
      <RotateCw aria-hidden="true" />
      <div>
        <strong>Melhor em modo paisagem</strong>
        <span>Gire o celular para ver a tabela inteira. Você pode continuar por aqui.</span>
      </div>
      <button type="button" className="orientation-dismiss" onClick={onDismiss}>
        <span>Entendi</span>
        <X aria-hidden="true" />
      </button>
    </aside>
  );
}

export default OrientationHint;
