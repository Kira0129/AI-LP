document.addEventListener('DOMContentLoaded', () => {

    // Disable Right Click
    document.addEventListener('contextmenu', event => event.preventDefault());

    // 1. Swiper Init: FV (4枚)
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

    // 1.5 Swiper Init: Info (自動ループスライダー)
    const infoSwiper = new Swiper('.info-swiper', {
        loop: true,
        speed: 4000, // スライドが流れる速度（ミリ秒）
        slidesPerView: 1.5,
        spaceBetween: 16,
        autoplay: {
            delay: 0, // 途切れず流れるように0に設定
            disableOnInteraction: false,
        },
        breakpoints: {
            768: {
                slidesPerView: 2.5,
                spaceBetween: 24,
            }
        }
    });

    // 1.6 Swiper Init: Tasting (試飲銘柄スライダー)
    const tastingSwiper = new Swiper('.tasting-swiper', {
        effect: 'fade',
        fadeEffect: { crossFade: true },
        loop: true,
        speed: 1500,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        allowTouchMove: true, 
    });

    // 2. Hamburger Menu
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

    // 3. Scroll Animations (Intersection Observer)
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

    // 4. Scroll to Top Button
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

    // 5. Floating Header Scroll Trigger
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
            if (spGlobalHeader) {
                spGlobalHeader.classList.remove('translate-y-0', 'opacity-100', 'pointer-events-auto');
                spGlobalHeader.classList.add('-translate-y-full', 'opacity-0', 'pointer-events-none');
            }
        } else {
            // SP: ABOUTセクション到達時にヘッダーをスライドイン
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
            if (globalHeader) {
                globalHeader.classList.remove('translate-y-0', 'opacity-100', 'pointer-events-auto');
                globalHeader.classList.add('-translate-y-full', 'opacity-0', 'pointer-events-none');
            }
        }
    }, { passive: true });

    // 画像のドラッグ禁止
    document.querySelectorAll('img').forEach(el => {
        el.addEventListener('dragstart', e => e.preventDefault());
    });

    // Modal Functions (画像拡大)
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

    const closeModalBtn = document.getElementById('closeModalBtn');
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }
    const imageModal = document.getElementById('imageModal');
    if (imageModal) {
        imageModal.addEventListener('click', (e) => {
            // 背景クリック時のみ閉じる（画像クリック時は閉じない）
            if (e.target.id === 'imageModal') {
                closeModal();
            }
        });
    }
});
