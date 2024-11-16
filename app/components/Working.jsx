"use client";
import React, { useState, useEffect } from "react";
import { Cloud, Settings, Zap, Terminal, Server, Cpu } from "lucide-react";

// Animated terminal text component
const AnimatedTerminal = ({ lines, repeat = true }) => {
  const [currentLine, setCurrentLine] = useState(0);
  const [text, setText] = useState("");

  useEffect(() => {
    if (currentLine < lines.length) {
      const timer = setTimeout(() => {
        setText((prev) => prev + lines[currentLine].text + "\n");
        setCurrentLine((prev) => prev + 1);
      }, lines[currentLine].delay || 1000);

      return () => clearTimeout(timer);
    } else if (repeat) {
      const timer = setTimeout(() => {
        setText("");
        setCurrentLine(0);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [currentLine, lines, repeat]);

  return (
    <pre className="text-sm font-mono">
      <code>
        {text}
        <span className="animate-pulse">_</span>
      </code>
    </pre>
  );
};

// Progress indicator component
const ProgressIndicator = ({ value, label, color = "sky" }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(value);
    }, 500);
    return () => clearTimeout(timer);
  }, [value]);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm text-white/60">{label}</span>
        <span className={`text-sm text-${color}-400`}>{progress}%</span>
      </div>
      <div className={`h-2 rounded-full bg-${color}-400/10 overflow-hidden`}>
        <div
          className={`h-full rounded-full bg-${color}-400/40 transition-all duration-1000 ease-out`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

const Working = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  // Terminal animation content
  const deployLines = [
    { text: "$ LmCloud deploy gpt-j-6b", delay: 1000 },
    { text: "Provisioning cloud resources...", delay: 500 },
    { text: "Configuring deployment: ████████████ 100%", delay: 1500 },
    { text: "Optimizing for inference...", delay: 800 },
    { text: "Model ready for customization!", delay: 500 },
  ];

  return (
    <div className="relative overflow-hidden bg-black py-24 font-space">
      {/* Enhanced background with animated gradients and grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(0,179,255,0.1),transparent_50%)] animate-pulse-slow" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(0,179,255,0.05),transparent_50%)] animate-pulse-slow" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
        <div className="absolute inset-0 animate-pulse-slow bg-[radial-gradient(circle_400px_at_50%_50%,rgba(0,179,255,0.06),transparent_100%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4">
        <div className="text-center">
          <div className="inline-flex items-center rounded-full border border-sky-500/20 bg-sky-500/10 px-6 py-2 text-sm text-sky-400">
            <Terminal className="mr-2 h-4 w-4" />
            One-Click Deployment
          </div>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            How{" "}
            <span className="relative">
              <span className="absolute -inset-1 block animate-pulse rounded-lg bg-sky-500/20 blur-xl"></span>
              <span className="relative bg-gradient-to-r from-sky-400 via-blue-500 to-sky-400 bg-clip-text text-transparent animate-gradient-x">
                LmCloud
              </span>
            </span>{" "}
            Works
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/60">
            Deploy and customize cloud LLMs in three simple steps
          </p>
        </div>

        <div className="relative mt-20">
          <div className="grid gap-12 md:grid-cols-3">
            {/* Step 1 */}
            <div
              className="relative flex flex-col items-center group"
              onMouseEnter={() => setActiveStep(0)}
            >
              <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-sky-400/10 ring-2 ring-sky-400/20 transition-all duration-300 group-hover:ring-sky-400/40 group-hover:bg-sky-400/20">
                <Cloud className="h-8 w-8 text-sky-400 transition-transform duration-300 group-hover:scale-110" />
              </div>
              <h3 className="mb-4 text-xl font-semibold text-white">
                Select Your Model
              </h3>
              <p className="text-center text-white/60">
                Choose from our catalog of pre-configured LLMs or specify your
                custom model requirements.
              </p>
              <div className="mt-6 w-full rounded-xl border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:border-sky-400/20 hover:bg-white/[0.07] backdrop-blur-sm">
                <AnimatedTerminal lines={deployLines} />
              </div>
            </div>

            {/* Step 2 */}
            <div
              className="relative flex flex-col items-center group"
              onMouseEnter={() => setActiveStep(1)}
            >
              <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-sky-400/10 ring-2 ring-sky-400/20 transition-all duration-300 group-hover:ring-sky-400/40 group-hover:bg-sky-400/20">
                <Settings className="h-8 w-8 text-sky-400 transition-transform duration-300 group-hover:rotate-90" />
              </div>
              <h3 className="mb-4 text-xl font-semibold text-white">
                Customize Performance
              </h3>
              <p className="text-center text-white/60">
                Fine-tune your model's behavior with our intuitive interface.
                Adjust parameters for optimal performance.
              </p>
              <div className="mt-6 w-full space-y-4 rounded-xl border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:border-sky-400/20 hover:bg-white/[0.07] backdrop-blur-sm">
                <ProgressIndicator label="Response Speed" value={75} />
                <ProgressIndicator label="Context Length" value={50} />
                <ProgressIndicator label="Resource Usage" value={60} />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/60">Status</span>
                  <span className="flex items-center text-emerald-400">
                    <span className="mr-2 h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    Optimized
                  </span>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div
              className="relative flex flex-col items-center group"
              onMouseEnter={() => setActiveStep(2)}
            >
              <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-sky-400/10 ring-2 ring-sky-400/20 transition-all duration-300 group-hover:ring-sky-400/40 group-hover:bg-sky-400/20">
                <Zap className="h-8 w-8 text-sky-400 transition-transform duration-300 group-hover:scale-110" />
              </div>
              <h3 className="mb-4 text-xl font-semibold text-white">
                Launch & Scale
              </h3>
              <p className="text-center text-white/60">
                Deploy your customized model instantly. Scale automatically
                based on demand.
              </p>
              <div className="mt-6 w-full rounded-xl border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:border-sky-400/20 hover:bg-white/[0.07] backdrop-blur-sm">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <Server className="h-4 w-4 text-sky-400 mr-2" />
                    <span className="text-sm text-white/60">
                      Deployment Status
                    </span>
                  </div>
                  <span className="flex items-center text-emerald-400 text-sm">
                    <span className="mr-2 h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    Running
                  </span>
                </div>
                <pre className="text-sm font-mono">
                  <code>
                    <span className="text-purple-400">POST</span>{" "}
                    <span className="text-sky-400">/v1/completion</span>
                    {"\n"}
                    <span className="text-emerald-400">
                      Authorization: Bearer sk_...
                    </span>
                    {"\n"}
                    <span className="text-orange-400">
                      {"{"}"prompt": "Tell me about..."{"}"}
                    </span>
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 flex justify-center">
          <a
            href="/deploy"
            className="group relative inline-flex items-center gap-2 rounded-full bg-sky-500 px-8 py-3 text-base font-medium text-white transition-all duration-300 hover:bg-sky-600 hover:scale-105"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            Deploy Now
            <svg
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
            <div className="absolute -inset-1 animate-pulse rounded-full bg-sky-500/20 blur-xl group-hover:bg-sky-500/30"></div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Working;
