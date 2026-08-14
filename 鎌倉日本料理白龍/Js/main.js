// スクロール時のヘッダー背景色変更
const header = document.getElementById('header');
const headerLogo = document.getElementById('header-logo');
const headerNav = document.getElementById('header-nav');
const headerBtn = document.getElementById('header-btn');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenuBtnIcon = mobileMenuBtn.querySelector('svg');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        // スクロール時：白背景、黒文字
        header.classList.add('bg-white', 'shadow-md');
        header.classList.remove('bg-transparent');
        
        headerLogo.classList.remove('text-white');
        headerLogo.classList.add('text-[var(--text-main)]');
        
        headerNav.classList.remove('text-white');
        headerNav.classList.add('text-[var(--text-main)]');

        headerBtn.classList.remove('border-white', 'text-white', 'hover:bg-white', 'hover:text-black');
        headerBtn.classList.add('border-[var(--text-main)]', 'text-[var(--text-main)]', 'hover:bg-[var(--text-main)]', 'hover:text-white');
        
        mobileMenuBtn.classList.remove('text-white');
        mobileMenuBtn.classList.add('text-[var(--text-main)]');
    } else {
        // トップ時：透明背景、白文字
        header.classList.remove('bg-white', 'shadow-md');
        header.classList.add('bg-transparent');
        
        headerLogo.classList.add('text-white');
        headerLogo.classList.remove('text-[var(--text-main)]');
        
        headerNav.classList.add('text-white');
        headerNav.classList.remove('text-[var(--text-main)]');

        headerBtn.classList.add('border-white', 'text-white', 'hover:bg-white', 'hover:text-black');
        headerBtn.classList.remove('border-[var(--text-main)]', 'text-[var(--text-main)]', 'hover:bg-[var(--text-main)]', 'hover:text-white');

        // モバイルメニューが開いていない時だけ白にする
        if (!mobileMenu.classList.contains('translate-x-0')) {
            mobileMenuBtn.classList.add('text-white');
            mobileMenuBtn.classList.remove('text-[var(--text-main)]');
        }
    }
});

// モバイルメニューのトグル
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');
let isMenuOpen = false;

function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    if (isMenuOpen) {
        mobileMenu.classList.remove('translate-x-full');
        mobileMenu.classList.add('translate-x-0');
        mobileMenuBtn.innerHTML = '<svg class="w-8 h-8 transition-colors duration-500" fill="none" stroke="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>';
    } else {
        mobileMenu.classList.add('translate-x-full');
        mobileMenu.classList.remove('translate-x-0');
        const iconColor = window.scrollY > 50 ? 'currentColor' : 'white';
        mobileMenuBtn.innerHTML = `<svg class="w-8 h-8 transition-colors duration-500" fill="none" stroke="${iconColor}" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>`;
    }
}

mobileMenuBtn.addEventListener('click', toggleMenu);

// モバイルリンクをクリックしたらメニューを閉じる
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        if(isMenuOpen) toggleMenu();
    });
});

// スクロール連動フェードインアニメーション (Intersection Observer)
const fadeElements = document.querySelectorAll('.fade-in');

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('appear');
            observer.unobserve(entry.target); 
        }
    });
}, observerOptions);

fadeElements.forEach(el => {
    observer.observe(el);
});

// ページロード時にFVの要素をフェードインさせる
window.addEventListener('load', () => {
    const fvElements = document.querySelectorAll('section:first-of-type .fade-in');
    fvElements.forEach(el => el.classList.add('appear'));
});

// VOICEセクションの続きを読むトグル
document.addEventListener('DOMContentLoaded', () => {
    const readMoreBtns = document.querySelectorAll('.read-more-btn');
    
    readMoreBtns.forEach(btn => {
        // コンテンツが3行未満の場合はボタンを非表示にする処理
        const content = btn.previousElementSibling;
        // scrollHeightが3行分より大きいかチェックするなどの詳細制御も可能ですが、
        // 今回の口コミは長いためデフォルトで表示しておきクリックで切り替えます
        
        btn.addEventListener('click', function() {
            if (content.classList.contains('line-clamp-3')) {
                // 開く
                content.classList.remove('line-clamp-3');
                this.innerText = '閉じる';
            } else {
                // 閉じる
                content.classList.add('line-clamp-3');
                this.innerText = '続きを読む';
            }
        });
    });
});
