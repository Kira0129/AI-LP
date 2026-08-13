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

      // Image Modal
      const modal = document.getElementById('image-modal');
      const modalImg = document.getElementById('modal-img');
      const closeSpan = document.querySelector('.modal-close');
      const zoomableImages = document.querySelectorAll('.zoomable-banner');

      if(modal && modalImg && closeSpan) {
        zoomableImages.forEach(img => {
          img.addEventListener('click', function() {
            modal.classList.add('show');
            modalImg.src = this.src;
            document.body.style.overflow = 'hidden';
          });
        });

        closeSpan.addEventListener('click', () => {
          modal.classList.remove('show');
          document.body.style.overflow = '';
        });

        modal.addEventListener('click', (e) => {
          if (e.target === modal) {
            modal.classList.remove('show');
            document.body.style.overflow = '';
          }
        });
      }

      // ----------------------------------------------------
      // Text Selection & Image Protection (Right Click / Drag)
      // ----------------------------------------------------
      document.addEventListener('contextmenu', e => {
        if (e.target.tagName === 'IMG') {
          e.preventDefault();
        }
      });
      document.addEventListener('dragstart', e => {
        if (e.target.tagName === 'IMG') {
          e.preventDefault();
        }
      });
    });
