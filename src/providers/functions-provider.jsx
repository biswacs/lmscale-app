import { createContext, useContext, useState, useEffect } from "react";
import { lmScaleAPI } from "@/api/instance";
import { useSidebar } from "./sidebar-provider";

const FunctionsContext = createContext({});

export const FunctionsProvider = ({ children }) => {
  const { selectedAgent } = useSidebar();
  const [functions, setFunctions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (selectedAgent?.id) {
      listFunctions(selectedAgent.id).catch((err) => {
        // Log error but don't disrupt UI
        console.error("Failed to fetch functions:", err);
        setFunctions([]);
      });
    } else {
      setFunctions([]);
    }
  }, [selectedAgent?.id]);

  const listFunctions = async (agentId) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await lmScaleAPI
        .get("/agent/function/list", {
          params: { agentId },
        })
        .catch((err) => {
          // Handle network/API errors
          if (err.response?.status === 404) {
            return { data: { success: true, data: { functions: [] } } };
          }
          throw err;
        });

      if (!response.data.success) {
        console.error("API Error:", response.data.message);
        return [];
      }

      setFunctions(response.data.data.functions);
      return response.data.data.functions;
    } catch (err) {
      console.error("Error in listFunctions:", err);
      setFunctions([]);
      setError(err.response?.data?.message || err.message);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const createFunction = async (functionData) => {
    try {
      setIsLoading(true);
      setError(null);

      if (!selectedAgent?.id) {
        throw new Error("No agent selected");
      }

      const response = await lmScaleAPI.post("/agent/function/add", {
        agentId: selectedAgent.id,
        ...functionData,
      });

      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to create function");
      }

      // Refresh list but handle potential errors silently
      await listFunctions(selectedAgent.id).catch(console.error);
      return true;
    } catch (err) {
      console.error("Error creating function:", err);
      setError(err.response?.data?.message || err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateFunction = async (functionId, functionData) => {
    try {
      setIsLoading(true);
      setError(null);

      if (!selectedAgent?.id) {
        throw new Error("No agent selected");
      }

      const response = await lmScaleAPI.put("/agent/function/update", {
        agentId: selectedAgent.id,
        functionId,
        ...functionData,
      });

      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to update function");
      }

      // Refresh list but handle potential errors silently
      await listFunctions(selectedAgent.id).catch(console.error);
      return true;
    } catch (err) {
      console.error("Error updating function:", err);
      setError(err.response?.data?.message || err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    functions,
    isLoading,
    error,
    createFunction,
    updateFunction,
  };

  return (
    <FunctionsContext.Provider value={value}>
      {children}
    </FunctionsContext.Provider>
  );
};

export const useFunctions = () => {
  const context = useContext(FunctionsContext);
  if (!context) {
    throw new Error("useFunctions must be used within a FunctionsProvider");
  }
  return context;
};

export default FunctionsProvider;
