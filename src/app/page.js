"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

const MagicEffect = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let particles = [];
    let mouse = { x: -100, y: -100 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resize);
    resize();

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      for (let i = 0; i < 3; i++) {
        particles.push({
          x: mouse.x,
          y: mouse.y,
          size: Math.random() * 6 + 2,
          speedX: Math.random() * 3 - 1.5,
          speedY: Math.random() * 3 - 1.5,
          hue: Math.random() * 60 + 190, // Magic blue/purple tones
          life: 1
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
        for (let i = 0; i < 3; i++) {
          particles.push({
            x: mouse.x,
            y: mouse.y,
            size: Math.random() * 6 + 2,
            speedX: Math.random() * 3 - 1.5,
            speedY: Math.random() * 3 - 1.5,
            hue: Math.random() * 60 + 190,
            life: 1
          });
        }
      }
    };
    window.addEventListener("touchmove", handleTouchMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        let p = particles[i];

        ctx.fillStyle = `hsla(${p.hue}, 100%, 75%, ${p.life})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        ctx.shadowBlur = 20;
        ctx.shadowColor = `hsla(${p.hue}, 100%, 75%, ${p.life})`;

        p.x += p.speedX;
        p.y += p.speedY;
        p.life -= 0.015; // Slow down fading for a longer trail
        p.size -= 0.05;

        if (p.size <= 0.1 || p.life <= 0) {
          particles.splice(i, 1);
          i--;
        }
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50 mix-blend-screen"
    />
  );
};

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-[#11154D] to-[#291337] flex items-center justify-center font-sans">

      {/* Background glow behind center content */}
      <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
        <div className="w-[800px] h-[800px] bg-[#6a90f1] rounded-full blur-[150px]"></div>
      </div>

      <MagicEffect />

      <h1 className="sr-only">minChap - ดูซีรีส์และหนังแนวตั้งบน TikTok</h1>

      <div className="relative z-10 flex flex-col items-center gap-1 w-full max-w-sm md:max-w-[500px] px-6">

        {/* Minchap Logo Area */}
        <div className="relative w-full h-[70px] md:h-[130px] flex items-center justify-center drop-shadow-2xl hover:scale-105 transition-transform duration-500">
          <Image
            src="/minchap.svg"
            alt="minChap"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Divider with text */}
        <div className="relative flex items-center w-full my-2">
          <div className="flex-grow border-t border-gray-400 opacity-50"></div>
          <span className="flex-shrink-0 mx-4 text-gray-300 text-sm md:text-base font-light tracking-wider">
            Coming Soon on
          </span>
          <div className="flex-grow border-t border-gray-400 opacity-50"></div>
        </div>

        {/* TikTok Logo Area */}
        <div className="relative w-full h-[70px] md:h-[100px] flex items-center justify-center drop-shadow-lg hover:scale-105 transition-transform duration-500">
          <Image
            src="/tiktok.svg"
            alt="TikTok"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-6 w-full text-center text-xs md:text-sm font-light tracking-wide z-10 flex flex-col items-center">
        <div className="text-gray-400 pointer-events-none mb-2">
          Developed by Love Drama Co.,ltd
        </div>
        <div className="flex gap-4 items-center">
          <Link href="/terms-of-service" className="text-gray-500 hover:text-white transition-colors duration-300 underline underline-offset-4">
            Terms of Service
          </Link>
          <span className="text-gray-600">|</span>
          <Link href="/privacy-policy" className="text-gray-500 hover:text-white transition-colors duration-300 underline underline-offset-4">
            Privacy Policy
          </Link>
        </div>
      </div>
    </main>
  );
}
