document.addEventListener('DOMContentLoaded', () => {
  // Intersection Observer for scroll animations
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // Hamburger Menu Logic
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const closeDrawerBtn = document.getElementById('close-drawer-btn');
  const drawerMenu = document.getElementById('drawer-menu');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  const toggleMenu = () => {
    const isMenuOpen = hamburgerBtn.classList.contains('menu-open');
    
    if (isMenuOpen) {
      // Close
      hamburgerBtn.classList.remove('menu-open');
      drawerMenu.classList.remove('opacity-100', 'pointer-events-auto');
      drawerMenu.classList.add('opacity-0', 'pointer-events-none');
      document.body.style.overflow = '';
    } else {
      // Open
      hamburgerBtn.classList.add('menu-open');
      drawerMenu.classList.remove('opacity-0', 'pointer-events-none');
      drawerMenu.classList.add('opacity-100', 'pointer-events-auto');
      document.body.style.overflow = 'hidden';
    }
  };

  hamburgerBtn.addEventListener('click', toggleMenu);
  if (closeDrawerBtn) {
    closeDrawerBtn.addEventListener('click', toggleMenu);
  }

  drawerLinks.forEach(link => {
    link.addEventListener('click', toggleMenu);
  });

  // Voice Text Read More Logic
  const voiceTexts = document.querySelectorAll('.voice-text');
  
  // Wait briefly to ensure layout and fonts are rendered before checking height
  setTimeout(() => {
    voiceTexts.forEach(textEl => {
      // Check if text overflows its container (clamped by line-clamp-3)
      if (textEl.scrollHeight > textEl.clientHeight) {
        const btn = textEl.nextElementSibling;
        if (btn && btn.classList.contains('voice-toggle-btn')) {
          btn.classList.remove('hidden');
          
          btn.addEventListener('click', () => {
            const isExpanded = !textEl.classList.contains('line-clamp-3');
            const btnText = btn.querySelector('.btn-text');
            const icon = btn.querySelector('.icon');
            
            if (isExpanded) {
              textEl.classList.add('line-clamp-3');
              btnText.textContent = '続きを読む';
              icon.classList.remove('rotate-180');
            } else {
              textEl.classList.remove('line-clamp-3');
              btnText.textContent = '閉じる';
              icon.classList.add('rotate-180');
            }
          });
        }
      }
    });
  }, 300);

  // Scroll to Top Logic
  const scrollTopBtn = document.getElementById('scroll-top-btn');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        scrollTopBtn.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
        scrollTopBtn.classList.add('opacity-100', 'pointer-events-auto', 'translate-y-0');
      } else {
        scrollTopBtn.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
        scrollTopBtn.classList.remove('opacity-100', 'pointer-events-auto', 'translate-y-0');
      }
    });

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});
