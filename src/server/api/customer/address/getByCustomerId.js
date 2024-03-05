export async function getByCustomerId(store_id,{customer_id}) {
    return (await fetch(`/api/${store_id}/customer/${customer_id}/address/getList`).then(
      (res) => res.json()
    ))
}