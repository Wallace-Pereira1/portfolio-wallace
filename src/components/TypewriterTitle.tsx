import React, { useState, useEffect } from 'react';
import { useReducedMotion } from 'motion/react';

interface TypewriterTitleProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'span';
  speed?: number;
  startDelay?: number;
  waitForPreloader?: boolean;
}

export default function TypewriterTitle({
  text,
  className = '',
  as: Component = 'h1',
  speed = 65,
  startDelay = 220,
  waitForPreloader = false,
}: TypewriterTitleProps) {
  const shouldReduceMotion = useReducedMotion();
  // Remove any trailing period so the blinking '|' acts as the final terminal point
  const cleanTarget = text.replace(/\.+$/, '');
  const [charCount, setCharCount] = useState<number>(() =>
    shouldReduceMotion ? cleanTarget.length : 0
  );

  useEffect(() => {
    if (shouldReduceMotion) {
      setCharCount(cleanTarget.length);
      return;
    }

    setCharCount(0);
    let intervalTimer: ReturnType<typeof setInterval> | null = null;
    let delayTimer: ReturnType<typeof setTimeout> | null = null;
    let current = 0;

    const startTyping = (delay: number) => {
      delayTimer = setTimeout(() => {
        intervalTimer = setInterval(() => {
          current += 1;
          setCharCount(current);
          if (current >= cleanTarget.length) {
            if (intervalTimer) clearInterval(intervalTimer);
          }
        }, speed);
      }, delay);
    };

    const isPreloaderDone =
      !waitForPreloader ||
      (typeof window !== 'undefined' && Boolean((window as unknown as { __preloaderFinished?: boolean }).__preloaderFinished));

    if (isPreloaderDone) {
      startTyping(startDelay);
    } else {
      let started = false;
      const onPreloaderCompleted = () => {
        if (!started) {
          started = true;
          // Generous breath after preloader fades out so user observes the cursor before letters type
          startTyping(320);
        }
      };

      window.addEventListener('preloader-completed', onPreloaderCompleted);

      // Fallback in case preloader completes before listener is registered or isn't shown
      const fallbackTimer = setTimeout(() => {
        if (!started) {
          started = true;
          startTyping(150);
        }
      }, 1800);

      return () => {
        window.removeEventListener('preloader-completed', onPreloaderCompleted);
        clearTimeout(fallbackTimer);
        if (delayTimer) clearTimeout(delayTimer);
        if (intervalTimer) clearInterval(intervalTimer);
      };
    }

    return () => {
      if (delayTimer) clearTimeout(delayTimer);
      if (intervalTimer) clearInterval(intervalTimer);
    };
  }, [cleanTarget, speed, startDelay, shouldReduceMotion, waitForPreloader]);

  const displayed = cleanTarget.slice(0, charCount);

  // Keep cursor bound to the last word to prevent the cursor pipe from wrapping alone
  const lastSpaceIndex = displayed.lastIndexOf(' ');
  const firstPart = lastSpaceIndex !== -1 ? displayed.slice(0, lastSpaceIndex + 1) : '';
  const lastWord = lastSpaceIndex !== -1 ? displayed.slice(lastSpaceIndex + 1) : displayed;

  return (
    <Component className={className}>
      <span>{firstPart}</span>
      <span className="inline-block whitespace-nowrap">
        <span>{lastWord}</span>
        <span
          aria-hidden="true"
          className="inline font-mono font-light ml-0.5 select-none text-theme-text animate-cursor-blink"
        >
          |
        </span>
      </span>
    </Component>
  );
}
