document.addEventListener('DOMContentLoaded', () => {
  // 右クリック禁止
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });

  // Back to Top & Sticky CTA logic
  const backToTop = document.getElementById('backToTop');
  const stickyCta = document.querySelector('.sp-sticky-cta');
  const aboutSection = document.getElementById('about');
  
  window.addEventListener('scroll', () => {
    // Back to top visibility
    if (window.scrollY > 300) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }

    // Sticky CTA visibility
    if (aboutSection) {
      const aboutTop = aboutSection.offsetTop;
      if (window.scrollY >= aboutTop) {
        stickyCta.classList.add('show');
      } else {
        stickyCta.classList.remove('show');
      }
    }
  });

  backToTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Hamburger Menu logic
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const spNav = document.getElementById('spNav');
  const navOverlay = document.getElementById('navOverlay');
  const spNavLinks = document.querySelectorAll('.sp-nav-list a');

  const toggleMenu = () => {
    hamburgerBtn.classList.toggle('is-active');
    spNav.classList.toggle('is-active');
    navOverlay.classList.toggle('is-active');
    document.body.classList.toggle('overflow-hidden');
  };

  if(hamburgerBtn) hamburgerBtn.addEventListener('click', toggleMenu);
  if(navOverlay) navOverlay.addEventListener('click', toggleMenu);

  spNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (spNav.classList.contains('is-active')) {
        toggleMenu();
      }
    });
  });

  // Scroll Animation (Intersection Observer)
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));
});
