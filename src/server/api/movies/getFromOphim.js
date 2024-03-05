
export async function getFromOphim(slug) {
    return (await fetch(`${process.env.OPHIM_URL}/phim/` + slug).then(
      (res) => res.json()
    ))
}