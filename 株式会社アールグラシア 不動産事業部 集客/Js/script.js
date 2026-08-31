    // Header Scroll
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    });

    // Mobile Menu
    const hamburger = document.getElementById('hamburger');
    const spMenu = document.getElementById('spMenu');
    const spLinks = spMenu.querySelectorAll('a');

    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      spMenu.classList.toggle('active');
    });
    spLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        spMenu.classList.remove('active');
      });
    });

    // Scroll Reveal Animation
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('visible'), i * 80);
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    reveals.forEach(el => observer.observe(el));

    // Disable Drag/Right Click on Images (ダミー画像保護)
    document.addEventListener('contextmenu', e => e.preventDefault());
    document.addEventListener('dragstart', e => { if (e.target.tagName === 'IMG') e.preventDefault(); });

    // Back to Top
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
          backToTop.classList.add('show');
        } else {
          backToTop.classList.remove('show');
        }
      });
      backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
