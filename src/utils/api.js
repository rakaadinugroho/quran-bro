export const fetchSurahList = async () => {
    const response = await fetch('https://quran-api.santrikoding.com/api/surah');
    const data = await response.json();
    return data;
};

export const fetchSurahDetail = async (nomor) => {
    const response = await fetch(`https://quran-api.santrikoding.com/api/surah/${nomor}`);
    const data = await response.json();
    return data;
};