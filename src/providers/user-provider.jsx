import { createContext, useContext, useState, useEffect } from "react";
import { API_PROFILE } from "@/api/endpoints";
import { lmScaleAPI } from "@/api/instance";
import { useAuthentication } from "./authentication-provider";

const UserContext = createContext({});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { isAuthenticated, authToken } = useAuthentication();

  const fetchUser = async () => {
    try {
      setLoading(true);
      const response = await lmScaleAPI.get(API_PROFILE, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
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
      const response = await lmScaleAPI.put(API_PROFILE, userData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
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
