import React, { useState, useRef, useEffect } from "react";
import { Send, Loader, PlusCircle } from "lucide-react";
import { useChat } from "@/providers/chat-provider";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { AppLayout } from "../_shared/app-layout";

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
    <AppLayout>
      <div className="min-h-[75vh] p-2 sm:p-6 font-light">
        <div className="max-w-3xl mx-auto">
          <div className="min-h-full">
            <div className="space-y-4 mb-6">
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

            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 p-4">
              <div className="max-w-3xl mx-auto">
                <div className="flex items-end gap-2">
                  <div className="relative flex-1">
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
                      className="w-full resize-none border border-neutral-200 p-2 pr-10 text-sm focus:outline-none focus:border-neutral-300 disabled:bg-neutral-50 disabled:cursor-not-allowed"
                      style={{ minHeight: "40px", maxHeight: "200px" }}
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={!input.trim() || isChatLoading || !assistant}
                      className={`absolute right-2 bottom-2 flex items-center justify-center size-6 transition-colors ${
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
                  <button
                    onClick={newChat}
                    className="bg-black text-white p-2 flex items-center justify-center hover:bg-neutral-800 transition-colors"
                  >
                    <PlusCircle className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
