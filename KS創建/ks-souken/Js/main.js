document.addEventListener('DOMContentLoaded', () => {

    // 1. Right Click Prevention
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });

    // 2. Hamburger Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const spNav = document.querySelector('.sp-nav');
    const spNavClose = document.querySelector('.sp-nav-close');
    const spNavLinks = document.querySelectorAll('.sp-nav-list a');

    if (hamburger && spNav) {
        const toggleMenu = () => {
            hamburger.classList.toggle('is-active');
            spNav.classList.toggle('is-active');
        };
        hamburger.addEventListener('click', toggleMenu);
        if (spNavClose) {
            spNavClose.addEventListener('click', toggleMenu);
        }
        spNavLinks.forEach(link => {
            link.addEventListener('click', toggleMenu);
        });
    }

    // 3. Swiper: Hero Slider
    const heroSwiper = new Swiper('.hero-swiper', {
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        speed: 3000,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        loop: true,
    });

    // 4. Swiper: Price Slider (Continuous Flow - TRUE Linear Motion)
    const priceSwiper = new Swiper('.price-slider', {
        slidesPerView: 'auto',
        spaceBetween: 20,
        loop: true,
        loopedSlides: 6,
        speed: 8000, 
        autoplay: {
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
            reverseDirection: true,
        },
        allowTouchMove: false,
        cssMode: false,
        easing: 'linear', 
        breakpoints: {
            768: {
                spaceBetween: 30,
            }
        }
    });

    // 5. Swiper: Voice (Cards)
    const voiceSwiper = new Swiper('.voice-slider', {
        slidesPerView: 1.1,
        spaceBetween: 20,
        loop: false, 
        centeredSlides: false,
        breakpoints: {
            768: {
                slidesPerView: 2,
                spaceBetween: 30,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 30,
            }
        }
    });

    // 6. QA Accordion
    const qaItems = document.querySelectorAll('.qa-item');
    qaItems.forEach(item => {
        const q = item.querySelector('.qa-q');
        if (q) {
            q.addEventListener('click', () => {
                item.classList.toggle('is-open');
            });
        }
    });

    // 7. Modal Gallery Setup
    const modal = document.querySelector('.modal');
    const modalImg = document.querySelector('.modal-img');
    const modalClose = document.querySelector('.modal-close');
    
    if (modal && modalImg && modalClose) {
        const priceImages = document.querySelectorAll('.price-slider img');
        priceImages.forEach(img => {
            img.addEventListener('click', () => {
                modalImg.src = img.src;
                modal.classList.add('is-active');
            });
        });

        modalClose.addEventListener('click', () => {
            modal.classList.remove('is-active');
        });
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('is-active');
            }
        });
    }

    // 8. To Top Button Visibility & Smooth Scroll
    const toTopBtn = document.querySelector('.to-top');
    if (toTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                toTopBtn.classList.add('is-show');
            } else {
                toTopBtn.classList.remove('is-show');
            }
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');

            if (targetId === '#') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }

            const target = document.querySelector(targetId);
            if (target) {
                const headerOffset = document.querySelector('.header').offsetHeight;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 9. Scroll Reveal Animation
    const revealItems = document.querySelectorAll('.async, .reveal');
    const revealOption = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                revealObserver.unobserve(entry.target); // Only animate once
            }
        });
    }, revealOption);

    revealItems.forEach(item => {
        revealObserver.observe(item);
    });

});
