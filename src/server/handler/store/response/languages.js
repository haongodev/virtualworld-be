export const responseLanguages = (languages) => languages.map((language) => ({
    id: language.id,
    name: language.name,
    code: language.code,
    flag: language.flag,
}))