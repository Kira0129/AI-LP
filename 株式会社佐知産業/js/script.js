// 右クリック禁止
document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

// Back to Top & Sticky CTA logic
const backToTop = document.getElementById('backToTop');
const stickyCta = document.querySelector('.sp-sticky-cta');
const aboutSection = document.getElementById('about');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTop.classList.add('show');
  } else {
    backToTop.classList.remove('show');
  }

  if (aboutSection) {
    const aboutTop = aboutSection.offsetTop - 100;
    if (window.scrollY >= aboutTop) {
      stickyCta.classList.add('show');
    } else {
      stickyCta.classList.remove('show');
    }
  }
});

if (backToTop) {
  backToTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Hamburger Menu logic
const hamburgerBtn = document.getElementById('hamburgerBtn');
const spNav = document.getElementById('spNav');
const navOverlay = document.getElementById('navOverlay');
const spNavClose = document.getElementById('spNavClose');
const spNavLinks = document.querySelectorAll('.sp-nav-list a');

const toggleMenu = () => {
  if (hamburgerBtn) hamburgerBtn.classList.toggle('is-active');
  if (spNav) spNav.classList.toggle('is-active');
  if (navOverlay) navOverlay.classList.toggle('is-active');
  document.body.classList.toggle('overflow-hidden');
};

if (hamburgerBtn) hamburgerBtn.addEventListener('click', toggleMenu);
if (navOverlay) navOverlay.addEventListener('click', toggleMenu);
if (spNavClose) spNavClose.addEventListener('click', toggleMenu);

spNavLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (spNav && spNav.classList.contains('is-active')) {
      toggleMenu();
    }
  });
});

// Slider Logic
const sliderWrapper = document.getElementById('recruitSlider');
const slides = document.querySelectorAll('.recruit-slide');
const prevBtn = document.getElementById('sliderPrev');
const nextBtn = document.getElementById('sliderNext');
const dotsContainer = document.getElementById('sliderDots');

if(sliderWrapper && slides.length > 0) {
  let currentIndex = 0;
  const totalSlides = slides.length;
  let slideInterval;

  // Create dots
  slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('slider-dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });
  const dots = document.querySelectorAll('.slider-dot');

  const updateSlider = () => {
    sliderWrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentIndex].classList.add('active');
  };

  const nextSlide = () => {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlider();
  };

  const prevSlide = () => {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateSlider();
  };

  const goToSlide = (index) => {
    currentIndex = index;
    updateSlider();
    resetInterval();
  };

  if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetInterval(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetInterval(); });

  const startInterval = () => { slideInterval = setInterval(nextSlide, 4000); };
  const resetInterval = () => { clearInterval(slideInterval); startInterval(); };

  startInterval();
}

// Scroll Animation (Intersection Observer)
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target); 
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px' 
});

revealElements.forEach(el => revealObserver.observe(el));
