// Nav scroll
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
});

// Reveal on scroll
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('visible');
            observer.unobserve(e.target);
        }
    });
}, { threshold: 0.12 });
revealEls.forEach(el => observer.observe(el));

// Before & After Slider
const baTrack = document.getElementById('ba-track');
const baPrev = document.getElementById('ba-prev');
const baNext = document.getElementById('ba-next');
let baIndex = 0;
const baSlidesCount = 3;

function updateBaSlider() {
    baTrack.style.transform = `translateX(-${baIndex * 100}%)`;
}

if (baPrev && baNext && baTrack) {
    baPrev.addEventListener('click', () => {
        baIndex = (baIndex > 0) ? baIndex - 1 : baSlidesCount - 1;
        updateBaSlider();
    });

    baNext.addEventListener('click', () => {
        baIndex = (baIndex < baSlidesCount - 1) ? baIndex + 1 : 0;
        updateBaSlider();
    });
}
 
 // Hero Slider
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
 
 // Back to Top
 const backToTop = document.getElementById('back-to-top');
 if (backToTop) {
     window.addEventListener('scroll', () => {
         if (window.scrollY > 500) {
             backToTop.classList.add('show');
         } else {
             backToTop.classList.remove('show');
         }
     });
 
    backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}


// Mobile Menu Toggle
const hamburgerBtn = document.getElementById('hamburger-btn');
if (hamburgerBtn && nav) {
    hamburgerBtn.addEventListener('click', () => {
        nav.classList.toggle('nav-open');
        // Disable scroll when menu is open
        if (nav.classList.contains('nav-open')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // Close menu when clicking link
    const navMobileLinks = document.querySelectorAll('.nav-links a');
    navMobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('nav-open');
            document.body.style.overflow = '';
        });
    });
}

// Disable Right Click
document.addEventListener('contextmenu', (e) => e.preventDefault());
