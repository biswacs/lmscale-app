import React from "react";

const ApplicationCard = ({ title, description, content, icon }) => (
  <div className="group relative overflow-hidden border border-neutral-200/60 p-4">
    <div className="relative space-y-4">
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl transition-colors duration-300 group-hover:bg-neutral-100">
          {icon}
        </div>
        <h3 className="font-mono text-lg font-medium tracking-wide text-neutral-900">
          {title}
        </h3>
      </div>
      <p className="text-neutral-600 leading-relaxed">{description}</p>
      {content}
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
          className="h-5 w-5 text-neutral-600"
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
      content: (
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="flex-1">
              <div className="rounded-xl bg-blue-500/10 px-4 py-3 text-sm text-blue-900">
                I'd like to place a bulk order for our company. What's the
                process?
              </div>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-1">
              <div className="rounded-xl bg-white px-4 py-3 text-sm text-neutral-800">
                I'll help you with your bulk order! For corporate purchases over
                $1000, you'll receive: • 15% volume discount • Dedicated account
                manager • Priority shipping Would you like me to start a
                corporate quote for you?
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Code Generation",
      description:
        "Generate high-quality, production-ready code with AI that understands your codebase, style guides, and best practices. Supports multiple languages and frameworks.",
      icon: (
        <svg
          className="h-5 w-5 text-neutral-600"
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
      content: (
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="flex-1">
              <div className="rounded-xl bg-blue-500/10 px-4 py-3 text-sm text-blue-900">
                Create a button component with hover effects
              </div>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-1">
              <div className="rounded-xl bg-white font-mono text-sm text-neutral-800">
                <pre className="overflow-x-auto p-4">
                  {`<button className="rounded-lg bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600">
  Click me
</button>`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="relative overflow-hidden bg-white py-24">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="mx-auto font-mono  mb-16 flex flex-col items-center text-center">
            <h2 className="text-3xl font-medium tracking-tight text-neutral-900">
              Applications
            </h2>
            <p className="mt-4 text-lg text-neutral-600">
              Powerful AI solutions designed to transform and accelerate your
              business workflows.
            </p>
          </div>

          <div className="mt-10 space-y-6">
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
