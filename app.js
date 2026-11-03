(function() {
  'use strict';

  // Master Data Definitions
  const CURRENCY = '৳';
  const FLOW_STAGES = ['New', 'Confirmed', 'Arrived', 'In-service', 'Done'];

  const LOCATIONS = [
    { id: 'Station 1', name: 'Station 1', desc: 'Stylist Amara · Cutting & Styling Chair', type: 'chair' },
    { id: 'Station 2', name: 'Station 2', desc: 'Color Specialist Rafi · Balayage Bay', type: 'chair' },
    { id: 'Station 3', name: 'Station 3', desc: 'Selin · Aesthetic & Spa Treatment Chair', type: 'chair' },
    { id: 'Reception Desk', name: 'Reception Desk', desc: 'Front Entrance & Check-in Counter', type: 'reception' },
    { id: 'Waiting Lounge', name: 'Waiting Lounge', desc: 'Beverage Bar & Relaxation Seating', type: 'lounge' },
    { id: 'Storefront Window', name: 'Storefront Window', desc: 'Street QR Sign for 24/7 Booking', type: 'window' },
    { id: 'Social Bio', name: 'Social Bio', desc: 'Instagram & Facebook Digital Link', type: 'social' }
  ];

  const STYLISTS = [
    { id: 'any', name: 'Any Available Stylist', role: 'First Available Artist', onDuty: true, hours: '10:00 AM – 7:00 PM', activeStation: 'Floor' },
    { id: 'amara', name: 'Amara', role: 'Creative Director & Hair Artist', onDuty: true, hours: '10:00 AM – 7:00 PM', activeStation: 'Station 1' },
    { id: 'rafi', name: 'Rafi', role: 'Master Colorist & Balayage Specialist', onDuty: true, hours: '10:00 AM – 6:30 PM', activeStation: 'Station 2' },
    { id: 'selin', name: 'Selin', role: 'Esthetician & Bridal Lead', onDuty: true, hours: '11:00 AM – 7:00 PM', activeStation: 'Station 3' }
  ];

  const SERVICES = [
    {
      id: 'cut-style',
      name: 'Signature Cut & Styling',
      category: 'hair',
      price: 2500,
      duration: 60,
      stylist: 'Amara',
      desc: 'Precision cut, botanical scalp cleanse & signature blowout.',
      thumbHue: 30,
      dummySvg: `<svg viewBox="0 0 320 180" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="bgCut" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#3d2d24"/><stop offset="50%" stop-color="#241a14"/><stop offset="100%" stop-color="#140f0c"/></linearGradient><linearGradient id="goldGlow" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#f0cb96"/><stop offset="100%" stop-color="#b58a55"/></linearGradient></defs><rect width="320" height="180" fill="url(#bgCut)"/><path d="M 16 28 L 28 28 M 16 28 L 16 40" stroke="#d4a96e" stroke-width="1.5" opacity="0.6"/><path d="M 304 28 L 292 28 M 304 28 L 304 40" stroke="#d4a96e" stroke-width="1.5" opacity="0.6"/><path d="M 16 156 L 28 156 M 16 156 L 16 144" stroke="#d4a96e" stroke-width="1.5" opacity="0.6"/><path d="M 304 156 L 292 156 M 304 156 L 304 144" stroke="#d4a96e" stroke-width="1.5" opacity="0.6"/><path d="M 60 140 Q 110 50 160 140 T 260 140" fill="none" stroke="url(#goldGlow)" stroke-width="2" opacity="0.25"/><g transform="translate(136, 44)" stroke="url(#goldGlow)" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="10" r="6"/><circle cx="8" cy="38" r="6"/><line x1="38" y1="6" x2="12.5" y2="33.5"/><line x1="26" y1="30" x2="38" y2="42"/><line x1="12.5" y1="14.5" x2="20" y2="22"/></g><text x="160" y="112" font-family="'Cormorant Garamond', serif" font-size="15" fill="#f5eee6" font-weight="600" text-anchor="middle" letter-spacing="3" opacity="0.85">SIGNATURE CUT &amp; STYLE</text><text x="160" y="128" font-family="'Inter', sans-serif" font-size="9" fill="#d4a96e" font-weight="600" text-anchor="middle" letter-spacing="1.5" opacity="0.95">DUMMY THUMBNAIL · 4:3 PHOTO</text></svg>`,
      miniSvg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d4a96e" stroke-width="2"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/></svg>`
    },
    {
      id: 'colour-balayage',
      name: 'Artisan Balayage & Gloss',
      category: 'color',
      price: 6500,
      duration: 120,
      stylist: 'Rafi',
      desc: 'Hand-painted dimensional balayage with gloss toner & bond care.',
      thumbHue: 340,
      dummySvg: `<svg viewBox="0 0 320 180" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="bgBal" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#4a2a18"/><stop offset="50%" stop-color="#2d170c"/><stop offset="100%" stop-color="#160904"/></linearGradient><linearGradient id="caramelFlow" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#e8b878"/><stop offset="50%" stop-color="#c68c46"/><stop offset="100%" stop-color="#8c5825"/></linearGradient></defs><rect width="320" height="180" fill="url(#bgBal)"/><path d="M 16 28 L 28 28 M 16 28 L 16 40" stroke="#e8b878" stroke-width="1.5" opacity="0.6"/><path d="M 304 28 L 292 28 M 304 28 L 304 40" stroke="#e8b878" stroke-width="1.5" opacity="0.6"/><path d="M 16 156 L 28 156 M 16 156 L 16 144" stroke="#e8b878" stroke-width="1.5" opacity="0.6"/><path d="M 304 156 L 292 156 M 304 156 L 304 144" stroke="#e8b878" stroke-width="1.5" opacity="0.6"/><path d="M 40 160 C 100 80, 140 130, 200 60 C 240 120, 280 90, 310 160" fill="none" stroke="url(#caramelFlow)" stroke-width="3" opacity="0.35"/><g transform="translate(138, 42)" stroke="url(#caramelFlow)" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M 10 38 C 18 30, 22 18, 32 4 L 38 10 C 24 20, 18 24, 10 38 Z"/><circle cx="34" cy="8" r="3" fill="#e8b878"/></g><text x="160" y="112" font-family="'Cormorant Garamond', serif" font-size="15" fill="#f5eee6" font-weight="600" text-anchor="middle" letter-spacing="3" opacity="0.85">BALAYAGE &amp; COLOR GLOSS</text><text x="160" y="128" font-family="'Inter', sans-serif" font-size="9" fill="#e8b878" font-weight="600" text-anchor="middle" letter-spacing="1.5" opacity="0.95">DUMMY THUMBNAIL · 4:3 PHOTO</text></svg>`,
      miniSvg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d4a96e" stroke-width="2"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>`
    },
    {
      id: 'keratin-treatment',
      name: 'Silk Keratin Infusion',
      category: 'treatment',
      price: 9000,
      duration: 150,
      stylist: 'Rafi',
      desc: 'Intensive smoothing ritual for 4-month frizz-free mirror shine.',
      thumbHue: 200,
      dummySvg: `<svg viewBox="0 0 320 180" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="bgKer" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#332f2b"/><stop offset="50%" stop-color="#1f1c19"/><stop offset="100%" stop-color="#110f0d"/></linearGradient><linearGradient id="silverGloss" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#ffffff"/><stop offset="50%" stop-color="#d4af37"/><stop offset="100%" stop-color="#8a7322"/></linearGradient></defs><rect width="320" height="180" fill="url(#bgKer)"/><path d="M 16 28 L 28 28 M 16 28 L 16 40" stroke="#d4af37" stroke-width="1.5" opacity="0.6"/><path d="M 304 28 L 292 28 M 304 28 L 304 40" stroke="#d4af37" stroke-width="1.5" opacity="0.6"/><path d="M 16 156 L 28 156 M 16 156 L 16 144" stroke="#d4af37" stroke-width="1.5" opacity="0.6"/><path d="M 304 156 L 292 156 M 304 156 L 304 144" stroke="#d4af37" stroke-width="1.5" opacity="0.6"/><line x1="120" y1="20" x2="120" y2="165" stroke="#d4af37" stroke-width="1.5" opacity="0.25"/><line x1="200" y1="20" x2="200" y2="165" stroke="#d4af37" stroke-width="1.5" opacity="0.25"/><g transform="translate(142, 44)" stroke="url(#silverGloss)" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M 18 4 C 18 4, 6 22, 6 30 A 12 12 0 0 0 30 30 C 30 22, 18 4, 18 4 Z"/><circle cx="15" cy="28" r="3" fill="#fff" opacity="0.75"/></g><text x="160" y="112" font-family="'Cormorant Garamond', serif" font-size="15" fill="#f5eee6" font-weight="600" text-anchor="middle" letter-spacing="3" opacity="0.85">SILK KERATIN INFUSION</text><text x="160" y="128" font-family="'Inter', sans-serif" font-size="9" fill="#d4af37" font-weight="600" text-anchor="middle" letter-spacing="1.5" opacity="0.95">DUMMY THUMBNAIL · 4:3 PHOTO</text></svg>`,
      miniSvg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d4a96e" stroke-width="2"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"/><line x1="16" y1="8" x2="2" y2="22"/></svg>`
    },
    {
      id: 'bridal-couture',
      name: 'Bridal Couture Glamour',
      category: 'bridal',
      price: 15000,
      duration: 180,
      stylist: 'Selin',
      desc: 'Ceremonial bridal hair styling, veil setting & airbrush glow.',
      thumbHue: 10,
      dummySvg: `<svg viewBox="0 0 320 180" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="bgBri" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#4d2c2c"/><stop offset="50%" stop-color="#2b1616"/><stop offset="100%" stop-color="#140808"/></linearGradient><linearGradient id="roseGold" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#f8d7cb"/><stop offset="50%" stop-color="#e2a599"/><stop offset="100%" stop-color="#ad685c"/></linearGradient></defs><rect width="320" height="180" fill="url(#bgBri)"/><path d="M 16 28 L 28 28 M 16 28 L 16 40" stroke="#e2a599" stroke-width="1.5" opacity="0.6"/><path d="M 304 28 L 292 28 M 304 28 L 304 40" stroke="#e2a599" stroke-width="1.5" opacity="0.6"/><path d="M 16 156 L 28 156 M 16 156 L 16 144" stroke="#e2a599" stroke-width="1.5" opacity="0.6"/><path d="M 304 156 L 292 156 M 304 156 L 304 144" stroke="#e2a599" stroke-width="1.5" opacity="0.6"/><g transform="translate(136, 40)" stroke="url(#roseGold)" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M 6 36 L 12 18 L 24 28 L 36 12 L 48 28 L 60 18 L 66 36 Z"/><circle cx="36" cy="8" r="3" fill="#f8d7cb"/><circle cx="12" cy="14" r="2" fill="#f8d7cb"/><circle cx="60" cy="14" r="2" fill="#f8d7cb"/></g><text x="160" y="112" font-family="'Cormorant Garamond', serif" font-size="15" fill="#f5eee6" font-weight="600" text-anchor="middle" letter-spacing="3" opacity="0.85">BRIDAL COUTURE GLAMOUR</text><text x="160" y="128" font-family="'Inter', sans-serif" font-size="9" fill="#e2a599" font-weight="600" text-anchor="middle" letter-spacing="1.5" opacity="0.95">DUMMY THUMBNAIL · 4:3 PHOTO</text></svg>`,
      miniSvg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d4a96e" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`
    },
    {
      id: 'facial-glow',
      name: 'Botanical Radiance Facial',
      category: 'spa',
      price: 3800,
      duration: 75,
      stylist: 'Selin',
      desc: 'Ultrasonic pore cleanse, lymphatic massage & hyaluronic glow.',
      thumbHue: 150,
      dummySvg: `<svg viewBox="0 0 320 180" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="bgSpa" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#24382c"/><stop offset="50%" stop-color="#14211a"/><stop offset="100%" stop-color="#0a120e"/></linearGradient><linearGradient id="sageGlow" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#cbe6d2"/><stop offset="50%" stop-color="#86ba97"/><stop offset="100%" stop-color="#4d825f"/></linearGradient></defs><rect width="320" height="180" fill="url(#bgSpa)"/><path d="M 16 28 L 28 28 M 16 28 L 16 40" stroke="#86ba97" stroke-width="1.5" opacity="0.6"/><path d="M 304 28 L 292 28 M 304 28 L 304 40" stroke="#86ba97" stroke-width="1.5" opacity="0.6"/><path d="M 16 156 L 28 156 M 16 156 L 16 144" stroke="#86ba97" stroke-width="1.5" opacity="0.6"/><path d="M 304 156 L 292 156 M 304 156 L 304 144" stroke="#86ba97" stroke-width="1.5" opacity="0.6"/><g transform="translate(138, 42)" stroke="url(#sageGlow)" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M 22 4 C 10 14, 6 26, 6 40 C 20 40, 32 36, 42 24 C 42 12, 34 4, 22 4 Z"/><line x1="6" y1="40" x2="26" y2="20"/></g><text x="160" y="112" font-family="'Cormorant Garamond', serif" font-size="15" fill="#f5eee6" font-weight="600" text-anchor="middle" letter-spacing="3" opacity="0.85">BOTANICAL RADIANCE FACIAL</text><text x="160" y="128" font-family="'Inter', sans-serif" font-size="9" fill="#86ba97" font-weight="600" text-anchor="middle" letter-spacing="1.5" opacity="0.95">DUMMY THUMBNAIL · 4:3 PHOTO</text></svg>`,
      miniSvg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d4a96e" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`
    },
    {
      id: 'mani-pedi-spa',
      name: 'Atelier Manicure & Pedicure',
      category: 'nails',
      price: 2800,
      duration: 90,
      stylist: 'Amara',
      desc: 'Mineral exfoliation, hot towel compress & 7-free gel gloss.',
      thumbHue: 280,
      dummySvg: `<svg viewBox="0 0 320 180" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="bgMani" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#3d263b"/><stop offset="50%" stop-color="#241423"/><stop offset="100%" stop-color="#120811"/></linearGradient><linearGradient id="berryGlow" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#f5d2e7"/><stop offset="50%" stop-color="#c983b0"/><stop offset="100%" stop-color="#8a4773"/></linearGradient></defs><rect width="320" height="180" fill="url(#bgMani)"/><path d="M 16 28 L 28 28 M 16 28 L 16 40" stroke="#c983b0" stroke-width="1.5" opacity="0.6"/><path d="M 304 28 L 292 28 M 304 28 L 304 40" stroke="#c983b0" stroke-width="1.5" opacity="0.6"/><path d="M 16 156 L 28 156 M 16 156 L 16 144" stroke="#c983b0" stroke-width="1.5" opacity="0.6"/><path d="M 304 156 L 292 156 M 304 156 L 304 144" stroke="#c983b0" stroke-width="1.5" opacity="0.6"/><g transform="translate(142, 42)" stroke="url(#berryGlow)" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="18" width="20" height="24" rx="4"/><path d="M 14 18 L 14 6 L 22 6 L 22 18"/><circle cx="18" cy="30" r="4" fill="#f5d2e7" opacity="0.8"/></g><text x="160" y="112" font-family="'Cormorant Garamond', serif" font-size="15" fill="#f5eee6" font-weight="600" text-anchor="middle" letter-spacing="3" opacity="0.85">ATELIER MANICURE &amp; PEDICURE</text><text x="160" y="128" font-family="'Inter', sans-serif" font-size="9" fill="#c983b0" font-weight="600" text-anchor="middle" letter-spacing="1.5" opacity="0.95">DUMMY THUMBNAIL · 4:3 PHOTO</text></svg>`,
      miniSvg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d4a96e" stroke-width="2"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>`
    }
  ];

  const ADDONS = [
    { id: 'scalp-massage', name: 'Aromatherapy Scalp Massage', price: 800, duration: 15 },
    { id: 'acidic-gloss', name: 'Acidic Gloss Color Refresher', price: 1400, duration: 20 },
    { id: 'botanical-mask', name: 'Deep Botanical Masque Infusion', price: 950, duration: 15 },
    { id: 'collagen-contour', name: 'Collagen Lip & Eye Contour', price: 600, duration: 10 }
  ];

  const TIME_SLOTS = [
    'Walk-in now',
    '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
    '01:30 PM', '02:00 PM', '02:30 PM', '03:30 PM', '04:00 PM',
    '05:00 PM', '06:00 PM'
  ];

  // Default Seed State
  const defaultState = {
    currentLocation: 'Station 1',
    activeBookingId: null,
    bookings: [
      {
        id: 'bk-101',
        name: 'Tahmina Rahman',
        phone: '01711987654',
        serviceId: 'cut-style',
        serviceName: 'Signature Cut & Styling',
        stylist: 'Amara',
        time: '11:00 AM',
        isWalkin: false,
        source: 'Station 1',
        status: 'In-service',
        addons: ['Aromatherapy Scalp Massage'],
        totalPrice: 3300,
        hairNotes: 'Previous: layered bob, likes soft texture',
        consentGiven: true,
        timestamp: Date.now() - 3600000
      },
      {
        id: 'bk-102',
        name: 'Zareen Anam',
        phone: '01819223344',
        serviceId: 'colour-balayage',
        serviceName: 'Artisan Balayage & Gloss',
        stylist: 'Rafi',
        time: 'Walk-in now',
        isWalkin: true,
        source: 'Waiting Lounge',
        status: 'Arrived',
        addons: ['Acidic Gloss Color Refresher'],
        totalPrice: 7900,
        hairNotes: 'Formula: Inoa 7.1 + 8.3 with 20vol. Patch test verified Oct 2026.',
        consentGiven: true,
        timestamp: Date.now() - 1800000
      },
      {
        id: 'bk-103',
        name: 'Farhana Hossain',
        phone: '01912334455',
        serviceId: 'facial-glow',
        serviceName: 'Botanical Radiance Facial',
        stylist: 'Selin',
        time: '02:00 PM',
        isWalkin: false,
        source: 'Social Bio',
        status: 'Confirmed',
        addons: ['Collagen Lip & Eye Contour'],
        totalPrice: 4400,
        hairNotes: 'Sensitive skin, avoid harsh fragrances',
        consentGiven: true,
        timestamp: Date.now() - 7200000
      },
      {
        id: 'bk-104',
        name: 'Maliha Chowdhury',
        phone: '01711987654', // Same phone as Tahmina for repeat rate demonstration
        serviceId: 'mani-pedi-spa',
        serviceName: 'Atelier Manicure & Pedicure',
        stylist: 'Amara',
        time: '10:00 AM',
        isWalkin: false,
        source: 'Reception Desk',
        status: 'Done',
        addons: [],
        totalPrice: 2800,
        hairNotes: 'Nude neutral gel shade #04',
        consentGiven: true,
        timestamp: Date.now() - 14400000
      }
    ],
    feedback: [
      {
        id: 'fb-1',
        rating: 5,
        comments: 'Amara is absolute perfection! The blowout lasted 3 days and the scalp massage was heavenly.',
        clientName: 'Maliha C.',
        timestamp: Date.now() - 10800000
      },
      {
        id: 'fb-2',
        rating: 5,
        comments: 'Rafi matched my balayage formula effortlessly. The salon ambience is so serene and chic.',
        clientName: 'Nusrat J.',
        timestamp: Date.now() - 86400000
      }
    ]
  };

  // State Manager with LocalStorage Persistence
  let appState = (function() {
    try {
      const stored = localStorage.getItem('maison_lumiere_state');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      // Fallback
    }
    return defaultState;
  })();

  function saveState() {
    try {
      localStorage.setItem('maison_lumiere_state', JSON.stringify(appState));
    } catch (e) {}
  }

  // Toast Notification Utility
  function showToast(message, icon = '✓') {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span style="color:var(--gold); font-weight:bold;">${icon}</span> <span>${message}</span>`;
    container.appendChild(toast);

    requestAnimationFrame(() => toast.classList.add('show'));
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 350);
    }, 3200);
  }

  // Pure SVG QR Code Generator (Lightweight standard matrix renderer)
  function generateSvgQr(text, size = 180) {
    // Generates a recognizable, clean SVG QR code with embedded monogram
    // Using a deterministic hash algorithm for realistic QR bit patterns
    const hash = function(str, seed) {
      let h = seed;
      for (let i = 0; i < str.length; i++) {
        h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
        h = h << 13 | h >>> 19;
      }
      return h >>> 0;
    };

    const modules = 25; // 25x25 QR Grid (Version 2)
    const cellSize = size / modules;
    let rects = '';

    // Draw standard 3 Corner Finder Patterns
    const drawFinder = (startX, startY) => {
      for (let r = 0; r < 7; r++) {
        for (let c = 0; c < 7; c++) {
          if (
            (r === 0 || r === 6 || c === 0 || c === 6) ||
            (r >= 2 && r <= 4 && c >= 2 && c <= 4)
          ) {
            rects += `<rect x="${(startX + c) * cellSize}" y="${(startY + r) * cellSize}" width="${cellSize}" height="${cellSize}" fill="#14110e"/>`;
          }
        }
      }
    };

    drawFinder(0, 0);                 // Top-Left
    drawFinder(modules - 7, 0);       // Top-Right
    drawFinder(0, modules - 7);       // Bottom-Left

    // Draw Timing Patterns
    for (let i = 8; i < modules - 8; i++) {
      if (i % 2 === 0) {
        rects += `<rect x="${6 * cellSize}" y="${i * cellSize}" width="${cellSize}" height="${cellSize}" fill="#14110e"/>`;
        rects += `<rect x="${i * cellSize}" y="${6 * cellSize}" width="${cellSize}" height="${cellSize}" fill="#14110e"/>`;
      }
    }

    // Fill Data matrix pseudo-randomly based on text hash
    for (let r = 0; r < modules; r++) {
      for (let c = 0; c < modules; c++) {
        // Skip finders & timing & center logo
        const inFinder = (r < 8 && c < 8) || (r < 8 && c >= modules - 8) || (r >= modules - 8 && c < 8);
        const inCenterLogo = (r >= 10 && r <= 14 && c >= 10 && c <= 14);
        const onTiming = (r === 6 || c === 6);
        if (inFinder || inCenterLogo || onTiming) continue;

        const cellHash = hash(text + `${r}_${c}`, 42 + r * 31 + c);
        if ((cellHash % 100) < 46) {
          rects += `<rect x="${c * cellSize}" y="${r * cellSize}" width="${cellSize}" height="${cellSize}" fill="#231c16"/>`;
        }
      }
    }

    // Center Gold Monogram Emblem
    const centerSize = cellSize * 5;
    const centerPos = (size - centerSize) / 2;

    const svg = `
      <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
        <rect width="${size}" height="${size}" fill="#ffffff"/>
        ${rects}
        <rect x="${centerPos}" y="${centerPos}" width="${centerSize}" height="${centerSize}" rx="6" fill="#14100c" stroke="#c99c60" stroke-width="1.8"/>
        <path d="M ${size/2} ${size/2 - 9} L ${size/2 + 2.5} ${size/2 - 2.5} L ${size/2 + 9} ${size/2} L ${size/2 + 2.5} ${size/2 + 2.5} L ${size/2} ${size/2 + 9} L ${size/2 - 2.5} ${size/2 + 2.5} L ${size/2 - 9} ${size/2} L ${size/2 - 2.5} ${size/2 - 2.5} Z" fill="#f5d9a9"/>
      </svg>
    `;
    return svg;
  }

  // DOM Elements
  const DOM = {
    // Navigation & Theme
    themeToggleBtn: document.getElementById('themeToggleBtn'),
    headerCurrentLocation: document.getElementById('headerCurrentLocation'),
    openLocationSwitchBtn: document.getElementById('openLocationSwitchBtn'),
    switchTouchpointQuickBtn: document.getElementById('switchTouchpointQuickBtn'),
    mainViewNav: document.getElementById('mainViewNav'),
    staffPendingCount: document.getElementById('staffPendingCount'),

    // Views
    clientView: document.getElementById('clientView'),
    staffView: document.getElementById('staffView'),
    ownerView: document.getElementById('ownerView'),
    qrHubView: document.getElementById('qrHubView'),

    // Client Elements
    stationWelcomeName: document.getElementById('stationWelcomeName'),
    formStationLabel: document.getElementById('formStationLabel'),
    categoryChips: document.getElementById('categoryChips'),
    servicesCatalogGrid: document.getElementById('servicesCatalogGrid'),
    clientActiveTracker: document.getElementById('clientActiveTracker'),
    trackerLiveBadge: document.getElementById('trackerLiveBadge'),
    trackerCurrentStatus: document.getElementById('trackerCurrentStatus'),
    trackerServiceName: document.getElementById('trackerServiceName'),
    trackerMetaDetails: document.getElementById('trackerMetaDetails'),
    stepperProgressBar: document.getElementById('stepperProgressBar'),
    trackerWalkinQueueInfo: document.getElementById('trackerWalkinQueueInfo'),
    queuePositionText: document.getElementById('queuePositionText'),
    queueWaitTimeText: document.getElementById('queueWaitTimeText'),
    cancelRequestBtn: document.getElementById('cancelRequestBtn'),

    // Booking Form
    bookingSection: document.getElementById('bookingSection'),
    jumpToBookBtn: document.getElementById('jumpToBookBtn'),
    modeWalkinBtn: document.getElementById('modeWalkinBtn'),
    modeScheduleBtn: document.getElementById('modeScheduleBtn'),
    scheduledTimeGroup: document.getElementById('scheduledTimeGroup'),
    bookingRequestForm: document.getElementById('bookingRequestForm'),
    formServiceSelect: document.getElementById('formServiceSelect'),
    formStylistSelect: document.getElementById('formStylistSelect'),
    formTimeSelect: document.getElementById('formTimeSelect'),
    addonOptionsList: document.getElementById('addonOptionsList'),
    addonsSummaryCost: document.getElementById('addonsSummaryCost'),
    formClientName: document.getElementById('formClientName'),
    formClientPhone: document.getElementById('formClientPhone'),
    formHairNotes: document.getElementById('formHairNotes'),
    formConsentCheck: document.getElementById('formConsentCheck'),

    // Loyalty Elements
    loyaltyPhoneInput: document.getElementById('loyaltyPhoneInput'),
    loyaltyCheckBtn: document.getElementById('loyaltyCheckBtn'),
    stampGridContainer: document.getElementById('stampGridContainer'),
    loyaltyStatusMessage: document.getElementById('loyaltyStatusMessage'),

    // Feedback
    feedbackForm: document.getElementById('feedbackForm'),
    feedbackStarRating: document.getElementById('feedbackStarRating'),
    feedbackComments: document.getElementById('feedbackComments'),

    // Staff Elements
    staffFilterBar: document.getElementById('staffFilterBar'),
    staffBookingsList: document.getElementById('staffBookingsList'),
    staffAddWalkinModalBtn: document.getElementById('staffAddWalkinModalBtn'),
    walkinModal: document.getElementById('walkinModal'),
    closeWalkinModalBtn: document.getElementById('closeWalkinModalBtn'),
    staffWalkinForm: document.getElementById('staffWalkinForm'),
    staffInputService: document.getElementById('staffInputService'),
    staffInputStylist: document.getElementById('staffInputStylist'),

    // Owner Elements
    ownerExportCsvBtn: document.getElementById('ownerExportCsvBtn'),
    kpiTotalBookings: document.getElementById('kpiTotalBookings'),
    kpiUniqueClients: document.getElementById('kpiUniqueClients'),
    kpiRepeatClientsSub: document.getElementById('kpiRepeatClientsSub'),
    kpiRepeatRate: document.getElementById('kpiRepeatRate'),
    kpiTotalRevenue: document.getElementById('kpiTotalRevenue'),
    kpiAvgRating: document.getElementById('kpiAvgRating'),
    kpiReviewCount: document.getElementById('kpiReviewCount'),
    busyHoursChart: document.getElementById('busyHoursChart'),
    qrAttributionChart: document.getElementById('qrAttributionChart'),
    ownerServicesTable: document.getElementById('ownerServicesTable'),
    stylistRosterTable: document.getElementById('stylistRosterTable'),
    ownerFeedbackList: document.getElementById('ownerFeedbackList'),

    // QR Hub Elements
    qrStationChips: document.getElementById('qrStationChips'),
    printableStandCard: document.getElementById('printableStandCard'),
    standLocationTitle: document.getElementById('standLocationTitle'),
    qrSvgWrapper: document.getElementById('qrSvgWrapper'),
    simulateScanBtn: document.getElementById('simulateScanBtn'),
    printActiveQrStandBtn: document.getElementById('printActiveQrStandBtn'),

    // Modals
    locationModal: document.getElementById('locationModal'),
    closeLocationModalBtn: document.getElementById('closeLocationModalBtn'),
    locationPickerList: document.getElementById('locationPickerList')
  };

  // State Tracking Helpers
  let currentActiveTab = 'clientView';
  let currentCategory = 'all';
  let currentBookingMode = 'walkin';
  let selectedAddons = new Set();
  let currentStaffFilter = 'all';
  let currentRating = 5;
  let activeQrPreviewLocation = appState.currentLocation || 'Station 1';

  // Format Currency
  function fmtPrice(amount) {
    return CURRENCY + Number(amount).toLocaleString('en-US');
  }

  // Initialize View Switching
  function switchTab(targetTab) {
    currentActiveTab = targetTab;
    const views = ['clientView', 'staffView', 'ownerView', 'qrHubView'];
    views.forEach(v => {
      const el = DOM[v];
      if (el) el.classList.toggle('hidden', v !== targetTab);
    });

    document.querySelectorAll('#mainViewNav .nav-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === targetTab);
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
    render();
  }

  // Location / QR Station Switcher
  function setLocation(newLocation) {
    appState.currentLocation = newLocation;
    activeQrPreviewLocation = newLocation;
    saveState();

    DOM.headerCurrentLocation.textContent = newLocation;
    DOM.stationWelcomeName.textContent = newLocation;
    DOM.formStationLabel.textContent = newLocation;

    showToast(`Switched active station to: ${newLocation}`);
    render();
  }

  // Render Service Catalog Grid
  function renderServices() {
    const container = DOM.servicesCatalogGrid;
    if (!container) return;

    const filtered = SERVICES.filter(s => currentCategory === 'all' || s.category === currentCategory);

    container.innerHTML = filtered.map(s => {
      return `
        <article class="service-card" data-id="${s.id}">
          <div class="dummy-thumbnail-container">
            <div class="dummy-thumb-badge">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
              Dummy Thumbnail
            </div>
            <span class="dummy-thumb-res">400×260</span>
            <div class="dummy-thumb-svg">${s.dummySvg}</div>
            <div style="position:absolute; bottom:10px; left:10px; right:10px; z-index:3; display:flex; justify-content:space-between; align-items:flex-end;">
              <span class="service-duration-badge">${s.duration} mins</span>
              <span class="service-duration-badge" style="background:rgba(181, 138, 85, 0.9);">with ${s.stylist}</span>
            </div>
          </div>
          <div class="service-content">
            <h3 class="service-title serif">${s.name}</h3>
            
            <p class="service-desc">${s.desc}</p>
            <div class="service-footer">
              <div class="service-price">${fmtPrice(s.price)} <span>/ ritual</span></div>
              <button class="btn-gold btn-sm select-svc-btn" data-id="${s.id}">Select &amp; Book</button>
            </div>
          </div>
        </article>
      `;
    }).join('');

    // Attach click handlers to select buttons
    container.querySelectorAll('.select-svc-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const svcId = e.currentTarget.dataset.id;
        DOM.formServiceSelect.value = svcId;
        const svc = SERVICES.find(x => x.id === svcId);
        if (svc) {
          const matchStylist = STYLISTS.find(st => st.name === svc.stylist);
          if (matchStylist) DOM.formStylistSelect.value = matchStylist.name;
        }
        updateServicePreview();
        DOM.bookingSection.scrollIntoView({ behavior: 'smooth' });
        showToast(`Selected "${svc ? svc.name : 'Service'}" for booking`);
      });
    });
  }

  // Render Addons
  function renderAddons() {
    const list = DOM.addonOptionsList;
    if (!list) return;

    list.innerHTML = ADDONS.map(addon => {
      const isSelected = selectedAddons.has(addon.name);
      return `
        <div class="addon-item ${isSelected ? 'selected' : ''}" data-name="${addon.name}">
          <div class="addon-info">
            <input type="checkbox" class="addon-checkbox" ${isSelected ? 'checked' : ''} data-name="${addon.name}">
            <div>
              <div class="addon-name">${addon.name}</div>
              <div class="addon-duration">+${addon.duration} mins</div>
            </div>
          </div>
          <div class="addon-price">+${fmtPrice(addon.price)}</div>
        </div>
      `;
    }).join('');

    // Update cost summary
    let totalAddonPrice = 0;
    selectedAddons.forEach(name => {
      const ad = ADDONS.find(a => a.name === name);
      if (ad) totalAddonPrice += ad.price;
    });
    DOM.addonsSummaryCost.textContent = totalAddonPrice > 0 ? `+${fmtPrice(totalAddonPrice)}` : '+৳0';

    // Click handler for addon row
    list.querySelectorAll('.addon-item').forEach(item => {
      item.addEventListener('click', (e) => {
        const name = e.currentTarget.dataset.name;
        if (selectedAddons.has(name)) {
          selectedAddons.delete(name);
        } else {
          selectedAddons.add(name);
        }
        renderAddons();
      });
    });
  }

  // Render Client Active Tracker
  function renderClientTracker() {
    const tracker = DOM.clientActiveTracker;
    if (!tracker) return;

    const myBooking = appState.bookings.find(b => b.id === appState.activeBookingId);
    if (!myBooking || myBooking.status === 'Done') {
      tracker.classList.add('hidden');
      return;
    }

    tracker.classList.remove('hidden');
    DOM.trackerServiceName.textContent = myBooking.serviceName;
    DOM.trackerCurrentStatus.textContent = myBooking.status;
    DOM.trackerMetaDetails.textContent = `with ${myBooking.stylist} · ${myBooking.time} · ${myBooking.source}`;

    // Stepper progress calculation
    const stageIdx = FLOW_STAGES.indexOf(myBooking.status);
    const pct = stageIdx >= 0 ? Math.max(10, Math.min(100, (stageIdx / (FLOW_STAGES.length - 1)) * 100)) : 10;
    DOM.stepperProgressBar.style.width = pct + '%';

    FLOW_STAGES.forEach((stage, idx) => {
      const node = document.getElementById(`stepNode-${stage}`);
      if (node) {
        node.classList.remove('active', 'completed');
        if (idx < stageIdx) node.classList.add('completed');
        else if (idx === stageIdx) node.classList.add('active');
      }
    });

    // Walk-in queue position info
    if (myBooking.isWalkin && myBooking.status !== 'Done') {
      const waitingAhead = appState.bookings.filter(b =>
        b.isWalkin &&
        b.status !== 'Done' &&
        b.status !== 'In-service' &&
        b.timestamp < myBooking.timestamp
      ).length;

      DOM.trackerWalkinQueueInfo.classList.remove('hidden');
      DOM.queuePositionText.textContent = `#${waitingAhead + 1}`;
      DOM.queueWaitTimeText.textContent = `${(waitingAhead + 1) * 15} mins`;
    } else {
      DOM.trackerWalkinQueueInfo.classList.add('hidden');
    }
  }

  // Render Loyalty Card
  function renderLoyalty(phoneQuery) {
    const container = DOM.stampGridContainer;
    const msg = DOM.loyaltyStatusMessage;
    if (!container || !msg) return;

    const phone = (phoneQuery || DOM.loyaltyPhoneInput.value || '').trim();
    if (!phone) {
      container.innerHTML = [1, 2, 3, 4, 5].map(i => `<div class="stamp-slot ${i === 5 ? 'reward-slot' : ''}">${i === 5 ? '🎁' : '✦'}</div>`).join('');
      msg.textContent = 'Enter your phone number above to check your visit stamps.';
      return;
    }

    // Completed bookings count
    const completedVisits = appState.bookings.filter(b => b.phone === phone && b.status === 'Done').length;
    const stamps = completedVisits % 5;
    const isUnlocked = completedVisits > 0 && stamps === 0;

    let slotsHtml = '';
    for (let i = 1; i <= 5; i++) {
      const isStamped = i <= stamps || isUnlocked;
      const isReward = i === 5;
      slotsHtml += `
        <div class="stamp-slot ${isStamped ? 'stamped' : ''} ${isReward ? 'reward-slot' : ''}">
          ${isStamped ? '★' : (isReward ? '🎁' : i)}
        </div>
      `;
    }
    container.innerHTML = slotsHtml;

    if (isUnlocked) {
      msg.innerHTML = `🎉 <b>Congratulations!</b> You have completed <b>${completedVisits} visits</b>. Your <b>Free Signature Blowout &amp; Treatment</b> reward is ready to redeem at reception!`;
    } else {
      const remaining = 5 - stamps;
      msg.innerHTML = `You have completed <b>${completedVisits} visit${completedVisits === 1 ? '' : 's'}</b>. <b>${remaining} more visit${remaining === 1 ? '' : 's'}</b> to unlock your free ritual reward!`;
    }
  }

  // Render Staff Board
  function renderStaffBoard() {
    const list = DOM.staffBookingsList;
    if (!list) return;

    // Counts for filter pills
    const all = appState.bookings;
    const filterCounts = {
      all: all.length,
      New: all.filter(b => b.status === 'New').length,
      Confirmed: all.filter(b => b.status === 'Confirmed').length,
      Arrived: all.filter(b => b.status === 'Arrived').length,
      'In-service': all.filter(b => b.status === 'In-service').length,
      Done: all.filter(b => b.status === 'Done').length
    };

    DOM.countFilterAll.textContent = filterCounts.all;
    DOM.countFilterNew.textContent = filterCounts.New;
    DOM.countFilterConfirmed.textContent = filterCounts.Confirmed;
    DOM.countFilterArrived.textContent = filterCounts.Arrived;
    DOM.countFilterInService.textContent = filterCounts['In-service'];
    DOM.countFilterDone.textContent = filterCounts.Done;

    // Staff pending notification badge on top tab
    const pendingTotal = filterCounts.New + filterCounts.Arrived;
    DOM.staffPendingCount.textContent = pendingTotal;

    // Filter items
    let filtered = [...all].sort((a, b) => b.timestamp - a.timestamp);
    if (currentStaffFilter !== 'all') {
      filtered = filtered.filter(b => b.status === currentStaffFilter);
    }

    if (filtered.length === 0) {
      list.innerHTML = `
        <div class="card" style="text-align:center; padding:32px 20px;">
          <p class="card-subtitle">No bookings match the filter "${currentStaffFilter}".</p>
        </div>
      `;
      return;
    }

    list.innerHTML = filtered.map(b => {
      const currentIdx = FLOW_STAGES.indexOf(b.status);
      const nextStage = currentIdx >= 0 && currentIdx < FLOW_STAGES.length - 1 ? FLOW_STAGES[currentIdx + 1] : null;

      // Prepare clipboard text for salon software
      const clipboardText = `CLIENT: ${b.name} | PHONE: ${b.phone} | SERVICE: ${b.serviceName} | STYLIST: ${b.stylist} | TIME: ${b.time} | ADDONS: ${b.addons && b.addons.length ? b.addons.join(', ') : 'None'} | TOTAL: ${fmtPrice(b.totalPrice || 2500)} | NOTES: ${b.hairNotes || 'None'} | QR_SOURCE: ${b.source}`;

      return `
        <div class="booking-item-card" data-id="${b.id}">
          <div class="booking-item-header" style="display:flex; align-items:flex-start; gap:12px;">
            <div class="dummy-swatch" style="background: linear-gradient(135deg, hsl(${((SERVICES.find(s=>s.name===b.serviceName)||{}).thumbHue)||35} 40% 25%), hsl(${((SERVICES.find(s=>s.name===b.serviceName)||{}).thumbHue)||35} 50% 12%));">
              ${(SERVICES.find(s => s.name === b.serviceName) || {}).miniSvg || '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#d4a96e" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg>'}
              <span class="dummy-swatch-badge">DUMMY</span>
            </div>
            <div style="flex:1;">
              <div class="booking-client-name">${b.name}</div>
              <div class="booking-meta-line">
                <span>📞 ${b.phone}</span>
                <span>•</span>
                <span class="text-gold font-semibold">${b.serviceName}</span>
                <span>•</span>
                <span>${b.isWalkin ? '⚡ Walk-in' : '📅 ' + b.time}</span>
                <span>•</span>
                <span>with ${b.stylist}</span>
                <span>•</span>
                <span class="station-badge" style="padding:1px 6px; font-size:10px;">${b.source}</span>
              </div>
            </div>
            <span class="booking-status-pill status-${b.status}">${b.status.replace('-', ' ')}</span>
          </div>

          <!-- Addons & Technical Notes / Allergy Consent -->
          <div style="font-size:12px; background:var(--bg-subtle); padding:8px 12px; border-radius:var(--radius-sm); display:flex; flex-direction:column; gap:4px;">
            ${b.addons && b.addons.length ? `<div><b>Add-ons:</b> ${b.addons.join(', ')}</div>` : ''}
            <div><b>Formulas / Notes:</b> ${b.hairNotes || 'Standard formulation.'}</div>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-top:2px;">
              <span style="font-size:11px; color:${b.consentGiven ? 'var(--ok)' : 'var(--warn)'};">
                ${b.consentGiven ? '✓ Patch test & allergy safety consent on file' : '⚠️ No patch test consent recorded'}
              </span>
              <span class="font-semibold text-gold">Total: ${fmtPrice(b.totalPrice || 2500)}</span>
            </div>
          </div>

          <!-- Actions -->
          <div class="booking-item-actions">
            <button class="btn-outline btn-sm copy-pos-btn" data-clipboard="${encodeURIComponent(clipboardText)}" title="Copy formatted record for Fresha/Phorest/POS software">
              📋 Copy for POS Software
            </button>
            <div class="action-buttons-group">
              ${nextStage ? `
                <button class="btn-gold btn-sm advance-status-btn" data-id="${b.id}" data-next="${nextStage}">
                  Advance to: ${nextStage.replace('-', ' ')} →
                </button>
              ` : `
                <span class="text-ok font-semibold" style="font-size:12px;">✓ Visit Finalized</span>
              `}
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Attach advance status listeners
    list.querySelectorAll('.advance-status-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        const next = e.currentTarget.dataset.next;
        const booking = appState.bookings.find(x => x.id === id);
        if (booking) {
          booking.status = next;
          saveState();
          showToast(`Updated "${booking.name}" status to: ${next.replace('-', ' ')}`);
          render();
        }
      });
    });

    // Attach copy to POS clipboard listeners
    list.querySelectorAll('.copy-pos-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const text = decodeURIComponent(e.currentTarget.dataset.clipboard);
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(() => {
            showToast('Copied booking details for salon software!', '📋');
          }).catch(() => {
            fallbackCopy(text);
          });
        } else {
          fallbackCopy(text);
        }
      });
    });
  }

  function fallbackCopy(text) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
      showToast('Copied booking details for salon software!', '📋');
    } catch (e) {
      showToast('Unable to access clipboard automatically.');
    }
    ta.remove();
  }

  // Render Owner Analytics & Reports
  function renderOwnerReports() {
    const bookings = appState.bookings;
    const feedbacks = appState.feedback;

    // Metrics calculation
    const totalCount = bookings.length;
    const phoneMap = {};
    bookings.forEach(b => {
      phoneMap[b.phone] = (phoneMap[b.phone] || 0) + 1;
    });
    const uniqueClients = Object.keys(phoneMap).length;
    const repeatClients = Object.values(phoneMap).filter(c => c > 1).length;
    const repeatRate = uniqueClients > 0 ? Math.round((repeatClients / uniqueClients) * 100) : 0;

    let totalRev = 0;
    bookings.forEach(b => {
      totalRev += (b.totalPrice || 2500);
    });

    const avgRating = feedbacks.length > 0
      ? (feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length).toFixed(1)
      : '5.0';

    DOM.kpiTotalBookings.textContent = totalCount;
    DOM.kpiUniqueClients.textContent = uniqueClients;
    DOM.kpiRepeatClientsSub.textContent = `${repeatClients} repeat guests`;
    DOM.kpiRepeatRate.textContent = `${repeatRate}%`;
    DOM.kpiTotalRevenue.textContent = fmtPrice(totalRev);
    DOM.kpiAvgRating.textContent = `${avgRating} ★`;
    DOM.kpiReviewCount.textContent = `${feedbacks.length} client evaluations`;

    // Busy Hours Breakdown Chart
    const hoursCount = {};
    ['10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', 'Walk-in'].forEach(h => hoursCount[h] = 0);

    bookings.forEach(b => {
      if (b.isWalkin) {
        hoursCount['Walk-in'] = (hoursCount['Walk-in'] || 0) + 1;
      } else {
        const slotKey = b.time.includes(':') ? b.time.split(':')[0] + ':00 ' + b.time.slice(-2) : '11:00 AM';
        hoursCount[slotKey] = (hoursCount[slotKey] || 0) + 1;
      }
    });

    const maxHour = Math.max(1, ...Object.values(hoursCount));
    DOM.busyHoursChart.innerHTML = Object.entries(hoursCount).map(([hour, count]) => {
      const pct = Math.round((count / maxHour) * 100);
      return `
        <div class="chart-bar-row">
          <span class="chart-bar-label">${hour}</span>
          <div class="chart-bar-track">
            <div class="chart-bar-fill" style="width:${pct}%;"></div>
          </div>
          <span class="chart-bar-value">${count}</span>
        </div>
      `;
    }).join('');

    // QR Touchpoint Attribution Breakdown
    const sourceCount = {};
    LOCATIONS.forEach(l => sourceCount[l.name] = 0);
    bookings.forEach(b => {
      const s = b.source || 'Station 1';
      sourceCount[s] = (sourceCount[s] || 0) + 1;
    });
    const maxSource = Math.max(1, ...Object.values(sourceCount));
    DOM.qrAttributionChart.innerHTML = Object.entries(sourceCount).map(([src, count]) => {
      const pct = Math.round((count / maxSource) * 100);
      return `
        <div class="chart-bar-row">
          <span class="chart-bar-label" title="${src}">${src.replace('Station ', 'Stn ')}</span>
          <div class="chart-bar-track">
            <div class="chart-bar-fill" style="width:${pct}%;"></div>
          </div>
          <span class="chart-bar-value">${count}</span>
        </div>
      `;
    }).join('');

    // Services & Dummy Thumbnails Catalog
    if (DOM.ownerServicesTable) {
      DOM.ownerServicesTable.innerHTML = `
        <div style="display:flex; flex-direction:column; gap:8px;">
          ${SERVICES.map(s => `
            <div style="display:flex; justify-content:space-between; align-items:center; background:var(--bg-subtle); padding:10px 14px; border-radius:var(--radius-sm); gap:12px;">
              <div style="display:flex; align-items:center; gap:12px;">
                <div class="dummy-swatch" style="background: linear-gradient(135deg, hsl(${s.thumbHue} 40% 25%), hsl(${s.thumbHue} 50% 12%));">
                  ${s.miniSvg}
                  <span class="dummy-swatch-badge">DUMMY</span>
                </div>
                <div>
                  <b style="font-size:14px; color:var(--ink);">${s.name}</b>
                  <div style="font-size:12px; color:var(--ink-muted);">${s.duration} mins · with ${s.stylist} · ${s.category.toUpperCase()}</div>
                </div>
              </div>
              <div style="display:flex; align-items:center; gap:12px;">
                <b class="text-gold" style="font-size:15px;">${fmtPrice(s.price)}</b>
                <span class="station-badge" style="background:var(--card); font-size:11px;">📷 400×260 Dummy</span>
              </div>
            </div>
          `).join('')}
        </div>
      `;
    }

    // Stylist Roster List
    DOM.stylistRosterTable.innerHTML = `
      <div style="display:flex; flex-direction:column; gap:8px;">
        ${STYLISTS.map(st => `
          <div style="display:flex; justify-content:space-between; align-items:center; background:var(--bg-subtle); padding:10px 14px; border-radius:var(--radius-sm);">
            <div>
              <b style="font-size:14px; color:var(--ink);">${st.name}</b>
              <div style="font-size:12px; color:var(--ink-muted);">${st.role} · Active at ${st.activeStation}</div>
            </div>
            <div style="display:flex; align-items:center; gap:10px;">
              <span style="font-size:12px; color:var(--ink-secondary);">${st.hours}</span>
              <span class="station-badge" style="background:${st.onDuty ? 'var(--ok-bg)' : 'var(--bg)'}; color:${st.onDuty ? 'var(--ok)' : 'var(--ink-muted)'}; border-color:${st.onDuty ? 'var(--ok)' : 'var(--line)'};">
                ${st.onDuty ? '● On Floor' : 'Off Duty'}
              </span>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    // Client Feedback Stream
    if (feedbacks.length === 0) {
      DOM.ownerFeedbackList.innerHTML = '<p class="card-subtitle">No client feedback submitted yet.</p>';
    } else {
      DOM.ownerFeedbackList.innerHTML = feedbacks.slice().reverse().map(f => `
        <div style="border-bottom:1px solid var(--line); padding:10px 0;">
          <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
            <b style="font-size:13px; color:var(--ink);">${f.clientName || 'Guest'}</b>
            <span style="color:#e5a73b; font-size:14px;">${'★'.repeat(f.rating)}${'☆'.repeat(5 - f.rating)}</span>
          </div>
          <p style="font-size:13px; color:var(--ink-secondary); line-height:1.4;">${f.comments || 'No written note.'}</p>
        </div>
      `).join('');
    }
  }

  // Render QR Code Hub
  function renderQrHub() {
    const loc = LOCATIONS.find(l => l.name === activeQrPreviewLocation) || LOCATIONS[0];
    DOM.standLocationTitle.textContent = `${loc.name} · ${loc.desc}`;

    // Target URL represented in QR code
    const qrTargetUrl = `https://maisonlumiere.salon/menu?station=${encodeURIComponent(loc.name)}`;
    DOM.qrSvgWrapper.innerHTML = generateSvgQr(qrTargetUrl, 170);

    // Active chip highlight
    document.querySelectorAll('#qrStationChips .chip-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.loc === activeQrPreviewLocation);
    });
  }

  // Populate Dropdown Form Selects
  function updateServicePreview() {
    const box = document.getElementById('serviceThumbPreviewBox');
    if (!box) return;
    const svcId = DOM.formServiceSelect.value;
    const svc = SERVICES.find(s => s.id === svcId) || SERVICES[0];
    box.innerHTML = `
      <div class="dummy-swatch" style="background: linear-gradient(135deg, hsl(${svc.thumbHue} 40% 25%), hsl(${svc.thumbHue} 50% 12%));">
        ${svc.miniSvg}
        <span class="dummy-swatch-badge">DUMMY</span>
      </div>
      <div>
        <div style="font-size:13px; font-weight:600; color:var(--ink);">${svc.name}</div>
        <div style="font-size:11px; color:var(--ink-muted);">${svc.duration} mins · with ${svc.stylist} · <span class="text-gold font-semibold">${fmtPrice(svc.price)}</span></div>
      </div>
    `;
  }

  function populateFormSelects() {
    // Services
    DOM.formServiceSelect.innerHTML = SERVICES.map(s => `
      <option value="${s.id}">${s.name} (${fmtPrice(s.price)} · ${s.duration}m)</option>
    `).join('');
    updateServicePreview();

    // Stylists
    DOM.formStylistSelect.innerHTML = STYLISTS.map(st => `
      <option value="${st.name}">${st.name} (${st.role})</option>
    `).join('');

    // Time Slots
    DOM.formTimeSelect.innerHTML = TIME_SLOTS.filter(t => t !== 'Walk-in now').map(t => `
      <option value="${t}">${t}</option>
    `).join('');

    // Staff Quick Walkin Selects
    DOM.staffInputService.innerHTML = SERVICES.map(s => `
      <option value="${s.id}">${s.name} (${fmtPrice(s.price)})</option>
    `).join('');

    DOM.staffInputStylist.innerHTML = STYLISTS.map(st => `
      <option value="${st.name}">${st.name}</option>
    `).join('');
  }

  // Populate Station Modal Picker
  function populateLocationPicker() {
    const list = DOM.locationPickerList;
    if (!list) return;

    list.innerHTML = LOCATIONS.map(l => {
      const isCurrent = l.name === appState.currentLocation;
      return `
        <button class="btn-outline btn-block select-loc-btn" data-name="${l.name}" style="text-align:left; justify-content:space-between; ${isCurrent ? 'border-color:var(--gold); font-weight:600;' : ''}">
          <div>
            <b>${l.name}</b>
            <div style="font-size:11px; color:var(--ink-muted);">${l.desc}</div>
          </div>
          ${isCurrent ? '<span class="text-gold">● Active</span>' : ''}
        </button>
      `;
    }).join('');

    list.querySelectorAll('.select-loc-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const name = e.currentTarget.dataset.name;
        setLocation(name);
        DOM.locationModal.classList.remove('active');
      });
    });
  }

  // Global Render Dispatcher
  function render() {
    renderServices();
    renderAddons();
    renderClientTracker();
    renderLoyalty();
    renderStaffBoard();
    renderOwnerReports();
    renderQrHub();
  }

  // Event Listeners Binding
  function bindEvents() {
    // Top Main Navigation
    DOM.mainViewNav.addEventListener('click', (e) => {
      const btn = e.target.closest('.nav-btn');
      if (btn && btn.dataset.tab) {
        switchTab(btn.dataset.tab);
      }
    });

    // Dark/Light Theme Toggle
    DOM.themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') ||
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      showToast(`Switched to ${newTheme} mode`);
    });

    // Location Switch Modals
    const openModal = () => {
      populateLocationPicker();
      DOM.locationModal.classList.add('active');
    };
    DOM.openLocationSwitchBtn.addEventListener('click', openModal);
    DOM.switchTouchpointQuickBtn.addEventListener('click', openModal);
    DOM.closeLocationModalBtn.addEventListener('click', () => {
      DOM.locationModal.classList.remove('active');
    });

    // Service Select preview update
    DOM.formServiceSelect.addEventListener('change', updateServicePreview);

    // Category Filter Chips
    DOM.categoryChips.addEventListener('click', (e) => {
      const btn = e.target.closest('.chip-btn');
      if (!btn) return;
      DOM.categoryChips.querySelectorAll('.chip-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.dataset.cat;
      renderServices();
    });

    // Jump to Book Button
    DOM.jumpToBookBtn.addEventListener('click', () => {
      DOM.bookingSection.scrollIntoView({ behavior: 'smooth' });
    });

    // Booking Mode Toggle (Walk-In vs Schedule)
    DOM.modeWalkinBtn.addEventListener('click', () => {
      currentBookingMode = 'walkin';
      DOM.modeWalkinBtn.classList.add('active');
      DOM.modeScheduleBtn.classList.remove('active');
      DOM.scheduledTimeGroup.style.display = 'none';
      DOM.submitBookingBtn.textContent = '⚡ Join Walk-in Floor Queue';
    });
    DOM.modeScheduleBtn.addEventListener('click', () => {
      currentBookingMode = 'schedule';
      DOM.modeScheduleBtn.classList.add('active');
      DOM.modeWalkinBtn.classList.remove('active');
      DOM.scheduledTimeGroup.style.display = 'flex';
      DOM.submitBookingBtn.textContent = '📅 Reserve Appointment Slot';
    });

    // Booking Request Submission
    DOM.bookingRequestForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const svcId = DOM.formServiceSelect.value;
      const svc = SERVICES.find(s => s.id === svcId) || SERVICES[0];
      const stylist = DOM.formStylistSelect.value;
      const clientName = DOM.formClientName.value.trim();
      const clientPhone = DOM.formClientPhone.value.trim();
      const hairNotes = DOM.formHairNotes.value.trim();
      const consentGiven = DOM.formConsentCheck.checked;
      const isWalkin = currentBookingMode === 'walkin';
      const timeVal = isWalkin ? 'Walk-in now' : DOM.formTimeSelect.value;

      // Price calculation
      let totalCost = svc.price;
      const addonsArray = Array.from(selectedAddons);
      addonsArray.forEach(aname => {
        const ad = ADDONS.find(a => a.name === aname);
        if (ad) totalCost += ad.price;
      });

      const newBooking = {
        id: 'bk-' + Date.now().toString(36),
        name: clientName,
        phone: clientPhone,
        serviceId: svc.id,
        serviceName: svc.name,
        stylist: stylist,
        time: timeVal,
        isWalkin: isWalkin,
        source: appState.currentLocation || 'Station 1',
        status: 'New',
        addons: addonsArray,
        totalPrice: totalCost,
        hairNotes: hairNotes || 'Standard client formulation',
        consentGiven: consentGiven,
        timestamp: Date.now()
      };

      appState.bookings.push(newBooking);
      appState.activeBookingId = newBooking.id;
      saveState();

      // Pre-fill phone in loyalty
      DOM.loyaltyPhoneInput.value = clientPhone;

      showToast(`Request sent for ${clientName}! Staff will confirm shortly.`, '🎉');
      render();

      // Scroll to tracker
      DOM.clientActiveTracker.scrollIntoView({ behavior: 'smooth' });
    });

    // Cancel Active Request
    DOM.cancelRequestBtn.addEventListener('click', () => {
      if (!appState.activeBookingId) return;
      appState.bookings = appState.bookings.filter(b => b.id !== appState.activeBookingId);
      appState.activeBookingId = null;
      saveState();
      showToast('Booking request cancelled.');
      render();
    });

    // Loyalty Check Phone
    DOM.loyaltyCheckBtn.addEventListener('click', () => {
      renderLoyalty();
    });
    DOM.loyaltyPhoneInput.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') renderLoyalty();
    });

    // Package Inquiry Buttons
    document.querySelectorAll('.inquiry-pkg-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const pkgName = e.currentTarget.dataset.pkg;
        showToast(`Selected "${pkgName}". Request sent to reception desk!`, '🎁');
      });
    });

    // Feedback Stars
    DOM.feedbackStarRating.addEventListener('click', (e) => {
      const btn = e.target.closest('.star-btn');
      if (!btn) return;
      currentRating = parseInt(btn.dataset.val, 10);
      DOM.feedbackStarRating.querySelectorAll('.star-btn').forEach(b => {
        const val = parseInt(b.dataset.val, 10);
        b.classList.toggle('active', val <= currentRating);
      });
    });

    // Feedback Form Submission
    DOM.feedbackForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const comments = DOM.feedbackComments.value.trim();
      const clientName = DOM.formClientName.value.trim() || 'Verified Guest';

      appState.feedback.push({
        id: 'fb-' + Date.now().toString(36),
        rating: currentRating,
        comments: comments,
        clientName: clientName,
        timestamp: Date.now()
      });
      saveState();

      DOM.feedbackComments.value = '';
      showToast('Thank you for your gracious feedback!', '★');
      render();
    });

    // Staff Filter Bar
    DOM.staffFilterBar.addEventListener('click', (e) => {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;
      DOM.staffFilterBar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentStaffFilter = btn.dataset.filter;
      renderStaffBoard();
    });

    // Staff Add Walk-in Modal Handlers
    DOM.staffAddWalkinModalBtn.addEventListener('click', () => {
      DOM.walkinModal.classList.add('active');
    });
    DOM.closeWalkinModalBtn.addEventListener('click', () => {
      DOM.walkinModal.classList.remove('active');
    });

    DOM.staffWalkinForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('staffInputName').value.trim();
      const phone = document.getElementById('staffInputPhone').value.trim();
      const svcId = DOM.staffInputService.value;
      const svc = SERVICES.find(s => s.id === svcId) || SERVICES[0];
      const stylist = DOM.staffInputStylist.value;
      const station = document.getElementById('staffInputStation').value;

      const newBooking = {
        id: 'bk-' + Date.now().toString(36),
        name: name,
        phone: phone,
        serviceId: svc.id,
        serviceName: svc.name,
        stylist: stylist,
        time: 'Walk-in now',
        isWalkin: true,
        source: station,
        status: 'Arrived',
        addons: [],
        totalPrice: svc.price,
        hairNotes: 'Floor walk-in registered by staff',
        consentGiven: true,
        timestamp: Date.now()
      };

      appState.bookings.push(newBooking);
      saveState();

      DOM.staffWalkinForm.reset();
      DOM.walkinModal.classList.remove('active');
      showToast(`Added floor walk-in: ${name}`, '⚡');
      render();
    });

    // Export CSV Summary
    DOM.ownerExportCsvBtn.addEventListener('click', () => {
      const rows = [
        ['Booking ID', 'Client Name', 'Phone', 'Service', 'Stylist', 'Time', 'Status', 'Total Price', 'Source']
      ];
      appState.bookings.forEach(b => {
        rows.push([
          b.id,
          `"${b.name}"`,
          b.phone,
          `"${b.serviceName}"`,
          `"${b.stylist}"`,
          `"${b.time}"`,
          b.status,
          b.totalPrice || 2500,
          `"${b.source}"`
        ]);
      });
      const csvContent = 'data:text/csv;charset=utf-8,' + rows.map(r => r.join(',')).join('\n');
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', 'maison_lumiere_bookings_report.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();
      showToast('Exported CSV summary file.', '📥');
    });

    // QR Hub Station Chips
    DOM.qrStationChips.addEventListener('click', (e) => {
      const btn = e.target.closest('.chip-btn');
      if (!btn) return;
      activeQrPreviewLocation = btn.dataset.loc;
      renderQrHub();
    });

    // Simulate Scan from QR Hub
    DOM.simulateScanBtn.addEventListener('click', () => {
      setLocation(activeQrPreviewLocation);
      switchTab('clientView');
      showToast(`Simulated scan from: ${activeQrPreviewLocation}!`, '📱');
    });

    // Print Active Stand
    DOM.printActiveQrStandBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // Initialization
  function init() {
    populateFormSelects();
    populateLocationPicker();
    bindEvents();
    render();

    // Default rating stars initialization
    DOM.feedbackStarRating.querySelectorAll('.star-btn').forEach(b => {
      b.classList.add('active');
    });
  }

  // Kickoff on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();