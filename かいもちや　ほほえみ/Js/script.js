// =============================================
// SLIDER
// =============================================
(function () {
  const cards     = Array.from(document.querySelectorAll('.fv-card'));
  const dots      = Array.from(document.querySelectorAll('.fv-sdot'));
  const layer     = document.getElementById('fvCardsLayer');
  const captionEl = document.getElementById('fvCaption');
  const TOTAL     = cards.length;
  let cur         = 0;
  let busy        = false;
  let timer       = null;
  const isSP      = () => window.innerWidth <= 600;

  function updateUI(idx) {
    dots.forEach((d, i) => d.classList.toggle('active', i === idx));
  }

  function getPos() {
    const W = layer.offsetWidth, H = layer.offsetHeight;
    const SW = Math.round(Math.min(Math.max(130, W*0.13), 185));
    const SH = Math.round(Math.min(Math.max(155, H*0.22), 220));
    const LW = Math.round(Math.min(Math.max(560, W*0.58), 820));
    const LH = Math.round(Math.min(Math.max(400, H*0.62), 560));
    return {
      center  : { t: Math.round((H-LH)/2), l: Math.round((W-LW)/2), w:LW, h:LH },
      topright: { t: 56, l: W-SW-120, w:SW, h:SH },
      botleft : { t: H-SH-40, l: 40, w:SW, h:SH },
      hidden  : { t: 56, l: W-SW-120, w:SW, h:SH },
    };
  }

  function placeCard(card, p, animate) {
    if (!animate) { card.style.transition = 'none'; void card.offsetWidth; }
    card.style.top    = p.t + 'px';
    card.style.left   = p.l + 'px';
    card.style.width  = p.w + 'px';
    card.style.height = p.h + 'px';
    if (!animate) { void card.offsetWidth; card.style.transition = ''; }
  }

  function roleOf(i, c) {
    if (i === c)                     return 'center';
    if (i === (c+1) % TOTAL)         return 'topright';
    if (i === (c-1+TOTAL) % TOTAL)   return 'botleft';
    return 'hidden';
  }

  function styleCard(card, role, pos, animate) {
    const p   = pos[role === 'hidden' ? 'hidden' : role];
    const img = card.querySelector('img');
    placeCard(card, p, animate);

    if (role === 'center') {
      card.style.opacity = '1'; card.style.zIndex = '4';
      card.style.borderRadius = '120px 24px 120px 24px';
      card.style.boxShadow = '8px 16px 40px rgba(62,43,32,.15)';
      img.style.transition = 'transform 6s cubic-bezier(.25,.46,.45,.94)';
      void img.offsetWidth; img.style.transform = 'scale(1.05)';
    } else if (role === 'topright' || role === 'botleft') {
      card.style.opacity = '1'; card.style.zIndex = '3';
      card.style.borderRadius = role === 'topright' ? '40px 12px 40px 12px' : '12px 40px 12px 40px';
      card.style.boxShadow = '4px 10px 24px rgba(62,43,32,.1)';
      img.style.transition = 'transform 1s ease'; img.style.transform = 'scale(1)';
    } else {
      card.style.opacity = '0'; card.style.zIndex = '1';
      img.style.transition = 'none'; img.style.transform = 'scale(1)';
    }
  }

  function desktopInit() {
    layer.style.display = '';
    const pos = getPos();
    cards.forEach((card, i) => styleCard(card, roleOf(i, cur), pos, false));
    updateUI(cur);
  }

  function desktopGo(nextIdx) {
    if (busy) return;
    busy = true;
    const pos = getPos();
    const prevPrev = (cur - 1 + TOTAL) % TOTAL;
    cur = nextIdx;

    cards[prevPrev].style.opacity = '0';
    cards[prevPrev].style.zIndex = '1';

    cards.forEach((card, i) => {
      if (i === prevPrev) return;
      styleCard(card, roleOf(i, cur), pos, true);
    });

    setTimeout(() => {
      const h = pos.hidden; const c = cards[prevPrev];
      c.style.transition = 'none';
      c.style.top = h.t+'px'; c.style.left = h.l+'px';
      c.style.width = h.w+'px'; c.style.height = h.h+'px';
      void c.offsetWidth; c.style.transition = '';
    }, 950);

    updateUI(cur);
    setTimeout(() => { busy = false; }, 1050);
  }

  // SP
  let spWrap = null, spTrack = null, spBuilt = false;

  function buildSP() {
    if (spBuilt) return;
    spBuilt = true;
    layer.style.display = 'none';

    const fvBody = layer.parentElement;
    const fvEl = fvBody.parentElement;
    const W = fvEl.offsetWidth;
    const slideH = Math.round(W * 0.75);

    spWrap = document.createElement('div');
    spWrap.id = 'spSliderWrap';
    spWrap.style.cssText = `width:100%;overflow:hidden;position:relative;z-index:8;flex-shrink:0;background:transparent;border-radius: 0 0 24px 24px;`;

    spTrack = document.createElement('div');
    spTrack.id = 'spTrack';
    spTrack.style.cssText = 'display:flex;height:100%;transition:transform .72s cubic-bezier(.4,0,.2,1);will-change:transform;';

    cards.forEach((card) => {
      const cell = document.createElement('div');
      cell.style.cssText = `flex:0 0 ${W}px;width:${W}px;height:100%;overflow:hidden;position:relative;`;
      const img = card.querySelector('img').cloneNode(true);
      img.style.cssText = 'width:100%;height:100%;object-fit:cover;display:block;';
      cell.appendChild(img); spTrack.appendChild(cell);
    });

    spWrap.appendChild(spTrack);
    const dotRow = document.querySelector('.fv-dot-row');
    if (dotRow) { spWrap.appendChild(dotRow); dotRow.style.bottom = '16px'; }
    fvBody.insertBefore(spWrap, fvBody.firstChild);

    let sx = 0, sy = 0, locked = null;
    spWrap.addEventListener('touchstart', e => { sx = e.touches[0].clientX; sy = e.touches[0].clientY; locked = null; }, { passive: true });
    spWrap.addEventListener('touchmove', e => {
      if (locked === null) {
        const dx = Math.abs(e.touches[0].clientX - sx), dy = Math.abs(e.touches[0].clientY - sy);
        locked = dx > dy ? 'h' : 'v';
      }
      if (locked === 'h') e.preventDefault();
    }, { passive: false });
    spWrap.addEventListener('touchend', e => {
      if (locked !== 'h') return;
      const dx = e.changedTouches[0].clientX - sx;
      if (dx < -40) spGo((cur+1) % TOTAL); else if (dx > 40) spGo((cur-1+TOTAL) % TOTAL);
    });
    spGo(cur, false);
  }

  function spGo(idx, animate = true) {
    cur = idx;
    const W = layer.parentElement.parentElement.offsetWidth;
    if (!animate) spTrack.style.transition = 'none';
    spTrack.style.transform = `translateX(-${idx * W}px)`;
    if (!animate) { void spTrack.offsetWidth; spTrack.style.transition = ''; }
    updateUI(cur);
  }

  function destroySP() {
    if (!spBuilt) return;
    spBuilt = false;
    const dotRow = document.querySelector('.fv-dot-row');
    const fv = layer.parentElement.parentElement;
    if (dotRow && fv) { fv.appendChild(dotRow); dotRow.style.bottom = ''; }
    if (spWrap) { spWrap.remove(); spWrap = null; spTrack = null; }
    layer.style.display = '';
  }

  function startTimer() {
    clearInterval(timer);
    timer = setInterval(() => {
      const next = (cur + 1) % TOTAL;
      if (isSP()) spGo(next); else desktopGo(next);
    }, 4500);
  }

  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      if (isSP()) spGo(idx); else desktopGo(idx);
      startTimer();
    });
  });

  layer.addEventListener('mouseenter', () => clearInterval(timer));
  layer.addEventListener('mouseleave', startTimer);

  window.addEventListener('resize', () => {
    if (isSP()) {
      if (!spBuilt) buildSP(); else spGo(cur, false);
    } else {
      if (spBuilt) { destroySP(); desktopInit(); }
      else { const pos = getPos(); cards.forEach((c, i) => styleCard(c, roleOf(i, cur), pos, false)); }
    }
  });

  if (isSP()) buildSP(); else desktopInit();
  startTimer();
})();

