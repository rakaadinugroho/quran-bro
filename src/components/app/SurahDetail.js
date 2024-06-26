export default function SurahDetail({ surahDetail, loading }) {
    if (loading) {
        return (
            <div className="flex-1 p-4 overflow-auto">
                <p className="text-gray-500">Sedang mengambil data ...</p>
            </div>
        );
    }

    if (!surahDetail) {
        return (
            <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">Pilih surat yang ingin dibaca</p>
            </div>
        );
    }

    return (
        <div className="flex-1 p-4 overflow-auto">
            <div className="mb-6">
                <div className="text-2xl font-bold">{surahDetail.nama}</div>
                <h1 className="text-sm text-gray-500">Surat {surahDetail.nama_latin}</h1>
            </div>
            <div className="space-y-6">
                {surahDetail.ayat.map((verse) => (
                    <div key={verse.nomor} className="p-4 border rounded-lg shadow mb-4">
                        <div className="text-2xl text-right font-semibold">{verse.ar}</div>
                        <div className="text-sm text-gray-500">{verse.idn}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
