/**
 * BioLoop AIoT Web Platform: Interactive Engine
 * Mendukung simulasi live sensor, bento widget, diagnosa AI, dan panen komoditas.
 * Zero AI-slop, clean typography, SVG iconography.
 */

// State Management
const state = {
  activeScreen: 'dashboard',
  wasteIntakeToday: 24.8,
  tempC: 37.2,
  ph: 7.1,
  moisturePct: 78,
  pressureBar: 1.8,
  methanePct: 68,
  
  // Output capacities
  biogasPct: 85,
  biogasVolM3: 5.2,
  pocPct: 72,
  pocVolL: 18.0,
  popPct: 45,
  popVolKg: 10.2,

  // Health & AI
  healthScore: 96,
  isAcidosis: false,
  unreadNotifs: 3
};

// Clock updater
function updateClock() {
  const clockEl = document.getElementById('live-clock');
  if (clockEl) {
    const d = new Date();
    const hours = String(d.getHours()).padStart(2, '0');
    const mins = String(d.getMinutes()).padStart(2, '0');
    clockEl.textContent = `${hours}:${mins}`;
  }
}
setInterval(updateClock, 1000);
updateClock();

// View Mode Toggle (Mobile Phone vs Full Dashboard)
const btnViewPhone = document.getElementById('view-mode-phone');
const btnViewDesktop = document.getElementById('view-mode-desktop');

if (btnViewPhone && btnViewDesktop) {
  btnViewPhone.addEventListener('click', () => {
    document.body.classList.remove('mode-desktop-active');
    btnViewPhone.classList.add('active');
    btnViewDesktop.classList.remove('active');
    showToast('Beralih ke mode Mobile App');
  });

  btnViewDesktop.addEventListener('click', () => {
    document.body.classList.add('mode-desktop-active');
    btnViewDesktop.classList.add('active');
    btnViewPhone.classList.remove('active');
    showToast('Beralih ke mode Full Dashboard');
  });
}

// Navigation Function
function navigateTo(screenId) {
  state.activeScreen = screenId;
  
  // Switch screen active class
  document.querySelectorAll('.screen').forEach(scr => {
    scr.classList.toggle('active', scr.dataset.screen === screenId);
  });

  // Switch bottom nav active class
  document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.classList.toggle('active', tab.dataset.nav === screenId);
  });

  // Scroll active screen to top
  const activeEl = document.querySelector(`.screen[data-screen="${screenId}"] .screen-content`);
  if (activeEl) activeEl.scrollTop = 0;
}

// Open Specific Output Card from Dashboard
function openOutputTab(type) {
  navigateTo('produksi');
  
  const map = {
    biogas: 'card-prod-biogas',
    poc: 'card-prod-poc',
    pop: 'card-prod-pop'
  };

  const targetCardId = map[type];
  if (targetCardId) {
    document.querySelectorAll('.production-detail-card').forEach(c => c.classList.remove('highlight'));
    const el = document.getElementById(targetCardId);
    if (el) {
      el.classList.add('highlight');
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => el.classList.remove('highlight'), 1800);
    }
  }
}

// Toast Popup Function
let toastTimer = null;
function showToast(message) {
  const toast = document.getElementById('toast-notif');
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add('show');
  
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 2200);
}

