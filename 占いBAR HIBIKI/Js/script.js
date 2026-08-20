document.addEventListener('DOMContentLoaded', () => {
    
    // FV Swiper Initialization (無限自動ループ)
    const fvSwiper = new Swiper('.fv-swiper', {
        loop: true,
        loopedSlides: 8, // スライドの複製数を増やして途切れを防止
        centeredSlides: true,
        slidesPerView: 'auto',
        spaceBetween: 0,
        speed: 5000, // 一定の速度でなめらかに流す
        autoplay: {
            delay: 0, // 停止せず常に流れ続ける
            disableOnInteraction: false, // ユーザー操作後もループを止めない
        },
        grabCursor: false,
        allowTouchMove: false,
    });

    // Fade-in elements on scroll using Intersection Observer
    const fadeElements = document.querySelectorAll('.fade-in');
    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };
    
    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('appear');
            observer.unobserve(entry.target);
        });
    }, appearOptions);
    
    fadeElements.forEach(el => appearOnScroll.observe(el));

    // Header background opacity on scroll
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('py-2', 'bg-darker/95', 'shadow-lg');
            header.classList.remove('py-4', 'bg-darker/80');
        } else {
            header.classList.add('py-4', 'bg-darker/80');
            header.classList.remove('py-2', 'bg-darker/95', 'shadow-lg');
        }
    });

    // Mobile Menu Toggle
    const menuBtn = document.getElementById('mobile-menu-btn');
    const closeBtn = document.getElementById('mobile-menu-close');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    function toggleMenu() {
        mobileMenu.classList.toggle('hidden');
        mobileMenu.classList.toggle('flex');
        if (mobileMenu.classList.contains('flex')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }

    menuBtn.addEventListener('click', toggleMenu);
    closeBtn.addEventListener('click', toggleMenu);
    mobileLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });
});
