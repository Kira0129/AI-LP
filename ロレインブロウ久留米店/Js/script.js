/* ─── コピー禁止 ─── */
document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('selectstart', e => e.preventDefault());

/* ─── Header scroll & SP fixed CTA ─── */
const header = document.getElementById('site-header');
const spFixedCta = document.getElementById('sp-fixed-cta');
const fvSection  = document.getElementById('fv');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 60);
  if (spFixedCta && fvSection) {
    const fvBottom = fvSection.offsetTop + fvSection.offsetHeight;
    spFixedCta.classList.toggle('visible', window.scrollY > fvBottom - 100);
  }
}, { passive: true });

/* ─── Hamburger / SP Menu ─── */
const hamburgerBtn = document.getElementById('hamburger-btn');
const spMenu       = document.getElementById('sp-menu');
const spMenuClose  = document.getElementById('sp-menu-close');

function openSPMenu() {
  spMenu.classList.add('open');
  hamburgerBtn.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}
function closeSPMenu() {
  spMenu.classList.remove('open');
  hamburgerBtn.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

hamburgerBtn.addEventListener('click', openSPMenu);
spMenuClose.addEventListener('click', closeSPMenu);
spMenu.addEventListener('click', e => { if (e.target === spMenu) closeSPMenu(); });

/* ─── Swipers ─── */
// Hero (FV) Swiper with Process Sync
const processItems = document.querySelectorAll('.process-item');
if (document.querySelector('.hero-swiper')) {
  const heroSwiper = new Swiper('.hero-swiper', {
    loop: true,
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    speed: 1000,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false
    },
    on: {
      slideChange: function () {
        const realIndex = this.realIndex;
        processItems.forEach((item, index) => {
          if (index === realIndex) {
            item.classList.add('active');
          } else {
            item.classList.remove('active');
          }
        });
      }
    }
  });

  // Click to change slide
  processItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      heroSwiper.slideToLoop(index);
    });
  });
}

// Menu Swiper
new Swiper('.menu-slider', {
  slidesPerView: 1.2,
  spaceBetween: 20,
  loop: true,
  speed: 5000,
  autoplay: { delay: 0, disableOnInteraction: false },
  breakpoints: {
    768: { slidesPerView: 1.5, spaceBetween: 32 }
  }
});

/* ─── Scroll Reveal ─── */
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });
revealEls.forEach(el => io.observe(el));

/* ─── Scroll to Top ─── */
const scrollTopBtn = document.getElementById('scroll-top');
window.addEventListener('scroll', () => {
  scrollTopBtn.classList.toggle('show', window.scrollY > 400);
}, { passive: true });
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ─── Smooth scroll for anchor links ─── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      closeSPMenu();
      const headerHeight = header.offsetHeight;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    }
  });
});

/* ─── Voice Read More Accordion ─── */
document.addEventListener('DOMContentLoaded', () => {
  const voiceCards = document.querySelectorAll('.voice-card');
  
  voiceCards.forEach(card => {
    const wrap = card.querySelector('.voice-text-wrap');
    const btn = card.querySelector('.voice-expand-btn');
    if (!wrap || !btn) return;
    
    // 3行分の高さを計算する (font-size * line-height * 3)
    const style = window.getComputedStyle(wrap);
    const fontSize = parseFloat(style.fontSize);
    const lineHeight = parseFloat(style.lineHeight) || (fontSize * 1.8);
    const thresholdHeight = lineHeight * 3 + 2; // 微小な誤差を考慮してバッファを加える
    
    // scrollHeightが3行分の高さよりも高い場合のみ開閉ボタンを有効にする
    if (wrap.scrollHeight > thresholdHeight) {
      btn.style.display = 'block'; // ボタンを表示
      
      btn.addEventListener('click', () => {
        const isExpanded = wrap.classList.contains('is-expanded');
        if (isExpanded) {
          wrap.classList.remove('is-expanded');
          wrap.style.maxHeight = '5.4em';
          btn.textContent = '続きを読む ＋';
        } else {
          wrap.classList.add('is-expanded');
          wrap.style.maxHeight = wrap.scrollHeight + 'px';
          btn.textContent = '閉じる ─';
        }
      });
    } else {
      btn.style.display = 'none'; // 3行未満ならボタンは不要
      wrap.style.maxHeight = 'none'; // 高さの制限を解除
      wrap.classList.add('no-gradient'); // フェードグラデーションを非表示に
    }
  });
});
