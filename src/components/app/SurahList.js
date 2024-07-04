import Link from "next/link";
import { ChevronRightIcon } from "@/components/Icons";
import {getSlug} from "@/utils/routerslug";

export default function SurahList({ surahData }) {
    return (
        <div className="w-64 bg-gray-100 dark:bg-gray-700 p-4 overflow-auto">
            <div className="space-y-2">
                {surahData.map((surah) => (
                    <Link
                        key={surah.nomor}
                        className="w-full text-left  px-4 py-2 transition-colors"
                        href={`/${getSlug(surah.nama_latin)}`}
                        target="_self"
                    >
                        <div className="flex justify-between rounded-md hover:bg-white items-center">
                            <div>
                                <div className="text-lg font-semibold">{surah.nama}</div>
                                <div className="text-sm text-gray-400">{surah.nama_latin}</div>
                            </div>
                            <ChevronRightIcon className="w-4 h-4 text-gray-400" />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}