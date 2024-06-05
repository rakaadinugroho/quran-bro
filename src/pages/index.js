import { useState, useEffect, useCallback } from "react"
import { fetchSurahList, fetchSurahDetail } from "@/utils/api";
import {useRouter} from "next/navigation";
import Link from "next/link";

export default function Component() {
  const [selectedSurah, setSelectedSurah] = useState(null)
  const [quranData, setQuranData] = useState([])
  const [loading, setLoading] = useState(false)
  const [darkMode, setDarkMode] = useState(false);
  const router = useRouter();

  useEffect(() => {
      const fetchSurahs = async () => {
          const response = await fetch('https://quran-api.santrikoding.com/api/surah');
          const data = await response.json();
          setQuranData(data);
      };

      fetchSurahs();
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleSurahClick = useCallback(async (surah) => {
      setLoading(true);
      const data = await fetchSurahDetail(surah.nomor);
      setSelectedSurah(data);
      setLoading(false);
  }, []);

  return (
    <>
      <nav className="bg-gray-100 dark:bg-gray-700 shadow p-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-gray-900 dark:text-white">
          QuranBro
        </div>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Cari Surat"
            className="p-2 border rounded dark:bg-gray-700 dark:text-white"
            onChange={(e) => onSearch(e.target.value)}
          />
          <button
            className="p-2 bg-gray-500 text-white rounded"
            onClick={() => router.push('/bookmark')}
          >
            Daftar Simpan
          </button>
          <button
            className="p-2 bg-gray-300 dark:bg-gray-600 text-black dark:text-white rounded"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </nav>
      <div className="flex h-screen">
        <div className="w-64 bg-gray-100 dark:bg-gray-700 p-4 overflow-auto">
          <div className="space-y-2">
            {quranData.map((surah) => (
              <button
                key={surah.nomor}
                className="w-full text-left hover:bg-white rounded-md px-4 py-2 transition-colors"
                onClick={() => handleSurahClick(surah)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-lg font-semibold">{surah.nama}</div>
                    <div className="text-sm text-gray-400">{surah.nama_latin}</div>
                  </div>
                  <ChevronRightIcon className="w-4 h-4 text-gray-400" />
                </div>
              </button>
            ))}
          </div>
        </div>
        <div className="flex-1 p-4 overflow-auto">
          {
            loading ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">Loading...</p>
                </div>
            ) : selectedSurah ? (
              <div>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold">{selectedSurah.nameArabic}</h2>
                  <div className="text-sm text-gray-500">{selectedSurah.name}</div>
                </div>
                <div className="space-y-6">
                  {selectedSurah.ayat.map((verse) => (
                    <div key={verse.nomor} className="p-4 border rounded-lg shadow mb-4">
                      <div className="text-2xl text-right font-semibold">{verse.ar}</div>
                      <div className="text-sm text-gray-500">{verse.idn}</div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">Pilih surat yang ingin dibaca</p>
              </div>
          )}
        </div>
      </div>
    </>
  )
}

function ChevronRightIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}

function BookmarkIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
    </svg>
  )
}