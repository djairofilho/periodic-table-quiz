import { useEffect, useState } from "react";

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(
    () => window.matchMedia?.(query).matches ?? false,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia?.(query);
    if (!mediaQuery) return undefined;

    const updateMatches = (event) => setMatches(event.matches);
    setMatches(mediaQuery.matches);
    mediaQuery.addEventListener?.("change", updateMatches);
    return () => mediaQuery.removeEventListener?.("change", updateMatches);
  }, [query]);

  return matches;
}
