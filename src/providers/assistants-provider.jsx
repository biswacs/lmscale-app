import { createContext, useContext, useState, useEffect } from "react";
import { API_BASE_URL } from "@/config";
import { useAuthentication } from "./authentication-provider";

const AssistantsContext = createContext({});

export const AssistantsProvider = ({ children }) => {
  const [assistants, setAssistants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [currentAssistant, setCurrentAssistant] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const { isAuthenticated, authToken } = useAuthentication();

  const fetchAllAssistants = async () => {
    if (!authToken) return null;

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
      setError(err.message || "Failed to fetch assistants");
      return null;
    }
  };

  const createAssistant = async (formData) => {
    if (!authToken) throw new Error("Authentication required");

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
    if (!authToken) return null;

    const assistantId = localStorage.getItem("lm_assistant_id");
    if (!assistantId) {
      setError("Assistant ID not found");
      return null;
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
      setError(err.message || "Failed to fetch assistant");
      return null;
    }
  };

  const updateAssistant = async (assistantId, updateData) => {
    if (!authToken) throw new Error("Authentication required");

    try {
      const response = await fetch(
        `${API_BASE_URL}/assistant/update?assistantId=${assistantId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify(updateData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update assistant");
      }

      const data = await response.json();
      await Promise.all([fetchAllAssistants(), getAssistant()]);
      return data;
    } catch (err) {
      throw new Error(err.message || "Failed to update assistant");
    }
  };

  const deleteAssistant = async (assistantId) => {
    if (!authToken) throw new Error("Authentication required");

    try {
      const response = await fetch(
        `${API_BASE_URL}/assistant/delete?assistantId=${assistantId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete assistant");
      }

      await fetchAllAssistants();
      return true;
    } catch (err) {
      throw new Error(err.message || "Failed to delete assistant");
    }
  };

  useEffect(() => {
    const initializeData = async () => {
      if (!isAuthenticated || !authToken) {
        setIsLoading(false);
        setIsInitialized(true);
        return;
      }

      setIsLoading(true);
      setError(null);

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
  }, [isAuthenticated, authToken]);

  useEffect(() => {
    if (!isAuthenticated) {
      setAssistants([]);
      setCurrentAssistant(null);
      setError(null);
    }
  }, [isAuthenticated]);

  const contextValue = {
    assistants,
    isLoading,
    error,
    isCreateModalOpen,
    setIsCreateModalOpen,
    currentAssistant,
    isInitialized,
    fetchAllAssistants,
    createAssistant,
    getAssistant,
    updateAssistant,
    deleteAssistant,
  };

  return (
    <AssistantsContext.Provider value={contextValue}>
      {children}
    </AssistantsContext.Provider>
  );
};

export const useAssistants = () => {
  const context = useContext(AssistantsContext);
  if (!context) {
    throw new Error("useAssistants must be used within an AssistantsProvider");
  }
  return context;
};

export default AssistantsProvider;
