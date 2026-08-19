tailwind.config = {
    theme: {
        extend: {
            colors: {
                orange: {
                    DEFAULT: '#e66b27', // 士業系に合う、少し落ち着いたメインオレンジ
                    light: '#fff8f3',
                    hover: '#d45e1d',
                    dark: '#c45517',
                },
                gray: {
                    base: '#f9fafb',   
                    border: '#e5e7eb',
                    text: '#374151',
                    muted: '#6b7280',
                    800: '#1f2937',     // 見出し等に使用するダークグレー
                    900: '#111827'      // フッター等に使用する一番濃いグレー
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
});
