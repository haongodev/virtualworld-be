export const responseAttributeGroup = (attrs) => attrs.map((attr) => ({
    id: attr.id,
    name: attr.name,
    type: attr.type,
    multiple: attr.multiple,
}))