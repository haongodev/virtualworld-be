
export async function checkSource(queryKey) {
  return (await fetch(`/api/movie/checkSource?` + new URLSearchParams(queryKey).toString()).then(
    (res) => res.json()
  ))
}