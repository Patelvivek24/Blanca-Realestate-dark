/**
 * Enhanced Journey Scroll Interaction
 * 1. Horizontal Scroll via Mouse Wheel
 * 2. Click and Drag (Grab to Scroll)
 */

document.addEventListener('DOMContentLoaded', function () {
    const journeyContainer = document.querySelector('.journey-container');
    const marquee = document.querySelector('.journey-marquee');

    if (!journeyContainer || !marquee) return;

    // --- 1. Mouse Wheel to Horizontal Scroll ---
    journeyContainer.addEventListener('wheel', (e) => {
        if (e.deltaY !== 0) {
            // If user scrolls vertically, move horizontally
            e.preventDefault();
            journeyContainer.scrollLeft += e.deltaY;
        }
    }, { passive: false });

    // --- 2. Click and Drag to Scroll (Grab to Scroll) ---
    let isDown = false;
    let startX;
    let scrollLeft;

    marquee.addEventListener('mousedown', (e) => {
        isDown = true;
        marquee.classList.add('grabbing');
        startX = e.pageX - journeyContainer.offsetLeft;
        scrollLeft = journeyContainer.scrollLeft;
    });

    marquee.addEventListener('mouseleave', () => {
        isDown = false;
        marquee.classList.remove('grabbing');
    });

    marquee.addEventListener('mouseup', () => {
        isDown = false;
        marquee.classList.remove('grabbing');
    });

    marquee.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - journeyContainer.offsetLeft;
        const walk = (x - startX) * 2; // Scroll-fast factor
        journeyContainer.scrollLeft = scrollLeft - walk;
    });

    // Touch support (Native usually works, but adding it for consistency)
    marquee.addEventListener('touchstart', (e) => {
        isDown = true;
        startX = e.touches[0].pageX - journeyContainer.offsetLeft;
        scrollLeft = journeyContainer.scrollLeft;
    }, { passive: true });

    marquee.addEventListener('touchend', () => {
        isDown = false;
    }, { passive: true });

    marquee.addEventListener('touchmove', (e) => {
        if (!isDown) return;
        const x = e.touches[0].pageX - journeyContainer.offsetLeft;
        const walk = (x - startX) * 2;
        journeyContainer.scrollLeft = scrollLeft - walk;
    }, { passive: true });
});
