// Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');
const header = document.getElementById('header');

function toggleMenu() {
  hamburger.classList.toggle('nav-open');
  if (mobileMenu.classList.contains('translate-x-full')) {
    mobileMenu.classList.remove('translate-x-full');
    document.body.style.overflow = 'hidden';
  } else {
    mobileMenu.classList.add('translate-x-full');
    document.body.style.overflow = '';
  }
}

hamburger.addEventListener('click', toggleMenu);

mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (hamburger.classList.contains('nav-open')) {
      toggleMenu();
    }
  });
});

// Header scroll effect
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('py-2');
    header.classList.remove('py-4');
  } else {
    header.classList.add('py-4');
    header.classList.remove('py-2');
  }
});

// Reveal Animation on Scroll
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  root: null,
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
});

revealElements.forEach(el => {
  revealObserver.observe(el);
});

// Image Modal
const modal = document.getElementById('image-modal');
const modalImage = document.getElementById('modal-image');
const closeModalBtn = document.getElementById('close-modal');

window.openModal = function(src) {
  modalImage.src = src;
  modal.classList.remove('hidden');
  // Trigger reflow
  void modal.offsetWidth;
  modal.classList.remove('opacity-0');
  modalImage.classList.remove('scale-95');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.add('opacity-0');
  modalImage.classList.add('scale-95');
  setTimeout(() => {
    modal.classList.add('hidden');
    modalImage.src = '';
    if (!hamburger.classList.contains('nav-open')) {
      document.body.style.overflow = '';
    }
  }, 300);
}

closeModalBtn.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

// Back to Top Button
const backToTopBtn = document.getElementById('back-to-top');

if (backToTopBtn) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
      backToTopBtn.classList.add('opacity-100');
    } else {
      backToTopBtn.classList.add('opacity-0', 'pointer-events-none');
      backToTopBtn.classList.remove('opacity-100');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Disable right-click globally
document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

document.addEventListener('dragstart', (e) => {
  if (e.target.tagName === 'IMG') {
    e.preventDefault();
  }
});
