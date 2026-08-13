// ========== HAMBURGER MENU ==========
const hamburger = document.getElementById('hamburger-btn');
const fullscreenMenu = document.getElementById('fullscreen-menu');
const menuClose = document.getElementById('menu-close-btn');
const menuLinks = document.querySelectorAll('.menu-link');

function openMenu() {
  fullscreenMenu.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeMenu() {
  fullscreenMenu.classList.remove('open');
  document.body.style.overflow = '';
}
hamburger.addEventListener('click', openMenu);
menuClose.addEventListener('click', closeMenu);
menuLinks.forEach(link => link.addEventListener('click', closeMenu));

// ========== SCROLL ANIMATION ==========
const fadeEls = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
fadeEls.forEach(el => observer.observe(el));

// ========== BACK TO TOP ==========
const backToTop = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
});
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ========== FV SLIDER (背景画像切り替え) ==========
(function() {
  const container = document.getElementById('fv-slides-container');
  if (!container) return;

  // HTML上のimgタグから画像のソースを取得
  const imgs = container.querySelectorAll('img');
  if (imgs.length === 0) return;

  const layers = [];

  imgs.forEach((img, i) => {
    const src = img.getAttribute('src');
    const div = document.createElement('div');
    div.className = 'fv-bg';
    div.style.backgroundImage = `url('${src}')`;
    div.style.opacity = i === 0 ? '1' : '0';
    div.style.zIndex = imgs.length - i;
    container.appendChild(div);
    layers.push(div);
    
    // 元のimg要素は非表示にする
    img.style.display = 'none';
  });

  layers[0].classList.add('zoom-active');
  let current = 0;

  function next() {
    const prevIdx = current;
    current = (current + 1) % layers.length;

    const prevLayer = layers[prevIdx];
    const nextLayer = layers[current];

    nextLayer.classList.remove('zoom-active');
    void nextLayer.offsetWidth; // reflow
    nextLayer.classList.add('zoom-active');

    prevLayer.style.zIndex = '1';
    nextLayer.style.zIndex = '2';

    nextLayer.style.transition = 'opacity 2.5s ease-in-out';
    nextLayer.style.opacity = '1';

    setTimeout(() => {
      prevLayer.style.transition = 'none';
      prevLayer.style.opacity = '0';
      prevLayer.classList.remove('zoom-active');
    }, 2600);
  }

  if (layers.length > 1) {
    setInterval(next, 6000);
  }
})();

// ========== FLOATING CTA CONTROL (SPのみ、ABOUTセクション到達で表示) ==========
(function() {
  const floatingCta = document.getElementById('floating-cta');
  const aboutSection = document.getElementById('about');
  if (!floatingCta || !aboutSection) return;

  function toggleFloatingCta() {
    // PC表示の時はスクロール監視をスキップ（CSSで非表示）
    if (window.innerWidth >= 768) {
      floatingCta.classList.remove('visible');
      return;
    }

    const aboutRect = aboutSection.getBoundingClientRect();
    // ABOUTセクションの上端が画面内に入ったら表示する
    if (aboutRect.top <= window.innerHeight) {
      floatingCta.classList.add('visible');
    } else {
      floatingCta.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', toggleFloatingCta);
  window.addEventListener('resize', toggleFloatingCta);
  toggleFloatingCta(); // 初期実行
})();

// ========== 禁止処理 (右クリック・画像ドラッグ禁止) ==========
(function() {
  // 右クリック（コンテキストメニュー）を禁止
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });

  // 画像のドラッグ＆ドロップによる保存を禁止
  document.addEventListener('dragstart', (e) => {
    if (e.target.tagName === 'IMG') {
      e.preventDefault();
    }
  });
})();
