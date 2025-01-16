import React, { useState, memo } from "react";
import { Plus, X, Loader2, Trash2, Globe, Key } from "lucide-react";
import { AppLayout } from "@/components/_shared/app-layout";
import { useAssistants } from "@/providers/assistants-provider";
import { API_BASE_URL } from "@/config";

const FunctionModalForm = memo(
  ({
    func,
    onSubmit,
    onClose,
    onDelete,
    isSubmitting,
    error,
    isNewFunction,
  }) => {
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [formData, setFormData] = useState({
      name: func?.name || "",
      endpoint: func?.endpoint || "",
      method: func?.method || "GET",
      authType: func?.authType || "bearer",
      parameters: func?.parameters || {},
    });

    const [newParamKey, setNewParamKey] = useState("");
    const [newParamType, setNewParamType] = useState("string");

    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit(formData);
    };

    const addParameter = () => {
      if (newParamKey.trim()) {
        setFormData((prev) => ({
          ...prev,
          parameters: {
            ...prev.parameters,
            [newParamKey]: newParamType,
          },
        }));
        setNewParamKey("");
        setNewParamType("string");
      }
    };

    const removeParameter = (key) => {
      const newParams = { ...formData.parameters };
      delete newParams[key];
      setFormData((prev) => ({
        ...prev,
        parameters: newParams,
      }));
    };

    return (
      <form className="p-6" onSubmit={handleSubmit}>
        {error && (
          <div className="mb-4 bg-red-50 border border-neutral-100 text-red-600 p-3 text-sm">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm text-neutral-700">
              Function Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              className="w-full h-10 border px-3 text-sm focus:ring-1 border-neutral-200 focus:ring-neutral-400"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm text-neutral-700">
              Endpoint URL
            </label>
            <input
              type="url"
              value={formData.endpoint}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, endpoint: e.target.value }))
              }
              className="w-full h-10 border px-3 text-sm focus:ring-1 border-neutral-200 focus:ring-neutral-400"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm text-neutral-700">Method</label>
              <select
                value={formData.method}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, method: e.target.value }))
                }
                className="w-full h-10 border px-3 text-sm focus:ring-1 border-neutral-200 focus:ring-neutral-400"
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="DELETE">DELETE</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm text-neutral-700">
                Auth Type
              </label>
              <select
                value={formData.authType}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, authType: e.target.value }))
                }
                className="w-full h-10 border px-3 text-sm focus:ring-1 border-neutral-200 focus:ring-neutral-400"
              >
                <option value="bearer">Bearer Token</option>
                <option value="basic">Basic Auth</option>
                <option value="none">No Auth</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm text-neutral-700">Parameters</label>
            <div className="border border-neutral-200 p-4 space-y-4">
              {Object.entries(formData.parameters).map(([key, type]) => (
                <div key={key} className="flex items-center gap-2">
                  <span className="text-sm flex-1">
                    {key}: {type}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeParameter(key)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newParamKey}
                  onChange={(e) => setNewParamKey(e.target.value)}
                  placeholder="Parameter name"
                  className="flex-1 h-10 border px-3 text-sm focus:ring-1 border-neutral-200 focus:ring-neutral-400"
                />
                <select
                  value={newParamType}
                  onChange={(e) => setNewParamType(e.target.value)}
                  className="h-10 border px-3 text-sm focus:ring-1 border-neutral-200 focus:ring-neutral-400"
                >
                  <option value="string">String</option>
                  <option value="number">Number</option>
                  <option value="boolean">Boolean</option>
                </select>
                <button
                  type="button"
                  onClick={addParameter}
                  className="h-10 px-4 bg-neutral-900 text-white"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {!isNewFunction && !showDeleteConfirm && (
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(true)}
                className="text-red-500 hover:text-red-600 transition-colors flex items-center gap-2 text-sm"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            {showDeleteConfirm ? (
              <>
                <p className="text-sm text-neutral-600 mr-2">Are you sure?</p>
                <button
                  type="button"
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 text-sm text-neutral-600 hover:text-neutral-900"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(func)}
                  className="px-4 py-2 bg-red-500 text-sm text-white hover:bg-red-600"
                >
                  Delete
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm text-neutral-600 hover:text-neutral-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-neutral-900 text-sm text-white hover:bg-neutral-800 disabled:opacity-80 flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : isNewFunction ? (
                    "Create Function"
                  ) : (
                    "Update Function"
                  )}
                </button>
              </>
            )}
          </div>
        </div>
      </form>
    );
  }
);

