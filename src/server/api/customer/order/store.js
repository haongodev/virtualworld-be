export async function store(body) {
    return (await fetch(`/api/${body.store_id}/customer/${body.customer_id}/order/store`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    }).then(
        (res) => res.json()
    ))
}