document.addEventListener('DOMContentLoaded', () => {
  // 1. Hamburger Menu Logic
  const hamburger = document.getElementById('hamburger-btn');
  const fullscreenMenu = document.getElementById('fullscreen-menu');
  const menuLinks = document.querySelectorAll('.menu-link');
  const closeMenuBtn = document.getElementById('close-menu-btn');
  let isMenuOpen = false;

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    if (isMenuOpen) {
      fullscreenMenu.classList.remove('translate-x-full');
      document.body.style.overflow = 'hidden';
      // Hide original hamburger to avoid overlap with close button
      hamburger.style.opacity = '0';
      hamburger.style.pointerEvents = 'none';
    } else {
      fullscreenMenu.classList.add('translate-x-full');
      document.body.style.overflow = '';
      // Show original hamburger
      hamburger.style.opacity = '1';
      hamburger.style.pointerEvents = 'auto';
      // Reset hamburger lines (just in case)
      hamburger.children[0].style.transform = 'none';
      hamburger.children[1].style.opacity = '1';
      hamburger.children[2].style.transform = 'none';
    }
  }

  hamburger.addEventListener('click', toggleMenu);
  if (closeMenuBtn) {
    closeMenuBtn.addEventListener('click', toggleMenu);
  }
  menuLinks.forEach(link => link.addEventListener('click', () => {
    if(isMenuOpen) toggleMenu();
  }));

  // 2. Scroll Animations (Intersection Observer)
  const fadeEls = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  fadeEls.forEach(el => observer.observe(el));



  // 4. Header scroll reveal
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      header.classList.remove('opacity-0', 'invisible', '-translate-y-4');
      header.classList.add('opacity-100', 'visible', 'translate-y-0', 'bg-white/95', 'backdrop-blur-md', 'border-b', 'border-gray-200', 'shadow-sm');
    } else {
      header.classList.add('opacity-0', 'invisible', '-translate-y-4');
      header.classList.remove('opacity-100', 'visible', 'translate-y-0', 'bg-white/95', 'backdrop-blur-md', 'border-b', 'border-gray-200', 'shadow-sm');
    }
  });

  // 5. Back to Top Button
  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
        backToTopBtn.classList.add('opacity-100', 'translate-y-0');
      } else {
        backToTopBtn.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
        backToTopBtn.classList.remove('opacity-100', 'translate-y-0');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 6. Mobile CTA Scroll Reveal
  const mobileCta = document.getElementById('mobileCta');
  const aboutSection = document.getElementById('about');
  
  if (mobileCta && aboutSection) {
    window.addEventListener('scroll', () => {
      // ABOUTセクションが画面の半分以上見えたら表示する
      const aboutTop = aboutSection.getBoundingClientRect().top;
      if (aboutTop <= window.innerHeight * 0.5) {
        mobileCta.classList.remove('translate-y-full', 'opacity-0', 'pointer-events-none');
        mobileCta.classList.add('translate-y-0', 'opacity-100');
      } else {
        mobileCta.classList.add('translate-y-full', 'opacity-0', 'pointer-events-none');
        mobileCta.classList.remove('translate-y-0', 'opacity-100');
      }
    });
  }

  // Voice Read More Logic
  const voiceTexts = document.querySelectorAll('.voice-text');
  voiceTexts.forEach(p => {
    // Wait for layout to calculate heights properly
    setTimeout(() => {
      // Check if content exceeds 3 lines
      if (p.scrollHeight > p.clientHeight) {
        const btn = p.nextElementSibling;
        if (btn && btn.classList.contains('voice-toggle-btn')) {
          btn.classList.remove('hidden');
          btn.addEventListener('click', () => {
            if (p.classList.contains('line-clamp-3')) {
              p.classList.remove('line-clamp-3');
              btn.textContent = '閉じる';
            } else {
              p.classList.add('line-clamp-3');
              btn.textContent = '続きを読む';
            }
          });
        }
      }
    }, 100);
  });

  // 右クリック禁止・画像保存防止・ドラッグ禁止
  document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
  });
  document.addEventListener('dragstart', function(e) {
    e.preventDefault();
  });
});
