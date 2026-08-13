    document.addEventListener('DOMContentLoaded', () => {
      // Right click disable
      document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
      });

      // Text copy disable
      document.addEventListener('copy', (e) => {
        e.preventDefault();
      });

      // Drag disable
      document.addEventListener('dragstart', (e) => {
        e.preventDefault();
      });

      // Back to Top & Sticky CTA logic
      const backToTop = document.getElementById('backToTop');
      const stickyCta = document.querySelector('.sp-sticky-cta');
      const worriesSection = document.getElementById('worries');
      
      window.addEventListener('scroll', () => {
        // Back to top visibility
        if (window.scrollY > 300) {
          backToTop.classList.add('show');
        } else {
          backToTop.classList.remove('show');
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

      // Image Modal Logic (SP Only)
      const modal = document.getElementById('imageModal');
      const modalImg = document.getElementById('modalImg');
      const modalClose = document.getElementById('modalClose');
      const bannerImg = document.querySelector('.price-note-banner');

      if (bannerImg && modal && modalImg && modalClose) {
        bannerImg.addEventListener('click', () => {
          if (window.innerWidth <= 768) {
            modal.classList.add('show');
            modalImg.src = bannerImg.currentSrc || bannerImg.src;
          }
        });

        const closeModal = () => {
          modal.classList.remove('show');
        };

        modalClose.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
          if (e.target === modal) {
            closeModal();
          }
        });
      }
    });
