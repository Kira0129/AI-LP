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
        observer.unobserve(entry.target); // 一度発火したら監視をやめる
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

  // メニューアイコンのアニメーション用クラス切り替え処理
  const toggleMenu = () => {
    const isOpen = mobileMenu.classList.contains('open');
    const spans = menuBtn.querySelectorAll('span');

    if (isOpen) {
      // 閉じる
      mobileMenu.classList.remove('open');
      document.body.style.overflow = ''; // スクロール復帰
      
      spans[0].style.transform = 'translateY(0) rotate(0)';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'translateY(0) rotate(0)';
    } else {
      // 開く
      mobileMenu.classList.add('open');
      document.body.style.overflow = 'hidden'; // 背景スクロール禁止
      
      spans[0].style.transform = 'translateY(8px) rotate(45deg)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'translateY(-8px) rotate(-45deg)';
    }
  };

  menuBtn.addEventListener('click', toggleMenu);

  // モバイルメニューのリンクをクリックしたらメニューを閉じる
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileMenu.classList.contains('open')) {
        toggleMenu();
      }
    });
  });

  // 3. ヘッダーのスクロール時の影と背景調整 & TOPへ戻るボタンの表示切替
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('shadow-md');
      header.classList.replace('bg-white/95', 'bg-white');
    } else {
      header.classList.remove('shadow-md');
      header.classList.replace('bg-white', 'bg-white/95');
    }

    // TOPへ戻るボタン
    if (scrollTopBtn) {
      if (window.scrollY > 300) {
        scrollTopBtn.classList.remove('opacity-0', 'invisible');
        scrollTopBtn.classList.add('opacity-100', 'visible');
      } else {
        scrollTopBtn.classList.remove('opacity-100', 'visible');
        scrollTopBtn.classList.add('opacity-0', 'invisible');
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

  // スムーススクロール (アンカーリンク)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if(targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        // ヘッダーの高さを考慮してスクロール
        const headerHeight = header.offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});
