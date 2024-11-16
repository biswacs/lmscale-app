"use client";
import React, { useState, useEffect } from "react";
import { Cloud, Settings, Zap, Terminal, Server } from "lucide-react";

const ModelsTerminal = () => {
  return (
    <pre className="text-sm font-mono space-y-1">
      <code>
        <span className="text-green-400">├─ Meta</span>
        {"\n"}
        <span className="text-sky-400">│ └─ Llama-2-70b</span>
        {"\n"}
        <span className="text-green-400">├─ Mistral AI</span>
        {"\n"}
        <span className="text-sky-400">│ └─ Mixtral-8x7b</span>
        {"\n"}
        <span className="text-green-400">├─ EleutherAI</span>
        {"\n"}
        <span className="text-sky-400">│ └─ Pythia-12b</span>
        {"\n"}
        <span className="text-green-400">└─ TII</span>
        {"\n"}
        <span className="text-sky-400"> └─ Falcon-40b</span>
      </code>
    </pre>
  );
};

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
      <div className={`h-2 rounded-full overflow-hidden`}>
        <div
          className={`h-full rounded-full bg-sky-400/80 transition-all duration-1000 ease-out`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

const Working = () => {
  return (
    <div className="relative overflow-hidden bg-black py-24 font-space">
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
            Deploy and customize open source LLMs in three simple steps
          </p>
        </div>

        <div className="relative mt-20">
          <div className="grid gap-12 md:grid-cols-3">
            <div className="relative flex flex-col items-center group">
              <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-sky-400/10 ring-2 ring-sky-400/20 transition-all duration-300 group-hover:ring-sky-400/40 group-hover:bg-sky-400/20">
                <Cloud className="h-8 w-8 text-sky-400 transition-transform duration-300 group-hover:rotate-45" />
              </div>
              <h3 className="mb-4 text-xl font-semibold text-white">
                Select Your Model
              </h3>
              <p className="text-center text-white/60">
                Choose from our catalog of pre-configured open source LLMs.
              </p>
              <div className="mt-6 w-full rounded-xl border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:border-sky-400/20 hover:bg-white/[0.07] backdrop-blur-sm">
                <ModelsTerminal />
              </div>
            </div>
            <div className="relative flex flex-col items-center group">
              <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-sky-400/10 ring-2 ring-sky-400/20 transition-all duration-300 group-hover:ring-sky-400/40 group-hover:bg-sky-400/20">
                <Zap className="h-8 w-8 text-sky-400 transition-transform duration-300 group-hover:rotate-45" />
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
            <div className="relative flex flex-col items-center group">
              <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-sky-400/10 ring-2 ring-sky-400/20 transition-all duration-300 group-hover:ring-sky-400/40 group-hover:bg-sky-400/20">
                <Settings className="h-8 w-8 text-sky-400 transition-transform duration-300 group-hover:rotate-45" />
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Working;
