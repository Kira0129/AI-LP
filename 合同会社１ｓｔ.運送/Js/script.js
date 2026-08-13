tailwind.config = {
    theme: {
        extend: {
            fontFamily: {
                sans: ['"Noto Sans JP"', 'sans-serif'],
            },
            colors: {
                primary: {
                    DEFAULT: '#e11d48', // カジュアルで少し明るめの赤
                    hover: '#be123c',
                    light: '#ffe4e6',
                },
                dark: '#334155',
            }
        }
    }
}

// ページ読み込み時の処理やスクロールアニメーションなどの追加JSはここに記述
document.addEventListener('DOMContentLoaded', () => {
    const backToTopBtn = document.getElementById('backToTop');

    // モバイルメニューの制御
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const menuLinks = document.querySelectorAll('.menu-link');

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

    // スクロール時の表示制御
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.remove('opacity-0', 'invisible');
            backToTopBtn.classList.add('opacity-100', 'visible');
        } else {
            backToTopBtn.classList.remove('opacity-100', 'visible');
            backToTopBtn.classList.add('opacity-0', 'invisible');
        }
    });

    // クリック時のスムーズスクロール
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
