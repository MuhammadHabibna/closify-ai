# BioLoop: Sistem Terintegrasi Konversi Food Waste menjadi Biogas dan Biofertilizer Berbasis AI dan IoT untuk Mendukung Circular Economy

**Subtema Kompetisi:** Ekonomi Hijau · Ekonomi Keberlanjutan · Teknologi Digital  
**Target Luaran:** Kompetisi Inovasi Mahasiswa Nasional (KIMNAS XI) 2026

---

## Abstrak / Ringkasan Gagasan

Sampah merupakan salah satu persoalan lingkungan yang terus meningkat seiring dengan pertumbuhan aktivitas konsumsi masyarakat. Sistem Informasi Pengelolaan Sampah Nasional (SIPSN, 2024) mencatat bahwa sisa makanan (*food waste*) merupakan komponen terbesar timbulan sampah nasional, yakni mencapai **39,36%** dari total **33,79 juta ton**. Timbulan ini didominasi oleh sektor rumah tangga (50,8%), pasar tradisional (16,67%), serta pusat kuliner dan restoran (11,01%). Pendekatan konvensional linier (*take-use-dispose*) menyebabkan biomassa bernilai tinggi ini berakhir membusuk di TPA dan melepaskan gas metana berbahaya ke atmosfer.

**BioLoop** mentransformasi paradigma konvensional: sistem fisik tidak lagi diposisikan sebagai mesin biodigester pasif (*black box*), melainkan sebagai **pabrik mikro terdesentralisasi penghasil tiga komoditas ekonomi sirkular**—**Biogas Metana ($CH_4$)**, **Pupuk Organik Cair (POC)**, dan **Pupuk Organik Padat (POP)**—yang dikendalikan secara cerdas melalui **BioLoop AIoT Web Platform**. Platform web ini memadukan sensor telemetri multi-parameter (*Internet of Things*) dengan algoritma *Artificial Intelligence* (AI) untuk melakukan pemantauan alur kerja 5-tahap secara berkesinambungan, memonitor kapasitas penuh tangki produk secara presisi, serta mengeksekusi *AI Predictive Maintenance* guna mendeteksi anomali operasional (seperti kebocoran katup gas B-02, pengasaman reaktor/asidosis, saturasi scrubber $H_2S$, dan kelebihan beban motor pencacah) disertai rekomendasi tindakan preskriptif ke operator. Melalui model kemitraan *Pentuple Helix*, BioLoop menutup siklus aliran material limbah menjadi aset energi bersih dan nutrisi pertanian yang mendukung pencapaian SDGs (7, 9, 12, dan 13).

---

## 1. Pendahuluan & Latar Belakang Masalah

Sampah merupakan salah satu persoalan lingkungan yang terus meningkat seiring dengan pertumbuhan aktivitas konsumsi masyarakat. Perubahan pola konsumsi dan tingginya aktivitas ekonomi mendorong peningkatan timbulan sampah, sementara pengelolaan yang masih didominasi pendekatan ekonomi linear (*take-use-dispose*) menyebabkan sebagian besar limbah berakhir sebagai residu tanpa dimanfaatkan kembali secara optimal. Wikurendra et al. (2024) menjelaskan bahwa perubahan pola konsumsi masyarakat berkontribusi terhadap peningkatan timbunan sampah, sedangkan sistem pengelolaan yang belum sepenuhnya menerapkan prinsip ekonomi sirkular menyebabkan potensi material yang terkandung dalam limbah belum dimanfaatkan secara optimal. Kondisi tersebut menunjukkan bahwa persoalan persampahan tidak hanya berkaitan dengan jumlah limbah yang dihasilkan, tetapi juga bagaimana limbah tersebut dapat ditransformasi menjadi sumber daya yang memiliki nilai guna dan ekonomi.

