import React, { useState, useRef, useEffect } from "react";
import { Send, Loader, PlusCircle } from "lucide-react";
import { useChat } from "@/providers/chat-provider";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

const Header = ({ assistant, onNewChat }) => {
  return (
    <div className="border-b border-neutral-200 bg-white h-12 flex justify-between items-center px-4 z-10">
      <Link href="/dashboard" className="flex items-center gap-2">
        <img
          src="/icon.png"
          alt="LmScale Logo"
          className="h-7 w-7 object-contain"
        />
        <span className="text-sm font-light text-neutral-800">
          {assistant ? assistant.name || "LmScale" : "LmScale"}
        </span>
      </Link>
      <button
        onClick={onNewChat}
        className="px-2 md:px-4 py-2 bg-black text-white text-sm flex items-center justify-center gap-2 hover:bg-neutral-800 transition-colors"
      >
        <PlusCircle className="w-4 h-4" />
        <p className="hidden md:block">New Chat</p>
      </button>
    </div>
  );
};

const MarkdownMessage = ({ content }) => {
  return (
    <ReactMarkdown
      components={{
        a: ({ node, ...props }) => (
          <a
            {...props}
            className="text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          />
        ),

        strong: ({ node, ...props }) => (
          <strong {...props} className="font-semibold" />
        ),

        ul: ({ node, ...props }) => (
          <ul {...props} className="list-disc pl-4 my-2" />
        ),
        ol: ({ node, ...props }) => (
          <ol {...props} className="list-decimal pl-4 my-2" />
        ),

        li: ({ node, ...props }) => <li {...props} className="my-1" />,

        p: ({ node, ...props }) => <p {...props} className="my-2" />,

        code: ({ node, inline, ...props }) => (
          <code
            {...props}
            className={`${
              inline
                ? "bg-neutral-100 rounded px-1"
                : "block bg-neutral-100 p-2 rounded my-2"
            }`}
          />
        ),
      }}
      className="prose prose-sm max-w-none prose-neutral"
    >
      {content}
    </ReactMarkdown>
  );
};

export function ChatContainer() {
  const {
    conversation = [],
    isLoading: isChatLoading,
    sendMessage,
    newChat,
    assistant,
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
    if (!input.trim() || !assistant) return;
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
    return msg.role === "user" ? (
      <div className="whitespace-pre-wrap">{msg.content}</div>
    ) : (
      <MarkdownMessage content={msg.content} />
    );
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-none">
        <Header assistant={assistant} onNewChat={newChat} />
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
          <div className="relative flex items-start">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={
                assistant
                  ? `Message ${assistant.name}`
                  : "Assistant not available..."
              }
              disabled={!assistant}
              rows="1"
              className="w-full resize-none border border-neutral-200 p-2 text-sm focus:outline-none focus:border-neutral-300 disabled:bg-neutral-50 disabled:cursor-not-allowed"
              style={{ minHeight: "40px", maxHeight: "200px" }}
            />
            <button
              onClick={handleSendMessage}
              disabled={!input.trim() || isChatLoading || !assistant}
              className={`absolute right-0 flex items-center justify-center size-10 transition-colors ${
                !input.trim() || isChatLoading || !assistant
                  ? "text-neutral-300"
                  : "text-neutral-600"
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
