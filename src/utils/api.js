export const fetchSurahList = async () => {
    const response = await fetch('https://quran-api.santrikoding.com/api/surah');
    return response.json();
};

export const fetchSurahDetail = async (nomor) => {
    const response = await fetch(`https://quran-api.santrikoding.com/api/surah/${nomor}`);
    return response.json();
};