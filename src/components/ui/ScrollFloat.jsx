'use client';

import { Children, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './ScrollFloat.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const clamp01 = value => Math.min(Math.max(value, 0), 1);

const getDelays = (count, order, stagger) => {
  const middle = (count - 1) / 2;
  const ranks = Array.from({ length: count }, (_, index) => {
    if (order === 'end') return count - 1 - index;
    if (order === 'center') return Math.abs(index - middle);
    if (order === 'edges') return middle - Math.abs(index - middle);
    return index;
  });
  const first = Math.min(...ranks);
  return ranks.map(rank => (rank - first) * Math.max(0, stagger));
};

export const ScrollFloat = ({
  children,
  as: Component = 'span',
  scrollContainerRef,
  containerClassName = '',
  textClassName = '',
  effect = 'float',
  splitBy = 'words',
  direction = 'up',
  order = 'start',
  fromColor = 'currentColor',
  animationDuration = 0.85,
  ease = 'power3.out',
  scrollStart = 'top 88%',
  scrollEnd = 'bottom 20%',
  stagger = 0.04,
  distance = 60,
  stretch = 1,
  smoothing = 0
}) => {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  const text = useMemo(() => {
    const parts = Children.toArray(children);
    return parts.every(part => typeof part === 'string' || typeof part === 'number') ? parts.join('') : null;
  }, [children]);

  const shiftColor = fromColor && fromColor !== 'currentColor' ? fromColor : null;
  const shiftStyle = useMemo(
    () =>
      shiftColor
        ? { color: `color-mix(in oklab, ${shiftColor} calc(var(--scroll-float-mix, 0) * 100%), currentColor)` }
        : undefined,
    [shiftColor]
  );

  const splitText = useMemo(() => {
    if (text === null) return null;
    return text.split(/(\s+)/).map((word, wordIndex) =>
      word.trim() === '' ? (
        word
      ) : (
        <span className="scroll-float-word" key={wordIndex}>
          {splitBy === 'words' ? (
            <span className="scroll-float-char" style={shiftStyle}>
              {word}
            </span>
          ) : (
            Array.from(word).map((char, charIndex) => (
              <span className="scroll-float-char" key={charIndex} style={shiftStyle}>
                {char}
              </span>
            ))
          )}
        </span>
      )
    );
  }, [text, splitBy, shiftStyle]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useIsomorphicLayoutEffect(() => {
    const el = containerRef.current;
    const textEl = textRef.current;
    if (!el || !textEl) return;
    if (scrollContainerRef && !scrollContainerRef.current) return;

    const scroller = scrollContainerRef?.current || window;
    const pieces = el.querySelectorAll('.scroll-float-char');
    const targets = pieces.length ? Array.from(pieces) : [textEl];
    const delays = getDelays(targets.length, order, stagger);

    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // Trigger once on view with proper duration, eliminating scrub jerkiness and freeze
      gsap.fromTo(
        targets,
        {
          opacity: 0,
          y: direction === 'up' ? '105%' : '-105%',
          rotateX: effect === 'flip' ? 35 : 0,
        },
        {
          opacity: 1,
          y: '0%',
          rotateX: 0,
          duration: animationDuration,
          stagger: index => delays[index] || 0,
          ease,
          scrollTrigger: {
            trigger: el,
            scroller,
            start: scrollStart,
            once: true,
          },
        }
      );
    });

    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set(targets, { opacity: 1, y: '0%', rotateX: 0 });
    });

    return () => mm.revert();
  }, [
    mounted,
    scrollContainerRef,
    text,
    effect,
    splitBy,
    direction,
    order,
    animationDuration,
    ease,
    scrollStart,
    stagger,
  ]);

  return (
    <Component
      ref={containerRef}
      className={`scroll-float ${containerClassName}`}
    >
      {text !== null && <span className="scroll-float-sr">{text}</span>}
      <span
        ref={textRef}
        className={`scroll-float-text ${textClassName}`}
        style={text === null ? shiftStyle : undefined}
        aria-hidden={text !== null ? true : undefined}
      >
        {splitText ?? children}
      </span>
    </Component>
  );
};

export default ScrollFloat;
