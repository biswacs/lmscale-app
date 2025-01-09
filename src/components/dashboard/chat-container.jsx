import React, { useState, useRef, useEffect } from "react";
import { Send, Loader, PlusCircle } from "lucide-react";
import { useChat } from "@/providers/chat-provider";
import Link from "next/link";

const Header = ({ qubit, onNewChat }) => {
  return (
    <div className="border-b border-neutral-200 bg-white h-12 flex justify-between items-center px-4 z-10">
      <Link href="/dashboard/qubits" className="flex items-center gap-2">
        <img
          src="/icon.png"
          alt="LmScale Logo"
          className="h-7 w-7 object-contain"
        />
        <span className="text-sm font-light text-neutral-800">
          {qubit ? qubit.name || "LmScale" : "LmScale"}
        </span>
      </Link>
      <button
        onClick={onNewChat}
        className="px-4 py-2 bg-black text-white text-sm flex items-center justify-center gap-2 hover:bg-neutral-800 transition-colors"
      >
        <PlusCircle className="w-4 h-4" />
        New Chat
      </button>
    </div>
  );
};

export function ChatContainer() {
  const {
    conversation = [],
    isLoading: isChatLoading,
    sendMessage,
    newChat,
    qubit,
    error,
  } = useChat();

  const [input, setInput] = useState("");
  const conversationEndRef = useRef(null);
  const textareaRef = useRef(null);
  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    if (conversationEndRef.current) {
      conversationEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "inherit";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        200
      )}px`;
    }
  }, [input]);

  const handleSendMessage = async () => {
    if (!input.trim() || !qubit) return;
    const messageToSend = input.trim();
    setInput("");
    await sendMessage(messageToSend, conversation);
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

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-none">
        <Header qubit={qubit} onNewChat={newChat} />
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div
          className="h-full w-full bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:14px_14px] sm:bg-[size:24px_24px] md:bg-[size:32px_32px]"
          style={{
            mask: "radial-gradient(circle at center, white 30%, transparent 70%)",
            WebkitMask:
              "radial-gradient(circle at center, white 30%, transparent 70%)",
          }}
        />
      </div>

      <div ref={chatContainerRef} className="flex-1 overflow-y-auto">
        <div className="min-h-full">
          <div className="max-w-3xl mx-auto py-4">
            {conversation.map((msg, index) => (
              <div
                key={`${msg.role}-${index}`}
                className="px-4 py-3 flex items-start gap-4"
              >
                <div className="size-8 flex-shrink-0 flex items-center justify-center font-light bg-neutral-900 text-white">
                  {msg.role === "user" ? "U" : "A"}
                </div>
                <div className="flex-1 text-sm text-neutral-700">
                  {renderMessageContent(msg)}
                </div>
              </div>
            ))}
            <div ref={conversationEndRef} className="h-1" />
          </div>
        </div>
      </div>

      <div className="flex-none border-t border-neutral-200 bg-white">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <div className="relative flex items-center">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={
                qubit ? `Message ${qubit.name}...` : "Qubit not available..."
              }
              disabled={!qubit}
              rows="1"
              className="w-full resize-none border border-neutral-200 py-3 pl-4 pr-12 text-sm focus:outline-none focus:border-neutral-300 disabled:bg-neutral-50 disabled:cursor-not-allowed"
              style={{ minHeight: "48px", maxHeight: "200px" }}
            />
            <button
              onClick={handleSendMessage}
              disabled={!input.trim() || isChatLoading || !qubit}
              className={`absolute right-3 flex items-center justify-center h-8 w-8 transition-colors ${
                !input.trim() || isChatLoading || !qubit
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
