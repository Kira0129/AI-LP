// Scroll reveal animation
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
  observer.observe(el);
});

// Voice section toggle
const initVoiceToggle = () => {
  document.querySelectorAll('.voice-card').forEach(card => {
    const text = card.querySelector('.voice-text');
    const toggle = card.querySelector('.voice-toggle');
    
    if (!text || !toggle) return;

    // Reset for check
    text.classList.remove('expanded');
    toggle.classList.remove('visible');
    toggle.textContent = '続きを読む';

    // Check if content exceeds 3 lines
    // We use a small buffer (2px) to avoid sub-pixel rendering issues
    const isOverflowing = text.scrollHeight > text.clientHeight + 2;
    
    if (isOverflowing) {
      toggle.classList.add('visible');
    }
  });
};

// Toggle event listener (only attach once)
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.voice-card').forEach(card => {
    const toggle = card.querySelector('.voice-toggle');
    const text = card.querySelector('.voice-text');
    if (!toggle || !text) return;

    toggle.onclick = (e) => {
      e.preventDefault();
      text.classList.toggle('expanded');
      toggle.textContent = text.classList.contains('expanded') ? '閉じる' : '続きを読む';
    };
  });
  
  initVoiceToggle();
});

// Re-check on load and resize
window.addEventListener('load', initVoiceToggle);
window.addEventListener('resize', initVoiceToggle);

// Back to Top functionality
const backToTop = document.getElementById('backToTop');
if (backToTop) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Hamburger Menu logic
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');
const navLinks = document.querySelectorAll('nav a');

if (hamburger && nav) {
  const toggleMenu = () => {
    hamburger.classList.toggle('active');
    nav.classList.toggle('active');
    document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
  };

  hamburger.addEventListener('click', toggleMenu);

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      nav.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}
