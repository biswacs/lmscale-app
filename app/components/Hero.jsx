import React from "react";
import { Terminal } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative min-h-screen bg-black font-mono">
      {/* Grid with radial fade effect */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] bg-[size:32px_32px]"
          style={{
            mask: "radial-gradient(circle at center, black 30%, transparent 70%)",
            WebkitMask:
              "radial-gradient(circle at center, black 30%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pt-32">
        <div className="text-center">
          <div className="mb-4 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-6 py-2 text-sm text-white/80 backdrop-blur-sm">
            <Terminal className="mr-2 h-4 w-4" />
            Now Available in Beta
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl md:text-6xl mb-6">
            Run Language Models
            <br />
            In The Cloud
          </h1>

          <div className="mt-12 mx-auto max-w-6xl aspect-[2.2/1] relative rounded-lg overflow-hidden">
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#15803D,transparent_70%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,#C2410C,transparent_70%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,#1E40AF,transparent_70%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_30%,#65A30D,transparent_60%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,#C026D3,transparent_60%)]" />
              <div className="absolute inset-0 bg-white/5 backdrop-blur-[1px]" />
              <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2720%27%20height%3D%2720%27%20viewBox%3D%270%200%2020%2020%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3Crect%20width%3D%27100%25%27%20height%3D%27100%25%27%20fill%3D%27none%27%20%2F%3E%3Ccircle%20cx%3D%271%27%20cy%3D%271%27%20r%3D%270.5%27%20fill%3D%27%23ffffff10%27%20%2F%3E%3C%2Fsvg%3E')] opacity-50" />
            </div>

            <div className="relative z-10 flex flex-col items-center justify-start h-full pt-14">
              <p className="mx-auto max-w-2xl text-lg leading-8 text-white px-4">
                Deploy and scale language models with zero infrastructure
                headaches. Simple, fast, and secure cloud deployment.
              </p>

              <div className="mt-8 flex items-center justify-center gap-6">
                <a className="inline-flex items-center rounded-lg bg-white px-8 py-3 text-base font-medium text-black transition-all duration-300 hover:bg-white/90">
                  Get Started
                  <svg
                    className="ml-2 h-4 w-4"
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

            <div className="absolute bottom-8 left-8 right-8 rounded-lg border border-white/10 bg-white/10 p-4">
              <div className="flex items-center space-x-2 mb-4 border-b border-white/10 pb-4">
                <div className="h-3 w-3 rounded-full bg-[#FF5F57]"></div>
                <div className="h-3 w-3 rounded-full bg-[#FFBD2E]"></div>
                <div className="h-3 w-3 rounded-full bg-[#28CA41]"></div>
              </div>
              <pre className="text-left text-sm text-white/70 overflow-x-auto">
                <code>{`curl -X POST "https://api.example.com/v1/completion" \\
-H "Content-Type: application/json" \\
-H "Authorization: Bearer your-api-key" \\
-d '{
  "prompt": "Explain quantum computing",
  "max_tokens": 100,
  "temperature": 0.7,
  "model": "gpt-4"
}'`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
