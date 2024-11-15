import React from "react";

const Working = () => {
  return (
    <div className="relative overflow-hidden bg-black py-24 font-space">
      {/* Enhanced background with gradients and grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(0,179,255,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(0,179,255,0.05),transparent_50%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="relative mx-auto max-w-7xl px-4">
        <div className="text-center">
          {/* Enhanced section title */}
          <div className="inline-flex items-center rounded-full border border-sky-500/20 bg-sky-500/10 px-6 py-2 text-sm text-sky-400">
            Easy Integration
          </div>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            How{" "}
            <span className="bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">
              LmCloud
            </span>{" "}
            Works
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/60">
            Deploy your local LLMs to production in three simple steps
          </p>
        </div>

        <div className="relative mt-20">
          {/* Connection lines between steps */}
          <div className="absolute left-0 right-0 top-24 hidden h-0.5 bg-gradient-to-r from-sky-400/0 via-sky-400/20 to-sky-400/0 md:block" />

          <div className="grid gap-12 md:grid-cols-3">
            {/* Step 1 */}
            <div className="relative flex flex-col items-center group">
              <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-sky-400/10 ring-2 ring-sky-400/20 transition-all duration-300 group-hover:ring-sky-400/40 group-hover:bg-sky-400/20">
                <span className="text-2xl font-bold text-sky-400">1</span>
              </div>
              <h3 className="mb-4 text-xl font-semibold text-white">
                Upload Your Model
              </h3>
              <p className="text-center text-white/60">
                Upload your trained LLM through our secure dashboard or API. We
                support all major frameworks and formats.
              </p>
              <div className="mt-6 w-full rounded-xl border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:border-sky-400/20 hover:bg-white/[0.07]">
                <pre className="text-sm font-mono">
                  <code className="text-sky-400">
                    $ LmCloud upload model.safetensors{"\n"}
                    <span className="text-green-400">
                      Uploading: ████████████ 100%
                    </span>
                    {"\n"}
                    <span className="text-emerald-400">
                      Model deployed successfully!
                    </span>
                  </code>
                </pre>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative flex flex-col items-center group">
              <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-sky-400/10 ring-2 ring-sky-400/20 transition-all duration-300 group-hover:ring-sky-400/40 group-hover:bg-sky-400/20">
                <span className="text-2xl font-bold text-sky-400">2</span>
              </div>
              <h3 className="mb-4 text-xl font-semibold text-white">
                Configure Settings
              </h3>
              <p className="text-center text-white/60">
                Set your scaling preferences, memory allocation, and performance
                parameters through our intuitive interface.
              </p>
              <div className="mt-6 w-full space-y-4 rounded-xl border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:border-sky-400/20 hover:bg-white/[0.07]">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/60">Auto-scaling</span>
                    <span className="text-sm text-sky-400">Enabled</span>
                  </div>
                  <div className="h-2 rounded-full bg-sky-400/10">
                    <div className="h-full w-3/4 rounded-full bg-sky-400/40" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/60">Memory</span>
                    <span className="text-sm text-sky-400">16GB</span>
                  </div>
                  <div className="h-2 rounded-full bg-sky-400/10">
                    <div className="h-full w-1/2 rounded-full bg-sky-400/40" />
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative flex flex-col items-center group">
              <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-sky-400/10 ring-2 ring-sky-400/20 transition-all duration-300 group-hover:ring-sky-400/40 group-hover:bg-sky-400/20">
                <span className="text-2xl font-bold text-sky-400">3</span>
              </div>
              <h3 className="mb-4 text-xl font-semibold text-white">
                Start Inference
              </h3>
              <p className="text-center text-white/60">
                Get your API endpoint and start making inference requests.
                Monitor performance in real-time.
              </p>
              <div className="mt-6 w-full rounded-xl border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:border-sky-400/20 hover:bg-white/[0.07]">
                <pre className="text-sm font-mono">
                  <code>
                    <span className="text-purple-400">POST</span>{" "}
                    <span className="text-sky-400">/v1/inference</span>
                    {"\n"}
                    <span className="text-emerald-400">
                      Authorization: Bearer sk_...
                    </span>
                    {"\n"}
                    <span className="text-orange-400">
                      {"{"}"prompt": "Hello, AI!"{"}"}
                    </span>
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 flex justify-center">
          <a
            href="/docs"
            className="group inline-flex items-center gap-2 rounded-full bg-sky-500 px-8 py-3 text-base font-medium text-white transition-all duration-300 hover:bg-sky-600 hover:shadow-[0_0_20px_rgba(0,179,255,0.3)]"
          >
            Get Started
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
          </a>
        </div>
      </div>
    </div>
  );
};

export default Working;
