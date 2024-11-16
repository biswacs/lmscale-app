import React from "react";

const Pricing = () => {
  const pricingPlans = [
    {
      name: "Starter",
      description: "Perfect for small teams and startups",
      price: "$49",
      interval: "/month",
      highlighted: false,
      features: [
        "Up to 100k API calls/month",
        "2 Concurrent models",
        "Basic monitoring",
        "Community support",
        "Standard SLA",
        "Basic analytics",
      ],
    },
    {
      name: "Pro",
      description: "For growing businesses",
      price: "$199",
      interval: "/month",
      highlighted: true,
      badge: "Most Popular",
      features: [
        "Up to 1M API calls/month",
        "5 Concurrent models",
        "Advanced monitoring",
        "Priority support",
        "99.9% SLA",
        "Advanced analytics",
      ],
    },
    {
      name: "Enterprise",
      description: "For large organizations",
      price: "Custom",
      highlighted: false,
      features: [
        "Unlimited API calls",
        "Unlimited concurrent models",
        "Custom monitoring",
        "24/7 dedicated support",
        "99.99% SLA",
        "Custom analytics",
      ],
    },
  ];

  return (
    <div className="relative overflow-hidden bg-black py-24 font-space">
      {/* Enhanced background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(0,179,255,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(0,179,255,0.05),transparent_50%)]" />

      <div className="relative mx-auto max-w-7xl px-4">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Simple,{" "}
            <span className="bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">
              Transparent
            </span>{" "}
            Pricing
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/60">
            Pay only for what you use. No hidden fees or long-term commitments.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-2xl border transition-all duration-300 
                ${
                  plan.highlighted
                    ? "border-sky-500 bg-white/8 shadow-[0_0_40px_rgba(0,179,255,0.15)]"
                    : "border-white/10 bg-white/5 hover:border-sky-500/50 hover:bg-white/[0.07]"
                }`}
            >
              {/* Glow effect */}
              {plan.highlighted && (
                <div className="absolute -right-20 -top-20 h-40 w-40 bg-sky-500/20 blur-[100px]" />
              )}

              <div className="relative p-8">
                {/* Badge */}
                {plan.badge && (
                  <div className="inline-block rounded-full bg-sky-500/10 px-3 py-1 text-xs font-medium text-sky-400">
                    {plan.badge}
                  </div>
                )}

                {/* Plan Header */}
                <div className={`${plan.badge ? "mt-4" : ""}`}>
                  <h3 className="text-xl font-semibold text-white group-hover:text-sky-400 transition-colors duration-300">
                    {plan.name}
                  </h3>
                  <p className="mt-2 text-sm text-white/60">
                    {plan.description}
                  </p>
                </div>

                {/* Pricing */}
                <div className="mt-6">
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold text-white group-hover:text-sky-400 transition-colors duration-300">
                      {plan.price}
                    </span>
                    {plan.interval && (
                      <span className="ml-1 text-white/60">
                        {plan.interval}
                      </span>
                    )}
                  </div>
                </div>

                {/* Features */}
                <ul className="mt-8 space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center gap-3 text-sm text-white/80"
                    >
                      <svg
                        className="h-5 w-5 text-sky-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  className={`mt-8 w-full rounded-full px-4 py-3 text-sm font-medium transition-all duration-300
                  ${
                    plan.highlighted
                      ? "bg-sky-500 text-white hover:bg-sky-600 hover:shadow-[0_0_20px_rgba(0,179,255,0.3)]"
                      : "border border-sky-500/50 text-white hover:bg-sky-500/10"
                  }`}
                >
                  {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-16">
          <div className="group rounded-2xl border border-white/10 bg-white/5 p-8 transition-all duration-300 hover:border-sky-500/50 hover:bg-white/[0.07]">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h3 className="text-xl font-semibold text-white group-hover:text-sky-400 transition-colors duration-300">
                  Looking for something specific?
                </h3>
                <p className="mt-2 text-white/60">
                  Contact us for custom pricing options to match your specific
                  needs.
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-4 lg:mt-0">
                <button className="inline-flex items-center gap-2 rounded-full bg-sky-500 px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-sky-600 hover:shadow-[0_0_20px_rgba(0,179,255,0.3)]">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  Contact Sales
                </button>
                <button className="inline-flex items-center gap-2 rounded-full border border-sky-500/50 px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-sky-500/10">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Schedule Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
