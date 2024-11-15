import React from "react";

const Performance = () => {
  const performanceMetrics = [
    { label: "Average Latency", value: "45ms", percentage: 15 },
    { label: "Requests/Second", value: "1000+", percentage: 80 },
    { label: "Uptime", value: "99.99%", percentage: 99 },
  ];

  const resourceMetrics = [
    {
      label: "CPU Usage",
      value: "30%",
      percentage: 30,
      icon: (
        <svg
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
          />
        </svg>
      ),
    },
    {
      label: "Memory Usage",
      value: "45%",
      percentage: 45,
      icon: (
        <svg
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      label: "GPU Utilization",
      value: "75%",
      percentage: 75,
      icon: (
        <svg
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
          />
        </svg>
      ),
    },
  ];

  const stats = [
    { value: "500ms", label: "Average Response Time" },
    { value: "10TB", label: "Daily Data Processed" },
    { value: "1M+", label: "API Requests Daily" },
  ];

  return (
    <div className="relative overflow-hidden bg-black py-24 font-space">
      {/* Enhanced gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(0,179,255,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(0,179,255,0.05),transparent_50%)]" />

      <div className="relative mx-auto max-w-7xl px-4">
        <div className="text-center">
          {/* Section badge */}
          <div className="inline-flex items-center rounded-full border border-sky-500/20 bg-sky-500/10 px-6 py-2 text-sm text-sky-400">
            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-sky-400 animate-pulse"></span>
            Performance Metrics
          </div>

          <h2 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Built for{" "}
            <span className="bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">
              Performance
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/60">
            Industry-leading speed and reliability for your AI infrastructure
          </p>
        </div>

        <div className="mt-20 grid gap-8 lg:grid-cols-2">
          {/* Performance Stats */}
          <div className="group rounded-2xl border border-white/10 bg-white/5 p-8 transition-all duration-300 hover:border-sky-400/20 hover:bg-white/[0.07]">
            <h3 className="text-xl font-semibold text-white">
              Real-time Performance
            </h3>

            {performanceMetrics.map((metric, index) => (
              <div key={index} className="mt-8">
                <div className="flex items-center justify-between">
                  <span className="text-white/60">{metric.label}</span>
                  <span className="font-mono text-sky-400">{metric.value}</span>
                </div>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-sky-400 transition-all duration-1000 ease-out"
                    style={{
                      width: `${metric.percentage}%`,
                      transition: "width 1.5s ease-out",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Resource Utilization */}
          <div className="group rounded-2xl border border-white/10 bg-white/5 p-8 transition-all duration-300 hover:border-sky-400/20 hover:bg-white/[0.07]">
            <h3 className="text-xl font-semibold text-white">
              Resource Optimization
            </h3>

            <div className="mt-8 grid gap-6">
              {resourceMetrics.map((metric, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:border-sky-400/20 hover:bg-white/[0.07]"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-sky-400">{metric.icon}</div>
                      <span className="text-white">{metric.label}</span>
                    </div>
                    <span className="font-mono text-sky-400">
                      {metric.value}
                    </span>
                  </div>
                  <div className="mt-4 flex gap-1">
                    <div
                      className="h-1 rounded-full bg-sky-400 transition-all duration-1000 ease-out"
                      style={{ width: `${metric.percentage}%` }}
                    />
                    <div
                      className="h-1 rounded-full bg-white/10"
                      style={{ width: `${100 - metric.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats section */}
        <div className="mt-16 grid gap-8 sm:grid-cols-3">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group rounded-2xl border border-white/10 bg-white/5 p-6 text-center transition-all duration-300 hover:border-sky-400/20 hover:bg-white/[0.07]"
            >
              <div className="text-3xl font-bold text-white group-hover:text-sky-400 transition-colors duration-300">
                {stat.value}
              </div>
              <div className="mt-2 text-sm text-white/60">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Performance;
