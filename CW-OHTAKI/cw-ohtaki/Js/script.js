// AUTO COAT Script
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Protection: Disable right click and image drag
    document.addEventListener('contextmenu', e => e.preventDefault());
    document.addEventListener('dragstart', e => {
        if (e.target.tagName === 'IMG') e.preventDefault();
    });

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
                fadeEffect: {
                    crossFade: true
                },
                speed: 1500, // 1.5 seconds for fade
                autoplay: {
                    delay: 4000,
                    disableOnInteraction: false, // Continue autoplay after interaction
                },
                pagination: {
                    el: '.hero-pagination',
                    clickable: true, // Allow manual switching
                },
            });
        }

        const swiperEl = document.querySelector('.staff-swiper');
        if (swiperEl && typeof Swiper !== 'undefined') {
            new Swiper('.staff-swiper', {
                loop: true,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                autoplay: {
                    delay: 5000,
                },
            });
        }
    };

    // Try initializing, or wait a bit if Swiper isn't ready
    if (typeof Swiper !== 'undefined') {
        initSwiper();
    } else {
        setTimeout(initSwiper, 500);
    }

    // Back to Top Button Logic
    const pageTopBtn = document.getElementById('page-top');
    if (pageTopBtn) {
        window.addEventListener('scroll', () => {
            // Show button after scrolling down 300px
            if (window.scrollY > 300) {
                pageTopBtn.classList.add('is-visible');
            } else {
                pageTopBtn.classList.remove('is-visible');
            }
        });

        pageTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Hamburger Menu Logic
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    if (hamburgerBtn && navLinks) {
        // Toggle menu on hamburger click
        hamburgerBtn.addEventListener('click', () => {
            hamburgerBtn.classList.toggle('is-open');
            navLinks.classList.toggle('is-open');
        });

        // Close menu when a link is clicked
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                hamburgerBtn.classList.remove('is-open');
                navLinks.classList.remove('is-open');
            });
        });
    }

    // Lightbox Logic
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.lightbox-close');
    const triggers = document.querySelectorAll('.lightbox-trigger');

    if (lightbox && lightboxImg) {
        triggers.forEach(trigger => {
            trigger.addEventListener('click', () => {
                lightbox.style.display = 'flex';
                lightboxImg.src = trigger.src;
                document.body.style.overflow = 'hidden'; 
            });
        });

        const closeLightbox = () => {
            lightbox.style.display = 'none';
            document.body.style.overflow = '';
        };

        if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
    }

    // Voice Section Toggle Logic
    const voiceCards = document.querySelectorAll('.voice-card');
    voiceCards.forEach(card => {
        const wrapper = card.querySelector('.voice-text-wrapper');
        const text = card.querySelector('.voice-text');
        const btn = card.querySelector('.voice-more-btn');

        if (wrapper && text && btn) {
            // Check if text is actually longer than 3 lines (5.4em approx)
            // line-height is 1.8, font-size 15px. 1.8 * 15 * 3 = 81px
            const limitHeight = 15 * 1.8 * 3 + 2; // Allow small buffer
            if (text.scrollHeight <= limitHeight) {
                btn.style.display = 'none';
                wrapper.style.maxHeight = 'none';
                wrapper.classList.add('no-mask'); // We'll add this to CSS if needed
            } else {
                btn.addEventListener('click', () => {
                    const isExpanded = wrapper.classList.toggle('is-expanded');
                    btn.textContent = isExpanded ? '閉じる' : '続きを読む';
                });
            }
        }
    });
});
