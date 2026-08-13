/* ─── コピー禁止 ─── */
document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('selectstart', e => e.preventDefault());

/* ─── Header scroll & SP fixed CTA ─── */
const header = document.getElementById('site-header');
const spFixedCta = document.getElementById('sp-fixed-cta');
const fvSection = document.getElementById('fv');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 60);
  if (spFixedCta && fvSection) {
    const fvBottom = fvSection.offsetTop + fvSection.offsetHeight;
    spFixedCta.classList.toggle('visible', window.scrollY > fvBottom - 100);
  }
}, { passive: true });

/* ─── Hamburger / SP Menu ─── */
const hamburgerBtn = document.getElementById('hamburger-btn');
const spMenu = document.getElementById('sp-menu');
const spMenuClose = document.getElementById('sp-menu-close');

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
new Swiper('.menu-slider', {
  slidesPerView: 1.2,
  spaceBetween: 20,
  loop: true,
  speed: 5000,
  autoplay: { delay: 0, disableOnInteraction: false },
  breakpoints: {
    768: { slidesPerView: 1.2, spaceBetween: 32 } /* PC時の1枚あたりの表示サイズを大きく調整 (元1.5) */
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
}, { threshold: 0.1 });
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
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      closeSPMenu();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ─── Voice Read More ─── */
window.addEventListener('load', () => {
  const voiceTexts = document.querySelectorAll('.voice-text');
  voiceTexts.forEach(text => {
    const container = text.parentElement;
    const btn = container.querySelector('.read-more-btn');

    if (text.scrollHeight > text.clientHeight + 2) {
      btn.classList.add('is-visible');
    }

    btn.addEventListener('click', () => {
      text.classList.toggle('expanded');
      btn.textContent = text.classList.contains('expanded') ? '閉じる' : '続きを読む';
    });
  });
});
