import React, { useState } from "react";
import { Loader2, X } from "lucide-react";
import { useAgents } from "@/providers/agent-provider";
import Link from "next/link";

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-neutral-900/60 flex items-center justify-center p-4 z-50">
      <div className="bg-white w-full max-w-md relative animate-in fade-in duration-200">
        {children}
      </div>
    </div>
  );
}

function CreateAgentModal({ isOpen, onClose }) {
  const { createAgent } = useAgents();
  const [formData, setFormData] = useState({
    name: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const resetForm = () => {
    setFormData({
      name: "",
    });
    setError(null);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await createAgent(formData);
      handleClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="border-b border-neutral-200">
        <div className="flex items-center justify-between px-6 py-4 bg-neutral-900">
          <h2 className="text-lg font-light text-neutral-200">
            Create New Agent
          </h2>
          <button
            onClick={handleClose}
            className="text-neutral-200 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6">
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
            onClick={handleClose}
            className="h-10 px-4 text-sm text-neutral-700 hover:text-neutral-900 font-light"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="h-10 px-4 bg-neutral-900 text-sm text-white hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[100px] font-light"
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

export function DashboardContainer() {
  const { agents, isLoading, error, isCreateModalOpen, setIsCreateModalOpen } =
    useAgents();

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center text-red-500 font-light">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col relative">
      <div className="absolute inset-0 overflow-y-auto">
        <div className="min-h-full pb-24">
          <div className="px-4 py-4">
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
                <h1 className="text-xl sm:text-2xl text-neutral-900 font-light">
                  Agents
                </h1>
                <button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="w-full sm:w-auto bg-neutral-900 text-white px-4 py-2 text-sm hover:bg-neutral-800 font-light"
                >
                  New Agent
                </button>
              </div>

              <div className="border border-neutral-200 bg-white overflow-x-auto">
                <div className="hidden sm:grid grid-cols-5 gap-4 p-4 border-b border-neutral-200 text-sm text-neutral-500 font-light">
                  <div className="col-span-2">Name</div>
                  <div>Status</div>
                  <div>Created</div>
                  <div>Last Updated</div>
                </div>

                {agents.map((agent) => (
                  <Link
                    key={agent.id}
                    href={`/agent/${agent.id}`}
                    className="flex flex-col sm:grid sm:grid-cols-5 gap-2 sm:gap-4 p-4 border-b border-neutral-200 text-sm hover:bg-neutral-50"
                  >
                    <div className="col-span-2 text-neutral-900 font-light">
                      <span className="sm:hidden text-neutral-500">Name: </span>
                      {agent.name}
                    </div>
                    <div className="font-light">
                      <span className="sm:hidden text-neutral-500">
                        Status:{" "}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <span
                          className={`size-2 rounded-full ${
                            agent.isActive ? "bg-green-500" : "bg-yellow-500"
                          }`}
                        />
                        {agent.isActive ? "Active" : "Inactive"}
                      </span>
                    </div>
                    <div className="text-neutral-600 font-light">
                      <span className="sm:hidden text-neutral-500">
                        Created:{" "}
                      </span>
                      {new Date(agent.createdAt).toLocaleDateString()}
                    </div>
                    <div className="text-neutral-600 font-light">
                      <span className="sm:hidden text-neutral-500">
                        Updated:{" "}
                      </span>
                      {new Date(agent.updatedAt).toLocaleDateString()}
                    </div>
                  </Link>
                ))}

                {agents.length === 0 && (
                  <div className="p-8 text-center text-neutral-500 font-light">
                    No agents found
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <CreateAgentModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
}
