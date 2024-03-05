
export const responseAddress = (addr) => {
    return {
        id: addr.id,
        address: addr.address,
        street: addr.street,
        ward_name: addr.ward_name,
        district_name: addr.district_name,
        province_name: addr.province_name,
        country_name: addr.country_name,
        ward_id: addr.ward_id,
        district_id: addr.district_id,
        province_id: addr.province_id,
        country_id: addr.country_id,
        name: addr.name,
        active: addr.active,
        phone: addr.phone
    }
}

export const responseAddresses = (addrs) => addrs.map((addr) => responseAddress(addr));