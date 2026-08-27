// Header & Back to Top Scroll Effect
const header = document.getElementById('header');
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }

  if (backToTop) {
    if (window.scrollY > 300) {
      backToTop.classList.remove('opacity-0', 'invisible');
      backToTop.classList.add('opacity-100', 'visible');
    } else {
      backToTop.classList.remove('opacity-100', 'visible');
      backToTop.classList.add('opacity-0', 'invisible');
    }
  }
});

if (backToTop) {
  backToTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

function toggleMenu() {
  hamburger.classList.toggle('active');
  if (mobileMenu.classList.contains('invisible')) {
    mobileMenu.classList.remove('invisible', 'opacity-0');
    mobileMenu.classList.add('visible', 'opacity-100');
    document.body.style.overflow = 'hidden';
  } else {
    mobileMenu.classList.add('invisible', 'opacity-0');
    mobileMenu.classList.remove('visible', 'opacity-100');
    document.body.style.overflow = '';
  }
}

hamburger.addEventListener('click', toggleMenu);

mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (!mobileMenu.classList.contains('invisible')) {
      toggleMenu();
    }
  });
});

// FAQ Toggle
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
  const question = item.querySelector('.faq-question');
  question.addEventListener('click', () => {
    const isActive = item.classList.contains('active');
    
    // Close all other items
    faqItems.forEach(otherItem => {
      otherItem.classList.remove('active');
    });

    // Toggle current item
    if (!isActive) {
      item.classList.add('active');
    }
  });
});

// Scroll Animation
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(element => {
  observer.observe(element);
});
