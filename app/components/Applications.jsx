import React from "react";

const Applications = () => {
  const useCases = [
    {
      title: "Content Generation",
      description:
        "Generate high-quality, SEO-optimized content at scale with AI that understands your brand voice and industry context.",
      icon: (
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
      ),
      color: "neutral",
      demo: (
        <div className="space-y-2">
          <div className="h-2 w-3/4 rounded bg-neutral-500/20" />
          <div className="h-2 w-full rounded bg-neutral-500/10" />
          <div className="h-2 w-2/3 rounded bg-neutral-500/10" />
        </div>
      ),
    },
    {
      title: "Customer Support",
      description:
        "Deploy conversational AI agents that understand your product and provide 24/7 customer support with human-like interactions.",
      icon: (
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
      ),
      color: "neutral",
      demo: (
        <div className="flex gap-3">
          <div className="flex-grow">
            <p className="text-sm text-gray-600">
              "How can I reset my password?"
            </p>
            <p className="mt-2 text-sm text-neutral-900">
              AI: "I'll guide you through our secure password reset process..."
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "Document Analysis",
      description:
        "Extract insights from documents, contracts, and reports with AI that understands complex business context.",
      icon: (
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
      ),
      color: "neutral",
      demo: (
        <div className="flex items-center gap-3">
          <svg
            className="h-5 w-5 text-neutral-600"
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
          <div className="h-2 w-full rounded bg-neutral-500/20" />
        </div>
      ),
    },
  ];

  const additionalUseCases = [
    "Code Analysis",
    "Research Assistant",
    "Data Analysis",
    "Language Translation",
  ];

  return (
    <div className="relative overflow-hidden bg-white py-24 font-mono">
      <div className="relative mx-auto max-w-7xl px-4">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Power Your AI Applications
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            See how companies are leveraging LmScale to transform their
            businesses
          </p>
        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {useCases.map((useCase, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-neutral-300 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)]"
            >
              <div className="relative">
                <div className="flex justify-start items-center gap-4">
                  <div className="mb-4 inline-flex rounded-lg p-3 text-neutral-600 bg-neutral-100/50 transition-all duration-300 group-hover:bg-neutral-100 group-hover:text-neutral-900">
                    {useCase.icon}
                  </div>

                  <h3 className="mb-4 text-xl font-semibold text-neutral-900 transition-colors duration-300 group-hover:text-black">
                    {useCase.title}
                  </h3>
                </div>

                <p className="text-gray-600 transition-colors duration-300 group-hover:text-neutral-700">
                  {useCase.description}
                </p>

                <div className="mt-6 rounded-xl border border-neutral-100 bg-neutral-50 p-4 transition-all duration-300 group-hover:border-neutral-200 group-hover:bg-neutral-100/50">
                  {useCase.demo}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-lg text-gray-900">
            And many more use cases including:
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            {additionalUseCases.map((useCase, index) => (
              <span
                key={index}
                className="rounded-full border border-neutral-200 bg-white px-6 py-2 text-sm text-neutral-600 transition-all duration-300 hover:-translate-y-0.5 hover:border-neutral-300 hover:bg-neutral-50 hover:text-neutral-900 hover:shadow-[0_4px_10px_-2px_rgba(0,0,0,0.05)]"
              >
                {useCase}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Applications;
