import React from "react";

const Hero = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black font-space">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(0,179,255,0.2),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(0,179,255,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div className="relative mx-auto max-w-7xl px-4 pt-32 pb-20">
        <div className="text-center">
          <div className="mb-8 inline-flex items-center rounded-full border border-sky-500/20 bg-sky-500/10 px-6 py-2 text-sm text-sky-400">
            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-sky-400 animate-pulse"></span>
            Now in Public Beta
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl">
            Run LLMs
            <br />
            <span className="bg-gradient-to-r from-sky-400 via-sky-500 to-sky-400 bg-clip-text text-transparent">
              In The Cloud
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/60">
            Deploy and scale your AI models with zero infrastructure headaches.
            Simple, fast, and secure cloud deployment for your local language
            models.
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
            </a>
            <a className="group rounded-full border border-white/10 px-8 py-3 text-base font-medium text-white transition-all duration-300 hover:bg-white/5 hover:border-white/20">
              View Docs
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
