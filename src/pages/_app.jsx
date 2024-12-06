import RootProvider from "@/providers/root-provider";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <RootProvider>
      <Component {...pageProps} />
    </RootProvider>
  );
}
