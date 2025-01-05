import { createContext, useContext, useState, useEffect } from "react";
import { lmScaleAPI } from "@/api/instance";
import { useSidebar } from "./sidebar-provider";

const PromptContext = createContext({});

export const PromptProvider = ({ children }) => {
  const { selectedAgent } = useSidebar();
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPrompt = async (agentId) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await lmScaleAPI.get("/agent/prompt", {
        params: { agentId },
      });

      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to fetch prompt");
      }

      setPrompt(response.data.data.prompt);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      setPrompt("");
    } finally {
      setIsLoading(false);
    }
  };

  const updatePrompt = async (agentId, newPrompt) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await lmScaleAPI.put("/agent/prompt", {
        agentId,
        prompt: newPrompt,
      });

      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to update prompt");
      }

      setPrompt(newPrompt);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch prompt when selected agent changes
  useEffect(() => {
    if (selectedAgent?.id) {
      fetchPrompt(selectedAgent.id);
    } else {
      setPrompt("");
    }
  }, [selectedAgent?.id]);

  const value = {
    prompt,
    isLoading,
    error,
    updatePrompt,
  };

  return (
    <PromptContext.Provider value={value}>{children}</PromptContext.Provider>
  );
};

export const usePrompt = () => {
  const context = useContext(PromptContext);
  if (!context) {
    throw new Error("usePrompt must be used within a PromptProvider");
  }
  return context;
};

export default PromptProvider;
