import { createContext, useContext, useState } from "react";
import { lmScaleAPI } from "@/api/instance";

const PlaygroundContext = createContext({});

export const PlaygroundProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (message) => {
    if (!message.trim()) return;

    const userMessage = message.trim();
    setIsLoading(true);

    setMessages([{ role: "user", content: userMessage }]);

    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: "", loading: true },
    ]);

    try {
      const response = await fetch(
        `${lmScaleAPI.defaults.baseURL}/chat/completion`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify({ message: userMessage }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      let isFirstResponse = true;
      let accumulatedText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n").filter((line) => line.trim() !== "");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            try {
              const jsonData = line.slice(6);
              const data = JSON.parse(jsonData);

              if (data.response) {
                accumulatedText += data.response;

                setMessages((prev) => {
                  const newMessages = [...prev];
                  const lastMessage = newMessages[newMessages.length - 1];
                  if (lastMessage.role === "assistant") {
                    return [
                      ...prev.slice(0, -1),
                      {
                        ...lastMessage,
                        content: accumulatedText,
                        loading: false,
                      },
                    ];
                  }
                  return newMessages;
                });

                if (!isFirstResponse) {
                  await new Promise((resolve) => setTimeout(resolve, 10));
                }
                isFirstResponse = false;
              }
            } catch (e) {
              console.error("JSON parsing error:", e);
              console.error("Problematic line:", line);
            }
          }
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setMessages([
        { role: "user", content: userMessage },
        {
          role: "assistant",
          content: `Error: ${
            error?.response?.data?.message ||
            error.message ||
            "Something went wrong"
          }`,
          loading: false,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearMessages = () => setMessages([]);

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
