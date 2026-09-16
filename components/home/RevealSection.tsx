'use client';

import { createContext, useContext, useEffect, useRef, useState } from 'react';

/** Exactly the classes index.html added on intersection. */
const REVEAL_CLASSES = 'animate__animated animate__fadeInUp animate__fast sm:animate__slow';

const RevealContext = createContext(false);

/**
 * Fades its children up as the section scrolls into view, replacing the
 * IntersectionObserver + classList block in index.html.
 *
 * It takes `children`, so only this wrapper and <Reveal> are Client Components
 * -- the actual content rendered inside stays server-rendered.
 *
 * Note the original queried `.observeTarget2` unconditionally and dereferenced
 * it, which threw on the sections that only have one target. Here each target
 * opts in via <Reveal>, so a section with one target is fine.
 */
export function RevealSection({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect a reduced-motion preference by revealing immediately.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.unobserve(el);
        }
      },
      { threshold: 0.5 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className={className}>
      <RevealContext.Provider value={shown}>{children}</RevealContext.Provider>
    </section>
  );
}

/** A target inside a RevealSection: hidden until the section comes into view. */
export function Reveal({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const shown = useContext(RevealContext);

  return (
    <div className={`${className} ${shown ? REVEAL_CLASSES : 'opacity-0'}`}>{children}</div>
  );
}
