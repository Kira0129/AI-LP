// Full Width Loop Slider (Menu)
document.addEventListener('DOMContentLoaded', function() {
    if(document.querySelector('.menu-loop-swiper')) {
        new Swiper('.menu-loop-swiper', {
            slidesPerView: 'auto',
            spaceBetween: 20,
            loop: true,
            speed: 4000,
            autoplay: { 
                delay: 0, 
                disableOnInteraction: false 
            },
            allowTouchMove: false, 
        });
    }

    // Hero Slider and Process Sync
    const processItems = document.querySelectorAll('.process-item');
    if(document.querySelector('.hero-swiper')) {
        const heroSwiper = new Swiper('.hero-swiper', {
            loop: true,
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            speed: 1000,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false
            },
            on: {
                slideChange: function () {
                    const realIndex = this.realIndex;
                    processItems.forEach((item, index) => {
                        if (index === realIndex) {
                            item.classList.add('active');
                        } else {
                            item.classList.remove('active');
                        }
                    });
                }
            }
        });

        // Click to change slide
        processItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                heroSwiper.slideToLoop(index);
            });
        });
    }

    // Back to Top Logic
    const backToTop = document.getElementById('back-to-top');
    if(backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Voice Review Toggle Logic
    const voiceToggles = document.querySelectorAll('.voice-toggle-btn');
    voiceToggles.forEach(btn => {
        btn.addEventListener('click', function() {
            const wrapper = this.previousElementSibling;
            wrapper.classList.toggle('expanded');
            
            if(wrapper.classList.contains('expanded')) {
                this.textContent = '閉じる';
            } else {
                this.textContent = '続きを読む';
            }
        });
    });

    // Hamburger Menu Toggle
    const hamburger = document.getElementById('hamburger-btn');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('#nav-menu a');

    if(hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('open');
            // Prevent scrolling when menu is open
            document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }

    // Disable Right-click and Image Dragging
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    }, false);

    document.addEventListener('dragstart', (e) => {
        if (e.target.tagName === 'IMG') {
            e.preventDefault();
        }
    }, false);
});
