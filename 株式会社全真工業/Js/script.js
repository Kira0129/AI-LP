document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Scroll Reveal Animation (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    revealElements.forEach(el => revealObserver.observe(el));

    // Initialize Swiper
    const initSwiper = () => {
        const heroSwiperEl = document.querySelector('.hero-swiper');
        if (heroSwiperEl && typeof Swiper !== 'undefined') {
            new Swiper('.hero-swiper', {
                loop: true,
                effect: 'fade',
                fadeEffect: { crossFade: true },
                speed: 1500,
                autoplay: {
                    delay: 4000,
                    disableOnInteraction: false,
                },
                pagination: {
                    el: '.hero-pagination',
                    clickable: true,
                },
            });
        }
    };

    if (typeof Swiper !== 'undefined') {
        initSwiper();
    } else {
        setTimeout(initSwiper, 500);
    }

    // Back to Top Button Logic
    const pageTopBtn = document.getElementById('page-top');
    if (pageTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                pageTopBtn.classList.add('is-visible');
            } else {
                pageTopBtn.classList.remove('is-visible');
            }
        });
        pageTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Hamburger Menu Logic
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    if (hamburgerBtn && navLinks) {
        hamburgerBtn.addEventListener('click', () => {
            hamburgerBtn.classList.toggle('is-open');
            navLinks.classList.toggle('is-open');
        });
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                hamburgerBtn.classList.remove('is-open');
                navLinks.classList.remove('is-open');
            });
        });
    }
});
