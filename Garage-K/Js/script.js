document.addEventListener('DOMContentLoaded', () => {
  // 1. スクロールアニメーション (Intersection Observer)
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-up, .fade-down, .fade-left, .fade-right, .zoom-in').forEach(el => {
    observer.observe(el);
  });

  // 2. モバイルメニューの開閉トグル
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');
  const header = document.getElementById('header');

  const toggleMenu = () => {
    const isOpen = mobileMenu.classList.contains('open');
    const spans = menuBtn.querySelectorAll('span');

    if (isOpen) {
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
      spans[0].style.transform = 'translateY(0) rotate(0)';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'translateY(0) rotate(0)';
    } else {
      mobileMenu.classList.add('open');
      document.body.style.overflow = 'hidden';
      spans[0].style.transform = 'translateY(8px) rotate(45deg)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'translateY(-8px) rotate(-45deg)';
    }
  };

  menuBtn.addEventListener('click', toggleMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileMenu.classList.contains('open')) {
        toggleMenu();
      }
    });
  });

  // 3. ヘッダーのスクロール時の影と背景調整 & TOPへ戻るボタン & 追従CTA
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  const mobileCta = document.getElementById('mobile-cta');
  const troublesSection = document.getElementById('troubles');

  window.addEventListener('scroll', () => {
    // ヘッダー制御
    if (window.scrollY > 50) {
      header.classList.add('shadow-md');
      header.classList.replace('bg-white/95', 'bg-white');
    } else {
      header.classList.remove('shadow-md');
      header.classList.replace('bg-white', 'bg-white/95');
    }

    // TOPへ戻るボタン制御
    if (scrollTopBtn) {
      if (window.scrollY > 300) {
        scrollTopBtn.classList.remove('opacity-0', 'invisible');
        scrollTopBtn.classList.add('opacity-100', 'visible');
      } else {
        scrollTopBtn.classList.remove('opacity-100', 'visible');
        scrollTopBtn.classList.add('opacity-0', 'invisible');
      }
    }

    // SP用 追従CTA制御 (お悩みセクション到達時に表示)
    if (mobileCta && troublesSection) {
      if (troublesSection.getBoundingClientRect().top < window.innerHeight) {
        mobileCta.classList.remove('opacity-0', 'invisible', 'translate-y-full');
        mobileCta.classList.add('opacity-100', 'visible', 'translate-y-0');
      } else {
        mobileCta.classList.remove('opacity-100', 'visible', 'translate-y-0');
        mobileCta.classList.add('opacity-0', 'invisible', 'translate-y-full');
      }
    }
  });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // スムーススクロール
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        const headerHeight = header.offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Lightbox (画像拡大) 処理
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');
  const zoomableImages = document.querySelectorAll('.zoomable-image');

  zoomableImages.forEach(img => {
    img.addEventListener('click', () => {
      // UnsplashのURLパラメータを調整して高画質版を表示する
      const highResUrl = img.src.replace('w=400', 'w=1200');
      lightboxImg.src = highResUrl;
      lightbox.classList.remove('opacity-0', 'invisible');
      lightbox.classList.add('opacity-100', 'visible');
      document.body.style.overflow = 'hidden'; // 背景スクロール禁止
    });
  });

  const closeLightbox = () => {
    lightbox.classList.remove('opacity-100', 'visible');
    lightbox.classList.add('opacity-0', 'invisible');
    document.body.style.overflow = '';
  };

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    // 画像以外（背景）をクリックした場合に閉じる
    if (e.target === lightbox) {
      closeLightbox();
    }
  });
});
