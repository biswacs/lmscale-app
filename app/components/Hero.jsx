"use client";
import { Terminal } from "lucide-react";
import React, { useState } from "react";

const FloatingParticle = ({ delay }) => {
  return (
    <div
      className={`absolute h-1 w-1 rounded-full bg-sky-400/40 animate-[float_4s_ease-in-out_infinite] opacity-0`}
      style={{
        animationDelay: `${delay}s`,
        animation:
          "float 4s ease-in-out infinite, fade-in-out 4s ease-in-out infinite",
      }}
    />
  );
};

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    setMousePosition({ x: clientX, y: clientY });
  };

  return (
    <div
      className="relative min-h-screen overflow-hidden bg-black font-space"
      onMouseMove={handleMouseMove}
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
        <div
          className="absolute inset-0 animate-pulse-slow bg-[radial-gradient(circle_800px_at_var(--mouse-x,100px)_var(--mouse-y,100px),rgba(20,179,255,0.3),transparent_100%)]"
          style={{
            "--mouse-x": `${mousePosition.x}px`,
            "--mouse-y": `${mousePosition.y}px`,
          }}
        />
      </div>

      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <FloatingParticle key={i} delay={i * 0.2} />
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pt-32 pb-20">
        <div className="text-center">
          <div className="mb-8 inline-flex items-center rounded-full border border-sky-500/20 bg-sky-500/10 px-6 py-2 text-sm text-sky-400 backdrop-blur-sm hover:scale-105 transition-transform duration-300">
            <Terminal className="mr-2 h-4 w-4 animate-pulse" />
            Now in Public Beta
          </div>

          <h1 className="relative text-4xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl">
            <span className="relative">
              <span className="absolute -inset-x-2 -inset-y-2 block animate-pulse rounded-2xl bg-sky-400/5 blur-xl" />
              <span className="relative">
                Run Language Models <br />
                <span className="relative">
                  <span className="absolute -inset-x-4 -inset-y-2 block animate-pulse rounded-2xl bg-sky-400/10 blur-xl" />
                  <span className="relative bg-gradient-to-r from-sky-400 via-sky-500 to-sky-400 bg-clip-text text-transparent animate-gradient-x">
                    In The Cloud
                  </span>
                </span>
              </span>
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/60">
            Deploy and scale language models with zero infrastructure headaches.
            Simple, fast, and secure cloud deployment.
          </p>

          <div className="mt-10 flex items-center justify-center gap-4">
            <a className="group relative inline-flex items-center rounded-full bg-sky-500 px-8 py-3 text-base font-medium text-white transition-all duration-300 hover:bg-sky-600 hover:shadow-[0_0_20px_rgba(0,179,255,0.5)]">
              Get Started
              <svg
                className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <div className="absolute -inset-1 animate-pulse rounded-full bg-sky-500/20 blur-xl group-hover:bg-sky-500/30"></div>
            </a>
          </div>

          <div className="mt-16 mx-auto max-w-3xl rounded-lg border border-sky-500/20 bg-black/50 p-4 backdrop-blur-sm">
            <div className="flex items-center space-x-2 mb-2">
              <div className="h-3 w-3 rounded-full bg-red-500"></div>
              <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
              <div className="h-3 w-3 rounded-full bg-green-500"></div>
            </div>
            <pre className="text-left text-sm text-white/80 mt-2">
              <code>{`curl -X POST "https://api.LmScale.ai/v1/completion" \\
-H "Content-Type: application/json" \\
-H "Authorization: Bearer your-api-key" \\
-d '{
  "prompt": "Explain quantum computing in simple terms",
  "max_tokens": 100,
  "temperature": 0.7,
  "top_p": 0.9
}'`}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
