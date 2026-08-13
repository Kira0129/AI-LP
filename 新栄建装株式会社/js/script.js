document.addEventListener('DOMContentLoaded', () => {
  // Reveal Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Back to Top Button
  const totop = document.getElementById('totop');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      totop.classList.add('show');
    } else {
      totop.classList.remove('show');
    }
  });

  totop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Hamburger Menu
  const menuToggle = document.getElementById('menuToggle');
  const gnav = document.getElementById('gnav');
  const gnavLinks = document.querySelectorAll('#gnav a');

  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    gnav.classList.toggle('active');
    document.body.style.overflow = gnav.classList.contains('active') ? 'hidden' : '';
  });

  gnavLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      gnav.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // Price Slider (Marquee Style)
  new Swiper('.price-slider', {
    loop: true,
    speed: 8000,
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
      pauseOnMouseEnter: false, // Ensure it doesn't stop on hover
    },
    slidesPerView: 'auto',
    spaceBetween: 24,
    allowTouchMove: true,
  });

  // Simple Lightbox
  new SimpleLightbox('.gallery a', {
    /* options */
  });

  // Disable Right-Click
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });
});
