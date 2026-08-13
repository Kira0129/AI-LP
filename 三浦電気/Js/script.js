// Fade in animation using IntersectionObserver
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
  observer.observe(el);
});

// Hamburger menu logic
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');
const navLinks = document.querySelectorAll('#nav a');

if (hamburger && nav) {
  const toggleMenu = () => {
    hamburger.classList.toggle('active');
    nav.classList.toggle('active');
    document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
  };

  hamburger.addEventListener('click', toggleMenu);

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      nav.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

// Page Top Button & Sticky CTA logic
const pageTopBtn = document.getElementById('page-top');
const troubleSection = document.getElementById('trouble');
const stickyCta = document.querySelector('.sticky-cta');

window.addEventListener('scroll', () => {
  if (pageTopBtn) {
    if (window.scrollY > 300) {
      pageTopBtn.classList.add('is-visible');
    } else {
      pageTopBtn.classList.remove('is-visible');
    }
  }

  if (troubleSection && stickyCta) {
    const troubleTop = troubleSection.getBoundingClientRect().top + window.scrollY;
    const contactBanner = document.querySelector('.contact-banner');
    let hidePoint = Infinity;
    if (contactBanner) {
      // Hide when contact banner comes into view
      hidePoint = contactBanner.getBoundingClientRect().top + window.scrollY - window.innerHeight + 50;
    }

    if (window.scrollY > troubleTop - window.innerHeight / 2 && window.scrollY < hidePoint) {
      stickyCta.classList.add('is-active');
    } else {
      stickyCta.classList.remove('is-active');
    }
  }
});

if (pageTopBtn) {
  pageTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
