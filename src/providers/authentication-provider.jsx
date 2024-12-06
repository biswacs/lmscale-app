import { API_LOGIN } from "@/api/endpoints";
import { lmScaleAPI } from "@/api/instance";
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

  const logInUser = async (email, password) => {
    setSubmitting(true);
    return lmScaleAPI
      .post(API_LOGIN, { email, password })
      .then((res) => {
        localStorage.setItem("accessToken", res.data.token);
        setAuthToken(res.data.token);
        window.location.href = ROUTES_MAP.DASHBOARD.__;
        return res.data;
      })
      .catch((err) => {
        console.error(err);
        throw new Error(err?.response?.data);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };
  const registerUser = async (email, password) => {};

  const logOutUser = () => {
    localStorage.clear();
    setAuthToken(null);
    window.location.href = ROUTES_MAP.LOGIN;
  };

  useEffect(() => {
    const tokenFromQuery = router?.query?.token;

    if (tokenFromQuery) {
      authAPI
        .get("/api/auth/account", {
          headers: {
            Authorization: `Bearer ${tokenFromQuery}`,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            localStorage.setItem("accessToken", tokenFromQuery);
            setAuthToken(tokenFromQuery);
          }
        })
        .catch((error) => {
          console.error("Error validating token:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }

    const accessTokenFromLocalStorage = localStorage.getItem("accessToken");
    setAuthToken(accessTokenFromLocalStorage);
    setLoading(false);
  }, [router]);

  useEffect(() => {
    if (loading) return;

    const isLoggedIn = !!authToken;
    const currentPathname = router.pathname;
    const isAuthenticatedRoute = AUTHENTICATED_ROUTES.includes(currentPathname);

    if (isAuthenticatedRoute && !isLoggedIn) {
      router.push(ROUTES_MAP.LOGIN);
    } else if (!isAuthenticatedRoute && isLoggedIn) {
      router.push(ROUTES_MAP.DASHBOARD.__);
    }
  }, [authToken, loading, router]);

  const contextValue = {
    logInUser,
    logOutUser,
    isAuthenticated: !!authToken,
    authToken,
    submitting,
  };

  return (
    <AuthenticationContext.Provider value={contextValue}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export const useAuthentication = () => useContext(AuthenticationContext);

export default AuthenticationProvider;
