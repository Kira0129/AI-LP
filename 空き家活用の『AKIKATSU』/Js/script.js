tailwind.config = {
    theme: {
        extend: {
            colors: {
                orange: {
                    DEFAULT: '#f0ad74',
                    light: '#fdf6f0',
                    hover: '#e59d60',
                    dark: '#c7834a',
                },
                navy: {
                    DEFAULT: '#102564',
                    light: '#1c3a99',
                    hover: '#0a1740',
                },
                gray: {
                    base: '#f8fafc',
                    border: '#e2e8f0',
                    text: '#334155',
                    muted: '#64748b',
                    800: '#1e293b',
                    900: '#0f172a'
                }
            },
            fontFamily: {
                sans: ['"Noto Sans JP"', 'sans-serif'],
                en_cond: ['"Barlow Condensed"', 'sans-serif'],
                en_bold: ['"Oswald"', 'sans-serif'],
            },
            boxShadow: {
                'card': '0 4px 24px rgba(0, 0, 0, 0.04)',
                'card-hover': '0 12px 32px rgba(230, 107, 39, 0.12)',
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // 1. スマホ用メニュー制御
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const mobileLinks = mobileMenu.querySelectorAll('a');

    const toggleMenu = () => {
        mobileMenu.classList.toggle('hidden');
        if (mobileMenu.classList.contains('hidden')) {
            menuIcon.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
        } else {
            menuIcon.setAttribute('d', 'M6 18L18 6M6 6l12 12');
        }
    };

    menuBtn.addEventListener('click', toggleMenu);
    mobileLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });

    // 2. フェードインスクロールアニメーション
    const fadeUpElements = document.querySelectorAll('.fade-in-up');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -10% 0px', 
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

    fadeUpElements.forEach(el => {
        observer.observe(el);
    });

    // 3. TOPへ戻るボタンの制御
    const backToTopBtn = document.getElementById('backToTopBtn');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.remove('opacity-0', 'invisible', 'translate-y-4');
                backToTopBtn.classList.add('opacity-100', 'visible', 'translate-y-0');
            } else {
                backToTopBtn.classList.add('opacity-0', 'invisible', 'translate-y-4');
                backToTopBtn.classList.remove('opacity-100', 'visible', 'translate-y-0');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
