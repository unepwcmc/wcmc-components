export const setAxiosHeaders = (axios, type) => {
  //if rails application
  const token = document.head.querySelector('meta[name="csrf-token"]')

  if (token) {
    axios.defaults.headers.common['X-CSRF-Token'] = token.content
  }

  if(type == 'download') {
    axios.defaults.headers.common['Accept'] = 'text/csv'
    axios.defaults.headers.common['responseType'] = 'blob'
  }
}