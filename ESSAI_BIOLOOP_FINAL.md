# BioLoop: Sistem Terintegrasi Konversi Food Waste menjadi Biogas dan Biofertilizer Berbasis AI dan IoT untuk Mendukung Circular Economy

**Kategori Kompetisi:** Inovasi Teknologi Berkelanjutan & Circular Economy  
**Target:** Kompetisi Inovasi Nasional (KIMNAS) 2026

---

## Abstrak / Ringkasan Gagasan
Sampah merupakan salah satu persoalan lingkungan yang terus meningkat seiring dengan pertumbuhan aktivitas konsumsi masyarakat. Sistem Informasi Pengelolaan Sampah Nasional (SIPSN, 2024) mencatat bahwa sisa makanan (*food waste*) merupakan komponen terbesar timbulan sampah nasional, yakni mencapai **39,36%** dari total **33,79 juta ton**. Timbulan ini didominasi oleh sektor rumah tangga (50,8%), pasar tradisional (16,67%), serta pusat kuliner dan restoran (11,01%). Pendekatan konvensional linier (*take-use-dispose*) menyebabkan biomassa bernilai tinggi ini berakhir membusuk di TPA dan melepaskan gas metana berbahaya ke atmosfer. 

**BioLoop** hadir sebagai sistem konversi terintegrasi berbasis *Artificial Intelligence* (AI) dan *Internet of Things* (IoT) yang mengolah *food waste* melalui proses *anaerobic digestion* menjadi tiga keluaran bernilai guna tinggi: **Biogas**, **Pupuk Organik Cair (POC)**, dan **Pupuk Organik Padat (POP)**. Sistem ini dilengkapi platform pemantauan digital cerdas (*BioLoop AIoT Web Platform*) yang memantau alur konversi secara *real-time*, mendeteksi anomali fermentasi (*digester souring*), memberikan rekomendasi perawatan prediktif (*predictive maintenance*), serta memberikan notifikasi otomatis saat kapasitas gas atau pupuk telah penuh dan siap dipanen. Dengan demikian, BioLoop mentransformasi timbulan sampah organik menjadi aset energi terbarukan dan nutrisi pertanian yang mendukung *Circular Economy* dan pencapaian SDGs (7, 9, 12, dan 13).

---

## 1. Pendahuluan & Latar Belakang Masalah

Sampah merupakan salah satu persoalan lingkungan yang terus meningkat seiring dengan pertumbuhan aktivitas konsumsi masyarakat. Perubahan pola konsumsi dan tingginya aktivitas ekonomi mendorong peningkatan timbulan sampah, sementara pengelolaan yang masih didominasi pendekatan ekonomi linear (*take-use-dispose*) menyebabkan sebagian besar limbah berakhir sebagai residu tanpa dimanfaatkan kembali secara optimal. Wikurendra et al. (2024) menjelaskan bahwa perubahan pola konsumsi masyarakat berkontribusi terhadap peningkatan timbunan sampah, sedangkan sistem pengelolaan yang belum sepenuhnya menerapkan prinsip ekonomi sirkular menyebabkan potensi material yang terkandung dalam limbah belum dimanfaatkan secara optimal. Kondisi tersebut menunjukkan bahwa persoalan persampahan tidak hanya berkaitan dengan jumlah limbah yang dihasilkan, tetapi juga bagaimana limbah tersebut dapat ditransformasi menjadi sumber daya yang memiliki nilai guna dan ekonomi.

```
+-------------------------------------------------------------------------+
|     Gambar 1. Grafik Persentase Timbulan Sampah Berdasarkan Jenis       |
|                       (Sumber: SIPSN - KLHK, 2024)                      |
|                                                                         |
|   [============================== 39.36% ==============================] |
|   Sisa Makanan (Food Waste) - Komponen Terbesar Nasional                |
|                                                                         |
|   [============= 19.2% =============] Kayu / Ranting                    |
|   [=========== 14.1% ===========] Plastik                               |
|   [======== 10.5% ========] Kertas / Karton                             |
|   [===== 5.2% =====] Logam & Kaca                                       |
|   [=========== 11.64% ===========] Lainnya                              |
+-------------------------------------------------------------------------+
```

