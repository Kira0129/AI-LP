document.addEventListener('DOMContentLoaded', () => {

    // Disable Right Click
    document.addEventListener('contextmenu', event => event.preventDefault());

    // 1. Swiper Init: FV (4枚に変更、ループや自動再生は維持)
    const fvSwiper = new Swiper('.fv-swiper', {
        effect: 'fade',
        fadeEffect: { crossFade: true },
        loop: true,
        speed: 2000,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        allowTouchMove: true, 
    });

    // 2. Swiper Init: Voice
    const voiceSwiper = new Swiper('.voice-swiper', {
        loop: true,
        speed: 800,
        spaceBetween: 20,
        slidesPerView: 1.1,
        centeredSlides: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        breakpoints: {
            768: {
                slidesPerView: 3,
                spaceBetween: 30,
                centeredSlides: false,
            }
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        }
    });

    // 3. Hamburger Menu
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const spNav = document.getElementById('sp-nav');
    const navLinks = document.querySelectorAll('.sp-nav-link');

    hamburgerBtn.addEventListener('click', () => {
        const isActive = hamburgerBtn.classList.toggle('active');
        if (isActive) {
            spNav.style.opacity = '1';
            spNav.style.pointerEvents = 'auto';
        } else {
            spNav.style.opacity = '0';
            spNav.style.pointerEvents = 'none';
        }
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburgerBtn.classList.remove('active');
            spNav.style.opacity = '0';
            spNav.style.pointerEvents = 'none';
        });
    });

    // 4. Scroll Animations (Intersection Observer)
    const fadeElements = document.querySelectorAll('.fade-in-up');
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-valid');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => observer.observe(el));

    // 5. Scroll to Top Button
    const scrollToTopBtn = document.getElementById('scrollToTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.pointerEvents = 'auto';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.pointerEvents = 'none';
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 6. Floating Header Scroll Trigger (PC: Recommendation到達時, SP: ABOUT到達時)
    const globalHeader = document.getElementById('global-header');
    const spGlobalHeader = document.getElementById('sp-global-header');
    const recommendationSection = document.getElementById('recommendation');
    const aboutSpSection = document.getElementById('about-sp');

    window.addEventListener('scroll', () => {
        const isPC = window.innerWidth >= 1024;

        if (isPC) {
            // PC: Recommendation セクション到達時にヘッダーをスライドイン
            if (recommendationSection && globalHeader) {
                const rect = recommendationSection.getBoundingClientRect();
                const shouldShow = rect.top <= 80;
                if (shouldShow) {
                    globalHeader.classList.remove('-translate-y-full', 'opacity-0', 'pointer-events-none');
                    globalHeader.classList.add('translate-y-0', 'opacity-100', 'pointer-events-auto');
                } else {
                    globalHeader.classList.remove('translate-y-0', 'opacity-100', 'pointer-events-auto');
                    globalHeader.classList.add('-translate-y-full', 'opacity-0', 'pointer-events-none');
                }
            }
            // SP用ヘッダーは強制非表示
            if (spGlobalHeader) {
                spGlobalHeader.classList.remove('translate-y-0', 'opacity-100', 'pointer-events-auto');
                spGlobalHeader.classList.add('-translate-y-full', 'opacity-0', 'pointer-events-none');
            }
        } else {
            // SP: ABOUT (当店の想い) セクション到達時にヘッダーをスライドイン
            if (aboutSpSection && spGlobalHeader) {
                const rect = aboutSpSection.getBoundingClientRect();
                const shouldShow = rect.top <= 80;
                if (shouldShow) {
                    spGlobalHeader.classList.remove('-translate-y-full', 'opacity-0', 'pointer-events-none');
                    spGlobalHeader.classList.add('translate-y-0', 'opacity-100', 'pointer-events-auto');
                } else {
                    spGlobalHeader.classList.remove('translate-y-0', 'opacity-100', 'pointer-events-auto');
                    spGlobalHeader.classList.add('-translate-y-full', 'opacity-0', 'pointer-events-none');
                }
            }
            // PC用ヘッダーは強制非表示
            if (globalHeader) {
                globalHeader.classList.remove('translate-y-0', 'opacity-100', 'pointer-events-auto');
                globalHeader.classList.add('-translate-y-full', 'opacity-0', 'pointer-events-none');
            }
        }
    }, { passive: true });
    
    // Modal Functions
    window.openModal = function(imageSrc) {
        const modal = document.getElementById('imageModal');
        const modalImg = document.getElementById('modalImage');
        modalImg.src = imageSrc;
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        setTimeout(() => {
            modal.classList.remove('opacity-0');
            modal.classList.add('opacity-100');
        }, 10);
    };

    window.closeModal = function() {
        const modal = document.getElementById('imageModal');
        modal.classList.remove('opacity-100');
        modal.classList.add('opacity-0');
        setTimeout(() => {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }, 300);
    };

    document.getElementById('closeModalBtn').addEventListener('click', closeModal);
    document.getElementById('imageModal').addEventListener('click', (e) => {
        if (e.target.id === 'imageModal') {
            closeModal();
        }
    });

    // 7. 口コミの「続きを読む」開閉制御
    const readMoreBtns = document.querySelectorAll('.read-more-btn');
    readMoreBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const textEl = btn.previousElementSibling;
            const isClamped = textEl.classList.contains('line-clamp-3');
            if (isClamped) {
                textEl.classList.remove('line-clamp-3', 'overflow-hidden');
                btn.textContent = '閉じる';
                if (voiceSwiper && voiceSwiper.autoplay) {
                    voiceSwiper.autoplay.stop();
                }
            } else {
                textEl.classList.add('line-clamp-3', 'overflow-hidden');
                btn.textContent = '続きを読む';
                if (voiceSwiper && voiceSwiper.autoplay) {
                    voiceSwiper.autoplay.start();
                }
            }
            if (voiceSwiper) {
                voiceSwiper.update();
            }
        });
    });

    // 8. 画像・動画のドラッグ禁止
    document.querySelectorAll('img, video').forEach(el => {
        el.addEventListener('dragstart', e => e.preventDefault());
    });
});
