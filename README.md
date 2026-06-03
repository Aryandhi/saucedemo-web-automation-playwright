# SauceDemo — Playwright Automation Suite

Repositori ini berisi kumpulan automated end-to-end tests untuk aplikasi demo SauceDemo, dibangun dengan Playwright dan diorganisir menggunakan pola Page Object Model (POM) untuk kemudahan pemeliharaan.

**Ringkasan singkat**: suite menguji fungsionalitas login, interaksi produk (filter, pencarian, tambah/hapus dari keranjang), dan alur checkout lengkap.

**Playwright**: @playwright/test ^1.59.1

**Bahasa**: JavaScript

**Penggunaan utama**: regression testing, demonstrasi automation best-practices, dan template POM untuk proyek pengujian web.

**Fitur utama**
- Otomatisasi alur login dengan skenario valid/invalid/mandatory-field
- Verifikasi halaman inventory (judul, filter harga)
- Menambahkan / menghapus produk ke/dari keranjang dan pemeriksaan badge keranjang
- Alur checkout (input data pelanggan, verifikasi pesan selesai)
- Struktur Page Object (`pages/login.page.js`, `pages/inventory.page.js`, `pages/checkout.page.js`)
- Data-driven login menggunakan `test-data/users.json`

**Struktur proyek (ringkas)**
- pages/ — Page Object Model untuk halaman web
- tests/ — test suites Playwright (login, product, checkout)
- test-data/ — fixtures / data uji (mis. users.json)
- playwright.config.js — konfigurasi Playwright
- playwright-report/ — laporan HTML hasil eksekusi

## Prasyarat
- Node.js 18+ (direkomendasikan)
- npm atau pnpm

## Instalasi
1. Clone repository

```bash
git clone <url-repo-anda>
cd saucedemo-web-automation-playwright
```

2. Install dependensi

```bash
npm install
```

3. (Opsional) Install browser yang diperlukan oleh Playwright

```bash
npx playwright install
```

## Menjalankan test

- Jalankan seluruh test suite:

```bash
npx playwright test
```

- Menjalankan test tertentu (mis. file):

```bash
npx playwright test tests/login.spec.js
```

- Menjalankan test dan menampilkan laporan HTML setelah selesai:

```bash
npx playwright test && npx playwright show-report
```

## Contoh skrip `package.json` (direkomendasikan)

Tambahkan ke bagian `scripts` pada `package.json` untuk kemudahan:

```json
"scripts": {
  "test": "playwright test",
  "test:report": "playwright test && playwright show-report",
  "install:browsers": "playwright install"
}
```

## Best practices & catatan teknis
- Pattern Page Object digunakan untuk memisahkan logika halaman dari test-case.
- Test data disimpan di `test-data/users.json` untuk mendukung skenario data-driven.
- Beberapa file test menggunakan login langsung via locator (sebagian lain memanfaatkan POM); konsistensi dapat ditingkatkan pada sprint berikutnya.

## Contributing
- Buat issue atau pull request untuk perbaikan skenario, penambahan test, atau perbaikan POM.
- Ikuti konvensi penamaan test di folder `tests/` dan jaga agar test independen dan idempotent.

## CI & Workflow (playwright.yaml / GitHub Actions)

Project ini sudah menyertakan definisi workflow CI untuk menjalankan test Playwright dan mempublikasikan laporan ke GitHub Pages.

- File utama: `playwright.yaml` (atau `.github/workflows/playwright.yml`)
- Trigger: `push` ke `main/master`, `pull_request`, `workflow_dispatch` (manual), dan `schedule` (cron setiap 30 menit pada contoh workflow).
- Runner: `ubuntu-latest` dengan container Playwright resmi (`mcr.microsoft.com/playwright:v1.xx.x-jammy`) — memastikan browser dan dependensi Playwright tersedia.
- Langkah penting dalam workflow:
  - Checkout repository (`actions/checkout@v4`).
  - Setup Node.js (`actions/setup-node@v4`).
  - Install dependencies (`npm ci`).
  - Jalankan test: `npx playwright test` (opsional environment: `CI=true`, `BASE_URL`).
  - Upload artifacts laporan (`actions/upload-artifact@v4`) untuk keperluan debugging.
  - Konfigurasi dan deploy laporan HTML ke GitHub Pages (`actions/configure-pages`, `actions/upload-pages-artifact`, `actions/deploy-pages`).

### Permissions & Token
- Workflow mengatur `permissions` minimal yang diperlukan: `contents: read`, `pages: write`, `id-token: write`.
- Untuk deploy ke Pages, `GITHUB_TOKEN` biasanya sudah cukup. Jangan menyimpan token sensitif langsung di file; gunakan `secrets` jika perlu.

### Lokasi laporan
- Playwright menyimpan laporan HTML di `playwright-report/` secara default; workflow mengunggah folder ini agar bisa dideploy ke GitHub Pages.

### Menjalankan workflow secara lokal atau debugging
- Untuk meniru lingkungan CI secara lokal, gunakan image Docker Playwright:

```bash
docker run -it --rm -v %cd%:/src -w /src mcr.microsoft.com/playwright:v1.59.1-jammy bash
npm ci
npx playwright test
```

- Alternatif tanpa Docker: jalankan `npm ci`, lalu `npx playwright install` dan `npx playwright test`.

### Kustomisasi cepat
- Ubah `BASE_URL` via environment di workflow atau di `playwright.config.js` bila diperlukan.
- Atur schedule cron di workflow bila ingin penjadwalan berbeda.
- Jika butuh integrasi laporan lain (mis. Allure), tambahkan langkah publish/reporter yang sesuai.

Jika Anda mau, saya bisa membuat file dokumentasi terpisah (`docs/CI.md`) atau menyesuaikan workflow (mis. menambahkan matrix, caching, atau reporter tambahan).

## Kontak
- Author: Aryandhi Windiarto
- Role: Software Quality Assurance Engineer
- LinkedIn: https://linkedin.com/in/aryandhiwindiarto
