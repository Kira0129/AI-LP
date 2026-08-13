document.addEventListener('DOMContentLoaded', () => {

    // FV Swiper
    const fvSwiper = new Swiper('.fv-swiper', {
        loop: true,
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        speed: 2000,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        allowTouchMove: true, // スワイプ可能に
    });



    // Hamburger Menu
    const hamburger = document.getElementById('js-hamburger');
    const spNav = document.getElementById('js-sp-nav');

    if (hamburger && spNav) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            spNav.classList.toggle('active');
        });

        // リンククリック時に閉じる
        spNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                spNav.classList.remove('active');
            });
        });
    }

    // Smooth Scroll for Internal Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Accordion
    const accordionHeads = document.querySelectorAll('.accordion__head');
    accordionHeads.forEach(head => {
        head.addEventListener('click', () => {
            head.classList.toggle('is-open');
            const body = head.nextElementSibling;
            if (head.classList.contains('is-open')) {
                body.style.height = body.scrollHeight + 'px';
                body.classList.add('is-open');
            } else {
                body.style.height = '0';
                body.classList.remove('is-open');
            }
        });
    });

    // Page Top Button
    const pageTop = document.getElementById('page-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            pageTop.classList.add('is-show');
        } else {
            pageTop.classList.remove('is-show');
        }
    });

    // Modal
    window.openModal = function (img) {
        const modal = document.getElementById('modal');
        const modalImg = document.getElementById('modal-img');
        modal.style.display = "flex";
        modalImg.src = img.src;
    };

    window.closeModal = function () {
        const modal = document.getElementById('modal');
        modal.style.display = "none";
    }

    // Close modal when clicking outside
    const modal = document.getElementById('modal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
});
