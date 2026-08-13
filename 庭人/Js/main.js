document.addEventListener('DOMContentLoaded', () => {
  // スムーススクロール
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        window.scrollTo({
          top: targetElement.offsetTop - 70, // ヘッダーの高さを考慮
          behavior: 'smooth'
        });
      }
    });
  });

  // ヘッダーのスクロール時の影
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.style.boxShadow = '0 2px 15px rgba(0,0,0,0.05)';
    } else {
      header.style.boxShadow = 'none';
    }
  });

  // ハンバーガーメニュー
  const menuToggle = document.getElementById('menuToggle');
  const headerNav = document.getElementById('headerNav');

  if (menuToggle && headerNav) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      headerNav.classList.toggle('active');
    });

    headerNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        headerNav.classList.remove('active');
      });
    });
  }

  // AOS アニメーション初期化
  AOS.init({
    duration: 1000,
    once: true,
    offset: 80,
  });

  // 画像の右クリック禁止等の簡易保護
  document.addEventListener('contextmenu', e => {
    if (e.target.tagName === 'IMG') e.preventDefault();
  });
  document.addEventListener('dragstart', e => {
    if (e.target.tagName === 'IMG') e.preventDefault();
  });

  // 料金画像のモーダル（拡大表示）
  const modal = document.getElementById("imageModal");
  const img = document.getElementById("priceImage");
  const modalImg = document.getElementById("modalImg");
  const closeBtn = document.querySelector(".modal-close");

  if (img && modal) {
    img.addEventListener("click", function() {
      modal.classList.add("show");
      modalImg.src = this.src;
    });

    closeBtn.addEventListener("click", function() {
      modal.classList.remove("show");
    });

    // モーダルの背景クリックで閉じる
    modal.addEventListener("click", function(e) {
      if (e.target !== modalImg) {
        modal.classList.remove("show");
      }
    });
  }

  // TOPへ戻るボタン
  const backToTopBtn = document.getElementById("backToTop");
  if (backToTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add("show");
      } else {
        backToTopBtn.classList.remove("show");
      }
    });

    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }
});
