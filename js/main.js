/**
 * JUAL KULKAS & JASA SERVIS PROFESIONAL (2026)
 * Main JavaScript Controller
 * Pure Vanilla JS, High Performance, Mobile First
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --- 1. CONFIGURATION & CONSTANTS ---
  const WA_NUMBER_1 = '6285691604318'; // 085691604318 in international format
  const WA_NUMBER_2 = '62895340614416'; // 0895340614416 in international format

  // --- 2. NAVBAR SCROLL & ACTIVE LINK TRACKING ---
  const navbar = document.querySelector('.navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

  const handleScroll = () => {
    if (window.scrollY > 30) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }

    // Active navigation highlighting
    const scrollY = window.pageYOffset;
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // --- 3. MOBILE MENU DRAWER TOGGLE ---
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileToggle && mobileDrawer) {
    const toggleDrawer = (open) => {
      const isOpen = open !== undefined ? open : !mobileDrawer.classList.contains('open');
      mobileDrawer.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
      mobileToggle.setAttribute('aria-expanded', isOpen);

      const hamburgerIcon = mobileToggle.querySelector('.icon-hamburger');
      const closeIcon = mobileToggle.querySelector('.icon-close');
      if (hamburgerIcon && closeIcon) {
        hamburgerIcon.style.display = isOpen ? 'none' : 'block';
        closeIcon.style.display = isOpen ? 'block' : 'none';
      }
    };

    mobileToggle.addEventListener('click', () => toggleDrawer());

    // Close on clicking backdrop
    mobileDrawer.addEventListener('click', (e) => {
      if (e.target === mobileDrawer) {
        toggleDrawer(false);
      }
    });

    // Close on clicking any mobile link
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        toggleDrawer(false);
      });
    });
  }

  // --- 4. PRODUCT FILTERING ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  if (filterBtns.length > 0 && productCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const category = btn.getAttribute('data-filter');

        productCards.forEach(card => {
          const cardCategory = card.getAttribute('data-category');
          if (category === 'all' || cardCategory === category) {
            card.style.display = 'flex';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 30);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(12px)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 250);
          }
        });
      });
    });
  }

  // --- 5. BOOKING FORM & DIRECT WHATSAPP INTEGRATION ---
  const bookingForm = document.getElementById('bookingForm');
  const radioCards = document.querySelectorAll('.radio-card');

  // Handle radio selection styling
  radioCards.forEach(card => {
    card.addEventListener('click', () => {
      radioCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      const radio = card.querySelector('input[type="radio"]');
      if (radio) radio.checked = true;
    });
  });

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nama = document.getElementById('formNama')?.value.trim() || '';
      const noHp = document.getElementById('formWa')?.value.trim() || '';
      const layanan = document.getElementById('formLayanan')?.value || '';
      const alamat = document.getElementById('formAlamat')?.value.trim() || '';
      const pesan = document.getElementById('formPesan')?.value.trim() || '';
      
      // Determine recipient WhatsApp number
      const selectedTarget = document.querySelector('input[name="targetWa"]:checked')?.value;
      const targetWaNumber = selectedTarget === 'wa2' ? WA_NUMBER_2 : WA_NUMBER_1;

      // Validation
      if (!nama) {
        showToast('Mohon masukkan Nama Lengkap Anda', 'warning');
        document.getElementById('formNama')?.focus();
        return;
      }

      if (!noHp) {
        showToast('Mohon masukkan Nomor WhatsApp Anda', 'warning');
        document.getElementById('formWa')?.focus();
        return;
      }

      if (!layanan) {
        showToast('Silakan pilih jenis layanan', 'warning');
        document.getElementById('formLayanan')?.focus();
        return;
      }

      if (!alamat) {
        showToast('Mohon isi alamat lengkap Anda', 'warning');
        document.getElementById('formAlamat')?.focus();
        return;
      }

      // Format WhatsApp Message as strictly required
      const messageText = 
`Halo, saya ingin memesan / booking layanan:
Nama: ${nama}
Nomor WhatsApp: ${noHp}
Layanan: ${layanan}
Alamat: ${alamat}
Keluhan/Pesan: ${pesan || '-'}`;

      const waUrl = `https://wa.me/${targetWaNumber}?text=${encodeURIComponent(messageText)}`;

      showToast('Membuka WhatsApp...', 'success');

      setTimeout(() => {
        window.open(waUrl, '_blank', 'noopener,noreferrer');
      }, 350);
    });
  }

  // --- 6. FAST WHATSAPP PRODUCT INQUIRY ---
  window.orderProductViaWa = function(productName, targetWa = WA_NUMBER_1) {
    const text = `Halo, saya tertarik dengan produk *${productName}*. Apakah unit ini masih tersedia dan bisa konsultasi detailnya? Terima kasih.`;
    const url = `https://wa.me/${targetWa}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // --- 7. FAST BOOKING PRE-SELECTION ---
  window.selectServiceAndScroll = function(serviceName) {
    const serviceSelect = document.getElementById('formLayanan');
    const bookingSection = document.getElementById('booking');

    if (serviceSelect) {
      for (let i = 0; i < serviceSelect.options.length; i++) {
        if (serviceSelect.options[i].text.includes(serviceName) || serviceSelect.options[i].value.includes(serviceName)) {
          serviceSelect.selectedIndex = i;
          break;
        }
      }
    }

    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
      const pesanField = document.getElementById('formPesan');
      if (pesanField) {
        pesanField.focus();
        pesanField.placeholder = `Jelaskan kendala kulkas Anda terkait ${serviceName}...`;
      }
    }
  };

  // --- 8. FLOATING WHATSAPP BUTTON & POPUP ---
  const floatingBtn = document.getElementById('floatingWaBtn');
  const floatingPopup = document.getElementById('floatingWaPopup');

  if (floatingBtn && floatingPopup) {
    floatingBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      floatingPopup.classList.toggle('open');
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
      if (!floatingPopup.contains(e.target) && !floatingBtn.contains(e.target)) {
        floatingPopup.classList.remove('open');
      }
    });
  }

  // Direct fast wa link helper
  window.openDirectWa = function(waNum, customNote = '') {
    const defaultText = customNote 
      ? customNote 
      : 'Halo, saya ingin konsultasi mengenai Kulkas / Servis Kulkas.';
    const url = `https://wa.me/${waNum}?text=${encodeURIComponent(defaultText)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // --- 9. GALLERY LIGHTBOX MODAL ---
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (lightboxModal && lightboxImg) {
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const caption = item.querySelector('.gallery-caption')?.textContent || '';
        const subcaption = item.querySelector('.gallery-subcaption')?.textContent || '';

        if (img) {
          lightboxImg.src = img.src;
          lightboxImg.alt = img.alt;
          if (lightboxCaption) {
            lightboxCaption.textContent = subcaption ? `${caption} — ${subcaption}` : caption;
          }
          lightboxModal.classList.add('open');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    const closeLightbox = () => {
      lightboxModal.classList.remove('open');
      document.body.style.overflow = '';
    };

    lightboxClose?.addEventListener('click', closeLightbox);
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightboxModal.classList.contains('open')) {
        closeLightbox();
      }
    });
  }

  // --- 10. COPY PHONE NUMBER UTILITY ---
  window.copyToClipboard = function(text, label = 'Nomor') {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(`${label} ${text} disalin ke clipboard!`, 'success');
      }).catch(() => {
        fallbackCopy(text, label);
      });
    } else {
      fallbackCopy(text, label);
    }
  };

  function fallbackCopy(text, label) {
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    try {
      document.execCommand('copy');
      showToast(`${label} ${text} disalin ke clipboard!`, 'success');
    } catch (err) {
      showToast(`Silakan simpan nomor: ${text}`, 'info');
    }
    document.body.removeChild(tempInput);
  }

  // --- 11. TOAST NOTIFICATION SYSTEM ---
  function showToast(message, type = 'info') {
    let toast = document.getElementById('toastNotice');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toastNotice';
      toast.className = 'toast-notice';
      toast.innerHTML = `
        <div class="toast-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <div class="toast-text">
          <strong id="toastTitle">Pemberitahuan</strong>
          <span id="toastDesc"></span>
        </div>
      `;
      document.body.appendChild(toast);
    }

    const toastDesc = document.getElementById('toastDesc');
    const toastTitle = document.getElementById('toastTitle');
    if (toastDesc) toastDesc.textContent = message;
    if (toastTitle) {
      toastTitle.textContent = type === 'success' ? 'Berhasil!' : (type === 'warning' ? 'Perhatian' : 'Informasi');
    }

    toast.classList.add('show');

    clearTimeout(window.toastTimer);
    window.toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3800);
  }

  // --- 12. SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER) ---
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    reveals.forEach(el => revealObserver.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('active'));
  }
});
