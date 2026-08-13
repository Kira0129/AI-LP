document.addEventListener('DOMContentLoaded', () => {
    // First View Swiper
    const curNum = document.getElementById('curNum');
    const fvSwiper = new Swiper('.fv-swiper', {
        loop: true,
        effect: 'fade',
        fadeEffect: { crossFade: true },
        autoplay: { delay: 5000, disableOnInteraction: false },
        speed: 1500,
        on: {
            slideChange: function () {
                if (curNum) {
                    const realIndex = this.realIndex + 1;
                    curNum.textContent = realIndex.toString().padStart(2, '0');
                }
            }
        }
    });

    // Hamburger Drawer Navigation
    const burger = document.getElementById('burger');
    const drawer = document.getElementById('drawer');
    const closeBtn = document.getElementById('close-drawer');

    if (burger) {
        burger.addEventListener('click', () => {
            drawer.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

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

    // Lightbox Modal for Images
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    document.body.appendChild(modalOverlay);

    modalOverlay.addEventListener('wheel', (e) => e.preventDefault(), { passive: false });
    modalOverlay.addEventListener('touchmove', (e) => e.preventDefault(), { passive: false });

    document.addEventListener('click', (e) => {
        const target = e.target.closest('.zoomable-img');
        if (target) {
            e.stopPropagation();
            e.preventDefault();

            modalOverlay.innerHTML = '';
            
            if (target.tagName === 'IMG') {
                // 実際の画像（<img>タグ）が配置された場合
                const fullImg = document.createElement('img');
                fullImg.src = target.src;
                fullImg.className = 'modal-img';
                modalOverlay.appendChild(fullImg);
            } else {
                // プレースホルダー（<div>タグ）の場合
                const content = document.createElement('div');
                content.innerHTML = target.innerHTML;
                content.className = 'modal-img img-placeholder !h-[60vh] !w-[80vw] !max-w-4xl text-2xl md:text-4xl';
                modalOverlay.appendChild(content);
            }
            
            modalOverlay.style.display = 'flex';
        }
    }, true);

    modalOverlay.addEventListener('click', () => {
        modalOverlay.style.display = 'none';
    });

    // Scroll to Top Button
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

    // Smooth Scroll with Header Offset
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
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });

    // Scroll Reveal Observer
    const revealOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
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
