document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('js-hamburger');
    const nav = document.querySelector('.header-nav');
    const navLinks = document.querySelectorAll('.header-nav a');

    // ハンバーガーボタンのクリックイベント
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        nav.classList.toggle('active');
        
        // メニューが開いているときはスクロールを防止
        // モバイルで確実にするため html 要素も一緒にロックします
        if (nav.classList.contains('active')) {
            document.documentElement.style.overflow = 'hidden';
            document.body.style.overflow = 'hidden';
        } else {
            document.documentElement.style.overflow = '';
            document.body.style.overflow = '';
            document.body.style.overflowX = 'hidden'; // 初期状態に戻す
        }
    });

    // メニュー内リンククリックでメニューを閉じる
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            nav.classList.remove('active');
            document.documentElement.style.overflow = '';
            document.body.style.overflow = '';
            document.body.style.overflowX = 'hidden';
        });
    });

    // クチコミの「もっと見る」制御
    const reviewTexts = document.querySelectorAll('.js-review-text');
    
    reviewTexts.forEach(text => {
        const btn = text.nextElementSibling;
        
        if (text.scrollHeight > text.clientHeight) {
            btn.classList.add('is-visible');
        }

        btn.addEventListener('click', function() {
            text.classList.toggle('collapsed');
            btn.classList.toggle('is-expanded');
        });
    });

    // TOPへ戻るボタンの制御
    const pagetop = document.getElementById('js-pagetop');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 200) {
            pagetop.classList.add('is-visible');
        } else {
            pagetop.classList.remove('is-visible');
        }
    });

    pagetop.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 右クリック禁止
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
    });

    // 画像のドラッグ禁止
    document.addEventListener('dragstart', function(e) {
        if (e.target.tagName === 'IMG') {
            e.preventDefault();
        }
    });

    // ==========================================
    // スクロールアニメーション (Intersection Observer)
    // ==========================================
    const observerOptions = {
        root: null,
        // ビューポートの下から10%要素が入ったタイミングで発火させる
        rootMargin: '0px 0px -10% 0px', 
        threshold: 0
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-animated');
                // 1度アニメーションしたら監視を解除して負荷を下げる
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // アニメーション対象のクラスを持つ要素をすべて取得して監視
    const animatedElements = document.querySelectorAll('.js-fade-up, .js-fade-left, .js-fade-right, .js-fade-in');
    animatedElements.forEach(el => observer.observe(el));
});
