import { useEffect } from "react";
import AuthenticationProvider from "./authentication-provider";
import UserProvider from "./user-provider";
import ChatProvider from "./chat-provider";
import { AssistantsProvider } from "./assistants-provider";
import { API_BASE_URL } from "@/config";
import { ROUTES_MAP } from "@/constants/routes";

const handleLogout = () => {
  localStorage.clear();
  window.location.replace(ROUTES_MAP.LOGIN);
};

function GlobalFetchInterceptor({ children }) {
  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("lm_auth_token");
      if (!token) return;

      try {
        const response = await fetch(`${API_BASE_URL}/user/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 401) {
          const data = await response.json();
          if (data.shouldLogout) {
            handleLogout();
          }
        }
      } catch (error) {
        console.error("Token verification failed:", error);
      }
    };

    verifyToken();

    const interval = setInterval(verifyToken, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const originalFetch = window.fetch;

    window.fetch = async (...args) => {
      const [url, config = {}] = args;

      if (!url.toString().startsWith(API_BASE_URL)) {
        return originalFetch(...args);
      }

      if (config.headers?.["x-api-key"]) {
        return originalFetch(...args);
      }

      try {
        const response = await originalFetch(...args);

        if (response.status === 401) {
          const clonedResponse = response.clone();
          const data = await clonedResponse.json();

          if (data.shouldLogout) {
            handleLogout();
            return Promise.reject(new Error(data.message || "Session expired"));
          }
        }

        return response;
      } catch (error) {
        throw error;
      }
    };

    return () => {
      window.fetch = originalFetch;
    };
  }, []);

  return children;
}

export default function RootProvider({ children }) {
  return (
    <AuthenticationProvider>
      <GlobalFetchInterceptor>
        <UserProvider>
          <AssistantsProvider>
            <ChatProvider>{children}</ChatProvider>
          </AssistantsProvider>
        </UserProvider>
      </GlobalFetchInterceptor>
    </AuthenticationProvider>
  );
}
