document.addEventListener('DOMContentLoaded', () => {
  // 画像のドラッグ禁止
  document.addEventListener('dragstart', (e) => {
    if (e.target.tagName === 'IMG') e.preventDefault();
  });

  // Header Scroll Effect
  const header = document.getElementById('header');
  const headerLogo = document.getElementById('header-logo');
  const pcNavLinks = document.querySelectorAll('#pc-nav a');
  const headerTel = document.getElementById('header-tel');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.remove('-translate-y-full', 'opacity-0', 'pointer-events-none');
      header.classList.add('bg-white/95', 'backdrop-blur-sm', 'shadow-md');
      header.classList.remove('bg-transparent');
      headerLogo.classList.add('text-serio-dark');
      headerLogo.classList.remove('text-white');
      headerTel.classList.replace('border-white/50', 'border-serio-brown');
      headerTel.classList.replace('text-white', 'text-serio-brown');
      headerTel.classList.replace('hover:text-serio-dark', 'hover:text-white');
      headerTel.classList.replace('hover:bg-white', 'hover:bg-serio-brown');

      pcNavLinks.forEach(link => {
        link.classList.add('text-serio-dark');
        link.classList.remove('text-white');
      });
      // SP Hamburger line color
      document.getElementById('line1').classList.replace('bg-white', 'bg-serio-dark');
      document.getElementById('line2').classList.replace('bg-white', 'bg-serio-dark');
      document.getElementById('line3').classList.replace('bg-white', 'bg-serio-dark');
    } else {
      header.classList.add('-translate-y-full', 'opacity-0', 'pointer-events-none');
      header.classList.remove('bg-white/95', 'backdrop-blur-sm', 'shadow-md');
      header.classList.add('bg-transparent');
      headerLogo.classList.remove('text-serio-dark');
      headerLogo.classList.add('text-white');
      headerTel.classList.replace('border-serio-brown', 'border-white/50');
      headerTel.classList.replace('text-serio-brown', 'text-white');
      headerTel.classList.replace('hover:text-white', 'hover:text-serio-dark');
      headerTel.classList.replace('hover:bg-serio-brown', 'hover:bg-white');

      pcNavLinks.forEach(link => {
        link.classList.remove('text-serio-dark');
        link.classList.add('text-white');
      });
      document.getElementById('line1').classList.replace('bg-serio-dark', 'bg-white');
      document.getElementById('line2').classList.replace('bg-serio-dark', 'bg-white');
      document.getElementById('line3').classList.replace('bg-serio-dark', 'bg-white');
    }
  });

  // SP Menu Toggle
  const menuBtn = document.getElementById('menu-btn');
  const spMenu = document.getElementById('sp-menu');
  const menuLinks = document.querySelectorAll('.menu-link');

  const toggleMenu = () => {
    menuBtn.classList.toggle('open');
    if (menuBtn.classList.contains('open')) {
      spMenu.classList.remove('opacity-0', 'pointer-events-none');
      document.body.style.overflow = 'hidden';
      // Force header to have white background when menu is open
      header.classList.add('bg-white/95', 'backdrop-blur-sm', 'shadow-md');
      header.classList.remove('bg-transparent');
      headerLogo.classList.remove('text-white');
      headerLogo.classList.add('text-serio-dark');
    } else {
      spMenu.classList.add('opacity-0', 'pointer-events-none');
      document.body.style.overflow = '';
      // Revert header to transparent ONLY if we are at the top
      if (window.scrollY <= 50) {
        header.classList.remove('bg-white/95', 'backdrop-blur-sm', 'shadow-md');
        header.classList.add('bg-transparent');
        headerLogo.classList.remove('text-serio-dark');
        headerLogo.classList.add('text-white');
      }
    }
  };

  menuBtn.addEventListener('click', toggleMenu);
  menuLinks.forEach(link => {
    link.addEventListener('click', toggleMenu);
  });

  // Scroll Reveal Animation (Intersection Observer)
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -10% 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealEls.forEach(el => observer.observe(el));

  // Lightbox Modal
  const modal = document.getElementById('lightbox-modal');
  const modalImg = document.getElementById('lightbox-img');
  const triggers = document.querySelectorAll('.lightbox-trigger');

  const openModal = (src) => {
    modalImg.src = src;
    modal.classList.remove('opacity-0', 'pointer-events-none');
    document.body.style.overflow = 'hidden';
  };
  const closeModal = () => {
    modal.classList.add('opacity-0', 'pointer-events-none');
    setTimeout(() => { modalImg.src = ''; }, 300);
    document.body.style.overflow = '';
  };

  triggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      openModal(e.target.src);
    });
  });
  modal.addEventListener('click', closeModal);

  // Read More Toggle
  document.querySelectorAll('.voice-text-wrap').forEach(wrap => {
    const textEl = wrap.querySelector('p');
    const btn = wrap.querySelector('.read-more-btn');
    setTimeout(() => {
      if (textEl.scrollHeight > textEl.clientHeight) {
        btn.classList.remove('hidden');
        btn.addEventListener('click', () => {
          if (textEl.classList.contains('line-clamp-3')) {
            textEl.classList.remove('line-clamp-3');
            btn.textContent = '閉じる';
          } else {
            textEl.classList.add('line-clamp-3');
            btn.textContent = '続きを読む';
          }
        });
      }
    }, 100);
  });

  // Page Top Button
  const pageTopBtn = document.getElementById('page-top');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      pageTopBtn.classList.remove('opacity-0', 'pointer-events-none');
    } else {
      pageTopBtn.classList.add('opacity-0', 'pointer-events-none');
    }
  });
  pageTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});
