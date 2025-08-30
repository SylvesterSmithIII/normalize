"use client";
import { useEffect, useRef } from "react";

export default function BackgroundDots() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const numDots = 200; // more dots
    const minRadius = 6;
    const maxRadius = 20;
    const dots = [];

    // Generate dots randomly across the whole canvas
    const createDots = () => {
      dots.length = 0;
      for (let i = 0; i < numDots; i++) {
        dots.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          radius: Math.random() * (maxRadius - minRadius) + minRadius,
          color: `hsl(${Math.random() * 360}, ${20 + Math.random() * 30}%, ${75 + Math.random() * 15}%)`

        });
      }
    };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      createDots();
      draw(); // draw immediately on resize
    };

    const draw = (offsetX = 0, offsetY = 0) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      dots.forEach(dot => {
        // Repeat dots around edges to prevent gaps
        for (let dx = -1; dx <= 1; dx++) {
          for (let dy = -1; dy <= 1; dy++) {
            ctx.beginPath();
            ctx.arc(dot.x + offsetX + dx * window.innerWidth, dot.y + offsetY + dy * window.innerHeight, dot.radius, 0, Math.PI * 2);
            ctx.fillStyle = dot.color;
            ctx.fill();
          }
        }
      });
    };

    const handleScroll = () => {
      const offsetX = window.scrollY * 0.05;
      const offsetY = window.scrollY * 0.05;
      draw(offsetX, offsetY);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10" />;
}
