document.addEventListener('DOMContentLoaded', () => {
  /* Disable Right Click & Drag */
  document.addEventListener('contextmenu', e => e.preventDefault());
  document.addEventListener('dragstart', e => e.preventDefault());

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
  const overlay = document.getElementById('nav-overlay');
  const closeBtn = document.getElementById('overlay-close-btn');
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

  /* Smooth Scroll */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
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

  /* Back to Top */
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    }, { passive: true });

    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* SP Sticky CTA */
  const spStickyCta = document.getElementById('sp-sticky-cta');
  const troubleSection = document.getElementById('trouble');
  if (spStickyCta && troubleSection) {
    window.addEventListener('scroll', () => {
      const troubleTop = troubleSection.getBoundingClientRect().top;
      if (troubleTop < window.innerHeight) {
        spStickyCta.classList.add('show');
      } else {
        spStickyCta.classList.remove('show');
      }
    }, { passive: true });
  }

  /* Image Modal */
  const imageModal = document.getElementById('image-modal');
  const enlargedImg = document.getElementById('enlarged-img');
  const clickableImages = document.querySelectorAll('.clickable-image');
  const modalClose = document.querySelector('.modal-close');

  if (imageModal && enlargedImg) {
    clickableImages.forEach(img => {
      img.addEventListener('click', function() {
        imageModal.style.display = 'flex';
        enlargedImg.src = this.src;
      });
    });

    modalClose.addEventListener('click', () => {
      imageModal.style.display = 'none';
    });

    imageModal.addEventListener('click', (e) => {
      if (e.target !== enlargedImg) {
        imageModal.style.display = 'none';
      }
    });
  }
});
