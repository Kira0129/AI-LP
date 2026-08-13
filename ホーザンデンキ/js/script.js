// Header scroll effect
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  if (header) {
    header.classList.toggle('scrolled', window.scrollY > 10);
  }
});

// モーダル処理
function openModal(imageSrc) {
  var modal = document.getElementById("imageModal");
  var modalImg = document.getElementById("modalImg");
  if (modal && modalImg) {
    modal.style.display = "block";
    modalImg.src = imageSrc;
  }
}

function closeModal() {
  var modal = document.getElementById("imageModal");
  if (modal) {
    modal.style.display = "none";
  }
}

// 背景クリックでも閉じる
window.onclick = function(event) {
  var modal = document.getElementById("imageModal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// スムーススクロール
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === "#") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const headerOffset = 70;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  });
});

// Back to Top & SP CTA Bar visibility
const backToTop = document.getElementById('back-to-top');
const spCtaBar = document.querySelector('.sp-cta-bar');
const troubleSection = document.getElementById('trouble');

window.addEventListener('scroll', () => {
  // Back to Top
  if (backToTop) {
    if (window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }

  // SP CTA Bar (Show after Trouble section enters)
  if (spCtaBar && troubleSection) {
    const troubleTop = troubleSection.getBoundingClientRect().top;
    if (troubleTop < window.innerHeight * 0.5) {
      spCtaBar.classList.add('visible');
    } else {
      spCtaBar.classList.remove('visible');
    }
  }
});

// Hamburger menu toggle
const hamburgerBtn = document.getElementById('hamburger-btn');
const navLinks = document.getElementById('nav-links');

if (hamburgerBtn && navLinks) {
  hamburgerBtn.addEventListener('click', () => {
    hamburgerBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburgerBtn.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });
}

// ===== SCROLL & INITIAL ANIMATION =====
document.addEventListener('DOMContentLoaded', () => {
  // Intersection Observer for scroll animations
  const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        animationObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px' // 画面下部から60px入った段階でトリガー
  });

  // Observe standard animated elements
  const animatableElements = document.querySelectorAll(
    '.animate-fade, .animate-up, .animate-left, .animate-right, .animate-scale'
  );
  animatableElements.forEach(el => {
    animationObserver.observe(el);
  });

  // Observe staggered elements (parent class '.animate-stagger' delays children)
  const staggeredContainers = document.querySelectorAll('.animate-stagger');
  staggeredContainers.forEach(container => {
    const children = container.children;
    Array.from(children).forEach((child, index) => {
      child.style.transitionDelay = `${index * 0.15}s`;
      child.classList.add('animate-up');
      animationObserver.observe(child);
    });
  });

  // Page Load Hero Box Animation (immediately triggers)
  const heroTextBox = document.querySelector('.hero-text-box');
  if (heroTextBox) {
    heroTextBox.classList.add('animate-up');
    setTimeout(() => {
      heroTextBox.classList.add('animated');
    }, 100);
  }

  // Disable right-click (context menu) and drag for image protection
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });

  document.addEventListener('dragstart', (e) => {
    if (e.target.tagName === 'IMG') {
      e.preventDefault();
    }
  });
});
