import { getList as getListCategories } from '@/src/server/handler/categories/getList';
import { getList } from '@/src/server/handler/type/getList';
import { getList as getListCountries } from '@/src/server/handler/countries/getList';
import { getList as getListMovie } from '@/src/server/handler/movies/getList';
import moment from 'moment';

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_URL;

    // Get All Categories
    const categoriesStore = await getListCategories();
    const categoryUrls = categoriesStore?.map((category) => {
        return {
            url: `${baseUrl}/danh-muc/${category.slug}`,
            lastModified: category.updatedAt,
        };
    }) ?? [];
    // Get All Types
    const typesStore = await getList();
    const typesUrls = typesStore?.map((type) => {
        return {
            url: `${baseUrl}/the-loai/${type.slug}`,
            lastModified: type.updatedAt ?? new Date(),
        };
    }) ?? [];

    // Get All Types
    const countryStore = await getListCountries();
    const countryUrls = countryStore?.map((count) => {
        return {
            url: `${baseUrl}/quoc-gia/${count.slug}`,
            lastModified: count.updatedAt ?? new Date(),
        };
    }) ?? [];

    // Get year Publish
    const currentYear = moment().year();
    const years = [];
    for (let year = 1975; year <= currentYear; year++) {
        years.push(year);
    }
    const yearUrls = years?.map((year) => {
        return {
            url: `${baseUrl}/nam-phat-hanh/${year}`,
            lastModified: new Date(),
        };
    }) ?? [];

    // Get All Movie
    const movieStore = await getListMovie();
    const movieUrls = movieStore?.map((movie) => {
        return {
            url: `${baseUrl}/xem-phim/${movie.slug}`,
            lastModified: movie.updatedAt ?? new Date(),
        };
    }) ?? [];

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    ...categoryUrls,
    ...typesUrls,
    ...countryUrls,
    ...yearUrls,
    ...movieUrls
  ];
}