/* ============================================
   HOME PAGE JAVASCRIPT
   ============================================ */

// Email link protection
const user = "cynthia.niaz.dev";
const domain = "gmail.com";
const link = document.getElementById("email-link");

if (link) {
    link.href = "mailto:" + user + "@" + domain;
}

// Subtle Parallax Effect (disabled on mobile)
if (window.innerWidth > 768) {
    let parallaxTicking = false;
    window.addEventListener('scroll', () => {
        if (!parallaxTicking) {
            window.requestAnimationFrame(() => {
                const hero = document.querySelector('.hero');
                if (hero) {
                    const scrolled = window.pageYOffset;
                    if (scrolled < window.innerHeight) {
                        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
                    }
                }
                parallaxTicking = false;
            });
            parallaxTicking = true;
        }
    });
}
