/* ============================================
   MAIN JAVASCRIPT - SHARED ACROSS ALL PAGES
   ============================================ */

// Page Loader
window.addEventListener('load', () => {
    const loader = document.getElementById('pageLoader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 800);
    }
});

// Scroll Progress Indicator
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrollProgress = document.querySelector('.scroll-progress');
            if (scrollProgress) {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                const progress = (scrollTop / scrollHeight) * 100;
                scrollProgress.style.width = progress + '%';
            }
            ticking = false;
        });
        ticking = true;
    }
});

// Back to Top Button
const backToTopButton = document.getElementById('backToTop');

if (backToTopButton) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Keyboard accessibility for back to top
    backToTopButton.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    });
}

// Enhanced Card Reveal on Scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all cards and sections after page load
setTimeout(() => {
    // Observe cards
    document.querySelectorAll('.card, .project-card').forEach(card => {
        observer.observe(card);
    });

    // Enhanced section transitions
    document.querySelectorAll('section h2').forEach(heading => {
        observer.observe(heading);
    });

    // Observe activity and campus role items
    document.querySelectorAll('.activity-item, .campus-role-item').forEach(item => {
        observer.observe(item);
    });
}, 1000);

// Section Progress Indicator
const sections = document.querySelectorAll('section[id]');
let currentSection = '';

window.addEventListener('scroll', () => {
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const scrollPosition = window.pageYOffset + window.innerHeight / 2;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            if (currentSection !== section.id) {
                currentSection = section.id;
                // Add subtle animation to section when in view
                section.style.transition = 'all 0.3s ease';
            }
        }
    });
});