// Update DOM elements reflecting state
function renderDOM() {
  // Dashboard Hero Radial Gauge
  const elHeroMethane = document.getElementById('hero-methane-pct');
  if (elHeroMethane) elHeroMethane.textContent = `${state.methanePct}%`;

  const heroGaugeCircle = document.getElementById('hero-gauge-circle');
  if (heroGaugeCircle) {
    const circumference = 251.2;
    const offset = circumference - (circumference * (state.methanePct / 100));
    heroGaugeCircle.style.strokeDashoffset = offset;
  }

  // Dashboard Waste Metric
  const elWaste = document.getElementById('val-waste-intake');
  if (elWaste) elWaste.textContent = state.wasteIntakeToday.toFixed(1);

  // Biogas DOM
  document.querySelectorAll('#dash-pct-biogas, #prod-biogas-pct').forEach(el => el.textContent = `${state.biogasPct}%`);
  const barBiogas = document.getElementById('dash-bar-biogas');
  const barProdBiogas = document.getElementById('prod-biogas-bar');
  if (barBiogas) barBiogas.style.width = `${state.biogasPct}%`;
  if (barProdBiogas) barProdBiogas.style.width = `${state.biogasPct}%`;
  
  const elBioVol = document.getElementById('prod-biogas-vol');
  const elBioSub = document.getElementById('dash-qty-biogas');
  const lpgEquiv = (state.biogasVolM3 / 2.15).toFixed(1);
  if (elBioVol) elBioVol.textContent = `${state.biogasVolM3.toFixed(1)} m³`;
  if (elBioSub) elBioSub.textContent = `${state.biogasVolM3.toFixed(1)} m³ / Setara ${lpgEquiv} Tabung LPG`;

  // POC DOM
  document.querySelectorAll('#dash-pct-poc, #prod-poc-pct').forEach(el => el.textContent = `${state.pocPct}%`);
  const barPoc = document.getElementById('dash-bar-poc');
  const barProdPoc = document.getElementById('prod-poc-bar');
  if (barPoc) barPoc.style.width = `${state.pocPct}%`;
  if (barProdPoc) barProdPoc.style.width = `${state.pocPct}%`;
  
  const elPocVol = document.getElementById('prod-poc-vol');
  const elPocSub = document.getElementById('dash-qty-poc');
  if (elPocVol) elPocVol.textContent = `${state.pocVolL.toFixed(1)} Liter`;
  if (elPocSub) elPocSub.textContent = `${state.pocVolL.toFixed(1)} Liter / ${state.pocPct > 65 ? 'Siap Kuras' : 'Fermentasi'}`;

  // POP DOM
  document.querySelectorAll('#dash-pct-pop, #prod-pop-pct').forEach(el => el.textContent = `${state.popPct}%`);
  const barPop = document.getElementById('dash-bar-pop');
  const barProdPop = document.getElementById('prod-pop-bar');
  if (barPop) barPop.style.width = `${state.popPct}%`;
  if (barProdPop) barProdPop.style.width = `${state.popPct}%`;

  const elPopVol = document.getElementById('prod-pop-vol');
  const elPopSub = document.getElementById('dash-qty-pop');
  if (elPopVol) elPopVol.textContent = `${state.popVolKg.toFixed(1)} Kg`;
  if (elPopSub) elPopSub.textContent = `${state.popVolKg.toFixed(1)} Kg / Pengeringan`;

  // Valuation
  const bioVal = Math.round(state.biogasVolM3 * 10500);
  const pocVal = Math.round(state.pocVolL * 15000);
  const popVal = Math.round(state.popVolKg * 8000);
  const totalVal = bioVal + pocVal + popVal;

  const elValSum = document.getElementById('total-val-sum');
  if (elValSum) elValSum.textContent = `Rp ${totalVal.toLocaleString('id-ID')}`;

  // Sensor Telemetry
  const elTemp = document.getElementById('val-temp');
  const elBarTemp = document.getElementById('bar-temp');
  if (elTemp) elTemp.innerHTML = `${state.tempC.toFixed(1)} <span class="unit">°C</span>`;
  if (elBarTemp) elBarTemp.style.width = `${(state.tempC / 60) * 100}%`;

  const elPh = document.getElementById('val-ph');
  const elBarPh = document.getElementById('bar-ph');
  if (elPh) elPh.innerHTML = `${state.ph.toFixed(1)} <span class="unit">pH</span>`;
  if (elBarPh) elBarPh.style.width = `${(state.ph / 14) * 100}%`;

  const elMoist = document.getElementById('val-moisture');
  const elBarMoist = document.getElementById('bar-moisture');
  if (elMoist) elMoist.innerHTML = `${Math.round(state.moisturePct)} <span class="unit">%</span>`;
  if (elBarMoist) elBarMoist.style.width = `${state.moisturePct}%`;

  const elPress = document.getElementById('val-pressure');
  const elBarPress = document.getElementById('bar-pressure');
  if (elPress) elPress.innerHTML = `${state.pressureBar.toFixed(1)} <span class="unit">Bar</span>`;
  if (elBarPress) elBarPress.style.width = `${(state.pressureBar / 2.5) * 100}%`;

  // Health Score
  const elHealth = document.getElementById('ai-health-score');
  if (elHealth) elHealth.textContent = state.healthScore;
}

