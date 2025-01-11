import React, { useState, useEffect, useCallback } from "react";
import { MoreVertical, Plus, X } from "lucide-react";
import { useRouter } from "next/router";
import { QubitLayout } from "@/components/_shared/qubit-layout";

const InstructionManagement = () => {
  const [instructions, setInstructions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newInstruction, setNewInstruction] = useState({
    name: "",
    content: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const qubitId = router.query.slug;

  const fetchInstructions = useCallback(async () => {
    try {
      const lm_auth_token = localStorage.getItem("lm_auth_token");

      if (!lm_auth_token) {
        throw new Error("Authentication token not found. Please login again.");
      }

      if (!qubitId) {
        throw new Error("No qubitId provided");
      }

      const response = await fetch(
        `https://api.lmscale.tech/v1/instruction/list?qubitId=${qubitId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${lm_auth_token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch instructions: ${response.statusText}`);
      }

      const data = await response.json();
      setInstructions(data.data.instructions);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }, [qubitId]);

  const createInstruction = async () => {
    try {
      setIsSubmitting(true);
      const lm_auth_token = localStorage.getItem("lm_auth_token");

      const response = await fetch(
        "https://api.lmscale.tech/v1/instruction/create",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${lm_auth_token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            qubitId,
            name: newInstruction.name,
            content: newInstruction.content,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create instruction");
      }

      await fetchInstructions();
      setIsModalOpen(false);
      setNewInstruction({ name: "", content: "" });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (router.isReady && qubitId) {
      fetchInstructions();
    }
  }, [router.isReady, qubitId, fetchInstructions]);

  if (!router.isReady) {
    return (
      <QubitLayout>
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-600">Initializing...</div>
        </div>
      </QubitLayout>
    );
  }

  if (router.isReady && !qubitId) {
    return (
      <QubitLayout>
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded m-4">
          No qubit ID provided. Please check the URL.
        </div>
      </QubitLayout>
    );
  }

  if (loading) {
    return (
      <QubitLayout>
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-600">Loading instructions...</div>
        </div>
      </QubitLayout>
    );
  }

  if (error) {
    return (
      <QubitLayout>
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded m-4">
          {error}
        </div>
      </QubitLayout>
    );
  }

  return (
    <QubitLayout>
      <div className="p-6 max-w-4xl mx-auto">
        <div className="space-y-4">
          {instructions && instructions.length > 0 ? (
            instructions.map((instruction) => (
              <div
                key={instruction.id}
                className="bg-white rounded-lg border border-gray-200"
              >
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium text-sm text-gray-900">
                      {instruction.name}
                    </div>
                    <button className="p-1 hover:bg-gray-100 rounded-full">
                      <MoreVertical className="h-5 w-5 text-gray-500" />
                    </button>
                  </div>
                  <div className="text-sm text-gray-600 whitespace-pre-wrap">
                    {instruction.content}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 py-8">
              No instructions found
            </div>
          )}

          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full p-4 border border-gray-200 rounded-lg bg-white
                       flex items-center justify-center gap-2 text-gray-600 
                       hover:bg-gray-50 transition-colors duration-200"
          >
            <Plus className="h-5 w-5" />
            <span>Add new instruction</span>
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">Add New Instruction</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={newInstruction.name}
                  onChange={(e) =>
                    setNewInstruction((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  className="w-full border rounded-md px-3 py-2"
                  placeholder="Instruction name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Content
                </label>
                <textarea
                  value={newInstruction.content}
                  onChange={(e) =>
                    setNewInstruction((prev) => ({
                      ...prev,
                      content: e.target.value,
                    }))
                  }
                  className="w-full border rounded-md px-3 py-2 h-32"
                  placeholder="Enter instruction content"
                />
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={createInstruction}
                  disabled={
                    isSubmitting ||
                    !newInstruction.name ||
                    !newInstruction.content
                  }
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 
                           disabled:bg-blue-300 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Creating..." : "Create"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </QubitLayout>
  );
};

export default InstructionManagement;
