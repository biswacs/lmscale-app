import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Settings,
  Terminal,
  BookOpen,
  Code2,
  ChevronRight,
  ChevronLeft,
  Plus,
  Loader2,
  X,
  Bot,
} from "lucide-react";
import { useSidebar } from "@/providers/sidebar-provider";

const navigation = [
  { name: "System Prompt", href: "/dashboard/prompt", icon: Terminal },
  { name: "Functions", href: "/dashboard/functions", icon: Code2 },
  { name: "Instructions", href: "/dashboard/instructions", icon: BookOpen },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const {
    agents,
    selectedAgent,
    isLoading,
    isAgentModalOpen,
    setIsAgentModalOpen,
    isCreateModalOpen,
    setIsCreateModalOpen,
    selectAgent,
    fetchAgents,
    createAgent,
  } = useSidebar();

  const [formData, setFormData] = useState({ name: "" });
  const [createLoading, setCreateLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCreateAgent = async (e) => {
    e.preventDefault();
    setCreateLoading(true);
    setError(null);

    try {
      await createAgent(formData);
      setFormData({ name: "" });
    } catch (err) {
      setError(err.message);
    } finally {
      setCreateLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="w-52 border-r border-neutral-200 bg-white flex items-center justify-center">
        <Loader2 className="h-5 w-5 animate-spin text-neutral-500" />
      </div>
    );
  }

  return (
    <>
      <div
        className={`relative flex flex-col border-r border-neutral-200 bg-white transition-all duration-300 ${
          isCollapsed ? "w-16" : "w-52"
        }`}
      >
        <div className="flex-1 overflow-y-auto">
          <nav className="flex flex-col gap-1 py-2 px-4">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 rounded px-3 py-2 text-sm transition-colors duration-200
                    ${
                      isActive
                        ? "bg-neutral-900 text-white"
                        : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
                    }`}
                >
                  <item.icon className="h-4 w-4 flex-shrink-0" />
                  {!isCollapsed && (
                    <span className="font-light truncate">{item.name}</span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {!isCollapsed && selectedAgent && (
          <div className="mt-auto p-2 border-t border-neutral-200">
            <button
              onClick={() => setIsAgentModalOpen(true)}
              className="flex items-center gap-2 w-full rounded px-3 py-2 text-sm hover:bg-neutral-50"
            >
              <span className="inline-flex items-center gap-1.5">
                <span className="font-light truncate flex justify-start items-center">
                  <Bot className="h-4 w-4 flex-shrink-0" />
                  <div>{selectedAgent.name}</div>
                </span>
              </span>
            </button>
          </div>
        )}

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-2.5 top-3.5 flex h-5 w-5 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>
      </div>

      {isAgentModalOpen && (
        <div className="fixed inset-0 bg-neutral-900/60 flex items-center justify-center p-4 z-50">
          <div className="bg-white w-full max-w-md relative animate-in fade-in duration-200">
            <div className="border-b border-neutral-200">
              <div className="flex items-center justify-between px-6 py-4 bg-neutral-900">
                <h2 className="text-lg font-light text-neutral-200">
                  Select Agent
                </h2>
                <button
                  onClick={() => setIsAgentModalOpen(false)}
                  className="text-neutral-200 hover:text-white transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="p-4 space-y-4">
              <button
                onClick={() => {
                  setIsAgentModalOpen(false);
                  setIsCreateModalOpen(true);
                }}
                className="flex items-center gap-2 w-full p-3 text-sm border border-dashed border-neutral-300 hover:border-neutral-400"
              >
                <Plus className="h-4 w-4" />
                <span className="font-light">Create New Agent</span>
              </button>
              {agents.map((agent) => (
                <button
                  key={agent.id}
                  onClick={() => selectAgent(agent)}
                  className={`flex items-center gap-2 w-full p-3 text-sm border ${
                    selectedAgent?.id === agent.id
                      ? "border-neutral-900 bg-neutral-50"
                      : "border-neutral-200 hover:border-neutral-300"
                  }`}
                >
                  <span className="inline-flex items-center gap-1.5">
                    <span
                      className={`size-2 rounded-full ${
                        agent.isActive ? "bg-green-500" : "bg-yellow-500"
                      }`}
                    />
                    <span className="font-light">{agent.name}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-neutral-900/60 flex items-center justify-center p-4 z-50">
          <div className="bg-white w-full max-w-md relative animate-in fade-in duration-200">
            <div className="border-b border-neutral-200">
              <div className="flex items-center justify-between px-6 py-4 bg-neutral-900">
                <h2 className="text-lg font-light text-neutral-200">
                  Create New Agent
                </h2>
                <button
                  onClick={() => {
                    setIsCreateModalOpen(false);
                    setFormData({ name: "" });
                    setError(null);
                  }}
                  className="text-neutral-200 hover:text-white transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <form onSubmit={handleCreateAgent} className="p-6">
              <div className="space-y-4">
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 p-3 text-sm font-light">
                    {error}
                  </div>
                )}

                <div className="space-y-2">
                  <label className="block text-sm text-neutral-900 font-light">
                    Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    placeholder="Enter agent name"
                    className="w-full h-10 border border-neutral-200 px-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 font-light"
                    required
                  />
                </div>
              </div>
              <div className="mt-6 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsCreateModalOpen(false);
                    setFormData({ name: "" });
                    setError(null);
                  }}
                  className="h-10 px-4 text-sm text-neutral-700 hover:text-neutral-900 font-light"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createLoading}
                  className="h-10 px-4 bg-neutral-900 text-sm text-white hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[100px] font-light"
                >
                  {createLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Create Agent"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
