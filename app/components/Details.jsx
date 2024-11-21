import React from "react";
import {
  Zap,
  Shield,
  Clock,
  Server,
  BarChart,
  Cpu,
  Code,
  Cloud,
} from "lucide-react";

const Details = () => {
  const metrics = [
    {
      value: "40%",
      label: "Lower deployment costs vs custom infrastructure",
      icon: <Server className="h-6 w-6" />,
      description:
        "Compared to building and maintaining your own LLM infrastructure",
    },
    {
      value: "15x",
      label: "Faster model integration",
      icon: <Code className="h-6 w-6" />,
      description: "Reduce integration time from months to days with our APIs",
    },
    {
      value: "80%",
      label: "Cost reduction vs proprietary APIs",
      icon: <BarChart className="h-6 w-6" />,
      description: "Compared to using commercial LLM APIs at scale",
    },
    {
      value: "4TB",
      label: "Context processing per day",
      icon: <Cpu className="h-6 w-6" />,
      description: "Handle massive data volumes with optimized infrastructure",
    },
  ];

  const features = [
    {
      title: "LLM Implementation",
      description:
        "Streamlined deployment of open-source models with production-ready APIs.",
      icon: <Cloud className="h-6 w-6" />,
    },
    {
      title: "Custom Integration",
      description:
        "Tailored solutions for your specific use cases and existing stack.",
      icon: <Code className="h-6 w-6" />,
    },
    {
      title: "Continuous Optimization",
      description: "Performance monitoring and automatic model upgrades.",
      icon: <Zap className="h-6 w-6" />,
    },
    {
      title: "Enterprise Controls",
      description: "Advanced security, audit logs, and access management.",
      icon: <Shield className="h-6 w-6" />,
    },
  ];

  return (
    <div className="relative min-h-screen bg-white py-24 font-mono">
      <div className="relative mx-auto max-w-7xl px-4">
        <div className="text-center">
          <h2 className="font-mono text-3xl font-medium tracking-tight text-neutral-900">
            Scale with <span className="text-blue-600">Open Source LLMs</span>
          </h2>
          <p className="mx-auto mt-4 text-lg text-neutral-600">
            Enterprise-grade infrastructure for AI-first companies
          </p>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, index) => (
            <div key={index} className="p-6 bg-white">
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="rounded-xl bg-gradient-to-br from-neutral-50 to-neutral-100 p-2 shadow-sm transition-transform duration-500 group-hover:scale-110">
                    {metric.icon}
                  </div>
                  <h3 className="text-4xl font-bold text-neutral-900">
                    {metric.value}
                  </h3>
                </div>
                <div className="mt-auto space-y-2">
                  <p className="text-sm text-neutral-600 font-medium">
                    {metric.label}
                  </p>
                  <p className="text-xs text-neutral-500">
                    {metric.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl border border-neutral-200/60 bg-white p-6"
            >
              <div className="flex items-center gap-4">
                <div className="rounded-xl bg-neutral-100 p-2 transition-all duration-300 group-hover:bg-neutral-200/60">
                  {feature.icon}
                </div>
                <h3 className="font-medium text-neutral-800">
                  {feature.title}
                </h3>
              </div>
              <p className="mt-4 text-sm text-neutral-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Details;
