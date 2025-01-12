import React, { useState, useEffect } from "react";
import { Plus, X, Loader2 } from "lucide-react";
import { AssistantLayout } from "@/components/_shared/assistants-layout";
import { useAssistants } from "@/providers/assistants-provider";
import { API_BASE_URL } from "@/config";

const InstructionManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newInstruction, setNewInstruction] = useState({
    name: "",
    content: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const { currentAssistant, getAssistant } = useAssistants();

  useEffect(() => {
    fetchAssistantData();
  }, []);

  const fetchAssistantData = async () => {
    try {
      await getAssistant();
    } catch (err) {
      setError(err.message);
    }
  };

  const createInstruction = async () => {
    try {
      setIsSubmitting(true);
      const lm_auth_token = localStorage.getItem("lm_auth_token");
      const assistantId = localStorage.getItem("lm_assistant_id");

      const response = await fetch(`${API_BASE_URL}/instruction/create`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${lm_auth_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          assistantId,
          name: newInstruction.name,
          content: newInstruction.content,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create instruction");
      }

      await getAssistant(); // Refresh the assistant data after creating instruction
      setIsModalOpen(false);
      setNewInstruction({ name: "", content: "" });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!currentAssistant) {
    return (
      <AssistantLayout>
        <div className="flex justify-center items-center h-64">
          <div className="text-neutral-600">Loading instructions...</div>
        </div>
      </AssistantLayout>
    );
  }

  if (error) {
    return (
      <AssistantLayout>
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded m-4">
          {error}
        </div>
      </AssistantLayout>
    );
  }

  return (
    <AssistantLayout>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="border border-dashed border-neutral-200 bg-white flex flex-col items-center justify-center h-48 gap-2"
          >
            <div className="size-10 border border-dashed border-neutral-200 flex items-center justify-center">
              <Plus className="size-5 text-neutral-700" />
            </div>
            <span className="text-neutral-600 font-light text-sm">
              Add new instruction
            </span>
          </button>

          {currentAssistant.instructions?.map((instruction) => (
            <div
              key={instruction.id}
              className="bg-white border border-neutral-100 h-48"
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

        {isModalOpen && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white max-w-2xl w-full">
              <div className="border-b border-neutral-100">
                <div className="flex items-center justify-between px-6 py-3 bg-neutral-900">
                  <h2 className="text-lg text-neutral-200">
                    Add New Instruction
                  </h2>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="text-neutral-200 hover:text-white transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <form
                className="p-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  createInstruction();
                }}
              >
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
                      value={newInstruction.name}
                      onChange={(e) =>
                        setNewInstruction((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      maxLength={24}
                      placeholder="Enter instruction name"
                      className="w-full h-10 border px-3 text-sm 
                      placeholder:text-neutral-400 focus:outline-none focus:ring-1
                      border-neutral-200 focus:ring-neutral-400
                      focus:border-transparent"
                      required
                    />
                    <p className="text-xs text-neutral-500">
                      {newInstruction.name.length}/24 characters
                    </p>
                  </div>
                </div>

                <div className="space-y-2 mt-6">
                  <label className="block text-sm text-neutral-700">
                    Instruction Content
                  </label>
                  <div className="space-y-1">
                    <textarea
                      value={newInstruction.content}
                      onChange={(e) =>
                        setNewInstruction((prev) => ({
                          ...prev,
                          content: e.target.value,
                        }))
                      }
                      className="w-full border border-neutral-200 px-3 py-2 h-64 text-sm
                      placeholder:text-neutral-400 focus:outline-none focus:ring-1
                      focus:ring-neutral-400 focus:border-transparent"
                      placeholder="Enter instruction content"
                      required
                    />
                    <p className="text-xs text-neutral-500">
                      {newInstruction.content.length}/5400 characters
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-sm text-neutral-600 hover:text-neutral-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={
                      isSubmitting ||
                      !newInstruction.name ||
                      !newInstruction.content
                    }
                    className="px-4 py-2 bg-neutral-900 text-sm text-white 
                    hover:bg-neutral-800 disabled:opacity-80 disabled:cursor-not-allowed 
                    flex items-center justify-center min-w-[100px]"
                  >
                    {isSubmitting ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      "Create Instruction"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AssistantLayout>
  );
};

export default InstructionManagement;
