"use client";
import React, { useState, useEffect } from "react";
import { Cloud, Settings, Zap, Terminal, Server } from "lucide-react";

const ModelsTerminal = () => (
  <pre className="text-sm font-mono space-y-1">
    <code>
      <span className="text-emerald-600">├─ Meta AI</span>
      {"\n"}
      <span className="text-blue-600">│ ├─ Llama 3.1 70B</span>
      {"\n"}
      <span className="text-emerald-600">├─ Mistral AI</span>
      {"\n"}
      <span className="text-blue-600">│ ├─ Mixtral 8×7B</span>
      {"\n"}
      <span className="text-emerald-600">└─ Google</span>
      {"\n"}
      <span className="text-blue-600"> └─ Gemma 2 7B</span>
    </code>
  </pre>
);

const ProgressIndicator = ({ value, label }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(value), 500);
    return () => clearTimeout(timer);
  }, [value]);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm text-neutral-600">{label}</span>
        <span className="text-sm text-neutral-900">{progress}%</span>
      </div>
      <div className="h-2 rounded-full bg-neutral-100">
        <div
          className="h-full rounded-full bg-neutral-900 transition-all duration-1000 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

const FeatureCard = ({ icon: Icon, title, description, content }) => (
  <div className="group relative h-[420px] overflow-hidden bg-white p-6">
    <div className="relative flex h-full flex-col">
      <div className="rounded-xl bg-gradient-to-br from-neutral-50 to-neutral-100 p-2 shadow-sm transition-transform duration-500 group-hover:scale-110 w-12 h-12 flex items-center justify-center">
        <Icon className="h-6 w-6 text-neutral-900" />
      </div>
      <h3 className="mt-6 text-xl font-semibold text-neutral-900">{title}</h3>
      <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
        {description}
      </p>
      <div className="mt-6 flex-1 rounded-xl border border-neutral-200 p-4 transition-colors duration-300 group-hover:border-neutral-300">
        {content}
      </div>
    </div>
  </div>
);

const Working = () => {
  const features = [
    {
      icon: Cloud,
      title: "Select Your Model",
      description:
        "Choose from our catalog of pre-configured open source LLMs.",
      content: <ModelsTerminal />,
    },
    {
      icon: Zap,
      title: "Launch & Scale",
      description:
        "Deploy your customized model instantly. Scale automatically based on demand.",
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Server className="h-4 w-4 text-neutral-900" />
              <span className="text-sm text-neutral-600">
                Deployment Status
              </span>
            </div>
            <span className="flex items-center text-emerald-600 text-sm">
              <span className="mr-2 h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Running
            </span>
          </div>
          <pre className="text-sm font-mono mt-4">
            <code>
              <span className="text-purple-600">POST</span>{" "}
              <span className="text-blue-600">/v1/completion</span>
              {"\n"}
              <span className="text-emerald-600">
                Authorization: Bearer sk_...
              </span>
              {"\n"}
              <span className="text-orange-600">
                {"{"}"prompt": "Tell me about..."{"}"}
              </span>
            </code>
          </pre>
        </div>
      ),
    },
    {
      icon: Settings,
      title: "Customize Performance",
      description:
        "Tune your model's behavior, adjust parameters for optimal performance.",
      content: (
        <div className="space-y-4">
          <ProgressIndicator label="Response Speed" value={75} />
          <ProgressIndicator label="Context Length" value={50} />
          <ProgressIndicator label="Resource Usage" value={60} />
        </div>
      ),
    },
  ];

  return (
    <div className="relative min-h-screen bg-white py-24 font-mono">
      <div className="relative mx-auto max-w-7xl px-4">
        <div className="text-center">
          <h2 className="mt-6 font-mono text-3xl font-medium tracking-tight text-neutral-900">
            How LmScale Works
          </h2>
          <p className="mx-auto mt-4 text-lg text-neutral-600">
            Deploy and customize open source LLMs in three simple steps
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Working;
