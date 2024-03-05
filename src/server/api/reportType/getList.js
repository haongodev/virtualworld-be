export async function getList(queryKey) {
    return (await fetch(`/api/reportType/getList`).then(
      (res) => res.json()
    ))
}