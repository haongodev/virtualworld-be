
export const responseConfigs = (configs) => configs.map((config) => ({
    id: config.id,
    group: config.group,
    code: config.code,
    key: config.key,
    value: config.value,
    detail: config.detail,
}))