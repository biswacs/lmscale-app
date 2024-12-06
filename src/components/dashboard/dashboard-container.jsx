import {
  Activity,
  ArrowUpRight,
  Clock,
  Cloud,
  Cpu,
  Plus,
  Settings,
  Zap,
} from "lucide-react";
import { useState } from "react";

export function DashboardContainer() {
  const [deployments] = useState([
    {
      id: 1,
      name: "Production GPT-4",
      status: "active",
      model: "gpt-4",
      requests: "1.2M",
      latency: "180ms",
      uptime: "99.99%",
      lastUpdated: "2h ago",
    },
    {
      id: 2,
      name: "Staging Mixtral",
      status: "active",
      model: "mixtral-8x7b",
      requests: "850K",
      latency: "120ms",
      uptime: "99.95%",
      lastUpdated: "4h ago",
    },
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-emerald-500";
      case "deploying":
        return "bg-blue-500";
      case "error":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="relative min-h-screen bg-white">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:24px_24px] md:bg-[size:32px_32px]"
          style={{
            mask: "radial-gradient(circle at center, white 30%, transparent 70%)",
            WebkitMask:
              "radial-gradient(circle at center, white 30%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-light">Deployments</h1>
          <button className="group inline-flex items-center bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-neutral-950 hover:scale-105 hover:shadow-lg">
            <Plus className="mr-2 h-4 w-4" />
            New Deployment
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* New Deployment Card */}
          <div className="group border border-dashed border-neutral-200 hover:border-neutral-300 transition-all">
            <div className="relative h-[220px] flex flex-col items-center justify-center p-6 space-y-4">
              <div className="h-12 w-12 rounded-full bg-neutral-50 flex items-center justify-center">
                <Plus className="h-6 w-6 text-neutral-400 group-hover:text-neutral-600 transition-colors" />
              </div>
              <p className="text-sm text-neutral-600 text-center">
                Deploy a new model to your infrastructure
              </p>
              <button className="text-sm text-neutral-900 hover:underline">
                Create Deployment
              </button>
            </div>
          </div>

          {/* Deployment Cards */}
          {deployments.map((deployment) => (
            <div
              key={deployment.id}
              className="group bg-white border border-neutral-200 hover:shadow-lg transition-all"
            >
              <div className="relative h-[220px] flex flex-col p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Cloud className="h-5 w-5 text-neutral-700" />
                    <h3 className="font-medium text-neutral-900">
                      {deployment.name}
                    </h3>
                  </div>
                  <div className="flex items-center">
                    <span
                      className={`h-2 w-2 rounded-full ${getStatusColor(
                        deployment.status
                      )} mr-2`}
                    ></span>
                    <span className="text-sm text-neutral-600 capitalize">
                      {deployment.status}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-neutral-600">Model</span>
                    <span className="font-mono text-neutral-900">
                      {deployment.model}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Activity className="h-4 w-4 text-neutral-600" />
                      <span className="text-sm text-neutral-900">
                        {deployment.requests}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Zap className="h-4 w-4 text-neutral-600" />
                      <span className="text-sm text-neutral-900">
                        {deployment.latency}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Cpu className="h-4 w-4 text-neutral-600" />
                      <span className="text-sm text-neutral-900">
                        {deployment.uptime}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-neutral-600" />
                      <span className="text-sm text-neutral-900">
                        {deployment.lastUpdated}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-auto flex items-center justify-between">
                  <button className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">
                    <Settings className="h-4 w-4" />
                  </button>
                  <button className="group inline-flex items-center text-sm text-neutral-900 hover:underline">
                    View Details
                    <ArrowUpRight className="ml-1 h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
