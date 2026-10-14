import React, { useState, useEffect, useCallback, useRef } from 'react';

const TARGET_TEXT = 'WALLACE PEREIRA';
const SCRAMBLE_CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_@#$';
const ANIMATION_DURATION_MS = 850; // Under 1.2s total budget
const SETTLE_PAUSE_MS = 200;       // Brief hold on final decoded name
const FADE_OUT_DURATION_MS = 150;  // Crisp, fast exit fade

export default function DecodePreloader() {
  const [isActive, setIsActive] = useState<boolean>(true);
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);
  const [displayText, setDisplayText] = useState<string>('');
  
  const frameRef = useRef<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const lastScrambleTimeRef = useRef<number>(0);

  const finishAndExit = useCallback(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    setIsFadingOut(true);
    setTimeout(() => {
      setIsActive(false);
      document.body.style.overflow = '';
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      if (typeof window !== 'undefined') {
        (window as any).__preloaderFinished = true;
        window.dispatchEvent(new CustomEvent('preloader-completed'));
      }
    }, FADE_OUT_DURATION_MS);
  }, []);

  const runDecodeAnimation = useCallback(() => {
    if (typeof window !== 'undefined') {
      (window as any).__preloaderFinished = false;
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    setIsActive(true);
    setIsFadingOut(false);
    document.body.style.overflow = 'hidden';

    startTimeRef.current = performance.now();
    lastScrambleTimeRef.current = 0;

    const tick = (now: number) => {
      if (!startTimeRef.current) startTimeRef.current = now;
      const elapsed = now - startTimeRef.current;
      const progress = Math.min(elapsed / ANIMATION_DURATION_MS, 1);

      // Lock position from left to right incrementally
      const lockIndex = Math.floor(progress * TARGET_TEXT.length);

      // Only re-randomize unscrambled characters every ~35ms for clean terminal feel
      const shouldRandomize = now - lastScrambleTimeRef.current > 35 || progress >= 1;
      if (shouldRandomize) {
        lastScrambleTimeRef.current = now;

        const currentChars: string[] = [];
        for (let i = 0; i < TARGET_TEXT.length; i++) {
          if (TARGET_TEXT[i] === ' ') {
            currentChars.push(' ');
          } else if (i < lockIndex || progress >= 1) {
            currentChars.push(TARGET_TEXT[i]);
          } else {
            const randomChar = SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
            currentChars.push(randomChar);
          }
        }
        setDisplayText(currentChars.join(''));
      }

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        // Ensure strictly accurate final text
        setDisplayText(TARGET_TEXT);

        // Pause briefly on decoded state before crisp exit
        timerRef.current = setTimeout(() => {
          finishAndExit();
        }, SETTLE_PAUSE_MS);
      }
    };

    frameRef.current = requestAnimationFrame(tick);
  }, [finishAndExit]);

  // Handle escape key or click to skip immediately
  useEffect(() => {
    if (!isActive) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (frameRef.current) cancelAnimationFrame(frameRef.current);
        if (timerRef.current) clearTimeout(timerRef.current);
        finishAndExit();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isActive, finishAndExit]);

  // Support replaying if triggered elsewhere in app
  useEffect(() => {
    const handleReplay = () => {
      runDecodeAnimation();
    };

    window.addEventListener('replay-preloader', handleReplay);
    window.addEventListener('replay-code-rain', handleReplay);
    return () => {
      window.removeEventListener('replay-preloader', handleReplay);
      window.removeEventListener('replay-code-rain', handleReplay);
    };
  }, [runDecodeAnimation]);

  // Initial startup execution
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    runDecodeAnimation();

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      if (timerRef.current) clearTimeout(timerRef.current);
      document.body.style.overflow = '';
    };
  }, [runDecodeAnimation]);

  if (!isActive) return null;

  return (
    <div
      id="terminal-decode-preloader"
      onClick={finishAndExit}
      className={`fixed inset-0 z-[99999] bg-[#000000] flex items-center justify-center select-none cursor-pointer transition-opacity duration-150 ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{ backgroundColor: '#000000' }}
      aria-label="Carregando portfólio"
    >
      <div className="flex items-center justify-center font-mono px-4">
        {/* Main Monospace Decoded Text */}
        <span
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium tracking-wider text-[#ededed] whitespace-pre"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          {displayText || ' '}
        </span>

        {/* Solid Block Terminal Cursor with Steps() Blink */}
        <span
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium text-[#444444] select-none ml-1.5 inline-block animate-terminal-cursor"
          aria-hidden="true"
        >
          █
        </span>
      </div>
    </div>
  );
}
