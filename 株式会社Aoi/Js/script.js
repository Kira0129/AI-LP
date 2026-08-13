AOS.init({
    duration: 800,
    once: true,
    offset: 50,
});

document.addEventListener('DOMContentLoaded', () => {
    const backToTopBtn = document.getElementById('backToTop');
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const menuLinks = document.querySelectorAll('.menu-link');

    // Mobile Menu Toggle
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('translate-x-full');
            menuIcon.classList.toggle('fa-bars');
            menuIcon.classList.toggle('fa-xmark');
            document.body.classList.toggle('overflow-hidden');
        });

        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('translate-x-full');
                menuIcon.classList.add('fa-bars');
                menuIcon.classList.remove('fa-xmark');
                document.body.classList.remove('overflow-hidden');
            });
        });
    }

    // Scroll to Top
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.remove('opacity-0', 'invisible');
            backToTopBtn.classList.add('opacity-100', 'visible');
        } else {
            backToTopBtn.classList.remove('opacity-100', 'visible');
            backToTopBtn.classList.add('opacity-0', 'invisible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 右クリックとドラッグの禁止（画像保存・テキスト選択防止）
    document.addEventListener('contextmenu', e => e.preventDefault());
    document.addEventListener('dragstart', e => e.preventDefault());
});
