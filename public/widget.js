/**
 * Closify AI - Embeddable Sales Closer Widget
 * Arunika Apparel Indonesia Edition
 * Strictly Inspired by Omago Digital Teammate & ThinkAI UI (Pure SVG Icons, Zero Emojis)
 */

(function () {
  // Inject widget CSS if not present
  if (!document.getElementById("closify-widget-css")) {
    const link = document.createElement("link");
    link.id = "closify-widget-css";
    link.rel = "stylesheet";
    link.href = "/widget.css";
    document.head.appendChild(link);
  }

  // Omago Aperture / Geometric Vector Logo SVG
  const omagoLogoSVG = `
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <circle cx="12" cy="12" r="4"></circle>
      <line x1="4.93" y1="4.93" x2="9.17" y2="9.17"></line>
      <line x1="14.83" y1="14.83" x2="19.07" y2="19.07"></line>
      <line x1="14.83" y1="9.17" x2="19.07" y2="4.93"></line>
      <line x1="4.93" y1="19.07" x2="9.17" y2="14.83"></line>
    </svg>
  `;

  // Clean SVG Icons
  const icons = {
    chat: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>`,
    voice: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>`,
    paperclip: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg>`,
    smile: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>`,
    search: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>`,
    send: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>`,
    close: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`,
    shield: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>`,
    package: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>`,
    leaf: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path></svg>`,
    qr: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>`,
    check: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`,
    arrowRight: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>`
  };

  // Widget HTML Template (Matching Omago Reference)
  const widgetHTML = `
    <div id="closify-widget-container">
      <!-- Floating Trigger Button -->
      <button id="closify-trigger-btn" class="closify-trigger-btn" aria-label="Open Closify AI Sales Assistant">
        <div class="closify-trigger-orb">${omagoLogoSVG}</div>
        <div class="closify-trigger-label">
          <span class="title">Tanya Closify AI</span>
          <span class="subtitle"><span class="closify-live-dot"></span> Sales Teammate 24/7</span>
        </div>
      </button>

      <!-- Chat Modal Window -->
      <div id="closify-chat-window" class="closify-chat-window">
        <!-- Header -->
        <div class="closify-header">
          <div class="closify-header-left">
            <div class="closify-orb-avatar">${omagoLogoSVG}</div>
            <div class="closify-header-meta">
              <h3>Closify AI Digital Teammate</h3>
              <p><span class="closify-live-dot"></span> Arunika AI Sales Specialist 24/7</p>
            </div>
          </div>
          <button id="closify-close-btn" class="closify-close-circle" title="Tutup Chat">${icons.close}</button>
        </div>

        <!-- Chat / Voice Mode Switcher (Omago Reference) -->
        <div class="closify-mode-container">
          <div class="closify-mode-pill-wrap">
            <button class="closify-mode-pill active" id="pill-chat-mode">${icons.chat} <span>Chat</span></button>
            <button class="closify-mode-pill" id="pill-voice-mode">${icons.voice} <span>Voice</span></button>
          </div>
        </div>

        <!-- Messages Viewport -->
        <div id="closify-messages" class="closify-messages-viewport"></div>

        <!-- Floating Pill Input Bar -->
        <div class="closify-input-wrapper">
          <div id="closify-attach-preview" class="closify-attach-preview" style="display:none;"></div>
          <div class="closify-floating-input-pill">
            <button id="closify-attach-btn" class="closify-attach-btn" title="Lampirkan foto postur / referensi OOTD / bukti bayar">
              ${icons.paperclip}
            </button>
            <input type="file" id="closify-file-input" accept="image/*" style="display:none;" />
            <input type="text" id="closify-input" placeholder="Tanya stok, ukuran, atau checkout..." autocomplete="off" />
            <button id="closify-send-btn" class="closify-send-circle" title="Kirim">
              ${icons.send}
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML("beforeend", widgetHTML);

  const triggerBtn = document.getElementById("closify-trigger-btn");
  const chatWindow = document.getElementById("closify-chat-window");
  const closeBtn = document.getElementById("closify-close-btn");
  const messagesArea = document.getElementById("closify-messages");
  const inputEl = document.getElementById("closify-input");
  const sendBtn = document.getElementById("closify-send-btn");
  const voicePill = document.getElementById("pill-voice-mode");
  const attachBtn = document.getElementById("closify-attach-btn");
  const fileInput = document.getElementById("closify-file-input");
  const attachPreview = document.getElementById("closify-attach-preview");

  let isInitialized = false;
  let currentAttachedImg = null;
  let currentAttachedName = "";

  // Persistent Session ID per tab/window
  let sessionId = sessionStorage.getItem("closify_session_id");
  if (!sessionId) {
    sessionId = "sess_" + Math.random().toString(36).substring(2, 10) + "_" + Date.now();
    sessionStorage.setItem("closify_session_id", sessionId);
  }

  function renderAttachPreview() {
    if (!currentAttachedImg) {
      attachPreview.style.display = "none";
      attachPreview.innerHTML = "";
      return;
    }
    attachPreview.style.display = "block";
    attachPreview.innerHTML = `
      <div class="closify-attach-chip">
        <img src="${currentAttachedImg}" alt="Preview" />
        <span class="closify-attach-name">${currentAttachedName}</span>
        <button id="closify-remove-attach-btn" class="closify-attach-remove" title="Hapus lampiran">${icons.close}</button>
      </div>
    `;
    document.getElementById("closify-remove-attach-btn")?.addEventListener("click", () => {
      currentAttachedImg = null;
      currentAttachedName = "";
      if (fileInput) fileInput.value = "";
      renderAttachPreview();
    });
  }

  if (attachBtn && fileInput) {
    attachBtn.addEventListener("click", () => fileInput.click());
    fileInput.addEventListener("change", (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        currentAttachedImg = ev.target.result;
        currentAttachedName = file.name;
        renderAttachPreview();
      };
      reader.readAsDataURL(file);
    });
  }

  if (voicePill) {
    voicePill.addEventListener("click", () => {
      alert("Voice mode is available in the connected speech recognition runtime.");
    });
  }

  // Format Time Helper
  function getFormattedTime() {
    const d = new Date();
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  // Toggle Chat
  function openChat(initialText = null) {
    chatWindow.classList.add("active");
    triggerBtn.style.display = "none";
    if (!isInitialized) {
      isInitialized = true;
      sendBotGreeting();
    }
    if (initialText) {
      inputEl.value = initialText;
      sendMessage();
    } else {
      setTimeout(() => inputEl.focus(), 100);
    }
  }

  function closeChat() {
    chatWindow.classList.remove("active");
    triggerBtn.style.display = "flex";
  }

  triggerBtn.addEventListener("click", () => openChat());
  closeBtn.addEventListener("click", closeChat);

  // Markdown text formatter
  function formatMarkdown(raw) {
    if (!raw) return "";
    return raw
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/\n/g, "<br/>");
  }

  // Append bubble (supports progressive word-by-word streaming for bot)
  async function appendMessage(text, sender = "bot", uiCard = null, quickChipsList = null, userImage = null, stream = false) {
    const wrap = document.createElement("div");
    wrap.className = `closify-bubble-wrap ${sender}`;

    const timeStr = getFormattedTime();

    if (sender === "bot") {
      wrap.innerHTML = `
        <div class="closify-sender-tag">
          <span class="closify-mini-orb"></span> Closify AI <span>• ${timeStr}</span>
        </div>
      `;
    } else {
      wrap.innerHTML = `
        <div class="closify-sender-tag" style="justify-content: flex-end;">
          <span>${timeStr} •</span> Anda
        </div>
      `;
    }

    const bubble = document.createElement("div");
    bubble.className = `closify-bubble ${sender === "bot" ? "bot-bubble" : "user-bubble"}`;

    if (userImage) {
      const imgEl = document.createElement("img");
      imgEl.src = userImage;
      imgEl.className = "closify-user-img";
      imgEl.alt = "Lampiran Foto";
      bubble.appendChild(imgEl);
    }

    const textDiv = document.createElement("div");
    bubble.appendChild(textDiv);
    wrap.appendChild(bubble);
    messagesArea.appendChild(wrap);
    messagesArea.scrollTop = messagesArea.scrollHeight;

    // Word-by-word streaming typewriter effect if bot and stream is true
    if (sender === "bot" && stream && text) {
      const words = text.split(" ");
      let currentAccum = "";
      for (let i = 0; i < words.length; i++) {
        currentAccum += (i === 0 ? "" : " ") + words[i];
        textDiv.innerHTML = formatMarkdown(currentAccum) + `<span class="closify-stream-cursor"></span>`;
        messagesArea.scrollTop = messagesArea.scrollHeight;

        const w = words[i];
        const isEndPunctuation = /[.,!?:\n]$/.test(w);
        const delay = isEndPunctuation ? 36 : 14;
        await new Promise(r => setTimeout(r, delay));
      }
      textDiv.innerHTML = formatMarkdown(currentAccum);
    } else if (text) {
      textDiv.innerHTML = formatMarkdown(text);
    }

    // Interactive Option Chips (Compact Modern Pills)
    if (quickChipsList && quickChipsList.length > 0) {
      const chipsContainer = document.createElement("div");
      chipsContainer.className = "closify-chip-options";
      quickChipsList.forEach(chip => {
        const chipBtn = document.createElement("button");
        chipBtn.className = "closify-pill-option";
        chipBtn.innerHTML = `<span>${chip.label}</span> ${icons.arrowRight}`;
        chipBtn.onclick = () => {
          inputEl.value = chip.text;
          sendMessage();
        };
        chipsContainer.appendChild(chipBtn);
      });
      wrap.appendChild(chipsContainer);
      messagesArea.scrollTop = messagesArea.scrollHeight;
    }

    // Render interactive UI cards with smooth entrance
    if (uiCard) {
      if (stream) await new Promise(r => setTimeout(r, 60));
      const cardEl = renderCard(uiCard);
      if (cardEl) {
        cardEl.classList.add("closify-card-pop-enter");
        wrap.appendChild(cardEl);
        messagesArea.scrollTop = messagesArea.scrollHeight;
      }
    }
  }

  // Card Renderers (Zero Emojis, Pure SVG Icons)
  function renderCard(card) {
    const wrapper = document.createElement("div");
    wrapper.className = "closify-ui-card";

    if (card.type === "PRODUCT_SPOTLIGHT_CARD") {
      wrapper.className += " closify-card-prod";
      const escapedProdName = (card.name || "").replace(/'/g, "\\'");
      wrapper.innerHTML = `
        <img src="${card.image_url}" alt="${card.name}" onerror="this.src='/assets/prod_jjk_tee.jpg'" />
        <div class="closify-card-prod-info">
          <h4>${card.name}</h4>
          <div class="price">${card.price_formatted}</div>
          <button class="btn-card-action" onclick="window.ClosifyAI.sendMessage('Saya berminat ${escapedProdName}, tinggi 173 berat 67 cocok ukuran apa ya?')">
            ${icons.shield} <span>Konsultasi Ukuran Pas (TB/BB)</span>
          </button>
        </div>
      `;
      return wrapper;
    }

    if (card.type === "SIZE_RECOMMENDATION_CARD") {
      wrapper.className += " closify-size-card";
      wrapper.innerHTML = `
        <div class="closify-size-header">
          <span style="font-size:0.75rem; font-weight:800; color:#059669; display:flex; align-items:center; gap:6px;">
            ${icons.shield} ZERO RETURN PROTOCOL
          </span>
          <span class="closify-size-badge">SIZE ${card.recommended_size}</span>
        </div>
        <div style="font-size:0.84rem; color:#334155; line-height:1.5;">${card.explanation}</div>
        <div style="margin-top:10px;">
          <button class="btn-card-action" style="background:#10b981;" onclick="window.ClosifyAI.sendMessage('Ambil size ${card.recommended_size}, cek estimasi ongkir ke Jakarta Selatan')">
            Pilih Size ${card.recommended_size} & Cek Ongkir
          </button>
        </div>
      `;
      return wrapper;
    }

    if (card.type === "SHIPPING_OPTIONS_CARD") {
      wrapper.innerHTML = `
        <div style="font-size:0.8rem; font-weight:800; color:#1e293b; margin-bottom:10px; display:flex; align-items:center; gap:6px;">
          ${icons.package} <span>ESTIMASI PENGIRIMAN: ${card.destination.toUpperCase()}</span>
        </div>
        <div style="background:#f0fdf4; padding:10px 14px; border-radius:12px; margin-bottom:8px; border:1px solid #86efac;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <strong style="color:#15803d; font-size:0.85rem; display:flex; align-items:center; gap:5px;">
              ${icons.leaf} ${card.green_delivery.service_name}
            </strong>
            <span style="font-size:0.9rem; font-weight:800; color:#15803d;">${card.green_delivery.cost_formatted}</span>
          </div>
          <div style="font-size:0.75rem; color:#166534; margin-top:2px;">${card.green_delivery.eco_benefit} • Estimasi ${card.green_delivery.etd}</div>
        </div>
        <div style="background:#f8fafc; padding:8px 14px; border-radius:10px; border:1px solid #e2e8f0; font-size:0.8rem; color:#64748b;">
          Standard Reguler: ${card.regular.cost_formatted} (${card.regular.etd})
        </div>
        <button class="btn-card-action" style="width:100%; margin-top:10px;" onclick="window.ClosifyAI.sendMessage('Pilih Green Delivery, terbitkan tagihan pembayaran QRIS')">
          Lanjut ke Pembayaran QRIS
        </button>
      `;
      return wrapper;
    }

    if (card.type === "PAYMENT_QRIS_CARD") {
      wrapper.className += " closify-qris-card";
      wrapper.id = `qris-card-${card.order_id}`;
      wrapper.innerHTML = `
        <div class="closify-qris-header">
          <span class="closify-qris-title" style="display:flex; align-items:center; gap:6px;">
            ${icons.qr} DYNAMIC IN-CHAT CHECKOUT
          </span>
          <span class="closify-countdown" id="timer-${card.order_id}">15:00</span>
        </div>
        <div class="closify-qris-img-wrap">
          <img src="${card.qris_url}" alt="Dynamic QRIS Payment" />
        </div>
        <div class="closify-qris-total">${card.grand_total}</div>
        <div class="closify-qris-details">
          ${card.item_name} • ${card.courier}<br/>
          Order ID: <strong>${card.order_id}</strong>
        </div>
        <button class="closify-btn-pay-simulate" onclick="window.ClosifyAI.simulatePayment('${card.order_id}')">
          Simulasikan Pembayaran via BCA / GoPay / ShopeePay
        </button>
      `;

      // Start countdown timer
      startCountdown(card.order_id, 900);
      return wrapper;
    }

    return null;
  }

  function startCountdown(orderId, seconds) {
    let timeLeft = seconds;
    const timerEl = document.getElementById(`timer-${orderId}`);
    if (!timerEl) return;

    const interval = setInterval(() => {
      timeLeft--;
      if (timeLeft <= 0) {
        clearInterval(interval);
        timerEl.textContent = "KEDALUWARSA";
      } else {
        const mins = Math.floor(timeLeft / 60);
        const secs = timeLeft % 60;
        timerEl.textContent = `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
      }
    }, 1000);
  }

  // Initial greeting with compact quick pills
  function sendBotGreeting() {
    const greetingText = 
      "Halo Kak! Selamat datang di **Arunika Apparel**.\n" +
      "Mau dibantu cek stok *Anime Capsule*, konsultasi ukuran pas (TB/BB), atau cek promo ongkir hari ini?";

    const defaultChips = [
      {
        label: "Cek Stok Kaos Gojo (L)",
        text: "Halo kak, kaos Gojo Satoru size L masih ada stok?"
      },
      {
        label: "Fitting Ukuran Pas (TB/BB)",
        text: "Kak, tolong bantu rekomendasi ukuran yang pas buat postur badan saya dong"
      },
      {
        label: "Cek Ongkir Green Delivery",
        text: "Berapa ongkir kirim dari Surabaya ke Jakarta Selatan pakai Green Delivery?"
      }
    ];

    appendMessage(greetingText, "bot", null, defaultChips);
  }

  // Send message to server
  async function sendMessage() {
    const text = inputEl.value.trim();
    if (!text && !currentAttachedImg) return;

    const imgToSend = currentAttachedImg;
    const nameToSend = currentAttachedName;

    // Reset attachment state
    currentAttachedImg = null;
    currentAttachedName = "";
    if (fileInput) fileInput.value = "";
    renderAttachPreview();
    inputEl.value = "";

    let displayText = text;
    let payloadText = text;

    if (imgToSend) {
      if (!displayText) {
        displayText = "Melampirkan foto: " + nameToSend;
      }
      payloadText = "[Pengguna melampirkan foto referensi: " + nameToSend + "] " + (text || "Halo kak, tolong cek foto referensi ini ya.");
    }

    appendMessage(displayText, "user", null, null, imgToSend);

    // Add typing indicator with dynamic status rotation
    const typingId = "closify-typing-" + Date.now();
    const typingWrap = document.createElement("div");
    typingWrap.id = typingId;
    typingWrap.className = "closify-bubble-wrap bot";
    typingWrap.innerHTML = `
      <div class="closify-sender-tag">
        <span class="closify-mini-orb closify-orb-pulse"></span> Closify AI <span>• sedang memproses...</span>
      </div>
      <div class="closify-bubble bot-bubble closify-typing-bubble">
        <div class="closify-typing-dots">
          <span class="typing-dot"></span>
          <span class="typing-dot"></span>
          <span class="typing-dot"></span>
        </div>
        <span class="typing-text" id="typing-status-${typingId}">Menghubungkan ke katalog Arunika...</span>
      </div>
    `;
    messagesArea.appendChild(typingWrap);
    messagesArea.scrollTop = messagesArea.scrollHeight;

    // Dynamic status text rotation while waiting
    const waitingStages = [
      "Menghubungkan ke katalog Arunika...",
      "Memeriksa sisa stok & varian gudang...",
      "Menganalisis cutting & rekomendasi terbaik...",
      "Meracik balasan spesial buat Kakak..."
    ];
    let stageIdx = 0;
    const stageInterval = setInterval(() => {
      const statusEl = document.getElementById(`typing-status-${typingId}`);
      if (statusEl) {
        stageIdx = (stageIdx + 1) % waitingStages.length;
        statusEl.style.opacity = "0";
        statusEl.style.transform = "translateY(-3px)";
        setTimeout(() => {
          if (statusEl) {
            statusEl.textContent = waitingStages[stageIdx];
            statusEl.style.opacity = "1";
            statusEl.style.transform = "translateY(0)";
          }
        }, 180);
      }
    }, 1500);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: payloadText, session_id: sessionId })
      });

      const data = await res.json();
      clearInterval(stageInterval);
      
      const typingEl = document.getElementById(typingId);
      if (typingEl) {
        typingEl.classList.add("closify-fade-out");
        await new Promise(r => setTimeout(r, 160));
        typingEl.remove();
      }

      await appendMessage(data.reply, "bot", data.ui_card, null, null, true);
    } catch (err) {
      clearInterval(stageInterval);
      const typingEl = document.getElementById(typingId);
      if (typingEl) {
        typingEl.classList.add("closify-fade-out");
        await new Promise(r => setTimeout(r, 160));
        typingEl.remove();
      }
      await appendMessage("Maaf Kak, sambungan ke server backend sedang terputus.", "bot", null, null, null, false);
    }
  }

  // Simulate payment
  async function simulatePayment(orderId) {
    try {
      const res = await fetch("/api/pay/settle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order_id: orderId })
      });
      const data = await res.json();

      const cardEl = document.getElementById(`qris-card-${orderId}`);
      if (cardEl) {
        cardEl.innerHTML = `
          <div class="closify-paid-success">
            <div style="color:#059669; display:flex; justify-content:center; margin-bottom:8px;">${icons.check}</div>
            <div style="font-size:1.05rem; font-weight:800; color:#059669; margin-bottom:4px;">PEMBAYARAN DITERIMA</div>
            <div style="font-size:0.82rem; color:#15803d; font-weight:600; margin-bottom:8px;">Status: Settlement (Lunas)</div>
            <div style="font-size:0.78rem; color:#475569; line-height:1.4;">
              Order ID: <strong>${orderId}</strong><br/>
              Pesanan resmi diteruskan ke sistem gudang dan sedang dipersiapkan untuk pengiriman.
            </div>
          </div>
        `;
      }

      appendMessage(
        "Pembayaran melalui Dynamic QRIS telah terverifikasi lunas.\n\n" +
        "Pesanan saat ini sedang dikemas menggunakan kemasan ramah lingkungan *biodegradable cassava polymailer* dan akan segera diserahkan ke kurir Green Delivery. Terima kasih telah berbelanja di Arunika Apparel.",
        "bot"
      );
    } catch (err) {
      alert("Gagal melakukan simulasi pembayaran.");
    }
  }

  sendBtn.addEventListener("click", sendMessage);
  inputEl.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
  });

  // Global window API
  window.ClosifyAI = {
    openChat: openChat,
    closeChat: closeChat,
    sendMessage: (msg) => {
      openChat();
      inputEl.value = msg;
      sendMessage();
    },
    simulatePayment: simulatePayment
  };
})();
