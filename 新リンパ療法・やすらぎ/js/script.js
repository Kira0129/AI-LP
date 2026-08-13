// FAQ toggle
function toggleFaq(el) {
  const item = el.closest('.faq-item');
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}

// Scroll reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('in-view'), i * 60);
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Lightbox
function openLightbox(el) {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const clickedImg = el.querySelector('img');
  
  lightboxImg.src = clickedImg.src;
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden'; // Prevent body scroll
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  lightbox.classList.remove('active');
  document.body.style.overflow = ''; // Restore body scroll
}

// Back to Top functionality
// Back to Top functionality
window.addEventListener('scroll', () => {
  const btt = document.getElementById('backToTop');
  if (btt) {
    if (window.scrollY > 400) {
      btt.classList.add('show');
    } else {
      btt.classList.remove('show');
    }
  }
});

// Mobile Menu Toggle
const hamburgerBtn = document.getElementById('hamburger-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (hamburgerBtn) {
  hamburgerBtn.addEventListener('click', () => {
    hamburgerBtn.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });
}

function closeMenu() {
  hamburgerBtn.classList.remove('open');
  mobileMenu.classList.remove('open');
  document.body.style.overflow = '';
}

// Disable context menu and image drag
document.addEventListener('contextmenu', e => e.preventDefault(), false);

document.addEventListener('dragstart', e => {
  if (e.target.tagName === 'IMG') {
    e.preventDefault();
  }
}, false);
