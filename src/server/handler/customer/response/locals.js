export const responseLocal = (local) => {
    return {
        id: local.id,
        code: local.code,
        name: local.name,
        full_name: local.full_name,
        name_en: local.name_en,
    }
}

export const responseLocals = (locals) => locals.map((local) => responseLocal(local));