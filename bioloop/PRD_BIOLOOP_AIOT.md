# PRODUCT REQUIREMENT DOCUMENT (PRD) & ARSITEKTUR PLATFORM
# BioLoop: Smart AIoT Waste-to-Value Platform
**Sistem Terintegrasi Konversi Food Waste Menjadi Biogas & Biofertilizer Berbasis AIoT untuk Mendukung Circular Economy**  
*Kategori: Inovasi Teknologi Berkelanjutan & Ekonomi Sirkular (KIMNAS UNESA 2026)*

---

## 1. Executive Summary & Visi Produk

| Atribut | Deskripsi |
|---|---|
| **Nama Produk** | **BioLoop Platform (BioLoop OS & AIoT Monitoring Ecosystem)** |
| **Kategori Inovasi** | Clean-Tech, Smart Biodigester Automation, Circular Economy & AIoT |
| **Target Output** | 1. **Biogas Murni (CH4)** — Energi terbarukan pengganti LPG fosil<br>2. **Pupuk Organik Cair (POC)** — Nutrisi cair tanaman cepat serap<br>3. **Pupuk Organik Padat (POP)** — Soil conditioner & pemulih kesuburan tanah |
| **Dukungan Teknologi** | **AI Vision** (Sortir kontaminan), **IoT Telemetry** (Multi-sensor pH, Suhu, Tekanan, Kelembaban), **AI Predictive Maintenance** (Deteksi dini *souring* & kerusakan mesin) |
| **Benchmark Referensi** | `precious-longma-79817e.netlify.app` (*UrbanBio interactive shell prototype*) dengan penyesuaian fungsionalitas cerdas berorientasi produk & pemeliharaan mesin. |

---

## 2. Latar Belakang Masalah & Urgensi Solusi (Berdasarkan Essai)

1. **Volume Sampah Masif & Tidak Termaksimalkan:**
   * Food waste menyumbang **39,36%** dari total 33,79 juta ton timbulan sampah nasional (SIPSN, 2024).
   * Sumber terbesar: Rumah tangga (**50,8%**), Pasar tradisional (**16,67%**), serta Pusat Kuliner & Restoran (**11,01%**).
   * Karakteristik limbah organik mencapai **52,55%** (Wijaya & Sjah, 2026) yang memiliki potensi biomassa luar biasa untuk *anaerobic digestion*.
2. **Kelemahan Fatal Biodigester Konvensional:**
   * **Buta Kondisi Internal (*Black Box*):** Operator tidak tahu apakah digester mengalami *acidification/souring* (pH drop) hingga fermentasi gagal total.
   * **Risiko *Overpressure* & Kebocoran:** Tekanan gas tidak termonitor real-time, berisiko meledak atau filter H2S jenuh tanpa disadari.
   * **Tidak Tahu Waktu Panen Ideal:** Tidak ada sensor level kapasitas gas dan digestate, sehingga gas terbuang percuma atau tangki pupuk meluap.
   * **Kerusakan Mekis Mendadak:** Pisau pencacah tumpul atau pompa sirkulasi tersumbat tanpa ada sistem prediksi perawatan.

---

## 3. Alur Kerja Sistem (Integrated Conversion Workflow)

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        ALUR KERJA KONVERSI BIOLOOP (AIoT INTEGRATED)                   │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ [1. Input Food Waste] ──> [2. AI Vision Sorter] ──> [3. Smart Shredder & Mixer]        │
│   (Resto, Pasar, Kantin)    (Deteksi Plastik/Logam)   (Pencacahan 2-4mm + Water Mix)   │
│                                                                 │                      │
│                                                                 ▼                      │
│ [6. Resource Utilization] <── [5. Output Separator] <── [4. Anaerobic Digester]        │
│  • Biogas (Kompor/Energi)       • Scrubber (Biogas CH4)    (Sensor: Suhu, pH, Moisture)│
│  • Pupuk POC (Pertanian)        • Centrifuge (POC Cair)    (AI: Predictive Maintenance)│
│  • Pupuk POP (Media Tanam)      • Dryer Bed (POP Padat)                                │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Struktur Halaman & Fitur Utama Web BioLoop

Mengadaptasi gaya presentasi interaktif **Mobile Frame Shell (iPhone Prototype)** seperti pada referensi `precious-longma-79817e.netlify.app`, dilengkapi tombol toggle ke **Desktop Dashboard Mode** agar fleksibel saat dipresentasikan ke dewan juri.

### Layar 1: Dashboard Utama (Executive Overview)
* **Status Bar & Device Badge:** Status operasional digester (`NORMAL - ONLINE`, `WARNING`, `HARVEST READY`).
* **Food Waste Intake Counter:** 
  * Total limbah makanan masuk hari ini (cth: `24.8 Kg`, tren `+15%` dibanding kemarin).
  * Akumulasi tonase limbah yang berhasil diselamatkan dari TPA.
