export async function destroy(store_id,{customer_id,address_id}) {
    return (await fetch(`/api/${store_id}/customer/${customer_id}/address/destroy/${address_id}`).then(
      (res) => res.json()
    ))
}