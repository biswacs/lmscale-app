import { API_BASE_URL } from "@/config";
import {
  ROUTES_MAP,
  isPublicRoute,
  isAuthenticatedRoute,
  isUnauthenticatedRoute,
} from "@/constants/routes";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";

const AuthenticationContext = createContext({});

const AuthenticationProvider = ({ children }) => {
  const router = useRouter();
  const [authToken, setAuthToken] = useState(undefined);
  const [assistantId, setAssistantId] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem("lm_auth_token");
        const assistant = localStorage.getItem("lm_assistant_id");

        setAuthToken(token);
        setAssistantId(assistant);
      } catch (err) {
        console.error("Error initializing auth:", err);
        setError(err.message);
      } finally {
        setLoading(false);
        setIsInitialized(true);
      }
    };

    initializeAuth();
  }, []);

  const handleAuthSuccess = async (data) => {
    try {
      setAuthToken(data.lm_auth_token);
      setAssistantId(data.assistantId);

      localStorage.setItem("lm_auth_token", data.lm_auth_token);
      localStorage.setItem("lm_assistant_id", data.assistantId);

      await new Promise((resolve) => setTimeout(resolve, 100));

      router.push(ROUTES_MAP.DASHBOARD.__);
    } catch (err) {
      console.error("Error handling auth success:", err);
      setError(err.message);
    }
  };

  const registerUser = async (name, email, password) => {
    if (!name || !email || !password) {
      throw new Error("Please fill in all fields");
    }

    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      await handleAuthSuccess(data);
      return data;
    } catch (err) {
      console.error("Registration error:", err);
      setError(err.message);
      throw err;
    } finally {
      setSubmitting(false);
    }
  };

  const logInUser = async (email, password) => {
    if (!email || !password) {
      throw new Error("Please fill in all fields");
    }

    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      await handleAuthSuccess(data);
      return data;
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message);
      throw err;
    } finally {
      setSubmitting(false);
    }
  };

  const verifyToken = async () => {
    if (!authToken) return false;

    try {
      const response = await fetch(`${API_BASE_URL}/user/verify`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      return response.ok;
    } catch (err) {
      console.error("Token verification error:", err);
      return false;
    }
  };

  const logOutUser = () => {
    try {
      localStorage.clear();
      setAuthToken(null);
      setAssistantId(null);
      setError(null);
      router.push(ROUTES_MAP.LOGIN);
    } catch (err) {
      console.error("Logout error:", err);
      setError(err.message);
    }
  };

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    if (loading || !isInitialized) return;

    const isLoggedIn = !!authToken && !!assistantId;
    const currentPathname = router.pathname;

    if (isPublicRoute(currentPathname)) {
      return;
    }

    if (!isLoggedIn) {
      if (isAuthenticatedRoute(currentPathname)) {
        router.push(ROUTES_MAP.LOGIN);
      }
    } else {
      if (isUnauthenticatedRoute(currentPathname)) {
        router.push(ROUTES_MAP.DASHBOARD.__);
      }
    }
  }, [authToken, assistantId, loading, router, isInitialized]);

  const contextValue = {
    logInUser,
    logOutUser,
    registerUser,
    verifyToken,
    clearError,
    isAuthenticated: !!authToken && !!assistantId,
    isInitialized,
    authToken,
    assistantId,
    submitting,
    error,
  };

  if (!isInitialized) {
    return null;
  }

  return (
    <AuthenticationContext.Provider value={contextValue}>
      {!loading && children}
    </AuthenticationContext.Provider>
  );
};

export const useAuthentication = () => {
  const context = useContext(AuthenticationContext);
  if (context === undefined) {
    throw new Error(
      "useAuthentication must be used within an AuthenticationProvider"
    );
  }
  return context;
};

export default AuthenticationProvider;
