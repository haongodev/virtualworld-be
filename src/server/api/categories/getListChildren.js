
export async function getListChildren(store_id,ids) {
    return (await fetch(`/api/${store_id}/category/${ids}`).then(
      (res) => res.json()
    ))
}