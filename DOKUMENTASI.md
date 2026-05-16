# Dokumentasi Brew & Co Website

Panduan lengkap untuk memahami, mengelola, dan mengembangkan website Brew & Co.

---

## Daftar Isi

1. [Struktur Project](#1-struktur-project)
2. [Cara Menjalankan](#2-cara-menjalankan)
3. [Halaman & Fungsinya](#3-halaman--fungsinya)
4. [Cara Mengganti Asset di index.html](#4-cara-mengganti-asset-di-indexhtml)
5. [Cara Mengganti Asset di menu.html](#5-cara-mengganti-asset-di-menuhtml)
6. [Cara Menambah & Mengedit Artikel](#6-cara-menambah--mengedit-artikel)
7. [Cara Mengganti Informasi Cafe](#7-cara-mengganti-informasi-cafe)
8. [Cara Build untuk Production](#8-cara-build-untuk-production)

---

## 1. Struktur Project

```
brew-and-co/
│
├── index.html              # Halaman utama (Home)
├── menu.html               # Halaman menu lengkap
├── artikel.html            # Halaman daftar artikel
├── artikel-detail.html     # Template halaman detail artikel
│
├── public/
│   └── images/             # Semua file gambar
│       ├── hero-bg.png
│       ├── about-interior.jpg
│       ├── coffee-001.jpg ... coffee-004.jpg
│       ├── non-coffee-001.jpg ... non-coffee-003.jpg
│       ├── food-001.jpg ... food-003.jpg
│       ├── gallery-001.jpg ... gallery-008.jpg
│       ├── sarah.jpg
│       ├── priya.jpg
│       └── yuki.jpg
│
├── src/
│   ├── css/
│   │   └── main.css        # Stylesheet utama (Tailwind CSS)
│   │
│   ├── data/               # Sumber data (JSON) — edit di sini untuk update konten
│   │   ├── articles.json   # Data semua artikel
│   │   ├── menu.json       # Data menu (referensi, belum dipakai di HTML)
│   │   ├── gallery.json    # Data galeri (referensi)
│   │   └── testimonials.json # Data testimoni (referensi)
│   │
│   └── js/
│       ├── main.js             # Entry point index.html
│       ├── menu-page.js        # Entry point menu.html
│       ├── artikel-page.js     # Entry point artikel.html
│       ├── artikel-detail-page.js # Entry point artikel-detail.html
│       ├── nav.js              # Logika navbar (hamburger, sticky header)
│       ├── menu.js             # Filter tab menu (Coffee/Non-Coffee/Food)
│       ├── gallery.js          # Lazy loading + lightbox galeri
│       ├── carousel.js         # Carousel testimoni
│       ├── featured.js         # Section featured picks
│       ├── hours.js            # Highlight jam buka hari ini
│       └── form.js             # Validasi form reservasi
│
├── package.json
├── vite.config.js          # Konfigurasi build tool (Vite)
└── tailwind.config.js      # Konfigurasi Tailwind CSS
```

---

## 2. Cara Menjalankan

### Prasyarat
- Node.js versi 18 atau lebih baru
- npm

### Install dependencies (pertama kali saja)
```bash
npm install
```

### Jalankan development server
```bash
npm run dev
```
Buka browser di `http://localhost:5173`

### Build untuk production
```bash
npm run build
```
Output ada di folder `dist/`

### Preview hasil build
```bash
npm run preview
```

---

## 3. Halaman & Fungsinya

| Halaman | File | Deskripsi |
|---|---|---|
| Home | `index.html` | Hero, About, Featured Picks, Gallery, Testimonials, Location |
| Menu | `menu.html` | Daftar menu lengkap dengan filter tab Coffee/Non-Coffee/Food |
| Artikel | `artikel.html` | Daftar semua artikel dengan filter kategori |
| Detail Artikel | `artikel-detail.html` | Template halaman baca artikel, konten diambil dari `articles.json` |

---

## 4. Cara Mengganti Asset di index.html

### 4.1 Gambar Hero (Background Utama)

Gambar hero adalah background besar di bagian paling atas halaman.

**Lokasi file:** `public/images/hero-bg.png`

**Cara ganti:**
1. Siapkan gambar baru (rekomendasi ukuran minimal 1920×1080px)
2. Simpan ke `public/images/` dengan nama yang sama (`hero-bg.png`), **atau** ganti nama file dan update path di `index.html`:

```html
<!-- Cari baris ini di index.html -->
<div style="... background-image: url('/images/hero-bg.png'); ..."></div>

<!-- Ganti dengan nama file baru -->
<div style="... background-image: url('/images/nama-file-baru.jpg'); ..."></div>
```

---

### 4.2 Gambar About (Interior Cafe)

**Lokasi file:** `public/images/about-interior.jpg`

**Cara ganti:**
1. Simpan gambar baru ke `public/images/`
2. Cari tag `<img>` di section About dan ganti atribut `src`:

```html
<!-- Sebelum -->
<img src="/images/about-interior.jpg" alt="..." />

<!-- Sesudah -->
<img src="/images/nama-gambar-baru.jpg" alt="Deskripsi gambar baru" />
```

> **Tips:** Selalu update atribut `alt` dengan deskripsi yang akurat untuk SEO dan aksesibilitas.

---

### 4.3 Gambar Featured Picks

Section Featured Picks menampilkan 5 item menu pilihan. Gambar yang digunakan sama dengan gambar di menu.

**File gambar:** `public/images/coffee-001.jpg`, `non-coffee-001.jpg`, dll.

**Cara ganti gambar satu item:**
1. Simpan gambar baru ke `public/images/`
2. Cari `<article>` yang sesuai di section `id="featured"` di `index.html`
3. Ganti atribut `src` pada tag `<img>`:

```html
<!-- Contoh: ganti gambar Signature Latte -->
<img src="/images/coffee-001.jpg" alt="Signature Latte — smooth espresso with steamed milk" ... />
<!-- Ganti menjadi: -->
<img src="/images/coffee-001-baru.jpg" alt="Deskripsi baru" ... />
```

**Cara ganti nama/harga/deskripsi item:**
Cari `<h3>` dan teks di dalam `<article>` yang sesuai:

```html
<h3 class="font-semibold text-lg mb-1">Signature Latte</h3>          <!-- Nama -->
<p class="text-sm text-gray-600 mb-2">Smooth espresso with...</p>    <!-- Deskripsi -->
<span class="font-bold text-primary">Rp 38.000</span>                 <!-- Harga -->
<span class="badge">Best Seller</span>                                <!-- Badge (opsional) -->
```

**Menghapus badge:** Hapus baris `<span class="badge">...</span>` jika tidak diperlukan.

**Jenis badge yang tersedia:**
- `<span class="badge">Best Seller</span>` — biru
- `<span class="badge-sold-out">Sold Out</span>` — abu-abu

---

### 4.4 Gambar Gallery

Gallery menggunakan lazy loading — gambar hanya dimuat saat terlihat di layar.

**File gambar:** `public/images/gallery-001.jpg` hingga `gallery-008.jpg`

**Cara ganti gambar gallery:**
1. Simpan gambar baru ke `public/images/`
2. Cari tag `<img>` dengan class `gallery-img` di section `id="gallery"`:

```html
<!-- Ganti atribut data-src (bukan src) -->
<img
  src=""
  data-src="/images/gallery-001.jpg"   ← ganti ini
  alt="Deskripsi gambar"               ← update ini juga
  ...
/>
```

> **Penting:** Gunakan `data-src`, bukan `src`. Atribut `src` sengaja dikosongkan karena gambar dimuat secara lazy oleh JavaScript.

---

### 4.5 Foto Avatar Testimoni

**File gambar:** `public/images/sarah.jpg`, `priya.jpg`, `yuki.jpg`

**Cara ganti:**
1. Simpan foto baru ke `public/images/`
2. Cari card testimoni yang sesuai di section `id="testimonials"`:

```html
<!-- Ganti src dan alt -->
<img src="/images/sarah.jpg" alt="Sarah Mitchell" class="w-12 h-12 rounded-full ..." />
```

> Untuk reviewer tanpa foto (James Okafor, Daniel Reyes), website menampilkan inisial nama secara otomatis — tidak perlu gambar.

---

## 5. Cara Mengganti Asset di menu.html

### 5.1 Gambar Item Menu

Semua gambar item menu ada di `public/images/`.

**Cara ganti gambar satu item:**
1. Simpan gambar baru ke `public/images/`
2. Cari `<article>` yang sesuai di `menu.html` berdasarkan komentar HTML (contoh: `<!-- Coffee: Signature Latte -->`)
3. Ganti atribut `src`:

```html
<img src="/images/coffee-001.jpg" alt="Signature Latte — smooth espresso with steamed milk" ... />
```

---

### 5.2 Menambah Item Menu Baru

Salin salah satu `<article>` yang sudah ada dan sesuaikan isinya:

```html
<!-- Tambahkan di dalam div.menu-grid, setelah artikel terakhir -->
<article class="menu-card bg-white rounded-2xl overflow-hidden shadow-sm" data-category="coffee">
  <img src="/images/nama-gambar.jpg" alt="Nama Menu — deskripsi singkat" loading="lazy" width="600" height="400" class="w-full h-64 object-cover" />
  <div class="card-body p-4">
    <h2 class="font-semibold text-lg mb-1">Nama Menu Baru</h2>
    <p class="text-sm text-gray-600 mb-2">Deskripsi menu baru di sini.</p>
    <div class="flex items-center justify-between">
      <span class="font-bold text-primary">Rp 35.000</span>
      <!-- Hapus baris badge jika tidak ada -->
      <span class="badge">New</span>
    </div>
  </div>
</article>
```

**Nilai `data-category` yang valid:**
- `coffee` — tampil di tab Coffee
- `non-coffee` — tampil di tab Non-Coffee
- `food` — tampil di tab Food

---

### 5.3 Menandai Item sebagai Sold Out

Ganti badge menjadi `badge-sold-out`:

```html
<!-- Sebelum -->
<span class="badge">Best Seller</span>

<!-- Sesudah -->
<span class="badge-sold-out">Sold Out</span>
```

---

### 5.4 Menghapus Item Menu

Hapus seluruh blok `<article>...</article>` yang sesuai dari `menu.html`.

---

## 6. Cara Menambah & Mengedit Artikel

Semua konten artikel dikelola melalui satu file: **`src/data/articles.json`**

Tidak perlu menyentuh file HTML apapun — cukup edit JSON ini.

---

### 6.1 Struktur Data Artikel

Setiap artikel adalah satu object dalam array JSON:

```json
{
  "id": "slug-unik-artikel",
  "kategori": "kopi",
  "kategoriLabel": "Kopi",
  "tanggal": "12 Mei 2025",
  "gambar": "/images/nama-gambar.jpg",
  "gambarAlt": "Deskripsi gambar untuk aksesibilitas",
  "judul": "Judul Artikel di Sini",
  "ringkasan": "Ringkasan singkat yang muncul di halaman daftar artikel (1-2 kalimat).",
  "konten": [
    { "tipe": "paragraf", "teks": "Isi paragraf pertama..." },
    { "tipe": "subjudul", "teks": "Judul Sub-bagian" },
    { "tipe": "paragraf", "teks": "Isi paragraf setelah subjudul..." }
  ]
}
```

**Penjelasan field:**

| Field | Wajib | Keterangan |
|---|---|---|
| `id` | ✅ | Slug unik, hanya huruf kecil dan tanda `-`. Digunakan di URL: `?id=slug-ini` |
| `kategori` | ✅ | Nilai: `kopi`, `brewing`, atau `gaya-hidup` |
| `kategoriLabel` | ✅ | Teks yang ditampilkan: `"Kopi"`, `"Brewing Guide"`, `"Gaya Hidup"` |
| `tanggal` | ✅ | Format bebas, contoh: `"12 Mei 2025"` |
| `gambar` | ✅ | Path gambar dari folder `public/`, contoh: `"/images/coffee-001.jpg"` |
| `gambarAlt` | ✅ | Deskripsi gambar untuk screen reader dan SEO |
| `judul` | ✅ | Judul lengkap artikel |
| `ringkasan` | ✅ | Teks singkat yang muncul di card daftar artikel |
| `konten` | ✅ | Array blok konten (lihat di bawah) |

**Tipe blok konten:**

| `tipe` | Fungsi | Contoh |
|---|---|---|
| `"paragraf"` | Teks biasa | `{ "tipe": "paragraf", "teks": "Isi teks..." }` |
| `"subjudul"` | Heading H2 di dalam artikel | `{ "tipe": "subjudul", "teks": "Nama Sub-bagian" }` |

---

### 6.2 Menambah Artikel Baru

1. Buka `src/data/articles.json`
2. Tambahkan object baru di **awal array** (agar muncul paling atas di halaman):

```json
[
  {
    "id": "tips-memilih-biji-kopi",
    "kategori": "kopi",
    "kategoriLabel": "Kopi",
    "tanggal": "20 Mei 2025",
    "gambar": "/images/coffee-003.jpg",
    "gambarAlt": "Berbagai jenis biji kopi di atas meja kayu",
    "judul": "Tips Memilih Biji Kopi yang Tepat untuk Selera Kamu",
    "ringkasan": "Dengan ratusan varietas kopi yang tersedia, memilih biji kopi yang tepat bisa terasa membingungkan. Panduan ini akan membantu kamu menemukan kopi yang sesuai dengan selera.",
    "konten": [
      {
        "tipe": "paragraf",
        "teks": "Memilih biji kopi yang tepat adalah langkah pertama menuju secangkir kopi yang sempurna..."
      },
      {
        "tipe": "subjudul",
        "teks": "Pahami Profil Rasa yang Kamu Suka"
      },
      {
        "tipe": "paragraf",
        "teks": "Sebelum membeli, tanyakan pada dirimu: apakah kamu suka rasa yang fruity dan bright, atau earthy dan bold?..."
      }
    ]
  },
  
  // ... artikel lainnya tetap di sini
]
```

3. Simpan file. Artikel baru langsung muncul di `artikel.html` tanpa perlu restart server.

---

### 6.3 Mengedit Artikel yang Ada

1. Buka `src/data/articles.json`
2. Cari object dengan `"id"` yang sesuai
3. Edit field yang diinginkan (judul, ringkasan, konten, gambar, dll.)
4. Simpan file

**Contoh: mengubah tanggal dan menambah paragraf baru:**

```json
{
  "id": "cold-brew-di-rumah",
  "tanggal": "5 Juni 2025",          ← ubah tanggal
  "konten": [
    { "tipe": "paragraf", "teks": "Paragraf lama..." },
    { "tipe": "subjudul", "teks": "Sub-bagian baru" },
    { "tipe": "paragraf", "teks": "Paragraf baru yang ditambahkan." }  ← tambah di sini
  ]
}
```

---

### 6.4 Menghapus Artikel

Hapus seluruh object `{...}` yang sesuai dari array di `articles.json`.

> **Perhatian:** Pastikan tidak ada koma yang tertinggal setelah object terakhir dalam array. JSON tidak mengizinkan trailing comma.

---

### 6.5 Menambah Kategori Baru

1. Tambahkan tombol filter baru di `artikel.html`:

```html
<button data-filter="resep" class="artikel-filter px-5 py-2 rounded-full ...">Resep</button>
```

2. Gunakan nilai `data-filter` yang sama sebagai `kategori` di `articles.json`:

```json
{
  "id": "resep-kopi-susu",
  "kategori": "resep",
  "kategoriLabel": "Resep",
  ...
}
```

---

## 7. Cara Mengganti Informasi Cafe

### 7.1 Nama Cafe

Nama "Brew & Co" muncul di navbar, footer, dan meta tags. Cari dan ganti di:
- `index.html` — navbar logo, footer brand, `<title>`, meta description, JSON-LD
- `menu.html` — navbar logo, footer brand, `<title>`
- `artikel.html` — navbar logo, footer brand, `<title>`
- `artikel-detail.html` — navbar logo, footer brand

### 7.2 Alamat & Kontak

Cari section `id="location"` di `index.html`:

```html
<address class="not-italic text-gray-600 leading-relaxed">
  Jl. Sudirman No. 42<br />
  Jakarta Pusat, 10220<br />
  Indonesia
</address>
<a href="tel:+62812345678">+62 812-345-678</a>
<a href="mailto:hello@brewandco.id">hello@brewandco.id</a>
```

Update juga di JSON-LD structured data di `<head>` `index.html` untuk SEO:

```json
"address": {
  "streetAddress": "Jl. Sudirman No. 42",
  "addressLocality": "Jakarta Pusat",
  "postalCode": "10220"
},
"telephone": "+62812345678",
"email": "hello@brewandco.id"
```

### 7.3 Jam Buka

Cari tabel jam buka di section `id="location"` di `index.html`:

```html
<tr class="hours-row" data-day="Monday">
  <td class="py-1 pr-4 font-medium">Monday</td>
  <td class="py-1 text-gray-600">08:00 – 22:00</td>
</tr>
```

Update juga di JSON-LD structured data di `<head>` untuk SEO.

---

## 8. Cara Build untuk Production

```bash
npm run build
```

Hasil build ada di folder `dist/`. Upload isi folder `dist/` ke hosting (Netlify, Vercel, cPanel, dll.).

> **Catatan:** File `src/data/articles.json` harus ikut ter-deploy agar halaman artikel bisa memuat konten. Vite secara otomatis menyertakan file di folder `public/` dan `src/` dalam proses build.
