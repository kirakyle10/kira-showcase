import { useEffect, useRef, useState } from 'react';

export default function useAnimatedCount(target, duration = 1500, start = 0) {
  const [value, setValue] = useState(start);
  const rafRef = useRef(0);
  const startedAt = useRef(0);

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      setValue(target);
      return undefined;
    }

    startedAt.current = performance.now();
    const from = start;
    const to = Number(target) || 0;

    const tick = (now) => {
      const elapsed = now - startedAt.current;
      const t = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(from + (to - from) * eased);
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration, start]);

  return value;
}
