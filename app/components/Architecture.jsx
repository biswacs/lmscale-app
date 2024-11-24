"use client";
import React from "react";
import { Cloud, Settings, Zap, Server } from "lucide-react";

const ModelsTerminal = () => (
  <pre className="text-sm space-y-1 font-mono">
    <code>
      <span className="text-blue-600">├─ Base LLM</span>
      {"\n"}
      <span className="text-purple-600">│ ├─ Domain LLM 1</span>
      {"\n"}
      <span className="text-green-600">│ ├─ Domain LLM 2</span>
      {"\n"}
      <span className="text-red-600">│ ├─ Domain LLM 3</span>
      {"\n"}
      <span className="text-orange-600">└─ Domain LLM 4</span>
    </code>
  </pre>
);

const FeatureCard = ({ icon: Icon, title, description, content }) => (
  <div className="group h-[420px] bg-white border border-neutral-200">
    <div className="relative h-full flex flex-col p-6 space-y-4">
      <div className="flex items-center gap-4">
        <Icon className="h-6 w-6 text-neutral-800" />
        <h3 className="text-lg font-medium tracking-tight text-neutral-800 line-clamp-1">
          {title}
        </h3>
      </div>

      <p className="text-sm text-neutral-600 leading-relaxed">{description}</p>
      <div className="flex-1 border border-dashed border-neutral-200 p-4 bg-neutral-50">
        {content}
      </div>
    </div>
  </div>
);

const Architecture = () => {
  const features = [
    {
      icon: Cloud,
      title: "Base LLM Instance",
      description:
        "Single GPU cluster running multiple domain-specific models efficiently.",
      content: <ModelsTerminal />,
    },
    {
      icon: Zap,
      title: "Hot-swap Models",
      description:
        "Zero downtime model swapping with no GPU memory fragmentation.",
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Server className="h-4 w-4 text-neutral-800" />
              <span className="text-sm text-neutral-600">GPU Cluster 1</span>
            </div>
            <span className="flex items-center text-emerald-600 text-sm">
              <span className="mr-2 h-2 w-2 bg-emerald-500"></span>
              Active
            </span>
          </div>
          <pre className="text-sm font-mono mt-4">
            <code>
              <span className="text-purple-600">Model Switch</span>{" "}
              <span className="text-blue-600">Domain LLM 1 → 2</span>
              {"\n"}
              <span className="text-emerald-600">
                Status: Hot-swap Complete
              </span>
              {"\n"}
              <span className="text-orange-600">Memory Usage: Optimized</span>
            </code>
          </pre>
        </div>
      ),
    },
    {
      icon: Settings,
      title: "Simple Integration",
      description:
        "Access cutting-edge AI models through a single, standardized API endpoint. integrate in minutes.",
      content: (
        <div className="space-y-4">
          <pre className="text-sm font-mono">
            <code>
              <span className="text-purple-600">POST</span>{" "}
              <span className="text-neutral-800">/v1/completion</span>
              {"\n\n"}
              <span className="text-neutral-600">{"{"}</span>
              {"\n"}
              <span className="text-neutral-600"> </span>
              <span className="text-blue-600">"model"</span>
              <span className="text-neutral-600">: </span>
              <span className="text-green-600">"mixtral-8x7b"</span>
              <span className="text-neutral-600">,</span>
              {"\n"}
              <span className="text-neutral-600"> </span>
              <span className="text-blue-600">"prompt"</span>
              <span className="text-neutral-600">: </span>
              <span className="text-green-600">"Tell me about..."</span>
              <span className="text-neutral-600">,</span>
              {"\n"}
              <span className="text-neutral-600"> </span>
              <span className="text-blue-600">"max_tokens"</span>
              <span className="text-neutral-600">: </span>
              <span className="text-orange-600">100</span>
              <span className="text-neutral-600">,</span>
              {"\n"}
              <span className="text-neutral-600"> </span>
              <span className="text-blue-600">"temperature"</span>
              <span className="text-neutral-600">: </span>
              <span className="text-orange-600">0.7</span>
              {"\n"}
              <span className="text-neutral-600">{"}"}</span>
            </code>
          </pre>
        </div>
      ),
    },
  ];

  return (
    <div className="relative min-h-screen bg-white py-24">
      <div className="relative mx-auto max-w-7xl px-4">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-light tracking-tight text-neutral-800">
            Multi Model Architecture
          </h1>
          <p className="mx-auto mt-4 text-sm sm:text-lg text-neutral-600">
            Deploy multiple domain-specific models on a single GPU
            infrastructure with optimized resource allocation and seamless
            scaling.
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

export default Architecture;
