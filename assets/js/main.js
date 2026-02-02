/* ============================================
   MAIN JAVASCRIPT - SHARED ACROSS ALL PAGES
   ============================================ */

// Easter Egg - Matrix Mode (Type "matrix" anywhere on the page)
(function() {
    let typedKeys = '';
    let matrixActive = false;
    const secretWord = 'matrix';
    let rainInterval;

    document.addEventListener('keydown', (e) => {
        // Only track letter keys
        if (e.key.length === 1 && e.key.match(/[a-z]/i)) {
            typedKeys += e.key.toLowerCase();
            
            // Keep only last 10 characters
            if (typedKeys.length > 10) {
                typedKeys = typedKeys.slice(-10);
            }
            
            // Check if secret word is typed
            if (typedKeys.includes(secretWord)) {
                activateMatrixMode();
                typedKeys = '';
            }
        }
    });

    function createBinaryRain() {
        const canvas = document.createElement('canvas');
        canvas.id = 'matrix-canvas';
        canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
            pointer-events: none;
            opacity: 0.2;
        `;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        document.body.insertBefore(canvas, document.body.firstChild);

        const ctx = canvas.getContext('2d');
        const fontSize = 16;
        const columns = Math.floor(canvas.width / fontSize);
        const drops = Array(columns).fill(1);

        function draw() {
            // Trail effect
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#00ff41';
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                const text = Math.random() > 0.5 ? '1' : '0';
                const x = i * fontSize;
                const y = drops[i] * fontSize;

                ctx.fillText(text, x, y);

                if (y > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }

        rainInterval = setInterval(draw, 33);
        return canvas;
    }

    function activateMatrixMode() {
        if (matrixActive) return;
        matrixActive = true;

        // Create binary rain
        const canvas = createBinaryRain();

        // Create creepy but polished notification
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            background: linear-gradient(135deg, rgba(0, 40, 20, 0.95), rgba(0, 20, 10, 0.95));
            color: #00ff41;
            padding: 1.2rem 1.8rem;
            border: 2px solid #00ff41;
            border-radius: 8px;
            font-family: 'Courier New', monospace;
            font-size: 0.9rem;
            z-index: 99999;
            box-shadow: 
                0 0 30px rgba(0, 255, 65, 0.4),
                inset 0 0 20px rgba(0, 255, 65, 0.1);
            animation: slideInRight 0.6s cubic-bezier(0.4, 0, 0.2, 1), pulse 2s ease-in-out infinite;
            backdrop-filter: blur(10px);
        `;
        notification.innerHTML = `
            <div style="font-size: 1rem; margin-bottom: 0.5rem; font-weight: bold;">⚠️ SYSTEM BREACH DETECTED</div>
            <div style="opacity: 0.8; font-size: 0.8rem;">Press ESC to restore system</div>
        `;
        document.body.appendChild(notification);

        // Remove notification after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            setTimeout(() => notification.remove(), 600);
        }, 5000);

        // Store original colors for restoration
        const originalStyles = new Map();
        
        // Apply polished Matrix theme
        document.body.style.transition = 'all 1s cubic-bezier(0.4, 0, 0.2, 1)';
        document.body.style.background = 'linear-gradient(135deg, #000000 0%, #001a0d 100%)';
        document.body.style.color = '#00ff41';
        
        // Transform all elements with smooth transitions
        const allElements = document.querySelectorAll('*');
        allElements.forEach(el => {
            if (el !== notification && !notification.contains(el) && el !== canvas) {
                // Store original styles
                originalStyles.set(el, {
                    color: el.style.color,
                    backgroundColor: el.style.backgroundColor,
                    textShadow: el.style.textShadow,
                    borderColor: el.style.borderColor,
                    boxShadow: el.style.boxShadow
                });
                
                el.style.transition = 'all 1s cubic-bezier(0.4, 0, 0.2, 1)';
                el.style.color = '#00ff41';
                el.style.textShadow = '0 0 8px rgba(0, 255, 65, 0.6)';
                
                // Dark backgrounds with glass effect
                const bgColor = window.getComputedStyle(el).backgroundColor;
                if (bgColor !== 'rgba(0, 0, 0, 0)') {
                    el.style.backgroundColor = 'rgba(0, 26, 13, 0.6)';
                    el.style.backdropFilter = 'blur(10px)';
                }
                
                // Glowing green borders
                if (window.getComputedStyle(el).borderColor) {
                    el.style.borderColor = '#00ff41';
                }
                
                // Add glow to cards and buttons
                if (el.classList.contains('card') || el.tagName === 'BUTTON' || el.tagName === 'A') {
                    el.style.boxShadow = '0 0 20px rgba(0, 255, 65, 0.3)';
                }
            }
        });

        // Update CSS variables with bright Matrix green
        document.documentElement.style.setProperty('--wine', '#00ff41');
        document.documentElement.style.setProperty('--wine-light', '#33ff66');
        document.documentElement.style.setProperty('--wine-dark', '#00cc33');
        document.documentElement.style.setProperty('--cream', '#000000');
        document.documentElement.style.setProperty('--charcoal', '#00ff41');
        document.documentElement.style.setProperty('--gray', '#00cc33');
        document.documentElement.style.setProperty('--light-gray', '#003319');

        // Add polished effects with creepy touches
        const style = document.createElement('style');
        style.id = 'matrix-style';
        style.textContent = `
            @keyframes slideInRight {
                from { 
                    transform: translateX(400px);
                    opacity: 0;
                }
                to { 
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOutRight {
                from { 
                    transform: translateX(0);
                    opacity: 1;
                }
                to { 
                    transform: translateX(400px);
                    opacity: 0;
                }
            }
            
            @keyframes pulse {
                0%, 100% {
                    box-shadow: 0 0 30px rgba(0, 255, 65, 0.4), inset 0 0 20px rgba(0, 255, 65, 0.1);
                }
                50% {
                    box-shadow: 0 0 40px rgba(0, 255, 65, 0.6), inset 0 0 30px rgba(0, 255, 65, 0.2);
                }
            }
            
            /* Subtle scanline effect */
            body::after {
                content: '';
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: repeating-linear-gradient(
                    0deg,
                    rgba(0, 255, 65, 0.02),
                    rgba(0, 255, 65, 0.02) 1px,
                    transparent 1px,
                    transparent 3px
                );
                pointer-events: none;
                z-index: 9999;
                animation: scanline 10s linear infinite;
            }
            
            @keyframes scanline {
                0% { transform: translateY(0); }
                100% { transform: translateY(15px); }
            }
            
            /* Creepy screen flicker (subtle) */
            body {
                animation: flicker 3s infinite;
            }
            
            @keyframes flicker {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.98; }
                50.1% { opacity: 1; }
                50.2% { opacity: 0.99; }
            }
            
            /* Smooth glow pulse on interactive elements */
            a:hover, button:hover {
                text-shadow: 0 0 15px rgba(0, 255, 65, 0.9) !important;
                transform: translateY(-2px);
                transition: all 0.3s ease !important;
            }
            
            /* Enhanced image effects */
            img {
                filter: hue-rotate(80deg) saturate(1.5) brightness(0.8) contrast(1.1) !important;
                box-shadow: 0 0 30px rgba(0, 255, 65, 0.4) !important;
                transition: all 0.5s ease !important;
            }
            
            img:hover {
                filter: hue-rotate(80deg) saturate(1.8) brightness(0.9) contrast(1.2) !important;
                box-shadow: 0 0 40px rgba(0, 255, 65, 0.6) !important;
            }
            
            /* Glowing scrollbar */
            ::-webkit-scrollbar {
                width: 10px;
            }
            
            ::-webkit-scrollbar-track {
                background: #000;
            }
            
            ::-webkit-scrollbar-thumb {
                background: #00ff41;
                border-radius: 5px;
                box-shadow: 0 0 10px #00ff41;
            }
            
            ::-webkit-scrollbar-thumb:hover {
                background: #33ff66;
            }
            
            /* Selection color */
            ::selection {
                background: rgba(0, 255, 65, 0.3);
                color: #00ff41;
            }
            
            /* Creepy crosshair cursor */
            * {
                cursor: crosshair !important;
            }
            
            a, button {
                cursor: pointer !important;
            }
        `;
        document.head.appendChild(style);

        // Store for cleanup
        canvas._originalStyles = originalStyles;

        // Press ESC to exit
        const exitHandler = (e) => {
            if (e.key === 'Escape') {
                clearInterval(rainInterval);
                canvas.remove();
                notification.remove();
                
                const styleEl = document.getElementById('matrix-style');
                if (styleEl) styleEl.remove();
                
                document.body.style.background = '';
                document.body.style.color = '';
                document.body.style.animation = '';
                
                // Restore original styles smoothly
                allElements.forEach(el => {
                    const original = originalStyles.get(el);
                    if (original) {
                        el.style.color = original.color;
                        el.style.backgroundColor = original.backgroundColor;
                        el.style.textShadow = original.textShadow;
                        el.style.borderColor = original.borderColor;
                        el.style.boxShadow = original.boxShadow;
                        el.style.backdropFilter = '';
                    }
                });

                // Restore CSS variables
                document.documentElement.style.setProperty('--wine', '#7d1e3e');
                document.documentElement.style.setProperty('--wine-light', '#9d3a5a');
                document.documentElement.style.setProperty('--wine-dark', '#5a1529');
                document.documentElement.style.setProperty('--cream', '#faf8f5');
                document.documentElement.style.setProperty('--charcoal', '#2a2a2a');
                document.documentElement.style.setProperty('--gray', '#6a6a6a');
                document.documentElement.style.setProperty('--light-gray', '#e8e6e3');
                
                matrixActive = false;
                document.removeEventListener('keydown', exitHandler);
            }
        };
        document.addEventListener('keydown', exitHandler);
    }
})();

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