// SIMULATION 1: Tambah 5 Kg Sampah
function simTriggerAddWaste() {
  state.wasteIntakeToday += 5.0;
  state.moisturePct = Math.min(84, state.moisturePct + 2);
  state.biogasPct = Math.min(96, state.biogasPct + 4);
  state.biogasVolM3 = +(state.biogasVolM3 + 0.35).toFixed(2);
  state.pocPct = Math.min(92, state.pocPct + 3);
  state.pocVolL = +(state.pocVolL + 1.2).toFixed(1);
  state.popPct = Math.min(85, state.popPct + 2);
  state.popVolKg = +(state.popVolKg + 0.8).toFixed(1);

  renderDOM();
  showToast('Memasukkan 5.0 Kg food waste ke shredder & digester.');
}

// SIMULATION 2: Panen / Salurkan Biogas ke Kompor
function simTriggerHarvestGas() {
  if (state.biogasPct <= 20) {
    showToast('Kapasitas gas rendah (20%). Biarkan fermentasi berlangsung.');
    return;
  }
  const harvestedM3 = (state.biogasVolM3 * 0.55).toFixed(1);
  state.biogasPct = 30;
  state.biogasVolM3 = +(state.biogasVolM3 - harvestedM3).toFixed(1);
  
  renderDOM();
  showToast(`Membuka valve: ${harvestedM3} m³ gas disalurkan ke dapur.`);
}

// SIMULATION 3: Kuras Pupuk POC
function simTriggerHarvestPOC() {
  if (state.pocVolL <= 4.0) {
    showToast('Volume POC belum mencukupi batas kuras ekonomis.');
    return;
  }
  const drainedL = 10.0;
  state.pocVolL = Math.max(2.0, +(state.pocVolL - drainedL).toFixed(1));
  state.pocPct = Math.round((state.pocVolL / 25.0) * 100);

  renderDOM();
  showToast(`Menguras 10.0L pupuk organik cair ke jerigen siap jual.`);
}

// SIMULATION 3B: Kemas Pupuk POP
function simTriggerHarvestPOP() {
  if (state.popVolKg <= 3.0) {
    showToast('Massa digestate padat belum mencapai siklus panen.');
    return;
  }
  const packedKg = 5.0;
  state.popVolKg = Math.max(1.5, +(state.popVolKg - packedKg).toFixed(1));
  state.popPct = Math.round((state.popVolKg / 22.0) * 100);

  renderDOM();
  showToast(`Mengemas 5.0 Kg bio-kompos padat ke karung kemasan.`);
}

