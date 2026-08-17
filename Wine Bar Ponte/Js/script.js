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

  const fvElements = {
    catch: document.getElementById('fv-catch'),
    sub: document.getElementById('fv-sub'),
    logo: document.getElementById('fv-logo'),
    readMore: document.getElementById('fv-read-more'),
    readMoreLine: document.querySelector('.fv-read-more-line'),
    gridItems: document.querySelectorAll('.fv-grid-item'),
    decoItems: document.querySelectorAll('.fv-deco')
  };

  const splitTextToChars = (el) => {
    if (!el) return;
    const lines = el.querySelectorAll('.fv-catch-line');
    if (lines.length > 0) {
      let globalIndex = 0;
      lines.forEach(line => {
        const text = line.textContent.trim();
        line.innerHTML = '';
        [...text].forEach(char => {
          const span = document.createElement('span');
          span.textContent = char;
          span.className = 'char';
          span.style.setProperty('--char-index', globalIndex++);
          line.appendChild(span);
        });
      });
    } else {
      const text = el.textContent.trim();
      el.innerHTML = '';
      [...text].forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.className = 'char';
        span.style.setProperty('--char-index', index);
        el.appendChild(span);
      });
    }
  };

  splitTextToChars(fvElements.catch);
  
  // サブコピーは一文字ずつではなく、フェードインさせるため分割しない
  // splitTextToChars(fvElements.sub); 
  
  // splitTextToChars(fvElements.logo);

  const startFVAnimation = () => {
    if (fvElements.catch) fvElements.catch.classList.add('is-active');

    setTimeout(() => {
      fvElements.decoItems.forEach((deco, index) => {
        setTimeout(() => deco.classList.add('show'), index * 100);
      });
    }, 300);

    setTimeout(() => {
      if (fvElements.sub) {
        fvElements.sub.style.transition = 'opacity 1s ease, transform 1s ease';
        fvElements.sub.style.opacity = '1';
        fvElements.sub.style.transform = 'translateY(0)';
      }
    }, 800);

    setTimeout(() => {
      if (fvElements.logo) fvElements.logo.classList.add('is-active');
    }, 1200);

    setTimeout(() => {
      if (fvElements.readMore) {
        fvElements.readMore.classList.add('is-visible');
        if (fvElements.readMoreLine) fvElements.readMoreLine.classList.add('animate');
      }
    }, 1800);

    setTimeout(() => {
      fvElements.gridItems.forEach((item, index) => {
        setTimeout(() => item.classList.add('show'), index * 150);
      });
    }, 2200);
  };

  // Start animation shortly after load
  setTimeout(startFVAnimation, 100);

  // Menu Swiper
  const menuSwiper = new Swiper('.menu-swiper', {
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
      if (window.scrollY > 300) {
        pageTopBtn.classList.add('is-show');
      } else {
        pageTopBtn.classList.remove('is-show');
      }
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
});
