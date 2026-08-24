document.addEventListener('DOMContentLoaded', () => {
    // Disable Right Click
    document.addEventListener('contextmenu', event => event.preventDefault());

    // 1. FV SLIDER (Nishikawa 3-Position System)
    (function () {
        const cards = Array.from(document.querySelectorAll('.fv-card'));
        const dots = Array.from(document.querySelectorAll('.fv-sdot'));
        const layer = document.getElementById('fvCardsLayer');
        if (!layer) return;

        const TOTAL = cards.length;
        let cur = 0;
        let busy = false;
        let timer = null;
        const isSP = () => window.innerWidth <= 600;

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

            let cL = Math.round((W - LW) / 2) - 180;
            if (cL < 80) cL = 80;

            if (cL + LW > safeRight) {
                cL = safeRight - LW;
                if (cL < 80) {
                    cL = 80;
                    LW = safeRight - 80;
                }
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
            card.style.top = p.t + 'px';
            card.style.left = p.l + 'px';
            card.style.width = p.w + 'px';
            card.style.height = p.h + 'px';
            card.style.margin = '0';
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
                card.style.borderRadius = '20px';
                card.style.boxShadow = '8px 24px 64px rgba(0, 0, 0, .15)';
                img.style.transition = 'transform 6s cubic-bezier(.25, .46, .45, .94)';
                void img.offsetWidth;
                img.style.transform = 'scale(1.1)';
            } else if (role === 'topright' || role === 'botleft') {
                card.style.opacity = '1'; card.style.zIndex = '3';
                card.style.borderRadius = '12px';
                card.style.boxShadow = '4px 10px 28px rgba(0, 0, 0, .1)';
                img.style.transition = 'transform 1s ease';
                img.style.transform = 'scale(1)';
            } else {
                card.style.opacity = '0'; card.style.zIndex = '1';
                img.style.transition = 'none';
                img.style.transform = 'scale(1)';
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
                c.style.top = h.t + 'px'; c.style.left = h.l + 'px';
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
            const fvEl = fvBody.parentElement;
            const W = fvEl.offsetWidth;

            spWrap = document.createElement('div');
            spWrap.id = 'spSliderWrap';
            spTrack = document.createElement('div');
            spTrack.id = 'spTrack';
            spTrack.style.cssText = 'display:flex;height:100%;transition:transform .72s cubic-bezier(.4, 0, .2, 1);will-change:transform;';

            cards.forEach((card) => {
                const cell = document.createElement('div');
                cell.style.cssText = `flex:0 0 ${W}px;width:${W}px;height:100%;overflow:hidden;position:relative;`;
                const img = card.querySelector('img').cloneNode(true);
                img.style.cssText = 'width:100%;height:100%;object-fit:cover;display:block;';
                cell.appendChild(img);
                spTrack.appendChild(cell);
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
                if (dx < -40) spGo((cur + 1) % TOTAL);
                else if (dx > 40) spGo((cur - 1 + TOTAL) % TOTAL);
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

    // Hamburger
    const btn = document.getElementById('hdHamburger');
    const overlay = document.getElementById('spMenuOverlay');
    function closeMenu() {
        if(!btn) return;
        btn.classList.remove('is-open'); overlay.classList.remove('is-open');
        btn.setAttribute('aria-expanded', 'false'); document.body.style.overflow = '';
    }
    if(btn && overlay) {
        btn.addEventListener('click', () => {
            if (btn.classList.contains('is-open')) { closeMenu(); } 
            else {
                btn.classList.add('is-open'); overlay.classList.add('is-open');
                btn.setAttribute('aria-expanded', 'true'); document.body.style.overflow = 'hidden';
            }
        });
        overlay.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
    }

    // Scroll Animation
    const observerOptions = { root: null, rootMargin: '0px 0px -100px 0px', threshold: 0.1 };
    const observer1 = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-valid'); observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    document.querySelectorAll('.fade-in-up').forEach(el => observer1.observe(el));

    const observer2 = new IntersectionObserver((entries) => {
        entries.forEach((e, i) => {
            if (e.isIntersecting) {
                setTimeout(() => e.target.classList.add('visible'), i * 80);
                observer2.unobserve(e.target);
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer2.observe(el));

    // Scroll to Top
    const scrollToTopBtn = document.getElementById('scrollToTop');
    window.addEventListener('scroll', () => {
        if (!scrollToTopBtn) return;
        if (window.scrollY > 500) { scrollToTopBtn.style.opacity = '1'; scrollToTopBtn.style.pointerEvents = 'auto'; } 
        else { scrollToTopBtn.style.opacity = '0'; scrollToTopBtn.style.pointerEvents = 'none'; }
    });
    if (scrollToTopBtn) scrollToTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    // SP CTA observer
    const spFixedCta = document.getElementById('spFixedCta');
    const footer = document.querySelector('footer');
    if (spFixedCta && footer) {
        new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) spFixedCta.classList.add('translate-y-full', 'opacity-0', 'pointer-events-none');
                else spFixedCta.classList.remove('translate-y-full', 'opacity-0', 'pointer-events-none');
            });
        }, { threshold: 0.1 }).observe(footer);
    }
});
