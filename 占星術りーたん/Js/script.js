document.addEventListener('DOMContentLoaded', () => {
    // Scroll Animation Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.js-fade, .js-blur-reveal').forEach(el => observer.observe(el));

    // FV Slideshow
    const imgs = document.querySelectorAll('#js-fv-slideshow img');
    if(imgs.length > 1) {
        let currentIdx = 0;
        setInterval(() => {
            imgs[currentIdx].classList.remove('is-active');
            currentIdx = (currentIdx + 1) % imgs.length;
            imgs[currentIdx].classList.add('is-active');
        }, 5000);
    }

    // Header Visibility on Scroll
    const header = document.getElementById('js-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('is-visible');
        } else {
            header.classList.remove('is-visible');
        }
    });
    // Initial check in case of refresh down the page
    if (window.scrollY > 100) header.classList.add('is-visible');

    // Parallax effect (Smooth & iOS Safari Compatible)
    const parallaxBgs = document.querySelectorAll('.js-parallax-bg');
    if (parallaxBgs.length > 0) {
        const updateParallax = () => {
            parallaxBgs.forEach(bg => {
                const parent = bg.closest('section');
                if (!parent) return;
                const rect = parent.getBoundingClientRect();
                
                // Check if section is in viewport
                if (rect.top <= window.innerHeight && rect.bottom >= 0) {
                    // Calculate offset from center of screen
                    const centerOffset = (window.innerHeight / 2) - (rect.top + rect.height / 2);
                    const speed = 0.2; // Parallax speed multiplier
                    const yPos = centerOffset * speed;
                    
                    // Apply transform. Use translate3d for hardware acceleration.
                    bg.style.transform = `translate3d(0, ${yPos}px, 0)`;
                }
            });
        };

        window.addEventListener('scroll', () => {
            requestAnimationFrame(updateParallax);
        }, { passive: true });
        
        // Initial setup
        updateParallax();
    }
});