// SIMULATION 4: Trigger Anomali Asidosis (pH Drop)
function simTriggerAcidosisAnomaly() {
  state.isAcidosis = true;
  state.ph = 5.8; // Acidic drop
  state.tempC = 39.4; // Temp spike
  state.methanePct = 42; // Methane quality drops
  state.healthScore = 71;

  // Update AI Recommendation Card dynamically
  const souringTag = document.getElementById('souring-tag');
  const souringTitle = document.getElementById('souring-title');
  const souringDesc = document.getElementById('souring-desc');
  const souringAction = document.getElementById('souring-action');

  if (souringTag) {
    souringTag.textContent = 'Peringatan Asidosis';
    souringTag.className = 'recom-tag alert-amber';
  }
  if (souringTitle) {
    souringTitle.textContent = 'Potensi Asidosis Reaktor (pH 5.8 Drop)';
    souringTitle.style.color = 'var(--red-primary)';
  }
  if (souringDesc) {
    souringDesc.textContent = 'Akumulasi asam lemak volatil (VFA) melampaui kapasitas buffer. Populasi metanogen tertekan.';
  }
  if (souringAction) {
    souringAction.style.borderLeftColor = 'var(--red-primary)';
    souringAction.style.background = '#FEF2F2';
    souringAction.innerHTML = '<strong>Resep AI:</strong> Injeksikan 250 gram buffer Ca(OH)2 (air kapur) & perlambat laju input substrat selama 12 jam.';
  }

  const dashStrip = document.getElementById('dash-ai-strip-text');
  if (dashStrip) {
    dashStrip.textContent = 'Peringatan: pH turun ke 5.8 (Asidosis). AI merekomendasikan injeksi 250g Ca(OH)2.';
  }

  renderDOM();
  showToast('Simulasi asidosis aktif: Perhatikan rekomendasi AI Maintenance.');
}

// SIMULATION 5: Reset Sistem ke Normal
function simResetAll() {
  state.wasteIntakeToday = 24.8;
  state.tempC = 37.2;
  state.ph = 7.1;
  state.moisturePct = 78;
  state.pressureBar = 1.8;
  state.methanePct = 68;
  state.biogasPct = 85;
  state.biogasVolM3 = 5.2;
  state.pocPct = 72;
  state.pocVolL = 18.0;
  state.popPct = 45;
  state.popVolKg = 10.2;
  state.healthScore = 96;
  state.isAcidosis = false;

  // Restore AI Recommendation Card
  const souringTag = document.getElementById('souring-tag');
  const souringTitle = document.getElementById('souring-title');
  const souringDesc = document.getElementById('souring-desc');
  const souringAction = document.getElementById('souring-action');

  if (souringTag) {
    souringTag.textContent = 'Kondisi Stabil';
    souringTag.className = 'recom-tag alert-green';
  }
  if (souringTitle) {
    souringTitle.textContent = 'Stabilitas Derajat Keasaman (pH)';
    souringTitle.style.color = 'var(--ink-primary)';
  }
  if (souringDesc) {
    souringDesc.textContent = 'Aktivitas bakteri metanogen dalam rasio seimbang (pH 7.1). Tidak ada risiko pengasaman reaktor (souring).';
  }
  if (souringAction) {
    souringAction.style.borderLeftColor = 'var(--brand-primary)';
    souringAction.style.background = 'var(--surface-muted)';
    souringAction.innerHTML = '<strong>Rekomendasi Operasional:</strong> Pertahankan variasi input sampah sayur & nasi seimbang.';
  }

  const dashStrip = document.getElementById('dash-ai-strip-text');
  if (dashStrip) {
    dashStrip.textContent = 'Kondisi pH stabil (7.1). Media bio-scrubber H2S tersisa 4 hari sebelum perlu regenerasi.';
  }

  renderDOM();
  showToast('Sistem BioLoop telah di-reset ke kondisi operasional optimal.');
}

// Refresh Sensors
function refreshSensors() {
  state.tempC = +(37.0 + (Math.random() * 0.6 - 0.3)).toFixed(1);
  state.moisturePct = Math.round(77 + (Math.random() * 2));
  renderDOM();
  showToast('Telemetri sensor IoT berhasil diperbarui.');
}

// Run Quick AI Diagnostic
function runAiDiagnostic() {
  showToast('AI memindai 1.420 data sensor: Seluruh katup & mikroba normal.');
}

// Mark notifications read
function markAllNotificationsRead() {
  const badge = document.getElementById('notif-badge');
  if (badge) badge.style.display = 'none';
  showToast('Semua notifikasi telah ditandai terbaca.');
}

