// src/api/axios.ts
import axios from 'axios'

const api = axios.create({
  baseURL: 'https://localhost:7045', // atau pakai IP/domain produksi
})

export default api