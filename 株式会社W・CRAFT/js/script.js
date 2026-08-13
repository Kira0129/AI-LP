document.addEventListener('DOMContentLoaded', () => {
  // Nav scroll effect
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 50);
  });

  // Scroll Reveal
  const revealEls = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  revealEls.forEach(el => observer.observe(el));

  // Hamburger Menu
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  const navItems = document.querySelectorAll('.nav-links a');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('is-active');
      navLinks.classList.toggle('is-active');
    });

    // Close menu when clicking a link
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        hamburger.classList.remove('is-active');
        navLinks.classList.remove('is-active');
      });
    });
  }

  // To Top Button
  const toTop = document.getElementById('to-top');
  if (toTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        toTop.classList.add('is-visible');
      } else {
        toTop.classList.remove('is-visible');
      }
    });

    toTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // SP CTA Visibility
  const spCta = document.querySelector('.sp-cta');
  const aboutSection = document.getElementById('about');
  if (spCta && aboutSection) {
    window.addEventListener('scroll', () => {
      // 念のため少し余裕を持たせる（-50px）
      if (window.scrollY >= aboutSection.offsetTop - 50) {
        spCta.classList.add('is-visible');
      } else {
        spCta.classList.remove('is-visible');
      }
    });
  }
});
