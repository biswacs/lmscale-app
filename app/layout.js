export const metadata = {
  title: "LmScale",
  description:
    "LmScale is an enterprise-grade platform for deploying, managing, and scaling local language models (LLMs) in the cloud. Get started with secure, high-performance AI infrastructure built for production.",
  keywords: [
    "LLMs",
    "AI infrastructure",
    "cloud deployment",
    "machine learning",
    "artificial intelligence",
    "model deployment",
    "AI scaling",
    "language models",
    "MLOps",
    "AI platform",
    "model hosting",
    "local LLMs",
  ],
  openGraph: {
    title: "LmScale - Deploy & Scale Local LLMs in the Cloud",
    description:
      "Enterprise-grade platform for deploying and scaling local language models with industry-leading performance, security, and reliability.",
    url: "https://lmscale.com",
    siteName: "LmScale",
    images: [
      {
        url: "/icon.png",
        width: 512,
        height: 512,
        alt: "LmScale Platform Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: "https://lmscale.com",
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
    },
  },
};

import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "LmScale",
            applicationCategory: "AI Platform",
            description:
              "Enterprise-grade platform for deploying and scaling local language models in the cloud",
            operatingSystem: "Cloud",
            offers: {
              "@type": "Offer",
              price: "49",
              priceCurrency: "USD",
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.8",
              ratingCount: "1250",
            },
          })}
        </script>
      </head>
      <body>{children}</body>
    </html>
  );
}
