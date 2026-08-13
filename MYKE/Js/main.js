document.addEventListener('DOMContentLoaded', () => {
    /* ハンバーガーメニュー */
    const openBtn = document.getElementById('sp-menu-open');
    const closeBtn = document.getElementById('sp-menu-close');
    const spMenu = document.getElementById('sp-menu');
    const spNavLinks = document.querySelectorAll('.sp-nav-link');

    const openMenu = () => {
        if (!spMenu) return;
        spMenu.classList.remove('hidden');
        setTimeout(() => {
            spMenu.classList.remove('opacity-0');
        }, 10);
        document.body.style.overflow = 'hidden';
    };

    const closeMenu = () => {
        if (!spMenu) return;
        spMenu.classList.add('opacity-0');
        setTimeout(() => {
            spMenu.classList.add('hidden');
        }, 300);
        document.body.style.overflow = '';
    };
    
    if (openBtn) {
        openBtn.addEventListener('click', openMenu);
    }
    if (closeBtn) {
        closeBtn.addEventListener('click', closeMenu);
    }
    
    if (spNavLinks) {
        spNavLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });
    }
    
    /* Intersection Observer for Fade-in animations */
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const fadeElements = document.querySelectorAll('.fade-in-up');
    fadeElements.forEach(el => {
        observer.observe(el);
    });
    
    /* Back to Top Button */
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
                backToTopBtn.classList.add('opacity-100');
            } else {
                backToTopBtn.classList.remove('opacity-100');
                backToTopBtn.classList.add('opacity-0', 'pointer-events-none');
            }
        });

        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
