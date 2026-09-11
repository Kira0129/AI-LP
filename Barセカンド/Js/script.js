document.addEventListener('DOMContentLoaded', () => {
  // Disable right-click and drag on images
  document.addEventListener('contextmenu', (e) => {
    if (e.target.tagName === 'IMG') e.preventDefault();
  });
  document.addEventListener('dragstart', (e) => {
    if (e.target.tagName === 'IMG') e.preventDefault();
  });

  // Mobile Menu Toggle
  const nav = document.querySelector('nav');
  const menuBtn = document.querySelector('.menu-btn');
  const navLinks = document.querySelectorAll('.nav-links a');

  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      nav.classList.toggle('is-open');
      document.body.style.overflow = nav.classList.contains('is-open') ? 'hidden' : '';
    });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      document.body.style.overflow = '';
    });
  });

  // FV Animations
  const fvElements = {
    catch: document.getElementById('fv-catch'),
    sub: document.getElementById('fv-sub'),
    logo: document.getElementById('fv-logo'),
    readMore: document.getElementById('fv-read-more'),
    readMoreLine: document.querySelector('.fv-read-more-line'),
    gridItems: document.querySelectorAll('.fv-grid-item'),
    decoItems: document.querySelectorAll('.fv-deco')
  };

  const splitText = (element) => {
    if (!element) return;
    const text = element.textContent;
    element.textContent = '';
    [...text].forEach((char, index) => {
      const span = document.createElement('span');
      span.textContent = char;
      span.className = 'char';
      span.style.setProperty('--char-index', index);
      element.appendChild(span);
    });
  };

  if (fvElements.catch) {
    const lines = fvElements.catch.querySelectorAll('.fv-catch-line');
    lines.forEach(line => splitText(line));
  }

  setTimeout(() => {
    if(fvElements.catch) fvElements.catch.classList.add('is-active');
    
    setTimeout(() => {
      if(fvElements.sub) fvElements.sub.classList.add('is-active');
    }, 600);

    setTimeout(() => {
      if(fvElements.logo) fvElements.logo.classList.add('is-active');
      if(fvElements.readMore) fvElements.readMore.classList.add('is-visible');
      if(fvElements.readMoreLine) fvElements.readMoreLine.classList.add('animate');
    }, 1200);

    if(fvElements.gridItems) {
      fvElements.gridItems.forEach((item, index) => {
        setTimeout(() => {
          item.classList.add('show');
        }, 1500 + (index * 150));
      });
    }

    if(fvElements.decoItems) {
      fvElements.decoItems.forEach((item, index) => {
        setTimeout(() => {
          item.classList.add('show');
        }, 1000 + (index * 200));
      });
    }
  }, 300);

  const pageTopBtn = document.getElementById('pageTopBtn');
  
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    if (nav) {
      if (scrollY > 100) {
        nav.classList.add('is-scrolled');
      } else {
        nav.classList.remove('is-scrolled');
      }
    }

    if (pageTopBtn) {
      if (scrollY > 300) {
        pageTopBtn.classList.add('is-show');
      } else {
        pageTopBtn.classList.remove('is-show');
      }
    }
  });
});
