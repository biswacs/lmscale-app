import React, { useState } from "react";
import { Loader2, X, Plus, Activity, Calendar } from "lucide-react";
import { useAgents } from "@/providers/agents-provider";
import Link from "next/link";

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white w-full max-w-md shadow-xl relative animate-in fade-in duration-200">
        {children}
      </div>
    </div>
  );
}

function CreateAgentModal({ isOpen, onClose }) {
  const { createAgent } = useAgents();
  const [formData, setFormData] = useState({ name: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await createAgent(formData);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="border-b border-neutral-100">
        <div className="flex items-center justify-between px-6 py-4 bg-neutral-900">
          <h2 className="text-lg text-neutral-200">Create New Agent</h2>
          <button
            onClick={onClose}
            className="text-neutral-200 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6">
        {error && (
          <div className="mb-4 bg-red-50 border border-red-100 text-red-600 p-3 text-sm ">
            {error}
          </div>
        )}

        <div className="space-y-2">
          <label className="block text-sm text-neutral-700">Agent Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ name: e.target.value })}
            placeholder="Enter agent name"
            className="w-full h-10  border border-neutral-200 px-3 text-sm 
                     placeholder:text-neutral-400 focus:outline-none focus:ring-2 
                     focus:ring-neutral-900 focus:border-transparent"
            required
          />
        </div>

        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm text-neutral-600 hover:text-neutral-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-neutral-900  text-sm text-white 
                     hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed 
                     flex items-center justify-center min-w-[100px]"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Create Agent"
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
}

function AgentCard({ agent }) {
  return (
    <Link
      href={`/agent/${agent.id}`}
      className="block bg-white border border-neutral-200 hover:border-neutral-300 
                transition-all duration-200 hover:shadow-sm"
    >
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg text-neutral-900">{agent.name}</h3>
          <span
            className={`flex items-center gap-1.5 text-sm ${
              agent.isActive ? "text-green-600" : "text-yellow-600"
            }`}
          >
            <span
              className={`size-2 rounded-full ${
                agent.isActive ? "bg-green-500" : "bg-yellow-500"
              }`}
            />
            {agent.isActive ? "Active" : "Inactive"}
          </span>
        </div>

        <div className="pt-4 border-t border-neutral-100 grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2 text-sm text-neutral-500">
            <Calendar className="h-4 w-4" />
            {new Date(agent.createdAt).toLocaleDateString()}
          </div>
        </div>
      </div>
    </Link>
  );
}

export function DashboardContainer() {
  const { agents, isLoading, error, isCreateModalOpen, setIsCreateModalOpen } =
    useAgents();

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-neutral-900" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center text-red-600">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="h-full font-light">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl text-neutral-900">Agents</h1>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2 bg-neutral-900 text-white px-4 py-2 
                      hover:bg-neutral-800 transition-colors"
          >
            <Plus className="h-4 w-4" />
            New Agent
          </button>
        </div>

        {agents.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-neutral-400 mb-4">No agents found</div>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="text-sm text-neutral-900 hover:text-neutral-700"
            >
              Create your first agent
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agents.map((agent) => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>
        )}
      </div>

      <CreateAgentModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
}
