document.addEventListener('DOMContentLoaded', () => {

    // Disable Right Click
    document.addEventListener('contextmenu', event => event.preventDefault());

    // 1. Swiper Init: FV
    const fvSwiper = new Swiper('.fv-swiper', {
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        loop: true,
        speed: 2000,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        allowTouchMove: false, // PCではタッチ無効、SPではスワイプさせたいがfade effectとautoplayメインなのでこれでもOK。指示「スワイプで切り替えができるように」とあるのでtrueにする
    });
    // Override allowTouchMove explicitly for logic if needed, but default is true.
    fvSwiper.allowTouchMove = true;


    // 2. Swiper Init: Voice
    const voiceSwiper = new Swiper('.voice-swiper', {
        loop: true,
        speed: 800,
        spaceBetween: 20,
        slidesPerView: 1.2,
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

    // 3. Swiper Init: Gallery
    const gallerySwiper = new Swiper('.gallery-swiper', {
        loop: true,
        speed: 800,
        spaceBetween: 10,
        slidesPerView: 1.5,
        centeredSlides: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        breakpoints: {
            768: {
                slidesPerView: 3.5,
                spaceBetween: 20,
                centeredSlides: false,
            }
        }
    });


    // 4. Hamburger Menu
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

    // Close nav when link clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburgerBtn.classList.remove('active');
            spNav.style.opacity = '0';
            spNav.style.pointerEvents = 'none';
        });
    });


    // 5. Scroll Animations (Intersection Observer)
    const fadeElements = document.querySelectorAll('.fade-in-up');

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px', // Activate a bit before bottom
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-valid');
                observer.unobserve(entry.target); // Run once
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => observer.observe(el));


    // 6. Scroll to Top Button
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

});

// 7. Lightbox Modal Functions (Global scope for onclick)
function openModal(imageSrc) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    modalImg.src = imageSrc;
    modal.classList.remove('hidden');
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.classList.add('hidden');
}

// Close modal on background click
document.getElementById('imageModal').addEventListener('click', (e) => {
    if (e.target.id === 'imageModal') {
        closeModal();
    }
});
