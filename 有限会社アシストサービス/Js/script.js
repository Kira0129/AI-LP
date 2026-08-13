// Hero Image Slider
const heroImages = document.querySelectorAll('.hero-img');
let currentHeroIndex = 0;

function nextHeroImage() {
    if (heroImages.length === 0) return;
    heroImages[currentHeroIndex].classList.remove('active');
    currentHeroIndex = (currentHeroIndex + 1) % heroImages.length;
    heroImages[currentHeroIndex].classList.add('active');
}

if (heroImages.length > 1) {
    setInterval(nextHeroImage, 5000);
}

// Nav Scroll Effect
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
});

// Scroll Reveal Animation
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('visible');
            observer.unobserve(e.target);
        }
    });
}, { threshold: 0.1 });
revealEls.forEach(el => observer.observe(el));

// Mobile Menu Toggle
const hamburgerBtn = document.querySelector('.hamburger-btn');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links a');

if (hamburgerBtn && navLinks) {
    hamburgerBtn.addEventListener('click', () => {
        hamburgerBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    navLinksItems.forEach(item => {
        item.addEventListener('click', () => {
            hamburgerBtn.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// Prevent Right Click
document.addEventListener('contextmenu', (e) => e.preventDefault());

// Image Modal Background Click
const imageModal = document.getElementById('imageModal');
if (imageModal) {
    imageModal.addEventListener('click', (e) => {
        if (e.target === imageModal) {
            closeModal();
        }
    });
}

// Image Modal Functions
function openModal(src) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImg');
    if(modal && modalImg) {
        modal.style.display = "flex";
        void modal.offsetHeight; 
        modal.classList.add('show');
        modalImg.src = src;
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    if(modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = "none";
        }, 300);
        document.body.style.overflow = '';
    }
}

// Back to Top Button
const backToTopBtn = document.getElementById('backToTop');
if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// SP CTA Bar Scroll Effect
const spCtaBar = document.querySelector('.sp-cta-bar');
const troublesSection = document.getElementById('troubles');

if (spCtaBar && troublesSection) {
    window.addEventListener('scroll', () => {
        const troublesRect = troublesSection.getBoundingClientRect();
        // Show the CTA bar when the troubles section enters the viewport
        if (troublesRect.top <= window.innerHeight) {
            spCtaBar.classList.add('show');
        } else {
            spCtaBar.classList.remove('show');
        }
    });
}
