document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Swiper Initialization ---

    // FV Swiper (Fade)
    const fvSwiper = new Swiper('.fv-swiper', {
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        loop: true,
        speed: 2000, // Slow transition for elegance
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        allowTouchMove: true, // Allow swipe
    });

    // Gallery Swiper (Carousel)
    const gallerySwiper = new Swiper('.gallery-swiper', {
        loop: true,
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 20,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        breakpoints: {
            768: {
                slidesPerView: 'auto',
                spaceBetween: 20,
                centeredSlides: false,
            }
        }
    });

    // Voice Swiper
    const voiceSwiper = new Swiper('.voice-swiper', {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 20,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            768: {
                slidesPerView: 3,
                spaceBetween: 30,
            }
        }
    });


    // --- 2. Mobile Menu Logic ---
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuClose = document.getElementById('menu-close');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    function toggleMenu() {
        mobileMenu.classList.toggle('active');
        if (mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('translate-x-full');
        } else {
            mobileMenu.classList.add('translate-x-full');
        }
    }

    menuBtn.addEventListener('click', toggleMenu);
    menuClose.addEventListener('click', toggleMenu);

    // Close menu when clicking a link
    mobileLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });


    // --- 3. Scroll to Top Button ---
    const scrollToTopBtn = document.getElementById('scroll-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.remove('opacity-0');
            scrollToTopBtn.classList.add('opacity-100');
        } else {
            scrollToTopBtn.classList.remove('opacity-100');
            scrollToTopBtn.classList.add('opacity-0');
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });


    // --- 4. Smooth Scroll for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Adjust for header height (80px)
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });


    // --- 5. Gallery Modal (Lightbox) ---
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');
    const modalCloseBtn = document.getElementById('modal-close');
    const galleryImages = document.querySelectorAll('.gallery-img');

    // Event Delegation for Gallery Images (handles cloned slides in loop mode)
    const galleryWrapper = document.querySelector('.gallery-swiper');

    if (galleryWrapper) {
        galleryWrapper.addEventListener('click', (e) => {
            if (e.target.classList.contains('gallery-img')) {
                const src = e.target.src;
                modalImg.src = src;
                modal.classList.remove('hidden');
            }
        });
    }

    modalCloseBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
        }
    });


    // --- 6. Right Click Disable (Redundant to HTML attribute but safe) ---
    document.addEventListener('contextmenu', event => event.preventDefault());

});
