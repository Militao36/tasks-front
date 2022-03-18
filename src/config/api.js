import axios from 'axios'

const api = axios.create({
  baseURL: 'http://127.0.0.1:3333'
})

api.interceptors.request.use((value) => {
  value.headers = {
      ...value.headers,
      Authorization: `Bearer ${sessionStorage.getItem('token')}`
  }
  return value
})

export { api }
