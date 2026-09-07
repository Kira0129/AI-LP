document.addEventListener('contextmenu', e => e.preventDefault());

document.addEventListener('DOMContentLoaded', () => {
  // ハンバーガーメニュー
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

  // スクロールアニメーション (Reveal)
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
});
