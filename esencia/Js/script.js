document.addEventListener('DOMContentLoaded', () => {
  // Header Scroll Effect
  const header = document.getElementById('site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  }, { passive: true });

  // Mobile Menu Toggle
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const overlay = document.getElementById('nav-overlay');
  const closeBtn = document.getElementById('overlay-close-btn');
  const overlayLinks = overlay.querySelectorAll('a');

  function toggleMenu() {
    overlay.classList.toggle('open');
    document.body.style.overflow = overlay.classList.contains('open') ? 'hidden' : '';
  }
  hamburgerBtn.addEventListener('click', toggleMenu);
  closeBtn.addEventListener('click', toggleMenu);
  overlayLinks.forEach(link => link.addEventListener('click', toggleMenu));

  // Scroll to Top Button
  const scrollTopBtn = document.getElementById('scroll-top');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) scrollTopBtn.classList.add('visible');
    else scrollTopBtn.classList.remove('visible');
  }, { passive: true });
  scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // Smooth Scroll for Anchors
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') { e.preventDefault(); return; }
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerH = document.getElementById('site-header').offsetHeight;
        const top = target.getBoundingClientRect().top + window.scrollY - headerH;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // Scroll Reveal Animation
  const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  };
  const revealObserver = new IntersectionObserver(revealCallback, {
    threshold: 0.1, rootMargin: '0px 0px -50px 0px'
  });
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
  
  // Voice Card Read More Logic
  document.querySelectorAll('.voice-card').forEach(card => {
    const textElem = card.querySelector('.voice-text');
    const btn = card.querySelector('.btn-read-more');
    if (!textElem || !btn) return;

    // A slight delay ensures CSS/fonts are applied before measuring height
    setTimeout(() => {
      if (textElem.scrollHeight > textElem.clientHeight) {
        btn.style.display = 'block';
        btn.addEventListener('click', () => {
          const isExpanded = textElem.classList.toggle('is-expanded');
          btn.textContent = isExpanded ? '閉じる' : 'もっと見る';
          btn.setAttribute('aria-expanded', isExpanded);
        });
      }
    }, 100);
  });

  // Basic protection
  document.addEventListener('contextmenu', e => { if (e.target.tagName === 'IMG') e.preventDefault(); });
  document.addEventListener('dragstart', e => { if (e.target.tagName === 'IMG') e.preventDefault(); });
});
