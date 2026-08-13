// Header Scroll Effect & SP Fixed CTA visibility
const header = document.getElementById('site-header');
const fixedCta = document.getElementById('sp-fixed-cta');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  header.classList.toggle('scrolled', scrollY > 50);

  // Show fixed CTA after scrolling past FV (only applies to SP via CSS hiding on PC)
  if (fixedCta) {
    if (scrollY > window.innerHeight * 0.8) {
      fixedCta.classList.add('is-visible');
    } else {
      fixedCta.classList.remove('is-visible');
    }
  }
}, { passive: true });

// Hamburger Menu Logic
const hamburgerBtn = document.getElementById('hamburger-btn');
const spMenu = document.getElementById('sp-menu');
const menuLinks = spMenu.querySelectorAll('nav a');
let menuOpen = false;

function toggleMenu() {
  menuOpen = !menuOpen;
  if (menuOpen) {
    hamburgerBtn.classList.add('is-active');
    spMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
  } else {
    hamburgerBtn.classList.remove('is-active');
    spMenu.classList.remove('open');
    document.body.style.overflow = '';
  }
}

hamburgerBtn.addEventListener('click', toggleMenu);

const spMenuCloseBtn = document.getElementById('sp-menu-close-btn');
if (spMenuCloseBtn) {
  spMenuCloseBtn.addEventListener('click', () => {
    if (menuOpen) toggleMenu();
  });
}

menuLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (menuOpen) toggleMenu();
  });
});

// Swiper Initialization for Voice Section
new Swiper('.voice-slider', {
  slidesPerView: 1.1,
  spaceBetween: 20,
  loop: false,
  breakpoints: {
    768: {
      slidesPerView: 2.2,
      spaceBetween: 32
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 40
    }
  }
});

// Scroll Reveal Intersection Observer
const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

revealElements.forEach(el => revealObserver.observe(el));

// Page Top Button Logic
const pageTopBtn = document.getElementById('page-top');
if (pageTopBtn) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      pageTopBtn.classList.add('is-visible');
    } else {
      pageTopBtn.classList.remove('is-visible');
    }
  }, { passive: true });

  pageTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Prohibit right-click on the entire page
document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

document.addEventListener('dragstart', (e) => {
  if (e.target.tagName === 'IMG') {
    e.preventDefault();
  }
});

// JS Parallax for Safari/iOS
const parallaxBgs = document.querySelectorAll('.js-parallax-bg');
if (parallaxBgs.length > 0) {
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;

    parallaxBgs.forEach(bg => {
      const parent = bg.parentElement;
      const rect = parent.getBoundingClientRect();

      // Check if section is in viewport
      if (rect.top <= windowHeight && rect.bottom >= 0) {
        // Calculate scroll progress (0 to 1)
        const progress = (windowHeight - rect.top) / (windowHeight + rect.height);

        // Move background from 0% to 20% of its height
        // Because height is 140% and top is -20%, max movement is 40% to keep it covered.
        // We will move it from -10% to 10% of parent height.
        const yOffset = (progress - 0.5) * 20;

        bg.style.transform = `translateY(${yOffset}%)`;
      }
    });
  }, { passive: true });
}

// Image Modal Logic
const modalTriggers = document.querySelectorAll('.js-modal-trigger');
const imageModal = document.getElementById('image-modal');
const imageModalImg = document.getElementById('image-modal-img');
const modalCloses = document.querySelectorAll('.js-modal-close');

if (imageModal && imageModalImg) {
  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      imageModalImg.src = trigger.src;
      imageModal.classList.add('is-open');
      imageModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  });

  modalCloses.forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
      imageModal.classList.remove('is-open');
      imageModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      
      setTimeout(() => {
        if (!imageModal.classList.contains('is-open')) {
          imageModalImg.src = '';
        }
      }, 300);
    });
  });
}
