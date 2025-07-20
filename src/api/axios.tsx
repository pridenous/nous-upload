// src/api/axios.ts
import axios from 'axios'

const urlBase = import.meta.env.VITE_API_URL;

console.log('ini urlBase', urlBase);

const api = axios.create({
  baseURL: urlBase, // atau pakai IP/domain produksi
})

export default api