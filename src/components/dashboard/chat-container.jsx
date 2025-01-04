import React, { useState, useRef, useEffect } from "react";
import { Send, Loader, PlusCircle } from "lucide-react";
import { useChat } from "@/providers/chat-provider";

export function ChatContainer() {
  const {
    messages = [],
    isLoading: isChatLoading,
    sendMessage,
    newChat,
    selectedAgent,
    switchAgent,
    agents = [],
  } = useChat();

  const [message, setMessage] = useState("");
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
    if (!message.trim() || !selectedAgent) return;
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

  if (!agents.length) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <Loader className="h-6 w-6 animate-spin text-neutral-500" />
          <p className="text-sm text-neutral-500">Loading agents...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 flex items-center justify-end gap-2">
        <button
          onClick={newChat}
          className="px-4 py-2 bg-black text-white text-sm flex items-center justify-center gap-2 hover:bg-neutral-800 transition-colors rounded-sm"
        >
          <PlusCircle className="w-4 h-4" />
          New Chat
        </button>
        <div className="relative w-48">
          <select
            value={selectedAgent?.id || ""}
            onChange={(e) => switchAgent(e.target.value)}
            className="w-full appearance-none px-3 py-2 pr-8 bg-neutral-900 border border-neutral-700 rounded-sm text-sm text-white focus:outline-none focus:border-neutral-600"
          >
            {agents.map((agent) => (
              <option key={agent.id} value={agent.id}>
                {agent.name}
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg
              className="w-4 h-4 text-neutral-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="min-h-full pb-24">
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
              placeholder={`Message ${selectedAgent?.name || "playground"}...`}
              disabled={!selectedAgent}
              rows="1"
              className="w-full resize-none border border-neutral-200 py-3 pl-4 pr-12 text-sm focus:outline-none focus:border-neutral-300 disabled:bg-neutral-50 disabled:text-neutral-400 rounded-sm"
              style={{ minHeight: "48px", maxHeight: "200px" }}
            />
            <button
              onClick={handleSendMessage}
              disabled={!selectedAgent || !message.trim() || isChatLoading}
              className={`absolute right-3 flex items-center justify-center h-8 w-8 transition-colors rounded-sm ${
                !selectedAgent || !message.trim() || isChatLoading
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
