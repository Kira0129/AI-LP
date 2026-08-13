// Nav scroll
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
});

// Reveal on scroll
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target); // 一度表示されたら監視を解除
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => observer.observe(el));

// SP CTA Visibility toggle (Appear after scrolling to ABOUT)
const spCta = document.querySelector('.sp-cta');
const aboutSection = document.getElementById('about');

window.addEventListener('scroll', () => {
  if (spCta && aboutSection) {
    // ABOUTセクションの上端が画面に入り始めたあたりで表示
    const aboutTop = aboutSection.offsetTop;
    if (window.scrollY > aboutTop - 200) {
      spCta.classList.add('is-visible');
    } else {
      spCta.classList.remove('is-visible');
    }
  }
});

// Back to Top logic
const toTop = document.getElementById('to-top');
window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    toTop.classList.add('is-visible');
  } else {
    toTop.classList.remove('is-visible');
  }
});
toTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Hamburger Menu logic
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
const navItems = document.querySelectorAll('.nav-links a');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('is-active');
  navLinks.classList.toggle('is-active');
});

// Close menu when a link is clicked
navItems.forEach(item => {
  item.addEventListener('click', () => {
    hamburger.classList.remove('is-active');
    navLinks.classList.remove('is-active');
  });
});

// Disable Right Click (Context Menu)
document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});
