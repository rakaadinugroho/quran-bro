import { useRouter } from "next/router";
import { BookmarkIcon, SunIcon, MoonIcon } from "./Icons";

export default function NavBar({ darkMode, setDarkMode, onSearch }) {
    const router = useRouter();

    return (
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
                    <BookmarkIcon />
                </button>
                <button
                    className="p-2 bg-gray-300 dark:bg-gray-600 text-black dark:text-white rounded"
                    onClick={() => setDarkMode(!darkMode)}
                >
                    {darkMode ? <SunIcon /> : <MoonIcon />}
                </button>
            </div>
        </nav>
    );
}
