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

function CreateDeploymentModal({ isOpen, onClose, onCreateSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    prompt: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/deployment/create`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to create deployment");
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
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Deployment">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <div className="space-y-2">
          <label className="text-sm font-medium text-neutral-900">Name</label>
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
          <label className="text-sm font-medium text-neutral-900">
            Description
          </label>
          <input
            type="text"
            value={formData.description}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, description: e.target.value }))
            }
            className="w-full border border-neutral-200 p-2 text-sm focus:outline-none focus:border-neutral-400 "
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-neutral-900">
            Initial Prompt
          </label>
          <textarea
            value={formData.prompt}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, prompt: e.target.value }))
            }
            className="w-full border border-neutral-200 p-2 text-sm focus:outline-none focus:border-neutral-400  min-h-[100px]"
            required
          />
        </div>
        <div className="flex justify-end gap-2 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="bg-neutral-900 text-white px-4 py-2 text-sm font-medium hover:bg-neutral-800 disabled:opacity-50 "
          >
            {isLoading ? (
              <Loader2 className="animate-spin h-4 w-4" />
            ) : (
              "Create Deployment"
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
}

export function DeploymentsContainer() {
  const [deployments, setDeployments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    fetchDeployments();
  }, []);

  const fetchDeployments = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/user/deployments`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch deployments");
      }

      const result = await response.json();
      setDeployments(result.data.deployments);
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
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold text-neutral-900">
                  Deployments
                </h1>
                <button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="bg-neutral-900 text-white px-4 py-2 text-sm font-medium hover:bg-neutral-800 "
                >
                  New Deployment
                </button>
              </div>

              <div className="border border-neutral-200 bg-white ">
                <div className="grid grid-cols-6 gap-4 p-4 border-b border-neutral-200 text-sm font-medium text-neutral-500">
                  <div className="col-span-2">Name</div>
                  <div>Status</div>
                  <div>Description</div>
                  <div>Created</div>
                  <div>Last Updated</div>
                </div>

                {deployments.map((deployment) => (
                  <div
                    key={deployment.id}
                    className="grid grid-cols-6 gap-4 p-4 border-b border-neutral-200 text-sm hover:bg-neutral-50"
                  >
                    <div className="col-span-2 font-medium text-neutral-900">
                      {deployment.name}
                    </div>
                    <div>
                      <span className="inline-flex items-center gap-1.5">
                        <span
                          className={`size-2 rounded-full ${
                            deployment.isActive
                              ? "bg-green-500"
                              : "bg-yellow-500"
                          }`}
                        />
                        {deployment.isActive ? "Active" : "Inactive"}
                      </span>
                    </div>
                    <div
                      className="text-neutral-600 truncate"
                      title={deployment.description}
                    >
                      {deployment.description}
                    </div>
                    <div className="text-neutral-600">
                      {new Date(deployment.createdAt).toLocaleDateString()}
                    </div>
                    <div className="text-neutral-600">
                      {new Date(deployment.updatedAt).toLocaleDateString()}
                    </div>
                  </div>
                ))}

                {deployments.length === 0 && (
                  <div className="p-8 text-center text-neutral-500">
                    No deployments found
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <CreateDeploymentModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateSuccess={fetchDeployments}
      />
    </div>
  );
}
