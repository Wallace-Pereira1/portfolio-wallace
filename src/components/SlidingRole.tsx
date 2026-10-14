import React, { useEffect, useRef, useState } from 'react';

interface SlidingRoleProps {
  role: string;
  className?: string;
}

export function SlidingRole({ role, className = '' }: SlidingRoleProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [isOverflow, setIsOverflow] = useState(false);
  const [textWidth, setTextWidth] = useState(0);

  const checkOverflow = () => {
    if (!containerRef.current || !textRef.current) return;
    const containerW = containerRef.current.clientWidth;
    const textW = textRef.current.scrollWidth;
    setTextWidth(textW);
    // If text width exceeds container width by more than 2px, it is overflowing
    setIsOverflow(textW > containerW + 2);
  };

  useEffect(() => {
    checkOverflow();

    // Check once custom fonts are loaded
    if (typeof document !== 'undefined' && 'fonts' in document) {
      document.fonts.ready.then(() => {
        checkOverflow();
      });
    }

    const containerEl = containerRef.current;
    if (!containerEl) return;

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        checkOverflow();
      });
      resizeObserver.observe(containerEl);
    }

    window.addEventListener('resize', checkOverflow);

    return () => {
      if (resizeObserver) resizeObserver.disconnect();
      window.removeEventListener('resize', checkOverflow);
    };
  }, [role]);

  // Adjust duration based on text length: ~22px per second for comfortable readability
  const duration = Math.max(10, Math.round(textWidth / 20));

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden w-full max-w-full ${className}`}
      style={{
        maskImage: isOverflow
          ? 'linear-gradient(to right, transparent 0%, black 8px, black calc(100% - 8px), transparent 100%)'
          : undefined,
        WebkitMaskImage: isOverflow
          ? 'linear-gradient(to right, transparent 0%, black 8px, black calc(100% - 8px), transparent 100%)'
          : undefined,
      }}
      title={role}
    >
      {/* Invisible span for exact text measurement without clipping */}
      <span
        ref={textRef}
        aria-hidden="true"
        className="invisible absolute left-0 top-0 pointer-events-none whitespace-nowrap font-medium text-[11px]"
      >
        {role}
      </span>

      {isOverflow ? (
        <div
          className="inline-flex items-center whitespace-nowrap animate-role-slide hover:[animation-play-state:paused] active:[animation-play-state:paused]"
          style={{
            animationDuration: `${duration}s`,
          }}
        >
          <span className="font-medium text-[11px] text-theme-text pr-6 whitespace-nowrap">
            {role}
          </span>
          <span className="text-theme-muted/50 text-[10px] pr-6 select-none">•</span>
          <span className="font-medium text-[11px] text-theme-text pr-6 whitespace-nowrap">
            {role}
          </span>
          <span className="text-theme-muted/50 text-[10px] pr-6 select-none">•</span>
        </div>
      ) : (
        <span className="font-medium text-[11px] text-theme-text whitespace-nowrap block">
          {role}
        </span>
      )}
    </div>
  );
}
