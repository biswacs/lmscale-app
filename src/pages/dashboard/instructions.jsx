import React, { useState, memo } from "react";
import { Plus, X, Loader2, Trash2, BookOpen, FileText } from "lucide-react";
import { AppLayout } from "@/components/_shared/app-layout";
import { useAssistants } from "@/providers/assistants-provider";
import { API_BASE_URL } from "@/config";

const ModalForm = memo(
  ({
    instruction,
    onSubmit,
    onClose,
    onDelete,
    isSubmitting,
    error,
    isNewInstruction,
  }) => {
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [formData, setFormData] = useState({
      name: instruction?.name || "",
      content: instruction?.content || "",
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

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-neutral-700">
              Instruction Name
            </label>
            <input
              type="text"
              value={formData.name}
              maxLength={24}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              className="w-full h-10 border px-3 text-sm focus:ring-1 border-neutral-200 focus:ring-neutral-400"
              required
            />
            <p className="text-xs text-neutral-500 mt-1">
              {formData.name.length}/24 characters
            </p>
          </div>

          <div>
            <label className="block text-sm text-neutral-700">
              Instruction Content
            </label>
            <textarea
              value={formData.content}
              maxLength={2000}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, content: e.target.value }))
              }
              className="w-full border px-3 py-2 h-64 text-sm focus:ring-1 border-neutral-200 focus:ring-neutral-400"
              required
            />
            <p className="text-xs text-neutral-500 mt-1">
              {formData.content.length}/2000 characters
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          {!isNewInstruction && (
            <button
              type="button"
              onClick={() =>
                showDeleteConfirm
                  ? onDelete(instruction)
                  : setShowDeleteConfirm(true)
              }
              className="text-red-500 hover:text-red-600 transition-colors flex items-center gap-2 text-sm"
            >
              <Trash2 className="h-4 w-4" />
              {showDeleteConfirm ? "Confirm Delete" : "Delete"}
            </button>
          )}

          <div className="flex items-center gap-3 ml-auto">
            <button
              type="button"
              onClick={() => {
                setShowDeleteConfirm(false);
                onClose();
              }}
              className="px-4 py-2 text-sm text-neutral-600 hover:text-neutral-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !formData.name || !formData.content}
              className="px-4 py-2 bg-neutral-900 text-sm text-white hover:bg-neutral-800 disabled:opacity-80 flex items-center gap-2"
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
        </div>
      </form>
    );
  }
);
ModalForm.displayName = "ModalForm";

const Modal = memo(({ isOpen, title, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white max-w-2xl w-full">
        <div className="flex items-center justify-between px-6 py-3 bg-neutral-900">
          <h2 className="text-lg text-neutral-200">{title}</h2>
          <button
            onClick={onClose}
            className="text-neutral-200 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
});
Modal.displayName = "Modal";

const Instruction = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingInstruction, setEditingInstruction] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const { currentAssistant, getAssistant } = useAssistants();

  const handleApiCall = async (endpoint, data) => {
    const authToken = localStorage.getItem("lm_auth_token");
    const assistantId = localStorage.getItem("lm_assistant_id");

    const response = await fetch(`${API_BASE_URL}/instruction/${endpoint}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ assistantId, ...data }),
    });

    const result = await response.json();
    if (!response.ok)
      throw new Error(result.message || `Failed to ${endpoint} instruction`);
    await getAssistant();
  };

  const handleCreate = async (data) => {
    try {
      setIsSubmitting(true);
      await handleApiCall("create", data);
      setIsCreateModalOpen(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async (data) => {
    try {
      setIsSubmitting(true);
      await handleApiCall("update", { ...data, instructionId: data.id });
      setIsEditModalOpen(false);
      setEditingInstruction(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (instruction) => {
    try {
      setIsSubmitting(true);
      await handleApiCall("update", {
        instructionId: instruction.id,
        isActive: false,
      });
      setIsEditModalOpen(false);
      await getAssistant();
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
              Instructions
            </h1>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-neutral-900 text-white hover:bg-neutral-800 text-sm"
            >
              <Plus className="h-4 w-4" />
              New Instruction
            </button>
          </div>

          <div className="space-y-4">
            {currentAssistant?.instructions?.map((instruction) => (
              <div
                key={instruction.id}
                onClick={() => {
                  setEditingInstruction(instruction);
                  setIsEditModalOpen(true);
                }}
                className="bg-white border border-neutral-200 hover:border-neutral-300 transition-colors cursor-pointer group"
              >
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-neutral-500" />
                        <h3 className="font-medium text-neutral-900">
                          {instruction.name}
                        </h3>
                      </div>
                      <div className="flex items-start gap-2 text-sm text-neutral-600">
                        <FileText className="h-4 w-4 flex-shrink-0 mt-1" />
                        <p className="line-clamp-2">{instruction.content}</p>
                      </div>
                    </div>
                    <span className="text-xs text-neutral-500">
                      {instruction.content.length} characters
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {(!currentAssistant?.instructions ||
              currentAssistant.instructions.length === 0) && (
              <div className="text-center py-12 bg-white border border-dashed border-neutral-200">
                <BookOpen className="h-8 w-8 text-neutral-400 mx-auto mb-4" />
                <h3 className="text-neutral-900 font-medium mb-2">
                  No instructions yet
                </h3>
                <p className="text-neutral-600 text-sm max-w-md mx-auto mb-4">
                  Add your first instruction to guide your assistant&apos;s
                  behavior and responses.
                </p>
              </div>
            )}
          </div>
        </div>

        <Modal
          isOpen={isCreateModalOpen}
          title="Add New Instruction"
          onClose={() => setIsCreateModalOpen(false)}
        >
          <ModalForm
            instruction={{ name: "", content: "" }}
            onSubmit={handleCreate}
            onClose={() => setIsCreateModalOpen(false)}
            isSubmitting={isSubmitting}
            error={error}
            isNewInstruction={true}
          />
        </Modal>

        <Modal
          isOpen={isEditModalOpen}
          title="Edit Instruction"
          onClose={() => {
            setIsEditModalOpen(false);
            setEditingInstruction(null);
          }}
        >
          <ModalForm
            instruction={editingInstruction}
            onSubmit={handleUpdate}
            onClose={() => {
              setIsEditModalOpen(false);
              setEditingInstruction(null);
            }}
            onDelete={handleDelete}
            isSubmitting={isSubmitting}
            error={error}
            isNewInstruction={false}
          />
        </Modal>
      </div>
    </AppLayout>
  );
};

export default Instruction;
