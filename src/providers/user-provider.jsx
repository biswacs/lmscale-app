import { createContext, useContext, useState, useEffect } from "react";
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
      const response = await lmScaleAPI.get("/user/profile", {
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
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

export default UserProvider;
