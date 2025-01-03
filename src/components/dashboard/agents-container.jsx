import React, { useState, useEffect } from "react";
import { Loader2, X } from "lucide-react";

const API_BASE_URL = "https://api.lmscale.tech/v1";

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

function CreateAgentModal({ isOpen, onClose, onCreateSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/agent/create`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("lm_auth_token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to create agent");
      }

      onCreateSuccess();
      onClose();
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
            onClick={onClose}
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
              <span className="text-red-500 ml-1">*</span>
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

          <div className="space-y-2">
            <label className="block text-sm text-neutral-900 font-light">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              placeholder="Enter agent description"
              rows={3}
              className="w-full border border-neutral-200 px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 resize-none font-light"
            />
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
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

export function AgentsContainer() {
  const [agents, setAgents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/user/agents`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("lm_auth_token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch agents");
      }

      const result = await response.json();
      setAgents(result.data.agents);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

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
                  <div
                    key={agent.id}
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
                  </div>
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
        onCreateSuccess={fetchAgents}
      />
    </div>
  );
}
