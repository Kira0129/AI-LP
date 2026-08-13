document.addEventListener('DOMContentLoaded', () => {
    /* SP Hamburger Menu */
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const spMenu = document.getElementById('sp-menu');
    const spNavLinks = document.querySelectorAll('.sp-nav-link');

    const toggleMenu = () => {
        const isClosed = spMenu.classList.contains('translate-x-full');
        if (isClosed) {
            spMenu.classList.remove('translate-x-full');
            document.body.style.overflow = 'hidden';
            hamburgerBtn.classList.add('hamburger-active');
        } else {
            spMenu.classList.add('translate-x-full');
            document.body.style.overflow = '';
            hamburgerBtn.classList.remove('hamburger-active');
        }
    };

    hamburgerBtn.addEventListener('click', toggleMenu);
    closeMenuBtn.addEventListener('click', toggleMenu);

    spNavLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });



    /* Gallery Modal */
    const modal = document.getElementById('gallery-modal');
    const modalClose = document.getElementById('modal-close');
    const modalWrapper = document.getElementById('modal-swiper-wrapper');
    const triggerImgs = document.querySelectorAll('.js-modal-trigger');
    let modalSwiper = null;

    const buildModalSlides = () => {
        modalWrapper.innerHTML = '';
        triggerImgs.forEach(img => {
            const slide = document.createElement('div');
            slide.className = 'swiper-slide flex items-center justify-center p-4';
            slide.innerHTML = `<img src="${img.src}" class="max-w-full max-h-[85vh] object-contain shadow-2xl">`;
            modalWrapper.appendChild(slide);
        });
    };
    buildModalSlides();

    const openModal = (index) => {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        if (modalSwiper) {
            modalSwiper.destroy(true, true);
            modalSwiper = null;
        }
        modalSwiper = new Swiper('.modal-swiper', {
            loop: true,
            initialSlide: index,
            pagination: { el: '.modal-pagination', type: 'fraction' },
            speed: 500,
            grabCursor: true,
            keyboard: { enabled: true },
        });
    };

    const modalPrevBtn = document.querySelector('.modal-prev-btn');
    const modalNextBtn = document.querySelector('.modal-next-btn');

    modalPrevBtn.addEventListener('click', (e) => { e.stopPropagation(); if (modalSwiper) modalSwiper.slidePrev(); });
    modalNextBtn.addEventListener('click', (e) => { e.stopPropagation(); if (modalSwiper) modalSwiper.slideNext(); });

    triggerImgs.forEach((img, index) => {
        img.addEventListener('click', () => { openModal(index); });
    });

    const closeModal = () => {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    };

    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target.classList.contains('swiper-slide') || e.target.id === 'gallery-modal') {
            closeModal();
        }
    });

    /* Back to Top & SP CTA Scroll Trigger */
    const backToTopBtn = document.getElementById('back-to-top');
    const spBottomCta = document.getElementById('sp-bottom-cta');
    const aboutSection = document.getElementById('about');

    window.addEventListener('scroll', () => {
        // Back to Top button visibility
        if (window.scrollY > 300) {
            backToTopBtn.classList.remove('opacity-0', 'invisible');
            backToTopBtn.classList.add('opacity-100', 'visible');
        } else {
            backToTopBtn.classList.remove('opacity-100', 'visible');
            backToTopBtn.classList.add('opacity-0', 'invisible');
        }

        // SP CTA visibility based on About section position
        if (aboutSection && spBottomCta) {
            const aboutTop = aboutSection.getBoundingClientRect().top + window.scrollY;
            if (window.scrollY >= aboutTop - 120) {
                spBottomCta.classList.remove('translate-y-full');
                spBottomCta.classList.add('translate-y-0');
            } else {
                spBottomCta.classList.remove('translate-y-0');
                spBottomCta.classList.add('translate-y-full');
            }
        }
    });
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    /* Scroll Reveal */
    const animElements = document.querySelectorAll('.anim-fade-up, .anim-fade-in, .anim-fade-left, .anim-fade-right');
    if (animElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
        animElements.forEach(el => observer.observe(el));
    }

    /* Header Scroll */
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('bg-black/40', 'backdrop-blur-sm', 'shadow-sm');
        } else {
            header.classList.remove('bg-black/40', 'backdrop-blur-sm', 'shadow-sm');
        }
    });
});
