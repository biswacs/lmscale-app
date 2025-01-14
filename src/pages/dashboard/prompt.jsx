import React, { useEffect, useState } from "react";
import { AppLayout } from "@/components/_shared/app-layout";
import { useAssistants } from "@/providers/assistants-provider";
import { API_BASE_URL } from "@/config";

const PromptDisplay = () => {
  const [error, setError] = useState("");
  const [updateStatus, setUpdateStatus] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [prompt, setPrompt] = useState("");
  const { currentAssistant } = useAssistants();

  useEffect(() => {
    if (currentAssistant?.prompt) {
      setPrompt(currentAssistant.prompt);
    }
  }, [currentAssistant]);

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

      const response = await fetch(`${API_BASE_URL}/assistant/update/prompt`, {
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

      if (!response.ok) {
        throw new Error(data.message || "Failed to update prompt");
      }

      if (data.success) {
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
    <AppLayout>
      <div className="min-h-[75vh] font-light">
        <div className="px-2 sm:px-6 py-2 sm:py-4">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 sm:gap-0 mb-4 sm:mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-light text-neutral-800">
                {currentAssistant?.name || ""}
              </h2>
            </div>
            <button
              onClick={handleUpdate}
              disabled={isUpdating}
              className="w-full sm:w-auto px-4 py-1.5 bg-neutral-800 text-white hover:bg-neutral-900 flex items-center justify-center gap-2 min-w-[120px]"
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

          {error ? (
            <div className="h-64 sm:h-96 flex items-center justify-center">
              <div className="bg-red-50 text-red-500 p-4 text-center max-w-lg mx-2 sm:mx-0">
                {error}
              </div>
            </div>
          ) : (
            <div>
              {updateStatus === "Updated successfully!" && (
                <div className="bg-green-50 text-green-600 p-3 text-center mb-4 mx-2 sm:mx-0">
                  {updateStatus}
                </div>
              )}
              <div className="h-[calc(100vh-280px)] sm:h-[60vh]">
                <textarea
                  className="w-full h-full p-2 text-sm focus:outline-none focus:ring-0 text-neutral-800 resize-none bg-white border border-neutral-200"
                  value={prompt}
                  onChange={handlePromptChange}
                  placeholder="Enter your prompt here..."
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default PromptDisplay;