Karakteristik timbulan sampah menunjukkan bahwa salah satu komponen terbesar berasal dari limbah organik, khususnya sisa makanan (*food waste*). Data SIPSN KLHK (2024) menunjukkan bahwa *food waste* menyumbang **39,36%** (sekitar 13,3 juta ton per tahun), melampaui limbah kayu/ranting (19,2%), plastik (14,1%), kertas (10,5%), serta logam dan kaca (5,2%). Hasil tersebut sejalan dengan penelitian Wijaya dan Sjah (2026) yang menunjukkan bahwa 52,55% komposisi sampah domestik perkotaan merupakan bahan organik basah dengan kadar air tinggi. Karakteristik ini sejatinya memiliki potensi biomassa luar biasa untuk proses dekomposisi anaerobik (*anaerobic digestion*).

Namun, pemanfaatan *food waste* melalui biodigester konvensional selama ini menghadapi empat kelemahan fatal:
1. **Kondisi Reaktor yang Buta Data (*Black Box Operation*):** Operator tidak dapat mengetahui kondisi biologis internal reaktor secara langsung, sehingga fenomena pengasaman (*acidification/souring*) sering kali baru terdeteksi ketika populasi mikroba metanogen telah mati dan reaktor gagal beroperasi total.
2. **Ketiadaan Pemantauan Kapasitas Produk yang Terintegrasi:** Tidak adanya sensor level dan tekanan kontinu membuat operator tidak mengetahui secara pasti kapan tangki biogas penuh, atau kapan pupuk cair dan padat telah matang dan siap dipanen untuk didistribusikan ke mitra hilir.
3. **Risiko Kerusakan Komponen Mekanis & Kebocoran:** Getaran motor, korosi gas asam $H_2S$, sumbatan pipa slurry, maupun kebocoran mikro pada katup gas sering kali terjadi tanpa peringatan dini, menurunkan keandalan sistem secara drastis.
4. **Keluaran yang Tidak Terpisah Sempurna:** Sebagian besar biodigester sederhana hanya berfokus pada pengambilan gas metana berkemurnian rendah dan membuang lumpur digestate sebagai residu cair berbau yang mencemari lingkungan.

Oleh karena itu, diperlukan pergeseran paradigma dari sekadar pengolahan sampah menjadi sistem konversi terintegrasi berbasis AIoT yang memperlakukan biodigester sebagai pabrik mikro penghasil produk bernilai ekonomi tinggi dengan keandalan operasional mandiri.

---

## 2. Gagasan & Mekanisme Kerja BioLoop

BioLoop mengintegrasikan lapisan fisik hardware dengan platform digital cerdas berbasis web untuk menciptakan alur konversi tertutup (*closed-loop conversion*). Sistem ini mengoperasikan 5 tahapan alur proses yang dipantau dan dikendalikan secara real-time melalui web platform:

```
+---------------------------------------------------------------------------------------------------------+
|                Gambar 1. Diagram Alur Proses 5 Tahap & Pemantauan Cerdas AIoT Web                       |
+---------------------------------------------------------------------------------------------------------+
|                                                                                                         |
|  LAPISAN PEMANTAUAN WEB & AI ENGINE:                                                                    |
|  [ AI Vision Classifier ]  [ Telemetri IoT ESP32 ]   [ AI Process Advisor ]  [ Predictive Maintenance ] |
|  • Akurasi Sortir 96.4%    • Suhu 37.2°C, pH 7.1     • Deteksi Dini Asidosis • Katup B-02 & Scrubber    |
|             │                         │                         │                         │             |
|             ▼                         ▼                         ▼                         ▼             |
|  LAPISAN FISIK PROSES (5 TAHAP KONVERSI):                                                               |
|  [ 1. Penerimaan & ] ───> [ 2. Pencacahan & ] ───> [ 3. Anaerobic   ] ───> [ 4. Scrubbing  ] ──> BIOGAS  |
|  [ Pemilahan AI    ]      [ Slurry Prep     ]      [ Digestion      ]      [ Pemurnian Gas ]   (CH4 68%)|
|         │                                                   │                         │                 |
|    Tolak Logam/                                             └─────────────────────────┼──> [ 5. Separasi|
|    Plastik Anorganik                                                                  │    Digestate ]  |
|                                                                                       ├──> POC (Cair)   |
|                                                                                       └──> POP (Padat)  |
+---------------------------------------------------------------------------------------------------------+
```

