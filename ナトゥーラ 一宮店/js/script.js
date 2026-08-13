document.addEventListener('DOMContentLoaded', () => {
    // Swiper: First View
    const curNum = document.getElementById('curNum');
    const fvSwiper = new Swiper('.fv-swiper', {
        loop: true,
        effect: 'fade',
        fadeEffect: { crossFade: true },
        autoplay: { delay: 5000, disableOnInteraction: false },
        speed: 2000,
        on: {
            slideChange: function () {
                if (curNum) {
                    curNum.textContent = (this.realIndex + 1).toString().padStart(2, '0');
                }
            }
        }
    });

    // Swiper: Voice
    const voiceSwiper = new Swiper('.voice-swiper', {
        slidesPerView: 1,
        spaceBetween: 20,
        pagination: { el: '.swiper-pagination', clickable: true },
        breakpoints: { 768: { slidesPerView: 2, spaceBetween: 30 } }
    });

    // Hamburger Menu
    const burger = document.getElementById('burger');
    const drawer = document.getElementById('drawer');
    const closeBtn = document.getElementById('close-drawer');
    const closeMenu = () => {
        drawer.classList.remove('active');
        document.body.style.overflow = '';
    };
    if(burger) burger.addEventListener('click', () => { drawer.classList.add('active'); document.body.style.overflow = 'hidden'; });
    if(closeBtn) closeBtn.addEventListener('click', closeMenu);
    drawer.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if(href === '#') return;
            e.preventDefault();
            const target = document.querySelector(href);
            if(target) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });

    // Scroll Reveal
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // Scroll Events for Back to Top & Bottom CTA
    const backToTopBtn = document.getElementById('back-to-top');
    const bottomCta = document.querySelector('.bottom-cta');
    const tvSection = document.getElementById('tv');

    window.addEventListener('scroll', () => {
        // Back to Top
        if (backToTopBtn) {
            if (window.scrollY > 500) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        }
        
        // Bottom CTA (Show when reached TV section)
        if (bottomCta && tvSection) {
            const tvTop = tvSection.getBoundingClientRect().top + window.pageYOffset;
            if (window.scrollY > tvTop - window.innerHeight / 2) {
                bottomCta.classList.add('show');
            } else {
                bottomCta.classList.remove('show');
            }
        }
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Voice Read More
    const voiceTexts = document.querySelectorAll('.voice-text');
    voiceTexts.forEach(text => {
        const checkClamp = () => {
            // scrollHeight > clientHeight なら省略されていると判定
            if (text.scrollHeight > text.clientHeight) {
                const btn = text.nextElementSibling;
                if (btn && btn.classList.contains('voice-read-more')) {
                    btn.classList.remove('hidden');
                    
                    btn.addEventListener('click', function() {
                        if (text.classList.contains('line-clamp-5')) {
                            text.classList.remove('line-clamp-5');
                            this.textContent = '閉じる';
                        } else {
                            text.classList.add('line-clamp-5');
                            this.textContent = '続きを読む';
                        }
                    });
                }
            }
        };
        // レイアウト確定後に判定するため少し遅延させる
        setTimeout(checkClamp, 500);
    });

    // Disable Image Save (Context Menu & Drag)
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('contextmenu', e => e.preventDefault());
        img.addEventListener('dragstart', e => e.preventDefault());
    });

    // iOS Safari Fixed Background Workaround
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    if (isIOS) {
        const fixedBgs = document.querySelectorAll('.bg-fixed');
        
        const updateHeight = () => {
            fixedBgs.forEach(bg => {
                bg.style.height = window.innerHeight + 'px';
            });
        };

        fixedBgs.forEach(bg => {
            bg.classList.remove('bg-fixed', 'inset-0');
            bg.classList.add('top-0', 'left-0', 'w-full');
            bg.style.backgroundAttachment = 'scroll';
        });

        const updateParallax = () => {
            fixedBgs.forEach(bg => {
                const rect = bg.parentElement.getBoundingClientRect();
                bg.style.transform = `translateY(${-rect.top}px)`;
            });
        };
        
        window.addEventListener('resize', updateHeight);
        updateHeight();
        
        window.addEventListener('scroll', updateParallax, { passive: true });
        updateParallax();
    }
});
