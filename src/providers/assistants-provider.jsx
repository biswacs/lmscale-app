import { createContext, useContext, useState, useEffect } from "react";
import { API_BASE_URL } from "@/config";

const AssistantsContext = createContext({});

export const AssistantsProvider = ({ children }) => {
  const [assistants, setAssistants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const fetchAssistants = async () => {
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
      setIsLoading(false);
    } catch (err) {
      setError(err.message || "Failed to fetch assistants");
      setIsLoading(false);
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
      await fetchAssistants(); // Refresh the assistants list
      return data; // Return the full response including the assistant ID
    } catch (err) {
      throw new Error(err.message || "Failed to create assistant");
    }
  };

  useEffect(() => {
    const authToken = localStorage.getItem("lm_auth_token");
    if (authToken) {
      fetchAssistants();
    }
  }, []);

  const contextValue = {
    assistants,
    isLoading,
    error,
    isCreateModalOpen,
    setIsCreateModalOpen,
    fetchAssistants,
    createAssistant,
  };

  return (
    <AssistantsContext.Provider value={contextValue}>
      {children}
    </AssistantsContext.Provider>
  );
};

export const useAssistants = () => useContext(AssistantsContext);

export default AssistantsProvider;
