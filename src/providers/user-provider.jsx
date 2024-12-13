import { createContext, useContext, useState, useEffect } from "react";
import { API_PROFILE } from "@/api/endpoints";
import { getNewAPIInstance, API_BASE_URL } from "@/api/instance";
import { useAuthentication } from "./authentication-provider";

const UserContext = createContext({});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { isAuthenticated, authToken } = useAuthentication();

  const getAPIWithToken = () => {
    const api = getNewAPIInstance(API_BASE_URL);
    if (authToken) {
      api.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;
    }
    return api;
  };

  const fetchUser = async () => {
    try {
      setLoading(true);
      const api = getAPIWithToken();
      const response = await api.get(API_PROFILE);
      // Update to handle the nested user object in the response
      setUser(response.data.user);
      return response.data.user;
    } catch (error) {
      console.error("Error fetching user:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (userData) => {
    try {
      setSubmitting(true);
      const api = getAPIWithToken();
      const response = await api.put(API_PROFILE, userData);
      setUser(response.data.user);
      return response.data.user;
    } catch (error) {
      console.error("Error updating user:", error);
      throw new Error(
        error?.response?.data?.message || "Failed to update profile"
      );
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && authToken) {
      fetchUser();
    } else {
      setUser(null);
      setLoading(false);
    }
  }, [isAuthenticated, authToken]);

  const contextValue = {
    user,
    loading,
    submitting,
    fetchUser,
    updateUser,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

export default UserProvider;
