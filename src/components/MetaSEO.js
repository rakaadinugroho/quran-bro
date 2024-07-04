import Head from "next/head";

export default function MetaSEO ({title, url = "https://www.quranbro.xyz"}) {
    const urlScheme = new URL(url);
    const constructTitle = `Baca Surat ${title} dengan Terjemahan dan Tafsir Indonesia Online`;
    const constructDescription = `Baca dan dengarkan Surat Al-Baqarah lengkap dengan terjemahan dan audio. Pelajari makna dan tafsir Surat Al-Baqarah secara online di ${urlScheme.host}`;
    const constructKeywords = `Surat ${title}, ${title}, baca Surat ${title}, dengarkan Surat ${title}, terjemahan Surat ${title}, tafsir Surat ${title}`;
    const imageUrl = encodeURI(`https://dynamic-og-image-generator.vercel.app/api/generate?title=${constructTitle}&author=Baca+Quran+Online&websiteUrl=${url}&avatar=&theme=github`);

    return (
        <Head>
            <title>{constructTitle}</title>
            <meta charSet="UTF-8"/>
            <meta name="description" content={constructDescription}/>
            <meta name="keywords" content={constructKeywords}/>

            <link rel="canonical" href={url}/>
            <meta name="robots" content="index, follow"/>


            <meta name="og:title" content={constructTitle}/>
            <meta name="og:description" content={constructDescription}/>
            <meta name="og:url" content={url}/>
            <meta name="og:image" content={imageUrl}/>
            <meta name="og:type" content="website"/>
            <meta property="og:image:alt" content={constructTitle}/>
            <meta property="og:site_name" content={urlScheme.host}/>

            <script type="application/ld+json">
                {JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'WebPage',
                'name': `Surat ${title} - Baca dan Dengarkan Surat ${title} Online`,
                'description': `Baca dan dengarkan Surat ${title} lengkap dengan terjemahan dan audio. Pelajari makna dan tafsir Surat ${title} secara online di ${url}`,
                'url': url,
                'image': imageUrl})}
            </script>

        </Head>
    )
};