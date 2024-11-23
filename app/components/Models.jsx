"use client";
import React, { useState } from "react";
import { Search } from "lucide-react";

const SearchBar = ({ searchQuery, setSearchQuery }) => (
  <div className="relative w-full sm:w-auto">
    <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400" />
    <input
      type="text"
      placeholder="Search models..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="w-full border border-neutral-200 bg-white py-2 pl-10 pr-4 text-sm placeholder-neutral-400 shadow-sm focus:outline-none"
    />
  </div>
);

const TypeFilter = ({ selectedType, setSelectedType }) => (
  <div className="flex w-full flex-wrap gap-2 sm:w-auto">
    {["All", "Chat", "Code"].map((type) => (
      <button
        key={type}
        onClick={() => setSelectedType(type)}
        className={`flex-1 px-4 py-2 text-sm font-medium transition-colors sm:flex-initial ${
          selectedType === type
            ? "bg-neutral-800 text-white"
            : "bg-white text-neutral-600 hover:bg-neutral-100"
        }`}
      >
        {type}
      </button>
    ))}
  </div>
);

const ModelCard = ({ icon, name, type }) => (
  <div className="group relative h-40 overflow-hidden bg-white p-4 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-md">
    <div className="relative flex h-full flex-col items-start">
      <img src={icon} alt={name} className="h-8 w-8 sm:h-10 sm:w-10" />
      <div className="mt-4 space-y-1">
        <h3 className="text-sm sm:text-base font-semibold text-neutral-800 transition-colors duration-300 group-hover:text-neutral-800">
          {name}
        </h3>
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 bg-green-500" />
          <p className="text-xs sm:text-sm text-neutral-500 transition-colors duration-300 group-hover:text-neutral-600">
            {type}
          </p>
        </div>
      </div>
    </div>
  </div>
);

const MoreModelsCard = ({ count }) => (
  <div className="group relative h-40 overflow-hidden bg-white p-4 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-md">
    <div className="relative flex h-full flex-col items-start">
      <h3 className="text-4xl font-light text-neutral-800">+{count}</h3>
      <h3 className="mt-4 text-sm sm:text-base font-light text-neutral-800">
        More Models
      </h3>
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
    <div className="relative min-h-screen bg-white py-12 sm:py-24">
      <div className="relative mx-auto max-w-7xl px-4">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-light tracking-tight text-neutral-800">
            Open Source models
          </h1>
          <p className="mx-auto mt-4 text-sm sm:text-lg text-neutral-600">
            Future of AI is open-source and LmScale helps you to build with the
            best open-source LLMs.
          </p>
        </div>

        <div className="mt-8 sm:mt-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center">
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <TypeFilter
            selectedType={selectedType}
            setSelectedType={setSelectedType}
          />
        </div>

        <div className="mt-8 sm:mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
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