// Direct button triggers in screen
function simulateHarvestBiogas() { simTriggerHarvestGas(); }
function simulateHarvestPOC() { simTriggerHarvestPOC(); }
function simulateHarvestPOP() { simTriggerHarvestPOP(); }

// ================= INTERACTIVE ONBOARDING TUTORIAL ENGINE =================
const onboardingSteps = [
  {
    stepNum: 'Langkah 1 / 5',
    iconBg: 'var(--brand-bg)',
    iconSvg: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>',
    title: 'Input & Sortir AI Vision',
    subtitle: 'Deteksi Kontaminan Anorganik Otomatis',
    desc: 'Limbah sisa makanan ditimbang dan dimasukkan ke hopper inlet. Kamera edge AI Vision otomatis mendeteksi dan menolak kontaminan anorganik (plastik, sendok, styrofoam) dengan akurasi 96.4% sebelum pencacahan mikro 2-4 mm.',
    tip: '<strong>Tahap Kunci:</strong> Menjamin kemurnian substrat organik agar proses fermentasi anaerobik tidak terganggu residu non-biodegradable.'
  },
  {
    stepNum: 'Langkah 2 / 5',
    iconBg: 'var(--amber-bg)',
    iconSvg: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D97706" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>',
    title: 'Fermentasi & Telemetri IoT',
    subtitle: 'Digester Anaerobik Terkendali 24/7',
    desc: 'Substrat organik masuk ke bioreaktor tertutup. Sensor multi-parameter ESP32 memantau suhu mesofilik (37.2°C), pH (7.1 netral), kelembapan, dan tekanan secara real-time. Agitator otomatis berputar berkala mencegah timbunan kerak (scum).',
    tip: '<strong>Stabilitas Reaktor:</strong> Bakteri metanogen bekerja optimal pada kondisi mesofilik 35°C sampai 38°C dan pH 6.8 sampai 7.4.'
  },
  {
    stepNum: 'Langkah 3 / 5',
    iconBg: 'var(--blue-bg)',
    iconSvg: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0284C7" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>',
    title: 'Panen 3 Produk Bernilai Tinggi',
    subtitle: 'Biogas Murni, Pupuk POC & Pupuk POP',
    desc: 'Konversi anaerobik menghasilkan 3 komoditas bernilai ekonomi: Biogas termurnikan (CH4 68% setara 2.4 tabung LPG), Pupuk Organik Cair (POC kaya NPK untuk fertigasi), dan Bio-kompos padat (POP) untuk rehabilitasi tanah.',
    tip: '<strong>Notifikasi Panen:</strong> Sistem otomatis memicu alarm ketika tangki penyimpanan gas atau pupuk mencapai di atas 80% kapasitas.'
  },
  {
    stepNum: 'Langkah 4 / 5',
    iconBg: 'var(--indigo-bg)',
    iconSvg: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>',
    title: 'AI Predictive Maintenance',
    subtitle: 'Proteksi Asidosis & Filter Bio-Scrubber',
    desc: 'Algoritma machine learning BioLoop memprediksi potensi pengasaman (acidosis/souring) sebelum terjadi kegagalan reaktor. Memberikan resep presisi (injeksi buffer air kapur Ca(OH)2) serta estimasi umur filter bio-scrubber H2S.',
    tip: '<strong>Zero Downtime:</strong> Mencegah kerugian matinya koloni bakteri tanpa memerlukan tes laboratorium manual.'
  },
  {
    stepNum: 'Langkah 5 / 5',
    iconBg: 'var(--green-bg)',
    iconSvg: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#15803D" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon></svg>',
    title: 'Simulasi Live untuk Juri',
    subtitle: 'Eksplorasi Responsif Real-Time Platform',
    desc: 'Di sisi kanan layar tersedia panel simulasi live untuk demonstrasi kepada Dewan Juri: Uji Skenario Asidosis (pH drop), Simulasi Panen Biogas, Panen Pupuk, hingga Tambah Timbulan Sampah untuk menguji respon adaptif sistem.',
    tip: '<strong>Tips Presentasi:</strong> Gunakan tombol "Full Dashboard" di navigasi atas jika ingin menampilkan visualisasi lebar di proyektor.'
  }
];

