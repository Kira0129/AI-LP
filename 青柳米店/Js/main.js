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

// ========== FLOATING CTA VISIBILITY ==========
const floatingCta = document.getElementById('floating-cta');
const fvSection = document.getElementById('fv');

window.addEventListener('scroll', () => {
  const threshold = fvSection ? fvSection.offsetHeight * 0.6 : 300;
  if (window.scrollY > threshold) {
    if (floatingCta) floatingCta.classList.add('visible');
  } else {
    if (floatingCta) floatingCta.classList.remove('visible');
  }
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
    div.style.opacity = index === 0 ? '1' : '0';
    div.style.transition = 'opacity 2s ease';
    slidesContainer.appendChild(div);
    bgDivs.push(div);
    img.style.display = 'none';
  });

  if (bgDivs.length > 0) {
    let currentSlide = 0;
    bgDivs[currentSlide].classList.add('zoom-active');

    if (bgDivs.length > 1) {
      setInterval(() => {
        bgDivs[currentSlide].style.opacity = '0';
        setTimeout(() => {
          bgDivs[currentSlide].classList.remove('zoom-active');
        }, 2000);

        currentSlide = (currentSlide + 1) % bgDivs.length;
        
        bgDivs[currentSlide].classList.add('zoom-active');
        bgDivs[currentSlide].style.opacity = '1';
      }, 6000); // 6秒ごとに切り替え
    }
  }
}
