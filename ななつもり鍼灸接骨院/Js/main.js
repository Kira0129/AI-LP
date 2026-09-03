document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('site-header');
  const spFixedCta = document.getElementById('sp-fixed-cta');
  const fvSection = document.getElementById('fv');
  const pageTop = document.getElementById('page-top');
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const spMenu = document.getElementById('sp-menu');
  const spMenuClose = document.getElementById('sp-menu-close');
  const spNavLinks = spMenu.querySelectorAll('nav a');

  window.addEventListener('scroll', () => {
    // Header Scroll
    if(window.scrollY > 60) {
      header.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
    } else {
      header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    }

    // SP Fixed CTA & Page Top visibility
    const fvBottom = fvSection ? fvSection.offsetTop + fvSection.offsetHeight : 0;
    if (window.scrollY > (fvBottom / 2)) {
      if (spFixedCta) spFixedCta.classList.add('visible');
      if (pageTop) pageTop.classList.add('is-visible');
    } else {
      if (spFixedCta) spFixedCta.classList.remove('visible');
      if (pageTop) pageTop.classList.remove('is-visible');
    }
  });

  // Hamburger menu
  const toggleMenu = () => {
    hamburgerBtn.classList.toggle('active');
    spMenu.classList.toggle('open');
  };

  if (hamburgerBtn) hamburgerBtn.addEventListener('click', toggleMenu);
  if (spMenuClose) spMenuClose.addEventListener('click', toggleMenu);
  
  spNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburgerBtn.classList.remove('active');
      spMenu.classList.remove('open');
    });
  });

  // Page Top smooth scroll (optional since css has scroll-behavior: smooth)
  if (pageTop) {
    pageTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Scroll reveal
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: '0px 0px -10% 0px',
    threshold: 0.1
  });

  revealElements.forEach(el => revealObserver.observe(el));
});
