document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('site-header');
  const spFixedCta = document.getElementById('sp-fixed-cta');
  const fvSection = document.getElementById('fv');

  window.addEventListener('scroll', () => {
    // Header Scroll
    if(window.scrollY > 60) {
      header.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
    } else {
      header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    }

    // Show SP Fixed CTA after FV
    if (spFixedCta && fvSection && window.innerWidth < 768) {
      const fvBottom = fvSection.offsetTop + fvSection.offsetHeight;
      if(window.scrollY > fvBottom - 100) {
        spFixedCta.classList.add('visible');
      } else {
        spFixedCta.classList.remove('visible');
      }
    }

    // Page Top Button Visibility
    const pageTop = document.getElementById('page-top');
    if (pageTop) {
      if (window.scrollY > 300) {
        pageTop.classList.add('is-visible');
      } else {
        pageTop.classList.remove('is-visible');
      }
    }
  }, { passive: true });

  // Hamburger Menu
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const spMenu = document.getElementById('sp-menu');
  const spMenuLinks = document.querySelectorAll('#sp-menu nav a');

  if (hamburgerBtn && spMenu) {
    hamburgerBtn.addEventListener('click', () => {
      hamburgerBtn.classList.toggle('active');
      spMenu.classList.toggle('open');
    });

    const closeMenu = () => {
      hamburgerBtn.classList.remove('active');
      spMenu.classList.remove('open');
    };

    spMenuLinks.forEach(link => {
      link.addEventListener('click', closeMenu);
    });
  }

  // Smooth Scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerHeight = header.offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    });
  });

  // Scroll Reveal Animation
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach(el => observer.observe(el));
});
