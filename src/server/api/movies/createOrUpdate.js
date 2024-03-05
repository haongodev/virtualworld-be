
export async function createOrUpdate(data) {
    return (await fetch(`/api/movie/createOrUpdate`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(
      (res) => res.json()
    ))
}