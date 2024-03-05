import { responseDescription } from "./description";
import { responseAddress } from "./address";
import { responeCategories } from "../../type/response";
import { responseLanguages } from "./languages";
import { responseConfigs } from "./configs";
import { responseAttributeGroup } from "./attribute_group";
import { responseStaticPages } from "../../pageStatic/response/responseStaticPage";
import { responseBanners } from "../../banner/response";
import { responseCurrencies } from "../../currency/response";

export const responseStore = (store) => ({
    id: store.id,
    logo: store.logo,
    picture: store.picture,
    phone: store.phone,
    email: store.email,
    language: store.language,
    domain: store.domain,
    currency: store.currency,
    favicon: store.favicon,
    timezone: store.timezone,
    site_name: store.site_name,
    template: store.template,
    rating_count: store.rating_count,
    rating_point: store.rating_point,
    rating_star: JSON.parse(JSON.stringify(store.rating_star)),
    short_name: store.short_name,
    createdAt: store.createdAt.toUTCString() ?? null,
    updatedAt: store.updatedAt?.toUTCString() ?? null,
    description: store.description ? responseDescription(store.description[0]) : null,
    address: store.address ? responseAddress(store.address) : null,
    categories: store.categories ? responeCategories(store.categories) : null,
    currencies: store.currencies ? responseCurrencies(store.currencies) : null,
    languages: store.languages ? responseLanguages(store.languages) : null,
    banner: store.banner ? responseBanners(store.banner) : null,
    configs: store.configs ? responseConfigs(store.configs) : null,
    attribute_group: store.attribute_group ? responseAttributeGroup(store.attribute_group) : null,
    static_page: store.page_static ? responseStaticPages(store.page_static) : null,
});

export const responseStores = (stores) => stores.map((store) => responseStore(store));