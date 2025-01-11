import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { X, Plus, Calendar, Loader2 } from "lucide-react";
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

function CreateAssistantModal({ isOpen, onClose }) {
  const { createAssistant } = useAssistants();
  const router = useRouter();
  const [formData, setFormData] = useState({ name: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [inputError, setInputError] = useState("");

  const handleClose = () => {
    setFormData({ name: "" });
    setError(null);
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
    setFormData({ name: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedName = formData.name.trimEnd();

    if (trimmedName.length === 0) {
      setInputError("Name cannot be empty");
      return;
    }

    if (trimmedName.length > 24) {
      setInputError("Name cannot exceed 24 characters");
      return;
    }

    setIsLoading(true);
    setError(null);
    setInputError("");

    try {
      const result = await createAssistant({ name: trimmedName });
      if (result?.data?.assistant?.id) {
        handleClose();
        router.push(`/assistant/${result.data.assistant.id}`);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="border-b border-neutral-100">
        <div className="flex items-center justify-between px-6 py-3 bg-neutral-900">
          <h2 className="text-lg text-neutral-200">Create New Assistant</h2>
          <button
            onClick={handleClose}
            className="text-neutral-200 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6">
        {error && (
          <div className="mb-4 bg-red-50 border border-neutral-100 text-red-600 p-3 text-sm">
            {error}
          </div>
        )}

        <div className="space-y-2">
          <label className="block text-sm text-neutral-700">
            Assistant Name
          </label>
          <div className="space-y-1">
            <input
              type="text"
              value={formData.name}
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
            {inputError && <p className="text-sm text-red-500">{inputError}</p>}
            <p className="text-xs text-neutral-500">
              {formData.name.length}/24 characters
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={handleClose}
            className="px-4 py-2 text-sm text-neutral-600 hover:text-neutral-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading || inputError}
            className="px-4 py-2 bg-neutral-900 text-sm text-white 
                     hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed 
                     flex items-center justify-center min-w-[100px]"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Create Assistant"
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
}

function CreateAssistantCard({ onClick }) {
  return (
    <button onClick={onClick} className="block w-full h-full">
      <div className="h-full p-6 border border-dashed border-neutral-200 bg-white hover:border-neutral-300 hover:shadow-sm transition-all duration-200  flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <h3 className="text-xl text-neutral-900">Create New Assistant</h3>
          <div className="size-10 border border-dashed border-neutral-200 flex items-center justify-center">
            <Plus className="size-5 text-neutral-700" />
          </div>
        </div>
      </div>
    </button>
  );
}

function AssistantCard({ assistant }) {
  return (
    <Link href={`/assistant/${assistant.id}`} className="block h-full">
      <div className="h-full p-6 border border-dashed border-neutral-200 bg-white hover:border-neutral-300 hover:shadow-sm transition-all duration-200 ">
        <div className="flex items-center justify-between">
          <h3 className="text-xl text-neutral-900">{assistant.name}</h3>
          <span
            className={`flex items-center gap-1.5 text-sm ${
              assistant.isActive ? "text-green-500" : "text-yellow-500"
            }`}
          >
            <span
              className={`size-2 rounded-full ${
                assistant.isActive ? "bg-green-500" : "bg-yellow-500"
              }`}
            />
            {assistant.isActive ? "Active" : "Inactive"}
          </span>
        </div>

        <div className="mt-4">
          <div className="flex items-center gap-2 text-sm text-neutral-600">
            <Calendar className="h-4 w-4" />
            {new Date(assistant.createdAt).toLocaleDateString()}
          </div>
        </div>
      </div>
    </Link>
  );
}

export function AssistantsContainer() {
  const {
    assistants,
    isLoading,
    error,
    isCreateModalOpen,
    setIsCreateModalOpen,
  } = useAssistants();

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
    <div className="flex flex-col h-full font-light">
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <CreateAssistantCard onClick={() => setIsCreateModalOpen(true)} />
            {assistants.map((assistant) => (
              <AssistantCard key={assistant.id} assistant={assistant} />
            ))}
          </div>
        </div>
      </div>

      <CreateAssistantModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
}
