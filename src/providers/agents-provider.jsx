import { createContext, useContext, useState, useEffect } from "react";
import { API_BASE_URL } from "@/config";

const AgentsContext = createContext({});

export const AgentsProvider = ({ children }) => {
  const [agents, setAgents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const fetchAgents = async () => {
    const authToken = localStorage.getItem("lm_auth_token");
    try {
      const response = await fetch(`${API_BASE_URL}/agent/list`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch agents");
      }

      const data = await response.json();
      setAgents(data.data.agents);
      setIsLoading(false);
    } catch (err) {
      setError(err.message || "Failed to fetch agents");
      setIsLoading(false);
    }
  };

  const createAgent = async (formData) => {
    const authToken = localStorage.getItem("lm_auth_token");
    try {
      const response = await fetch(`${API_BASE_URL}/agent/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create agent");
      }

      await fetchAgents();
      return true;
    } catch (err) {
      throw new Error(err.message || "Failed to create agent");
    }
  };

  useEffect(() => {
    const authToken = localStorage.getItem("lm_auth_token");
    if (authToken) {
      fetchAgents();
    }
  }, []);

  const contextValue = {
    agents,
    isLoading,
    error,
    isCreateModalOpen,
    setIsCreateModalOpen,
    fetchAgents,
    createAgent,
  };

  return (
    <AgentsContext.Provider value={contextValue}>
      {children}
    </AgentsContext.Provider>
  );
};

export const useAgents = () => useContext(AgentsContext);

export default AgentsProvider;
