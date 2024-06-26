import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" title="Quran Bro" about="Quran Bro">
        <Head title="Quran Bro">
            <meta charSet="UTF-8"/>
            <meta name="description" content="Aplikasi Baca Quran Online"/>
            <meta name="keywords" content="Quran, Quran Online, Quran"/>

            <meta name="og:title" content="Quran Bro"/>
            <meta name="og:description" content="Aplikasi Baca Quran Online"/>
            <meta name="og:url" content="https://quran-bro.com"/>
            <meta name="og:image" content=""/>
            <meta name="og:type" content="website"/>
        </Head>
        <body>
        <Main/>
        <NextScript/>
        </body>
    </Html>
  );
}