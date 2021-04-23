export const setAxiosHeaders = axios => {
  //if rails application
  const token = document.head.querySelector('meta[name="csrf-token"]')

  if (token) {
    axios.defaults.headers.common['X-CSRF-Token'] = token.content
  }
}