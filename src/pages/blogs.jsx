import React from "react";
import Head from "next/head";
import Link from "next/link";
import { Clock, ChevronRight, Tag, BookOpen } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "Getting Started with Local Large Language Models: A Complete Guide",
    slug: "getting-started-local-llms",
    excerpt:
      "Learn how to effectively deploy and manage local LLMs for your enterprise applications. We'll cover key considerations, best practices, and optimization techniques.",
    date: "2025-01-15",
    readTime: "8 min read",
    category: "Technical Guide",
    author: {
      name: "Sarah Chen",
      role: "AI Engineer at LmScale",
    },
    tags: ["LLMs", "Deployment", "Enterprise AI"],
  },
  {
    id: 2,
    title: "Why Enterprise Companies Are Moving to Local LLM Deployment",
    slug: "enterprise-local-llm-benefits",
    excerpt:
      "Discover the key benefits of deploying LLMs locally, from data privacy and cost optimization to reduced latency and customization capabilities.",
    date: "2025-01-12",
    readTime: "6 min read",
    category: "Industry Insights",
    author: {
      name: "Michael Ross",
      role: "Product Manager at LmScale",
    },
    tags: ["Enterprise", "Security", "Cost Optimization"],
  },
  {
    id: 3,
    title: "Building Production-Ready AI Systems with LmScale",
    slug: "production-ready-ai-systems",
    excerpt:
      "A step-by-step guide to building robust AI systems that can handle enterprise workloads. Learn about scaling, monitoring, and maintenance.",
    date: "2025-01-08",
    readTime: "10 min read",
    category: "Tutorial",
    author: {
      name: "Alex Turner",
      role: "Solutions Architect",
    },
    tags: ["Production", "Scaling", "Architecture"],
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "LmScale Blog",
  description:
    "Latest insights, tutorials and guides about AI deployment, LLMs, and enterprise AI solutions",
  publisher: {
    "@type": "Organization",
    name: "LmScale",
    logo: {
      "@type": "ImageObject",
      url: "https://lmscale.com/logo.png",
    },
  },
  blogPosts: blogPosts.map((post) => ({
    "@type": "BlogPosting",
    headline: post.title,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: post.author.name,
    },
  })),
};

export default function BlogPage() {
  return (
    <>
      <Head>
        <title>LmScale Blog - AI Deployment & LLM Insights</title>
        <meta
          name="description"
          content="Explore the latest insights about AI deployment, local LLMs, and enterprise AI solutions. Technical guides, tutorials, and industry best practices."
        />
        <meta
          name="keywords"
          content="AI deployment, LLMs, enterprise AI, machine learning, technical guides, tutorials"
        />
        <link rel="canonical" href="https://lmscale.com/blog" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Head>

      <main className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 pt-8">
          <nav className="flex text-neutral-600" aria-label="Breadcrumb">
            <ol className="flex items-center text-sm space-x-4">
              <li>
                <Link href="/" className="hover:text-neutral-900">
                  Home
                </Link>
              </li>
              <li className="flex items-center space-x-4">
                <span>/</span>
                <Link href="/blogs" className="hover:text-neutral-900">
                  Blog
                </Link>
              </li>
            </ol>
          </nav>
        </div>
        <div className="relative py-24 overflow-hidden">
          <div className="absolute inset-0">
            <div
              className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:24px_24px] md:bg-[size:32px_32px]"
              style={{
                mask: "radial-gradient(circle at center, white 30%, transparent 70%)",
                WebkitMask:
                  "radial-gradient(circle at center, white 30%, transparent 70%)",
              }}
            />
          </div>

          <div className="relative max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-flex items-center border border-black/10 px-4 py-1.5 text-sm text-neutral-800 mb-6">
                <BookOpen className="mr-2 h-4 w-4" />
                Latest Insights
              </div>
              <h1 className="text-4xl lg:text-5xl font-light text-neutral-900 mb-4">
                AI Deployment Insights
              </h1>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                Explore our latest articles about AI deployment, local LLMs, and
                enterprise solutions
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <article
                  key={post.id}
                  className="group bg-white border border-neutral-200 hover:border-neutral-300 transition-all duration-300"
                >
                  <Link href={`/blogs/#`} className="block p-6">
                    <div className="flex items-center gap-2 text-sm text-neutral-600 mb-4">
                      <span className="bg-neutral-100 px-2 py-1 text-neutral-800">
                        {post.category}
                      </span>
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {post.readTime}
                      </span>
                    </div>

                    <h2 className="text-xl text-neutral-900 font-medium mb-3 group-hover:text-neutral-600 transition-colors">
                      {post.title}
                    </h2>

                    <p className="text-neutral-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center text-xs text-neutral-600"
                        >
                          <Tag className="h-3 w-3 mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                      <div>
                        <p className="font-medium text-neutral-900">
                          {post.author.name}
                        </p>
                        <p className="text-sm text-neutral-600">
                          {post.author.role}
                        </p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-neutral-400 group-hover:text-neutral-900 transition-colors" />
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </div>

        <section className="bg-neutral-50 py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center">
              <h2 className="text-2xl font-light text-neutral-900 mb-4">
                Stay Updated
              </h2>
              <p className="text-neutral-600 mb-8">
                Get the latest insights about AI deployment and enterprise
                solutions
              </p>

              <div className="max-w-md mx-auto">
                <form className="flex gap-4">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 h-12 px-4 border border-neutral-200 focus:ring-1 focus:ring-neutral-400"
                  />
                  <button
                    type="submit"
                    className="px-6 bg-neutral-900 text-white hover:bg-neutral-800"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
