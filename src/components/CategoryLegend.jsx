import { CATEGORY_LABELS } from "../data/elementos";

function LegendItems() {
  return (
    <ul className="legend-list">
      {Object.entries(CATEGORY_LABELS).map(([category, label]) => (
        <li key={category}>
          <span className={`legend-swatch category-${category}`} aria-hidden="true" />
          {label}
        </li>
      ))}
    </ul>
  );
}

function CategoryLegend() {
  return (
    <>
      <div className="legend-wide" aria-label="Legenda das famílias químicas"><LegendItems /></div>
      <details className="legend-compact">
        <summary>Famílias químicas</summary>
        <LegendItems />
      </details>
    </>
  );
}

export default CategoryLegend;