Karakteristik timbulan sampah menunjukkan bahwa salah satu komponen terbesar berasal dari limbah organik, khususnya sisa makanan (*food waste*). Sistem Informasi Pengelolaan Sampah Nasional (SIPSN) menunjukkan bahwa *food waste* merupakan komponen terbesar timbulan sampah nasional, yaitu mencapai **39,36%** dari total **33,79 juta ton** sampah yang dihasilkan pada tahun 2024. Timbulan tersebut didominasi oleh sektor rumah tangga sebesar 50,8%, diikuti pasar tradisional sebesar 16,67% serta pusat perdagangan dan kuliner sebesar 11,01% (SIPSN, 2024). Hasil tersebut sejalan dengan penelitian Wijaya dan Sjah (2026) yang menunjukkan bahwa lebih dari setengah komposisi limbah domestik, yaitu 52,55%, merupakan material organik. 

Dominasi *food waste* tersebut menunjukkan bahwa permasalahan sampah tidak hanya terletak pada besarnya volume limbah, tetapi juga pada belum optimalnya pemanfaatan biomassa organik yang terkandung di dalamnya. Padahal, biomassa tersebut memiliki potensi untuk dikonversi menjadi energi terbarukan berupa biogas sekaligus menghasilkan pupuk organik cair dan pupuk organik padat melalui proses *anaerobic digestion*.

Biomassa organik memiliki karakteristik yang sesuai untuk dimanfaatkan sebagai bahan baku dalam proses *anaerobic digestion*. Melalui proses tersebut, bahan organik dapat dikonversi menjadi biogas sebagai sumber energi terbarukan serta menghasilkan *digestate* yang dapat dimanfaatkan menjadi pupuk organik cair dan pupuk organik padat (Cesar et al., 2025). Pemanfaatan tersebut memungkinkan satu aliran limbah menghasilkan beberapa produk bernilai guna sehingga tidak berhenti pada upaya pengurangan volume sampah, tetapi juga menciptakan nilai tambah dari biomassa yang sebelumnya dianggap sebagai limbah. Pendekatan ini sejalan dengan prinsip ekonomi sirkular yang menempatkan limbah sebagai sumber daya yang dapat dikembalikan ke dalam siklus pemanfaatan. Oleh karena itu, *food waste* memiliki peluang strategis untuk dikembangkan sebagai bahan baku bioenergi sekaligus sumber produk turunan yang mendukung keberlanjutan ekonomi.

Namun, optimalisasi potensi tersebut tidak hanya ditentukan oleh keberadaan teknologi *anaerobic digestion*, melainkan juga oleh bagaimana keseluruhan proses pengolahan biomassa dirancang dan diintegrasikan. Produksi biogas memerlukan tahapan yang saling berkaitan, mulai dari pemilahan bahan baku, pencacahan, pengaturan kadar air, fermentasi anaerob, hingga pemurnian biogas sebelum digunakan sebagai sumber energi (Vigueras-Carmona et al., 2025; Cesar et al., 2025). Pada saat yang sama, proses tersebut menghasilkan *digestate* yang perlu dipisahkan dan dikelola agar dapat dimanfaatkan sebagai pupuk organik cair dan pupuk organik padat. Dengan demikian, pengelolaan *food waste* tidak cukup hanya berorientasi pada satu tahapan atau satu produk, tetapi membutuhkan sistem yang menghubungkan input biomassa, proses konversi, pengendalian proses, pemurnian, pemisahan hasil, hingga pemanfaatan seluruh output dalam satu alur yang terpadu.

Berbagai teknologi pengolahan limbah organik telah dikembangkan untuk menjawab kebutuhan tersebut, seperti biodigester, pengomposan, *refuse-derived fuel* (RDF), maupun *Black Soldier Fly* (BSF). Masing-masing teknologi memiliki mekanisme dan keluaran yang berbeda. Biodigester berfokus pada konversi biomassa organik menjadi biogas, pengomposan menghasilkan pupuk organik, RDF memanfaatkan limbah sebagai bahan bakar alternatif, sedangkan BSF mengubah limbah organik menjadi biomassa bernilai ekonomi. Keberadaan berbagai teknologi tersebut menunjukkan bahwa *food waste* memiliki berbagai jalur pemanfaatan. Namun, masih terdapat kebutuhan untuk mengintegrasikan tahapan pengolahan *food waste* secara menyeluruh sehingga satu sistem tidak hanya mengolah biomassa, tetapi juga menghubungkan proses konversi dengan pengendalian operasional serta optimalisasi seluruh produk yang dihasilkan. Integrasi tersebut menjadi penting untuk meningkatkan efisiensi proses sekaligus memaksimalkan nilai guna dan nilai ekonomi dari setiap bagian biomassa.

