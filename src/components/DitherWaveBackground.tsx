import React, { useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';

interface DitherWaveProps {
  baseColor?: string;
  waveColor?: string;
  pixelSize?: number;
  colorNum?: number;
  waveSpeed?: number;
  waveFrequency?: number;
  waveAmplitude?: number;
  opacity?: number;
  className?: string;
  isFixed?: boolean;
}

// 8x8 Bayer Dithering Matrix normalized
const BAYER_8X8 = [
   0, 32,  8, 40,  2, 34, 10, 42,
  48, 16, 56, 24, 50, 18, 58, 26,
  12, 44,  4, 36, 14, 46,  6, 38,
  60, 28, 52, 20, 62, 30, 54, 22,
   3, 35, 11, 43,  1, 33,  9, 41,
  51, 19, 59, 27, 49, 17, 57, 25,
  15, 47,  7, 39, 13, 45,  5, 37,
  63, 31, 55, 23, 61, 29, 53, 21
];

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace('#', '');
  const bigint = parseInt(clean, 16);
  if (clean.length === 3) {
    const r = ((bigint >> 8) & 0xf) * 17;
    const g = ((bigint >> 4) & 0xf) * 17;
    const b = (bigint & 0xf) * 17;
    return [r, g, b];
  }
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return [r, g, b];
}

