import { createContext, useContext, useState, useEffect } from "react";
import { API_BASE_URL } from "@/config";

const AssistantsContext = createContext({});

export const AssistantsProvider = ({ children }) => {
  const [assistants, setAssistants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [currentAssistant, setCurrentAssistant] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const fetchAllAssistants = async () => {
    const authToken = localStorage.getItem("lm_auth_token");
    try {
      const response = await fetch(`${API_BASE_URL}/assistant/list`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch assistants");
      }

      const data = await response.json();
      setAssistants(data.data.assistants);
      return data.data.assistants;
    } catch (err) {
      throw new Error(err.message || "Failed to fetch assistants");
    }
  };

  const createAssistant = async (formData) => {
    const authToken = localStorage.getItem("lm_auth_token");
    try {
      const response = await fetch(`${API_BASE_URL}/assistant/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create assistant");
      }

      const data = await response.json();
      await fetchAllAssistants();
      return data;
    } catch (err) {
      throw new Error(err.message || "Failed to create assistant");
    }
  };

  const getAssistant = async () => {
    const authToken = localStorage.getItem("lm_auth_token");
    const assistantId = localStorage.getItem("lm_assistant_id");

    if (!authToken || !assistantId) {
      throw new Error("Authentication token or Assistant ID not found");
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}/assistant/get?assistantId=${assistantId}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch assistant");
      }

      const responseData = await response.json();
      if (responseData.success) {
        setCurrentAssistant(responseData.data.assistant);
        return responseData.data.assistant;
      } else {
        throw new Error(responseData.message || "Failed to fetch assistant");
      }
    } catch (err) {
      throw new Error(err.message || "Failed to fetch assistant");
    }
  };

  useEffect(() => {
    const initializeData = async () => {
      const authToken = localStorage.getItem("lm_auth_token");
      const assistantId = localStorage.getItem("lm_assistant_id");

      if (!authToken || !assistantId) {
        setError("Authentication required");
        setIsLoading(false);
        return;
      }

      try {
        await Promise.all([fetchAllAssistants(), getAssistant()]);
      } catch (err) {
        setError(err.message || "Failed to initialize");
      } finally {
        setIsLoading(false);
        setIsInitialized(true);
      }
    };

    initializeData();
  }, []);

  const contextValue = {
    assistants,
    isLoading,
    error,
    isCreateModalOpen,
    setIsCreateModalOpen,
    fetchAllAssistants,
    createAssistant,
    currentAssistant,
    getAssistant,
    isInitialized,
  };

  return (
    <AssistantsContext.Provider value={contextValue}>
      {children}
    </AssistantsContext.Provider>
  );
};

export const useAssistants = () => useContext(AssistantsContext);

export default AssistantsProvider;
