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
    
    // 少し遅延させてから高さを判定する（フォントの読み込み等を考慮）
    setTimeout(() => {
        readMoreBtns.forEach(btn => {
            const content = btn.previousElementSibling;
            
            // 内容の実際の高さ（scrollHeight）と、3行制限時の高さ（clientHeight）を比較
            if (content.scrollHeight <= content.clientHeight) {
                // 3行以下ならボタンを隠し、制限クラスも外す（念のため）
                btn.style.display = 'none';
                content.classList.remove('line-clamp-3');
            }
            
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
    }, 100);
});

// VOICEセクションのスライダー初期化
document.addEventListener('DOMContentLoaded', () => {
    if (typeof Swiper !== 'undefined') {
        new Swiper('.voice-slider', {
            slidesPerView: 1.2,
            spaceBetween: 20,
            loop: true,
            speed: 5000,
            autoplay: {
                delay: 0,
                disableOnInteraction: false,
            },
            breakpoints: {
                768: { slidesPerView: 1.2, spaceBetween: 32 }
            }
        });
    }
});

// TOPへ戻るボタンと追従CTAの制御
const backToTopBtn = document.getElementById('back-to-top');
const spFloatingCta = document.getElementById('sp-floating-cta');

window.addEventListener('scroll', () => {
    // 300px以上スクロールしたらTOPへ戻るボタンを表示
    if (backToTopBtn) {
        if (window.scrollY > 300) {
            backToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
            backToTopBtn.classList.add('opacity-100');
        } else {
            // それ以外は非表示
            backToTopBtn.classList.remove('opacity-100');
            backToTopBtn.classList.add('opacity-0', 'pointer-events-none');
        }
    }

    // FV（画面の高さの半分程度）を過ぎたらSP用追従CTAを表示
    if (spFloatingCta) {
        if (window.scrollY > window.innerHeight * 0.5) {
            spFloatingCta.classList.remove('opacity-0', 'pointer-events-none');
            spFloatingCta.classList.add('opacity-100', 'pointer-events-auto');
        } else {
            spFloatingCta.classList.remove('opacity-100', 'pointer-events-auto');
            spFloatingCta.classList.add('opacity-0', 'pointer-events-none');
        }
    }
});

if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// iOSでのbg-fixed（パララックス）無効化対策
document.addEventListener('DOMContentLoaded', () => {
    // iOS SafariおよびiPadOS判定
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    
    if (isIOS) {
        const messageSection = document.getElementById('message');
        if (messageSection) {
            // 背景画像用のdivを生成
            const bgDiv = document.createElement('div');
            // 高さを大きめに設定し、スクロール時に見切れないようにする
            bgDiv.className = 'absolute top-[-20%] left-0 w-full h-[140%] bg-cover bg-center md:bg-[center_65%]';
            bgDiv.style.zIndex = '-20';
            
            const bgImage = messageSection.style.backgroundImage;
            if (bgImage) {
                bgDiv.style.backgroundImage = bgImage;
                
                // 元のセクションの背景設定を解除し、overflow-hiddenを追加
                messageSection.style.backgroundImage = 'none';
                messageSection.classList.remove('bg-fixed');
                messageSection.classList.add('overflow-hidden');
                
                // 要素を挿入（一番背面になるように先頭に追加）
                messageSection.insertBefore(bgDiv, messageSection.firstChild);
                
                // スクロール連動でパララックス（Y軸移動）を適用
                let ticking = false;
                window.addEventListener('scroll', () => {
                    if (!ticking) {
                        window.requestAnimationFrame(() => {
                            const rect = messageSection.getBoundingClientRect();
                            // セクションが画面内にある場合のみ処理
                            if (rect.top <= window.innerHeight && rect.bottom >= 0) {
                                // 移動量の係数（0.2くらいが自然な視差効果）
                                const yPos = rect.top * 0.2; 
                                bgDiv.style.transform = `translate3d(0, ${yPos}px, 0)`;
                            }
                            ticking = false;
                        });
                        ticking = true;
                    }
                });
            }
        }
    }
});
