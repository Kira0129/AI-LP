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
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// ========== FV SLIDESHOW ==========
const slidesContainer = document.getElementById('fv-slides-container');
if (slidesContainer) {
  const images = slidesContainer.querySelectorAll('img');
  const bgDivs = [];
  
  images.forEach((img, index) => {
    const div = document.createElement('div');
    div.className = 'fv-bg';
    div.style.backgroundImage = `url(${img.src})`;
    // 最初の画像以外は不透明度を0にしておく
    div.style.opacity = index === 0 ? '1' : '0';
    div.style.transition = 'opacity 2s ease';
    slidesContainer.appendChild(div);
    bgDivs.push(div);
    img.style.display = 'none'; // 元の画像を隠す
  });

  if (bgDivs.length > 0) {
    let currentSlide = 0;
    bgDivs[currentSlide].classList.add('zoom-active');

    if (bgDivs.length > 1) {
      setInterval(() => {
        bgDivs[currentSlide].style.opacity = '0';
        setTimeout(() => {
          bgDivs[currentSlide].classList.remove('zoom-active');
        }, 2000); // fade outが終わったらzoomを外す

        currentSlide = (currentSlide + 1) % bgDivs.length;
        
        bgDivs[currentSlide].classList.add('zoom-active');
        bgDivs[currentSlide].style.opacity = '1';
      }, 6000); // 6秒ごとに切り替え
    }
  }
}
