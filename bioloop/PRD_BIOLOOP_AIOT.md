# PRODUCT REQUIREMENT DOCUMENT (PRD) & ARSITEKTUR SISTEM
# BioLoop: Smart AIoT Dashboard & Product Management System

**Sistem Terintegrasi Konversi Food Waste Menjadi Tiga Komoditas Sirkular (Biogas, POC, POP) Berbasis AI dan IoT untuk Mendukung Circular Economy**  
*Kesesuaian Subtema KIMNAS XI: Ekonomi Hijau · Ekonomi Keberlanjutan · Teknologi Digital*

---

## 1. Visi Produk & Pergeseran Paradigma
### Dari "Sekadar Alat Biodigester" Menjadi "Pabrik Mikro Cerdas Penghasil 3 Komoditas Sirkular"

Pada esai dan implementasi teknologi terkini, sistem fisik BioLoop tidak lagi diposisikan sebagai mesin biodigester konvensional yang pasif (*black box*), melainkan sebagai **pabrik mikro terdesentralisasi penghasil tiga produk ekonomi sirkular** yang dikendalikan melalui Web Platform cerdas berbasis AIoT:

1. **Fokus Produk (Product-Centric Monitoring):**
   * Web memantau secara *real-time* volume dan kesiapan panen 3 komoditas utama:
     * **Biogas Metana ($CH_4$ Murni):** Pemantauan tekanan (Bar), persentase volume tangki, dan ekuivalensi energi listrik (kWh) serta substitusi tabung gas LPG 3 Kg.
     * **Pupuk Organik Cair (POC):** Sensor ultrasonik mendeteksi ketinggian cairan (Liter), stabilitas derajat keasaman (pH 6.8–7.4), dan kesiapan kemas.
     * **Pupuk Organik Padat (POP):** Load cell dan sensor kelembaban kompartemen padat mendeteksi kematangan kompos digestate (kadar air $<25\%$) siap kirim ke kelompok tani.
2. **Fokus Alur Kerja (End-to-End Workflow Tracking):**
   * Visualisasi interaktif status aktif 5 tahapan konversi kontinu (*Penerimaan & Pemilahan AI $\rightarrow$ Pencacahan & Slurry Prep $\rightarrow$ Anaerobic Digestion $\rightarrow$ Pemurnian Gas Scrubber $\rightarrow$ Separasi Digestate POC & POP*).
3. **Fokus Keandalan & Perawatan (AI Predictive Maintenance):**
   * Mesin AI di lapisan *cloud/web* mengolah deviasi telemetri sensor untuk mendiagnosis anomali sedini mungkin (kebocoran katup pipa gas B-02, pengasaman reaktor/asidosis, saturasi media filter scrubber $H_2S$, dan lonjakan beban arus motor pencacah) serta menerbitkan rekomendasi tindakan preskriptif ke operator.

---

## 2. Arsitektur Integrasi AIoT ke Website

Hubungan transmisi antara instrumentasi fisik, pemrosesan kecerdasan buatan, dan antarmuka web dirancang dalam arsitektur 3-lapisan terpadu:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│               LAPISAN 1: FISIK & SENSOR IoT (PADA UNIT HARDWARE BIOLOOP)               │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ [S1] Kamera Edge & Load Cell       : Input pemilahan anorganik & timbangan massa (Kg)  │
│ [S2] Sensor Reaktor Biologis       : Suhu mesofilik (°C), Probe pH, Kelembaban Slurry │
│ [S3] Sensor Kapasitas Produk       : Pressure Transducer (Bar) & Level Ultrasonik (POC)│
│ [S4] Sensor Keandalan Mesin        : Sensor Arus CT Motor Pencacah & Resistensi Aliran │
└────────────────────────────────────────┬───────────────────────────────────────────────┘
                                         │ Transmisi Telemetri (MQTT / REST API)
                                         ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│               LAPISAN 2: CLOUD BACKEND & AI ENGINE (DI WEBSITE / SERVER)               │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ • IoT Gateway & Broker Telemetri   : Injeksi data sensor real-time per detik           │
