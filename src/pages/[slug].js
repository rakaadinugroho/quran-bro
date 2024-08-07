import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { fetchSurahDetail, fetchSurahList } from "@/utils/api";
import NavBar from "@/components/NavBar";
import SurahList from "@/components/app/SurahList";
import SurahDetail from "@/components/app/SurahDetail";
import MetaSEO from "@/components/MetaSEO";
import {getSlug, routesMapper} from "@/utils/routerslug";

export async function getStaticPaths() {
    const dataUrl = await fetchSurahList();

    const paths = dataUrl.map((surah) => ({
        params: { slug: getSlug(surah.nama_latin) },
    }))

    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
    try {
        const slug = params.slug || 'al-fatihah';
        const surahList = await fetchSurahList();
        const surahId = routesMapper(surahList, slug);
        const surahDetail = await fetchSurahDetail(surahId);

        return { props: { surahData: surahList, surahDetail: surahDetail } };
    } catch (e) {
        return { props: { surahData: [], surahDetail: {} } };
    }
}

export default function SurahDetailPage({ surahData, surahDetail }) {
    const [selectedSurah, setSelectedSurah] = useState(surahDetail);
    const [loading, setLoading] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    const router = useRouter();
    const { slug = "" } = router.query;

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    useEffect(() => {
        const fetchSurah = async () => {
            if ((slug && (selectedSurah && slug !== getSlug(selectedSurah.nama_latin)))) {
                setLoading(true);

                const surahId = routesMapper(surahData, slug);
                const data = await fetchSurahDetail(surahId);
                setSelectedSurah(data);
                setLoading(false);
            }
        };

        fetchSurah();
    }, [slug, selectedSurah, surahDetail]);

    return (
        <>
            <MetaSEO
                title={selectedSurah.nama_latin || ""}
                url={`https://www.quranbro.xyz/${slug}`}
            />
            <NavBar
                darkMode={darkMode}
                setDarkMode={setDarkMode}
            />
            <div className="flex h-screen">
                <SurahList surahData={surahData} />
                <SurahDetail surahDetail={selectedSurah} loading={loading} />
            </div>
        </>
    );
}