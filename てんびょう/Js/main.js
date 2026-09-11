        document.addEventListener('DOMContentLoaded', () => {
            const menuToggle = document.getElementById('menuToggle');
            const mobileMenu = document.getElementById('mobileMenu');
            let isMenuOpen = false;

            menuToggle.addEventListener('click', () => {
                isMenuOpen = !isMenuOpen;
                const mobileCTA = document.getElementById('mobileCTA');
                if (isMenuOpen) {
                    mobileMenu.classList.remove('opacity-0', 'pointer-events-none');
                    mobileMenu.classList.add('opacity-100', 'pointer-events-auto');
                    if (mobileCTA) mobileCTA.classList.add('opacity-0', 'pointer-events-none');
                    menuToggle.classList.add('is-active');
                } else {
                    mobileMenu.classList.add('opacity-0', 'pointer-events-none');
                    mobileMenu.classList.remove('opacity-100', 'pointer-events-auto');
                    if (mobileCTA) updateMobileCTA();
                    menuToggle.classList.remove('is-active');
                }
            });

            document.querySelectorAll('.mobile-nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    isMenuOpen = false;
                    mobileMenu.classList.add('opacity-0', 'pointer-events-none');
                    updateMobileCTA();
                    menuToggle.classList.remove('is-active');
                });
            });

            const header = document.getElementById('mainHeader');
            const updateMobileCTA = () => {
                const mobileCTA = document.getElementById('mobileCTA');
                if (!mobileCTA) return;
                if (window.scrollY > 100 && !isMenuOpen) {
                    mobileCTA.classList.remove('opacity-0', 'pointer-events-none');
                    mobileCTA.classList.add('opacity-100', 'pointer-events-auto');
                } else {
                    mobileCTA.classList.add('opacity-0', 'pointer-events-none');
                    mobileCTA.classList.remove('opacity-100', 'pointer-events-auto');
                }
            };

            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) header.classList.add('scrolled');
                else header.classList.remove('scrolled');
                updateMobileCTA();
            });

            const revealObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) entry.target.classList.add('active');
                });
            }, { threshold: 0.1 });
            document.querySelectorAll('.section-reveal').forEach(section => {
                revealObserver.observe(section);
            });

            new Swiper('.voice-swiper', {
                slidesPerView: 1, spaceBetween: 20, loop: true,
                autoplay: { delay: 4000, disableOnInteraction: false },
                speed: 800,
                breakpoints: {
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 }
                },
                pagination: { el: '.swiper-pagination', clickable: true },
            });

            const serviceContents = document.querySelectorAll('.service-content-inner');
            const serviceImages = document.querySelectorAll('.service-image-fixed');
            const serviceUnifiedObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const pointIndex = entry.target.getAttribute('data-service-trigger');
                        serviceContents.forEach((content, idx) => {
                            if (idx + 1 == pointIndex) {
                                content.classList.remove('opacity-0', 'translate-y-8', 'pointer-events-none');
                                content.classList.add('opacity-100', 'translate-y-0', 'pointer-events-auto');
                            } else {
                                content.classList.remove('opacity-100', 'translate-y-0', 'pointer-events-auto');
                                content.classList.add('opacity-0', 'translate-y-8', 'pointer-events-none');
                            }
                        });
                        serviceImages.forEach((img, idx) => {
                            img.style.opacity = (idx + 1 == pointIndex) ? '1' : '0';
                        });
                    }
                });
            }, { threshold: 0.5 });
            document.querySelectorAll('[data-service-trigger]').forEach(trigger => {
                serviceUnifiedObserver.observe(trigger);
            });

            const serviceSection = document.getElementById('features');
            const progressLine = document.getElementById('service-progress-line');
            if (serviceSection && progressLine) {
                window.addEventListener('scroll', () => {
                    const rect = serviceSection.getBoundingClientRect();
                    const sectionHeight = serviceSection.offsetHeight;
                    const viewHeight = window.innerHeight;
                    let progress = (-rect.top) / (sectionHeight - viewHeight);
                    progress = Math.max(0, Math.min(1, progress));
                    
                    if (window.innerWidth >= 768) {
                        progressLine.style.height = `${progress * 100}%`;
                        progressLine.style.width = '100%';
                    } else {
                        progressLine.style.width = `${progress * 100}%`;
                        progressLine.style.height = '100%';
                    }
                });
            }

            const fvElements = {
                catch: document.getElementById('fv-catch'),
                sub: document.getElementById('fv-sub'),
                logoName: document.getElementById('fv-logo'),
                readMore: document.getElementById('fv-read-more'),
                readMoreLine: document.querySelector('.fv-read-more-line'),
                gridItems: document.querySelectorAll('.fv-grid-item'),
                decoItems: document.querySelectorAll('.fv-deco')
            };

            const splitTextToChars = (el) => {
                if (!el) return;
                const lines = el.querySelectorAll('.fv-catch-line');
                if (lines.length > 0) {
                    let globalIndex = 0;
                    lines.forEach(line => {
                        const text = line.textContent.trim();
                        line.innerHTML = '';
                        [...text].forEach(char => {
                            const span = document.createElement('span');
                            span.textContent = char;
                            span.className = 'char';
                            span.style.setProperty('--char-index', globalIndex++);
                            line.appendChild(span);
                        });
                    });
                }
            };
            splitTextToChars(fvElements.catch);

            const startFVAnimation = () => {
                if (fvElements.catch) fvElements.catch.classList.add('is-active');

                setTimeout(() => {
                    fvElements.decoItems.forEach((deco, index) => {
                        setTimeout(() => deco.classList.add('show'), index * 100);
                    });
                }, 300);

                setTimeout(() => {
                    if (fvElements.sub) fvElements.sub.classList.add('is-active');
                }, 800);

                setTimeout(() => {
                    if (fvElements.logoName) fvElements.logoName.classList.add('is-active');
                }, 1200);

                setTimeout(() => {
                    if (fvElements.readMore) {
                        fvElements.readMore.classList.add('is-visible');
                        if (fvElements.readMoreLine) fvElements.readMoreLine.classList.add('animate');
                    }
                }, 1800);

                setTimeout(() => {
                    fvElements.gridItems.forEach((item, index) => {
                        setTimeout(() => item.classList.add('show'), index * 150);
                    });
                }, 2200);
            };

            // Voice Read More functionality
            const reviewTexts = document.querySelectorAll('.review-text');
            reviewTexts.forEach(text => {
                const btn = text.nextElementSibling;
                if (!btn || !btn.classList.contains('read-more-btn')) return;
                
                // Small delay to ensure rendering and fonts are loaded before checking height
                setTimeout(() => {
                    if (text.scrollHeight > text.clientHeight + 2) {
                        btn.classList.remove('hidden');
                        btn.addEventListener('click', function() {
                            if (text.classList.contains('line-clamp-3')) {
                                text.classList.remove('line-clamp-3');
                                btn.innerHTML = '閉じる <i class="fa-solid fa-chevron-up ml-1 text-xs"></i>';
                            } else {
                                text.classList.add('line-clamp-3');
                                btn.innerHTML = '続きを読む <i class="fa-solid fa-chevron-down ml-1 text-xs"></i>';
                            }
                        });
                    }
                }, 500);
            });

            setTimeout(startFVAnimation, 100);
        });

