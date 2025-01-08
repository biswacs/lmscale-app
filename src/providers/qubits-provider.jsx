import { createContext, useContext, useState, useEffect } from "react";
import { API_BASE_URL } from "@/config";

const QubitsContext = createContext({});

export const QubitsProvider = ({ children }) => {
  const [qubits, setQubits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const fetchQubits = async () => {
    const authToken = localStorage.getItem("lm_auth_token");
    try {
      const response = await fetch(`${API_BASE_URL}/qubit/list`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch qubits");
      }

      const data = await response.json();
      setQubits(data.data.qubits);
      setIsLoading(false);
    } catch (err) {
      setError(err.message || "Failed to fetch qubits");
      setIsLoading(false);
    }
  };

  const createQubit = async (formData) => {
    const authToken = localStorage.getItem("lm_auth_token");
    try {
      const response = await fetch(`${API_BASE_URL}/qubit/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create qubit");
      }

      const data = await response.json();
      await fetchQubits(); // Refresh the qubits list
      return data; // Return the full response including the qubit ID
    } catch (err) {
      throw new Error(err.message || "Failed to create qubit");
    }
  };

  useEffect(() => {
    const authToken = localStorage.getItem("lm_auth_token");
    if (authToken) {
      fetchQubits();
    }
  }, []);

  const contextValue = {
    qubits,
    isLoading,
    error,
    isCreateModalOpen,
    setIsCreateModalOpen,
    fetchQubits,
    createQubit,
  };

  return (
    <QubitsContext.Provider value={contextValue}>
      {children}
    </QubitsContext.Provider>
  );
};

export const useQubits = () => useContext(QubitsContext);

export default QubitsProvider;