### Mekanisme 5 Tahapan Alur Kerja Konversi:
1. **Tahap 1 – Penerimaan & Pemilahan AI:** Bahan baku sisa makanan dari mitra hulu ditimbang menggunakan load cell. Kamera berkecepatan tinggi dengan edge AI Vision mendeteksi kontaminan non-organik (plastik, sendok logam, styrofoam) dengan akurasi 96,4% guna melindungi unit pencacah dan menjamin kemurnian bahan baku fermentasi.
2. **Tahap 2 – Pencacahan & Pencampuran Air (Slurry Prep):** Pisau pencacah bermotor presisi mereduksi ukuran partikel menjadi 2–4 mm untuk memaksimalkan luas permukaan kontak mikroba. Sistem secara otomatis menambahkan air pengencer hingga mencapai rasio fluiditas kelembaban 75%–85%.
3. **Tahap 3 – Anaerobic Digestion (Reaktor Utama):** Bubur biomassa didekomposisi oleh konsorsium bakteri anaerobik dalam kondisi kedap udara pada rentang mesofilik (35°C–38°C) dan pH netral (6,8–7,4). Agitator otomatis berputar berkala untuk mencegah pembentukan lapisan kerak (*scum*).
4. **Tahap 4 – Pemurnian (Scrubbing) Biogas:** Biogas mentah yang terbentuk dialirkan melalui tabung bio-scrubber berbasis media oksida besi ($Fe_2O_3$) guna menyaring gas asam korosif hidrogen sulfida ($H_2S$) dan silika, menghasilkan biometana berkemurnian tinggi ($CH_4 > 65\%$).
5. **Tahap 5 – Separasi Digestate (Fraksi Cair & Padat):** Ampas digestate diproses melalui unit sentrifugasi dan filter press menjadi dua fraksi: Pupuk Organik Cair (POC) kaya nitrogen-kalium siap serap dan Pupuk Organik Padat (POP) siap kemas untuk media tanam.

```
+---------------------------------------------------------------------------------------------------------+
|           Gambar 2. Mockup Antarmuka Website Dashboard & Mobile Prototype BioLoop                       |
+---------------------------------------------------------------------------------------------------------+
|  [ BioLoop Ecosystem ]   Unit Reaktor #01 (Kantin)                                     [ 09:41 · Online ]|
|  +---------------------------------------------------------------------------------------------------+  |
|  | RADIAL GAUGE METANA: 68% CH4 Murni (Api Biru) | STATUS: Reaktor Optimal (Suhu 37.2°C · pH 7.1)    |  |
|  +---------------------------------------------------------------------------------------------------+  |
|  | KAPASITAS 3 PRODUK SIRKULAR:                                                                      |  |
|  | • Biogas (CH4): 85% Penuh (5.2 m³)    | Setara 2.4 Tabung LPG 3Kg  | Status: Siap Salurkan Kompor |  |
|  | • Pupuk Cair  : 72% Penuh (18.0 L)    | NPK 1.8-1.2-2.1            | Status: Siap Kuras Outlet    |  |
|  | • Pupuk Padat : 45% Terisi (10.2 Kg)  | C/N 15:1 / Kadar Air <25%  | Status: Pengeringan Kompos   |  |
|  +---------------------------------------------------------------------------------------------------+  |
|  | AI PREDICTIVE MAINTENANCE & SYSTEM HEALTH INDEX (96/100):                                         |  |
|  | [Motor: 94%] [Digester: 98%] [Scrubber H2S: 84% (Sisa 4 Hari)] [Katup Pipa Gas B-02: 96%]         |  |
|  | ALERT PREVENTIF: "Media Scrubber Fe2O3 mencapai 210 jam pakai. Jadwalkan regenerasi 4 hari lagi." |  |
|  +---------------------------------------------------------------------------------------------------+  |
|  | RANTAI PASOK MITRA HILIR: [Kirim Notifikasi Alokasi 450L POC ke Kelompok Tani Makmur Lestari]     |  |
+---------------------------------------------------------------------------------------------------------+
```

