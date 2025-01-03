import { createContext, useContext, useState, useEffect } from "react";
import { lmScaleAPI } from "@/api/instance";

const ChatContext = createContext({});

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState(null);

  useEffect(() => {
    initializeConversation();
  }, []);

  const initializeConversation = async () => {
    try {
      const response = await fetch(
        `${lmScaleAPI.defaults.baseURL}/playground/conversation`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("lm_auth_token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.success && data.data.conversation.id) {
        setConversationId(data.data.conversation.id);
      }
    } catch (error) {
      console.error("Error initializing conversation:", error);
    }
  };

  const sendMessage = async (message) => {
    if (!message.trim() || !conversationId) return;

    const userMessage = message.trim();
    setIsLoading(true);

    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: "", loading: true },
    ]);

    try {
      const response = await fetch(
        `${lmScaleAPI.defaults.baseURL}/playground/chat/completion`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "text/event-stream",
            Authorization: `Bearer ${localStorage.getItem("lm_auth_token")}`,
          },
          body: JSON.stringify({
            conversationId,
            query: userMessage,
          }),
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
      setMessages((prev) => [
        ...prev.slice(0, -1),
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

  const startNewConversation = async () => {
    setMessages([]);
    setConversationId(null);
    await initializeConversation();
  };

  const contextValue = {
    messages,
    isLoading,
    sendMessage,
    startNewConversation,
    conversationId,
  };

  return (
    <ChatContext.Provider value={contextValue}>{children}</ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
export default ChatProvider;
