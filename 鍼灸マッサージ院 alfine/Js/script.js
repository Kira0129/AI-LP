document.addEventListener('DOMContentLoaded', () => {
    // FV Swiper
    const curNum = document.getElementById('curNum');
    new Swiper('.fv-swiper', {
        loop: true, effect: 'fade', fadeEffect: { crossFade: true },
        autoplay: { delay: 5000, disableOnInteraction: false },
        speed: 1500,
        on: {
            slideChange: function () {
                if (curNum) curNum.textContent = (this.realIndex + 1).toString().padStart(2, '0');
            }
        }
    });

    // Drawer
    const burger = document.getElementById('burger');
    const drawer = document.getElementById('drawer');
    const closeBtn = document.getElementById('close-drawer');
    const toggleDrawer = () => {
        drawer.classList.toggle('active');
        document.body.style.overflow = drawer.classList.contains('active') ? 'hidden' : '';
    };
    if(burger) burger.addEventListener('click', toggleDrawer);
    if(closeBtn) closeBtn.addEventListener('click', toggleDrawer);
    drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', toggleDrawer));

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if(href === '#') return;
            e.preventDefault();
            const target = document.querySelector(href);
            if(target) {
                const headerHeight = document.querySelector('.site-header').offsetHeight;
                window.scrollTo({
                    top: target.getBoundingClientRect().top + window.pageYOffset - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

    // FAQ Accordion
    document.querySelectorAll('.faq-q').forEach(q => {
        q.addEventListener('click', () => {
            const a = q.nextElementSibling;
            const isOpen = a.style.display === 'block';
            document.querySelectorAll('.faq-a').forEach(ans => ans.style.display = 'none');
            if(!isOpen) a.style.display = 'block';
        });
    });

    // Review Collapse/Expand
    document.querySelectorAll('.review-text').forEach(p => {
        // Wait a small amount for fonts to render before checking height
        setTimeout(() => {
            if (p.scrollHeight > p.clientHeight) {
                const btn = document.createElement('div');
                btn.className = 'text-alfineAccent text-sm font-bold mt-2 cursor-pointer inline-block border-b border-alfineAccent pb-0.5';
                btn.textContent = '続きを読む';
                p.parentNode.insertBefore(btn, p.nextSibling);
                
                btn.addEventListener('click', () => {
                    if (p.classList.contains('line-clamp-3')) {
                        p.classList.remove('line-clamp-3');
                        btn.textContent = '閉じる';
                    } else {
                        p.classList.add('line-clamp-3');
                        btn.textContent = '続きを読む';
                    }
                });
            }
        }, 100);
    });

    // Scroll Reveal Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active');
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Page Top Button
    const pageTop = document.getElementById('page-top');
    if (pageTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                pageTop.classList.add('active');
            } else {
                pageTop.classList.remove('active');
            }
        });
        pageTop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});