export default function DitherWaveBackground({
  baseColor = '#050608',
  waveColor = '#303844',
  pixelSize = 6,
  colorNum = 3,
  waveSpeed = 0.022,
  waveFrequency = 2.2,
  waveAmplitude = 0.20,
  opacity = 0.16,
  className = '',
  isFixed = false,
}: DitherWaveProps) {
  const { theme } = useApp();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Palette adaptation: in light mode use cold slate tones
  const isLight = theme === 'light';
  const effectiveBaseColor = isLight ? '#f5f5f5' : baseColor;
  const effectiveWaveColor = isLight ? '#cfcfcf' : waveColor;
  const effectiveOpacity = isLight ? 0.18 : opacity;

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    // Detect user preferences & mobile screen
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;
    // On mobile, use slightly larger pixels for optimal rendering budget
    const effectivePixelSize = isMobile ? Math.max(pixelSize, 7) : pixelSize;

    // Precalculate palette colors in little-endian 32-bit format: (A << 24) | (B << 16) | (G << 8) | R
    const [r0, g0, b0] = hexToRgb(effectiveBaseColor);
    const [r1, g1, b1] = hexToRgb(effectiveWaveColor);
    const paletteUint32 = new Uint32Array(colorNum);

    for (let i = 0; i < colorNum; i++) {
      const t = colorNum > 1 ? i / (colorNum - 1) : 0;
      const r = Math.round(r0 + (r1 - r0) * t);
      const g = Math.round(g0 + (g1 - g0) * t);
      const b = Math.round(b0 + (b1 - b0) * t);
      paletteUint32[i] = (255 << 24) | (b << 16) | (g << 8) | r;
    }

    // Offscreen low-resolution canvas setup
    const offscreen = document.createElement('canvas');
    const offscreenCtx = offscreen.getContext('2d', { willReadFrequently: true });
    if (!offscreenCtx) return;

    let width = 0;
    let height = 0;
    let gridW = 0;
    let gridH = 0;
    let offscreenImageData: ImageData | null = null;
    let offscreenBuffer: Uint32Array | null = null;

    const resize = () => {
      if (!container || !canvas) return;
      const rect = isFixed
        ? { width: window.innerWidth, height: window.innerHeight }
        : container.getBoundingClientRect();

      width = Math.max(10, Math.floor(rect.width));
      height = Math.max(10, Math.floor(rect.height));

      canvas.width = width;
      canvas.height = height;

      gridW = Math.max(2, Math.ceil(width / effectivePixelSize));
      gridH = Math.max(2, Math.ceil(height / effectivePixelSize));

      offscreen.width = gridW;
      offscreen.height = gridH;

      offscreenImageData = offscreenCtx.createImageData(gridW, gridH);
      offscreenBuffer = new Uint32Array(offscreenImageData.data.buffer);
    };

    resize();

    // Mouse tracking (subtle influence)
    let mouseX = 0.5;
    let mouseY = 0.4;
    let targetMouseX = 0.5;
    let targetMouseY = 0.4;
    const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    const handleMouseMove = (e: MouseEvent) => {
      if (!hasFinePointer) return;
      if (isFixed) {
        targetMouseX = e.clientX / window.innerWidth;
        targetMouseY = e.clientY / window.innerHeight;
      } else if (container) {
        const rect = container.getBoundingClientRect();
        targetMouseX = (e.clientX - rect.left) / rect.width;
        targetMouseY = (e.clientY - rect.top) / rect.height;
      }
    };

    if (hasFinePointer) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    let animationId: number | null = null;
    let isVisible = true;
    let lastTime = performance.now();
    let simTime = 0;

    // Render single frame with organic harmonics & Bayer dithering
    const renderFrame = (tNow: number) => {
      if (!offscreenImageData || !offscreenBuffer || gridW === 0 || gridH === 0) return;

      const dt = Math.min((tNow - lastTime) / 1000, 0.1);
      lastTime = tNow;

      if (!prefersReducedMotion) {
        simTime += dt * (waveSpeed * 60);
      }

      // Smooth mouse easing
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      const spread = 1.0 / (colorNum - 1);
      const invGridW = 1.0 / gridW;
      const invGridH = 1.0 / gridH;

      // Fill low-resolution pixel grid
      for (let y = 0; y < gridH; y++) {
        const ny = y * invGridH;
        const bayerRow = (y & 7) << 3;
        const rowOffset = y * gridW;

        for (let x = 0; x < gridW; x++) {
          const nx = x * invGridW;

          // Organic wave harmonics
          const w1 = Math.sin(nx * waveFrequency * Math.PI * 2.0 + simTime * 1.5 + ny * 1.3);
          const w2 = Math.cos(ny * waveFrequency * Math.PI * 1.7 - simTime * 1.1 + nx * 1.5);
          const w3 = Math.sin((nx * 1.2 + ny * 0.8) * waveFrequency * 2.1 + simTime * 0.8);

          // Subtle radial contours around mouse
          const dx = nx - mouseX;
          const dy = ny - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const w4 = Math.sin(dist * waveFrequency * 2.6 - simTime * 1.0);

          // Harmonized wave field
          const waveHeight = (w1 * 0.40 + w2 * 0.32 + w3 * 0.18 + w4 * 0.10) * waveAmplitude * 2.3;
          let val = 0.5 + waveHeight;

          // Subtle cursor proximity wave
          if (hasFinePointer && dist < 0.25) {
            val += (1.0 - dist / 0.25) * 0.06 * Math.sin(simTime * 2.4);
          }

          // Bayer dithering threshold calculation
          const bayerIdx = bayerRow + (x & 7);
          const ditherOffset = (BAYER_8X8[bayerIdx] + 0.5) / 64.0 - 0.5;
          const ditheredVal = val + ditherOffset * spread;

          // Quantize to discrete color levels
          const level = Math.max(0, Math.min(colorNum - 1, Math.round(ditheredVal * (colorNum - 1))));
          offscreenBuffer[rowOffset + x] = paletteUint32[level];
        }
      }

      // Draw quantized buffer to offscreen canvas
      offscreenCtx.putImageData(offscreenImageData, 0, 0);

      // Blit scaled up without smoothing for sharp retro/editorial dither texture
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(offscreen, 0, 0, width, height);
    };

    // If user prefers reduced motion, draw once and do not animate
    if (prefersReducedMotion) {
      simTime = 1.2;
      renderFrame(performance.now());
      return;
    }

    // Animation Loop
    const tick = (now: number) => {
      if (isVisible) {
        renderFrame(now);
      }
      animationId = requestAnimationFrame(tick);
    };

    animationId = requestAnimationFrame(tick);

    // Pause when tab is not active or hidden
    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
      if (isVisible) {
        lastTime = performance.now();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // If not fixed, observe container intersection
    let observer: IntersectionObserver | null = null;
    if (!isFixed) {
      observer = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;
          isVisible = entry.isIntersecting && !document.hidden;
          if (isVisible) {
            lastTime = performance.now();
          }
        },
        { threshold: 0.05 }
      );
      observer.observe(container);
    }

    // Window & element resize handling
    let resizeRaf: number | null = null;
    const handleResize = () => {
      if (resizeRaf) cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(() => {
        resize();
        if (prefersReducedMotion) {
          renderFrame(performance.now());
        }
      });
    };

    window.addEventListener('resize', handleResize);
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    return () => {
      if (animationId !== null) cancelAnimationFrame(animationId);
      if (resizeRaf !== null) cancelAnimationFrame(resizeRaf);
      if (hasFinePointer) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (observer) observer.disconnect();
      resizeObserver.disconnect();
    };
  }, [
    effectiveBaseColor,
    effectiveWaveColor,
    pixelSize,
    colorNum,
    waveSpeed,
    waveFrequency,
    waveAmplitude,
    theme,
    isFixed,
  ]);

  const positionClass = isFixed
    ? 'fixed inset-0 pointer-events-none overflow-hidden select-none z-0'
    : 'absolute inset-0 pointer-events-none overflow-hidden select-none z-0';

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`${positionClass} ${className}`}
      style={{
        opacity: effectiveOpacity,
      }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
      />
    </div>
  );
}
