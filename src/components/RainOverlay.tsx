import { useEffect, useRef } from "react";

interface RainOverlayProps {
  className?: string;
  intensity?: number;
}

interface Drop {
  length: number;
  opacity: number;
  speed: number;
  x: number;
  y: number;
}

export function RainOverlay({
  className = "",
  intensity = 120,
}: RainOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    const context = canvas?.getContext("2d");

    if (!canvas || !host || !context) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let animationFrame = 0;
    let width = 0;
    let height = 0;
    let drops: Drop[] = [];

    const createDrops = () =>
      Array.from({ length: prefersReducedMotion ? 35 : intensity }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        length: 10 + Math.random() * 17,
        speed: 5 + Math.random() * 7,
        opacity: 0.22 + Math.random() * 0.42,
      }));

    const resize = () => {
      const rect = host.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * pixelRatio));
      canvas.height = Math.max(1, Math.floor(height * pixelRatio));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      drops = createDrops();
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);
      context.lineCap = "round";

      for (const drop of drops) {
        context.beginPath();
        context.moveTo(drop.x, drop.y);
        context.lineTo(drop.x + 3, drop.y + drop.length);
        context.strokeStyle = `rgba(205, 220, 232, ${drop.opacity})`;
        context.lineWidth = 0.7;
        context.stroke();

        if (!prefersReducedMotion) {
          drop.y += drop.speed;
          drop.x += 0.8;
          if (drop.y > height + drop.length) {
            drop.y = -drop.length;
            drop.x = Math.random() * width;
          }
        }
      }

      if (!prefersReducedMotion) {
        animationFrame = window.requestAnimationFrame(draw);
      }
    };

    const observer = new ResizeObserver(() => {
      resize();
      if (prefersReducedMotion) {
        draw();
      }
    });

    resize();
    draw();
    observer.observe(host);

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(animationFrame);
    };
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      className={`rain-overlay ${className}`}
      aria-hidden="true"
    />
  );
}
