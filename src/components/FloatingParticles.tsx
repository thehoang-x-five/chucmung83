import { useEffect, useRef } from "react";

const FloatingParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Sparkle particles
    interface Particle {
      x: number; y: number; size: number; speedX: number; speedY: number;
      opacity: number; opacityDir: number; color: string;
    }

    const colors = [
      "rgba(210, 145, 140, ",
      "rgba(230, 180, 170, ",
      "rgba(200, 170, 120, ",
      "rgba(255, 215, 180, ",
    ];

    const particles: Particle[] = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 0.5,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: -Math.random() * 0.4 - 0.1,
      opacity: Math.random() * 0.5 + 0.2,
      opacityDir: (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 0.005 + 0.002),
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    // Falling petals
    interface Petal {
      x: number; y: number; size: number; speedY: number; speedX: number;
      rotation: number; rotationSpeed: number; opacity: number; swayPhase: number;
    }

    const petals: Petal[] = Array.from({ length: 20 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      size: Math.random() * 12 + 6,
      speedY: Math.random() * 1 + 0.5,
      speedX: (Math.random() - 0.5) * 0.3,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.03,
      opacity: Math.random() * 0.4 + 0.15,
      swayPhase: Math.random() * Math.PI * 2,
    }));

    const drawPetal = (p: Petal) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.globalAlpha = p.opacity;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(p.size * 0.4, -p.size * 0.5, p.size, -p.size * 0.3, p.size * 0.6, p.size * 0.1);
      ctx.bezierCurveTo(p.size * 0.8, p.size * 0.5, p.size * 0.2, p.size * 0.6, 0, 0);
      ctx.fillStyle = `rgba(230, 160, 155, ${p.opacity})`;
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.restore();
    };

    let frame = 0;
    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;

      // Draw sparkles
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.opacity += p.opacityDir;
        if (p.opacity > 0.7 || p.opacity < 0.05) p.opacityDir *= -1;
        if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width; }
        if (p.x < -10 || p.x > canvas.width + 10) p.x = Math.random() * canvas.width;

        // Sparkle glow
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
        gradient.addColorStop(0, p.color + p.opacity + ")");
        gradient.addColorStop(1, p.color + "0)");
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.min(p.opacity * 1.5, 1) + ")";
        ctx.fill();
      });

      // Draw petals
      petals.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(frame * 0.01 + p.swayPhase) * 0.5;
        p.rotation += p.rotationSpeed;
        if (p.y > canvas.height + 20) {
          p.y = -20;
          p.x = Math.random() * canvas.width;
        }
        drawPetal(p);
      });

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
};

export default FloatingParticles;
