import { createContext, useContext, useState, useEffect } from "react";
import { lmScaleAPI } from "@/api/instance";
import { useSidebar } from "./sidebar-provider";

const InstructionsContext = createContext({});

export const InstructionsProvider = ({ children }) => {
  const { selectedAgent } = useSidebar();
  const [instructions, setInstructions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (selectedAgent?.id) {
      listInstructions(selectedAgent.id).catch((err) => {
        // Log error but don't disrupt the UI
        console.error("Failed to fetch instructions:", err);
        setInstructions([]);
      });
    } else {
      setInstructions([]);
    }
  }, [selectedAgent?.id]);

  const listInstructions = async (agentId) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await lmScaleAPI
        .get("/agent/instruction/list", {
          params: { agentId },
        })
        .catch((err) => {
          // Handle network/API errors
          if (err.response?.status === 404) {
            return { data: { success: true, data: { instructions: [] } } };
          }
          throw err;
        });

      if (!response.data.success) {
        console.error("API Error:", response.data.message);
        // Return empty array instead of throwing
        return [];
      }

      setInstructions(response.data.data.instructions);
      return response.data.data.instructions;
    } catch (err) {
      // Log error but don't disrupt UI
      console.error("Error in listInstructions:", err);
      setInstructions([]);
      // Store error for UI components that want to handle it
      setError(err.response?.data?.message || err.message);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const createInstruction = async (instructionData) => {
    try {
      setIsLoading(true);
      setError(null);

      if (!selectedAgent?.id) {
        throw new Error("No agent selected");
      }

      const response = await lmScaleAPI.post("/agent/instruction/add", {
        agentId: selectedAgent.id,
        ...instructionData,
      });

      if (!response.data.success) {
        throw new Error(
          response.data.message || "Failed to create instruction"
        );
      }

      // Refresh list but handle potential errors silently
      await listInstructions(selectedAgent.id).catch(console.error);
      return true;
    } catch (err) {
      console.error("Error creating instruction:", err);
      setError(err.response?.data?.message || err.message);
      throw err; // Rethrow for UI components that want to handle it
    } finally {
      setIsLoading(false);
    }
  };

  const updateInstruction = async (instructionId, instructionData) => {
    try {
      setIsLoading(true);
      setError(null);

      if (!selectedAgent?.id) {
        throw new Error("No agent selected");
      }

      const response = await lmScaleAPI.put("/agent/instruction/update", {
        agentId: selectedAgent.id,
        instructionId,
        ...instructionData,
      });

      if (!response.data.success) {
        throw new Error(
          response.data.message || "Failed to update instruction"
        );
      }

      // Refresh list but handle potential errors silently
      await listInstructions(selectedAgent.id).catch(console.error);
      return true;
    } catch (err) {
      console.error("Error updating instruction:", err);
      setError(err.response?.data?.message || err.message);
      throw err; // Rethrow for UI components that want to handle it
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    instructions,
    isLoading,
    error,
    createInstruction,
    updateInstruction,
  };

  return (
    <InstructionsContext.Provider value={value}>
      {children}
    </InstructionsContext.Provider>
  );
};

export const useInstructions = () => {
  const context = useContext(InstructionsContext);
  if (!context) {
    throw new Error(
      "useInstructions must be used within an InstructionsProvider"
    );
  }
  return context;
};

export default InstructionsProvider;
