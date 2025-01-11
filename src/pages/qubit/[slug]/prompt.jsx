import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { QubitLayout } from "@/components/_shared/qubit-layout";
import { API_BASE_URL } from "@/config";

const PromptDisplay = () => {
  const [prompt, setPrompt] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [updateStatus, setUpdateStatus] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();
  const qubitId = router.query.slug;

  useEffect(() => {
    fetchPrompt();
  }, [qubitId]);

  const fetchPrompt = async () => {
    if (!qubitId) return;

    const lm_auth_token = localStorage.getItem("lm_auth_token");

    if (!lm_auth_token) {
      setError("Authentication token not found. Please login again.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}/prompt/get?qubitId=${qubitId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${lm_auth_token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch prompt");
      }

      const responseData = await response.json();

      if (responseData.success && responseData.data?.data?.prompt) {
        setPrompt(responseData.data.data.prompt);
        setName(responseData.data.data.name || "");
      } else {
        setPrompt("");
        setError("No prompt available");
      }
    } catch (err) {
      setError("Error fetching prompt. Please try again.");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleUpdate = async () => {
    const lm_auth_token = localStorage.getItem("lm_auth_token");

    if (!lm_auth_token) {
      setError("Authentication token not found. Please login again.");
      return;
    }

    try {
      setIsUpdating(true);
      setUpdateStatus("Updating...");
      const response = await fetch(`${API_BASE_URL}/prompt/update`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${lm_auth_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          qubitId: qubitId,
          prompt: prompt,
        }),
      });

      const data = await response.json();

      if (data.success) {
        await fetchPrompt(); // Fetch the updated prompt
        setUpdateStatus("Updated successfully!");
        setTimeout(() => setUpdateStatus(""), 3000);
      } else {
        throw new Error(data.message || "Failed to update prompt");
      }
    } catch (err) {
      setError("Error updating prompt. Please try again.");
      setUpdateStatus("");
      console.error("Error:", err);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <QubitLayout>
      <div className="h-[75vh] font-light">
        <div className="px-6 py-4">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-light text-neutral-800">{name}</h2>
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
                className="w-full h-[60vh] p-6 text-sm
                          focus:outline-none focus:ring-0
                          text-neutral-800 resize-none bg-white border border-neutral-200"
                value={prompt}
                onChange={handlePromptChange}
                placeholder="Enter your prompt here..."
              />
            </div>
          )}
        </div>
      </div>
    </QubitLayout>
  );
};

export default PromptDisplay;
