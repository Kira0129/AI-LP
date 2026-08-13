document.addEventListener('DOMContentLoaded', () => {
    // 1. Swiper - First View
    // 1. FV Swiper (Hinata Style)
    const curNum = document.getElementById('curNum');
    const fvSwiper = new Swiper('.fv-swiper', {
        loop: true,
        effect: 'fade',
        fadeEffect: { crossFade: true },
        autoplay: {
            delay: 6000,
            disableOnInteraction: false,
        },
        speed: 2000,
        on: {
            slideChange: function () {
                if (curNum) {
                    const realIndex = this.realIndex + 1;
                    curNum.textContent = realIndex.toString().padStart(2, '0');
                }
            }
        }
    });

    // 2. Swiper - Gallery (Seamless Infinite Loop)
    const gallerySwiper = new Swiper('.gallery-swiper', {
        slidesPerView: 1.5,
        spaceBetween: 10,
        centeredSlides: false,
        loop: true,
        speed: 6000,
        allowTouchMove: true, 
        autoplay: {
            delay: 0,
            disableOnInteraction: false,
        },
        freeMode: {
            enabled: true,
            sticky: false,
            momentum: false,
        },
        breakpoints: {
            768: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
            1024: {
                slidesPerView: 5,
                spaceBetween: 20,
            }
        },
        on: {
            // Ensure autoplay continues/resumes after any interaction
            touchEnd: function() {
                this.autoplay.start();
            }
        }
    });

    // 3. Swiper - Voice
    const voiceSwiper = new Swiper('.voice-swiper', {
        slidesPerView: 1,
        spaceBetween: 20,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
            }
        }
    });

    // 4. Header Scroll Logic
    const scrolledHeader = document.getElementById('scrolled-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            scrolledHeader.style.opacity = '1';
            scrolledHeader.style.visibility = 'visible';
        } else {
            scrolledHeader.style.opacity = '0';
            scrolledHeader.style.visibility = 'hidden';
        }
    });

    // 5. Hamburger Menu
    const burgers = [
        document.getElementById('burger'),
        document.getElementById('burger-mobile'),
        document.getElementById('burger-scrolled')
    ];
    const drawer = document.getElementById('drawer');
    const closeBtn = document.getElementById('close-drawer');

    burgers.forEach(b => {
        if (b) {
            b.addEventListener('click', () => {
                drawer.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        }
    });

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

    // 6. Scroll Top
    const scrollTop = document.getElementById('scrollTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 800) {
            scrollTop.classList.remove('opacity-0', 'invisible');
            scrollTop.classList.add('opacity-100', 'visible');
        } else {
            scrollTop.classList.add('opacity-0', 'invisible');
            scrollTop.classList.remove('opacity-100', 'visible');
        }
    });

    scrollTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // 7. Lightbox Modal
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    document.body.appendChild(modalOverlay);

    // Event Delegation for Gallery Images (handles cloned slides in loop mode)
    document.addEventListener('click', (e) => {
        const img = e.target.closest('.gallery-img');
        if (img) {
            const fullImg = document.createElement('img');
            fullImg.src = img.src;
            fullImg.className = 'modal-img';
            modalOverlay.innerHTML = '';
            modalOverlay.appendChild(fullImg);
            modalOverlay.style.display = 'flex';
            
            // Prevent body scroll when modal is open
            document.body.style.overflow = 'hidden';
        }
    });

    modalOverlay.addEventListener('click', () => {
        modalOverlay.style.display = 'none';
        document.body.style.overflow = '';
        
        // Ensure Gallery resumes if it was paused
        if (gallerySwiper && gallerySwiper.autoplay) {
            gallerySwiper.autoplay.start();
        }
    });


    // 8. Right Click Prevention
    document.addEventListener('contextmenu', (e) => e.preventDefault());

    // 9. Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if(href === '#') return;
            e.preventDefault();
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

    // 10. Scroll Reveal Observer
    const revealOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: stop observing after reveal
                // revealObserver.unobserve(entry.target);
            }
        });
    }, revealOptions);

    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });
});
