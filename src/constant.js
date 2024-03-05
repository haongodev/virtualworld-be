export const Config = {
    languages : [
        { id: 1, name: 'English', code: 'en', flag: "https://flagcdn.com/us.svg" },
        { id: 2, name: 'Việt Nam', code: 'vi', flag: "https://flagcdn.com/vn.svg" }
    ],
    email: "tvphimhot@gmail.com",
    phone: "phimhotttcom",
};

export const moviePerPage = {
    search_take:10,
    banner_take:10,
    hot_take:15,
    cinema_take:10,
    series_take:8,
    single_take:15,
    populary_take:9,
    ramdom_take:8,
    movie_take_by_type:30,
    movie_take_by_category:30,
    movie_take_by_country:30,
    movie_take_by_year:30,
}

export const LanguagesSupport = ['en', 'vi'];
export const DefaultLanguage = process.env.DEFAULT_LANGUAGE;
