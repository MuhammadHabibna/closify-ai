/**
 * BioLoop AIoT Web Platform — Interactive Engine
 * Mendukung simulasi live sensor, alur konversi circular, diagnosa AI, dan panen output.
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
    showToast('Beralih ke Mode Mobile Prototype');
  });

  btnViewDesktop.addEventListener('click', () => {
    document.body.classList.add('mode-desktop-active');
    btnViewDesktop.classList.add('active');
    btnViewPhone.classList.remove('active');
    showToast('Beralih ke Mode Full Dashboard');
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
  // Dashboard & Metric values
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
  if (elBioSub) elBioSub.textContent = `${state.biogasVolM3.toFixed(1)} m³ • Setara ${lpgEquiv} LPG`;

  // POC DOM
  document.querySelectorAll('#dash-pct-poc, #prod-poc-pct').forEach(el => el.textContent = `${state.pocPct}%`);
  const barPoc = document.getElementById('dash-bar-poc');
  const barProdPoc = document.getElementById('prod-poc-bar');
  if (barPoc) barPoc.style.width = `${state.pocPct}%`;
  if (barProdPoc) barProdPoc.style.width = `${state.pocPct}%`;
  
  const elPocVol = document.getElementById('prod-poc-vol');
  const elPocSub = document.getElementById('dash-qty-poc');
  if (elPocVol) elPocVol.textContent = `${state.pocVolL.toFixed(1)} Liter`;
  if (elPocSub) elPocSub.textContent = `${state.pocVolL.toFixed(1)} Liter • ${state.pocPct > 65 ? 'Siap Kuras' : 'Fermentasi'}`;

  // POP DOM
  document.querySelectorAll('#dash-pct-pop, #prod-pop-pct').forEach(el => el.textContent = `${state.popPct}%`);
  const barPop = document.getElementById('dash-bar-pop');
  const barProdPop = document.getElementById('prod-pop-bar');
  if (barPop) barPop.style.width = `${state.popPct}%`;
  if (barProdPop) barProdPop.style.width = `${state.popPct}%`;

  const elPopVol = document.getElementById('prod-pop-vol');
  const elPopSub = document.getElementById('dash-qty-pop');
  if (elPopVol) elPopVol.textContent = `${state.popVolKg.toFixed(1)} Kg`;
  if (elPopSub) elPopSub.textContent = `${state.popVolKg.toFixed(1)} Kg • Pengeringan`;

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
  showToast('✅ Berhasil memasukkan 5.0 Kg food waste ke shredder & digester!');
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
  state.pressureBar = 1.1;

  renderDOM();
  showToast(`🔥 ${harvestedM3} m³ Biogas disalurkan ke kompor UMKM. Tekanan chamber turun ke 1.1 Bar.`);
}

// SIMULATION 3: Kuras Pupuk Cair (POC)
function simTriggerHarvestPOC() {
  if (state.pocPct <= 20) {
    showToast('Volume POC masih sedikit. Tunggu siklus pemisahan sentrifugal.');
    return;
  }
  const harvestedL = (state.pocVolL * 0.7).toFixed(1);
  state.pocPct = 22;
  state.pocVolL = +(state.pocVolL - harvestedL).toFixed(1);

  renderDOM();
  showToast(`💧 ${harvestedL} Liter POC berhasil dikuras via outlet kran ke jerigen!`);
}

// SIMULATION 4: Panen Kompos Padat (POP)
function simTriggerHarvestPOP() {
  const harvestedKg = (state.popVolKg * 0.6).toFixed(1);
  state.popPct = 18;
  state.popVolKg = +(state.popVolKg - harvestedKg).toFixed(1);

  renderDOM();
  showToast(`🌱 ${harvestedKg} Kg Pupuk Padat (POP) dikemas dalam karung kompos.`);
}

// SIMULATION 5: Trigger Anomali Asidosis (pH drop)
function simTriggerAcidosisAnomaly() {
  state.isAcidosis = true;
  state.ph = 6.1;
  state.tempC = 39.4;
  state.healthScore = 74;

  renderDOM();

  // Update AI Recommendation Card
  const souringTag = document.getElementById('souring-tag');
  const souringTitle = document.getElementById('souring-title');
  const souringDesc = document.getElementById('souring-desc');
  const souringAction = document.getElementById('souring-action');

  if (souringTag) {
    souringTag.textContent = 'BAHAYA ASIDOSIS (pH 6.1)';
    souringTag.className = 'recom-tag alert-red';
  }
  if (souringTitle) {
    souringTitle.textContent = 'Peringatan Anomali: pH Terlalu Asam';
    souringTitle.style.color = 'var(--red)';
  }
  if (souringDesc) {
    souringDesc.textContent = 'Deteksi akumulasi VFA (Volatile Fatty Acids). Bakteri metanogen terancam mati jika tidak dinetralkan.';
  }
  if (souringAction) {
    souringAction.style.borderLeftColor = 'var(--red)';
    souringAction.style.background = 'var(--red-bg)';
    souringAction.innerHTML = '<strong>TINDAKAN DARURAT AI:</strong> Segera tambahkan 2.0 Liter larutan air kapur pertanian Ca(OH)2 dan hentikan limbah buah asam selama 24 jam.';
  }

  // Update strip on dashboard
  const dashStrip = document.getElementById('dash-ai-strip-text');
  if (dashStrip) {
    dashStrip.textContent = '⚠️ WASPADA ASIDOSIS: pH anjlok ke 6.1. Segera periksa tab AI Maintenance!';
  }

  navigateTo('maintenance');
  showToast('⚠️ AI Mendeteksi Anomali pH (6.1)! Rekomendasi perbaikan aktif.');
}

// SIMULATION 6: Reset Kondisi Normal
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
    souringTitle.style.color = 'var(--ink)';
  }
  if (souringDesc) {
    souringDesc.textContent = 'Aktivitas bakteri metanogen dalam rasio seimbang (pH 7.1). Tidak ada risiko pengasaman (*souring*).';
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
  showToast('🔄 Sistem BioLoop telah di-reset ke kondisi normal operasional.');
}

// Refresh Sensors
function refreshSensors() {
  state.tempC = +(37.0 + (Math.random() * 0.6 - 0.3)).toFixed(1);
  state.moisturePct = Math.round(77 + (Math.random() * 2));
  renderDOM();
  showToast('⟳ Telemetri sensor IoT berhasil diperbarui secara live.');
}

// Run Quick AI Diagnostic
function runAiDiagnostic() {
  showToast('🤖 AI memindai 1.420 data sensor... Hasil: Seluruh katup & mikroba normal.');
}

// Mark notifications read
function markAllNotificationsRead() {
  const badge = document.getElementById('notif-badge');
  if (badge) badge.style.display = 'none';
  showToast('✓ Semua notifikasi telah ditandai terbaca.');
}

// Direct button triggers in screen
function simulateHarvestBiogas() { simTriggerHarvestGas(); }
function simulateHarvestPOC() { simTriggerHarvestPOC(); }
function simulateHarvestPOP() { simTriggerHarvestPOP(); }

// Initial Render
renderDOM();
