export async function getByMovieId(movieId) {
    return (await fetch(`/api/episodes/getByMovieId/` + movieId).then(
      (res) => res.json()
    ))
}