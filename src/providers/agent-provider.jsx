import { createContext, useContext, useState, useEffect } from "react";
import { useAuthentication } from "./authentication-provider";
import { lmScaleAPI } from "@/api/instance";

const AgentsContext = createContext({});

export const AgentsProvider = ({ children }) => {
  const [agents, setAgents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { authToken } = useAuthentication();

  const fetchAgents = async () => {
    try {
      const response = await lmScaleAPI.get("/user/agents", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setAgents(response.data.data.agents);
      setIsLoading(false);
    } catch (err) {
      setError(err.message || "Failed to fetch agents");
      setIsLoading(false);
    }
  };

  const createAgent = async (formData) => {
    try {
      await lmScaleAPI.post("/agent/create", formData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      // Refresh the agents list after successful creation
      await fetchAgents();
      return true;
    } catch (err) {
      throw new Error(err.response?.data?.message || "Failed to create agent");
    }
  };

  useEffect(() => {
    if (authToken) {
      fetchAgents();
    }
  }, [authToken]);

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
