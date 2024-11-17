"use client";
import React, { useState, useEffect } from "react";
import { Cpu, HardDrive, Zap, Activity, Server, Clock } from "lucide-react";

const LiveMetric = ({
  label,
  value,
  percentage,
  Icon = Activity,
  trend = 0,
}) => {
  const [currentPercentage, setCurrentPercentage] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentPercentage(percentage);
    }, 500);
    return () => clearTimeout(timer);
  }, [percentage]);

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-6 transition-all duration-300 hover:border-sky-500/30 hover:shadow-[0_0_30px_rgba(0,179,255,0.15)]">
      <div className="absolute inset-0 bg-gradient-to-br from-sky-500/0 to-sky-500/[0.03] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500/20 to-sky-600/20 shadow-inner">
            <Icon className="h-6 w-6 text-sky-400" />
          </div>
          <div>
            <p className="text-sm text-white/50">{label}</p>
            <div className="flex items-center gap-2">
              <p className="mt-1 font-mono text-2xl font-bold text-white group-hover:text-sky-400 transition-colors duration-300">
                {value}
              </p>
              {trend !== 0 && (
                <span
                  className={`text-sm ${
                    trend > 0 ? "text-green-400" : "text-orange-400"
                  }`}
                >
                  {trend > 0 ? "↑" : "↓"} {Math.abs(trend)}%
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex h-12 w-12 items-center justify-center">
          <svg className="h-12 w-12 -rotate-90 transform">
            <circle
              cx="24"
              cy="24"
              r="20"
              strokeWidth="3"
              fill="none"
              className="stroke-white/5"
            />
            <circle
              cx="24"
              cy="24"
              r="20"
              strokeWidth="3"
              fill="none"
              strokeDasharray={`${currentPercentage * 1.26} 999`}
              className="stroke-sky-400 transition-all duration-1000 ease-out"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

const Performance = () => {
  const [metrics, setMetrics] = useState({
    latency: 45,
    requests: 1000,
    uptime: 99.99,
    trends: {
      latency: -2.5,
      requests: 3.8,
      uptime: 0,
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) => {
        const newLatency = Math.max(
          30,
          Math.min(60, prev.latency + (Math.random() - 0.5) * 10)
        );
        const newRequests = Math.max(
          900,
          Math.min(1100, prev.requests + (Math.random() - 0.5) * 50)
        );

        return {
          latency: newLatency,
          requests: newRequests,
          uptime: 99.99,
          trends: {
            latency: Number(
              (((prev.latency - newLatency) / prev.latency) * 100).toFixed(1)
            ),
            requests: Number(
              (((newRequests - prev.requests) / prev.requests) * 100).toFixed(1)
            ),
            uptime: 0,
          },
        };
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const performanceMetrics = [
    {
      label: "Average Latency",
      value: `${Math.round(metrics.latency)}ms`,
      percentage: (metrics.latency / 100) * 100,
      Icon: Clock,
      trend: metrics.trends.latency,
    },
    {
      label: "Requests/Second",
      value: `${Math.round(metrics.requests)}`,
      percentage: (metrics.requests / 1200) * 100,
      Icon: Activity,
      trend: metrics.trends.requests,
    },
    {
      label: "System Uptime",
      value: `${metrics.uptime}%`,
      percentage: metrics.uptime,
      Icon: Server,
      trend: metrics.trends.uptime,
    },
  ];

  const resourceMetrics = [
    { label: "CPU Utilization", value: "30%", percentage: 30, Icon: Cpu },
    { label: "Memory Usage", value: "45%", percentage: 45, Icon: HardDrive },
    { label: "GPU Performance", value: "75%", percentage: 75, Icon: Zap },
  ];

  return (
    <div className="relative h-auto overflow-hidden bg-black py-24 font-space antialiased">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_60%,rgba(0,179,255,0.1),transparent_60%)] animate-pulse-slow" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_30%,rgba(0,179,255,0.05),transparent_50%)] animate-pulse-slow delay-75" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]" />

      <div className="relative mx-auto max-w-7xl px-4">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-gradient-to-r from-sky-500/10 to-blue-500/10 px-6 py-2 text-sm text-sky-400 backdrop-blur-sm">
            <Activity className="h-4 w-4 animate-pulse" />
            Real-Time System Metrics
          </div>

          <h2 className="mt-8 bg-gradient-to-br from-white to-white/60 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl">
            Engineered for{" "}
            <span className="relative inline-block">
              <span className="absolute -inset-2 block animate-pulse rounded-lg bg-sky-500/20 blur-xl" />
              <span className="relative bg-gradient-to-r from-sky-400 via-blue-500 to-sky-500 bg-clip-text text-transparent">
                Peak Performance
              </span>
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg font-light text-white/50">
            State-of-the-art infrastructure delivering unmatched speed and
            reliability
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...performanceMetrics, ...resourceMetrics].map((metric, index) => (
            <LiveMetric key={index} {...metric} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Performance;
