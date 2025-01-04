import { createContext, useContext, useState, useEffect } from "react";
import { useAuthentication } from "./authentication-provider";
import { lmScaleAPI } from "@/api/instance";

const AgentsContext = createContext({});

export const AgentsProvider = ({ children }) => {
  const [agents, setAgents] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const { authToken } = useAuthentication();

  const fetchAgents = async () => {
    try {
      setIsLoading(true);
      const response = await lmScaleAPI.get("/agent/list", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setAgents(response.data.data.agents);
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to fetch agents");
      setAgents([]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAgentDetails = async (agentId) => {
    try {
      setIsLoading(true);
      const response = await lmScaleAPI.get(`/agent/data`, {
        params: { agentId },
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!response.data.success) {
        throw new Error(
          response.data.message || "Failed to fetch agent details"
        );
      }

      setSelectedAgent(response.data.data);
      setError(null);
      return response.data.data;
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to fetch agent details"
      );
      setSelectedAgent(null);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const createAgent = async (formData) => {
    try {
      const response = await lmScaleAPI.post("/agent/create", formData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to create agent");
      }

      await fetchAgents();
      setIsCreateModalOpen(false);
      return true;
    } catch (err) {
      throw new Error(err.response?.data?.message || "Failed to create agent");
    }
  };

  const updateAgent = async (agentId, updateData) => {
    try {
      const response = await lmScaleAPI.put(
        "/agent/update",
        {
          agentId,
          ...updateData,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to update agent");
      }

      await fetchAgents();
      if (selectedAgent?.id === agentId) {
        await fetchAgentDetails(agentId);
      }
      setIsUpdateModalOpen(false);
      return true;
    } catch (err) {
      throw new Error(err.response?.data?.message || "Failed to update agent");
    }
  };

  const updateAgentStatus = async (agentId, isActive) => {
    try {
      const response = await lmScaleAPI.put(
        "/agent/status",
        {
          agentId,
          isActive,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (!response.data.success) {
        throw new Error(
          response.data.message || "Failed to update agent status"
        );
      }

      await fetchAgents();
      if (selectedAgent?.id === agentId) {
        await fetchAgentDetails(agentId);
      }
      return true;
    } catch (err) {
      throw new Error(
        err.response?.data?.message || "Failed to update agent status"
      );
    }
  };

  // Function to add a new instruction to an agent
  const addInstruction = async (agentId, instruction) => {
    try {
      const response = await lmScaleAPI.post(
        "/agent/instruction/add",
        {
          agentId,
          ...instruction,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to add instruction");
      }

      if (selectedAgent?.id === agentId) {
        await fetchAgentDetails(agentId);
      }
      return true;
    } catch (err) {
      throw new Error(
        err.response?.data?.message || "Failed to add instruction"
      );
    }
  };

  // Function to add a new function to an agent
  const addFunction = async (agentId, functionData) => {
    try {
      const response = await lmScaleAPI.post(
        "/agent/function/add",
        {
          agentId,
          ...functionData,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to add function");
      }

      if (selectedAgent?.id === agentId) {
        await fetchAgentDetails(agentId);
      }
      return true;
    } catch (err) {
      throw new Error(err.response?.data?.message || "Failed to add function");
    }
  };

  const updateSystemPrompt = async (agentId, prompt) => {
    try {
      const response = await lmScaleAPI.put(
        "/agent/prompt",
        {
          agentId,
          prompt,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (!response.data.success) {
        throw new Error(
          response.data.message || "Failed to update system prompt"
        );
      }

      if (selectedAgent?.id === agentId) {
        await fetchAgentDetails(agentId);
      }
      return true;
    } catch (err) {
      throw new Error(
        err.response?.data?.message || "Failed to update system prompt"
      );
    }
  };

  useEffect(() => {
    if (authToken) {
      fetchAgents();
    }
  }, [authToken]);

  const contextValue = {
    agents,
    selectedAgent,
    isLoading,
    error,
    isCreateModalOpen,
    isUpdateModalOpen,
    setIsCreateModalOpen,
    setIsUpdateModalOpen,
    fetchAgents,
    fetchAgentDetails,
    createAgent,
    updateAgent,
    updateAgentStatus,
    addInstruction,
    addFunction,
    updateSystemPrompt,
    setSelectedAgent,
  };

  return (
    <AgentsContext.Provider value={contextValue}>
      {children}
    </AgentsContext.Provider>
  );
};

export const useAgents = () => useContext(AgentsContext);

export default AgentsProvider;
