document.addEventListener('DOMContentLoaded', () => {
    // 1. Swiper - First View
    const curNum = document.getElementById('curNum');
    const fvSwiper = new Swiper('.fv-swiper', {
        loop: true,
        effect: 'fade',
        fadeEffect: { crossFade: true },
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        speed: 1500,
        on: {
            slideChange: function () {
                if (curNum) {
                    const realIndex = this.realIndex + 1;
                    curNum.textContent = realIndex.toString().padStart(2, '0');
                }
            }
        }
    });

    // 2. Header Scroll Logic
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 3. Hamburger Menu
    const burger = document.getElementById('burger');
    const drawer = document.getElementById('drawer');
    const closeBtn = document.getElementById('close-drawer');

    if (burger && drawer) {
        burger.addEventListener('click', () => {
            drawer.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    if (drawer) {
        const closeMenu = () => {
            drawer.classList.remove('active');
            document.body.style.overflow = '';
        };

        if (closeBtn) closeBtn.addEventListener('click', closeMenu);
        drawer.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });
    }

    // 4. Right Click Prevention (Optional, kept from original)
    document.addEventListener('contextmenu', (e) => e.preventDefault());

    // 5. Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            e.preventDefault();
            
            if(href === '#') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }
            const target = document.querySelector(href);
            if(target) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 6. Scroll Reveal Observer
    const revealOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, revealOptions);

    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });

    // 7. Gallery Swiper
    const gallerySwiper = new Swiper('.gallery-swiper', {
        loop: true,
        slidesPerView: 2,
        spaceBetween: 10,
        speed: 5000,
        allowTouchMove: false, // Prevents manual swiping to keep continuous loop smooth
        autoplay: {
            delay: 0,
            disableOnInteraction: false,
        },
        breakpoints: {
            640: { slidesPerView: 3, spaceBetween: 15 },
            1024: { slidesPerView: 5, spaceBetween: 20 }
        }
    });

    // 8. Gallery Lightbox
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeLightbox = document.getElementById('close-lightbox');
    const galleryImages = document.querySelectorAll('.gallery-image');

    if (lightbox && lightboxImg && galleryImages) {
        galleryImages.forEach(img => {
            img.addEventListener('click', () => {
                lightboxImg.src = img.src;
                lightbox.classList.remove('opacity-0', 'pointer-events-none');
            });
        });

        const closeMenu = () => lightbox.classList.add('opacity-0', 'pointer-events-none');
        
        if (closeLightbox) closeLightbox.addEventListener('click', closeMenu);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeMenu();
        });
    }

    // 9. Page Top Button
    const pageTop = document.getElementById('page-top');
    if (pageTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                pageTop.classList.remove('opacity-0', 'invisible');
                pageTop.classList.add('opacity-100', 'visible');
            } else {
                pageTop.classList.remove('opacity-100', 'visible');
                pageTop.classList.add('opacity-0', 'invisible');
            }
        });
    }
});
