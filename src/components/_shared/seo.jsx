import Head from "next/head";

export default function Seo({
  title = "LmScale",
  description = "Scale your AI applications with LmScale",
  path = "",
}) {
  const fullTitle = title === "LmScale" ? title : `${title} | LmScale`;
  const url = `https://lmscale.com${path}`;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />

      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
    </Head>
  );
}
