document.addEventListener('DOMContentLoaded', () => {
            // Scroll Animation (Fade in & Blur reveal)
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-active');
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            document.querySelectorAll('.js-fade, .js-blur-reveal').forEach(el => observer.observe(el));

            // Header Background on Scroll
            const header = document.getElementById('js-header');
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    header.style.backgroundColor = 'rgba(250, 248, 245, 0.98)';
                    header.style.boxShadow = '0 4px 20px rgba(91, 75, 70, 0.05)';
                } else {
                    header.style.backgroundColor = 'rgba(250, 248, 245, 0.95)';
                    header.style.boxShadow = 'none';
                }
            });

            // Hamburger Menu
            const hamburger = document.getElementById('js-hamburger');
            const mobileMenu = document.getElementById('js-mobile-menu');
            const mobileLinks = document.querySelectorAll('.js-mobile-link');
            const mobileClose = document.getElementById('js-mobile-close');

            if (hamburger && mobileMenu) {
                const toggleMenu = () => {
                    hamburger.classList.toggle('is-open');
                    mobileMenu.classList.toggle('is-open');
                    document.body.style.overflow = hamburger.classList.contains('is-open') ? 'hidden' : '';
                };

                const closeMenu = () => {
                    hamburger.classList.remove('is-open');
                    mobileMenu.classList.remove('is-open');
                    document.body.style.overflow = '';
                }

                hamburger.addEventListener('click', toggleMenu);
                if (mobileClose) mobileClose.addEventListener('click', closeMenu);
                mobileLinks.forEach(link => link.addEventListener('click', closeMenu));
            }

            // Smooth Scroll for anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    if (targetId === '#') {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    } else {
                        const targetElement = document.querySelector(targetId);
                        if (targetElement) {
                            const headerHeight = document.querySelector('.header').offsetHeight;
                            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                            window.scrollTo({
                                top: targetPosition,
                                behavior: 'smooth'
                            });
                        }
                    }
                });
            });

            // Image Modal
            const modal = document.getElementById('js-image-modal');
            const modalImg = document.getElementById('js-modal-image-src');
            const modalClose = document.getElementById('js-modal-close');
            const modalTriggers = document.querySelectorAll('.js-modal-img');

            if (modal && modalImg && modalTriggers.length > 0) {
                const openModal = (src) => {
                    modalImg.src = src;
                    modal.classList.remove('opacity-0', 'pointer-events-none');
                    modalImg.classList.remove('scale-95');
                    modalImg.classList.add('scale-100');
                    document.body.style.overflow = 'hidden';
                };

                const closeModal = () => {
                    modal.classList.add('opacity-0', 'pointer-events-none');
                    modalImg.classList.add('scale-95');
                    modalImg.classList.remove('scale-100');
                    setTimeout(() => {
                        modalImg.src = '';
                        document.body.style.overflow = '';
                    }, 300);
                };

                modalTriggers.forEach(trigger => {
                    trigger.addEventListener('click', () => {
                        const src = trigger.getAttribute('data-src');
                        if (src) openModal(src);
                    });
                });

                modalClose.addEventListener('click', closeModal);
                modal.addEventListener('click', (e) => {
                    if (e.target === modal) closeModal();
                });
            }

            // Page Top Button Visibility
            const pageTopBtn = document.getElementById('js-page-top');
            if (pageTopBtn) {
                window.addEventListener('scroll', () => {
                    if (window.scrollY > 500) {
                        pageTopBtn.classList.remove('opacity-0', 'pointer-events-none');
                        pageTopBtn.classList.add('opacity-100', 'pointer-events-auto');
                    } else {
                        pageTopBtn.classList.remove('opacity-100', 'pointer-events-auto');
                        pageTopBtn.classList.add('opacity-0', 'pointer-events-none');
                    }
                });
            }
        });