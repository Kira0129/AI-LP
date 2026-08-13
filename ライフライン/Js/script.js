document.addEventListener('contextmenu', e => e.preventDefault());

document.addEventListener('DOMContentLoaded', () => {
  // Hamburger Menu
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const spNav = document.getElementById('spNav');
  const navOverlay = document.getElementById('navOverlay');
  const spNavCloseBtn = document.getElementById('spNavCloseBtn');

  const toggleMenu = () => {
    hamburgerBtn.classList.toggle('is-active');
    spNav.classList.toggle('is-active');
    navOverlay.classList.toggle('is-active');
    document.body.classList.toggle('overflow-hidden');
  };

  if(hamburgerBtn) hamburgerBtn.addEventListener('click', toggleMenu);
  if(navOverlay) navOverlay.addEventListener('click', toggleMenu);
  if(spNavCloseBtn) spNavCloseBtn.addEventListener('click', toggleMenu);
  
  document.querySelectorAll('.sp-nav-list a').forEach(link => {
    link.addEventListener('click', toggleMenu);
  });

  // Scroll Animation (Reveal)
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  revealElements.forEach(el => revealObserver.observe(el));

  // Page Top Button
  const pageTopBtn = document.getElementById('page-top');
  if (pageTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        pageTopBtn.classList.add('is-show');
      } else {
        pageTopBtn.classList.remove('is-show');
      }
    });

    pageTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Image Modal
  const imageModal = document.getElementById('imageModal');
  const imageModalImg = document.getElementById('imageModalImg');
  const imageModalClose = document.querySelector('.image-modal-close');
  const workImages = document.querySelectorAll('.work-img-box-new img');

  if (imageModal && imageModalImg) {
    workImages.forEach(img => {
      img.addEventListener('click', function() {
        imageModal.classList.add('is-active');
        imageModalImg.src = this.src;
      });
    });

    const closeModal = () => {
      imageModal.classList.remove('is-active');
    };

    if (imageModalClose) imageModalClose.addEventListener('click', closeModal);
    imageModal.addEventListener('click', (e) => {
      if (e.target === imageModal) {
        closeModal();
      }
    });
  }
});
