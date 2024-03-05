export async function getAdminAuth() {
    return (await fetch("/api/auth/session?supreme=1").then(
      (res) => res.json()
    ))
}
