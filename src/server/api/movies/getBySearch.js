
export async function getBySearch(queryKey) {
    return (await fetch(`/api/movie/getBySearch`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(queryKey),
    }).then(
      (res) => res.json()
    ))
}