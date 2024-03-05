export async function getLocals(store_id,{type,code}) {
    return (await fetch(`/api/${store_id}/customer/address/getLocals?type=${type}&code=${code}`).then(
      (res) => res.json()
    ))
}