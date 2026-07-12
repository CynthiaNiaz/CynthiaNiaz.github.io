// Quote rotation — auto-rotate + manual prev/next arrows and clickable dots
document.addEventListener('DOMContentLoaded', function () {
    const quoteWrapper = document.getElementById('quoteWrapper');
    if (!quoteWrapper) return;

    const quotes = quoteWrapper.querySelectorAll('.quote-item');
    const dotsHost = document.getElementById('quoteDots');
    const prevBtn = document.getElementById('quotePrev');
    const nextBtn = document.getElementById('quoteNext');
    let currentIndex = 0;
    let timer;

    // Build pagination dots, one per quote (clickable)
    let dots = [];
    if (dotsHost) {
        dotsHost.innerHTML = '';
        quotes.forEach(function (_, i) {
            const d = document.createElement('span');
            if (i === 0) d.classList.add('on');
            d.addEventListener('click', function () { goTo(i); restart(); });
            dotsHost.appendChild(d);
        });
        dots = dotsHost.querySelectorAll('span');
    }

    function goTo(index) {
        quotes[currentIndex].classList.remove('active');
        if (dots[currentIndex]) dots[currentIndex].classList.remove('on');

        currentIndex = (index + quotes.length) % quotes.length;

        quotes[currentIndex].classList.add('active');
        if (dots[currentIndex]) dots[currentIndex].classList.add('on');
    }

    function next() { goTo(currentIndex + 1); }
    function prev() { goTo(currentIndex - 1); }

    // Auto-rotate every 8 seconds; restart the clock after any manual nav
    function restart() {
        clearInterval(timer);
        timer = setInterval(next, 8000);
    }

    if (nextBtn) nextBtn.addEventListener('click', function () { next(); restart(); });
    if (prevBtn) prevBtn.addEventListener('click', function () { prev(); restart(); });

    restart();
});
