import React from "react";
import { Terminal } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative min-h-screen bg-white font-mono">
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

      <div className="relative mx-auto max-w-7xl px-4 pt-20 md:pt-24">
        <div className="text-center">
          <div className="mb-6 md:mb-8 inline-flex items-center rounded-full border border-black/10 bg-black/5 px-4 py-1.5 md:px-6 md:py-2 text-xs md:text-sm text-black/80 backdrop-blur-sm transition-all hover:bg-black/10">
            <Terminal className="mr-2 h-3 w-3 md:h-4 md:w-4" />
            Now Available in Beta
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold tracking-tight text-gray-900">
            Run Language Models
            <br className="hidden sm:block" />
            <span className="sm:inline"> In The Cloud</span>
          </h1>

          <div className="mt-8 md:mt-12 mx-auto max-w-6xl p-4 md:p-8 relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#10b981,transparent_40%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,#f97316,transparent_40%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,#3b82f6,transparent_40%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_30%,#84cc16,transparent_40%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,#e879f9,transparent_40%)]" />
            <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px]" />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2720%27%20height%3D%2720%27%20viewBox%3D%270%200%2020%2020%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3Crect%20width%3D%27100%25%27%20height%3D%27100%25%27%20fill%3D%27none%27%20%2F%3E%3Ccircle%20cx%3D%271%27%20cy%3D%271%27%20r%3D%270.5%27%20fill%3D%27%2300000008%27%20%2F%3E%3C%2Fsvg%3E')] opacity-50 rounded-xl" />

            <div className="relative flex flex-col items-center justify-start h-full space-y-8">
              <p className="mx-auto max-w-2xl text-base md:text-lg leading-7 md:leading-8 text-gray-600 px-4">
                Deploy and scale language models with zero infrastructure
                headaches. Simple, fast, and secure cloud deployment.
              </p>

              <div className="flex items-center justify-center gap-4 md:gap-6">
                <a className="group inline-flex items-center rounded-lg bg-gray-900 px-6 md:px-8 py-2.5 md:py-3 text-sm md:text-base font-medium text-white transition-all duration-300 hover:bg-gray-800 hover:scale-105 hover:shadow-lg">
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
              </div>
            </div>

            <div className="mt-8 rounded-lg bg-gray-50/80 p-3 md:p-4 backdrop-blur-sm border border-gray-200 shadow-sm">
              <div className="flex items-center space-x-2 mb-3">
                <div className="h-2.5 w-2.5 md:h-3 md:w-3 rounded-full bg-[#FF5F57]"></div>
                <div className="h-2.5 w-2.5 md:h-3 md:w-3 rounded-full bg-[#FFBD2E]"></div>
                <div className="h-2.5 w-2.5 md:h-3 md:w-3 rounded-full bg-[#28CA41]"></div>
              </div>
              <pre className="text-left text-xs md:text-sm text-gray-600 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                <code>
                  {`curl -X POST "https://api.example.com/v1/completion" \\
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
  );
};

export default Hero;
