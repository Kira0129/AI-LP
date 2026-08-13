document.addEventListener('DOMContentLoaded', () => {
    /* SP Hamburger Menu */
    const hamburgerBtn = document.getElementById('hamburger-btn');
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
    spNavLinks.forEach(link => link.addEventListener('click', toggleMenu));

    const spMenuCloseBtn = document.getElementById('sp-menu-close');
    if (spMenuCloseBtn) {
        spMenuCloseBtn.addEventListener('click', toggleMenu);
    }

    /* ════════════════════════════════
        FV Vertical Scroll Images Logic
    ════════════════════════════════ */
    // HTMLで設定された画像を自動で複製し、無限スクロールを実現します。
    document.querySelectorAll('.js-clone-scroll').forEach(col => {
        if (col) {
            col.innerHTML += col.innerHTML;
        }
    });

    // Pause animations when tab is hidden (performance)
    document.addEventListener('visibilitychange', () => {
        const state = document.hidden ? 'paused' : 'running';
        document.querySelectorAll('.v-col, .fv-wave svg').forEach(el => {
            el.style.animationPlayState = state;
        });
    });


    /* Scroll Reveal Animation */
    const animElements = document.querySelectorAll('.anim-fade-up');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
    animElements.forEach(el => observer.observe(el));


    /* Gallery Modal Logic */
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
            slide.innerHTML = `<img src="${img.src}" class="max-w-full max-h-[85vh] object-contain rounded-md shadow-2xl">`;
            modalWrapper.appendChild(slide);
        });
    };
    buildModalSlides();

    const openModal = (index) => {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        if (modalSwiper) modalSwiper.destroy(true, true);
        modalSwiper = new Swiper('.modal-swiper', {
            loop: true,
            initialSlide: index,
            pagination: { el: '.modal-pagination', type: 'fraction' },
            navigation: { nextEl: '.modal-next-btn', prevEl: '.modal-prev-btn' },
            speed: 500,
            grabCursor: true,
            keyboard: { enabled: true },
        });
    };

    triggerImgs.forEach((img, index) => {
        img.addEventListener('click', () => openModal(index));
    });

    const closeModal = () => {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    };

    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target.id === 'gallery-modal' || e.target.classList.contains('swiper-slide')) {
            closeModal();
        }
    });

    /* Page Top Button */
    const pageTopBtn = document.getElementById('page-top');
    if (pageTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                pageTopBtn.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
                pageTopBtn.classList.add('opacity-100', 'pointer-events-auto', 'translate-y-0');
            } else {
                pageTopBtn.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
                pageTopBtn.classList.remove('opacity-100', 'pointer-events-auto', 'translate-y-0');
            }
        });

        pageTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
