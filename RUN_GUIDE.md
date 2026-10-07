# Panduan Eksekusi & Deployment: Closify AI x Arunika Apparel
## Prototipe Sales Closer AI untuk Kompetisi KIMNAS UNESA

Aplikasi prototipe **Closify AI** siap dijalankan baik di lingkungan pengujian lokal maupun dideploy ke server produksi (Cloud / PaaS / VPS / Docker).

Akses lokal aktif:
**[http://127.0.0.1:8000/](http://127.0.0.1:8000/)**

---

## 1. Arsitektur Komponen Proyek

```
d:\Draft Perlombaan UNESA\KIMNAS - AI SALES CHATBOT\
│
├── backend/
│   ├── app.py                      <-- Server FastAPI, API Endpoints & Static Mount
│   ├── agent.py                    <-- Agent ReAct, Anti-Robot Filter & Emoji Stripper
│   ├── gemini_engine.py            <-- Integrasi Gemini 3.5 Flash Lite Live API
│   ├── rate_limiter.py             <-- Pelindung Kuota (12 RPM / 480 RPD Safe Buffer)
│   ├── config.py                   <-- Konfigurasi Kredensial & Environment Variables
│   └── tools.py                    <-- Tool Calling Suite (Inventory, Size, Courier, QRIS)
│
├── public/
│   ├── index.html                  <-- Website E-Commerce Bento Grid (Dentiva Reference)
│   ├── style.css                   <-- CSS Desain Editorial Streetwear & Bento Layout
│   ├── widget.js                   <-- Floating Widget Omago Frosted Glass & SVG Icons
│   ├── widget.css                  <-- CSS Chatbot Widget, Glassmorphism, Responsive
│   └── assets/                     <-- Foto Studio Produk, Avatars SVG & Template QRIS
│
├── data/
│   ├── inventory_products.json     <-- Database Stok Produk Anime Capsule
│   ├── size_matrix.json            <-- Matriks Zero Return Protocol (Fitting TB/BB)
│   ├── shipping_rates.json         <-- Database Ongkir Ekspedisi & Green Delivery
│   └── store_faq_knowledge.md      <-- Basis Pengetahuan & FAQ Resmi Toko
│
├── Dockerfile                      <-- Kontainerisasi Siap Deploy ke Cloud
├── Procfile                        <-- Konfigurasi Deployment PaaS (Render / Railway)
├── requirements.txt                <-- Dependensi Python Produksi
└── .env.example                    <-- Template Environment Variable
```

---

## 2. Cara Menjalankan di Lingkungan Lokal (Local Run)

### Opsi A: Menggunakan PowerShell / Terminal Biasa
1. Masuk ke direktori proyek:
   ```powershell
   cd "d:\Draft Perlombaan UNESA\KIMNAS - AI SALES CHATBOT"
   ```
2. Pastikan dependensi terpasang:
   ```powershell
   pip install -r requirements.txt
   ```
3. Jalankan server backend:
   ```powershell
   python -m uvicorn app:app --app-dir backend --host 127.0.0.1 --port 8000 --reload
   ```
4. Buka peramban di `http://127.0.0.1:8000/`.

---

## 3. Cara Deploy ke Layanan Cloud (Cloud Deployment)

### Opsi 1: Deploy ke Railway (Rekomendasi Tercepat - 1 Klik)
1. Push repositori ini ke GitHub.
2. Buat proyek baru di [Railway.app](https://railway.app/).
3. Hubungkan repositori GitHub Anda.
4. Di tab **Variables**, tambahkan:
   - `GEMINI_API_KEY`: Kunci API Google AI Studio Anda.
5. Railway akan mendeteksi `Procfile` / `requirements.txt` atau `Dockerfile` secara otomatis dan menerbitkan URL publik berstatus HTTPS (misal: `https://closify-arunika.up.railway.app/`).

### Opsi 2: Deploy ke Render (Web Service)
1. Buat Web Service baru di [Render.com](https://render.com/).
2. Hubungkan repositori GitHub.
3. Konfigurasikan:
   - **Environment**: Python 3
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn backend.app:app --host 0.0.0.0 --port $PORT`
4. Tambahkan Environment Variable `GEMINI_API_KEY`.
5. Klik **Create Web Service**.

### Opsi 3: Deploy via Docker (VPS / Server Kampus / Cloud Server)
1. Build image Docker:
   ```bash
   docker build -t closify-ai-store .
   ```
2. Jalankan container:
   ```bash
   docker run -d -p 8000:8000 -e GEMINI_API_KEY="kunci_api_anda" --name closify-app closify-ai-store
   ```
3. Aplikasi aktif di port 8000 server Anda.

---

## 4. Validasi Kesiapan Tampilan Profesional

| Aspek Visual & Fungsional | Standar Acuan | Implementasi pada Closify AI |
| :--- | :--- | :--- |
| **Tata Letak Halaman Toko** | Dentiva Bento Grid Reference | Kartu bento asimetris dengan sudut membulat 24px, tipografi Outfit + Inter, palet warna slate/midnight/ice-blue. |
| **Foto Produk Katalog** | Studio E-Commerce Editorial | Menampilkan 4 produk kapsul anime dengan detail GSM, harga, deskripsi bahan, dan pemicu konsultasi instan. |
| **Antarmuka Chat Widget** | Omago Digital Teammate Reference | Desain *frosted glass* (`backdrop-filter: blur(35px)`), purple orb avatar dengan glif apertura SVG, tab mode Chat, dan input bar melayang di bawah. |
| **Elemen Grafis & Ikon** | 100% Pure SVG Line Icons | Bebas emoji secara menyeluruh. Menggunakan ikon SVG murni untuk status pelunasan, perisai *Zero Return*, kurir daun *Green Delivery*, dan QRIS dinamis. |
| **Interaksi Transaksi** | Closed-Loop In-Chat Checkout | Dynamic QRIS Card interaktif dengan hitung mundur 15 menit, verifikasi *settlement* tanpa *reload* halaman, dan notifikasi kemasan ramah lingkungan. |
| **Kesiapan Responsif** | Multi-Device Grid | Menyesuaikan tampilan secara presisi di layar desktop (1280px+), tablet (1024px), maupun ponsel pintar (360-480px). |

---

## 5. Ringkasan Eksekusi Skenario Demo untuk Juri

| Tahap | Skenario Pengujian | Hasil Sistem |
| :--- | :--- | :--- |
| **1. Greeting & Cek Stok** | Pengguna menanyakan stok Kaos JJK Gojo Satoru Size L. | AI mengecek stok riil (tersisa 4 pcs) dengan gaya santai konsultan *streetwear*. |
| **2. Zero Return Fitting** | Pengguna mengirimkan data postur (TB 175 cm, BB 70 kg). | AI memanggil fungsi ukuran dan menyajikan kartu konfirmasi ukuran Size L Boxy Fit. |
| **3. Eco Green Delivery** | Pengguna menyebutkan alamat pengiriman. | AI menawarkan opsi kurir motor listrik hemat emisi (Rp9.000 vs Reguler Rp12.000). |
| **4. Dynamic QRIS Closing** | Pengguna menyetujui total pesanan. | Kartu QRIS dinamis (Rp178.000) terbit langsung di chat dengan timer aktif. |
| **5. Instant Settlement** | Pengguna menekan tombol simulasi bayar. | Status kartu beralih ke lencana emerald *Settled* dan AI mengirim konfirmasi kemasan *biodegradable cassava*. |
