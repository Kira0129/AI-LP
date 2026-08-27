document.addEventListener('DOMContentLoaded', () => {
  // 1. FV Slider Logic
  const cards = Array.from(document.querySelectorAll('.fv-card'));
  const dots = Array.from(document.querySelectorAll('.fv-sdot'));
  const layer = document.getElementById('fvCardsLayer');
  const TOTAL = cards.length;
  let cur = 0;
  let busy = false;
  let timer = null;
  const isSP = () => window.innerWidth <= 600;

  // Add dot elements if PC
  const dotRow = document.createElement('div');
  dotRow.className = 'fv-dot-row';
  cards.forEach((_, i) => {
    const d = document.createElement('div');
    d.className = 'fv-sdot' + (i === 0 ? ' active' : '');
    dotRow.appendChild(d);
    dots.push(d);
  });
  document.querySelector('.fv').appendChild(dotRow);

  function updateUI(idx) {
    dots.forEach((d, i) => d.classList.toggle('active', i === idx));
  }

  function getPos() {
    const W = layer.offsetWidth, H = layer.offsetHeight;
    const SW = Math.round(Math.min(Math.max(130, W * 0.13), 185));
    const SH = Math.round(Math.min(Math.max(155, H * 0.22), 220));
    let LW = Math.round(Math.min(Math.max(560, W * 0.55), 800));
    let LH = Math.round(Math.min(Math.max(440, H * 0.62), 640));
    const safeRight = W - Math.max(280, W * 0.22);
    let trL = safeRight - SW - 20;
    let cL = Math.round((W - LW) / 2) - 160;
    if (cL < 60) cL = 60;
    if (cL + LW > safeRight) {
      cL = safeRight - LW;
      if (cL < 60) { cL = 60; LW = safeRight - 60; }
    }
    return {
      center: { t: Math.round((H - LH) / 2), l: cL, w: LW, h: LH },
      topright: { t: 64, l: trL, w: SW, h: SH },
      botleft: { t: H - SH - 40, l: 32, w: SW, h: SH },
      hidden: { t: 64, l: trL, w: SW, h: SH },
    };
  }

  function placeCard(card, p, animate) {
    if (!animate) { card.style.transition = 'none'; void card.offsetWidth; }
    card.style.top = p.t + 'px'; card.style.left = p.l + 'px';
    card.style.width = p.w + 'px'; card.style.height = p.h + 'px';
    if (!animate) { void card.offsetWidth; card.style.transition = ''; }
  }

  function roleOf(i, c) {
    if (i === c) return 'center';
    if (i === (c + 1) % TOTAL) return 'topright';
    if (i === (c - 1 + TOTAL) % TOTAL) return 'botleft';
    return 'hidden';
  }

  function styleCard(card, role, pos, animate) {
    const p = pos[role === 'hidden' ? 'hidden' : role];
    const img = card.querySelector('img');
    placeCard(card, p, animate);
    if (role === 'center') {
      card.style.opacity = '1'; card.style.zIndex = '4';
      card.className = 'fv-card pos-center';
      img.style.transition = 'transform 6s cubic-bezier(.25,.46,.45,.94)';
      void img.offsetWidth; img.style.transform = 'scale(1.1)';
    } else if (role === 'topright' || role === 'botleft') {
      card.style.opacity = '1'; card.style.zIndex = '3';
      card.className = `fv-card pos-${role}`;
      img.style.transition = 'transform 1s ease'; img.style.transform = 'scale(1)';
    } else {
      card.style.opacity = '0'; card.style.zIndex = '1';
      card.className = 'fv-card pos-hidden';
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
    cards[prevPrev].style.opacity = '0'; cards[prevPrev].style.zIndex = '1';
    cards.forEach((card, i) => { if (i !== prevPrev) styleCard(card, roleOf(i, cur), pos, true); });
    setTimeout(() => {
      const h = pos.hidden; const c = cards[prevPrev];
      c.style.transition = 'none'; c.style.top = h.t + 'px'; c.style.left = h.l + 'px';
      c.style.width = h.w + 'px'; c.style.height = h.h + 'px';
      void c.offsetWidth; c.style.transition = '';
    }, 950);
    updateUI(cur);
    setTimeout(() => { busy = false; }, 1050);
  }

  let spWrap = null, spTrack = null, spBuilt = false;

  function buildSP() {
    if (spBuilt) return;
    spBuilt = true;
    layer.style.display = 'none';
    const fvBody = layer.parentElement;
    const W = fvBody.parentElement.offsetWidth;
    const slideH = Math.round(W * 0.8);

    spWrap = document.createElement('div');
    spWrap.id = 'spSliderWrap';
    
    spTrack = document.createElement('div');
    spTrack.style.cssText = 'display:flex;height:100%;transition:transform .6s ease;will-change:transform;';

    cards.forEach((card) => {
      const cell = document.createElement('div');
      cell.style.cssText = `flex:0 0 ${W}px;width:${W}px;height:100%;overflow:hidden;`;
      const img = card.querySelector('img').cloneNode(true);
      img.style.cssText = 'width:100%;height:100%;object-fit:cover;display:block;';
      cell.appendChild(img); spTrack.appendChild(cell);
    });

    spWrap.appendChild(spTrack);
    const dr = document.querySelector('.fv-dot-row');
    if (dr) { spWrap.appendChild(dr); dr.style.bottom = '16px'; }
    fvBody.insertBefore(spWrap, fvBody.firstChild);

    let sx = 0;
    spWrap.addEventListener('touchstart', e => { sx = e.touches[0].clientX; }, { passive: true });
    spWrap.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - sx;
      if (dx < -40) spGo((cur + 1) % TOTAL);
      else if (dx > 40) spGo((cur - 1 + TOTAL) % TOTAL);
    });
    spGo(cur, false);
  }

  function spGo(idx, animate = true) {
    cur = idx;
    const W = window.innerWidth;
    if (!animate) spTrack.style.transition = 'none';
    spTrack.style.transform = `translateX(-${idx * W}px)`;
    if (!animate) { void spTrack.offsetWidth; spTrack.style.transition = ''; }
    updateUI(cur);
  }

  function destroySP() {
    if (!spBuilt) return;
    spBuilt = false;
    const dr = document.querySelector('.fv-dot-row');
    const fv = layer.parentElement;
    if (dr && fv) { fv.appendChild(dr); dr.style.bottom = '24px'; }
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

  window.addEventListener('resize', () => {
    if (isSP()) { if (!spBuilt) buildSP(); else spGo(cur, false); }
    else { if (spBuilt) { destroySP(); desktopInit(); } else { const pos = getPos(); cards.forEach((c, i) => styleCard(c, roleOf(i, cur), pos, false)); } }
  });

  if (isSP()) buildSP(); else desktopInit();
  startTimer();

  // 2. Scroll Reveal
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

  // 3. Hamburger Menu
  const btn = document.getElementById('hdHamburger');
  const overlay = document.getElementById('spMenuOverlay');
  function closeMenu() { btn.classList.remove('is-open'); overlay.classList.remove('is-open'); document.body.style.overflow = ''; }
  if (btn) {
    btn.addEventListener('click', () => {
      if (btn.classList.contains('is-open')) closeMenu();
      else { btn.classList.add('is-open'); overlay.classList.add('is-open'); document.body.style.overflow = 'hidden'; }
    });
    overlay.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  }

  // 4. Page Top Button
  const ptBtn = document.getElementById('pageTopBtn');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) ptBtn.classList.add('is-show');
    else ptBtn.classList.remove('is-show');
  }, { passive: true });
  ptBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // 5. Voice Text Clamp
  const voiceTexts = document.querySelectorAll('.voice-text');
  // Check after font load or immediate
  const checkClamp = () => {
    voiceTexts.forEach(p => {
      // Remove any existing buttons just in case
      const existingBtn = p.parentNode.querySelector('.voice-read-more');
      if (existingBtn) existingBtn.remove();
      
      p.classList.add('clamped');
      if (p.scrollHeight > p.clientHeight) {
        const btn = document.createElement('button');
        btn.className = 'voice-read-more';
        btn.textContent = '続きを読む';
        p.parentNode.insertBefore(btn, p.nextSibling);
        
        btn.addEventListener('click', () => {
          if (p.classList.contains('clamped')) {
            p.classList.remove('clamped');
            btn.textContent = '閉じる';
          } else {
            p.classList.add('clamped');
            btn.textContent = '続きを読む';
          }
        });
      }
    });
  };
  
  // Run on load and after fonts to ensure correct height calculation
  checkClamp();
  window.addEventListener('load', checkClamp);
});
