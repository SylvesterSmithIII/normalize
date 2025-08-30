'use client';

import { useEffect, useRef } from "react";

export default function BouncingBalls() {
  const canvasRef = useRef(null);
  const balls = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const numBalls = 40;
    const minRadius = 20;
    const maxRadius = 60;

    // Ball Constructor
    function createBall() {
      const radius = Math.random() * (maxRadius - minRadius) + minRadius;
      return {
        x: Math.random() * (canvas.width - radius * 2) + radius,
        y: Math.random() * (canvas.height - radius * 2) + radius,
        vx: (Math.random() - 0.5) * 1,
        vy: (Math.random() - 0.5) * 1,
        radius,
        color: `hsl(${Math.random() * 360}, 70%, 60%)`,
      };
    }

    // Initialize Balls
    balls.current = Array.from({ length: numBalls }, createBall);

    // Ball Physics
    function updateBalls() {
      for (let i = 0; i < balls.current.length; i++) {
        const b1 = balls.current[i];

        b1.x += b1.vx;
        b1.y += b1.vy;

        // Bounce off walls
        if (b1.x - b1.radius < 0 || b1.x + b1.radius > canvas.width) {
          b1.vx *= -1;
        }
        if (b1.y - b1.radius < 0 || b1.y + b1.radius > canvas.height) {
          b1.vy *= -1;
        }

        // Repel from other balls
        for (let j = i + 1; j < balls.current.length; j++) {
          const b2 = balls.current[j];
          const dx = b2.x - b1.x;
          const dy = b2.y - b1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const minDist = b1.radius + b2.radius + 8; // Gap between balls

          if (dist < minDist) {
            // Repulsion effect like magnets
            const angle = Math.atan2(dy, dx);
            const targetX = b1.x + Math.cos(angle) * minDist;
            const targetY = b1.y + Math.sin(angle) * minDist;
            const ax = (targetX - b2.x) * 0.02;
            const ay = (targetY - b2.y) * 0.02;

            b1.vx -= ax;
            b1.vy -= ay;
            b2.vx += ax;
            b2.vy += ay;
          }
        }
      }
    }

    // Draw Balls
    function drawBalls() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      balls.current.forEach((ball) => {
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = ball.color;
        ctx.fill();
      });
    }

    function animate() {
      updateBalls();
      drawBalls();
      requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-0" />;
}
