        document.addEventListener('DOMContentLoaded', () => {
            // Scroll Animation (Fade in)
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

            document.querySelectorAll('.js-fade').forEach(el => observer.observe(el));

            // Header Background on Scroll
            const header = document.getElementById('js-header');
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    header.style.backgroundColor = 'rgba(248, 246, 240, 0.98)';
                    header.style.boxShadow = '0 4px 20px rgba(27, 42, 71, 0.05)';
                } else {
                    header.style.backgroundColor = 'rgba(248, 246, 240, 0.95)';
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

            // Page Top Button & SP CTA Visibility
            const pageTopBtn = document.getElementById('js-page-top');
            const spCta = document.getElementById('js-sp-cta');
            const aboutSection = document.getElementById('about');

            window.addEventListener('scroll', () => {
                // Page Top Button
                if (pageTopBtn) {
                    if (window.scrollY > 500) {
                        pageTopBtn.classList.remove('opacity-0', 'pointer-events-none');
                        pageTopBtn.classList.add('opacity-100', 'pointer-events-auto');
                    } else {
                        pageTopBtn.classList.remove('opacity-100', 'pointer-events-auto');
                        pageTopBtn.classList.add('opacity-0', 'pointer-events-none');
                    }
                }

                // SP Floating CTA
                if (spCta && aboutSection) {
                    if (window.scrollY > aboutSection.offsetTop - window.innerHeight + 100) {
                        spCta.classList.remove('translate-y-full', 'opacity-0', 'pointer-events-none');
                    } else {
                        spCta.classList.add('translate-y-full', 'opacity-0', 'pointer-events-none');
                    }
                }
            });

            // Voice section expand/collapse
            const voiceContents = document.querySelectorAll('.js-voice-content');
            const checkTruncation = () => {
                voiceContents.forEach(content => {
                    const toggleBtn = content.nextElementSibling;
                    if (!toggleBtn || !toggleBtn.classList.contains('js-voice-toggle')) return;
                    
                    if (content.classList.contains('line-clamp-3')) {
                        if (content.scrollHeight > content.clientHeight) {
                            toggleBtn.classList.remove('hidden');
                            toggleBtn.classList.add('flex');
                        } else {
                            toggleBtn.classList.add('hidden');
                            toggleBtn.classList.remove('flex');
                        }
                    }
                });
            };

            window.addEventListener('load', checkTruncation);
            window.addEventListener('resize', checkTruncation);
            checkTruncation();

            document.querySelectorAll('.js-voice-toggle').forEach(btn => {
                btn.addEventListener('click', function() {
                    const content = this.previousElementSibling;
                    const span = this.querySelector('span');
                    const icon = this.querySelector('i');
                    
                    if (content.classList.contains('line-clamp-3')) {
                        content.classList.remove('line-clamp-3');
                        span.textContent = '閉じる';
                        icon.classList.remove('fa-chevron-down');
                        icon.classList.add('fa-chevron-up');
                    } else {
                        content.classList.add('line-clamp-3');
                        span.textContent = '続きを読む';
                        icon.classList.remove('fa-chevron-up');
                        icon.classList.add('fa-chevron-down');
                    }
                });
            });
        });
    
