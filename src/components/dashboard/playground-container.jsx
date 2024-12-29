import { useState, useRef, useEffect } from "react";
import { Send, Loader } from "lucide-react";

export function PlaygroundContainer() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = message.trim();
    setMessage("");
    setIsLoading(true);

    // Clear previous messages and add new user message
    setMessages([
      { role: "user", content: userMessage },
      { role: "assistant", content: "", loading: true },
    ]);

    try {
      const response = await fetch("http://13.232.229.112:8000/chat/stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      let fullResponse = "";
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let isFirstChunk = true;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n").filter((line) => line.trim() !== "");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            try {
              const data = JSON.parse(line.slice(6));
              fullResponse += data.response || data.text || "";

              setMessages((prev) => {
                const newMessages = [...prev];
                const lastMessage = newMessages[newMessages.length - 1];
                lastMessage.content = fullResponse;
                // Set loading to false after receiving first chunk
                if (isFirstChunk) {
                  lastMessage.loading = false;
                  isFirstChunk = false;
                }
                return newMessages;
              });
            } catch (e) {
              console.error("Error parsing JSON:", e);
            }
          }
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        prev[0], // Keep user message
        {
          role: "assistant",
          content: `Error: ${error.message}`,
          loading: false,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div>
        <div className="max-w-3xl mx-auto">
          <div className="flex items-end gap-2 relative p-4">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Send a message"
              rows="1"
              className="flex-1 resize-none border border-neutral-200 p-3 pr-10
                       text-neutral-900 focus:outline-none focus:border-neutral-400
                       text-sm max-h-36 overflow-y-auto"
              style={{ minHeight: "44px" }}
            />
            <button
              onClick={sendMessage}
              disabled={isLoading || !message.trim()}
              className={`absolute right-6 bottom-7 p-1 ${
                isLoading || !message.trim()
                  ? "text-neutral-300"
                  : "text-neutral-900 hover:text-neutral-600"
              }`}
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {messages.map((msg, index) => (
          <div key={index} className="px-4 py-6 ">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-start gap-4">
                <div className="size-8 bg-neutral-900 flex-shrink-0 flex items-center justify-center text-white font-medium">
                  {msg.role === "user" ? "U" : "A"}
                </div>
                <div className="flex-1 font-mono text-sm">
                  {msg.loading ? (
                    <div className="flex items-center gap-2 text-neutral-500">
                      <Loader className="h-4 w-4 animate-spin" />
                    </div>
                  ) : (
                    msg.content
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
