// useFitText.ts
import { useLayoutEffect, useRef, useState } from "react";

/**
 * Scales font-size down (never up) so a single-line, nowrap element
 * never exceeds its container's width. Re-measures on resize/text change.
 */
function useFitText<T extends HTMLElement>(
  text: string,
  maxFontSizePx: number,
  minFontSizePx: number,
) {
  const ref = useRef<T | null>(null);
  const [fontSize, setFontSize] = useState(maxFontSizePx);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const measure = () => {
      const parent = el.parentElement;
      if (!parent) return;

      // Reset to max first so we measure against the true "ideal" width
      el.style.fontSize = `${maxFontSizePx}px`;
      const available = parent.clientWidth;
      const needed = el.scrollWidth;

      if (needed > available && needed > 0) {
        const scale = available / needed;
        const next = Math.max(minFontSizePx, Math.floor(maxFontSizePx * scale));
        setFontSize(next);
      } else {
        setFontSize(maxFontSizePx);
      }
    };

    measure();
    const ro = new ResizeObserver(measure);
    if (el.parentElement) ro.observe(el.parentElement);
    window.addEventListener("resize", measure);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [text, maxFontSizePx, minFontSizePx]);

  return { ref, fontSize };
}

export default useFitText;
