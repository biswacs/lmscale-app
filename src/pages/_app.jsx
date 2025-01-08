import Head from "next/head";
import RootProvider from "@/providers/root-provider";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <RootProvider>
      <Head>
        <title>LmScale</title>
        <meta
          name="description"
          content="Scale your AI applications with LmScale"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="LmScale" />
        <meta property="og:title" content="LmScale" />
        <meta
          property="og:description"
          content="Scale your AI applications with LmScale"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="LmScale" />
        <meta
          name="twitter:description"
          content="Scale your AI applications with LmScale"
        />
      </Head>
      <Component {...pageProps} />
    </RootProvider>
  );
}
