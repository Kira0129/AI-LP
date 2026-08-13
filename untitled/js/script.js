document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const nav = document.querySelector('nav');
  const menuBtn = document.querySelector('.menu-btn');
  const navLinks = document.querySelectorAll('.nav-links a');

  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      nav.classList.toggle('is-open');
      document.body.style.overflow = nav.classList.contains('is-open') ? 'hidden' : '';
    });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      document.body.style.overflow = '';
    });
  });

  // Hero Swiper
  new Swiper('.hero-slider', {
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    loop: true,
    speed: 2000,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
  });

  // Swiper initialization
  new Swiper('.menu-slider', {
    slidesPerView: 1.2,
    spaceBetween: 20,
    loop: true,
    speed: 5000,
    autoplay: { 
      delay: 0, 
      disableOnInteraction: false 
    },
    breakpoints: {
      768: { 
        slidesPerView: 1.5, 
        spaceBetween: 32 
      }
    }
  });

  // Customer Voice Read More Toggle
  const voiceCards = document.querySelectorAll('.voice-card');
  voiceCards.forEach(card => {
    const text = card.querySelector('.voice-text');
    const btn = card.querySelector('.voice-more-btn');
    
    // 3行以上あるか判定
    if (text && btn) {
      if (text.scrollHeight > text.offsetHeight) {
        btn.style.display = 'inline-flex';
      }

      btn.addEventListener('click', () => {
        card.classList.toggle('is-expanded');
        btn.textContent = card.classList.contains('is-expanded') ? 'Close' : 'Read More';
      });
    }
  });

  // Page Top Button Visibility
  const pageTopBtn = document.getElementById('pageTopBtn');
  if (pageTopBtn) {
    window.addEventListener('scroll', () => {
      // 300pxスクロールしたら表示
      if (window.scrollY > 300) {
        pageTopBtn.classList.add('is-visible');
      } else {
        pageTopBtn.classList.remove('is-visible');
      }
    });

    pageTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Prevent text selection and image saving
  document.addEventListener('contextmenu', (e) => {
    if (e.target.tagName === 'IMG' || e.target.tagName === 'BODY' || e.target.closest('section')) {
      e.preventDefault();
    }
  }, false);

  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('dragstart', (e) => {
      e.preventDefault();
    });
  });
});
