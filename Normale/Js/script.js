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

// ========== FV SLIDER ==========
(function() {
  const container = document.getElementById('fv-slides-container');
  if (!container) return;

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
    void nextLayer.offsetWidth;
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

// ========== FLOATING CTA CONTROL ==========
(function() {
  const floatingCta = document.getElementById('floating-cta');
  const aboutSection = document.getElementById('about');
  if (!floatingCta || !aboutSection) return;

  function toggleFloatingCta() {
    if (window.innerWidth >= 768) {
      floatingCta.classList.remove('visible');
      return;
    }

    const aboutRect = aboutSection.getBoundingClientRect();
    if (aboutRect.top <= window.innerHeight) {
      floatingCta.classList.add('visible');
    } else {
      floatingCta.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', toggleFloatingCta);
  window.addEventListener('resize', toggleFloatingCta);
  toggleFloatingCta();
})();

// ========== IMAGE MODAL (LightBox) ==========
(function() {
  const modal = document.getElementById('image-modal');
  const modalImg = document.getElementById('modal-img');
  const modalBg = document.getElementById('modal-bg');
  const modalClose = document.getElementById('modal-close-btn');
  const sliderImgs = document.querySelectorAll('.menu-slider img');

  if (!modal) return;

  function openModal(src) {
    modalImg.src = src;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // 背景のスクロールを止める
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  sliderImgs.forEach(img => {
    img.addEventListener('click', () => {
      openModal(img.src);
    });
  });

  // 背景か×ボタンをクリックで閉じる
  modalBg.addEventListener('click', closeModal);
  modalClose.addEventListener('click', closeModal);
})();

// ========== 右クリック・画像ドラッグ禁止 ==========
(function() {
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });
  document.addEventListener('dragstart', (e) => {
    if (e.target.tagName === 'IMG') {
      e.preventDefault();
    }
  });
})();
