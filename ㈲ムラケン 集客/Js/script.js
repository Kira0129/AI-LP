// 匠塗装工房 - JavaScript
document.addEventListener('DOMContentLoaded', () => {
  const backToTop = document.getElementById('backToTop');
  const menuToggle = document.getElementById('menuToggle');
  const spNav = document.getElementById('spNav');

  // Back to Top Visibility
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });

  // Hamburger Menu Toggle
  if (menuToggle && spNav) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      spNav.classList.toggle('active');
      document.body.style.overflow = spNav.classList.contains('active') ? 'hidden' : '';
    });

    spNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        spNav.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // Lightbox Modal Logic
  const simSmallImgs = document.querySelectorAll('.sim-img-small img');
  const lbModal = document.getElementById('lightbox');
  const lbImg = document.getElementById('modalImg');
  const lbClose = document.querySelector('.lightbox-close');
  let lbTimer;

  if (lbModal && lbImg) {
    simSmallImgs.forEach(img => {
      // Ensure cursor is zoom-in
      img.style.cursor = 'zoom-in';

      img.addEventListener('click', (e) => {
        e.preventDefault();
        clearTimeout(lbTimer);
        // Set src first to start loading
        lbImg.src = img.src;
        // Show modal
        lbModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    const hideLightbox = () => {
      lbModal.classList.remove('active');
      document.body.style.overflow = '';
      clearTimeout(lbTimer);
      // Wait for transition (400ms) before clearing src to avoid flicker
      lbTimer = setTimeout(() => {
        lbImg.src = '';
      }, 400);
    };

    lbModal.addEventListener('click', (e) => {
      // Close if clicking outside the image or on the close button
      if (e.target === lbModal || e.target === lbClose) {
        hideLightbox();
      }
    });

    if (lbClose) {
      lbClose.addEventListener('click', hideLightbox);
    }
  }

  // Scroll Reveal Implementation
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Once revealed, no need to observe anymore
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1, // Trigger when 10% is visible
    rootMargin: '0px 0px -50px 0px' // Trigger slightly before it enters fully
  });

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });

  // Prevents the context menu from appearing (Disables Right-Click)
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });
});