---

## 2. Gagasan & Mekanisme Kerja BioLoop

Berdasarkan permasalahan tersebut, diperlukan suatu sistem pengolahan *food waste* yang mengintegrasikan keseluruhan alur konversi biomassa dalam satu ekosistem. Sistem yang dikembangkan mengintegrasikan pemilahan dan persiapan bahan baku, pencacahan biomassa, pengaturan kondisi proses, fermentasi anaerob, pemurnian biogas, serta pengolahan hasil samping menjadi pupuk organik cair dan pupuk organik padat. AI dan IoT digunakan sebagai teknologi pendukung untuk membantu proses identifikasi, pengukuran, pemantauan kondisi, serta penyediaan data operasional secara *real-time*. Melalui pendekatan tersebut, *food waste* tidak hanya dipandang sebagai limbah yang harus dikurangi, tetapi sebagai input yang dapat diproses menjadi tiga keluaran utama berupa biogas, pupuk organik cair, dan pupuk organik padat. Integrasi tersebut membentuk suatu sistem konversi yang menghubungkan aliran limbah dengan energi dan produk bernilai ekonomi sehingga dapat mendukung penerapan ekonomi sirkular dan menciptakan nilai tambah dari biomassa organik.

BioLoop merupakan sistem terintegrasi berbasis *Artificial Intelligence* (AI) dan *Internet of Things* (IoT) yang dirancang untuk mengonversi *food waste* menjadi tiga keluaran bernilai guna, yaitu biogas, pupuk organik cair, dan pupuk organik padat. Sistem ini mengintegrasikan tahapan pengolahan biomassa, konversi biologis melalui *anaerobic digestion*, pemurnian biogas, serta pengolahan hasil samping dalam satu alur pemanfaatan yang saling terhubung. Dalam mekanismenya, AI berperan mendukung identifikasi dan pengolahan data, sedangkan IoT memungkinkan pemantauan parameter operasional secara *real-time* untuk membantu menjaga kondisi proses. Integrasi tersebut menjadikan BioLoop tidak hanya berorientasi pada pengolahan limbah, tetapi juga pada optimalisasi pemanfaatan setiap keluaran yang dihasilkan.

```
+-----------------------------------------------------------------------------------------+
|                  Gambar 2. Diagram Alur Kerja Sistem Terintegrasi BioLoop               |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|  [ Sumber Food Waste ] (Restoran, Pasar, Rumah Tangga, Kantin)                          |
|           │                                                                             |
|           ▼                                                                             |
|  [ 1. AI Vision Sorter ] ───> Tolak Kontaminan (Plastik / Logam / Kaca)                 |
|           │                                                                             |
|           ▼                                                                             |
|  [ 2. Smart Shredder & Mixer ] (Pencacahan 2-4 mm + Pengaturan Kadar Air 75-80%)        |
|           │                                                                             |
|           ▼                                                                             |
|  [ 3. Anaerobic Digester ] <── Telemetri IoT (Suhu 37°C, pH 7.1, Tekanan Gas)           |
|           │                <── AI Predictive Maintenance (Deteksi Asidosis & Kerusakan) |
|           ├───────────────────────────────────┐                                         |
|           ▼                                   ▼                                         |
|  [ 4. Biogas Gas Scrubbing ]          [ 5. Digestate Phase Separator ]                  |
|     (Filter H2S Oksida Besi)                  (Centrifuge & Filter Press)               |
|           │                                   ├───────────────────┐                     |
|           ▼                                   ▼                   ▼                     |
|   PRODUK 1: BIOGAS MURNI              PRODUK 2: POC       PRODUK 3: POP                 |
|   (Energi Bersih / Kompor)         (Pupuk Organik Cair) (Pupuk Organik Padat)           |
+-----------------------------------------------------------------------------------------+
```

