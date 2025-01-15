import React, { useState, memo } from "react";
import { Plus, X, Loader2, Trash2 } from "lucide-react";
import { AppLayout } from "@/components/_shared/app-layout";
import { useAssistants } from "@/providers/assistants-provider";
import { API_BASE_URL } from "@/config";

// Separate modal form component
const InstructionModalForm = memo(
  ({
    instruction,
    onSubmit,
    onClose,
    onDelete,
    isSubmitting,
    error,
    isNewInstruction,
  }) => {
    const [formData, setFormData] = useState({
      name: instruction.name,
      content: instruction.content,
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit({ ...instruction, ...formData });
    };

    return (
      <form className="p-6" onSubmit={handleSubmit}>
        {error && (
          <div className="mb-4 bg-red-50 border border-neutral-100 text-red-600 p-3 text-sm">
            {error}
          </div>
        )}

        <div className="space-y-2">
          <label className="block text-sm text-neutral-700">
            Instruction Name
          </label>
          <div className="space-y-1">
            <input
              type="text"
              value={formData.name}
              maxLength={24}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="Enter instruction name"
              className="w-full h-10 border px-3 text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-1 border-neutral-200 focus:ring-neutral-400 focus:border-transparent"
              required
            />
            <p className="text-xs text-neutral-500">
              {formData.name.length}/24 characters
            </p>
          </div>
        </div>

        <div className="space-y-2 mt-6">
          <label className="block text-sm text-neutral-700">
            Instruction Content
          </label>
          <div className="space-y-1">
            <textarea
              value={formData.content}
              maxLength={2000}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, content: e.target.value }))
              }
              className="w-full border border-neutral-200 px-3 py-2 h-64 text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-400 focus:border-transparent"
              placeholder="Enter instruction content"
              required
            />
            <p className="text-xs text-neutral-500">
              {formData.content.length}/2000 characters
            </p>
          </div>
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
            disabled={isSubmitting || !formData.name || !formData.content}
            className="px-4 py-2 bg-neutral-900 text-sm text-white hover:bg-neutral-800 disabled:opacity-80 disabled:cursor-not-allowed flex items-center justify-center min-w-[100px]"
          >
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : isNewInstruction ? (
              "Create Instruction"
            ) : (
              "Update Instruction"
            )}
          </button>
        </div>
      </form>
    );
  }
);

const InstructionModal = memo(
  ({
    isOpen,
    onClose,
    instruction,
    onSubmit,
    title,
    onDelete,
    isSubmitting,
    error,
    isNewInstruction,
  }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="bg-white max-w-2xl w-full">
          <div className="border-b border-neutral-100">
            <div className="flex items-center justify-between px-6 py-3 bg-neutral-900">
              <h2 className="text-lg text-neutral-200">{title}</h2>
              <div className="flex items-center gap-3">
                {!isNewInstruction && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (
                        window.confirm(
                          "Are you sure you want to delete this instruction?"
                        )
                      ) {
                        onDelete(instruction);
                        onClose();
                      }
                    }}
                    className="text-red-400 hover:text-red-300 transition-colors"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="text-neutral-200 hover:text-white transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          <InstructionModalForm
            instruction={instruction}
            onSubmit={onSubmit}
            onClose={onClose}
            onDelete={onDelete}
            isSubmitting={isSubmitting}
            error={error}
            isNewInstruction={isNewInstruction}
          />
        </div>
      </div>
    );
  }
);

const InstructionManagement = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newInstruction, setNewInstruction] = useState({
    name: "",
    content: "",
  });
  const [editingInstruction, setEditingInstruction] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const { currentAssistant, getAssistant } = useAssistants();

  const handleApiCall = async (endpoint, data) => {
    const lm_auth_token = localStorage.getItem("lm_auth_token");
    const assistantId = localStorage.getItem("lm_assistant_id");

    const response = await fetch(`${API_BASE_URL}/instruction/${endpoint}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${lm_auth_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ assistantId, ...data }),
    });

    if (!response.ok) {
      throw new Error(`Failed to ${endpoint} instruction`);
    }

    await getAssistant();
  };

  const createInstruction = async (data) => {
    try {
      setIsSubmitting(true);
      await handleApiCall("create", data);
      setIsCreateModalOpen(false);
      setNewInstruction({ name: "", content: "" });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateInstruction = async (data) => {
    try {
      setIsSubmitting(true);
      await handleApiCall("update", data);
      setIsEditModalOpen(false);
      setEditingInstruction(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteInstruction = async (instruction) => {
    try {
      setIsSubmitting(true);
      await handleApiCall("update", { ...instruction, isActive: false });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AppLayout>
      <div className="min-h-[75vh] font-light">
        <div className="px-2 sm:px-6 py-2 sm:py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="border border-dashed border-neutral-200 bg-white flex flex-col items-center justify-center h-48 gap-2"
            >
              <div className="size-10 border border-dashed border-neutral-200 flex items-center justify-center">
                <Plus className="size-5 text-neutral-700" />
              </div>
              <span className="text-neutral-600 font-light text-sm">
                Add new instruction
              </span>
            </button>

            {currentAssistant?.instructions?.map((instruction) => (
              <div
                key={instruction.id}
                onClick={() => {
                  setEditingInstruction(instruction);
                  setIsEditModalOpen(true);
                }}
                className="bg-white border border-neutral-100 h-48 hover:border-neutral-300 cursor-pointer transition-colors"
              >
                <div className="p-2.5 flex flex-col h-full">
                  <h3 className="font-light text-neutral-900 truncate mb-2 text-sm">
                    {instruction.name}
                  </h3>
                  <div className="flex-1 overflow-hidden">
                    <p className="text-xs text-neutral-600 font-light">
                      {instruction.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <InstructionModal
            isOpen={isCreateModalOpen}
            onClose={() => setIsCreateModalOpen(false)}
            instruction={newInstruction}
            onSubmit={createInstruction}
            onDelete={deleteInstruction}
            title="Add New Instruction"
            isSubmitting={isSubmitting}
            error={error}
            isNewInstruction={true}
          />

          <InstructionModal
            isOpen={isEditModalOpen}
            onClose={() => {
              setIsEditModalOpen(false);
              setEditingInstruction(null);
            }}
            instruction={editingInstruction || { name: "", content: "" }}
            onSubmit={updateInstruction}
            onDelete={deleteInstruction}
            title="Edit Instruction"
            isSubmitting={isSubmitting}
            error={error}
            isNewInstruction={false}
          />
        </div>
      </div>
    </AppLayout>
  );
};

export default InstructionManagement;