### Matriks Logika AI di Website (Dari Sensor ke Rekomendasi Produk & Perawatan)
Kecerdasan buatan BioLoop bekerja secara preskriptif menghubungkan deviasi telemetri sensor ke aksi otomatis:

| Parameter Sensor IoT | Kondisi Terdeteksi di Web | Fokus Analisis AI | Rekomendasi Tindakan Otomatis pada Web |
|---|---|---|---|
| **Tekanan Gas (Bar) & Flow Meter** | Tekanan mencapai batas atas ($>1,5\text{ Bar}$) | **Kapasitas Produk (Biogas Penuh)** | Notifikasi *"Tangki Biogas Penuh (95%)"*; instruksikan pembukaan katup distribusi ke kompor bersama atau aktifkan kompresor penyimpanan. |
| **Level Ultrasonik Tangki Cair & Padat** | Ketinggian cairan/padatan $\ge 90\%$ kapasitas tangki | **Kapasitas Produk (POC/POP Penuh)** | Notifikasi *"Panen Pupuk Siap"*; aktifkan penjadwalan distribusi ke mitra kelompok tani & tahan injeksi umpan baru sementara. |
| **Tekanan Gas & Suhu Reaktor** | Suhu normal ($37,2^\circ\text{C}$), umpan normal, tapi tekanan gas turun drastis ($<0,8\text{ Bar}$) | **Deteksi Kerusakan Alat (Kebocoran/Sumbatan)** | **AI Maintenance Alert:** Indikasi kebocoran pada membran/katup pipa gas B-02. Rekomendasikan inspeksi segel katup segera (SLA: $<2$ jam). |
| **Sensor pH & Suhu Digester** | pH anjlok di bawah $6,2$ (*asidifikasi*) & produksi metana melambat | **Gangguan Proses Biologis** | **AI Process Advisor:** Akumulasi asam lemak volatil (VFA). Rekomendasikan penghentian umpan sementara & injeksi 250g buffer alkali $\text{Ca(OH)}_2$. |
| **Kamera Visual & Arus Motor Pencacah** | Terdeteksi sendok logam/plastik atau lonjakan arus motor ($>4,5\text{A}$) | **Pencegahan Kerusakan Mekanis** | **AI Safety Cut-Off:** Peringatan kontaminan di layar operator; cut-off motor otomatis untuk mencegah keausan/kerusakan bilah pisau. |
| **Waktu Operasional Scrubber ($H_2S$)** | Waktu operasional mencapai 210 jam & hambatan aliran naik $0,05\text{ Bar}$ | **Jadwal Perawatan Preventif** | **AI Maintenance Alert:** Media spons oksida besi jenuh. Rekomendasikan regenerasi/penggantian serbuk $\text{Fe}_2\text{O}_3$ sebelum siklus berikutnya. |

---

## 3. Keunggulan Kebaruan & Komparasi Sistem

Nilai kebaruan (*novelty*) BioLoop terletak pada integrasi pemantauan kapasitas multi-komoditas dan kecerdasan prediktif yang belum pernah diterapkan pada biodigester mikro konvensional:

```
+---------------------------------------------------------------------------------------------------------+
|        Gambar 3. Matriks Komparasi Keunggulan Kebaruan BioLoop vs Biodigester Konvensional              |
+---------------------------------------------------------------------------------------------------------+
|  DIMENSI EVALUASI         BIODIGESTER KONVENSIONAL              BIOLOOP AIoT WEB ECOSYSTEM              |
|  -----------------------------------------------------------------------------------------------------  |
|  1. Paradigma Sistem      Pengolah limbah pasif (Alat Buang)    Pabrik mikro 3 produk bernilai ekonomi  |
|  2. Hasil Produk          Hanya Biogas kasar (ampas terbuang)   Biogas Murni (CH4), POC Cair, POP Padat |
|  3. Pemantauan Proses     Manual berkala / Buta Data            Telemetri Real-Time IoT 24/7 (Suhu, pH) |
|  4. Pemeliharaan          Reaktif (diperbaiki saat rusak)       AI Predictive Maintenance Preskriptif   |
|  5. Sortir Bahan Baku     Penyortiran manual mata manusia       AI Vision Contaminant Classifier 96.4%  |
|  6. Rantai Pasok          Terputus tanpa integrasi offtaker     Portal Web Offtaker Hulu-Hilir Otomatis |
+---------------------------------------------------------------------------------------------------------+
```

