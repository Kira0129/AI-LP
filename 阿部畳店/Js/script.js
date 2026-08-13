document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Logic
  const spMenuToggle = document.querySelector('.sp-menu-toggle');
  const spMenuClose = document.querySelector('.sp-menu-close');
  const spMenu = document.querySelector('.sp-menu');
  const spNavLinks = document.querySelectorAll('.sp-nav-link');

  const openMenu = () => {
    spMenu.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    spMenu.classList.remove('is-active');
    document.body.style.overflow = '';
  };

  if (spMenuToggle) spMenuToggle.addEventListener('click', openMenu);
  if (spMenuClose) spMenuClose.addEventListener('click', closeMenu);

  spNavLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Scroll Header behavior
  const stickyHeader = () => {
    if (window.scrollY > 300) {
      document.body.classList.add('is-scrolled');
    } else {
      document.body.classList.remove('is-scrolled');
    }
  };

  window.addEventListener('scroll', stickyHeader);
  stickyHeader(); // Initial check

  // Animation Observer
  const revealItems = document.querySelectorAll('.service-card, .reason-card, .voice-card, .pricing-card, .worry-item, .section-header, .about-yaegaki, .message-inner, .reveal, .reveal-left, .reveal-right');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('is-active');
        // Handle direct child staggering if needed or just use the target
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
        e.target.style.translateX = '0';
        revealObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });

  revealItems.forEach((el, index) => {
    // Basic setup for fade-in elements if they haven't been styled in CSS
    if (!el.classList.contains('reveal') && !el.classList.contains('reveal-left') && !el.classList.contains('reveal-right')) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 1.2s cubic-bezier(0.22, 1, 0.36, 1), transform 1.2s cubic-bezier(0.22, 1, 0.36, 1)';
    }
    
    // Add staggered delay for grid items
    const parentGrid = el.parentElement;
    if (parentGrid && (parentGrid.classList.contains('services-grid') || parentGrid.classList.contains('worry-grid') || parentGrid.classList.contains('pricing-grid') || parentGrid.classList.contains('reasons-grid'))) {
      const gridItems = Array.from(parentGrid.children);
      const itemIndex = gridItems.indexOf(el);
      el.style.transitionDelay = `${itemIndex * 0.15}s`;
    }

    revealObserver.observe(el);
  });

});

// Lightbox logic
function openLightbox(src) {
  const lb = document.getElementById('lightbox');
  const img = document.getElementById('lightbox-img');
  if (lb && img) {
    img.src = src;
    lb.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const lb = document.getElementById('lightbox');
  if (lb) {
    lb.addEventListener('click', () => {
      lb.style.display = 'none';
      document.body.style.overflow = '';
    });
  }

  // Back to Top Logic
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        backToTop.classList.add('is-visible');
      } else {
        backToTop.classList.remove('is-visible');
      }
    });

    backToTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Content Protection (Disable Right Click)
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  }, false);
});



