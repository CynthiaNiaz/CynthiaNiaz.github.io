// Quote rotation functionality — with pagination dots
document.addEventListener('DOMContentLoaded', function () {
    const quoteWrapper = document.getElementById('quoteWrapper');
    if (!quoteWrapper) return;

    const quotes = quoteWrapper.querySelectorAll('.quote-item');
    const dotsHost = document.getElementById('quoteDots');
    let currentIndex = 0;

    // Build pagination dots, one per quote
    let dots = [];
    if (dotsHost) {
        dotsHost.innerHTML = '';
        quotes.forEach(function (_, i) {
            const d = document.createElement('span');
            if (i === 0) d.classList.add('on');
            dotsHost.appendChild(d);
        });
        dots = dotsHost.querySelectorAll('span');
    }

    function rotateQuotes() {
        quotes[currentIndex].classList.remove('active');
        if (dots[currentIndex]) dots[currentIndex].classList.remove('on');

        currentIndex = (currentIndex + 1) % quotes.length;

        quotes[currentIndex].classList.add('active');
        if (dots[currentIndex]) dots[currentIndex].classList.add('on');
    }

    // Rotate quotes every 8 seconds
    setInterval(rotateQuotes, 8000);
});
