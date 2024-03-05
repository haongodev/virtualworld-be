export async function storeOrUpdate(store_id,data) {
    return (await fetch(`/api/${store_id}/customer/${data.customer_id}/address/storeOrUpdate`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(
      (res) => res.json()
    ))
}