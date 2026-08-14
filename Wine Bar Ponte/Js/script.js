document.addEventListener('DOMContentLoaded', () => {
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

  const fvElements = {
    catch: document.getElementById('fv-catch'),
    sub: document.getElementById('fv-sub'),
    logo: document.getElementById('fv-logo'),
    readMore: document.getElementById('fv-read-more'),
    readMoreLine: document.querySelector('.fv-read-more-line'),
    gridItems: document.querySelectorAll('.fv-grid-item'),
    decoItems: document.querySelectorAll('.fv-deco')
  };

  const splitTextToChars = (el) => {
    if (!el) return;
    const lines = el.querySelectorAll('.fv-catch-line');
    if (lines.length > 0) {
      let globalIndex = 0;
      lines.forEach(line => {
        const text = line.textContent.trim();
        line.innerHTML = '';
        [...text].forEach(char => {
          const span = document.createElement('span');
          span.textContent = char;
          span.className = 'char';
          span.style.setProperty('--char-index', globalIndex++);
          line.appendChild(span);
        });
      });
    } else {
      const text = el.textContent.trim();
      el.innerHTML = '';
      [...text].forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.className = 'char';
        span.style.setProperty('--char-index', index);
        el.appendChild(span);
      });
    }
  };

  splitTextToChars(fvElements.catch);
  
  // サブコピーは一文字ずつではなく、フェードインさせるため分割しない
  // splitTextToChars(fvElements.sub); 
  
  splitTextToChars(fvElements.logo);

  const startFVAnimation = () => {
    if (fvElements.catch) fvElements.catch.classList.add('is-active');

    setTimeout(() => {
      fvElements.decoItems.forEach((deco, index) => {
        setTimeout(() => deco.classList.add('show'), index * 100);
      });
    }, 300);

    setTimeout(() => {
      if (fvElements.sub) {
        fvElements.sub.style.transition = 'opacity 1s ease, transform 1s ease';
        fvElements.sub.style.opacity = '1';
        fvElements.sub.style.transform = 'translateY(0)';
      }
    }, 800);

    setTimeout(() => {
      if (fvElements.logo) fvElements.logo.classList.add('is-active');
    }, 1200);

    setTimeout(() => {
      if (fvElements.readMore) {
        fvElements.readMore.classList.add('is-visible');
        if (fvElements.readMoreLine) fvElements.readMoreLine.classList.add('animate');
      }
    }, 1800);

    setTimeout(() => {
      fvElements.gridItems.forEach((item, index) => {
        setTimeout(() => item.classList.add('show'), index * 150);
      });
    }, 2200);
  };

  // Start animation shortly after load
  setTimeout(startFVAnimation, 100);

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
});
