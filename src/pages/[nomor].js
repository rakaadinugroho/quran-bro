import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { fetchSurahDetail, fetchSurahList } from "@/utils/api";
import NavBar from "@/components/NavBar";
import SurahList from "@/components/app/SurahList";
import SurahDetail from "@/components/app/SurahDetail";
import MetaSEO from "@/components/MetaSEO";

export async function getStaticPaths() {
    const dataUrl = await fetchSurahList();

    const paths = dataUrl.map((surah) => ({
        params: { nomor: surah.nomor.toString() },
    }))

    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
    try {
        const surahId = params.nomor || 1;
        const [surahList, surahDetail] = await Promise.all([
            fetchSurahList(),
            fetchSurahDetail(surahId),
        ]);

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
    const { nomor = 1 } = router.query;

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    useEffect(() => {
        const fethSurah = async () => {
            if (nomor && (!surahDetail || surahDetail.nomor !== nomor)) {
                setLoading(true);
                const data = await fetchSurahDetail(nomor);
                setSelectedSurah(data);
                setLoading(false);
            }
        };

        fethSurah();
    }, [nomor, surahDetail]);

    return (
        <>
            <MetaSEO
                title={selectedSurah.nama_latin || ""}
                description={`Baca Surat ${selectedSurah.nama_latin || ""} Online Gratis`}
                url={"https://quranbro.com"}
                keywords={`${selectedSurah.nama_latin}, Baca ${selectedSurah.nama_latin}, Arti Surat ${selectedSurah.nama_latin}`}
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