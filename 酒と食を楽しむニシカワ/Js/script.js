// =============================================
// SLIDER — 表示順 card[0]→[1]→[2]→[3]→[4]→[5]→[0]...
// Desktop : 対角3ポジション (topright=次, center=現在, botleft=前)
// Mobile  : 純粋な横スライダー (touch対応)
// =============================================
(function () {

  /* ---- 共通変数 ---- */
  const cards     = Array.from(document.querySelectorAll('.fv-card'));
  const dots      = Array.from(document.querySelectorAll('.fv-sdot'));
  const layer     = document.getElementById('fvCardsLayer');
  const TOTAL     = cards.length;  // 6
  let cur         = 0;             // 現在centerのカードindex
  let busy        = false;
  let timer       = null;
  const isSP      = () => window.innerWidth <= 600;

  /* ---- ドット & UI更新 ---- */
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

  // カードごとのrole決定 (centerIdx基準)
  // center=cur, topright=cur+1(次), botleft=cur-1(前), other=hidden
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
      card.style.boxShadow    = '8px 24px 64px rgba(0,0,0,.30)';
      img.style.transition    = 'transform 6s cubic-bezier(.25,.46,.45,.94)';
      void img.offsetWidth;
      img.style.transform     = 'scale(1.1)';
    } else if (role === 'topright' || role === 'botleft') {
      card.style.opacity      = '1';
      card.style.zIndex       = '3';
      card.style.borderRadius = '16px';
      card.style.boxShadow    = '4px 10px 28px rgba(0,0,0,.18)';
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

  // nextIdxへ前進 (常に +1 方向)
  function desktopGo(nextIdx) {
    if (busy) return;
    busy = true;
    const pos      = getPos();
    const prevIdx  = cur;
    const prevPrev = (cur - 1 + TOTAL) % TOTAL; // botleftだったカード→hidden

    cur = nextIdx;

    // prevPrev: botleft→hidden (フェードアウト)
    cards[prevPrev].style.opacity    = '0';
    cards[prevPrev].style.zIndex     = '1';

    // 全カードを新roleで再配置 (prevPrev以外)
    cards.forEach((card, i) => {
      if (i === prevPrev) return;
      styleCard(card, roleOf(i, cur), pos, true);
    });

    // prevPrev を hidden座標へ静かにスナップ (1秒後)
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
     MOBILE スライダー (横スクロール)
  ================================================ */
  let spWrap   = null;
  let spTrack  = null;
  let spBuilt  = false;

  function buildSP() {
    if (spBuilt) return;
    spBuilt = true;
    layer.style.display = 'none';

    const fvBody = layer.parentElement; // .fv-body
    const fvEl   = fvBody.parentElement; // .fv
    const W      = fvEl.offsetWidth;
    const slideH = Math.round(W * 0.75); // 4:3

    spWrap = document.createElement('div');
    spWrap.id = 'spSliderWrap';
    spWrap.style.cssText = `width:100%;height:${slideH}px;overflow:hidden;position:relative;z-index:8;flex-shrink:0;background:#000;`;

    spTrack = document.createElement('div');
    spTrack.id = 'spTrack';
    // スムーズなイージング (Material motion)
    spTrack.style.cssText = 'display:flex;height:100%;transition:transform .72s cubic-bezier(.4,0,.2,1);will-change:transform;';

    cards.forEach((card) => {
      const cell = document.createElement('div');
      cell.style.cssText = `flex:0 0 ${W}px;width:${W}px;height:100%;overflow:hidden;position:relative;`;

      const img = card.querySelector('img').cloneNode(true);
      img.style.cssText = 'width:100%;height:100%;object-fit:cover;display:block;';

      cell.appendChild(img);
      spTrack.appendChild(cell);
    });

    spWrap.appendChild(spTrack);

    // ドット行をスライダー内に移動
    const dotRow = document.querySelector('.fv-dot-row');
    if (dotRow) { spWrap.appendChild(dotRow); dotRow.style.bottom = '14px'; }

    // fv-bodyの最初の子として挿入（テキストより上）
    fvBody.insertBefore(spWrap, fvBody.firstChild);

    // タッチスワイプ (横スワイプ時は縦スクロール抑制)
    let sx = 0, sy = 0, locked = null;
    spWrap.addEventListener('touchstart', e => {
      sx = e.touches[0].clientX;
      sy = e.touches[0].clientY;
      locked = null;
    }, { passive: true });
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
    const fvEl = layer.parentElement.parentElement; // .fv
    const W = fvEl.offsetWidth;
    if (!animate) spTrack.style.transition = 'none';
    spTrack.style.transform = `translateX(-${idx * W}px)`;
    if (!animate) { void spTrack.offsetWidth; spTrack.style.transition = ''; }
    updateUI(cur);
  }

  function destroySP() {
    if (!spBuilt) return;
    spBuilt = false;
    // ドット行を.fvに戻す
    const dotRow = document.querySelector('.fv-dot-row');
    const fv = layer.parentElement.parentElement;
    if (dotRow && fv) { fv.appendChild(dotRow); dotRow.style.bottom = ''; }
    if (spWrap) { spWrap.remove(); spWrap = null; spTrack = null; }
    layer.style.display = '';
  }

  /* ================================================
     タイマー & ドットクリック & リサイズ
  ================================================ */
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
      if (isSP()) spGo(idx);
      else        desktopGo(idx);
      startTimer();
    });
  });

  // デスクトップ: ホバー一時停止
  layer.addEventListener('mouseenter', () => clearInterval(timer));
  layer.addEventListener('mouseleave', startTimer);

  window.addEventListener('resize', () => {
    if (isSP()) {
      if (!spBuilt) { buildSP(); }
      else { spGo(cur, false); }
    } else {
      if (spBuilt) { destroySP(); desktopInit(); }
      else {
        const pos = getPos();
        cards.forEach((c, i) => styleCard(c, roleOf(i, cur), pos, false));
      }
    }
  });

  /* ---- 起動 ---- */
  if (isSP()) { buildSP(); }
  else        { desktopInit(); }
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

// ===== HAMBURGER MENU =====
(function () {
  const btn     = document.getElementById('hdHamburger');
  const overlay = document.getElementById('spMenuOverlay');
  if (!btn || !overlay) return;

  function openMenu() {
    btn.classList.add('is-open');
    overlay.classList.add('is-open');
    btn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    btn.classList.remove('is-open');
    overlay.classList.remove('is-open');
    btn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  btn.addEventListener('click', () => {
    btn.classList.contains('is-open') ? closeMenu() : openMenu();
  });

  // メニューリンクをクリックしたら閉じる
  overlay.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', closeMenu);
  });
})();

// ===== BACK TO TOP =====
(function () {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      btn.classList.add('is-visible');
    } else {
      btn.classList.remove('is-visible');
    }
  });

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
})();

// ===== 画像保存の防止 (右クリック・ドラッグ禁止) =====
document.addEventListener('contextmenu', function(e) {
  // Webサイト全体で右クリックを禁止
  e.preventDefault();
}, { passive: false });

document.addEventListener('dragstart', function(e) {
  if (e.target.tagName === 'IMG') {
    e.preventDefault();
  }
}, { passive: false });
