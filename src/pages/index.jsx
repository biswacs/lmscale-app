import { Menu, MoveRight, Terminal, X } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

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
      <section
        id="Hero"
        className="relative min-h-screen bg-white overflow-hidden"
      >
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:24px_24px] md:bg-[size:32px_32px]"
            style={{
              mask: "radial-gradient(circle at center, white 30%, transparent 70%)",
              WebkitMask:
                "radial-gradient(circle at center, white 30%, transparent 70%)",
            }}
          ></div>
        </div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute top-40 -left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
        <div className="relative mx-auto max-w-7xl px-4 pt-20 pb-16 sm:pt-24 sm:pb-24">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="mb-6 md:mb-8 inline-flex items-center border border-black/10 px-4 py-1.5 md:px-6 md:py-2 text-xs md:text-sm text-neutral-800">
                <Terminal className="mr-2 h-3 w-3 md:h-4 md:w-4" />
                Now Available in Beta
              </div>
            </div>
            <h1 className="mx-auto max-w-4xl font-display text-4xl font-light tracking-tight text-neutral-800 sm:text-6xl">
              Run LLMs In The Cloud
            </h1>
            <p className="mx-auto font-light mt-6 max-w-2xl text-lg sm:text-xl leading-8 text-neutral-600">
              Deploy and scale language models with zero infrastructure
              headaches. Simple, fast, and secure cloud deployment.
            </p>

            <div className="mt-10 flex items-center justify-center gap-4 md:gap-6">
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

            <div className="mt-8 md:mt-12 relative w-full p-4">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#ec4899,transparent_40%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,#f97316,transparent_40%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,#3b82f6,transparent_40%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_30%,#84cc16,transparent_40%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,#e879f9,transparent_40%)]" />
              <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px]" />
              <div
                className="m-4 bg-white/80 p-4 backdrop-blur 
