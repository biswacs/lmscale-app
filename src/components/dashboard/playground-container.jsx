import { useState, useRef, useEffect } from "react";
import { Send, Loader, RotateCcw } from "lucide-react";
import { usePlayground } from "@/providers/playground-provider";

export function PlaygroundContainer() {
  const [message, setMessage] = useState("");
  const {
    messages,
    isLoading,
    sendMessage,
    startNewConversation,
    conversationId,
  } = usePlayground();
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
    if (!message.trim() || !conversationId) return;
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
        <div className="flex items-center gap-2 text-neutral-500 font-light">
          <Loader className="h-4 w-4 animate-spin" />
        </div>
      );
    }
    return <div className="whitespace-pre-wrap font-light">{msg.content}</div>;
  };

  return (
    <div className="h-full flex flex-col relative">
      <div className="absolute inset-0 overflow-y-auto">
        <div className="min-h-full pb-24">
          {!conversationId ? (
            <div className="flex items-center justify-center h-full text-neutral-500 font-light">
              <Loader className="h-6 w-6 animate-spin" />
            </div>
          ) : (
            messages.map((msg, index) => (
              <div key={`${msg.role}-${index}`} className="px-4 py-2">
                <div className="max-w-3xl mx-auto">
                  <div className="flex items-start gap-3">
                    <div className="size-8 bg-neutral-900 flex-shrink-0 flex items-center justify-center text-white font-light">
                      {msg.role === "user" ? "U" : "A"}
                    </div>
                    <div className="flex-1 font-mono text-sm break-words font-light">
                      {renderMessageContent(msg)}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-neutral-200">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 relative p-4">
            <button
              onClick={startNewConversation}
              className="p-2 hover:bg-neutral-100 font-light"
              title="New conversation"
            >
              <RotateCcw className="h-5 w-5 text-neutral-400" />
            </button>
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={
                conversationId
                  ? "Send a message"
                  : "Initializing conversation..."
              }
              disabled={!conversationId}
              rows="1"
              className="flex-1 resize-none border border-neutral-200 p-3 pr-10 text-neutral-900 focus:outline-none focus:border-neutral-400/60 text-sm max-h-36 overflow-y-auto disabled:bg-neutral-50 font-light"
              style={{ minHeight: "44px" }}
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading || !message.trim() || !conversationId}
              className={`absolute right-6 bottom-7 p-1 font-light ${
                isLoading || !message.trim() || !conversationId
                  ? "text-neutral-300"
                  : "text-neutral-900 hover:text-neutral-600"
              }`}
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
