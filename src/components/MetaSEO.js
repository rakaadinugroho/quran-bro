import Head from "next/head";

export default function MetaSEO ({title, description, keywords = "", url = "https://quranbro.com"}) {
    const constructTitle = `Baca Surat ${title} Online - QuranBro.com`;

    const imageUrl = `https://dynamic-og-image-generator.vercel.app/api/generate?title=${constructTitle}&author=Baca+Quran+Online&websiteUrl=${url}&avatar=https%3A%2F%2Fseeklogo.com%2Fimages%2FQ%2Fquran-logo-E42415D8AF-seeklogo.com.png&theme=github`;

    return (
        <Head>
            <title>{constructTitle}</title>
            <meta charSet="UTF-8"/>
            <meta name="description" content={description}/>
            <meta name="keywords" content={keywords}/>

            <meta name="og:title" content={constructTitle}/>
            <meta name="og:description" content={description}/>
            <meta name="og:url" content={url}/>
            <meta name="og:image" content={imageUrl}/>
            <meta name="og:type" content="website"/>
        </Head>
    )
};