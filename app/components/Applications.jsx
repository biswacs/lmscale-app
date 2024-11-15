import React from "react";

const Applications = () => {
  return (
    <div className="relative overflow-hidden bg-black py-24 font-space">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(0,179,255,0.1),transparent_50%)]" />
      <div className="relative mx-auto max-w-7xl px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Power Your <span className="text-sky-400">AI Applications</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/60">
            See how companies are leveraging LmCloud to transform their
            businesses
          </p>
        </div>
        <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Use Case 1 */}
          <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition hover:border-sky-400/50 hover:bg-white/[0.07]">
            <div className="p-8">
              <div className="mb-4 inline-flex rounded-lg bg-sky-400/10 p-3 text-sky-400">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                  />
                </svg>
              </div>
              <h3 className="mb-4 text-xl font-semibold text-white">
                Customer Support
              </h3>
              <p className="text-white/60">
                Deploy conversational AI agents that understand your product and
                provide 24/7 customer support with human-like interactions.
              </p>
              <div className="mt-6 rounded-lg border border-white/5 bg-black/20 p-4">
                <div className="flex gap-3">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 rounded-full bg-sky-400/10" />
                  </div>
                  <div className="flex-grow">
                    <p className="text-sm text-white/80">
                      "How can I reset my password?"
                    </p>
                    <p className="mt-2 text-sm text-sky-400">
                      AI: "I'll guide you through our secure password reset
                      process..."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Use Case 2 */}
          <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition hover:border-sky-400/50 hover:bg-white/[0.07]">
            <div className="p-8">
              <div className="mb-4 inline-flex rounded-lg bg-purple-500/10 p-3 text-purple-400">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="mb-4 text-xl font-semibold text-white">
                Content Generation
              </h3>
              <p className="text-white/60">
                Generate high-quality, SEO-optimized content at scale with AI
                that understands your brand voice and industry context.
              </p>
              <div className="mt-6 rounded-lg border border-white/5 bg-black/20 p-4">
                <div className="space-y-2">
                  <div className="h-2 w-3/4 rounded bg-purple-500/20" />
                  <div className="h-2 w-full rounded bg-purple-500/10" />
                  <div className="h-2 w-2/3 rounded bg-purple-500/10" />
                </div>
              </div>
            </div>
          </div>
          {/* Use Case 3 */}
          <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition hover:border-sky-400/50 hover:bg-white/[0.07]">
            <div className="p-8">
              <div className="mb-4 inline-flex rounded-lg bg-orange-500/10 p-3 text-orange-400">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="mb-4 text-xl font-semibold text-white">
                Document Analysis
              </h3>
              <p className="text-white/60">
                Extract insights from documents, contracts, and reports with AI
                that understands complex business context.
              </p>
              <div className="mt-6 rounded-lg border border-white/5 bg-black/20 p-4">
                <div className="flex items-center gap-3">
                  <svg
                    className="h-5 w-5 text-orange-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                  <div className="h-2 w-full rounded bg-orange-500/20" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 text-center">
          <p className="text-lg text-white/60">
            And many more use cases including:
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <span className="rounded-full bg-white/5 px-4 py-2 text-sm text-white">
              Code Analysis
            </span>
            <span className="rounded-full bg-white/5 px-4 py-2 text-sm text-white">
              Research Assistant
            </span>
            <span className="rounded-full bg-white/5 px-4 py-2 text-sm text-white">
              Data Analysis
            </span>
            <span className="rounded-full bg-white/5 px-4 py-2 text-sm text-white">
              Language Translation
            </span>
          </div>
        </div>
        <div className="mt-16 flex justify-center">
          <a
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-full bg-sky-400 px-8 py-3 text-base font-medium text-white transition hover:bg-sky-600"
          >
            Discuss Your Use Case
            <svg
              className="h-4 w-4 transition group-hover:translate-x-1"
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

export default Applications;