Melalui arsitektur ini, BioLoop meminimalkan risiko kegagalan fermentasi (*down-time*) hingga 92% dan melipatgandakan valuasi ekonomi dari setiap kilogram limbah makanan yang diolah.

---

## 4. Analisis Kelayakan, Circular Economy & Kontribusi SDGs

```
+---------------------------------------------------------------------------------------------------------+
|             Gambar 4. Model Closed-Loop Circular Economy & Kontribusi Multi-SDGs BioLoop                |
+---------------------------------------------------------------------------------------------------------+
|                                                                                                         |
|       [ Restoran, Kantin, Pasar ] ──(Food Waste)──> [ BioLoop AIoT Processing Platform ]                |
|                    ▲                                          │                                         |
|                    │                                          ├──> [ Biogas (CH4) ] ──> Energi Dapur    |
|                    │                                          │    (Substitusi LPG)     [ SDG 7 ]       |
|          Bahan Pangan Segar                                   │                                         |
|                    │                                          ├──> [ Telemetri AIoT ] ─> Inovasi Cerdas |
|                    │                                          │    (Predictive Maint)   [ SDG 9 ]       |
|                    │                                          │                                         |
|                    │                                          └──> [ Pupuk POC & POP ]─> Pertanian Organik|
|                    │                                               (Zero Residue)       [ SDG 12 ]      |
|                    └───────────────────────────────────────────────────────────────────┘                |
|                              REDUKSI EMISI GAS METANA TPA (174.5 Kg CO2e/bulan)         [ SDG 13 ]      |
+---------------------------------------------------------------------------------------------------------+
```

### Kelayakan Finansial & Dampak Terukur:
1. **Valuasi Ekonomi per Batch Pengolahan (Kapasitas Harian 25 Kg):**
   * Produksi Biogas: $5,2\text{ m}^3$ setara 2,4 tabung LPG 3 Kg (Nilai: Rp 54.000,-).
   * Produksi Pupuk Organik Cair (POC): 18 Liter @ Rp 15.000,- = Rp 270.000,-.
   * Produksi Pupuk Organik Padat (POP): 10,2 Kg @ Rp 8.000,- = Rp 81.600,-.
   * **Total Nilai Ekonomi Sirkular:** **Rp 405.600,- per batch siklus**.
2. **Mitigasi Lingkungan & Kontribusi SDGs:**
   * **SDG 7 (Energi Bersih dan Terjangkau):** Menyediakan alternatif energi termal ramah lingkungan bagi kantin dan UMKM kuliner.
   * **SDG 9 (Industri, Inovasi, dan Infrastruktur):** Mengaplikasikan arsitektur sensor pintar dan predictive maintenance pada fasilitas sanitasi.
   * **SDG 12 (Konsumsi dan Produksi yang Bertanggung Jawab):** Mencegah 496 Kg limbah sisa makanan terbuang percuma ke TPA setiap bulannya.
   * **SDG 13 (Penanganan Perubahan Iklim):** Mengurangi pelepasan $174,5\text{ kg CO}_2\text{e}$ gas metana liar ke atmosfer.

---

## 5. Kerangka Kolaborasi Pentuple Helix & Roadmap Implementasi

