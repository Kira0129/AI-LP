document.addEventListener('DOMContentLoaded', () => {
    // Swiper FV
    const curNum = document.getElementById('curNum');
    const fvSwiper = new Swiper('.fv-swiper', {
        loop: true,
        effect: 'fade',
        fadeEffect: { crossFade: true },
        autoplay: { delay: 6000, disableOnInteraction: false },
        speed: 2000,
        on: {
            slideChange: function () {
                if (curNum) {
                    curNum.textContent = (this.realIndex + 1).toString().padStart(2, '0');
                }
            }
        }
    });

    // Drawer Navigation
    const burger = document.getElementById('burger');
    const drawer = document.getElementById('drawer');
    const closeBtn = document.getElementById('close-drawer');

    if (burger) {
        burger.addEventListener('click', () => {
            drawer.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    const closeMenu = () => {
        drawer.classList.remove('active');
        document.body.style.overflow = '';
    };

    if (closeBtn) closeBtn.addEventListener('click', closeMenu);
    drawer.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Scroll Top
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

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if(href === '#') return;
            e.preventDefault();
            const target = document.querySelector(href);
            if(target) {
                const header = document.querySelector('header');
                const headerHeight = header ? header.offsetHeight : 90;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });

    // Scroll Reveal Observer
    const revealOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target); // 一度発火したら監視解除
            }
        });
    }, revealOptions);

    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });
});
