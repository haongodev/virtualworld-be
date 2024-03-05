export async function storeOrUpdate(cart,customer_id) {
    return (await fetch(`/api/${cart.store_id}/customer/${customer_id}/cart/storeOrUpdate`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cart),
    }))
}