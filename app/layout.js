import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
  preload: true,
});

export const metadata = {
  title: "LmScale",
  description:
    "Deploy, manage, and scale local language models (LLMs) in the cloud with LmScale. Enterprise-grade platform offering secure, high-performance AI infrastructure with 99.9% uptime guarantee.",
  metadataBase: new URL("https://lmscale.tech"),
  keywords: [
    "LLMs deployment",
    "AI infrastructure platform",
    "enterprise LLM hosting",
    "secure AI deployment",
    "cloud LLM infrastructure",
    "machine learning operations",
    "AI model management",
    "language model scaling",
    "MLOps platform",
    "enterprise AI solutions",
    "local LLM deployment",
    "AI security compliance",
  ],
  authors: [{ name: "LmScale Team" }],
  category: "technology",
  openGraph: {
    title: "LmScale - Enterprise Platform for Local LLM Deployment & Scaling",
    description:
      "Enterprise-grade platform for deploying and scaling local language models with 99.9% uptime, SOC2 compliance, and industry-leading performance.",
    url: "https://lmscale.tech",
    siteName: "LmScale",
    images: [
      {
        url: "/icon.png",
        width: 1200,
        height: 630,
        alt: "LmScale Platform - Enterprise LLM Deployment Solution",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LmScale - Enterprise AI Infrastructure Platform",
    description:
      "Secure, scalable LLM deployment platform for enterprises. Deploy your AI models with confidence.",
    images: ["/twitter-image.png"],
    creator: "@lmscale",
  },
  alternates: {
    canonical: "https://lmscale.tech",
    languages: {
      "en-US": "https://lmscale.tech",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
      notranslate: true,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    bing: "your-bing-verification-code",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#ffffff" />

        {/* Enhanced Schema.org markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "LmScale",
            applicationCategory: "EnterpriseApplication",
            applicationSubCategory: "ArtificialIntelligencePlatform",
            description:
              "Enterprise-grade platform for deploying and scaling local language models in the cloud with advanced security features and high performance.",
            operatingSystem: "Cloud",
            offers: {
              "@type": "Offer",
              price: "49",
              priceCurrency: "USD",
              priceValidUntil: "2024-12-31",
              availability: "https://schema.org/InStock",
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.8",
              ratingCount: "1250",
              bestRating: "5",
              worstRating: "1",
            },
            featureList: [
              "Secure LLM deployment",
              "99.9% uptime guarantee",
              "Enterprise-grade security",
              "Scalable infrastructure",
              "24/7 support",
            ],
            award: "Best AI Infrastructure Platform 2024",
            provider: {
              "@type": "Organization",
              name: "LmScale",
              sameAs: "https://lmscale.tech",
            },
          })}
        </script>
      </head>
      <body className="font-sans antialiased font-light">{children}</body>
    </html>
  );
}
