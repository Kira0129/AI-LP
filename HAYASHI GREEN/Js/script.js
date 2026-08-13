/* Slideshow */
const slides = document.querySelectorAll('.slide');
const cdots = document.querySelectorAll('.cdot');
const curNum = document.getElementById('curNum');
let cur = 0, timer;

function goTo(n) {
  if (!slides.length) return;
  slides[cur].classList.remove('active');
  cdots[cur].classList.remove('active');
  cur = (n + slides.length) % slides.length;

  const bg = slides[cur].querySelector('.slide-bg');
  if (bg) {
    bg.style.animation = 'none';
    void bg.offsetWidth;
    bg.style.animation = '';
  }

  slides[cur].classList.add('active');
  cdots[cur].classList.add('active');
  if (curNum) curNum.textContent = cur + 1;

  clearInterval(timer);
  timer = setInterval(() => goTo(cur + 1), 7000);
}

if (slides.length) {
  timer = setInterval(() => goTo(cur + 1), 7000);
}

/* SP Drawer */
const spHamburger = document.getElementById('spHamburger');
const spDrawer = document.getElementById('spDrawer');
const spDrawerClose = document.getElementById('spDrawerClose');
const spDrawerOverlay = document.getElementById('spDrawerOverlay');

function openDrawer() {
  if (spDrawer && spHamburger) {
    spDrawer.classList.add('open');
    spHamburger.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeDrawer() {
  if (spDrawer && spHamburger) {
    spDrawer.classList.remove('open');
    spHamburger.classList.remove('open');
    document.body.style.overflow = '';
  }
}

if (spHamburger) spHamburger.addEventListener('click', openDrawer);
if (spDrawerClose) spDrawerClose.addEventListener('click', closeDrawer);
if (spDrawerOverlay) spDrawerOverlay.addEventListener('click', closeDrawer);

/* Trigger Display for SP Bottom CTA and Back to Top Button */
const spBottomCta = document.getElementById('spBottomCta');
const backToTopBtn = document.getElementById('backToTop');
const troubleEl = document.querySelector('.trouble');

const ctaObs = new IntersectionObserver(
  ([e]) => {
    const shouldShow = e.isIntersecting || e.boundingClientRect.top < 0;

    if (spBottomCta) {
      if (shouldShow) spBottomCta.classList.add('visible');
      else spBottomCta.classList.remove('visible');
    }

    if (backToTopBtn) {
      if (shouldShow) backToTopBtn.classList.add('visible');
      else backToTopBtn.classList.remove('visible');
    }
  },
  { threshold: 0 }
);
if (troubleEl) ctaObs.observe(troubleEl);

/* Header Scroll */
const header = document.getElementById('siteHeader');
window.addEventListener('scroll', () => {
  if (header) {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
}, { passive: true });

/* Back to Top Click Action */
if (backToTopBtn) {
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* Scroll Reveal Observer */
const revealCallback = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('reveal-active');
      observer.unobserve(entry.target);
    }
  });
};

const revealObserver = new IntersectionObserver(revealCallback, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

document.querySelectorAll('.reveal').forEach(el => {
  revealObserver.observe(el);
});

/* Image Modal */
const imageModal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImg');

function openModal(src) {
  if (imageModal && modalImg) {
    imageModal.style.display = 'flex';
    void imageModal.offsetWidth; // force reflow
    imageModal.classList.add('show');
    modalImg.src = src;
    document.body.style.overflow = 'hidden';
  }
}

function closeModal() {
  if (imageModal) {
    imageModal.classList.remove('show');
    setTimeout(() => {
      imageModal.style.display = 'none';
    }, 300);
    document.body.style.overflow = '';
  }
}

// click outside to close
window.addEventListener('click', function (event) {
  if (event.target === imageModal) {
    closeModal();
  }
});

/* Disable Right Click */
document.addEventListener('contextmenu', (e) => e.preventDefault());
