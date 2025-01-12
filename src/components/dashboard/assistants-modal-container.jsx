import React, { useState, useEffect } from "react";
import { X, Plus, Calendar, Search, Loader2 } from "lucide-react";
import { useAssistants } from "@/providers/assistants-provider";

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

export function SelectAssistantModal({ isOpen, onClose }) {
  const { assistants, currentAssistant, createAssistant } = useAssistants();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredAssistants, setFilteredAssistants] = useState(assistants);
  const [isCreating, setIsCreating] = useState(false);
  const [createError, setCreateError] = useState("");
  const [newAssistantName, setNewAssistantName] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [inputError, setInputError] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setSearchTerm("");
      setShowCreateForm(false);
      setNewAssistantName("");
      setCreateError("");
      setInputError("");
    }
  }, [isOpen]);

  useEffect(() => {
    const filtered = assistants.filter((assistant) =>
      assistant.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredAssistants(filtered);
  }, [searchTerm, assistants]);

  const handleAssistantSelect = async (assistant) => {
    localStorage.setItem("lm_assistant_id", assistant.id);
    handleClose();
    window.location.reload();
  };

  const handleClose = () => {
    setSearchTerm("");
    setShowCreateForm(false);
    setNewAssistantName("");
    setCreateError("");
    setInputError("");
    onClose();
  };

  const handleInputChange = (e) => {
    const value = e.target.value.replace(/\s/g, "");
    if (value.length > 24) {
      setInputError("Name cannot exceed 24 characters");
    } else {
      setInputError("");
    }
    setNewAssistantName(value);
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    const trimmedName = newAssistantName.trimEnd();

    if (trimmedName.length === 0) {
      setInputError("Name cannot be empty");
      return;
    }

    if (trimmedName.length > 24) {
      setInputError("Name cannot exceed 24 characters");
      return;
    }

    setIsCreating(true);
    setCreateError("");
    setInputError("");

    try {
      const response = await createAssistant({ name: trimmedName });
      if (response?.data?.assistant?.id) {
        localStorage.setItem("lm_assistant_id", response.data.assistant.id);
        handleClose();
        window.location.reload();
      }
    } catch (err) {
      setCreateError(err.message || "Failed to create assistant");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="flex flex-col h-[32rem] font-light">
        <div className="flex-none border-b border-neutral-100">
          <div className="flex items-center justify-between px-3 py-2 bg-neutral-900">
            <h2 className="text-lg text-neutral-200">
              {showCreateForm ? "Create New Assistant" : "Select Assistant"}
            </h2>
            <button
              onClick={handleClose}
              className="text-neutral-200 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 flex flex-col min-h-0">
          {!showCreateForm ? (
            <>
              <div className="flex-none px-3 py-2 border-b border-neutral-200">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search assistants..."
                    className="w-full pl-10 pr-4 py-2 border border-neutral-200 
                             focus:outline-none focus:ring-1 focus:ring-neutral-400
                             text-sm placeholder:text-neutral-400"
                  />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto px-3 py-2">
                <div className="space-y-4">
                  {filteredAssistants.map((assistant) => (
                    <button
                      key={assistant.id}
                      onClick={() => handleAssistantSelect(assistant)}
                      className="w-full px-3 py-2 border border-neutral-100 hover:border-neutral-200 
                              hover:shadow-sm transition-all duration-200 flex items-center 
                              justify-between text-left group"
                    >
                      <div className="flex items-center justify-between w-full">
                        <div>
                          <h3 className="text-neutral-900">{assistant.name}</h3>
                          <div className="text-sm text-neutral-600 flex items-center gap-2 mt-2">
                            <Calendar className="h-4 w-4" />
                            {new Date(assistant.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`flex items-center gap-1.5 text-sm ${
                              assistant.isActive
                                ? "text-green-500"
                                : "text-yellow-500"
                            }`}
                          >
                            <span
                              className={`size-2 rounded-full ${
                                assistant.isActive
                                  ? "bg-green-500"
                                  : "bg-yellow-500"
                              }`}
                            />
                          </span>
                          {assistant.id === currentAssistant?.id && (
                            <span className="text-neutral-600 text-sm">
                              Current
                            </span>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex-none px-3 py-2 border-t border-neutral-100">
                <button
                  onClick={() => setShowCreateForm(true)}
                  className="w-full px-3 py-2 border border-dashed border-neutral-200 
                          hover:border-neutral-300 hover:shadow-sm transition-all 
                          duration-200 flex items-center justify-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Create New Assistant</span>
                </button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col">
              <div className="flex-1 px-3 py-2">
                <form onSubmit={handleCreateSubmit}>
                  {createError && (
                    <div className="mb-4 bg-red-50 border border-neutral-100 text-red-600 p-3 text-sm">
                      {createError}
                    </div>
                  )}

                  <div className="space-y-2">
                    <label className="block text-sm text-neutral-700">
                      Assistant Name
                    </label>
                    <div className="space-y-1">
                      <input
                        type="text"
                        value={newAssistantName}
                        onChange={handleInputChange}
                        maxLength={24}
                        placeholder="Enter assistant name"
                        className={`w-full h-10 border px-3 text-sm 
                                placeholder:text-neutral-400 focus:outline-none focus:ring-1 
                                ${
                                  inputError
                                    ? "border-red-500 focus:ring-red-500"
                                    : "border-neutral-200 focus:ring-neutral-400"
                                }
                                focus:border-transparent`}
                        required
                      />
                      {inputError && (
                        <p className="text-sm text-red-500">{inputError}</p>
                      )}
                      <p className="text-xs text-neutral-500">
                        {newAssistantName.length}/24 characters
                      </p>
                    </div>
                  </div>
                </form>
              </div>

              <div className="flex-none p-6 border-t border-neutral-200">
                <div className="flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowCreateForm(false)}
                    className="px-4 py-2 text-sm bg-neutral-900 text-white"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreateSubmit}
                    disabled={
                      isCreating || inputError || !newAssistantName.trim()
                    }
                    className="px-4 py-2 bg-neutral-900 text-sm text-white 
                             hover:bg-neutral-800 disabled:cursor-not-allowed 
                             flex items-center justify-center min-w-[100px]"
                  >
                    {isCreating ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      "Create Assistant"
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
