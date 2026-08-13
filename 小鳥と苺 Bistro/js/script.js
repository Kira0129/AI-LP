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
}, { threshold: 0.1 });
revealEls.forEach(el => io.observe(el));

/* ─── Q&A Accordion ─── */
document.querySelectorAll('.qa-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item   = btn.closest('.qa-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.qa-item.open').forEach(el => {
      el.classList.remove('open');
      el.querySelector('.qa-question').setAttribute('aria-expanded', 'false');
    });
    if (!isOpen) {
      item.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});

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
      closeSPMenu(); // ナビゲーション後にメニューを閉じる
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
