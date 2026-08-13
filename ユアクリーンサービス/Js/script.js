document.addEventListener('DOMContentLoaded', () => {
  // 右クリック禁止解除 (一般的にLPではユーザービリティを下げるため解除推奨ですが、必要であれば残してください)
  // document.addEventListener('contextmenu', (e) => e.preventDefault());

  // Back to Top & Sticky CTA logic
  const backToTop = document.getElementById('backToTop');
  const stickyCta = document.querySelector('.sp-sticky-cta');
  const aboutSection = document.getElementById('about');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }

    if (aboutSection && stickyCta) {
      const aboutTop = aboutSection.offsetTop - 100;
      if (window.scrollY >= aboutTop) {
        stickyCta.classList.add('show');
      } else {
        stickyCta.classList.remove('show');
      }
    }
  });

  backToTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
      if (spNav.classList.contains('is-active')) toggleMenu();
    });
  });

  // Image Modal Logic
  const modal = document.getElementById('imageModal');
  const expandedImg = document.getElementById('expandedImg');
  const closeBtn = document.getElementById('modalCloseBtn');
  const clickableImgs = document.querySelectorAll('.clickable-img');

  clickableImgs.forEach(img => {
    img.addEventListener('click', function() {
      modal.style.display = 'block';
      // 拡大表示用に高解像度画像を読み込む (Unsplashのw=400パラメータを置換)
      expandedImg.src = this.src.replace('w=400', 'w=1000');
      document.body.classList.add('overflow-hidden');
    });
  });

  const closeImageModal = () => {
    modal.style.display = 'none';
    document.body.classList.remove('overflow-hidden');
  };

  if (closeBtn) closeBtn.addEventListener('click', closeImageModal);
  window.addEventListener('click', (e) => {
    if (e.target === modal) closeImageModal();
  });

  // Scroll Animation
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  revealElements.forEach(el => revealObserver.observe(el));

  // Price Simple Slider
  const priceSliderTrack = document.getElementById('priceSliderTrack');
  if (priceSliderTrack) {
    const slides = priceSliderTrack.querySelectorAll('.price-slide');
    const slideCount = slides.length;
    let currentSlide = 0;

    setInterval(() => {
      currentSlide = (currentSlide + 1) % slideCount;
      priceSliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    }, 3000); // 3秒ごとに切り替え
  }
});
