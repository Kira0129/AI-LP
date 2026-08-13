document.addEventListener('DOMContentLoaded', () => {
    // 1. Swiper Init: FV
    const fvSwiper = new Swiper('.fv-swiper', {
        effect: 'fade',
        fadeEffect: { crossFade: true },
        loop: true,
        speed: 2000,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        allowTouchMove: false, 
    });

    // 2. Swiper Init: Voice
    const voiceSwiper = new Swiper('.voice-swiper', {
        loop: true,
        speed: 800,
        spaceBetween: 20,
        slidesPerView: 1.1,
        centeredSlides: true,
        autoplay: {
            delay: 4000,
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
        rootMargin: '0px 0px -50px 0px',
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

    // 6. Floating Header Scroll Trigger
    const globalHeader = document.getElementById('global-header');
    const spGlobalHeader = document.getElementById('sp-global-header');
    const recommendationSection = document.getElementById('recommendation');
    const aboutSpSection = document.getElementById('about');

    window.addEventListener('scroll', () => {
        const isPC = window.innerWidth >= 1024;

        if (isPC) {
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
});
