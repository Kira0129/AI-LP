document.addEventListener('DOMContentLoaded', () => {
    // 画像の保存（右クリック・ドラッグ）を禁止
    document.addEventListener('contextmenu', e => {
        if (e.target.tagName === 'IMG') e.preventDefault();
    });
    document.addEventListener('dragstart', e => {
        if (e.target.tagName === 'IMG') e.preventDefault();
    });

    // 1. First View Swiper
    const curNum = document.getElementById('curNum');
    const fvSwiper = new Swiper('.fv-swiper', {
        loop: true,
        effect: 'fade',
        fadeEffect: { crossFade: true },
        autoplay: {
            delay: 6000,
            disableOnInteraction: false,
        },
        speed: 2000,
        on: {
            slideChange: function () {
                if (curNum) {
                    const realIndex = this.realIndex + 1;
                    curNum.textContent = realIndex.toString().padStart(2, '0');
                }
            }
        }
    });

    // 3. Hamburger Drawer Navigation
    const burgers = [
        document.getElementById('burger'),
        document.getElementById('burger-mobile'),
        document.getElementById('burger-scrolled')
    ];
    const drawer = document.getElementById('drawer');
    const closeBtn = document.getElementById('close-drawer');

    burgers.forEach(b => {
        if (b) {
            b.addEventListener('click', () => {
                drawer.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        }
    });

    if (drawer) {
        const closeMenu = () => {
            drawer.classList.remove('active');
            document.body.style.overflow = '';
        };

        if (closeBtn) closeBtn.addEventListener('click', closeMenu);
        drawer.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });
    }

    // 4. Scroll to Top Button Visibility
    const scrollTop = document.getElementById('scrollTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 800) {
            scrollTop.classList.remove('opacity-0', 'invisible');
            scrollTop.classList.add('opacity-100', 'visible');
        } else {
            scrollTop.classList.add('opacity-0', 'invisible');
            scrollTop.classList.remove('opacity-100', 'visible');
        }
    });

    scrollTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // 5. Lightbox Modal for Gallery Images
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    document.body.appendChild(modalOverlay);

    // モーダル表示中の背景スクロールを防止（body overflow:hiddenによるレイアウトシフト＝Swiper停止を防ぐため）
    modalOverlay.addEventListener('wheel', (e) => e.preventDefault(), { passive: false });
    modalOverlay.addEventListener('touchmove', (e) => e.preventDefault(), { passive: false });

    document.addEventListener('click', (e) => {
        const img = e.target.closest('.gallery-img');
        if (img) {
            e.stopPropagation(); // Swiperへのイベント伝播を完全に遮断し、スクロールの一時停止を防ぐ
            e.preventDefault();

            const fullImg = document.createElement('img');
            fullImg.src = img.src;
            fullImg.className = 'modal-img';
            modalOverlay.innerHTML = '';
            modalOverlay.appendChild(fullImg);
            modalOverlay.style.display = 'flex';
        }
    }, true);

    modalOverlay.addEventListener('click', () => {
        modalOverlay.style.display = 'none';
    });


    // 7. Smooth Scroll to Target Anchors with Offset Header
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if(href === '#') return;
            e.preventDefault();
            const target = document.querySelector(href);
            if(target) {
                const header = document.querySelector('header');
                const headerHeight = header ? header.offsetHeight : 90;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 8. Scroll Reveal Observer
    const revealOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, revealOptions);

    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });
});
