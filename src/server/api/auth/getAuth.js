export async function getAuth(store_id) {
    return (await fetch("/api/auth/session?store_id="+store_id).then(
      (res) => res.json()
    ))
}