-sm"
              >
                <div className="flex items-center space-x-2 mb-3">
                  <div className="h-2.5 w-2.5 md:h-3 md:w-3  bg-[#FF5F57]"></div>
                  <div className="h-2.5 w-2.5 md:h-3 md:w-3  bg-[#FFBD2E]"></div>
                  <div className="h-2.5 w-2.5 md:h-3 md:w-3  bg-[#28CA41]"></div>
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
            <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4 items-center justify-center text-neutral-800">
              <div className="flex flex-col items-center gap-2 px-4 py-6 bg-white/50 backdrop-blur-sm ">
                <span className="text-3xl font-light">40%</span>
                <span className="text-sm text-center">
                  Lower Deployment Cost
                </span>
              </div>
              <div className="flex flex-col items-center gap-2 px-4 py-6 bg-white/50 backdrop-blur-sm ">
                <span className="text-3xl font-light">15x</span>
                <span className="text-sm text-center">Faster Integration</span>
              </div>
              <div className="flex flex-col items-center gap-2 px-4 py-6 bg-white/50 backdrop-blur-sm ">
                <span className="text-3xl font-light">99.9%</span>
                <span className="text-sm text-center">Uptime SLA</span>
              </div>
              <div className="flex flex-col items-center gap-2 px-4 py-6 bg-white/50 backdrop-blur-sm ">
                <span className="text-3xl font-light">4TB</span>
                <span className="text-sm text-center">Daily Processing</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        id="Features"
        className="relative py-24 bg-white overflow-hidden"
      >
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:24px_24px] md:bg-[size:32px_32px]"
            style={{
              mask: "radial-gradient(circle at center, white 30%, transparent 70%)",
              WebkitMask:
                "radial-gradient(circle at center, white 30%, transparent 70%)",
            }}
          ></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-light text-neutral-800 mb-4">
              Enterprise-Grade LLM Infrastructure
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Deploy, manage and scale AI models with industry-leading
              performance and reliability
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group relative bg-white p-6  transition-all duration-300 hover:shadow-xl border border-neutral-200/60">
              <div className="flex items-start justify-between mb-6">
                <div className="p-3 bg-neutral-50  border border-neutral-200/60">
                  <svg
                    className="w-6 h-6 text-neutral-800"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <span className="text-xs font-medium text-neutral-600 bg-neutral-100 px-2 py-1 ">
                  Enterprise
                </span>
              </div>
              <h3 className="text-xl font-medium text-neutral-800 mb-2">
                High-Performance Inference
              </h3>
              <p className="text-neutral-600 mb-4">
                150ms average response time with optimized model serving and
                dynamic batching
              </p>
              <div className="bg-neutral-50 p-4  border border-neutral-200/60">
                <div className="space-y-3 font-mono text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-600">Throughput</span>
                    <span className="text-neutral-800">1000 req/s</span>
                  </div>
                  <div className="w-full bg-neutral-200  h-1.5">
                    <div
                      className="bg-green-500 h-1.5 "
                      style={{ width: "85%" }}
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-600">Latency</span>
                    <span className="text-neutral-800">150ms</span>
                  </div>
                  <div className="w-full bg-neutral-200  h-1.5">
                    <div
                      className="bg-blue-500 h-1.5 "
                      style={{ width: "92%" }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="group relative bg-white p-6  transition-all duration-300 hover:shadow-xl border border-neutral-200/60">
              <div className="flex items-start justify-between mb-6">
                <div className="p-3 bg-neutral-50  border border-neutral-200/60">
                  <svg
                    className="w-6 h-6 text-neutral-800"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"
                    />
                  </svg>
                </div>
                <span className="text-xs font-medium text-neutral-600 bg-neutral-100 px-2 py-1 ">
                  Advanced
                </span>
              </div>
              <h3 className="text-xl font-medium text-neutral-800 mb-2">
                Multi-Model Deployment
              </h3>
              <p className="text-neutral-600 mb-4">
                Deploy multiple models on shared infrastructure with intelligent
                resource allocation
              </p>
              <div className="bg-neutral-50 p-4  border border-neutral-200/60">
                <pre className="text-sm font-mono text-neutral-800">
                  {"              "}
                  <code>
                    {"\n"}├─ Base LLM{"\n"}│{"  "}├─ Chat Model{"\n"}│{"  "}├─
                    Code Model{"\n"}│{"  "}└─ Custom Model{"\n"}└─ API Endpoint
                  </code>
                  {"\n"}
                  {"            "}
                </pre>
              </div>
            </div>
            <div className="group relative bg-white p-6  transition-all duration-300 hover:shadow-xl border border-neutral-200/60">
              <div className="flex items-start justify-between mb-6">
                <div className="p-3 bg-neutral-50  border border-neutral-200/60">
                  <svg
                    className="w-6 h-6 text-neutral-800"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <span className="text-xs font-medium text-neutral-600 bg-neutral-100 px-2 py-1 ">
                  Secure
                </span>
              </div>
              <h3 className="text-xl font-medium text-neutral-800 mb-2">
                Enterprise Security
              </h3>
              <p className="text-neutral-600 mb-4">
                SOC2 compliant infrastructure with end-to-end encryption and
                access controls
              </p>
              <div className="bg-neutral-50 p-4  border border-neutral-200/60">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <span className="flex h-2 w-2 bg-green-500 " />
                    <span className="text-neutral-800">
                      End-to-end Encryption
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="flex h-2 w-2 bg-green-500 " />
                    <span className="text-neutral-800">Role-based Access</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="flex h-2 w-2 bg-green-500 " />
                    <span className="text-neutral-800">Audit Logging</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="Models" className="relative py-24 bg-white overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:24px_24px] md:bg-[size:32px_32px]"
            style={{
              mask: "radial-gradient(circle at center, white 30%, transparent 70%)",
              WebkitMask:
                "radial-gradient(circle at center, white 30%, transparent 70%)",
            }}
          ></div>
        </div>
        <div className="relative max-w-5xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-light text-neutral-800 mb-4">
              Open Source Model Hub
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Access and deploy state-of-the-art open source language models
              with a single API call
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
            <div className="w-full max-w-sm bg-white p-6  transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border border-neutral-200">
              <div className="flex items-center space-x-4 mb-8">
                <div className="h-12 w-12 bg-neutral-50  border border-neutral-200 flex items-center justify-center">
                  <img src="/mistral.svg" alt="Mistral" className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-neutral-800">
                    Mistral
                  </h3>
                  <p className="text-sm text-neutral-600">Chat Model</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600">Context Length</span>
                  <span className="text-neutral-800 font-medium">32K</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600">Response Time</span>
                  <span className="text-neutral-800 font-medium">~150ms</span>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-neutral-100 space-y-4">
                <div className="flex items-center gap-2 text-sm text-neutral-600">
                  <img
                    src="/mistral.svg"
                    alt="Mistral 7B"
                    className="h-6 w-6"
                  />
                  <span>Mistral 7B</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-neutral-600">
                  <img
                    src="/mistral.svg"
                    alt="Mixtral 8x7B"
                    className="h-6 w-6"
                  />
                  <span>Mixtral 8x7B</span>
                </div>
                <button className="w-full px-4 py-2 bg-neutral-800 text-white text-sm font-medium hover:bg-neutral-700 transition-colors">
                  Deploy Model
                </button>
              </div>
            </div>

            <div className="w-full max-w-sm bg-gradient-to-br from-neutral-900 to-neutral-800 p-6  text-white">
              <div className="flex items-center space-x-4 mb-8">
                <div className="h-12 w-12 bg-white/10  flex items-center justify-center">
                  <img src="/llama.svg" alt="Llama" className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-lg font-medium">Llama</h3>
                  <p className="text-sm text-neutral-300">Chat Model</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-300">Context Length</span>
                  <span className="text-white font-medium">100K</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-300">Response Time</span>
                  <span className="text-white font-medium">~200ms</span>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10 space-y-4">
                <div className="flex items-center gap-2 text-sm text-neutral-300">
                  <img
                    src="/llama.svg"
                    alt="Llama 3.1 8B"
                    className="h-6 w-6"
                  />
                  <span>Llama 3.1 8B</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-neutral-300">
                  <img
                    src="/llama.svg"
                    alt="Llama 3.1 70B"
                    className="h-6 w-6"
                  />
                  <span>Llama 3.1 70B</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-neutral-300">
                  <img
                    src="/llama.svg"
                    alt="Llama 3.1 405B"
                    className="h-6 w-6"
                  />
                  <span>Llama 3.1 405B</span>
                </div>
                <button className="w-full px-4 py-2 bg-white text-neutral-800 text-sm font-medium hover:bg-neutral-100 transition-colors">
                  Deploy Model
                </button>
              </div>
            </div>

            <div className="w-full max-w-sm bg-white p-6  transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border border-neutral-200">
              <div className="flex items-center space-x-4 mb-8">
                <div className="h-12 w-12 bg-neutral-50  border border-neutral-200 flex items-center justify-center">
                  <img src="/gemma.svg" alt="Gemma" className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-neutral-800">
                    Gemma
                  </h3>
                  <p className="text-sm text-neutral-600">Chat Model</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600">Context Length</span>
                  <span className="text-neutral-800 font-medium">8K</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600">Response Time</span>
                  <span className="text-neutral-800 font-medium">~120ms</span>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-neutral-100 space-y-4">
                <div className="flex items-center gap-2 text-sm text-neutral-600">
                  <img src="/gemma.svg" alt="Gemma 2B" className="h-6 w-6" />
                  <span>Gemma 2B</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-neutral-600">
                  <img src="/gemma.svg" alt="Gemma 7B" className="h-6 w-6" />
                  <span>Gemma 7B</span>
                </div>
                <button className="w-full px-4 py-2 bg-neutral-800 text-white text-sm font-medium hover:bg-neutral-700 transition-colors">
                  Deploy Model
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        id="Architecture"
        className="relative py-24 bg-white overflow-hidden"
      >
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:24px_24px] md:bg-[size:32px_32px]"
            style={{
              mask: "radial-gradient(circle at center, white 30%, transparent 70%)",
              WebkitMask:
                "radial-gradient(circle at center, white 30%, transparent 70%)",
            }}
          ></div>
        </div>{" "}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-light text-neutral-800 mb-4">
              Multi-Model Architecture
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Deploy multiple domain-specific models with intelligent resource
              allocation and dynamic scaling
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1 relative bg-white p-6  border border-neutral-200">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-neutral-50  border border-neutral-200">
                  <svg
                    className="w-6 h-6 text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-neutral-800 mb-2">
                    Resource Optimization
                  </h3>
                  <p className="text-neutral-600 text-sm">
                    Intelligent allocation of GPU resources across multiple
                    models with automatic scaling
                  </p>
                </div>
              </div>
              <div className="mt-4 bg-neutral-50 p-4  font-mono text-sm">
                <pre className="text-neutral-800">
                  GPU Cluster 1{"\n"}├─ Model A: 40% utilization{"\n"}├─ Model
                  B: 35% utilization{"\n"}└─ Model C: 25% utilization
                </pre>
              </div>
              <div className="mt-4 bg-blue-50 p-4 ">
                <div className="text-center">
                  <div className="font-medium text-blue-600">99.9%</div>
                  <div className="text-sm text-blue-600">Uptime</div>
                </div>
              </div>
            </div>

            <div className="flex-1 relative bg-white p-6  border border-neutral-200">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-neutral-50  border border-neutral-200">
                  <svg
                    className="w-6 h-6 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-neutral-800 mb-2">
                    Zero-Downtime Updates
                  </h3>
                  <p className="text-neutral-600 text-sm">
                    Seamless model updates and deployments without service
                    interruption
                  </p>
                </div>
              </div>
              <div className="mt-4 bg-neutral-50 p-4  font-mono text-sm">
                <pre className="text-neutral-800">
                  Hot Swap Status:{"\n"}├─ Previous: Model v1 ✓{"\n"}├─ Current:
                  Model v2 ⟳{"\n"}└─ Transition: 0ms downtime
                </pre>
              </div>
              <div className="mt-4 bg-green-50 p-4 ">
                <div className="text-center">
                  <div className="font-medium text-green-600">150ms</div>
                  <div className="text-sm text-green-600">Latency</div>
                </div>
              </div>
            </div>

            <div className="flex-1 relative bg-white p-6  border border-neutral-200">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-neutral-50  border border-neutral-200">
                  <svg
                    className="w-6 h-6 text-purple-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-neutral-800 mb-2">
                    Request Routing
                  </h3>
                  <p className="text-neutral-600 text-sm">
                    Intelligent request distribution and load balancing across
                    model instances
                  </p>
                </div>
              </div>
              <div className="mt-4 bg-neutral-50 p-4  font-mono text-sm">
                <pre className="text-neutral-800">
                  Request Flow:{"\n"}├─ Load Balancer → {"\n"}├─ Model Router →
                  {"\n"}└─ Optimal Instance
                </pre>
              </div>
              <div className="mt-4 bg-purple-50 p-4 ">
                <div className="text-center">
                  <div className="font-medium text-purple-600">4TB</div>
                  <div className="text-sm text-purple-600">
                    Daily Processing
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        id="Security"
        className="relative py-24 bg-white overflow-hidden"
      >
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
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-light text-neutral-800 mb-4">
              Enterprise-Grade Security
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Advanced security measures to protect your models, data, and
              inference pipeline
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1 relative bg-white p-6  border border-neutral-200">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-neutral-50  border border-neutral-200">
                  <svg
                    className="w-6 h-6 text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-neutral-800">
                    Model Security
                  </h3>
                  <p className="text-neutral-600 text-sm mt-2">
                    Protected model weights and secure deployment pipeline
                  </p>
                </div>
              </div>
              <div className="mt-4 bg-neutral-50 p-4 ">
                <div className="flex flex-wrap gap-2 justify-center">
                  <span className="px-3 py-1 text-xs font-medium bg-blue-50 text-blue-600 ">
                    Encrypted Weights
                  </span>
                  <span className="px-3 py-1 text-xs font-medium bg-green-50 text-green-600 ">
                    Secure Loading
                  </span>
                </div>
              </div>
              <div className="mt-4 bg-blue-50 p-4 ">
                <div className="text-center">
                  <div className="font-medium text-blue-600">256-bit</div>
                  <div className="text-sm text-blue-600">Model Encryption</div>
                </div>
              </div>
            </div>

            <div className="flex-1 relative bg-white p-6  border border-neutral-200">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-neutral-50  border border-neutral-200">
                  <svg
                    className="w-6 h-6 text-purple-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-neutral-800">
                    Inference Protection
                  </h3>
                  <p className="text-neutral-600 text-sm mt-2">
                    Secure inference environment with request isolation
                  </p>
                </div>
              </div>
              <div className="mt-4 bg-neutral-50 p-4 ">
                <div className="flex flex-wrap gap-2 justify-center">
                  <span className="px-3 py-1 text-xs font-medium bg-purple-50 text-purple-600 ">
                    Request Isolation
                  </span>
                  <span className="px-3 py-1 text-xs font-medium bg-orange-50 text-orange-600 ">
                    Memory Protection
                  </span>
                </div>
              </div>
              <div className="mt-4 bg-purple-50 p-4 ">
                <div className="text-center">
                  <div className="font-medium text-purple-600">100%</div>
                  <div className="text-sm text-purple-600">
                    Request Isolation
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 relative bg-white p-6  border border-neutral-200">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-neutral-50  border border-neutral-200">
                  <svg
                    className="w-6 h-6 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-neutral-800">
                    API Security
                  </h3>
                  <p className="text-neutral-600 text-sm mt-2">
                    Secure API endpoints with advanced rate limiting
                  </p>
                </div>
              </div>
              <div className="mt-4 bg-neutral-50 p-4  space-y-2 font-mono text-sm">
                <div className="flex justify-between text-neutral-600">
                  <span>Authentication</span>
                  <span className="text-green-600">API Keys / OAuth</span>
                </div>
              </div>
              <div className="mt-4 bg-green-50 p-4 ">
                <div className="text-center">
                  <div className="font-medium text-green-600">10K req/s</div>
                  <div className="text-sm text-green-600">Rate Limit</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="__contact_section" className="relative bg-white py-24">
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
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-light text-neutral-800">
                Need a custom solution?
              </h2>
              <p className="text-lg font-light text-neutral-800">
                Let&apos;s discuss your specific LLM deployment requirements
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => window.open("mailto:info@lmscale.tech")}
                className="group inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium transition-all duration-300 bg-black text-white"
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
        <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px]" />
        <div className="relative mx-auto max-w-7xl px-4 py-12">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:gap-12">
            <div className="flex flex-col items-center md:items-start">
              <div className="text-2xl font-light text-neutral-800">
                LmScale
              </div>
              <p className="mt-4 max-w-xs text-center md:text-left text-sm text-neutral-800">
                Empowering businesses with secure, scalable local LLM solutions
                in the cloud.
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
    </>
  );
}