let currentTutorialStep = 0;

function renderOnboardingStep(index) {
  if (index < 0 || index >= onboardingSteps.length) return;
  currentTutorialStep = index;
  const step = onboardingSteps[index];

  // Counter
  const counterEl = document.getElementById('onboarding-step-counter');
  if (counterEl) counterEl.textContent = step.stepNum;

  // Body Content with clean SVG
  const bodyEl = document.getElementById('onboarding-body-content');
  if (bodyEl) {
    bodyEl.innerHTML = `
      <div class="onboarding-hero-icon" style="background: ${step.iconBg};">
        ${step.iconSvg}
      </div>
      <h3>${step.title}</h3>
      <span class="onboarding-subtitle">${step.subtitle}</span>
      <p class="onboarding-desc">${step.desc}</p>
      <div class="onboarding-tip-box">${step.tip}</div>
    `;
  }

  // Dots
  const dotsContainer = document.getElementById('onboarding-dots');
  if (dotsContainer) {
    dotsContainer.innerHTML = onboardingSteps.map((_, i) => 
      `<span class="dot ${i === index ? 'active' : ''}" onclick="goToOnboardingStep(${i})" style="cursor:pointer;" title="Ke langkah ${i + 1}"></span>`
    ).join('');
  }

  // Navigation Buttons
  const btnPrev = document.getElementById('btn-step-prev');
  const btnNext = document.getElementById('btn-step-next');

  if (btnPrev) {
    btnPrev.style.display = index === 0 ? 'none' : 'flex';
  }

  if (btnNext) {
    if (index === onboardingSteps.length - 1) {
      btnNext.innerHTML = '<span>Mulai Eksplorasi</span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>';
      btnNext.style.background = 'linear-gradient(135deg, #059669 0%, #064E3B 100%)';
    } else {
      btnNext.innerHTML = '<span>Lanjut</span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>';
      btnNext.style.background = 'linear-gradient(135deg, var(--brand-light) 0%, var(--brand-primary) 100%)';
    }
  }
}

function openOnboardingTutorial(stepIndex = 0) {
  const modal = document.getElementById('onboarding-modal');
  if (!modal) return;
  modal.style.display = 'flex';
  renderOnboardingStep(stepIndex);
}

function closeOnboardingTutorial() {
  const modal = document.getElementById('onboarding-modal');
  if (modal) {
    modal.style.display = 'none';
  }
  try {
    sessionStorage.setItem('bioloop_tutorial_seen', 'true');
  } catch (e) {
    // Ignore storage restrictions
  }
}

function nextOnboardingStep() {
  if (currentTutorialStep < onboardingSteps.length - 1) {
    renderOnboardingStep(currentTutorialStep + 1);
  } else {
    closeOnboardingTutorial();
    showToast('Selamat menjelajahi platform BioLoop AIoT.');
  }
}

function prevOnboardingStep() {
  if (currentTutorialStep > 0) {
    renderOnboardingStep(currentTutorialStep - 1);
  }
}

function goToOnboardingStep(index) {
  renderOnboardingStep(index);
}

// Close modal when clicking on the dark backdrop
const onboardingModalEl = document.getElementById('onboarding-modal');
if (onboardingModalEl) {
  onboardingModalEl.addEventListener('click', (e) => {
    if (e.target === onboardingModalEl) {
      closeOnboardingTutorial();
    }
  });
}

// Auto open tutorial on first visit after a soft delay
window.addEventListener('DOMContentLoaded', () => {
  try {
    if (!sessionStorage.getItem('bioloop_tutorial_seen')) {
      setTimeout(() => {
        openOnboardingTutorial(0);
      }, 700);
    }
  } catch (e) {
    // fallback
  }
});

// Initial Render
renderDOM();
