// src/app/test/page.tsx
"use client";

import { useEffect, useRef, useState } from "react";

export default function StarBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null); // Canvas reference
  // Get CSS variables for background and foreground
  const rootStyles = getComputedStyle(document.documentElement);
  const background = rootStyles.getPropertyValue("--background").trim() || "defaultBackground"; // Fallback value
  const foreground = rootStyles.getPropertyValue("--foreground").trim() || "defaultForeground"; // Fallback value
  // Background animation (stars)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const stars: { x: number; y: number; radius: number }[] = [];
    const numStars = 200;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Generate stars
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2,
      });
    }

    const drawStars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = foreground;
      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const updateStars = () => {
      stars.forEach((star) => {
        star.y += 0.5;
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
      });
    };

    const animate = () => {
      drawStars();
      updateStars();
      requestAnimationFrame(animate);
    };

    animate();

    // Handle resizing
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      {/* Background canvas */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full -z-10"
      ></canvas>
    </>
  );
}