Mekanisme BioLoop dirancang melalui serangkaian tahapan yang saling terhubung, dimulai dari penerimaan dan pemilahan *food waste* untuk memastikan bahan baku yang diolah sesuai dengan kebutuhan proses. Biomassa organik kemudian dicacah menjadi ukuran yang lebih kecil dan dicampurkan dengan air untuk menyesuaikan kondisi bahan sebelum memasuki tahap *anaerobic digestion*. Pada tahap ini, mikroorganisme menguraikan bahan organik dalam kondisi tanpa oksigen sehingga menghasilkan biogas dan *digestate* sebagai hasil samping. Biogas yang terbentuk selanjutnya melalui proses pemurnian untuk mengurangi kandungan pengotor (seperti gas asam H2S dan uap air) sebelum disimpan dan dimanfaatkan sebagai sumber energi. Sementara itu, *digestate* dipisahkan menjadi fraksi cair dan padat yang berpotensi diolah lebih lanjut menjadi pupuk organik cair dan pupuk organik padat. Dengan demikian, satu rangkaian pengolahan menghasilkan tiga keluaran utama yang dapat dimanfaatkan sesuai karakteristiknya.

Integrasi AI dan IoT mendukung pengendalian serta pemantauan proses pada tahapan yang relevan. AI berbasis pengenalan visual (*computer vision*) membantu mengidentifikasi benda asing anorganik yang tidak sesuai untuk masuk ke dalam proses pengolahan (seperti plastik kemasan, sendok, atau tulang keras). Sensor yang terhubung melalui IoT digunakan untuk memantau parameter operasional secara kontinu, seperti suhu digester, pH fermentasi, kelembaban substrat, dan tekanan gas metana. 

Data telemetri tersebut ditampilkan secara intuitif melalui **Web Dashboard & Mobile App BioLoop**, sehingga operator dapat mengamati kondisi proses secara langsung dan mengenali penyimpangan yang memerlukan tindakan korektif. Sistem juga dilengkapi algoritma **AI Predictive Maintenance** yang mampu memproyeksikan anomali operasional—seperti gejala penurunan pH mendadak (*acidosis/souring*), saturasi media filter scrubber H2S, maupun beban motor pencacah yang meningkat—serta mengirimkan notifikasi otomatis saat tangki gas atau pupuk telah mencapai kapasitas optimal untuk segera dipanen.

---

## 3. Tahapan Implementasi & Kemitraan Strategis

Implementasi BioLoop dirancang secara bertahap agar integrasi sistem, efektivitas pengolahan, dan pemanfaatan produk dapat diuji sebelum diterapkan dalam skala yang lebih luas:

```
+-----------------------------------------------------------------------------------------+
|                  Gambar 3. Roadmap Tahapan Implementasi Sistem BioLoop                  |
+-----------------------------------------------------------------------------------------+
|   Tahap 1: Prototipe Lab        Tahap 2: Pilot Testing        Tahap 3: Kemitraan & Skala │
|   • Uji stabilitas anaerob      • Uji coba resto & kantin     • Rantai pasok limbah     │
|   • Integrasi sensor IoT        • Standarisasi mutu POC/POP   • Distribusi energi/pupuk │
|   • Model AI vision & deteksi   • Evaluasi keandalan cloud    • Integrasi SDGs daerah   │
+-----------------------------------------------------------------------------------------+
```

