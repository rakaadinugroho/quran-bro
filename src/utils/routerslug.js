import slugify from 'slugify';

export const routesMapper = (mapperConfig = [], slug, key = "nama_latin") => {
    const config = mapperConfig.find(mapperConfig => getSlug(mapperConfig[key]) === slug);
    return config?.nomor || 0;
};

export const getSlug = (rawUrl) => {
    return slugify(rawUrl, {
        lower: true,
        remove: /[*+~.()'"!:@]/g,
        replacement: '-',
        trim: true,
    });
}