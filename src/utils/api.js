async function apiFetch (path, fetchOptions) {
  try {
    const result = await fetch(`http://openlibrary.org/${path}`, fetchOptions)
    if (result.ok) {
      const response = await result.json()
      return Promise.resolve(response)
    } else {
      return Promise.reject(result)
    }
  } catch (error) {
    console.log(`Fetch error ${path}`, error)
    return Promise.reject(new Error('Network error: check your connection and try again'))
  }
}

export default apiFetch