
export const responseStaticPage = (page) => {
    return {
        id: page.id,
        store_name: page.store_name,
        slug: page.slug,
        classes_swiper: page.classes_swiper,
        form: page.form,
        map_iframe: page.map_iframe,
        is_use_address: page.is_use_address,
        is_use_form: page.is_use_form,
        is_use_swiper: page.is_use_swiper,
        is_use_map: page.is_use_map,
        description: page.description ? page.description[0] : null,
    }
}
export const responseStaticPages = (pages) => pages.map((page) => responseStaticPage(page));