// テキスト選択禁止 & 画像保存禁止（右クリック・ドラッグ＆ドロップ無効化）
document.addEventListener('selectstart', (e) => {
  e.preventDefault();
});
document.addEventListener('contextmenu', (e) => {
  if (e.target.tagName === 'IMG') {
    e.preventDefault();
  }
});
document.addEventListener('dragstart', (e) => {
  if (e.target.tagName === 'IMG') {
    e.preventDefault();
  }
});

// FV Slideshow
const fvSlides = document.querySelectorAll(".fv-slide");
if (fvSlides.length > 0) {
  let currentSlide = 0;
  setInterval(() => {
    fvSlides[currentSlide].classList.remove("active");
    currentSlide = (currentSlide + 1) % fvSlides.length;
    fvSlides[currentSlide].classList.add("active");
  }, 4000);
}

// Image Modal Logic
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImg");
const triggers = document.querySelectorAll(".modal-trigger");
const closeBtn = document.getElementById("modalClose");

triggers.forEach(img => {
  img.addEventListener('click', function() {
    modal.style.display = "block";
    modalImg.src = this.src;
  });
});
closeBtn.addEventListener('click', () => modal.style.display = "none");
window.addEventListener('click', (e) => { if (e.target == modal) modal.style.display = "none"; });

// Scroll Animation (Intersection Observer)
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

// Hamburger Menu Logic
const hamburgerBtn = document.getElementById('hamburgerBtn');
const spNav = document.getElementById('spNav');
const spNavClose = document.getElementById('spNavClose');
const navOverlay = document.getElementById('navOverlay');
const spNavLinks = document.querySelectorAll('.sp-nav-list a');

const toggleMenu = () => {
  hamburgerBtn.classList.toggle('is-active');
  spNav.classList.toggle('is-active');
  navOverlay.classList.toggle('is-active');
  document.body.classList.toggle('overflow-hidden');
};

if (hamburgerBtn) hamburgerBtn.addEventListener('click', toggleMenu);
if (spNavClose) spNavClose.addEventListener('click', toggleMenu);
if (navOverlay) navOverlay.addEventListener('click', toggleMenu);
spNavLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (spNav.classList.contains('is-active')) toggleMenu();
  });
});

// Back to Top & Floating CTA Scroll Logic
const backToTop = document.getElementById('backToTop');
const spStickyCta = document.querySelector('.sp-sticky-cta');
const problemsSec = document.getElementById('problems');

window.addEventListener('scroll', () => {
  // Back to Top
  if (window.scrollY > 300) {
    if (backToTop) backToTop.classList.add('show');
  } else {
    if (backToTop) backToTop.classList.remove('show');
  }

  // Floating CTA for Mobile (appears when problems section comes into view)
  if (problemsSec && spStickyCta) {
    const rect = problemsSec.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      spStickyCta.classList.add('show');
    } else {
      spStickyCta.classList.remove('show');
    }
  }
});

if (backToTop) {
  backToTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
