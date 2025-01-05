import { createContext, useContext, useState, useEffect } from "react";

const ChatContext = createContext({});

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [agentId, setAgentId] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedAgentId = window.localStorage.getItem("agentId");
      if (storedAgentId) {
        setAgentId(storedAgentId);
      }
    }
  }, []);

  const updateApiKey = (newKey) => {
    setApiKey(newKey);
  };

  const sendMessage = async (message) => {
    if (!message.trim() || !apiKey || !agentId) return;

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
            "x-api-key": apiKey,
          },
          body: JSON.stringify({
            message: userMessage,
            agentId: agentId,
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

                // Add a small delay between updates for smoother streaming
                if (!isFirstResponse) {
                  await new Promise((resolve) => setTimeout(resolve, 10));
                }
                isFirstResponse = false;
              }
            } catch (error) {
              console.error("Error parsing SSE data:", error);
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

  const contextValue = {
    messages,
    isLoading,
    apiKey,
    agentId,
    sendMessage,
    newChat,
    updateApiKey,
  };

  return (
    <ChatContext.Provider value={contextValue}>{children}</ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
export default ChatProvider;
