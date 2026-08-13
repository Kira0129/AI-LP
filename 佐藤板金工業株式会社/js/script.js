// script.js
document.addEventListener('DOMContentLoaded', () => {
  console.log('佐藤板金工業株式会社 LP loaded.');

  // 右クリック禁止
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });

  // Modal logic for WORKS section
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('expandedImage');
  const closeBtn = document.querySelector('.modal-close');
  const instaItems = document.querySelectorAll('.insta-item');

  instaItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      modal.style.display = 'block';
      modalImg.src = img.src;
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    });
  });

  const closeModal = () => {
    modal.style.display = 'none';
    document.body.style.overflow = ''; // Restore scrolling
  };

  closeBtn.addEventListener('click', closeModal);

  // Close modal when clicking outside the image
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Back to Top & Sticky CTA logic
  const backToTop = document.getElementById('backToTop');
  const stickyCta = document.querySelector('.sp-sticky-cta');
  const aboutSection = document.getElementById('about');
  
  window.addEventListener('scroll', () => {
    // Back to top visibility
    if (window.scrollY > 300) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }

    // Sticky CTA visibility (Starts from ABOUT section)
    if (aboutSection) {
      const aboutTop = aboutSection.offsetTop - 100;
      if (window.scrollY >= aboutTop) {
        stickyCta.classList.add('show');
      } else {
        stickyCta.classList.remove('show');
      }
    }
  });

  backToTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Hamburger Menu logic
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const spNav = document.getElementById('spNav');
  const navOverlay = document.getElementById('navOverlay');
  const spNavLinks = document.querySelectorAll('.sp-nav-list a');

  const toggleMenu = () => {
    hamburgerBtn.classList.toggle('is-active');
    spNav.classList.toggle('is-active');
    navOverlay.classList.toggle('is-active');
    document.body.classList.toggle('overflow-hidden');
  };

  hamburgerBtn.addEventListener('click', toggleMenu);
  navOverlay.addEventListener('click', toggleMenu);

  spNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (spNav.classList.contains('is-active')) {
        toggleMenu();
      }
    });
  });

  // Scroll Animation (Intersection Observer)
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target); // Only animate once
      }
    });
  }, {
    threshold: 0.1, // Trigger when 10% of element is visible
    rootMargin: '0px 0px -50px 0px' // Slightly offset trigger point
  });

  revealElements.forEach(el => revealObserver.observe(el));
});
