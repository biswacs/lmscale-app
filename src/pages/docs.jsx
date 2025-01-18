import React from "react";
import Head from "next/head";
import { BookOpen, Code, FileText, Terminal, Cpu } from "lucide-react";

const DocSection = ({ icon: Icon, title, children }) => (
  <div className="mb-12 p-6 bg-white border border-neutral-200 hover:border-neutral-300 transition-colors">
    <div className="flex items-center gap-3 mb-4">
      <div className="p-2 bg-neutral-50">
        <Icon className="h-5 w-5 text-neutral-800" />
      </div>
      <h2 className="text-xl text-neutral-800">{title}</h2>
    </div>
    <div className="pl-11">{children}</div>
  </div>
);

const CodeBlock = ({ title, children }) => (
  <div className="relative bg-neutral-50 border border-neutral-200 overflow-hidden group">
    {title && (
      <div className="flex items-center justify-between px-4 py-2 bg-neutral-100 border-b border-neutral-200">
        <span className="text-sm text-neutral-600">{title}</span>
      </div>
    )}
    <div className="p-4 font-mono text-sm text-neutral-600 overflow-x-auto">
      <pre className="whitespace-pre-wrap">{children}</pre>
    </div>
  </div>
);

const QuickStartCard = ({ number, title, description }) => (
  <div className="p-6 bg-white border border-neutral-200 hover:shadow-md transition-all">
    <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 text-lg text-neutral-800 mb-3">
      {number}
    </div>
    <h3 className="text-neutral-900 mb-2">{title}</h3>
    <p className="text-sm text-neutral-600">{description}</p>
  </div>
);

const FeatureCard = ({ title, description }) => (
  <div className="bg-white p-6 border border-neutral-200 hover:border-neutral-300 transition-all">
    <h3 className="text-neutral-900 mb-2">{title}</h3>
    <p className="text-sm text-neutral-600">{description}</p>
  </div>
);

export default function DocsPage() {
  return (
    <>
      <Head>
        <title>LmScale Documentation - AI Agent Configuration Guide</title>
        <meta
          name="description"
          content="Learn how to create, configure, and deploy AI agents using LmScale's platform."
        />
      </Head>

      <div className="relative min-h-screen py-12 font-light">
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:14px_14px] sm:bg-[size:24px_24px] md:bg-[size:32px_32px]"
          style={{
            mask: "radial-gradient(circle at center, white 30%, transparent 70%)",
            WebkitMask:
              "radial-gradient(circle at center, white 30%, transparent 70%)",
          }}
        />

        <div className="relative max-w-5xl mx-auto px-4">
          <header className="mb-16 text-center">
            <div className="inline-flex items-center gap-2 border border-neutral-200 px-4 py-1.5 text-sm text-neutral-800 mb-6 bg-white">
              <BookOpen className="h-4 w-4" />
              Documentation
            </div>
            <h1 className="text-4xl font-light text-neutral-800 mb-4">
              Getting Started with LmScale
            </h1>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Learn how to create, configure, and deploy AI agents using our
              platform
            </p>
          </header>

          <div className="space-y-12">
            <DocSection icon={Terminal} title="Quick Start">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <QuickStartCard
                  number={1}
                  title="Create Agent"
                  description="Set up a new AI agent with a unique name and configuration"
                />
                <QuickStartCard
                  number={2}
                  title="Configure Settings"
                  description="Add instructions, functions, and system prompts"
                />
                <QuickStartCard
                  number={3}
                  title="Deploy"
                  description="Get your API key and integrate with your application"
                />
              </div>
            </DocSection>

            <DocSection icon={Cpu} title="Key Features">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <FeatureCard
                  title="Streaming Responses"
                  description="Get real-time responses with server-sent events for a more interactive experience"
                />
                <FeatureCard
                  title="Conversation History"
                  description="Maintain context with full conversation history support"
                />
                <FeatureCard
                  title="Custom Instructions"
                  description="Fine-tune your agent's behavior with detailed system prompts"
                />
                <FeatureCard
                  title="Simple Integration"
                  description="Easy-to-use REST API with comprehensive documentation"
                />
              </div>
            </DocSection>

            <DocSection icon={FileText} title="System Prompts">
              <p className="text-neutral-600 mb-4">
                System prompts define your agent&apos;s core behavior and
                personality. Configure how your agent responds and handles
                different scenarios.
              </p>
              <CodeBlock title="Example System Prompt">
                {`{
  "systemPrompt": "You are a helpful customer service assistant that specializes in technical support.
  Your responses should be professional, accurate, and focused on resolving user issues efficiently.
  When handling technical problems:
  1. Ask clarifying questions when needed
  2. Provide step-by-step solutions
  3. Explain technical concepts in simple terms"
}`}
              </CodeBlock>
            </DocSection>

            <DocSection icon={Code} title="API Integration">
              <p className="text-neutral-600 mb-4">
                Our API supports server-sent events (SSE) for streaming
                responses. Here&apos;s how to integrate:
              </p>
              <CodeBlock title="API Request Example with Streaming">
                {`curl -X POST "https://api.lmscale.tech/v1/chat/completion" \\
-H "Content-Type: application/json" \\
-H "Accept: text/event-stream" \\
-H "x-api-key: your_api_key" \\
-d '{
  "message": "Can you help me choose the right product for my needs?",
  "conversation": [
    {
      "role": "user",
      "content": "hi"
    },
    {
      "role": "ai", 
      "content": "how can i help you?"
    }
  ]
}'`}
              </CodeBlock>

              <div className="mt-6 space-y-6">
                <CodeBlock title="JavaScript Example with Streaming">
                  {`// Example using Fetch API with streaming
const response = await fetch('https://api.lmscale.tech/v1/chat/completion', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'text/event-stream',
    'x-api-key': 'your_api_key'
  },
  body: JSON.stringify({
    message: "Can you help me choose the right product for my needs?",
    conversation: [
      { role: "user", content: "hi" },
      { role: "ai", content: "how can i help you?" }
    ]
  })
});

const reader = response.body.getReader();
const decoder = new TextDecoder();

while (true) {
  const { value, done } = await reader.read();
  if (done) break;
  
  // Process the chunk
  const chunk = decoder.decode(value);
  console.log('Received chunk:', chunk);
}`}
                </CodeBlock>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <CodeBlock title="Stream Chunk Example">
                    {`data: {
  "id": "resp_123",
  "content": "I can help",
  "role": "assistant"
}

data: {
  "id": "resp_123",
  "content": " you choose",
  "role": "assistant"
}

data: {
  "id": "resp_123",
  "content": " the right product.",
  "role": "assistant"
}`}
                  </CodeBlock>
                  <CodeBlock title="Error Response">
                    {`{
  "error": {
    "code": "invalid_request",
    "message": "Invalid API key provided"
  }
}`}
                  </CodeBlock>
                </div>
              </div>
            </DocSection>
          </div>
        </div>
      </div>
    </>
  );
}