│ • AI Vision Classifier Model       : Deteksi kontaminan plastik, sendok, styrofoam     │
│ • AI Predictive Maintenance Engine : Korelasi multi-sensor, deteksi dini & anomali     │
│ • Yield & Readiness Predictor      : Estimasi waktu penuh tangki & penjadwalan offtaker│
└────────────────────────────────────────┬───────────────────────────────────────────────┘
                                         │ Render Real-Time & Event Dispatch
                                         ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│               LAPISAN 3: ANTARMUKA WEBSITE BIOLOOP (UI/UX DASHBOARD & APP)             │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ [UI 1] Visualisasi Alur Kerja 5 Tahap Interaktif (Active / Idle / Alert)               │
│ [UI 2] Hub Monitor Kapasitas Produk (Biogas 88%, POC 92%, POP 75%)                     │
│ [UI 3] AI Diagnostic & Prescriptive Maintenance Center (Index 0-100% per komponen)    │
│ [UI 4] Portal Rantai Pasok Hulu & Distribusi Mitra Hilir (Offtaker Auto-Dispatch)      │
│ [UI 5] Dasbor Dampak SDGs & Neraca Valuasi Ekonomi Sirkular (SDG 7, 9, 12, 13)         │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Spesifikasi 5 Modul Utama Website

Untuk memberikan pengalaman interaktif yang memukau bagi dewan juri dan kemudahan pengoperasian bagi pengelola, web platform BioLoop dibagi ke dalam 5 modul fungsional:

### Modul 1: Interactive Workflow Pipeline (Pemantau Alur Kerja Real-Time)
Menampilkan status alur pengolahan biomassa secara visual dari hulu ke hilir dengan indikator status aktif:
* **Tahap 1 – Penerimaan & Pemilahan AI:** Menampilkan tangkapan feed kamera, berat food waste masuk (24.8 Kg hari ini), dan kemurnian bahan organik (96.4%).
* **Tahap 2 – Pencacahan & Pencampuran Air (Slurry Prep):** Status motor pencacah (arus 1.2A, reduksi partikel 2–4 mm), dan rasio pencampuran air otomatis.
* **Tahap 3 – Anaerobic Digestion (Reaktor Utama):** Kondisi bakteri metanogen melalui grafik real-time pH (7.1), suhu mesofilik (37.2°C), dan hydraulic retention time (HRT 21 hari).
* **Tahap 4 – Pemurnian (Scrubbing) Biogas:** Pemantauan penyerapan pengotor $H_2S$ dan $CO_2$ melalui media $Fe_2O_3$ sebelum dialirkan ke gas holder.
* **Tahap 5 – Separasi Digestate (Fraksi Cair & Padat):** Pemantauan centrifuge dan filter press yang memisahkan ampas digestate menjadi POC cair dan bio-kompos padat POP.

### Modul 2: Product Capacity & Readiness Hub (Kesiapan Komoditas)
Panel khusus yang berorientasi pada nilai ekonomi hasil konversi:
* **Tangki Biogas (Smart Gas Holder):**
  * Indikator volume 85% (5.2 $m^3$) pada tekanan 1.8 Bar.
  * Status: *"Siap Disalurkan / Kapasitas Hampir Penuh"*.
  * Ekuivalensi energi: Setara 12.4 kWh listrik atau 2.4 Tabung Gas LPG 3 Kg (penghematan Rp 54.000,-).
* **Tangki Pupuk Organik Cair (POC):**
  * Sensor level ultrasonik menampilkan kapasitas tangki (18.0 L skala unit atau 460L/500L skala fasilitas komunal).
  * Indikator mutu: pH 7.2 terstabilisasi, rasio NPK 1.8-1.2-2.1, status: *"Siap Kuras & Kemas Jerigen"*.
* **Kompartemen Pupuk Organik Padat (POP):**
  * Sensor timbangan kompartemen menunjukkan 10.2 Kg (45% terisi).
  * Indikator kematangan: Kadar air $<25\%$, rasio C/N 15:1 seimbang, status: *"Fase Pengeringan / Siap Distribusi Tani"*.

### Modul 3: AI Predictive Maintenance & Health Center
Nilai kebaruan utama AI di sisi web platform (menjawab 40% bobot penilaian inovasi dan solusi KIMNAS XI):
* **Skor Kesehatan Sistem (System Health Score):** Indeks gabungan (96/100) dan rincian 4 komponen kritis:
  1. *Motor Pencacah (94%):* Arus beban 1.2A normal, keausan mata pisau rendah.
  2. *Ruang Digester (98%):* Ekosistem anaerobik mesofilik stabil, nol risiko asidifikasi.
  3. *Filter Scrubber $H_2S$ (84%):* Akumulasi durasi pakai media 210 jam, sisa 4 hari sebelum regenerasi.
  4. *Katup Pipa Gas B-02 (96%):* Tekanan saluran kedap dan stabil.
