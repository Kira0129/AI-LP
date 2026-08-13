// ── タブ切り替え ──
function switchTab(e, id) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
  e.target.classList.add('active');
  document.getElementById(id).classList.add('active');
}

// ── スクロールリビール ──
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

// ── FV SLIDER ──
// 表示順 card[0]→[1]→[2]→[3]→[4]→[5]→[0]...
// Desktop : 対角3ポジション (topright=次, center=現在, botleft=前)
// Mobile  : 純粋な横スライダー (touch対応)
(function () {
  /* ---- 共通変数 ---- */
  const cards     = Array.from(document.querySelectorAll('.fv-card'));
  const dots      = Array.from(document.querySelectorAll('.fv-sdot'));
  const layer     = document.getElementById('fvCardsLayer');
  const captionEl = document.getElementById('fvCaption');
  const TOTAL     = cards.length;  // 6
  let cur         = 0;             // 現在centerのカードindex
  let busy        = false;
  let timer       = null;
  const isSP      = () => window.innerWidth <= 600;

  /* ---- ドット & キャプション ---- */
  function updateUI(idx) {
    dots.forEach((d, i) => d.classList.toggle('active', i === idx));
  }

  /* ================================================
     DESKTOP スライダー
  ================================================ */
  function getPos() {
    const W = layer.offsetWidth, H = layer.offsetHeight;
    const SW = Math.round(Math.min(Math.max(130, W*0.13), 185));
    const SH = Math.round(Math.min(Math.max(155, H*0.22), 220));
    const LW = Math.round(Math.min(Math.max(560, W*0.58), 820));
    const LH = Math.round(Math.min(Math.max(440, H*0.62), 640));
    return {
      center  : { t: Math.round((H-LH)/2), l: Math.round((W-LW)/2), w:LW, h:LH },
      topright: { t: 56,          l: W-SW-120,                       w:SW, h:SH },
      botleft : { t: H-SH-40,    l: 16,                              w:SW, h:SH },
      hidden  : { t: 56,          l: W-SW-120,                       w:SW, h:SH },
    };
  }

  function placeCard(card, p, animate) {
    if (!animate) { card.style.transition = 'none'; void card.offsetWidth; }
    card.style.top    = p.t + 'px';
    card.style.left   = p.l + 'px';
    card.style.width  = p.w + 'px';
    card.style.height = p.h + 'px';
    card.style.margin = '0';
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
      card.style.opacity      = '1';
      card.style.zIndex       = '4';
      card.style.borderRadius = '28px';
      card.style.boxShadow    = '8px 24px 64px rgba(0,0,0,0.30)';
      img.style.transition    = 'transform 6s cubic-bezier(.25,.46,.45,.94)';
      void img.offsetWidth;
      img.style.transform     = 'scale(1.1)';
    } else if (role === 'topright' || role === 'botleft') {
      card.style.opacity      = '1';
      card.style.zIndex       = '3';
      card.style.borderRadius = '16px';
      card.style.boxShadow    = '4px 10px 28px rgba(0,0,0,0.18)';
      img.style.transition    = 'transform 1s ease';
      img.style.transform     = 'scale(1)';
    } else {
      card.style.opacity      = '0';
      card.style.zIndex       = '1';
      img.style.transition    = 'none';
      img.style.transform     = 'scale(1)';
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
    const pos      = getPos();
    const prevPrev = (cur - 1 + TOTAL) % TOTAL;
    cur = nextIdx;
    cards[prevPrev].style.opacity    = '0';
    cards[prevPrev].style.zIndex     = '1';
    cards.forEach((card, i) => { if (i !== prevPrev) styleCard(card, roleOf(i, cur), pos, true); });
    setTimeout(() => {
      const h = pos.hidden;
      const c = cards[prevPrev];
      c.style.transition = 'none';
      c.style.top = h.t+'px'; c.style.left = h.l+'px';
      c.style.width = h.w+'px'; c.style.height = h.h+'px';
      void c.offsetWidth;
      c.style.transition = '';
    }, 950);
    updateUI(cur);
    setTimeout(() => { busy = false; }, 1050);
  }

  /* ================================================
     MOBILE スライダー
  ================================================ */
  let spWrap = null; let spTrack = null; let spBuilt = false;
  function buildSP() {
    if (spBuilt) return;
    spBuilt = true; layer.style.display = 'none';
    const fvBody = layer.parentElement;
    const fvEl   = fvBody.parentElement;
    const W      = fvEl.offsetWidth;
    const slideH = Math.round(W * 0.75);
    spWrap = document.createElement('div');
    spWrap.id = 'spSliderWrap';
    spWrap.style.cssText = `width:100%;height:${slideH}px;overflow:hidden;position:relative;z-index:8;flex-shrink:0;background:#000;`;
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
    if (dotRow) { spWrap.appendChild(dotRow); dotRow.style.bottom = '14px'; }
    fvBody.insertBefore(spWrap, fvBody.firstChild);
    let sx = 0, sy = 0, locked = null;
    spWrap.addEventListener('touchstart', e => { sx = e.touches[0].clientX; sy = e.touches[0].clientY; locked = null; }, { passive: true });
    spWrap.addEventListener('touchmove', e => {
      if (locked === null) {
        const dx = Math.abs(e.touches[0].clientX - sx);
        const dy = Math.abs(e.touches[0].clientY - sy);
        locked = dx > dy ? 'h' : 'v';
      }
      if (locked === 'h') e.preventDefault();
    }, { passive: false });
    spWrap.addEventListener('touchend', e => {
      if (locked !== 'h') return;
      const dx = e.changedTouches[0].clientX - sx;
      if      (dx < -40) spGo((cur+1) % TOTAL);
      else if (dx >  40) spGo((cur-1+TOTAL) % TOTAL);
    });
    spGo(cur, false);
  }

  function spGo(idx, animate = true) {
    cur = idx;
    const fvEl = layer.parentElement.parentElement;
    const W = fvEl.offsetWidth;
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
      if (isSP()) spGo(next);
      else        desktopGo(next);
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
    if (isSP()) { if (!spBuilt) buildSP(); else spGo(cur, false); }
    else { if (spBuilt) { destroySP(); desktopInit(); } else { const pos = getPos(); cards.forEach((c, i) => styleCard(c, roleOf(i, cur), pos, false)); } }
  });

  if (isSP()) buildSP(); else desktopInit();
  startTimer();
})();

// ── LIGHTBOX ──
function openLightbox(el) {
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightboxImg');
  const src = el.querySelector('img').src;
  lbImg.src = src;
  lb.style.display = 'flex';
  document.body.style.overflow = 'hidden'; // 背景スクロール禁止
}

function closeLightbox() {
  const lb = document.getElementById('lightbox');
  lb.style.display = 'none';
  document.body.style.overflow = '';
}

// ── BACK TO TOP ──
const backToTop = document.getElementById('backToTop');
if (backToTop) {
  console.log('BackToTop found');
  window.addEventListener('scroll', () => {
    const scrollPos = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollPos > 200) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ── HAMBURGER MENU ──
const menuBtn = document.getElementById('menuBtn');
const spLinks = document.querySelectorAll('.hd-sp-links a');

if (menuBtn) {
  menuBtn.addEventListener('click', () => {
    document.documentElement.classList.toggle('nav-open');
  });
}

spLinks.forEach(link => {
  link.addEventListener('click', () => {
    document.documentElement.classList.remove('nav-open');
  });
});