* **Live Interactive Circular Flow (Diagram Alur Nyata):**
  * Animasi interaktif aliran biomassa dari *Input -> Fermentasi -> Separator Output*.
* **Output Harvest Gauges (3 Kartu Utama):**
  * 🔥 **Biogas Chamber:** `85%` (Kapasitas `3.8 Kg / 5.2 m³`, status: *Hampir Penuh - Siap Salurkan*).
  * 💧 **Pupuk Organik Cair (POC):** `72%` (Kapasitas `18 Liter`, status: *Siap Panen via Tap Outlet*).
  * 🌱 **Pupuk Organik Padat (POP):** `45%` (Kapasitas `10 Kg`, status: *Fase Fermentasi & Pengeringan*).
* **AI Health Score Badge:** Skor kesehatan mesin & ekosistem biologis (`96/100 - Optimal`).
* **Notifikasi Cepat / Action Banner:** Indikator pop-up jika ada rekomendasi panen atau pemeliharaan.

---

### Layar 2: AIoT Telemetry & Process Monitoring
Menampilkan data pembacaan sensor fisik secara real-time dengan batas aman visual (*threshold bar*):

1. **Suhu Digester (Termokopel PT100 / DS18B20):**
   * *Target Ideal:* 35°C – 38°C (Fase Mesofilik aktif).
   * *Status:* `37.2°C` (Normal, bar hijau).
2. **Derajat Keasaman / pH (Industrial pH Probe):**
   * *Target Ideal:* 6.8 – 7.4 (Kondisi netral seimbang metanogenesis).
   * *Status:* `7.1` (Seimbang, tidak ada risiko *acidosis*).
3. **Kadar Air / Slurry Moisture Sensor:**
   * *Target Ideal:* 75% – 85% untuk fluiditas pencacahan.
   * *Status:* `78%` (Optimal).
4. **Tekanan & Kemurnian Gas (Sensor MQ-4 / NDIR Methane + Pressure Transducer):**
   * *Tekanan Chamber:* `1.8 Bar` (Batas aman maks: 2.5 Bar).
   * *Konsentrasi CH4:* `68% Metana` (Tinggi, nyala api biru pekat).
5. **Sub-Sistem Aktuator & AI Status:**
   * 🤖 **AI Vision Contaminant Detection:** `Aktif` (0 anorganik lolos).
   * 🔄 **Motor Agitator (Pengaduk Berkala):** `Aktif (Interval 15m)`.
   * 🛡️ **Safety Relief Valve:** `Standby (Tekanan Normal)`.
   * 🧪 **Scrubber Filter H2S:** `Kondisi 84% Bersih`.

---

### Layar 3: Hasil Produksi & Manajemen Panen (Resource Center)
Fokus pada aspek **produk bernilai ekonomi** sesuai arahan essay:

* **Manajemen Biogas:**
  * Estimasi setara energi: `5.2 m³ ≈ setara 2.4 Tabung Gas LPG 3Kg`.
  * Estimasi penghematan biaya masak: `Rp54.000,-`.
  * Tombol interaktif: `[Buka Valve Aliran Kompor]` & `[Ekspor Data Tekanan Gas]`.
* **Manajemen Pupuk Organik Cair (POC):**
  * Analisis Nutrisi Terestimasi: Kandungan N (1.8%), P (1.2%), K (2.1%).
  * Estimasi nilai jual: `18 Liter x Rp15.000 = Rp270.000,-`.
  * Tombol interaktif: `[Kuras Melalui Outlet Depan]`.
* **Manajemen Pupuk Organik Padat (POP):**
  * Rasio C/N seimbang (15:1), siap kemas untuk tanah pertanian/tanaman hias.
  * Estimasi nilai jual: `10 Kg x Rp8.000 = Rp80.000,-`.
  * Tombol interaktif: `[Catat Pengambilan Kompos]`.

---

### Layar 4: AI Predictive Maintenance & Diagnostik Kerusakan (*Fitur Unggulan*)
Fitur cerdas AI yang paling dicari juri untuk membedakan sistem ini dari biodigester biasa:

1. **Prediksi Asidosis / Digester Souring:**
   * *Analisis AI:* *"Tren pH turun 0.3 dalam 6 jam terakhir terdeteksi karena input limbah buah/jeruk asam berlebih."*
   * *Rekomendasi Tindakan:* *"Tambahkan 1.5 Liter larutan kapur pertanian / air kelapa terfermentasi dan tahan input asam selama 24 jam."*
2. **Prediksi Saturasi Filter Scrubber Gas (H2S):**
   * *Analisis AI:* *"Beban serapan H2S mencapai 82% dari kapasitas media spons oksida besi."*
   * *Rekomendasi Tindakan:* *"Jadwalkan pencucian/penggantian media filter bio-scrubber dalam 4 hari ke depan untuk mencegah korosi katup."*
