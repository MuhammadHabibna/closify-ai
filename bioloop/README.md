# BioLoop — Smart AIoT Waste-to-Value Platform 🔄🥑⚡

> **Sistem Terintegrasi Konversi *Food Waste* Menjadi Biogas dan Biofertilizer Berbasis AI dan IoT untuk Mendukung *Circular Economy***  
> *Karya Tulis Ilmiah & Prototipe Sistem Kompetisi Ilmiah Nasional (KIMNAS) 2026*

---

## 📌 Ringkasan Eksekutif

Timbulan sampah di Indonesia menurut data Sistem Informasi Pengelolaan Sampah Nasional (SIPSN, 2024) telah mencapai **39,78 juta ton/tahun**, dengan komposisi terbesar didominasi oleh **sampah organik/sisa makanan (*food waste*) sebesar 41,2%**. Pendekatan pengelolaan konvensional linear (*take-use-dispose*) ke TPA memicu emisi gas metana liar (potensi pemanasan global 28x lebih tinggi daripada $CO_2$) dan pencemaran air lindi.

**BioLoop** hadir sebagai platform terintegrasi cerdas berbasis **Artificial Intelligence of Things (AIoT)** yang mentransformasi limbah sisa makanan menjadi 3 produk bernilai ekonomi tinggi dalam siklus tertutup (*closed-loop circular economy*):
1. **Biogas Murni ($CH_4 \ge 68\%$)** &rarr; Alternatif LPG untuk dapur kantin, restoran, dan UMKM kuliner.
2. **Pupuk Organik Cair (POC)** &rarr; Kaya nitrogen, fosfor, dan kalium terlarut untuk fertigasi dan hidroponik.
3. **Pupuk Organik Padat (POP / Bio-kompos)** &rarr; Kaya humus untuk pembenah struktur tanah dan urban farming.

---

## 🚀 Fitur Utama Platform

### 1. 🥑 Input & Sortir AI Vision Otomatis
- Kamera edge AI Vision dengan model deteksi objek ringan (*YOLO-based*) mendeteksi dan menolak kontaminan anorganik (plastik, sendok, styrofoam) dengan tingkat akurasi **96,4%** dan latensi <250 ms.
- Menjamin kemurnian substrat organik sebelum masuk ke unit pencacahan mikro (2–4 mm) untuk memperluas luas permukaan fermentasi.

### 2. ⚡ Telemetri IoT & Kontrol Reaktor 24/7
- Integrasi mikrokontroler ESP32 dengan sensor industri:
  - **Sensor Suhu DS18B20**: Mempertahankan rezim mesofilik optimum (35–38°C, default 37,2°C).
  - **Sensor pH Analog**: Menjaga stabilitas derajat keasaman metanogenesis (6,8–7,4).
  - **Transmitter Tekanan Gas**: Memantau volume akumulasi biogas di *gas collector*.
  - **Sensor Kadar Air Substrat**: Menjaga kelembapan 75–80%.
- Agitator mekanis otomatis berputar berkala mencegah terbentuknya kerak substrat (*scum formation*).

### 3. 🔄 Panen 3 Output Bernilai Tinggi
- Tiga kartu pemantauan live kapasitas tangki:
  - Tangki Biogas ($m^3$ & persentase, setara tabung LPG 3kg).
  - Tangki Penampung Pupuk Cair (POC dalam Liter).
  - Wadah Bio-kompos Padat (POP dalam Kilogram).
- Indikator visual otomatis berubah saat level mencapai >80% kapasitas siap panen.

### 4. 🤖 AI Predictive Maintenance & Proteksi Asidosis
- Algoritma analitik BioLoop memantau tren rasio asam lemak volatil (VFA/alkalinitas) dari kombinasi data sensor.
- Mendeteksi gejala pengasaman (*acidosis / souring*) sedini mungkin dan memberikan resep presisi (contoh: injeksi buffer air kapur $Ca(OH)_2$ dosis tepat).
- Memprediksi sisa masa pakai media *bio-scrubber* pengikat hidrogen sulfida ($H_2S$).

### 5. 💡 Alur Penggunaan Interaktif (Tutorial User Baru)
- Panduan langkah-demi-langkah (5 *steps*) yang dapat diakses langsung oleh user baru maupun Dewan Juri melalui tombol `[💡 Alur Penggunaan]` di menu atas atau banner tutorial di dashboard.
- Dilengkapi animasi responsif yang sepenuhnya *anti-breakage* baik pada mode Mobile maupun Desktop.

### 6. 🎮 Panel Simulasi Live untuk Dewan Juri
- Panel kendali skenario interaktif di sebelah kanan layar untuk demonstrasi langsung saat presentasi:
  - **+ Input 5 Kg Sampah**: Menambah timbulan dan memicu kenaikan volume gas & pupuk.
  - **Simulasi Panen Gas**: Mengalirkan biogas ke kompor/utilitas dan mereset level tangki.
  - **Simulasi Kuras POC**: Mengemas pupuk cair ke jeriken.
  - **Simulasi Anomali pH (Asidosis)**: Menguji respon darurat AI dan perubahan visual UI reaktor.
  - **Reset Kondisi Normal**: Mengembalikan sistem ke status prima operasional (Health 98%).

---

## 🖥️ Mode Tampilan Fleksibel

Platform BioLoop menyediakan tombol *mode switcher* di bagian header navigasi:
- **Mobile Prototype (Default)**: Tampilan mockup smartphone elegan ala *UrbanBio* dengan rasio viewport mobile interaktif.
- **Full Dashboard**: Mode layar lebar (*expanded desktop dashboard*) yang optimal untuk proyeksi layar monitor besar dan infokus proyektor ruang sidang juri.

---

## 📂 Struktur File Repository

```
bioloop/
├── index.html              # Struktur DOM web app BioLoop & modal tutorial
├── style.css               # Desain sistem responsif, token warna HSL, dan animasi
├── app.js                  # Engine interaktif, telemetri sensor, AI simulation
├── README.md               # Dokumentasi lengkap proyek
├── PRD_BIOLOOP_AIOT.md     # Product Requirement Document & Spesifikasi Teknis
└── ESSAI_BIOLOOP_FINAL.md  # Naskah Lengkap Essai Ilmiah KIMNAS 2026
```

---

## 🛠️ Cara Menjalankan

Proyek ini dibangun menggunakan **Vanilla HTML, Modern CSS, dan JavaScript ES6+ murni** (zero external dependencies & build tools), sehingga sangat cepat, ringan, dan dapat langsung dibuka di peramban web modern manapun:

1. **Clone repository ini**:
   ```bash
   git clone https://github.com/MuhammadHabibna/bioloop.git
   cd bioloop
   ```
2. **Buka file `index.html`**:
   - Cukup klik dua kali (double-click) pada file `index.html`, atau
   - Buka menggunakan Live Server di VS Code / Antigravity IDE, atau
   - Buka via browser: `file:///path/to/bioloop/index.html`

---

## 🏆 Spesifikasi Lomba KIMNAS 2026

- **Subtema**: Inovasi Teknologi Berkelanjutan & Ekonomi Sirkular (*Circular Economy & Climate Tech*).
- **Target Utilisasi**: Kantin Universitas, Restoran Komersial, Food Court, dan Sentra Kuliner UMKM.
- **Estimasi Payback Period (PBP)**: $\pm 1,4$ Tahun (berdasarkan substitusi LPG komersial dan penjualan pupuk organik tersertifikasi).

---

&copy; 2026 Tim Pengembang BioLoop AIoT. Hak cipta dilindungi.
