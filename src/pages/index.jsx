import {
  BarChart,
  Cloud,
  Code,
  Cpu,
  Menu,
  MoveRight,
  Search,
  Server,
  Settings,
  Shield,
  Terminal,
  X,
  Zap,
} from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState, useMemo } from "react";

const ALL_MODELS_DATA = [
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

const APPLICATION_CARDS_DATA = [
  {
    title: "Custom Support Bots",
    description:
      "Train AI bots on your support documentation and chat history. Deploy ready-to-use customer support bots within seconds using efficient small language models.",
    icon: (
      <svg
        className="h-6 w-6 text-neutral-800"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
    ),
    content: {
      query: "Training: Upload support documentation (10MB)",
      response: (
        <>
          Training complete! Your custom support bot is ready:
          <ul className="mt-2 space-y-1 text-neutral-800">
            <li>• Model: Mistral 7B</li>
            <li>• API Endpoint: api.lmscale.tech/v1/custom-bot-xyz</li>
          </ul>
        </>
      ),
    },
  },
  {
    title: "Data Training Pipeline",
    description:
      "Upload your training data and get a fine-tuned model within seconds. Supports various formats including text, CSV, and PDF documents.",
    icon: (
      <svg
        className="h-6 w-6 text-neutral-800"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    ),
    content: {
      query: "Training Progress: Product Manual Dataset",
      response: (
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span>Training Progress</span>
            <span className="font-medium">100%</span>
          </div>
          <div className="w-full bg-neutral-200 rounded-full h-2">
            <div className="bg-neutral-400 rounded-full h-2 w-full"></div>
          </div>
          <div className="text-neutral-800 text-xs">
            Model ready: Endpoint generated for immediate use
          </div>
        </div>
      ),
    },
  },
  {
    title: "API Integration",
    description:
      "Access your trained models through simple REST APIs. Easy integration with your existing applications, websites, or chat interfaces.",
    icon: (
      <svg
        className="h-6 w-6 text-neutral-800"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2"
        />
      </svg>
    ),
    content: {
      query: "GET /v1/models/custom-bot-xyz/predict",
      response:
        "{'response': 'Your custom-trained model response here', 'confidence': 0.95, 'model': 'mistral-7b-custom'}",
    },
  },
  {
    title: "Model Management",
    description:
      "Monitor your deployed models, track usage, and manage multiple versions. Easy updating of training data and instant model redeployment.",
    icon: (
      <svg
        className="h-6 w-6 text-neutral-800"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
    content: {
      query: "Model: custom-support-bot-v1",
      response: (
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span>Uptime</span>
            <span className="font-medium">99.9%</span>
          </div>
          <div className="text-neutral-800 text-xs">
            Base: Mistral 7B | Daily Requests: 1,240 | Avg Response Time: 150ms
          </div>
        </div>
      ),
    },
  },
];

// 2. Update FEATURES_DATA to focus on the training platform
const FEATURES_DATA = [
  {
    icon: Cloud,
    title: "Instant Training",
    description:
      "Train custom models on your data within seconds using optimized small language models.",
    content: (
      <pre className="text-sm space-y-1 font-mono">
        <code>
          <span className="text-blue-600">Training Pipeline</span>
          {"\n"}
          <span className="text-purple-600">├─ Data Processing</span>
          {"\n"}
          <span className="text-green-600">├─ Model Fine-tuning</span>
          {"\n"}
          <span className="text-red-600">├─ API Generation</span>
          {"\n"}
          <span className="text-orange-600">└─ Deployment</span>
        </code>
      </pre>
    ),
  },
  {
    icon: Zap,
    title: "Easy Integration",
    description:
      "Get instant API endpoints for your trained models with zero setup required.",
    content: (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Server className="h-4 w-4 text-neutral-800" />
            <span className="text-sm text-neutral-600">
              Model: custom-bot-1
            </span>
          </div>
          <span className="flex items-center text-emerald-600 text-sm">
            <span className="mr-2 h-2 w-2 bg-emerald-500"></span>
            Active
          </span>
        </div>
        <pre className="text-sm font-mono mt-4">
          <code>
            <span className="text-purple-600">Endpoint:</span>{" "}
            <span className="text-blue-600">/v1/models/custom-bot-1</span>
            {"\n"}
            <span className="text-emerald-600">Status: Ready</span>
            {"\n"}
            <span className="text-orange-600">Base Model: Mistral 7B</span>
          </code>
        </pre>
      </div>
    ),
  },
  {
    icon: Settings,
    title: "Model Management",
    description:
      "Monitor and manage your trained models through a simple dashboard interface.",
    content: (
      <div className="space-y-4">
        <pre className="text-sm font-mono">
          <code>
            <span className="text-purple-600">Model Status</span>
            {"\n"}
            <span className="text-blue-600">Uptime: 99.9%</span>
            {"\n"}
            <span className="text-green-600">Requests: 1,240/day</span>
            {"\n"}
            <span className="text-orange-600">Response Time: 150ms</span>
          </code>
        </pre>
      </div>
    ),
  },
];

// 3. Update DETAILS_DATA to reflect platform benefits
const DETAILS_DATA = [
  {
    type: "numeric",
    title: "Average training time for custom models",
    icon: <Server className="h-6 w-6" />,
    value: "30s",
    description: "From data upload to deployment-ready model",
  },
  {
    type: "numeric",
    title: "Reduced deployment complexity",
    icon: <Code className="h-6 w-6" />,
    value: "90%",
    description: "Compared to traditional model deployment methods",
  },
  {
    type: "numeric",
    title: "Cost savings vs custom infrastructure",
    icon: <BarChart className="h-6 w-6" />,
    value: "75%",
    description: "Lower operational costs with efficient SLMs",
  },
  {
    type: "numeric",
    title: "Average response time",
    icon: <Cpu className="h-6 w-6" />,
    value: "150ms",
    description: "Fast inference with optimized deployment",
  },
  {
    title: "Simple Integration",
    description: "Deploy trained models with just a few API calls",
    icon: <Cloud className="h-6 w-6" />,
  },
  {
    title: "Instant Training",
    description: "Get custom-trained models within seconds",
    icon: <Code className="h-6 w-6" />,
  },
  {
    title: "Easy Updates",
    description: "Update training data and redeploy models instantly",
    icon: <Zap className="h-6 w-6" />,
  },
  {
    title: "Secure Platform",
    description: "Enterprise-grade security for your data and models",
    icon: <Shield className="h-6 w-6" />,
  },
];

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All");

  const filteredModels = useMemo(() => {
    return ALL_MODELS_DATA.filter((model) => {
      const matchesSearch = model.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesType = selectedType === "All" || model.type === selectedType;
      return matchesSearch && matchesType;
    });
  }, [searchQuery, selectedType]);

  const displayedModels = useMemo(
    () => filteredModels.slice(0, 9),
    [filteredModels]
  );
  const remainingCount = useMemo(
    () => filteredModels.length - displayedModels.length,
    [filteredModels]
  );

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);
      setIsVisible(
        currentScrollY <= lastScrollY ||
          currentScrollY < 50 ||
          currentScrollY + window.innerHeight >=
            document.documentElement.scrollHeight
      );
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <>
      <main>
        <header>
          <div
            className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-in-out ${
              isVisible ? "translate-y-0" : "-translate-y-full"
            }`}
          >
            <div
              className={`w-full transition-all duration-300 ${
                scrolled || isMenuOpen
                  ? "bg-white/80 backdrop-blur-xl"
                  : "bg-transparent"
              }`}
            >
              <div className="mx-auto max-w-full">
                <div className="flex h-14 items-center justify-between px-4 sm:px-6 lg:px-8">
                  <div className="flex items-center">
                    <Link
                      href="/"
                      className="group flex items-center gap-2 text-xl sm:text-2xl font-bold text-neutral-800"
                    >
                      <img
                        src="/icon.png"
                        alt="LmScale Logo"
                        className="h-7 w-7 sm:h-8 sm:w-8 object-contain"
                      />
                      <div className="font-light">LmScale</div>
                    </Link>
                  </div>

                  <div className="hidden lg:flex items-center space-x-6">
                    <nav>
                      <ul className="flex items-center space-x-6">
                        {[
                          { href: "#", text: "Product" },
                          { href: "#", text: "Docs" },
                        ].map((item) => (
                          <li key={item.text}>
                            <Link
                              href={item.href}
                              className="text-sm font-medium text-neutral-600 hover:text-neutral-800 transition-colors duration-200"
                            >
                              {item.text}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </nav>

                    <Link
                      href="/login"
                      className="group relative inline-flex items-center justify-center overflow-hidden bg-neutral-800 p-0.5 transition-all duration-300 hover:bg-neutral-950"
                    >
                      <span className="inline-flex h-full w-full items-center justify-center px-4 py-1.5 md:px-6 text-sm md:text-base font-medium text-white transition-all duration-300">
                        Login
                      </span>
                    </Link>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="inline-flex items-center justify-center p-2 text-neutral-600 transition-colors duration-200 hover:bg-neutral-100 lg:hidden"
                    aria-label="Toggle menu"
                  >
                    {isMenuOpen ? (
                      <X className="h-5 w-5 sm:h-6 sm:w-6" />
                    ) : (
                      <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`fixed inset-0 z-40 bg-white/90 backdrop-blur-xl transition-all duration-300 lg:hidden ${
              isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <div className="h-full pt-20 overflow-y-auto">
              <div className="px-4 py-6">
                <nav className="flex flex-col space-y-1">
                  {[
                    { href: "#", text: "Product" },
                    { href: "#", text: "Docs" },
                    { href: "/login", text: "Login" },
                  ].map((item) => (
                    <Link
                      key={item.text}
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="group relative flex items-center justify-between px-4 py-3 text-sm font-medium text-neutral-600 transition-all duration-300 hover:text-neutral-800"
                    >
                      <span className="relative">
                        {item.text}
                        <span className="absolute inset-x-0 -bottom-0.5 h-px w-0 bg-neutral-800 transition-all duration-300 group-hover:w-full"></span>
                      </span>
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </header>
        <section id="__hero_section" className="relative min-h-screen bg-white">
          <div className="absolute inset-0">
            <div
              className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:24px_24px] md:bg-[size:32px_32px]"
              style={{
                mask: "radial-gradient(circle at center, white 30%, transparent 70%)",
                WebkitMask:
                  "radial-gradient(circle at center, white 30%, transparent 70%)",
              }}
            />
          </div>

          <div className="relative mx-auto max-w-7xl px-4">
            <div className="flex min-h-screen flex-col items-center justify-center py-16 md:py-24">
              <div className="text-center w-full">
                <div className="mb-6 md:mb-8 inline-flex items-center border border-black/10 px-4 py-1.5 md:px-6 md:py-2 text-xs md:text-sm text-neutral-800">
                  <Terminal className="mr-2 h-3 w-3 md:h-4 md:w-4" />
                  Now Available in Beta
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-6xl font-light tracking-tight text-neutral-800">
                  Run LLMs In The Cloud
                </h1>
                <div className="mt-8 md:mt-12 relative w-full p-4">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#10b981,transparent_40%)]" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,#f97316,transparent_40%)]" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,#3b82f6,transparent_40%)]" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_30%,#84cc16,transparent_40%)]" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,#e879f9,transparent_40%)]" />
                  <div className="absolute inset-0 bg-white/30 backdrop-blur-[1px]" />
                  <div className="relative flex flex-col items-center justify-start h-full space-y-8 p-4 md:p-8">
                    <p className="mx-auto max-w-2xl text-base md:text-lg font-light leading-7 md:leading-8 text-neutral-800">
                      Deploy and scale language models with zero infrastructure
                      headaches. Simple, fast, and secure cloud deployment.
                    </p>

                    <div className="flex items-center justify-center gap-4 md:gap-6">
                      <Link
                        href="/register"
                        className="group inline-flex items-center bg-neutral-900 px-6 md:px-8 py-2.5 md:py-3 text-sm md:text-base font-medium text-white transition-all duration-300 hover:bg-neutral-950 hover:scale-105 hover:shadow-lg"
                      >
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
                      </Link>
                    </div>
                  </div>

                  <div
                    className="mx-4 mt-8 bg-white/80 p-3 md:p-4 backdrop-blur 
-sm"
                  >
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="h-2.5 w-2.5 md:h-3 md:w-3 rounded-full bg-[#FF5F57]"></div>
                      <div className="h-2.5 w-2.5 md:h-3 md:w-3 rounded-full bg-[#FFBD2E]"></div>
                      <div className="h-2.5 w-2.5 md:h-3 md:w-3 rounded-full bg-[#28CA41]"></div>
                    </div>
                    <pre className="text-left text-xs md:text-sm text-neutral-600 overflow-x-auto scrollbar-thin scrollbar-thumb-neutral-300 scrollbar-track-transparent">
                      <code>
                        {`curl -X POST "https://api.lmscale.tech/v1/completion" \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer your-api-key" \\
  -d '{
    "prompt": "Explain quantum computing",
    "max_tokens": 100,
    "temperature": 0.7,
    "model": "gpt-4"
  }'`}
                      </code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          id="__applications_section"
          className="relative overflow-hidden bg-white py-24"
        >
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:max-w-none">
              <div className="mx-auto mb-16 flex flex-col items-center text-center">
                <h1 className="text-3xl md:text-4xl lg:text-6xl font-light tracking-tight text-neutral-800">
                  Applications
                </h1>
                <p className="mt-4 max-w-2xl text-lg font-light text-neutral-800">
                  Enterprise-grade LLM solutions customized for your specific
                  needs. Deploy, fine-tune, and scale AI models with confidence.
                </p>
              </div>

              <div className="grid gap-8 grid-cols-1 sm:grid-cols-2">
                {APPLICATION_CARDS_DATA.map((app) => (
                  <div
                    key={app.title}
                    className="group relative border border-neutral-200/60 bg-white p-4 transition-all duration-300 hover:shadow-md"
                  >
                    <div className="relative space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex h-12 w-12 items-center justify-center">
                            {app?.icon}
                          </div>
                          <h3 className=" text-lg font-medium tracking-tight text-neutral-800 line-clamp-1">
                            {app?.title}
                          </h3>
                        </div>
                      </div>
                      <p className="text-neutral-800 leading-relaxed line-clamp-2 h-12">
                        {app?.description}
                      </p>

                      <div className="space-y-4">
                        <div className="flex items-start">
                          <div className="flex-1">
                            <div className="bg-white p-4 text-sm text-neutral-800 shadow-sm border border-neutral-50">
                              {app?.content.query}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="flex-1">
                            <div className="bg-neutral-50 p-4 text-sm text-neutral-800 space-y-2">
                              {app?.content.response}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section
          id="__models_section"
          className="relative min-h-screen bg-white py-12 sm:py-24"
        >
          <div className="relative mx-auto max-w-7xl px-4">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl lg:text-6xl font-light tracking-tight text-neutral-800">
                Open Source models
              </h1>
              <p className="mx-auto mt-4 text-sm sm:text-lg text-neutral-600">
                Future of AI is open-source and LmScale helps you to build with
                the best open-source LLMs.
              </p>
            </div>

            <div className="mt-8 sm:mt-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center">
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
            </div>

            <div className="mt-8 sm:mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {displayedModels.map(({ icon, name, type }) => (
                <div
                  key={name}
                  className="group relative h-40 overflow-hidden bg-white p-4 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="relative flex h-full flex-col items-start">
                    <img
                      src={icon}
                      alt={name}
                      className="h-8 w-8 sm:h-10 sm:w-10"
                    />
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
              ))}

              {remainingCount > 0 && (
                <div className="group relative h-40 overflow-hidden bg-white p-4 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-md">
                  <div className="relative flex h-full flex-col items-start">
                    <h3 className="text-4xl font-light text-neutral-800">
                      +{remainingCount}
                    </h3>
                    <h3 className="mt-4 text-sm sm:text-base font-light text-neutral-800">
                      More Models
                    </h3>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
        <section
          id="__architecture_section"
          className="relative min-h-screen bg-white py-24"
        >
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
              {FEATURES_DATA.map((feature) => (
                <div
                  key={feature?.title}
                  className="group h-[420px] bg-white border border-neutral-200"
                >
                  <div className="relative h-full flex flex-col p-6 space-y-4">
                    <div className="flex items-center gap-4">
                      <h3 className="text-lg font-medium tracking-tight text-neutral-800 line-clamp-1">
                        {feature?.title}
                      </h3>
                    </div>

                    <p className="text-sm text-neutral-600 leading-relaxed">
                      {feature?.description}
                    </p>
                    <div className="flex-1 border border-dashed border-neutral-200 p-4 bg-neutral-50">
                      {feature?.content}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section
          id="__details_section"
          className="relative min-h-screen bg-white py-24"
        >
          <div className="relative mx-auto max-w-7xl px-4">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl lg:text-6xl font-light tracking-tight text-neutral-800">
                Scale with Open Source LLMs
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-lg text-neutral-600">
                Enterprise-grade infrastructure for AI-first companies,
                delivering performance at scale
              </p>
            </div>

            <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {DETAILS_DATA.map((item, index) => (
                <div
                  key={item.title || index}
                  className="group h-[180px] bg-white border border-neutral-200"
                >
                  <div className="p-6 h-full flex flex-col">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="bg-neutral-50 p-2 border border-neutral-200">
                          {item?.icon}
                        </div>
                        {"numeric" === item?.type ? (
                          <h3 className="text-4xl font-light text-neutral-800">
                            {item?.value}
                          </h3>
                        ) : (
                          <h3 className="font-medium text-neutral-800">
                            {item?.title}
                          </h3>
                        )}
                      </div>
                    </div>
                    <div className="mt-4">
                      {"numeric" === item?.type ? (
                        <>
                          <p className="text-sm font-medium text-neutral-800">
                            {item?.title}
                          </p>
                          <p className="mt-2 text-sm text-neutral-600">
                            {item?.description}
                          </p>
                        </>
                      ) : (
                        <p className="text-sm text-neutral-600">
                          {item?.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section id="__contact_section" className="relative bg-black py-24">
          <div className="relative mx-auto max-w-7xl px-4">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
              <div className="space-y-4">
                <h2 className="text-3xl font-light text-white">
                  Need a custom solution?
                </h2>
                <p className="text-lg text-neutral-200">
                  Let&apos;s discuss your specific LLM deployment requirements
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => window.open("mailto:info@lmscale.tech")}
                  className="group inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium transition-all duration-300 bg-white text-neutral-800"
                >
                  Contact Us
                  <MoveRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </section>
        <footer className="relative bg-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#10b981,transparent_40%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,#f97316,transparent_40%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,#3b82f6,transparent_40%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_30%,#84cc16,transparent_40%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,#e879f9,transparent_40%)]" />
          <div className="absolute inset-0 bg-white/30 backdrop-blur-[1px]" />
          <div className="relative mx-auto max-w-7xl px-4 py-12">
            <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:gap-12">
              <div className="flex flex-col items-center md:items-start">
                <div className="text-2xl font-light text-neutral-800">
                  LmScale
                </div>
                <p className="mt-4 max-w-xs text-center md:text-left text-sm text-neutral-800">
                  Empowering businesses with secure, scalable local LLM
                  solutions in the cloud.
                </p>
              </div>
              <div className="flex items-center gap-8">
                <Link
                  href="#"
                  className="text-neutral-800 hover:text-neutral-800 transition-colors duration-200"
                >
                  <span className="sr-only">Twitter</span>
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </Link>

                <Link
                  href="#"
                  className="text-neutral-800 hover:text-neutral-800 transition-colors duration-200"
                >
                  <span className="sr-only">GitHub</span>
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </div>

            <div className="mt-12 border-t border-neutral-200/60 pt-8">
              <div className="flex flex-col-reverse gap-4 md:flex-row md:items-center md:justify-between">
                <p className="text-sm text-neutral-800 text-center md:text-left">
                  © {new Date().getFullYear()} LmScale. All rights reserved.
                </p>
                <nav className="flex flex-wrap justify-center gap-8">
                  {["Privacy Policy", "Terms of Service", "Documentation"].map(
                    (item) => (
                      <Link
                        key={item}
                        href="#"
                        className="text-sm text-neutral-800 hover:text-neutral-800 transition-colors duration-200"
                      >
                        {item}
                      </Link>
                    )
                  )}
                </nav>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
