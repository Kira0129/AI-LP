/* ─── Header scroll & SP fixed CTA ─── */
const header = document.getElementById('site-header');
const spFixedCta = document.getElementById('sp-fixed-cta');
const fvSection  = document.getElementById('fv');

window.addEventListener('scroll', () => {
  if (header) header.classList.toggle('scrolled', window.scrollY > 60);
  if (spFixedCta && fvSection) {
    const fvBottom = fvSection.offsetTop + fvSection.offsetHeight;
    spFixedCta.classList.toggle('visible', window.scrollY > fvBottom - 100);
  }
}, { passive: true });

/* ─── Hamburger / SP Menu ─── */
const hamburgerBtn = document.getElementById('hamburger-btn');
const spMenu       = document.getElementById('sp-menu');
const spMenuClose  = document.getElementById('sp-menu-close');

function openSPMenu() {
  if (spMenu) spMenu.classList.add('open');
  if (hamburgerBtn) hamburgerBtn.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}
function closeSPMenu() {
  if (spMenu) spMenu.classList.remove('open');
  if (hamburgerBtn) hamburgerBtn.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

if (hamburgerBtn) hamburgerBtn.addEventListener('click', openSPMenu);
if (spMenuClose) spMenuClose.addEventListener('click', closeSPMenu);
if (spMenu) spMenu.addEventListener('click', e => { if (e.target === spMenu) closeSPMenu(); });

/* ─── Scroll Reveal ─── */
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
revealEls.forEach(el => io.observe(el));

/* ─── Commitment Scrollytelling & Progress Line ─── */
const commitSection = document.getElementById('commitment');
const commitProgressLine = document.getElementById('commit-progress-line');
const commitContents = document.querySelectorAll('.commit-content-inner');
const commitImages = document.querySelectorAll('.commit-image-fixed');

if (commitSection) {
  const handleCommitScroll = () => {
    // SP・タブレット表示時（1024px未満）はスクロール同期をスキップ
    if (window.innerWidth < 1024) {
      return;
    }

    const rect = commitSection.getBoundingClientRect();
    const sectionHeight = commitSection.offsetHeight;
    const viewHeight = window.innerHeight;

    // Calculate progress (0.0 to 1.0)
    let progress = ( -rect.top ) / (sectionHeight - viewHeight);
    progress = Math.max(0, Math.min(1, progress));
    
    // Update progress line
    if (commitProgressLine) {
      if (window.innerWidth >= 1024) {
        commitProgressLine.style.height = `${progress * 100}%`;
        commitProgressLine.style.width = '100%';
      } else {
        commitProgressLine.style.width = `${progress * 100}%`;
        commitProgressLine.style.height = '100%';
      }
    }

    // Determine active index based on progress (3 slides: 0.33, 0.66)
    let activeIndex = "1";
    if (progress >= 0.66) {
      activeIndex = "3";
    } else if (progress >= 0.33) {
      activeIndex = "2";
    } else {
      activeIndex = "1";
    }

    // Switch text elements
    commitContents.forEach(content => {
      const idx = content.getAttribute('data-index');
      if (idx === activeIndex) {
        content.classList.add('is-active');
      } else {
        content.classList.remove('is-active');
      }
    });

    // Switch image elements
    commitImages.forEach(img => {
      const idx = img.getAttribute('data-index');
      if (idx === activeIndex) {
        img.style.opacity = '1';
      } else {
        img.style.opacity = '0';
      }
    });
  };

  window.addEventListener('scroll', handleCommitScroll, { passive: true });
  // Initial call to set correct states on page load
  handleCommitScroll();
}

/* ─── Swipers ─── */
if (document.querySelector('.menu-slider')) {
  new Swiper('.menu-slider', {
    slidesPerView: 1.2,
    spaceBetween: 20,
    loop: true,
    speed: 5000,
    autoplay: { delay: 0, disableOnInteraction: false },
    breakpoints: {
      768: { slidesPerView: 1.5, spaceBetween: 32 }
    }
  });
}

/* ─── Smooth scroll for anchor links ─── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      closeSPMenu();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ─── Voice Read More (Accordion) ─── */
document.addEventListener('DOMContentLoaded', () => {
  const textWraps = document.querySelectorAll('.voice-text-wrap');
  textWraps.forEach(wrap => {
    const text = wrap.querySelector('.voice-text');
    if (!text) return;
    const style = window.getComputedStyle(text);
    const lineHeight = parseFloat(style.lineHeight);
    
    // Calculate height for 3 lines (lineHeight * 3)
    const maxHeight = lineHeight * 3;
    
    // Only collapse and show 'read more' button if content exceeds 3 lines
    if (text.scrollHeight > maxHeight + 6) {
      wrap.classList.add('is-collapsed');
      
      const btn = document.createElement('button');
      btn.className = 'voice-readmore-btn';
      btn.innerText = '続きを読む';
      btn.setAttribute('aria-expanded', 'false');
      
      wrap.parentNode.appendChild(btn);
      
      btn.addEventListener('click', () => {
        const isCollapsed = wrap.classList.contains('is-collapsed');
        if (isCollapsed) {
          wrap.classList.remove('is-collapsed');
          wrap.classList.add('is-expanded');
          btn.classList.add('active');
          btn.innerText = '閉じる';
          btn.setAttribute('aria-expanded', 'true');
        } else {
          wrap.classList.remove('is-expanded');
          wrap.classList.add('is-collapsed');
          btn.classList.remove('active');
          btn.innerText = '続きを読む';
          btn.setAttribute('aria-expanded', 'false');
          
          // Smoothly scroll back to the top of the card
          wrap.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      });
    }
  });
});

/* ─── Page Top Button ─── */
const pageTopBtn = document.getElementById('pagetop-btn');
if (pageTopBtn) {
  window.addEventListener('scroll', () => {
    // 300px以上スクロールしたら表示
    pageTopBtn.classList.toggle('is-visible', window.scrollY > 300);
  }, { passive: true });

  pageTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ─── Prevent Text Selection & Image Saving ─── */
document.addEventListener('contextmenu', e => {
  e.preventDefault();
});

document.addEventListener('dragstart', e => {
  if (e.target.tagName === 'IMG') {
    e.preventDefault();
  }
});
