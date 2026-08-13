document.addEventListener('DOMContentLoaded', () => {
  /* Scroll reveal animation */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

  document.querySelectorAll('.reveal').forEach(el => {
    revealObserver.observe(el);
  });

  /* FV スライドショー処理 */
  const scenes = document.querySelectorAll('.fv-scene');
  const dots = document.querySelectorAll('.fv-dot');
  const total = scenes.length;
  let current = 0;
  let autoTimer = null;

  function goToScene(idx) {
    if (idx === current) return;
    current = idx;

    scenes.forEach((s, i) => s.classList.toggle('active', i === idx));
    dots.forEach((d, i) => d.classList.toggle('active', i === idx));
  }

  // ドットクリック時
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      clearTimeout(autoTimer);
      goToScene(+dot.dataset.target);
      startAuto(5000);
    });
  });

  // 自動スライド
  function startAuto(delay = 4500) {
    clearTimeout(autoTimer);
    autoTimer = setTimeout(function tick() {
      goToScene((current + 1) % total);
      autoTimer = setTimeout(tick, 4500);
    }, delay);
  }
  startAuto(5000);

  /* Lightbox Logic */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const galleryItems = document.querySelectorAll('.gallery-item img');

  if (lightbox && lightboxImg) {
    galleryItems.forEach(img => {
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', (e) => {
        e.stopPropagation();
        lightbox.style.display = 'block';
        lightboxImg.src = img.src;
        document.body.style.overflow = 'hidden'; // Prevent scrolling
      });
    });

    lightbox.addEventListener('click', () => {
      lightbox.style.display = 'none';
      document.body.style.overflow = 'auto'; // Restore scrolling
    });
  }

  /* Voice Read More Logic */
  const voiceTexts = document.querySelectorAll('.voice-text');
  voiceTexts.forEach(text => {
    // Temporarily clamp to check if it exceeds 3 lines
    text.classList.add('is-clamped');
    
    // Use a small delay or ensure layout is ready
    if (text.scrollHeight > text.clientHeight) {
      const btn = document.createElement('div');
      btn.className = 'voice-more-btn';
      btn.textContent = '続きを読む';
      text.after(btn);

      btn.addEventListener('click', () => {
        text.classList.toggle('is-clamped');
        btn.textContent = text.classList.contains('is-clamped') ? '続きを読む' : '閉じる';
      });
    } else {
      // If it doesn't exceed 3 lines, remove clamping
      text.classList.remove('is-clamped');
    }
  });

  /* Page Top Logic */
  const pageTop = document.getElementById('pageTop');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      pageTop.classList.add('visible');
    } else {
      pageTop.classList.remove('visible');
    }
  });

  pageTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  /* SP CTA Trigger Logic */
  const targetSection = document.querySelector('.target');
  const spCta = document.querySelector('.sp-cta');
  const footer = document.querySelector('footer');

  if (targetSection && spCta && footer) {
    window.addEventListener('scroll', () => {
      const targetRect = targetSection.getBoundingClientRect();
      const footerRect = footer.getBoundingClientRect();

      const isPastTarget = targetRect.top < window.innerHeight;
      const isReachedFooter = footerRect.top < window.innerHeight;

      // "こんな方におすすめです" 以降かつ、フッターに到達していない場合に表示
      if (isPastTarget && !isReachedFooter) {
        spCta.classList.add('is-visible');
      } else {
        spCta.classList.remove('is-visible');
      }
    });
  }

  /* Hamburger Menu Logic */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  const links = document.querySelectorAll('.nav-links a');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
      document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
    });

    links.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = 'auto';
      });
    });
  }
});
