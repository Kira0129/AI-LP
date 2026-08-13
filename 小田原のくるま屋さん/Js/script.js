document.addEventListener('DOMContentLoaded', () => {
      // Initialize Lucide icons
      if (typeof lucide !== 'undefined') {
        lucide.createIcons();
      }

      // Scroll Reveal Animation (Intersection Observer)
      const revealElements = document.querySelectorAll('.reveal');
      const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });
      revealElements.forEach(el => revealObserver.observe(el));

      // Hamburger Menu Logic
      const hamburgerBtn = document.querySelector('.hamburger-btn');
      const navLinks = document.querySelector('.nav-links');
      const navItems = document.querySelectorAll('.nav-links a');

      if (hamburgerBtn && navLinks) {
        hamburgerBtn.addEventListener('click', () => {
          hamburgerBtn.classList.toggle('is-open');
          navLinks.classList.toggle('is-open');
        });

        navItems.forEach(item => {
          item.addEventListener('click', () => {
            hamburgerBtn.classList.remove('is-open');
            navLinks.classList.remove('is-open');
          });
        });
      }

      // Voice Read More Logic
      const voiceCards = document.querySelectorAll('.voice-card');
      voiceCards.forEach(card => {
        const textElement = card.querySelector('.voice-text');
        const readMoreBtn = card.querySelector('.voice-read-more');
        if (!textElement || !readMoreBtn) return;
        
        // 最初は3行に制限するクラスを付与
        textElement.classList.add('is-clamped');
        
        // 実際のテキストの高さが制限された高さより大きい場合のみボタンを表示
        if (textElement.scrollHeight > textElement.clientHeight) {
          readMoreBtn.style.display = 'inline-flex';
          readMoreBtn.addEventListener('click', () => {
            textElement.classList.toggle('is-clamped');
            readMoreBtn.classList.toggle('is-open');
            const btnText = readMoreBtn.querySelector('.btn-text');
            if (readMoreBtn.classList.contains('is-open')) {
              btnText.textContent = '閉じる';
            } else {
              btnText.textContent = '続きを読む';
            }
          });
        } else {
          // 3行以下の場合はボタンを隠す
          readMoreBtn.style.display = 'none';
          textElement.classList.remove('is-clamped');
        }
      });

      // Pricing Parallax Logic (iOS/SP/PC共通)
      const pricingBgJs = document.querySelector('.pricing-bg-js');
      const pricingSec = document.querySelector('#pricing');
      if (pricingBgJs && pricingSec) {
        const updateParallax = () => {
          const rect = pricingSec.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          if (rect.top <= windowHeight && rect.bottom >= 0) {
            // 移動量を0.15から0.4に増やし、よりはっきりとパララックスが分かるように調整
            const scrollDistance = windowHeight - rect.top;
            pricingBgJs.style.transform = `translate3d(0, ${scrollDistance * 0.4}px, 0)`;
          }
        };
        // 初期化時とスクロール時に実行
        updateParallax();
        window.addEventListener('scroll', updateParallax, { passive: true });
      }

      // Back to Top Button Logic
      const backToTopBtn = document.getElementById('back-to-top');
      if (backToTopBtn) {
        window.addEventListener('scroll', () => {
          if (window.scrollY > 300) {
            backToTopBtn.classList.add('is-visible');
          } else {
            backToTopBtn.classList.remove('is-visible');
          }
        }, { passive: true });

        backToTopBtn.addEventListener('click', () => {
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        });
      }
    });
