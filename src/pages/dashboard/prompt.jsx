import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AssistantLayout } from "@/components/_shared/assistants-layout";
import { useAssistants } from "@/providers/assistants-provider";
import { API_BASE_URL } from "@/config";

const PromptDisplay = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [updateStatus, setUpdateStatus] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [prompt, setPrompt] = useState("");
  const router = useRouter();
  const { currentAssistant, getAssistant } = useAssistants();

  useEffect(() => {
    fetchAssistantData();
  }, []);

  const fetchAssistantData = async () => {
    try {
      const assistant = await getAssistant();
      if (assistant?.prompt) {
        setPrompt(assistant.prompt);
      }
    } catch (err) {
      setError(err.message || "Error fetching assistant data");
    } finally {
      setLoading(false);
    }
  };

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleUpdate = async () => {
    const lm_auth_token = localStorage.getItem("lm_auth_token");
    const assistantId = localStorage.getItem("lm_assistant_id");

    if (!lm_auth_token || !assistantId) {
      setError(
        "Authentication token or Assistant ID not found. Please login again."
      );
      return;
    }

    try {
      setIsUpdating(true);
      setUpdateStatus("Updating...");
      console.log("Making update request with:", {
        assistantId,
        prompt,
      });

      const response = await fetch(`${API_BASE_URL}/prompt/update`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${lm_auth_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          assistantId: assistantId,
          prompt: prompt,
        }),
      });

      const data = await response.json();
      console.log("Update response:", data);

      if (!response.ok) {
        throw new Error(data.message || "Failed to update prompt");
      }

      if (data.success) {
        await fetchAssistantData();
        setUpdateStatus("Updated successfully!");
        setTimeout(() => setUpdateStatus(""), 3000);
      } else {
        throw new Error(data.message || "Failed to update prompt");
      }
    } catch (err) {
      console.error("Update error details:", err);
      setError(err.message || "Error updating prompt. Please try again.");
      setUpdateStatus("");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <AssistantLayout>
      <div className="h-[75vh] font-light">
        <div className="px-6 py-4">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-light text-neutral-800">
                {currentAssistant?.name || ""}
              </h2>
            </div>
            <button
              onClick={handleUpdate}
              disabled={loading || isUpdating}
              className="px-4 py-1.5 bg-neutral-800 text-white hover:bg-neutral-900 flex items-center justify-center gap-2 min-w-[120px]"
            >
              {updateStatus === "Updating..." ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                  <span>Updating</span>
                </>
              ) : (
                "Update Prompt"
              )}
            </button>
          </div>

          {loading ? (
            <div className="h-96 flex justify-center items-center">
              <div className="animate-spin h-8 w-8 border-b-2 border-neutral-800"></div>
            </div>
          ) : error ? (
            <div className="h-96 flex items-center justify-center">
              <div className="bg-red-50 text-red-500 p-4 text-center max-w-lg">
                {error}
              </div>
            </div>
          ) : (
            <div>
              {updateStatus === "Updated successfully!" && (
                <div className="bg-green-50 text-green-600 p-3 text-center mb-4">
                  {updateStatus}
                </div>
              )}
              <textarea
                className="w-full h-[60vh] p-2 text-sm focus:outline-none focus:ring-0 text-neutral-800 resize-none bg-white border border-neutral-200"
                value={prompt}
                onChange={handlePromptChange}
                placeholder="Enter your prompt here..."
              />
            </div>
          )}
        </div>
      </div>
    </AssistantLayout>
  );
};

export default PromptDisplay;
