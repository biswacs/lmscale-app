import React from "react";

const Description = () => {
  const features = [
    {
      title: "One-Click Deployment",
      description:
        "Deploy your local LLMs to production in minutes with our streamlined infrastructure.",
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
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
    },
    {
      title: "Enterprise Security",
      description:
        "Bank-grade encryption and security measures to keep your models and data safe.",
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
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
    },
    {
      title: "Auto-Scaling",
      description:
        "Automatically scale your infrastructure based on demand and traffic patterns.",
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
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
      ),
    },
    {
      title: "Real-Time Analytics",
      description:
        "Monitor model performance, usage metrics, and costs in real-time.",
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
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
    },
    {
      title: "Custom Fine-Tuning",
      description:
        "Fine-tune models on your data with our intuitive training pipeline.",
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
            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
          />
        </svg>
      ),
    },
    {
      title: "API Integration",
      description:
        "Simple REST APIs and SDKs for seamless integration with your applications.",
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
            d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="relative overflow-hidden bg-black py-24 font-space">
      {/* Enhanced gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(0,179,255,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(0,179,255,0.05),transparent_50%)]" />

      <div className="relative mx-auto max-w-7xl px-4">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Everything you need to run{" "}
            <span className="bg-gradient-to-r from-sky-400 via-blue-500 to-sky-600 bg-clip-text text-transparent">
              Local LLMs
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/60">
            Deploy, manage, and scale your language models with enterprise-grade
            infrastructure and security.
          </p>
        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-sky-400/0 to-sky-400/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="relative">
                <div className="mb-4 inline-flex rounded-lg bg-sky-400/10 p-3 text-sky-400 transition-all duration-300 group-hover:bg-sky-400/20 group-hover:scale-110">
                  {feature.icon}
                </div>

                <h3 className="mb-2 text-lg font-semibold text-white transition-colors duration-300 group-hover:text-sky-400">
                  {feature.title}
                </h3>

                <p className="text-white/60 transition-colors duration-300 group-hover:text-white/70">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <a
            href="/features"
            className="group relative inline-flex items-center gap-2 text-sm font-medium text-sky-400 transition-all duration-300 hover:text-sky-300"
          >
            <span className="relative">
              Learn more about our features
              <span className="absolute bottom-0 left-0 h-px w-full bg-sky-400/50 scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
            </span>
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

export default Description;
