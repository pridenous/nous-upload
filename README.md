# 🖼️ Nous Upload Frontend

Frontend aplikasi **Nous Upload**, dibangun menggunakan **Vite + React + TypeScript**. Aplikasi ini berfungsi untuk melakukan upload file ke backend, login dengan Google, dan menampilkan file yang telah diunggah.

---

## 🚀 Teknologi yang Digunakan

- [Vite](https://vitejs.dev/) - Build tool super cepat
- [React](https://reactjs.org/) - Library UI
- [TypeScript](https://www.typescriptlang.org/) - Superset JavaScript
- [Tailwind CSS](https://tailwindcss.com/) *(jika digunakan)*
- [Axios](https://axios-http.com/) - HTTP client
- [Google OAuth](https://developers.google.com/identity) - Login Google
- [React Router](https://reactrouter.com/) - Routing halaman
- [React Hook Form](https://react-hook-form.com/) - Validasi form

---

## 📂 Struktur Folder

```bash
src/
│
├── api/                 # Berisi logic API (axios instance, pemanggilan endpoint)
├── assets/              # Aset seperti gambar/icon
├── blocks/              # Blok UI besar (belum jelas penggunaannya, bisa opsional)
├── components/          # Komponen umum yang bisa digunakan ulang
├── custom-components/   # Komponen kustom yang lebih spesifik
├── helper/              # Fungsi bantu (utility functions)
├── interfaces/          # Deklarasi interface/type untuk TypeScript
├── lib/                 # Pustaka tambahan atau helper terintegrasi
├── pages/               # Halaman view utama (misal: UploadPage, LoginPage)
├── services/            # Layanan seperti auth, penyimpanan token, dll
├── App.css              # Style utama aplikasi
├── App.tsx              # Komponen utama aplikasi
├── index.css            # Global style
├── main.tsx             # Entry point aplikasi
└── vite-env.d.ts        # Deklarasi tipe environment variable



> ⛔️ Jangan lupa tambahkan `.env` ke `.gitignore`

### Akses Variabel di Code:

```ts
const apiBaseUrl = import.meta.env.VITE_API_URL;
const clientId = import.meta.env.VITE_GOOGLE_CLIEN