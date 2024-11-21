"use client";
import React, { useState } from "react";
import { Search } from "lucide-react";

const ModelCard = ({ icon, name, type, border = false }) => (
  <div className="group relative h-[200px] overflow-hidden rounded-2xl bg-white p-6 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:bg-white hover:shadow-xl">
    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-neutral-100 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    <div className="relative flex h-full flex-col items-start">
      <div className="rounded-xl bg-gradient-to-br from-neutral-50 to-neutral-100 p-2 shadow-sm transition-transform duration-500 group-hover:scale-110">
        <img src={icon} alt={name} className="h-12 w-12" />
      </div>
      <div className="mt-auto space-y-1">
        <h3 className="font-semibold text-neutral-900 transition-colors duration-300 group-hover:text-neutral-800">
          {name}
        </h3>
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-green-500" />
          <p className="text-sm text-neutral-500 transition-colors duration-300 group-hover:text-neutral-600">
            {type}
          </p>
        </div>
      </div>
    </div>
  </div>
);

const MoreModelsCard = ({ count }) => (
  <div className="group relative h-[200px] overflow-hidden rounded-2xl bg-white p-6 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">
    <div className="flex h-full items-center justify-center">
      <div className="text-center">
        <h3 className="text-4xl font-bold text-neutral-800">+{count}</h3>
        <p className="mt-2 text-neutral-600">More Models</p>
      </div>
    </div>
  </div>
);

const Models = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All");

  const allModels = [
    {
      icon: "/llama.svg",
      name: "Llama 3.1 8B",
      type: "Chat",
    },
    {
      icon: "/mistral.svg",
      name: "Mistral 7B",
      type: "Chat",
    },
    {
      icon: "/mistral.svg",
      name: "Mixtral 8×7B",
      type: "Chat",
    },
    {
      icon: "/llama.svg",
      name: "Llama 3.1 70B",
      type: "Chat",
    },
    {
      icon: "/llama.svg",
      name: "Llama 3.1 405B",
      type: "Chat",
    },
    {
      icon: "/mistral.svg",
      name: "Mixtral 8×22B",
      type: "Chat",
    },
    {
      icon: "/gemma.svg",
      name: "Gemma 2 27B",
      type: "Chat",
    },
    {
      icon: "/llama.svg",
      name: "Codellama 34B",
      type: "Code",
    },
    {
      icon: "/llama.svg",
      name: "Llama 2 70B",
      type: "Chat",
    },
    {
      icon: "/mistral.svg",
      name: "Mistral 8×7B",
      type: "Chat",
    },
    {
      icon: "/llama.svg",
      name: "Llama 2 13B",
      type: "Chat",
    },
    {
      icon: "/mistral.svg",
      name: "Mistral 7B Instruct",
      type: "Chat",
    },
    {
      icon: "/phi.svg",
      name: "Phi-2",
      type: "Chat",
    },
    {
      icon: "/gemma.svg",
      name: "Gemma 2 7B",
      type: "Chat",
    },
    {
      icon: "/llama.svg",
      name: "Codellama 7B",
      type: "Code",
    },
  ];

  const filteredModels = allModels.filter((model) => {
    const matchesSearch = model.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "All" || model.type === selectedType;
    return matchesSearch && matchesType;
  });

  const displayedModels = filteredModels.slice(0, 9);
  const remainingCount = filteredModels.length - displayedModels.length;

  return (
    <div className="relative min-h-screen bg-white py-24 font-mono">
      <div className="relative mx-auto max-w-7xl px-4">
        <div className="text-center">
          <h2 className="font-mono text-3xl font-medium tracking-tight text-neutral-900">
            Build with the best Open Source models
          </h2>
          <p className="mx-auto mt-4 text-lg text-neutral-600">
            Future of AI is open-source and LmScale helps you to build with the
            best open-source LLMs.
          </p>
        </div>

        <div className="mt-12 flex flex-col gap-6 sm:flex-row sm:items-center justify-center">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Search models..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-neutral-200 bg-white py-2 pl-10 pr-4 text-sm placeholder-neutral-400 shadow-sm focus:border-neutral-300 focus:outline-none focus:ring-1 focus:ring-neutral-300"
            />
          </div>

          <div className="flex gap-2">
            {["All", "Chat", "Code"].map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  selectedType === type
                    ? "bg-neutral-900 text-white"
                    : "bg-white text-neutral-600 hover:bg-neutral-100"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          {displayedModels.map((model, index) => (
            <ModelCard key={index} {...model} />
          ))}
          {remainingCount > 0 && <MoreModelsCard count={remainingCount} />}
        </div>
      </div>
    </div>
  );
};

export default Models;