// Scroll reveal
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
reveals.forEach(el => observer.observe(el));

// Page Top logic
const pageTopBtn = document.getElementById('pageTop');
if (pageTopBtn) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      pageTopBtn.classList.add('visible');
    } else {
      pageTopBtn.classList.remove('visible');
    }
  });

  pageTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Hamburger Menu Logic
(function() {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const spNav = document.getElementById('spNav');
  const spNavClose = document.getElementById('spNavClose');
  const spNavOverlay = document.getElementById('spNavOverlay');
  const spNavLinks = document.querySelectorAll('.sp-nav-link');

  function toggleMenu() {
    hamburgerBtn.classList.toggle('active');
    spNav.classList.toggle('active');
    spNavOverlay.classList.toggle('active');
    document.body.classList.toggle('nav-open');
  }

  function closeMenu() {
    hamburgerBtn.classList.remove('active');
    spNav.classList.remove('active');
    spNavOverlay.classList.remove('active');
    document.body.classList.remove('nav-open');
  }

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', toggleMenu);
  }

  if (spNavClose) {
    spNavClose.addEventListener('click', closeMenu);
  }

  if (spNavOverlay) {
    spNavOverlay.addEventListener('click', closeMenu);
  }

  spNavLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
})();

// =============================================
// VOICE SECTION TOGGLE
// =============================================
(function() {
  const voiceCards = document.querySelectorAll('.voice-card');
  voiceCards.forEach(card => {
    const wrap = card.querySelector('.voice-text-wrap');
    const text = card.querySelector('.voice-text');
    const btn = card.querySelector('.voice-more-btn');
    
    if (!wrap || !text || !btn) return;

    // Check height to see if it exceeds 3 lines
    // line-height is 2, so 3 lines is font-size * 2 * 3
    const fontSize = parseFloat(window.getComputedStyle(text).fontSize);
    const lineHeight = 2; // from CSS
    const threshold = fontSize * lineHeight * 3;
    
    // Use a small buffer for subpixel rendering
    if (text.scrollHeight > threshold + 5) {
      card.classList.add('has-more');
      btn.style.display = 'flex';
      btn.addEventListener('click', () => {
        const isOpen = card.classList.toggle('is-open');
        btn.firstChild.textContent = isOpen ? '閉じる' : '続きを読む';
      });
    } else {
      // If content is short, ensure wrap isn't limiting it
      wrap.style.maxHeight = 'none';
    }
  });
})();

// =============================================
// CONTENT PROTECTION
// =============================================
(function() {
  // Prevent right-click
  document.addEventListener('contextmenu', e => {
    e.preventDefault();
  }, false);

  // Prevent image dragging
  document.addEventListener('dragstart', e => {
    if (e.target.tagName === 'IMG') {
      e.preventDefault();
    }
  }, false);
})();
