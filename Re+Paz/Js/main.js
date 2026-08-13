    document.addEventListener('DOMContentLoaded', () => {
      // Nav scroll effect
      const nav = document.getElementById('nav');
      window.addEventListener('scroll', () => {
        if(nav) nav.classList.toggle('scrolled', window.scrollY > 50);
      });

      // Scroll Reveal
      const revealEls = document.querySelectorAll('.reveal');
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            observer.unobserve(e.target);
          }
        });
      }, { threshold: 0.1 });
      revealEls.forEach(el => observer.observe(el));

      // Hamburger Menu
      const hamburger = document.getElementById('hamburger');
      const navLinks = document.getElementById('nav-links');
      const navItems = document.querySelectorAll('.nav-links a');

      if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
          hamburger.classList.toggle('is-active');
          navLinks.classList.toggle('is-active');
        });

        navItems.forEach(item => {
          item.addEventListener('click', () => {
            hamburger.classList.remove('is-active');
            navLinks.classList.remove('is-active');
          });
        });
      }

      // Back to Top
      const toTop = document.getElementById('to-top');
      if (toTop) {
        window.addEventListener('scroll', () => {
          toTop.classList.toggle('is-visible', window.scrollY > 500);
        });
        toTop.addEventListener('click', () => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
      }

      // Read More for Voice
      const voiceTexts = document.querySelectorAll('.voice-text');
      voiceTexts.forEach(textEl => {
        const wrap = textEl.parentElement;
        const btn = wrap.querySelector('.read-more-btn');
        if (btn) {
            btn.addEventListener('click', () => {
              textEl.classList.toggle('expanded');
              btn.textContent = textEl.classList.contains('expanded') ? '閉じる' : '続きを読む';
            });
        }
      });

      // Image Modal Background Click
      const imageModal = document.getElementById('imageModal');
      if (imageModal) {
        imageModal.addEventListener('click', (e) => {
          if (e.target === imageModal) {
            closeModal();
          }
        });
      }
    });

    // Image Modal
    function openModal(src) {
      const modal = document.getElementById('imageModal');
      const modalImg = document.getElementById('modalImg');
      if(modal && modalImg) {
        modal.style.display = "flex";
        void modal.offsetHeight; 
        modal.classList.add('show');
        modalImg.src = src;
        document.body.style.overflow = 'hidden';
      }
    }

    function closeModal() {
      const modal = document.getElementById('imageModal');
      if(modal) {
        modal.classList.remove('show');
        setTimeout(() => {
          modal.style.display = "none";
        }, 300);
        document.body.style.overflow = '';
      }
    }