const FunctionModal = memo(
  ({
    isOpen,
    onClose,
    func,
    onSubmit,
    onDelete,
    isSubmitting,
    error,
    isNewFunction,
  }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="bg-white max-w-2xl w-full">
          <div className="border-b border-neutral-100">
            <div className="flex items-center justify-between px-6 py-3 bg-neutral-900">
              <h2 className="text-lg text-neutral-200">
                {isNewFunction ? "Add New Function" : "Edit Function"}
              </h2>
              <button
                onClick={onClose}
                className="text-neutral-200 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          <FunctionModalForm
            func={func}
            onSubmit={onSubmit}
            onClose={onClose}
            onDelete={onDelete}
            isSubmitting={isSubmitting}
            error={error}
            isNewFunction={isNewFunction}
          />
        </div>
      </div>
    );
  }
);
const Functions = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedFunction, setSelectedFunction] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const { currentAssistant, getAssistant } = useAssistants();

  const handleCreateFunction = async (data) => {
    try {
      setIsSubmitting(true);
      const assistantId = localStorage.getItem("lm_assistant_id");
      const authToken = localStorage.getItem("lm_auth_token");

      const response = await fetch(`${API_BASE_URL}/function/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ ...data, assistantId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create function");
      }

      await getAssistant();
      setIsCreateModalOpen(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteFunction = async (func) => {
    try {
      setIsSubmitting(true);
      const authToken = localStorage.getItem("lm_auth_token");

      const response = await fetch(
        `${API_BASE_URL}/function/delete?functionId=${func.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete function");
      }

      await getAssistant();
      setIsEditModalOpen(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AppLayout>
      <div className="min-h-[75vh] p-6 font-light">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-light text-neutral-800">
              API Functions
            </h1>
            <button
              onClick={() => {
                setIsCreateModalOpen(true);
                setError(null);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-neutral-900 text-white hover:bg-neutral-800 transition-colors text-sm"
            >
              <Plus className="h-4 w-4" />
              New Function
            </button>
          </div>

          <div className="space-y-4">
            {currentAssistant?.functions?.map((func) => (
              <div
                key={func.id}
                onClick={() => {
                  setSelectedFunction(func);
                  setIsEditModalOpen(true);
                  setError(null);
                }}
                className="bg-white border border-neutral-200 hover:border-neutral-300 transition-colors cursor-pointer group"
              >
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <h3 className="font-medium text-neutral-900">
                        {func.name}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-neutral-600">
                        <Globe className="h-4 w-4" />
                        <span className="font-mono">{func.endpoint}</span>
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 text-xs rounded-full ${
                        func.method === "GET"
                          ? "bg-green-100 text-green-800"
                          : func.method === "POST"
                          ? "bg-blue-100 text-blue-800"
                          : func.method === "PUT"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {func.method}
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 text-sm text-neutral-500">
                      <Key className="h-4 w-4" />
                      <span>Auth: {func.authType}</span>
                    </div>

                    <div className="text-sm text-neutral-500">
                      <span className="block mb-1">Parameters:</span>
                      <div className="flex flex-wrap gap-2">
                        {Object.entries(func.parameters).map(([key, type]) => (
                          <span
                            key={key}
                            className="px-2 py-0.5 bg-neutral-100 text-neutral-600 rounded-full text-xs"
                          >
                            {key}: {type}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-4 py-3 bg-neutral-50 border-t border-neutral-100 font-mono text-sm">
                  <code className="text-neutral-600">
                    {`${func.method.toLowerCase()}('${func.endpoint}'${
                      Object.keys(func.parameters).length
                        ? `, { ${Object.keys(func.parameters).join(", ")} }`
                        : ""
                    })`}
                  </code>
                </div>
              </div>
            ))}

            {(!currentAssistant?.functions ||
              currentAssistant.functions.length === 0) && (
              <div className="text-center py-12 bg-white border border-dashed border-neutral-200">
                <div className="mx-auto w-24 h-24 bg-neutral-50 rounded-full flex items-center justify-center mb-4">
                  <Globe className="h-8 w-8 text-neutral-400" />
                </div>
                <h3 className="text-neutral-900 font-medium mb-2">
                  No functions yet
                </h3>
                <p className="text-neutral-600 text-sm max-w-md mx-auto">
                  Add your first API function to enable your assistant to
                  interact with external services.
                </p>
                <button
                  onClick={() => {
                    setIsCreateModalOpen(true);
                    setError(null);
                  }}
                  className="mt-4 px-4 py-2 bg-neutral-900 text-white hover:bg-neutral-800 transition-colors text-sm inline-flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add Function
                </button>
              </div>
            )}
          </div>
        </div>

        <FunctionModal
          isOpen={isCreateModalOpen}
          onClose={() => {
            setIsCreateModalOpen(false);
            setError(null);
          }}
          onSubmit={handleCreateFunction}
          isSubmitting={isSubmitting}
          error={error}
          isNewFunction={true}
        />

        <FunctionModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedFunction(null);
            setError(null);
          }}
          func={selectedFunction}
          onSubmit={handleCreateFunction}
          onDelete={handleDeleteFunction}
          isSubmitting={isSubmitting}
          error={error}
          isNewFunction={false}
        />
      </div>
    </AppLayout>
  );
};

export default Functions;
