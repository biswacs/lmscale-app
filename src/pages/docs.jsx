import React from "react";
import Head from "next/head";
import { BookOpen, Code, FileText, Cpu, Terminal } from "lucide-react";

const DocSection = ({ icon: Icon, title, children }) => (
  <div className="mb-12">
    <div className="flex items-center gap-2 mb-4">
      <Icon className="h-5 w-5 text-neutral-800" />
      <h2 className="text-xl font-light text-neutral-800">{title}</h2>
    </div>
    {children}
  </div>
);

const CodeBlock = ({ children }) => (
  <div className="bg-white border border-neutral-200 p-4 font-mono text-sm text-neutral-600 mb-4 overflow-x-auto">
    <pre>{children}</pre>
  </div>
);

export default function DocsPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: "Getting Started with LmScale - AI Agent Configuration Guide",
    description:
      "Learn how to create, configure, and deploy AI agents using LmScale's platform. Complete guide for system prompts, instructions, functions, and API integration.",
    keywords:
      "AI agents, LmScale, system prompts, API integration, AI deployment, custom instructions",
    author: {
      "@type": "Organization",
      name: "LmScale",
    },
    publisher: {
      "@type": "Organization",
      name: "LmScale",
      logo: {
        "@type": "ImageObject",
        url: "https://lmscale.com/logo.png",
      },
    },
  };

  return (
    <>
      <Head>
        <title>
          LmScale Documentation - Create and Deploy AI Agents | Technical Guide
        </title>
        <meta
          name="description"
          content="Comprehensive guide for creating and deploying AI agents with LmScale. Learn about system prompts, custom instructions, function integration, and API deployment."
        />
        <meta
          name="keywords"
          content="AI agents, LmScale documentation, system prompts, custom instructions, AI deployment, API integration, technical documentation"
        />

        <meta
          property="og:title"
          content="LmScale Documentation - Create and Deploy AI Agents"
        />
        <meta
          property="og:description"
          content="Complete technical guide for creating and deploying AI agents with LmScale's platform. Learn about system prompts, instructions, and API integration."
        />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://lmscale.com/docs" />
        <meta
          property="og:image"
          content="https://lmscale.com/docs-preview.jpg"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="LmScale Documentation - AI Agent Configuration Guide"
        />
        <meta
          name="twitter:description"
          content="Learn how to create and deploy AI agents using LmScale. Complete guide for system prompts, instructions, and API integration."
        />
        <meta
          name="twitter:image"
          content="https://lmscale.com/docs-preview.jpg"
        />

        <link rel="canonical" href="https://lmscale.com/docs" />

        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Head>
      <div className="min-h-screen bg-white" role="main">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center space-x-2 text-sm text-neutral-600">
              <li>
                <a href="/" className="hover:text-neutral-900">
                  Home
                </a>
              </li>
              <li>/</li>
              <li>
                <a href="/docs" className="hover:text-neutral-900">
                  Documentation
                </a>
              </li>
            </ol>
          </nav>
          <div className="mb-12 text-center">
            <div className="inline-flex items-center border border-black/10 px-4 py-1.5 text-sm text-neutral-800 mb-6">
              <BookOpen className="mr-2 h-4 w-4" />
              Documentation
            </div>
            <h1 className="text-4xl font-light text-neutral-800 mb-4">
              Getting Started with LmScale
            </h1>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Learn how to create, configure, and deploy your AI agents using
              LmScale's platform
            </p>
          </div>

          <DocSection icon={Terminal} title="Quick Start">
            <div className="prose prose-neutral max-w-none">
              <p className="text-neutral-600">
                LmScale allows you to create and deploy AI agents with custom
                instructions, functions, and system prompts. Follow these steps
                to get started:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
                {[
                  {
                    title: "Create Agent",
                    description:
                      "Set up a new AI agent with a unique name and configuration",
                  },
                  {
                    title: "Configure Settings",
                    description:
                      "Add instructions, functions, and system prompts",
                  },
                  {
                    title: "Deploy & Integrate",
                    description:
                      "Get your API key and integrate with your application",
                  },
                ].map((step, i) => (
                  <div
                    key={i}
                    className="bg-white p-6 border border-neutral-200"
                  >
                    <div className="text-2xl font-light text-neutral-800 mb-2">
                      {i + 1}
                    </div>
                    <h3 className="font-medium text-neutral-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-neutral-600">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </DocSection>

          <DocSection icon={FileText} title="System Prompts">
            <p className="text-neutral-600 mb-4">
              System prompts define your agent's core behavior and personality.
              They're the foundation of how your agent will interact with users.
            </p>

            <CodeBlock>
              {`// Set system prompt
{
  "systemPrompt": "You are a helpful customer service assistant that specializes in technical support.
  Your responses should be professional, accurate, and focused on resolving user issues efficiently.
  When handling technical problems:
  1. Ask clarifying questions when needed
  2. Provide step-by-step solutions
  3. Explain technical concepts in simple terms"
}`}
            </CodeBlock>
          </DocSection>

          <DocSection icon={Code} title="Instructions">
            <p className="text-neutral-600 mb-4">
              Instructions provide specific guidelines for your agent's behavior
              and responses. They help maintain consistency and ensure proper
              handling of different scenarios.
            </p>

            <CodeBlock>
              {`// Add instructions
[
  {
    "name": "Security Protocol",
    "content": "Never share sensitive information. Verify user identity before providing account details."
  },
  {
    "name": "Response Format",
    "content": "Maintain a professional tone. Use markdown for formatting code snippets and lists."
  }
]`}
            </CodeBlock>
          </DocSection>

          <DocSection icon={Cpu} title="Functions">
            <p className="text-neutral-600 mb-4">
              Functions enable your agent to perform specific actions or
              retrieve external data. Define functions that your agent can call
              during conversations.
            </p>

            <CodeBlock>
              {`// Register functions
{
  "functions": [
    {
      "name": "search_knowledge_base",
      "description": "Search internal documentation for relevant information",
      "parameters": {
        "query": "string",
        "max_results": "number"
      }
    },
    {
      "name": "create_support_ticket",
      "description": "Create a new support ticket in the system",
      "parameters": {
        "user_id": "string",
        "issue": "string",
        "priority": "string"
      }
    }
  ]
}`}
            </CodeBlock>
          </DocSection>

          <DocSection icon={Terminal} title="API Integration">
            <p className="text-neutral-600 mb-4">
              Once configured, integrate your agent using our REST API. Here's
              an example of how to make API calls to your agent:
            </p>

            <CodeBlock>
              {`curl -X POST "https://api.lmscale.tech/v1/chat/completion" \\
-H "Content-Type: application/json" \\
-H "Accept: text/event-stream" \\
-H "x-api-key: your_api_key" \\
-d '{
  "message": "What are the system requirements?",
  "conversation": [
    {
      "role": "user",
      "content": "Hi, I need help with installation"
    }
  ]
}'`}
            </CodeBlock>

            <div className="bg-neutral-50 border border-neutral-200 p-6 mt-8">
              <h4 className="text-lg font-medium text-neutral-900 mb-4">
                Response Format
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="text-sm font-medium text-neutral-700 mb-2">
                    Success Response
                  </h5>
                  <CodeBlock>
                    {`{
  "id": "resp_123",
  "content": "...",
  "role": "assistant"
}`}
                  </CodeBlock>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-neutral-700 mb-2">
                    Error Response
                  </h5>
                  <CodeBlock>
                    {`{
  "error": {
    "code": "invalid_request",
    "message": "..."
  }
}`}
                  </CodeBlock>
                </div>
              </div>
            </div>
          </DocSection>
        </div>
      </div>
    </>
  );
}
