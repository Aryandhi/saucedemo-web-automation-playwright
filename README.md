# Marketplace SauceDemo Automation

Repositori ini berisi automation test untuk aplikasi demo SauceDemo menggunakan Playwright.

## 📌 Deskripsi

Project ini adalah automation testing suite untuk marketplace SauceDemo. Skrip ditulis dengan Playwright dan disusun dengan pola Page Object Model untuk menjaga maintainability.

## 🚀 Fitur Utama

- Otomatisasi login pengguna
- Pengujian alur checkout
- Verifikasi produk di halaman inventory
- Struktur Page Object untuk halaman seperti `login`, `inventory`, dan `checkout`

## 📁 Struktur Proyek

- `pages/` - definisi Page Object Model untuk halaman web
- `tests/` - test suite Playwright
- `test-data/` - data uji seperti pengguna
- `playwright.config.js` - konfigurasi Playwright
- `playwright-report/` - hasil laporan test secara default

## ⚙️ Prasyarat

- Node.js 18+ atau versi terbaru yang kompatibel
- npm

## 💻 Instalasi

1. Clone repository:
   ```bash
   git clone <url-repo-anda>
   cd marketplace-saucedemo
   ```

2. Install dependensi:
   ```bash
   npm install
   ```

3. Jika menggunakan variabel lingkungan, pastikan buat file `.env` jika diperlukan.

## ▶️ Menjalankan Test

Untuk menjalankan semua test Playwright:

```bash
npx playwright test
```

Jika ingin membuka laporan HTML setelah test selesai:

```bash
npx playwright show-report
```

## 📌 Catatan

- `package.json` saat ini hanya berisi `devDependencies` untuk Playwright, Node.js types, dan dotenv.
- Jika ingin menambahkan skrip npm, tambahkan di bagian `scripts` pada `package.json`.

## 📝 Kontak

Isi informasi kontak atau dokumentasi tambahan sesuai kebutuhan.
