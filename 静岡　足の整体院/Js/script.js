// Header scroll effect
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 10);
  if(window.scrollY > 10){
    header.style.padding = "4px 0";
  } else {
    header.style.padding = "0";
  }
});

// FAQ accordion
document.querySelectorAll('.faq-q').forEach(q => {
  q.addEventListener('click', () => {
    const item = q.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// Scroll animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// Sticky CTA visibility
const spCta = document.querySelector('.sp-cta');
const troublesSection = document.getElementById('troubles');

if (spCta && troublesSection) {
  window.addEventListener('scroll', () => {
    const rect = troublesSection.getBoundingClientRect();
    if (rect.top <= window.innerHeight) {
      spCta.classList.add('is-active');
    } else {
      spCta.classList.remove('is-active');
    }
  });
}

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const spMenu = document.getElementById('sp-menu');
const spNavLinks = document.querySelectorAll('.sp-nav-link');
const spMenuClose = document.getElementById('sp-menu-close');

if (hamburger && spMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('is-active');
    spMenu.classList.toggle('is-active');
  });

  if (spMenuClose) {
    spMenuClose.addEventListener('click', () => {
      hamburger.classList.remove('is-active');
      spMenu.classList.remove('is-active');
    });
  }

  spNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('is-active');
      spMenu.classList.remove('is-active');
    });
  });
}

// Page Top Button
const pageTopBtn = document.getElementById('page-top');

if (pageTopBtn) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      pageTopBtn.classList.add('is-visible');
    } else {
      pageTopBtn.classList.remove('is-visible');
    }
  });

  pageTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