3. **Deteksi Hambatan Pisau Pencacah (Shredder Load Anomaly):**
   * *Analisis AI:* *"Arus motor pencacah naik 18% dari beban standar. Terindikasi material berserat liat atau pisau butuh pengasahan."*
   * *Rekomendasi Tindakan:* *"Periksa hopper input pencacah dan lakukan pembersihan mata pisau."*
4. **Log Servis & Kalibrasi Sensor:**
   * Jadwal kalibrasi probe pH (tiap 30 hari).
   * Pemeriksaan seal karet gasket penutup digester.

---

### Layar 5: Notifikasi & Peringatan Otomatis (Alert Center)
Daftar notifikasi dengan visual tag prioritas (*High, Medium, Info*):
* 🔴 **[KAPASITAS KRITIS]** Biogas mencapai 85% — Segera gunakan untuk kompor atau aktifkan sistem penyimpanan cadangan.
* 🔵 **[PANEN SIAP]** Pupuk cair telah mencapai 18 Liter — Buka keran kuras outlet.
* 🟡 **[AI REKOMENDASI]** AI Vision mendeteksi kantong plastik di conveyor — Sistem menghentikan hopper selama 5 detik untuk pemilahan manual.
* 🟢 **[INFO MAINTENANCE]** Siklus pengadukan agitator otomatis berhasil dijalankan (Durasi 3 menit).

---

### Layar 6: Dampak Lingkungan & SDGs Counter (Circular Impact)
Menyediakan bukti terukur untuk makalah/presentasi:
* 📉 **Pengurangan Emisi Karbon:** Mengurangi `42.6 kg CO2e` emisi metana lepas per minggu.
* ♻️ **Limbah TPA Tereduksi:** `174 Kg` food waste dalam 7 hari pengoperasian.
* 🎯 **Alignment SDGs:**
  * **SDG 7 (Affordable & Clean Energy):** Produksi biogas terdesentralisasi.
  * **SDG 9 (Industry, Innovation & Infrastructure):** Integrasi AIoT telemetri canggih.
  * **SDG 12 (Responsible Consumption & Production):** Sirkularitas limbah makanan bernilai guna.
  * **SDG 13 (Climate Action):** Mitigasi pelepasan gas rumah kaca dari pembusukan anaerobik tak terkontrol di TPA.

---

## 5. Spesifikasi Teknis UI/UX Design

* **Palet Warna (Eco-Tech Modern Palette):**
  * `Primary Brand:` Deep Emerald Forest (`#123924` / `#1F5E3A`) — Merepresentasikan kelestarian alam dan biomassa.
  * `Accent Fresh:` Bio-Lime Energy (`#8FC93A`) — Indikator sistem aktif, normal, dan pertumbuhan hayati.
  * `Energy Output:` Amber Gold (`#E3A73B`) — Indikator api biogas dan energi panas bersih.
  * `Liquid Fertilizer:` Azure Bio-Blue (`#3E7CB8`) — Indikator pupuk organik cair dan hidrologi.
  * `Solid Compost:` Earth Umber Brown (`#9C6B3E`) — Indikator kompos pupuk padat.
  * `Alert Red:` Coral Vermilion (`#D95C4A`) — Peringatan overpressure / kontaminan AI.
  * `Background Surface:` Mint Slate Light (`#F2F6EF` & `#FFFFFF`).
* **Tipografi:**
  * *Body & UI Labels:* `Plus Jakarta Sans` (Elegan, modern, dan sangat nyaman dibaca).
  * *Metrics & Sensor Numbers:* `Space Grotesk` (Kesan presisi industri dan instrumen IoT).
* **Interaktivitas:**
  * Setiap kartu, sensor bar, tombol panen, dan notifikasi memiliki status reaksi (*clickable feedback*, toast pop-up, dan transisi antar-layar yang mulus).
  * Terdapat simulator interaktif: pengguna bisa menekan tombol *"Simulasi Tambah Food Waste"* atau *"Simulasi Panen Gas"* untuk melihat perubahan grafik secara langsung di hadapan juri.

---

## 6. Rencana Implementasi Bertahap

| Fase | Target Luaran | Durasi |
|---|---|---|
| **Fase 1: Desain & PRD** | Finalisasi konsep, wireframe, & arsitektur sistem web prototype | Selesai |
| **Fase 2: Pembuatan Prototype Interaktif** | Membangun UI Web berbasis Vanilla HTML/CSS/JS (Model Phone Frame + Dashboard) | Tahap Berikutnya |
| **Fase 3: Simulasi Data Sensor & Engine AI** | Menghubungkan logika telemetri simulasi (Suhu, pH, Level Gas) & diagnosa AI | Tahap Berikutnya |
| **Fase 4: Testing & Deploy Netlify/Vercel** | Uji coba interaktivitas, optimasi visual presentasi juri, dan publikasi URL | Tahap Akhir |
