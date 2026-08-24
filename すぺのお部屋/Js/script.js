document.addEventListener('DOMContentLoaded', () => {
  // Header Scroll
  const header = document.getElementById('site-header');
  const spFixedCta = document.getElementById('sp-fixed-cta');
  const fvSection = document.getElementById('fv');

  window.addEventListener('scroll', () => {
    if(window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
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



  // Smooth Scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        return;
      }
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerHeight = header.offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Scroll Reveal Animation using Intersection Observer
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // 一度発火したら監視を解除
      }
    });
  }, observerOptions);

  revealEls.forEach(el => observer.observe(el));
});
