// ハンバーガーメニュー
const hamburgerBtn = document.getElementById('hamburger-btn');
const header = document.getElementById('header');

hamburgerBtn.addEventListener('click', () => {
  header.classList.toggle('nav-open');
});

document.querySelectorAll('.header-nav a').forEach(link => {
  link.addEventListener('click', () => {
    header.classList.remove('nav-open');
  });
});

// スムーススクロール
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const headerOffset = target.id === 'top' ? 0 : 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition > 0 ? offsetPosition : 0,
        behavior: "smooth"
      });
    }
  });
});

// フェードインアニメーション
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// 画像モーダル
const modal = document.getElementById("image-modal");
const modalImg = document.getElementById("modal-img");
const modalClose = document.querySelector(".modal-close");

if (modal && modalImg && modalClose) {
  document.querySelectorAll('.work-gallery img').forEach(img => {
    img.addEventListener('click', function() {
      modal.style.display = "block";
      modalImg.src = this.src;
    });
  });

  modalClose.addEventListener('click', () => {
    modal.style.display = "none";
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
}

// TOPへ戻るボタンの表示・非表示
const pageTopBtn = document.getElementById('page-top');
if (pageTopBtn) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      pageTopBtn.classList.add('show');
    } else {
      pageTopBtn.classList.remove('show');
    }
  });
}
