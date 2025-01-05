import React, { useState, useRef, useEffect } from "react";
import { Send, Loader, PlusCircle, Key } from "lucide-react";
import { useChat } from "@/providers/chat-provider";

export function ChatContainer() {
  const {
    messages = [],
    isLoading: isChatLoading,
    sendMessage,
    newChat,
    apiKey,
    agentId,
    updateApiKey,
  } = useChat();

  const [message, setMessage] = useState("");
  const [isEditingKey, setIsEditingKey] = useState(!apiKey);
  const [tempApiKey, setTempApiKey] = useState(apiKey);

  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "inherit";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  const handleSendMessage = async () => {
    console.log("Current state:", { apiKey, agentId, message: message.trim() });
    if (!message.trim() || !apiKey || !agentId) {
      console.log("Missing required fields:", {
        hasMessage: !!message.trim(),
        hasApiKey: !!apiKey,
        hasAgentId: !!agentId,
      });
      return;
    }
    const messageToSend = message.trim();
    setMessage("");
    await sendMessage(messageToSend);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const handleSaveApiKey = () => {
    updateApiKey(tempApiKey);
    setIsEditingKey(false);
  };

  const renderMessageContent = (msg) => {
    if (msg.loading) {
      return (
        <div className="flex items-center gap-2 text-neutral-500">
          <Loader className="h-3 w-3 animate-spin" />
          <span className="text-xs">Generating response...</span>
        </div>
      );
    }
    return <div className="whitespace-pre-wrap">{msg.content}</div>;
  };

  if (!agentId) {
    return (
      <div className="h-full flex items-center justify-center text-neutral-500">
        <p>No agent selected. Please select an agent to start chatting.</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 flex items-center justify-between gap-2 border-b border-neutral-200">
        <div className="flex items-center gap-2">
          {isEditingKey ? (
            <>
              <input
                type="text"
                value={tempApiKey}
                onChange={(e) => setTempApiKey(e.target.value)}
                placeholder="Enter API Key"
                className="px-3 py-2 border border-neutral-200 rounded-sm text-sm focus:outline-none focus:border-neutral-300"
              />
              <button
                onClick={handleSaveApiKey}
                className="px-4 py-2 bg-black text-white text-sm hover:bg-neutral-800 transition-colors rounded-sm"
              >
                Save Key
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditingKey(true)}
              className="px-4 py-2 text-sm flex items-center gap-2 hover:bg-neutral-100 transition-colors rounded-sm"
            >
              <Key className="w-4 h-4" />
              Change API Key
            </button>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={newChat}
            className="px-4 py-2 bg-black text-white text-sm flex items-center justify-center gap-2 hover:bg-neutral-800 transition-colors rounded-sm"
          >
            <PlusCircle className="w-4 h-4" />
            New Chat
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="min-h-full pb-24">
          {!apiKey ? (
            <div className="h-full flex items-center justify-center text-neutral-500">
              <p>Please enter your API key to start chatting</p>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto">
              {messages.map((msg, index) => (
                <div
                  key={`${msg.role}-${index}`}
                  className="px-4 py-3 flex items-start gap-4"
                >
                  <div className="size-8 flex-shrink-0 flex items-center justify-center font-medium bg-neutral-900 text-white rounded-sm">
                    {msg.role === "user" ? "U" : "A"}
                  </div>
                  <div className="flex-1 text-sm text-neutral-700">
                    {renderMessageContent(msg)}
                  </div>
                </div>
              ))}
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 border-t border-neutral-200 bg-white">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <div className="relative flex items-center">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={
                !apiKey
                  ? "Enter API key to start chatting"
                  : !agentId
                  ? "Select an agent to start chatting"
                  : "Send a message..."
              }
              disabled={!apiKey || !agentId}
              rows="1"
              className="w-full resize-none border border-neutral-200 py-3 pl-4 pr-12 text-sm focus:outline-none focus:border-neutral-300 disabled:bg-neutral-50 disabled:text-neutral-400 rounded-sm"
              style={{ minHeight: "48px", maxHeight: "200px" }}
            />
            <button
              onClick={handleSendMessage}
              disabled={!apiKey || !agentId || !message.trim() || isChatLoading}
              className={`absolute right-3 flex items-center justify-center h-8 w-8 transition-colors rounded-sm ${
                !apiKey || !agentId || !message.trim() || isChatLoading
                  ? "text-neutral-300"
                  : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100"
              }`}
            >
              {isChatLoading ? (
                <Loader className="h-4 w-4 animate-spin" />
              ) : (
                <Send size={16} />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