1. **Tahap Pertama (Prototipe & Uji Laboratorium):** Evaluasi kinerja proses *anaerobic digestion*, kestabilan parameter operasional (pH 6.8–7.4 dan suhu 35–38°C), kalibrasi sensor IoT, serta akurasi pengenalan kontaminan visual berbasis AI.
2. **Tahap Kedua (Uji Coba Terbatas / Pilot Project):** Melibatkan sumber *food waste* riil, seperti rumah makan, kantin kampus, pasar tradisional, dan pelaku usaha katering. Fokus evaluasi diarahkan pada kapasitas pengolahan, konsistensi produksi biogas, kualitas kimia pupuk POC dan POP, serta efektivitas notifikasi pemanenan pada platform web.
3. **Tahap Ketiga (Kemitraan Operasional & Komersialisasi):** Membangun ekosistem sirkular antara penyedia limbah (hulu), pengelola sistem BioLoop, dan pengguna produk (hilir):
   * **Sektor Hulu:** Restoran, pasar, dan hotel memasok limbah makanan terpilah.
   * **Pengelola BioLoop:** Mengoperasikan alat, memantau dashboard AIoT, dan mengemas hasil produksi.
   * **Sektor Hilir:** Biogas disalurkan ke fasilitas dapur bersama atau kompor UMKM, sedangkan pupuk POC dan POP didistribusikan kepada kelompok tani perkotaan (*urban farming*) maupun pertanian komersial.

Evaluasi keberhasilan dinilai berdasarkan indikator teknis (tonase limbah diolah, volume biogas m³, kualitas NPK pupuk), indikator lingkungan (reduksi emisi CO2e dan reduksi beban TPA), serta indikator ekonomi (penghematan bahan bakar LPG dan pendapatan dari penjualan pupuk organik).

---

## 4. Keunggulan, Kebaruan, dan Kontribusi Terhadap Circular Economy & SDGs

```
+-----------------------------------------------------------------------------------------+
|                  Gambar 4. Model Circular Economy Ekosistem BioLoop                     |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|       [ Restoran & Pasar ] ──(Food Waste)──> [ BioLoop AIoT Processing ]                |
|               ▲                                       │                                 |
|               │                                       ├──> [ Biogas ] ──> Energi Memasak│
|               │                                       │                                 |
|     Bahan Pangan Segar                                └──> [ Biofertilizer (POC/POP) ]  |
|               │                                                      │                  |
|               └────────────── [ Pertanian Organik ] <────────────────┘                  |
+-----------------------------------------------------------------------------------------+
```

### Keunggulan & Kebaruan Sistem
1. **Pendekatan Multi-Output Terpadu:** Berbeda dari biodigester sederhana yang sering kali mengabaikan *digestate*, BioLoop memproses tuntas seluruh fraksi limbah menjadi 3 produk komersial bernilai tambah.
2. **AI-Assisted Operational Intelligence:** Mengubah biodigester dari sistem pasif (*black box*) menjadi sistem cerdas yang mampu mencegah kegagalan fermentasi, memberikan rekomendasi pemeliharaan prediktif, dan mengoptimalkan siklus panen.
3. **Pengelolaan Tertutup Tanpa Polusi Bau:** Pencacahan higienis, sistem anaerobik kedap udara, dan penyaringan H2S memastikan unit BioLoop aman ditempatkan di kawasan semi-perkotaan, kantin, maupun pasar.

### Keselarasan dengan Sustainable Development Goals (SDGs)
* **SDG 7 (Energi Bersih dan Terjangkau):** Memproduksi biogas terbarukan lokal sebagai substitusi bahan bakar fosil LPG.
* **SDG 9 (Industri, Inovasi, dan Infrastruktur):** Menerapkan inovasi teknologi sensor IoT dan kecerdasan buatan dalam pengelolaan limbah cerdas.
* **SDG 12 (Konsumsi dan Produksi yang Bertanggung Jawab):** Mengurangi timbulan sampah makanan dan menerapkan sirkularitas material.
* **SDG 13 (Penanganan Perubahan Iklim):** Mencegah emisi gas metana liar dari pembusukan sampah di TPA yang memiliki potensi pemanasan global 28x lebih tinggi daripada CO2.

---

## 5. Kesimpulan
BioLoop menawarkan solusi transformatif terhadap krisis timbulan *food waste* di Indonesia melalui integrasi *anaerobic digestion*, sensor IoT, dan kecerdasan buatan. Dengan menghasilkan biogas, pupuk organik cair, dan pupuk organik padat secara terpadu serta didukung oleh sistem pemantauan berbasis web yang intuitif, BioLoop tidak hanya menyelesaikan persoalan lingkungan tetapi juga menciptakan kemandirian energi dan kesuburan pertanian yang sejalan dengan prinsip *Circular Economy*.
