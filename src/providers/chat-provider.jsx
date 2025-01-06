import { createContext, useContext, useState, useEffect } from "react";
import { useAuthentication } from "./authentication-provider";
import { lmScaleAPI } from "@/api/instance";

const ChatContext = createContext({});

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [agents, setAgents] = useState([]);
  const [isAgentModalOpen, setIsAgentModalOpen] = useState(true);
  const { authToken } = useAuthentication();

  useEffect(() => {
    if (authToken) {
      fetchAgents();
    }
  }, [authToken]);

  const fetchAgents = async () => {
    try {
      const response = await lmScaleAPI.get("/agent/list", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setAgents(response.data.data.agents);
      setIsLoading(false);
    } catch (err) {
      setError(err.message || "Failed to fetch agents");
      setIsLoading(false);
    }
  };

  const selectAgent = (agent) => {
    setSelectedAgent(agent);
    setIsAgentModalOpen(false);
  };

  const changeAgent = () => {
    setIsAgentModalOpen(true);
  };

  const sendMessage = async (message, history = []) => {
    if (!message.trim() || !selectedAgent) return;

    const userMessage = message.trim();
    setIsLoading(true);

    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);

    setMessages((prev) => [
      ...prev,
      { role: "agent", content: "", loading: true },
    ]);

    try {
      const response = await fetch(
        `https://api.lmscale.tech/v1/chat/completion`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "text/event-stream",
            "x-api-key": selectedAgent.apiKey,
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            message: userMessage,
            messageHistory: history.map((msg) => ({
              role: msg.role,
              content: msg.content,
            })),
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
              const data = JSON.parse(line.slice(6));

              if (data.error) {
                throw new Error(data.error);
              }

              if (data.response) {
                accumulatedText += data.response;

                setMessages((prev) => {
                  const newMessages = [...prev];
                  const lastMessage = newMessages[newMessages.length - 1];
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
                  return newMessages;
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

      setMessages((prev) => [
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
    setMessages([]);
  };

  const clearAgent = () => {
    setSelectedAgent(null);
    setIsAgentModalOpen(true);
  };

  const contextValue = {
    messages,
    isLoading,
    error,
    selectedAgent,
    agents,
    isAgentModalOpen,
    sendMessage,
    newChat,
    selectAgent,
    changeAgent,
    clearAgent,
    setIsAgentModalOpen,
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
