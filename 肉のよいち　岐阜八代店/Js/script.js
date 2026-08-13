// ==========================================
// 1. スクロールによるヘッダーの背景変化
// ==========================================
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ==========================================
// 2. IntersectionObserver (スクロール検知アニメーション)
// ==========================================
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

// ヒーローハイライトのアニメーション発火
document.querySelectorAll('.hero-highlights').forEach(el => {
    observer.observe(el);
});

// ==========================================
// 3. スマホ用ハンバーガーメニュー開閉
// ==========================================
const hamburger = document.getElementById('hamburger');
const spNav = document.getElementById('sp-nav');
const spNavLinks = document.querySelectorAll('.sp-nav a');

if (hamburger && spNav) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        spNav.classList.toggle('active');
        // メニュー開閉時に背景スクロールをロック
        document.body.style.overflow = spNav.classList.contains('active') ? 'hidden' : '';
    });

    // リンククリック時にメニューを閉じる
    spNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            spNav.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// ==========================================
// 4. スムーズスクロール
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
            const headerOffset = 60;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    });
});

// ==========================================
// 5. ランチセクションのカルーセル
// ==========================================
const slides = document.querySelectorAll('.carousel-img');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.carousel-prev');
const nextBtn = document.querySelector('.carousel-next');
let currentSlide = 0;

function goToSlide(n) {
    if (slides.length === 0) return;
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

if(slides.length > 0) {
    prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
    nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
    });
}

// ==========================================
// 6. 画像拡大モーダル
// ==========================================
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImg");
const closeBtn = document.querySelector(".modal-close");

if (modal && modalImg && closeBtn) {
    document.querySelectorAll('.carousel-img').forEach(img => {
        img.addEventListener('click', function() {
            modal.classList.add('show');
            modalImg.src = this.src;
        });
    });

    closeBtn.addEventListener('click', function() {
        modal.classList.remove('show');
    });

    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    });
}

// ==========================================
// 7. お客様の声 (Voice) の「もっと見る」開閉機能
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const voiceTexts = document.querySelectorAll('.voice-text');
    voiceTexts.forEach(text => {
        const btn = text.nextElementSibling;
        if (btn && btn.classList.contains('read-more-btn')) {
            text.classList.add('truncated');
            if (text.scrollHeight > text.offsetHeight + 2) {
                btn.classList.remove('hidden');
            } else {
                text.classList.remove('truncated');
                btn.classList.add('hidden');
            }

            btn.addEventListener('click', () => {
                if (text.classList.contains('truncated')) {
                    text.classList.remove('truncated');
                    text.classList.add('expanded');
                    btn.textContent = '閉じる';
                } else {
                    text.classList.add('truncated');
                    text.classList.remove('expanded');
                    btn.textContent = 'もっと見る';
                }
            });
        }
    });
});

// ==========================================
// 8. トップへ戻るボタン
// ==========================================
const backToTopBtn = document.getElementById('back-to-top');
if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ==========================================
// 9. テキスト選択禁止・画像保存禁止の補強
// ==========================================
// 画像の右クリックを禁止
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });
    // 画像のドラッグを禁止
    img.addEventListener('dragstart', (e) => {
        e.preventDefault();
    });
});