* **Kartu Rekomendasi Perawatan Preskriptif (AI Maintenance Advisor):**
  * **Alert:** Apa yang menyimpang atau berisiko rusak.
  * **Root Cause (Analisis AI):** Penjelasan kausalitas berdasarkan korelasi multi-sensor.
  * **Actionable Recommendation:** Langkah tindakan korektif konkret beserta SLA waktu penanganan.

### Modul 4: Circular Supply Chain & Offtaker Portal (Hulu ke Hilir)
Menghubungkan data telemetri kesiapan panen dengan ekosistem mitra:
* **Pencatatan Mitra Hulu (Pemasok Sampah):**
  * Kantin Pusat Kampus (142 Kg/minggu).
  * Resto & Pujasera Mitra (98 Kg/minggu).
  * Pasar Tradisional Wonokromo (210 Kg/minggu).
* **Manajemen Mitra Hilir (Offtaker Komoditas):**
  * Notifikasi otomatis *"Stok Siap Distribusi"* saat volume tangki mencapai $\ge 85\%$.
  * Kelompok Tani Makmur Lestari (POC cair dialokasikan untuk pemupukan hortikultura).
  * Dapur Bersama UMKM Binaan (Biogas metana disalurkan melalui jalur pipa terukur).
  * Kelompok Urban Farming (Kompos padat POP dialokasikan untuk media semai bibit).

### Modul 5: Circular Economy & SDGs Impact Calculator
Dasbor kalkulasi dampak otomatis untuk memperkuat validitas ilmiah:
* **Pengurangan Emisi Gas Rumah Kaca:** Mencegah $174.5\text{ kg CO}_2\text{e}$ emisi metana lepas ke atmosfer per 30 hari.
* **Reduksi Beban TPA:** Menyelamatkan $496\text{ Kg}$ sampah organik dari penumpukan di TPA.
* **Nilai Valuasi Ekonomi Sirkular:** Akumulasi penghematan LPG + nilai jual POC dan POP (mencapai Rp 405.600,- per batch siklus).
* **Keselarasan 4 Pilar SDGs:** SDG 7 (Energi Bersih), SDG 9 (Infrastruktur Cerdas), SDG 12 (Produksi Bertanggung Jawab), SDG 13 (Aksi Iklim).

---

## 4. Matriks Logika AI di Website
### Korelasi Multi-Sensor ke Rekomendasi Preskriptif Otomatis

| No | Parameter Sensor IoT | Kondisi Terdeteksi di Web | Fokus Analisis AI | Rekomendasi Tindakan Otomatis pada Web |
|---|---|---|---|---|
| **1** | Tekanan Gas (Bar) & Flow Meter | Tekanan mencapai ambang atas ($>1.5\text{ Bar}$) | **Kapasitas Produk (Biogas Penuh)** | Notifikasi *"Tangki Biogas Penuh (95%)"*; instruksikan pembukaan katup distribusi ke kompor dapur bersama atau aktifkan kompresor gas cadangan. |
| **2** | Level Ultrasonik Tangki Cair & Padat | Ketinggian cairan/padatan $\ge 90\%$ kapasitas tangki | **Kapasitas Produk (POC/POP Penuh)** | Notifikasi *"Panen Pupuk Siap"*; aktifkan penjadwalan distribusi otomatis ke mitra kelompok tani dan tahan pemompaan slurry baru sementara. |
| **3** | Tekanan Gas & Suhu Reaktor | Suhu normal ($37.2^\circ\text{C}$), umpan normal, tapi tekanan gas anjlok ($<0.8\text{ Bar}$) | **Deteksi Kerusakan Alat (Kebocoran/Sumbatan)** | **AI Maintenance Alert:** Indikasi kebocoran pada membran/katup pipa gas B-02. Rekomendasikan inspeksi segel gasket flange segera (SLA: $<2$ jam). |
| **4** | Sensor pH & Suhu Digester | pH anjlok di bawah 6.2 (*acidosis*) & produksi metana melambat | **Gangguan Proses Biologis** | **AI Process Advisor:** Akumulasi asam lemak volatil (VFA) berlebih. Hentikan umpan food waste sementara dan injeksikan 250g buffer alkali $\text{Ca(OH)}_2$ (air kapur). |
| **5** | Kamera Visual & Arus Motor Pencacah | Terdeteksi sendok logam/plastik atau arus motor melonjak ($>4.5\text{A}$) | **Pencegahan Kerusakan Mekanis** | **AI Safety Cut-Off:** Hentikan daya motor otomatis dalam 500ms; tampilkan peringatan kontaminan di layar operator dan instruksikan pembersihan mata pisau. |
| **6** | Waktu Operasional Scrubber ($H_2S$) | Waktu operasional mencapai 210 jam & hambatan aliran naik $0.05\text{ Bar}$ | **Jadwal Perawatan Preventif** | **AI Maintenance Alert:** Media spons oksida besi $\text{Fe}_2\text{O}_3$ mendekati jenuh. Jadwalkan regenerasi/penggantian media filter dalam 4 hari ke depan. |

