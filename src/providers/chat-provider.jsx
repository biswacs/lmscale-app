import { createContext, useContext, useState, useEffect } from "react";
import { lmScaleAPI } from "@/api/instance";

const ChatContext = createContext({});

export const ChatProvider = ({ children }) => {
  const [agents, setAgents] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [currentConversationId, setCurrentConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);

  const fetchAgents = async () => {
    try {
      const response = await lmScaleAPI.get("/agent/list");
      const fetchedAgents = response.data.data.agents;
      setAgents(fetchedAgents);

      if (!selectedAgent && fetchedAgents?.length > 0) {
        const playgroundAgent = fetchedAgents.find(
          (agent) => agent.name.toLowerCase() === "playground"
        );
        if (playgroundAgent) {
          setSelectedAgent(playgroundAgent);
          fetchConversations(playgroundAgent.id);
        }
      }
    } catch (error) {
      console.error("Error fetching agents:", error);
    }
  };

  const fetchConversations = async (agentId) => {
    try {
      const response = await lmScaleAPI.get(
        `/conversation/list?agentId=${agentId}`
      );
      const fetchedConversations = response.data.data.conversations;
      setConversations(fetchedConversations);
    } catch (error) {
      console.error("Error fetching conversations:", error);
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  const sendMessage = async (message) => {
    if (!message.trim() || !selectedAgent) return;

    const userMessage = message.trim();
    setIsLoading(true);
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);

    try {
      const response = await fetch(
        `${lmScaleAPI.defaults.baseURL}/chat/completion`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "text/event-stream",
            Authorization: `Bearer ${localStorage.getItem("lm_auth_token")}`,
          },
          body: JSON.stringify({
            agentId: selectedAgent.id,
            conversationId: currentConversationId,
            message: userMessage,
          }),
        }
      );

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let agentMessage = "";

      setMessages((prev) => [
        ...prev,
        { role: "agent", content: "", loading: true },
      ]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n").filter((line) => line.trim() !== "");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = JSON.parse(line.slice(6));

            if (data.conversationId && data.isNewConversation) {
              setCurrentConversationId(data.conversationId);
              localStorage.setItem(
                "currentConversationId",
                data.conversationId
              );
            }

            if (data.response) {
              agentMessage += data.response;
              setMessages((prev) => {
                const newMessages = [...prev];
                const lastMessage = newMessages[newMessages.length - 1];
                if (lastMessage.role === "agent") {
                  return [
                    ...prev.slice(0, -1),
                    {
                      ...lastMessage,
                      content: agentMessage,
                      loading: false,
                    },
                  ];
                }
                return newMessages;
              });
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

  const startNewConversation = () => {
    setCurrentConversationId(null);
    setMessages([]);
    localStorage.removeItem("currentConversationId");
  };

  const switchAgent = (agentId) => {
    const agent = agents.find((a) => a.id === agentId);
    if (agent) {
      setSelectedAgent(agent);
      fetchConversations(agentId);
      startNewConversation();
    }
  };

  const contextValue = {
    agents,
    conversations,
    currentConversationId,
    messages,
    isLoading,
    selectedAgent,
    sendMessage,
    startNewConversation,
    switchAgent,
    fetchConversations,
  };

  return (
    <ChatContext.Provider value={contextValue}>{children}</ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
export default ChatProvider;
