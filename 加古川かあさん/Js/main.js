document.addEventListener('DOMContentLoaded', () => {
    // FV Swiper
    const curNum = document.getElementById('curNum');
    new Swiper('.fv-swiper', {
        loop: true, effect: 'fade', fadeEffect: { crossFade: true },
        autoplay: { delay: 5000, disableOnInteraction: false },
        speed: 1500,
        on: {
            slideChange: function () {
                if (curNum) curNum.textContent = (this.realIndex + 1).toString().padStart(2, '0');
            }
        }
    });

    // Price Swiper (Auto Loop)
    new Swiper('.price-slider', {
        loop: true,
        speed: 5000,
        allowTouchMove: false,
        autoplay: {
            delay: 0,
            disableOnInteraction: false,
        },
        slidesPerView: 2,
        spaceBetween: 16,
        breakpoints: {
            768: { slidesPerView: 3, spaceBetween: 24 },
            1024: { slidesPerView: 4, spaceBetween: 30 }
        }
    });

    // Drawer
    const burger = document.getElementById('burger');
    const drawer = document.getElementById('drawer');
    const closeBtn = document.getElementById('close-drawer');
    const toggleDrawer = () => {
        drawer.classList.toggle('active');
        document.body.style.overflow = drawer.classList.contains('active') ? 'hidden' : '';
    };
    if(burger) burger.addEventListener('click', toggleDrawer);
    if(closeBtn) closeBtn.addEventListener('click', toggleDrawer);
    drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', toggleDrawer));

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if(href === '#') return;
            e.preventDefault();
            const target = document.querySelector(href);
            if(target) {
                const headerHeight = document.querySelector('.site-header').offsetHeight;
                window.scrollTo({
                    top: target.getBoundingClientRect().top + window.pageYOffset - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll Reveal Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active');
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Page Top Button
    const pageTop = document.getElementById('page-top');
    if (pageTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                pageTop.classList.add('active');
            } else {
                pageTop.classList.remove('active');
            }
        });
        pageTop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});
