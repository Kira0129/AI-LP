document.addEventListener('DOMContentLoaded', () => {
    // Scroll Animation Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.js-fade, .js-blur-reveal').forEach(el => observer.observe(el));

    // FV Slideshow
    const imgs = document.querySelectorAll('#js-fv-slideshow img');
    if (imgs.length > 1) {
        let currentIdx = 0;
        setInterval(() => {
            imgs[currentIdx].classList.remove('is-active');
            currentIdx = (currentIdx + 1) % imgs.length;
            imgs[currentIdx].classList.add('is-active');
        }, 5000);
    }

    // Header Visibility on Scroll
    const header = document.getElementById('js-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('is-visible');
        } else {
            header.classList.remove('is-visible');
        }
    });
    // Initial check in case of refresh down the page
    if (window.scrollY > 100) header.classList.add('is-visible');

    // Page Top Button
    const pageTopBtn = document.getElementById('js-page-top');
    if (pageTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                pageTopBtn.classList.add('is-active');
            } else {
                pageTopBtn.classList.remove('is-active');
            }
        }, { passive: true });

        pageTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Hamburger Menu
    const hamburger = document.getElementById('js-hamburger');
    const mobileMenu = document.getElementById('js-mobile-menu');
    const mobileLinks = document.querySelectorAll('.js-mobile-link');

    if (hamburger && mobileMenu) {
        const toggleMenu = () => {
            hamburger.classList.toggle('is-open');
            mobileMenu.classList.toggle('is-open');
            // Prevent body scroll when menu is open
            document.body.style.overflow = hamburger.classList.contains('is-open') ? 'hidden' : '';
        };

        hamburger.addEventListener('click', toggleMenu);

        // Close menu when a link is clicked
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('is-open');
                mobileMenu.classList.remove('is-open');
                document.body.style.overflow = '';
            });
        });
    }
});
