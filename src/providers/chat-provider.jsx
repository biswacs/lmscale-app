import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { API_BASE_URL } from "@/config";

const ChatContext = createContext({});

export const ChatProvider = ({ children }) => {
  const [conversation, setConversation] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [agent, setAgent] = useState(null);
  const router = useRouter();
  const agentId = router.query.slug;

  useEffect(() => {
    setConversation([]);
    setError(null);
    setAgent(null);
  }, [agentId]);

  useEffect(() => {
    const authToken = localStorage.getItem("lm_auth_token");
    if (authToken && agentId) {
      fetchAgentApiKey();
    }
  }, [agentId]);

  const fetchAgentApiKey = async () => {
    const authToken = localStorage.getItem("lm_auth_token");
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/get?agentId=${agentId}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch agent API key");
      }

      const data = await response.json();
      setAgent(data.data.agent);
    } catch (err) {
      setError(err.message || "Failed to fetch agent API key");
    }
  };

  const sendMessage = async (message, previousMessages = []) => {
    if (!message.trim() || !agent) return;

    const userMessage = message.trim();
    setIsLoading(true);

    setConversation((prev) => [
      ...prev,
      { role: "user", content: userMessage },
    ]);
    setConversation((prev) => [
      ...prev,
      { role: "agent", content: "", loading: true },
    ]);

    try {
      const response = await fetch(`${API_BASE_URL}/chat/completion`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "text/event-stream",
          "x-api-key": agent.apiKey,
        },
        body: JSON.stringify({
          message: userMessage,
          conversation: previousMessages.map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
        }),
      });

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
              const data = JSON.parse(line.slice(6));

              if (data.error) {
                throw new Error(data.error);
              }

              if (data.response) {
                accumulatedText += data.response;

                setConversation((prev) => {
                  const newConversation = [...prev];
                  const lastMessage =
                    newConversation[newConversation.length - 1];
                  if (lastMessage.role === "agent") {
                    return [
                      ...prev.slice(0, -1),
                      {
                        ...lastMessage,
                        content: accumulatedText,
                        loading: false,
                      },
                    ];
                  }
                  return newConversation;
                });

                if (!isFirstResponse) {
                  await new Promise((resolve) => setTimeout(resolve, 10));
                }
                isFirstResponse = false;
              }

              if (data.done) {
                break;
              }
            } catch (error) {
              console.error("Error parsing SSE data:", error);
              throw error;
            }
          }
        }
      }
    } catch (error) {
      console.error("Error sending message:", error);

      setConversation((prev) => [
        ...prev.slice(0, -1),
        {
          role: "agent",
          content: `Error: ${error.message || "Something went wrong"}`,
          loading: false,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const newChat = () => {
    setConversation([]);
  };

  const contextValue = {
    conversation,
    isLoading,
    error,
    agent,
    sendMessage,
    newChat,
  };

  return (
    <ChatContext.Provider value={contextValue}>{children}</ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};

export default ChatProvider;