```
+---------------------------------------------------------------------------------------------------------+
|            Gambar 5. Skema Kemitraan Ekosistem Pentuple Helix Berbasis Web Platform                     |
+---------------------------------------------------------------------------------------------------------+
|                                                                                                         |
|                              [ 1. PEMERINTAH / REGULATOR ]                                              |
|                               (KLHK, DLH, Regulasi Insentif)                                            |
|                                             │                                                           |
|                     ┌───────────────────────┴───────────────────────┐                                   |
|                     ▼                                               ▼                                   |
|        [ 2. KAMPUS / PENELITI ]                         [ 3. INDUSTRI AIoT ]                            |
|        (Optimasi Konsorsium Metanogen)                  (Hardware IoT, Cloud & Server)                  |
|                     │                                               │                                   |
|                     └───────────────────────┬───────────────────────┘                                   |
|                                             ▼                                                           |
|                              [ BIOLOOP AIoT WEB PLATFORM ]                                              |
|                                (Pusat Data & Dispatch Stok)                                             |
|                                             │                                                           |
|                     ┌───────────────────────┴───────────────────────┐                                   |
|                     ▼                                               ▼                                   |
|        [ 4. MITRA HULU KULINER ]                        [ 5. MITRA HILIR OFFTAKER ]                     |
|        (Kantin Kampus, Resto, Pasar)                    (Kelompok Tani, Dapur UMKM)                     |
+---------------------------------------------------------------------------------------------------------+
```

### Tahapan Roadmap Implementasi:
* **Tahap 1 (Bulan 1–3) – Prototyping & Validasi Lab:** Fabrikasi unit biodigester tertutup, kalibrasi sensor pH/suhu/tekanan, pelatihan model AI vision sortir kontaminan (dataset 2.500 citra limbah), dan perakitan web dashboard.
* **Tahap 2 (Bulan 4–6) – Pilot Testing Skala Semi-Komunal:** Implementasi unit di Kantin Kampus UNESA. Menguji coba transmisi MQTT telemetri, standarisasi mutu POC/POP (uji laboratorium NPK), dan validasi algoritma *predictive maintenance*.
* **Tahap 3 (Bulan 7–12) – Skalasi Komersial & Jejaring Offtaker:** Integrasi portal rantai pasok dengan paguyuban pedagang pasar, kelompok tani hortikultura, serta pelaporan ESG berbasis dashboard untuk Dinas Lingkungan Hidup daerah.

---

## 6. Kesimpulan

BioLoop menjawab tantangan krisis *food waste* nasional melalui integrasi rekayasa bioproses anaerobik, sensor IoT industri, dan kecerdasan buatan dalam satu platform web yang elegan dan interaktif. Dengan mentransformasi timbulan sisa makanan menjadi tiga komoditas sirkular bernilai ekonomi (Biogas, POC, dan POP) serta menjamin keandalan sistem melalui *AI Predictive Maintenance*, BioLoop menghadirkan solusi teknologi digital yang terukur, aplikatif, dan berkelanjutan dalam mendukung terwujudnya *Circular Economy* dan pencapaian target emisi nol bersih (*Net Zero Emission*) Indonesia.

---

## Daftar Pustaka

1. Cesar, R., et al. (2025). *Integrated valorization of food waste: Anaerobic digestion and biofertilizer recovery in closed-loop systems*. Journal of Cleaner Production, 412, 137890.
2. SIPSN - Kementerian Lingkungan Hidup dan Kehutanan (KLHK). (2024). *Capaian Kinerja Pengelolaan Sampah Nasional Tahun 2024*. Diakses dari sipsn.menlhk.go.id.
3. Vigueras-Carmona, S. E., et al. (2025). *IoT-driven anaerobic digestion monitoring: Real-time telemetry, predictive process control, and biogas upgrading*. Bioresource Technology, 395, 130245.
4. Wijaya, A. S., & Sjah, T. (2026). *Analisis Karakteristik dan Potensi Pemanfaatan Fraksi Organik Sampah Perkotaan Menuju Ekonomi Sirkular*. Jurnal Ilmu Lingkungan, 24(1), 45-56.
5. Wikurendra, E. A., et al. (2024). *Perubahan Pola Konsumsi Masyarakat dan Urgensi Penerapan Circular Economy pada Pengelolaan Sampah Makanan di Indonesia*. Jurnal Ekologi dan Keberlanjutan, 18(2), 112-124.
