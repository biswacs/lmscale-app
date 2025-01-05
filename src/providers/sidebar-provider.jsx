import { createContext, useContext, useState, useEffect } from "react";
import { lmScaleAPI } from "@/api/instance";

const SidebarContext = createContext({});

export const SidebarProvider = ({ children }) => {
  // UI States
  const [isAgentModalOpen, setIsAgentModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Data States
  const [agents, setAgents] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Just fetch the agent list
  const fetchAgents = async () => {
    try {
      setIsLoading(true);
      const response = await lmScaleAPI.get("/agent/list");
      const fetchedAgents = response.data.data.agents;
      setAgents(fetchedAgents);

      // Handle agent selection with localStorage persistence
      const storedAgentId = localStorage.getItem("agentId");
      if (storedAgentId) {
        const storedAgent = fetchedAgents.find(
          (agent) => agent.id === storedAgentId
        );
        if (storedAgent) {
          setSelectedAgent(storedAgent);
          return;
        }
      }

      // Default to playground agent if no stored agent
      const playgroundAgent = fetchedAgents.find(
        (agent) => agent.name.toLowerCase() === "playground"
      );
      if (playgroundAgent) {
        setSelectedAgent(playgroundAgent);
        localStorage.setItem("agentId", playgroundAgent.id);
      }
    } catch (error) {
      console.error("Error fetching agents:", error);
      setAgents([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Create new agent
  const createAgent = async (formData) => {
    try {
      const response = await lmScaleAPI.post("/agent/create", formData);
      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to create agent");
      }

      await fetchAgents();
      // Select the newly created agent
      const newAgent = response.data.data;
      setSelectedAgent(newAgent);
      localStorage.setItem("agentId", newAgent.id);

      setIsCreateModalOpen(false);
      return true;
    } catch (err) {
      throw new Error(err.response?.data?.message || "Failed to create agent");
    }
  };

  // Simple agent selection
  const selectAgent = (agent) => {
    setSelectedAgent(agent);
    localStorage.setItem("agentId", agent.id);
    setIsAgentModalOpen(false);
  };

  // Initial fetch
  useEffect(() => {
    fetchAgents();
  }, []);

  const value = {
    // UI States
    isAgentModalOpen,
    setIsAgentModalOpen,
    isCreateModalOpen,
    setIsCreateModalOpen,

    // Data and Actions
    agents,
    selectedAgent,
    isLoading,
    selectAgent,
    createAgent,
    fetchAgents,
  };

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

export default SidebarProvider;
