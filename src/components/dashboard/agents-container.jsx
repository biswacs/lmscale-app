import React, { useState, useEffect } from "react";
import { Loader2, X } from "lucide-react";

const API_BASE_URL = "https://api.lmscale.tech/v1";

function Modal({ isOpen, onClose, children, title }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white -lg w-full max-w-md relative">
        <div className="flex justify-between items-center p-4 border-b border-neutral-200">
          <h2 className="text-lg font-semibold text-neutral-900">{title}</h2>
          <button
            onClick={onClose}
            className="text-neutral-500 hover:text-neutral-700"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-4">{children}</div>
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
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Agent">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <div className="space-y-2">
          <label className="text-sm text-neutral-900">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            className="w-full border border-neutral-200 p-2 text-sm focus:outline-none focus:border-neutral-400 "
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-neutral-900">Description</label>
          <input
            type="text"
            value={formData.description}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, description: e.target.value }))
            }
            className="w-full border border-neutral-200 p-2 text-sm focus:outline-none focus:border-neutral-400 "
          />
        </div>
        <div className="flex justify-end gap-2 pt-4">
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
            className="bg-neutral-900 text-white px-4 py-2 text-sm hover:bg-neutral-800 disabled:opacity-50 "
          >
            {isLoading ? (
              <Loader2 className="animate-spin h-4 w-4" />
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
      <div className="h-full flex items-center justify-center text-red-500">
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
                <h1 className="text-xl sm:text-2xl text-neutral-900">Agents</h1>
                <button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="w-full sm:w-auto bg-neutral-900 text-white px-4 py-2 text-sm hover:bg-neutral-800 "
                >
                  New Agent
                </button>
              </div>

              <div className="border border-neutral-200 bg-white  overflow-x-auto">
                <div className="hidden sm:grid grid-cols-5 gap-4 p-4 border-b border-neutral-200 text-sm text-neutral-500">
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
                    <div className="col-span-2 text-neutral-900 font-medium">
                      <span className="sm:hidden text-neutral-500">Name: </span>
                      {agent.name}
                    </div>
                    <div>
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
                    <div className="text-neutral-600">
                      <span className="sm:hidden text-neutral-500">
                        Created:{" "}
                      </span>
                      {new Date(agent.createdAt).toLocaleDateString()}
                    </div>
                    <div className="text-neutral-600">
                      <span className="sm:hidden text-neutral-500">
                        Updated:{" "}
                      </span>
                      {new Date(agent.updatedAt).toLocaleDateString()}
                    </div>
                  </div>
                ))}

                {agents.length === 0 && (
                  <div className="p-8 text-center text-neutral-500">
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
