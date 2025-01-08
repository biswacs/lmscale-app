import { API_BASE_URL } from "@/config";
import {
  AUTHENTICATED_ROUTES,
  ROUTES_MAP,
  UNAUTHENTICATED_ROUTES,
} from "@/constants/routes";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";

const AuthenticationContext = createContext({});

const AuthenticationProvider = ({ children }) => {
  const router = useRouter();
  const [authToken, setAuthToken] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("lm_auth_token");
    setAuthToken(token);
    setLoading(false);
  }, []);

  const logInUser = async (email, password) => {
    if (!email || !password) {
      throw new Error("Please fill in all fields");
    }

    setSubmitting(true);
    try {
      const response = await fetch(`${API_BASE_URL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const data = await response.json();
      localStorage.setItem("lm_auth_token", data.lm_auth_token);
      setAuthToken(data.lm_auth_token);
      window.location.href = ROUTES_MAP.DASHBOARD.__;
      return data;
    } catch (err) {
      console.error(err);
      throw new Error(err.message || "Login failed");
    } finally {
      setSubmitting(false);
    }
  };

  const registerUser = async (name, email, password) => {
    if (!name || !email || !password) {
      throw new Error("Please fill in all fields");
    }

    setSubmitting(true);
    try {
      const response = await fetch(`${API_BASE_URL}/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }

      const data = await response.json();
      localStorage.setItem("lm_auth_token", data.lm_auth_token);
      setAuthToken(data.lm_auth_token);
      window.location.href = ROUTES_MAP.DASHBOARD.__;
      return data;
    } catch (err) {
      console.error(err);
      throw new Error(err.message || "Registration failed");
    } finally {
      setSubmitting(false);
    }
  };

  const logOutUser = () => {
    localStorage.clear();
    setAuthToken(null);
    window.location.href = ROUTES_MAP.LOGIN;
  };

  useEffect(() => {
    if (loading) return;

    const isLoggedIn = !!authToken;
    const currentPathname = router.pathname;

    if (!isLoggedIn) {
      if (!UNAUTHENTICATED_ROUTES.includes(currentPathname)) {
        router.push(ROUTES_MAP.LOGIN);
      }
    } else {
      if (!AUTHENTICATED_ROUTES.includes(currentPathname)) {
        router.push(ROUTES_MAP.DASHBOARD.__);
      }
    }
  }, [authToken, loading, router]);

  const contextValue = {
    logInUser,
    logOutUser,
    registerUser,
    isAuthenticated: !!authToken,
    authToken,
    submitting,
  };

  return (
    <AuthenticationContext.Provider value={contextValue}>
      {!loading && children}
    </AuthenticationContext.Provider>
  );
};

export const useAuthentication = () => useContext(AuthenticationContext);

export default AuthenticationProvider;
