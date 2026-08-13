document.addEventListener('DOMContentLoaded', () => {
  /* Header Scroll */
  const header = document.getElementById('site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  /* Hamburger Menu */
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const overlay      = document.getElementById('nav-overlay');
  const closeBtn     = document.getElementById('overlay-close-btn');
  const overlayLinks = overlay.querySelectorAll('a');

  function openMenu() {
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  hamburgerBtn.addEventListener('click', openMenu);
  closeBtn.addEventListener('click', closeMenu);
  overlayLinks.forEach(link => link.addEventListener('click', closeMenu));
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeMenu(); });

  /* Scroll To Top */
  const scrollTopBtn = document.getElementById('scroll-top');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* Smooth Scroll */
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

  /* Scroll Reveal */
  const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  };
  const revealObserver = new IntersectionObserver(revealCallback, {
    threshold: 0.15, rootMargin: '0px 0px -50px 0px'
  });
  document.querySelectorAll('.reveal').forEach(el => {
    revealObserver.observe(el);
  });
});
