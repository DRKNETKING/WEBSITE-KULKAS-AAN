# Landing Page Penjualan & Servis Kulkas Profesional (Edisi 2026)

Website landing page modern, berkecepatan tinggi, dan konversi tinggi untuk bisnis **Penjualan Kulkas** dan **Jasa Servis Kulkas Panggilan**.

---

## ✨ Fitur & Keunggulan Desain 2026

* **Desain Ultra-Modern & Profesional**: Estetika modern 2026 dengan perpaduan warna *Cool Tech Ice Blue* & *Slate Dark*, aksen *WhatsApp Emerald Green*, dan kartu modern ber-radius lengkung halus.
* **100% Responsif (Mobile-First)**: Tampilan sempurna dan nyaman diakses di smartphone layar kecil, tablet, hingga monitor desktop lebar tanpa *horizontal scroll* (`overflow-x: hidden`).
* **Navigasi Sticky dengan Glassmorphism**: Navbar transparan dengan efek `backdrop-blur` serta menu drawer hamburger khusus smartphone.
* **Integrasi WhatsApp Siap Pakai**:
  * Tombol WhatsApp terhubung langsung menggunakan format nomor internasional:
    * **WhatsApp 1**: `085691604318` &rarr; `https://wa.me/6285691604318`
    * **WhatsApp 2**: `0895340614416` &rarr; `https://wa.me/62895340614416`
  * Setiap kartu produk memiliki tombol **"Tanya via WhatsApp"** dengan pesan otomatis.
  * Form reservasi / booking otomatis merangkum data dan langsung membuka WhatsApp dengan format pesan rapi.
* **Floating WhatsApp Widget**: Tombol mengapung di pojok kanan bawah dengan animasi denyut (*ripple pulse*) dan menu popup cepat untuk memilih Admin 1 atau Admin 2.
* **Galeri Foto Interaktif**: Disertai fitur *Lightbox modal zoom* saat foto diklik.
* **Super Cepat & Ringan**: Dibuat murni dengan HTML5 semantic, CSS3 modern, dan Vanilla JavaScript (tanpa framework berat, langsung cepat dibuka).

---

## 📂 Struktur Folder & Gambar

Semua gambar diorganisir secara rapi dan mudah diganti sewaktu-waktu:

```
WEBSITE-KULKAS-AAN/
│
├── index.html                   # Halaman utama landing page lengkap (10 section)
├── README.md                    # Dokumentasi & panduan penggunaan
│
├── css/
│   └── style.css                # Desain sistem 2026, animasi, & responsive layout
│
├── js/
│   └── main.js                  # Controller WhatsApp, form booking, drawer, filter, & modal
│
└── images/
    ├── hero/
    │   └── hero-kulkas.jpg      # Foto kulkas utama di hero section
    │
    ├── products/
    │   ├── kulkas-1.jpg         # Foto Kulkas 1 Pintu Smart Eco
    │   ├── kulkas-2.jpg         # Foto Kulkas 2 Pintu Inverter No Frost
    │   ├── kulkas-3.jpg         # Foto Kulkas Side-by-Side Smart Digital
    │   ├── kulkas-4.jpg         # Foto Showcase Cooler Minuman Usaha
    │   ├── kulkas-5.jpg         # Foto Chest Freezer Daging & Frozen Food
    │   └── kulkas-6.jpg         # Foto Kulkas Mini Bar Portable
    │
    ├── service/
    │   ├── teknisi-servis.jpg   # Foto teknisi servis kulkas profesional
    │   └── servis-kulkas.jpg    # Foto detail pekerjaan servis & manifold alat
    │
    └── gallery/
        ├── gallery-1.jpg        # Dokumentasi unit siap pakai
        ├── gallery-2.jpg        # Dokumentasi servis kompresor & freon
        ├── gallery-3.jpg        # Dokumentasi detail komponen & kelistrikan
        ├── gallery-4.jpg        # Dokumentasi display kulkas rumah tangga
        ├── gallery-5.jpg        # Dokumentasi hasil pengerjaan di rumah pelanggan
        └── gallery-6.jpg        # Dokumentasi uji coba suhu digital
```

---

## 🚀 Cara Menjalankan Website

1. **Buka Langsung di Browser**:
   * Cukup klik dua kali file `index.html` pada Windows Explorer, atau klik kanan &rarr; **Open with** &rarr; **Google Chrome / Microsoft Edge / Firefox**.
2. **Atau Menggunakan Live Server**:
   * Jika menggunakan Visual Studio Code, klik kanan pada `index.html` dan pilih **Open with Live Server**.

---

## 🛠️ Panduan Kustomisasi Cepat

### 1. Mengganti Foto
Cukup timpa file gambar di dalam folder `images/` dengan foto kulkas atau pekerjaan asli Anda menggunakan nama file yang sama (misal `images/products/kulkas-1.jpg`). Semua gambar sudah diproteksi dengan `object-fit: cover` agar proporsional dan tidak gepeng.

### 2. Mengubah Nomor WhatsApp
Nomor WhatsApp telah dikonfigurasi di file `js/main.js` pada baris paling atas:
```javascript
const WA_NUMBER_1 = '6285691604318';
const WA_NUMBER_2 = '62895340614416';
```
Dan dapat disesuaikan pada tautan di `index.html`.

### 3. Mengubah Nama Toko / Branding
Cari teks `AanKulkas` di `index.html` (bagian `<header class="navbar">`) lalu ganti sesuai nama usaha Anda.

---

© 2026 **Jual Kulkas & Servis Kulkas Profesional**. All rights reserved.
