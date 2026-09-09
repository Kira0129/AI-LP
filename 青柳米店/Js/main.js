// ========== PREVENT IMAGE SAVE ==========
document.addEventListener('contextmenu', function(e) {
  if (e.target.tagName === 'IMG' || e.target.classList.contains('fv-bg')) {
    e.preventDefault();
  }
});

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

// ========== LIGHTBOX MODAL ==========
const zoomableImgs = document.querySelectorAll('.comic-img, .loop-slider-track img, .staff-img');
const lightboxModal = document.getElementById('lightbox-modal');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.querySelector('.lightbox-close');

if (lightboxModal && lightboxImg) {
  zoomableImgs.forEach(img => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightboxModal.classList.add('active');
      document.body.style.overflow = 'hidden'; // 背景スクロール防止
    });
  });

  const closeLightbox = () => {
    lightboxModal.classList.remove('active');
    document.body.style.overflow = '';
  };

  lightboxClose.addEventListener('click', closeLightbox);
  lightboxModal.addEventListener('click', (e) => {
    // モーダルの背景部分をクリックした時も閉じる
    if (e.target === lightboxModal) {
      closeLightbox();
    }
  });
}

// ========== RETURN TO TOP ==========
const returnToTop = document.getElementById('return-to-top');
if (returnToTop) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      returnToTop.classList.add('visible');
    } else {
      returnToTop.classList.remove('visible');
    }
  });

  returnToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ========== STAFF SLIDER ==========
const staffImgs = document.querySelectorAll('#staff-slider .staff-img');
const staffPrev = document.getElementById('staff-prev');
const staffNext = document.getElementById('staff-next');

if (staffImgs.length > 0 && staffPrev && staffNext) {
  let currentStaffSlide = 0;

  function showStaffSlide(index) {
    staffImgs.forEach((img, i) => {
      if (i === index) {
        img.classList.add('active');
      } else {
        img.classList.remove('active');
      }
    });
  }

  staffPrev.addEventListener('click', () => {
    currentStaffSlide = (currentStaffSlide - 1 + staffImgs.length) % staffImgs.length;
    showStaffSlide(currentStaffSlide);
  });

  staffNext.addEventListener('click', () => {
    currentStaffSlide = (currentStaffSlide + 1) % staffImgs.length;
    showStaffSlide(currentStaffSlide);
  });
}
