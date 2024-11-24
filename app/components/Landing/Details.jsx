import React from "react";
import { Zap, Shield, Server, BarChart, Cpu, Code, Cloud } from "lucide-react";

const Card = ({ icon, title, description, value }) => (
  <div className="group h-[180px] bg-white border border-neutral-200">
    <div className="p-6 h-full flex flex-col">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-neutral-50 p-2 border border-neutral-200">
            {icon}
          </div>
          {value ? (
            <h3 className="text-4xl font-light text-neutral-800">{value}</h3>
          ) : (
            <h3 className="font-medium text-neutral-800">{title}</h3>
          )}
        </div>
      </div>
      <div className="mt-4">
        {value ? (
          <>
            <p className="text-sm font-medium text-neutral-800">{title}</p>
            <p className="mt-2 text-sm text-neutral-600">{description}</p>
          </>
        ) : (
          <p className="text-sm text-neutral-600">{description}</p>
        )}
      </div>
    </div>
  </div>
);

const Details = () => {
  const metrics = [
    {
      value: "40%",
      title: "Lower deployment costs vs custom infrastructure",
      icon: <Server className="h-6 w-6" />,
      description:
        "Compared to building and maintaining your own LLM infrastructure",
    },
    {
      value: "15x",
      title: "Faster model integration",
      icon: <Code className="h-6 w-6" />,
      description: "Reduce integration time from months to days with our APIs",
    },
    {
      value: "80%",
      title: "Cost reduction vs proprietary APIs",
      icon: <BarChart className="h-6 w-6" />,
      description: "Compared to using commercial LLM APIs at scale",
    },
    {
      value: "4TB",
      title: "Context processing per day",
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
    <div className="relative min-h-screen bg-white py-24">
      <div className="relative mx-auto max-w-7xl px-4">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-light tracking-tight text-neutral-800">
            Scale with Open Source LLMs
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-lg text-neutral-600">
            Enterprise-grade infrastructure for AI-first companies, delivering
            performance at scale
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, index) => (
            <Card
              key={index}
              icon={metric.icon}
              value={metric.value}
              title={metric.title}
              description={metric.description}
            />
          ))}
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Card
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Details;
