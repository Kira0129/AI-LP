document.addEventListener('DOMContentLoaded', function () {

    // 0. Header Height Adjustment
    const adjustHeaderHeight = () => {
        const header = document.querySelector('.header');
        const main = document.querySelector('main');
        if (header && main) {
            const headerHeight = header.offsetHeight;
            main.style.paddingTop = `${headerHeight}px`;
            // アンカーリンク位置調整も合わせて行う
            document.documentElement.style.scrollPaddingTop = `${headerHeight}px`;
        }
    };

    // 初期実行とリサイズ対応
    adjustHeaderHeight();
    window.addEventListener('resize', adjustHeaderHeight);

    // 1. Swiper (FV)
    const fvSwiper = new Swiper('.fv-slider', {
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        loop: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        speed: 2000,
    });



    // 3. Hamburger Menu
    const hamburger = document.getElementById('js-hamburger');
    const spMenu = document.getElementById('js-sp-menu');
    const spLinks = document.querySelectorAll('.js-sp-link');

    if (hamburger && spMenu) {
        hamburger.addEventListener('click', function () {
            this.classList.toggle('active');
            spMenu.classList.toggle('active');
        });

        // リンククリック時に閉じる
        spLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                spMenu.classList.remove('active');
            });
        });
    }

    // 4. Scroll Animation (Intersection Observer)
    // 監視対象にしたい要素を選択（セクション、画像、テキストなど）
    const targets = document.querySelectorAll('.section, .broken-grid__img, .broken-grid__content, .service-item, .menu-item, .voice-card, .menu-recommend, .scene-box');

    // クラスをJSで付与
    targets.forEach(target => {
        target.classList.add('js-fade-up');
    });

    const options = {
        root: null,
        rootMargin: '-10% 0px', // 画面の下から10%入ったら発火
        threshold: 0
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-show');
                observer.unobserve(entry.target); // 一度発火したら監視解除
            }
        });
    }, options);

    targets.forEach(target => {
        observer.observe(target);
    });



    // 6. Right Click Disable (Backup for body attribute)
    document.addEventListener('contextmenu', event => event.preventDefault());

});
