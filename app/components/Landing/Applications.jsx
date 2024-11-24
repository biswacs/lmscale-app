import React from "react";

const ApplicationCard = ({ title, description, content, icon }) => (
  <div className="group relative border border-neutral-200/60 bg-white p-4 transition-all duration-300 hover:shadow-md">
    <div className="relative space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center">
            {icon}
          </div>
          <h3 className=" text-lg font-medium tracking-tight text-neutral-800 line-clamp-1">
            {title}
          </h3>
        </div>
      </div>
      <p className="text-neutral-800 leading-relaxed line-clamp-2 h-12">
        {description}
      </p>

      <div className="space-y-4">
        <div className="flex items-start">
          <div className="flex-1">
            <div className="bg-white p-4 text-sm text-neutral-800 shadow-sm border border-neutral-50">
              {content.query}
            </div>
          </div>
        </div>
        <div className="flex items-start">
          <div className="flex-1">
            <div className="bg-neutral-50 p-4 text-sm text-neutral-800 space-y-2">
              {content.response}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Applications = () => {
  const applications = [
    {
      title: "Customer Support",
      description:
        "Deploy conversational AI agents that understand your product documentation and previous support tickets. Provides 24/7 support with human-like interactions.",
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
        query:
          "I'd like to place a bulk order for our company. What's the process?",
        response: (
          <>
            I'll help you with your bulk order! For purchases over $1000, you'll
            receive:
            <ul className="mt-2 space-y-1 text-neutral-800">
              <li>• 15% volume discount</li>
              <li>• Dedicated account manager</li>
            </ul>
          </>
        ),
      },
    },
    {
      title: "Code Generation",
      description:
        "Generate high-quality, production-ready code with AI that understands your codebase, style guides, and best practices. Supports multiple languages and frameworks.",
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
        query: "Create a button component with hover effects",
        response: (
          <pre className="whitespace-pre-wrap break-all ">
            {
              '<button class="bg-neutral-100 px-4 py-2 text-neutral-800 hover:bg-neutral-200">Click me</button>'
            }
          </pre>
        ),
      },
    },
    {
      title: "Content Generation",
      description:
        "Transform your content creation with AI that maintains your brand voice. Generate blog posts, marketing copy, product descriptions, and more at scale.",
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
        query: "Write a product description for our new AI platform",
        response:
          "Unlock the power of AI with our enterprise-grade development platform. Built for scale, security, and performance, our platform enables seamless integration of state-of-the-art language models into your existing workflows.",
      },
    },
    {
      title: "Custom LLM Tools",
      description:
        "Fine-tune language models on your specific data and use cases. Get a custom AI solution that speaks your industry's language and understands your unique requirements.",
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
        query: "Training progress: Customer response dataset",
        response: (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span>Model accuracy</span>
              <span className="font-medium">94.2%</span>
            </div>
            <div className="w-full bg-neutral-200 rounded-full h-2">
              <div className="bg-neutral-400 rounded-full h-2 w-[94%]"></div>
            </div>
            <div className="text-neutral-800 text-xs">
              Fine-tuning complete: 50,000 customer queries processed
            </div>
          </div>
        ),
      },
    },
  ];

  return (
    <div className="relative overflow-hidden bg-white py-24">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="mx-auto mb-16 flex flex-col items-center text-center">
            <h1 className="text-3xl md:text-4xl lg:text-6xl font-light tracking-tight text-neutral-800">
              Applications
            </h1>
            <p className="mt-4 max-w-2xl text-lg font-light text-neutral-800">
              Enterprise-grade LLM solutions customized for your specific needs.
              Deploy, fine-tune, and scale AI models with confidence.
            </p>
          </div>

          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2">
            {applications.map((app) => (
              <ApplicationCard key={app.title} {...app} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Applications;
