export async function signUp(store_id,body) {
    return (await fetch(`/api/${store_id}/customer/register`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    }))
}