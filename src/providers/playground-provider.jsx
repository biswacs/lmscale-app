import { createContext, useContext, useState } from "react";
import { lmScaleAPI } from "@/api/instance";
import { useAuthentication } from "./authentication-provider";

const PlaygroundContext = createContext({});

const PlaygroundProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { authToken } = useAuthentication();

  const sendMessage = async (message) => {
    if (!message.trim()) return;

    const userMessage = message.trim();
    setIsLoading(true);

    setMessages((prev) => [
      ...prev,
      { role: "user", content: userMessage },
      { role: "assistant", content: "", loading: true },
    ]);

    try {
      const response = await fetch(
        `${lmScaleAPI.defaults.baseURL}/playground/chat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({ message: userMessage }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      let fullResponse = "";
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let isFirstChunk = true;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n").filter((line) => line.trim() !== "");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            try {
              const data = JSON.parse(line.slice(6));
              fullResponse += data.response || data.text || "";

              setMessages((prev) => {
                const newMessages = [...prev];
                const lastMessage = newMessages[newMessages.length - 1];
                lastMessage.content = fullResponse;
                if (isFirstChunk) {
                  lastMessage.loading = false;
                  isFirstChunk = false;
                }
                return newMessages;
              });
            } catch (e) {
              console.error("Error parsing JSON:", e);
            }
          }
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev.slice(0, -1),
        {
          role: "assistant",
          content: `Error: ${error.message}`,
          loading: false,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearMessages = () => {
    setMessages([]);
  };

  const contextValue = {
    messages,
    isLoading,
    sendMessage,
    clearMessages,
  };

  return (
    <PlaygroundContext.Provider value={contextValue}>
      {children}
    </PlaygroundContext.Provider>
  );
};

export const usePlayground = () => useContext(PlaygroundContext);
export default PlaygroundProvider;
