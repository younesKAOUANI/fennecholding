import Title from "@/components/main/Title";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head 
      >
        <title>Fennec Holding</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
