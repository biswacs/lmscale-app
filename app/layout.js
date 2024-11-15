export const metadata = {
  title: "LmCloud",
  description:
    "LmCloud is an enterprise-grade platform for deploying, managing, and scaling local language models (LLMs) in the cloud. Get started with secure, high-performance AI infrastructure built for production.",
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
    title: "LmCloud - Deploy & Scale Local LLMs in the Cloud",
    description:
      "Enterprise-grade platform for deploying and scaling local language models with industry-leading performance, security, and reliability.",
    url: "https://lmcloud.ai", // Replace with your actual domain
    siteName: "LmCloud",
    images: [
      {
        url: "/og-image.png", // Replace with your actual OG image path
        width: 1200,
        height: 630,
        alt: "LmCloud Platform Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LmCloud - Deploy & Scale Local LLMs in the Cloud",
    description:
      "Enterprise-grade platform for deploying and scaling local language models with industry-leading performance, security, and reliability.",
    images: ["/twitter-image.png"], // Replace with your actual Twitter card image path
    creator: "@lmcloud", // Replace with your Twitter handle
  },
  alternates: {
    canonical: "https://lmcloud.ai", // Replace with your actual domain
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
  verification: {
    google: "your-google-verification-code", // Replace with actual verification code
    yandex: "your-yandex-verification-code", // Replace with actual verification code
    yahoo: "your-yahoo-verification-code", // Replace with actual verification code
  },
};

import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />

        {/* Preconnect to important third-party domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Schema.org markup for rich results */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "LmCloud",
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
