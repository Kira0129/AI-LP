document.addEventListener('DOMContentLoaded', () => {
                    const reviewContents = document.querySelectorAll('.review-content');
                    reviewContents.forEach(content => {
                        const p = content.querySelector('p');
                        const btn = content.querySelector('.read-more-btn');

                        if (p && btn) {
                            setTimeout(() => {
                                // 要素の実際の高さと制限された高さを比較してボタンの表示非表示を切り替え
                                if (p.scrollHeight <= p.clientHeight) {
                                    btn.style.display = 'none';
                                }
                            }, 100);

                            btn.addEventListener('click', () => {
                                p.classList.toggle('line-clamp-3');
                                if (p.classList.contains('line-clamp-3')) {
                                    btn.textContent = '続きを読む';
                                } else {
                                    btn.textContent = '閉じる';
                                }
                            });
                        }
                    });
                });
            

        // スクロール時のヘッダー背景色変更
        const header = document.getElementById('header');
        const headerLogo = document.getElementById('header-logo');
        const headerNav = document.getElementById('header-nav');
        const headerBtns = document.querySelectorAll('.header-btn');
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');

        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                // スクロール時：白背景
                header.classList.add('bg-white', 'shadow-md');
                header.classList.remove('bg-transparent');

                headerLogo.classList.remove('text-white');
                headerLogo.classList.add('text-[var(--accent-navy)]');

                headerNav.classList.remove('text-white');
                headerNav.classList.add('text-[var(--text-brown)]');

                headerBtns.forEach(btn => {
                    if (btn.textContent.includes('WEB予約')) return; // WEB予約ボタンは色維持
                    btn.classList.remove('border-white', 'text-white', 'hover:bg-white', 'hover:text-[var(--accent-navy)]');
                    btn.classList.add('border-[var(--accent-navy)]', 'text-[var(--accent-navy)]', 'hover:bg-[var(--accent-navy)]', 'hover:text-white');
                });

                mobileMenuBtn.classList.remove('text-white');
                mobileMenuBtn.classList.add('text-[var(--accent-navy)]');
            } else {
                // トップ時：透明背景
                header.classList.remove('bg-white', 'shadow-md');
                header.classList.add('bg-transparent');

                headerLogo.classList.add('text-white');
                headerLogo.classList.remove('text-[var(--accent-navy)]');

                headerNav.classList.add('text-white');
                headerNav.classList.remove('text-[var(--text-brown)]');

                headerBtns.forEach(btn => {
                    if (btn.textContent.includes('WEB予約')) return;
                    btn.classList.add('border-white', 'text-white', 'hover:bg-white', 'hover:text-[var(--accent-navy)]');
                    btn.classList.remove('border-[var(--accent-navy)]', 'text-[var(--accent-navy)]', 'hover:bg-[var(--accent-navy)]', 'hover:text-white');
                });

                if (!document.getElementById('mobile-menu').classList.contains('translate-x-0')) {
                    mobileMenuBtn.classList.add('text-white');
                    mobileMenuBtn.classList.remove('text-[var(--accent-navy)]');
                }
            }
        });

        // モバイルメニューのトグル
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileLinks = document.querySelectorAll('.mobile-link');
        let isMenuOpen = false;

        function toggleMenu() {
            isMenuOpen = !isMenuOpen;
            if (isMenuOpen) {
                mobileMenu.classList.remove('translate-x-full');
                mobileMenu.classList.add('translate-x-0');
                mobileMenuBtn.innerHTML = '<svg class="w-8 h-8 transition-colors duration-500" fill="none" stroke="white" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>';
            } else {
                mobileMenu.classList.add('translate-x-full');
                mobileMenu.classList.remove('translate-x-0');
                const iconColor = window.scrollY > 50 ? 'var(--accent-navy)' : 'white';
                mobileMenuBtn.innerHTML = `<svg class="w-8 h-8 transition-colors duration-500" fill="none" stroke="${iconColor}" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>`;
            }
        }

        mobileMenuBtn.addEventListener('click', toggleMenu);
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => { if (isMenuOpen) toggleMenu(); });
        });

        // フェードインアニメーション
        const fadeElements = document.querySelectorAll('.fade-in');
        const observerOptions = { root: null, rootMargin: '0px', threshold: 0.15 };
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('appear');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        fadeElements.forEach(el => observer.observe(el));

        // ページロード時のフェードイン
        window.addEventListener('load', () => {
            document.querySelectorAll('section:first-of-type .fade-in').forEach(el => el.classList.add('appear'));
        });

        // TOPへ戻るボタンと追従CTA
        const backToTopBtn = document.getElementById('back-to-top');
        const spFloatingCta = document.getElementById('sp-floating-cta');

        window.addEventListener('scroll', () => {
            if (backToTopBtn) {
                if (window.scrollY > 300) {
                    backToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
                    backToTopBtn.classList.add('opacity-100');
                } else {
                    backToTopBtn.classList.remove('opacity-100');
                    backToTopBtn.classList.add('opacity-0', 'pointer-events-none');
                }
            }

            if (spFloatingCta) {
                if (window.scrollY > window.innerHeight * 0.5) {
                    spFloatingCta.classList.remove('opacity-0', 'pointer-events-none');
                    spFloatingCta.classList.add('opacity-100', 'pointer-events-auto');
                } else {
                    spFloatingCta.classList.remove('opacity-100', 'pointer-events-auto');
                    spFloatingCta.classList.add('opacity-0', 'pointer-events-none');
                }
            }
        });

        if (backToTopBtn) {
            backToTopBtn.addEventListener('click', (e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