---

## 5. Kerangka Kolaborasi Pentuple Helix (Pentahelix)

Platform Web BioLoop berfungsi sebagai simpul integrasi (*hub*) pertukaran data, pasokan bahan baku, dan distribusi produk antara lima pemangku kepentingan:

1. **Pemerintah (Regulator & Kebijakan):** KLHK dan Dinas Lingkungan Hidup daerah menggunakan data dasbor SDGs BioLoop untuk pelaporan pengurangan timbulan sampah ke SIPSN.
2. **Akademisi / Peneliti (Inovasi & Litbang):** Kampus mengoptimalkan formulasi konsorsium mikroba metanogen dan memvalidasi akurasi model AI vision.
3. **Industri Teknologi / AIoT (Infrastruktur):** Penyedia gateway IoT, cloud broker MQTT, dan sensor industri memastikan uptime sistem 24/7.
4. **Pemasok Hulu (Restoran, Kantin, Pasar):** Memasok limbah makanan terpilah, mendapatkan insentif pengurangan retribusi sampah daerah.
5. **Mitra Hilir (Kelompok Tani & UMKM):** Menyerap pupuk bio-organik cair/padat berbiaya terjangkau serta memanfaatkan biogas untuk energi masak murah.

---

## 6. Panduan Gambar untuk Draf Esai (GAMBAR 1 - 5)

Berikut adalah panduan pembuatan ilustrasi seragam berbasis mockup web dan arsitektur sistem BioLoop untuk disisipkan pada naskah esai:

* **GAMBAR 1 (PROSES ALUR KERJA):** Diagram alur horizontal 5 tahap fisik di bagian bawah (*Pemilahan $\rightarrow$ Pencacahan $\rightarrow$ Digester $\rightarrow$ Scrubber $\rightarrow$ Separator*) yang disinkronkan dengan lapisan pemantauan AIoT Web di bagian atas.
* **GAMBAR 2 (IMPLEMENTASI SISTEM):** Mockup UI Dashboard Web BioLoop secara utuh (menampilkan circular gauge $CH_4$, kartu kapasitas Biogas/POC/POP, sparkline sensor, dan kartu rekomendasi preskriptif AI).
* **GAMBAR 3 (KELEBIHAN KEBARUAN):** Matriks komparasi visual arsitektur berlapis BioLoop (*3 Produk + AI Predictive Maintenance*) dibandingkan biodigester konvensional yang beroperasi tanpa telemetri (*black box*).
* **GAMBAR 4 (CIRCULAR ECONOMY & SDGS):** Diagram melingkar tertutup (*closed-loop*) dari food waste kuliner $\rightarrow$ BioLoop AIoT $\rightarrow$ Biogas (SDG 7), AIoT Web (SDG 9), Pupuk Organik (SDG 12), Reduksi Metana TPA (SDG 13).
* **GAMBAR 5 (KOLABORASI PENTUPLE HELIX):** Skema kemitraan 5 elemen (Pemerintah, Kampus, Industri AIoT, Pemasok Hulu, dan Mitra Hilir) yang terhubung dalam satu portal web terpadu.
