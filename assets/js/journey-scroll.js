/**
 * Enhanced Journey Scroll Interaction
 * 1. Native Horizontal Overflow Handling
 * 2. Click and Drag (Grab to Scroll)
 */

document.addEventListener('DOMContentLoaded', function () {
    const journeyContainer = document.querySelector('.journey-container');
    const marquee = document.querySelector('.journey-marquee');

    if (!journeyContainer || !marquee) return;

    // --- 1. Click and Drag to Scroll (Grab to Scroll) ---
    let isDown = false;
    let startX;
    let scrollLeft;

    const startDrag = (e) => {
        isDown = true;
        marquee.classList.add('grabbing');
        startX = (e.pageX || e.touches[0].pageX) - journeyContainer.offsetLeft;
        scrollLeft = journeyContainer.scrollLeft;
    };

    const endDrag = () => {
        isDown = false;
        marquee.classList.remove('grabbing');
    };

    const moveDrag = (e) => {
        if (!isDown) return;
        
        const x = (e.pageX || (e.touches && e.touches[0].pageX)) - journeyContainer.offsetLeft;
        const walk = (x - startX) * 1.5; // Drag speed multiplier
        journeyContainer.scrollLeft = scrollLeft - walk;
    };

    // Mouse Events
    marquee.addEventListener('mousedown', startDrag);
    window.addEventListener('mouseup', endDrag);
    marquee.addEventListener('mouseleave', endDrag);
    marquee.addEventListener('mousemove', (e) => {
        if (isDown) {
            e.preventDefault();
            moveDrag(e);
        }
    });

    // Touch Events
    marquee.addEventListener('touchstart', startDrag, { passive: true });
    marquee.addEventListener('touchend', endDrag, { passive: true });
    marquee.addEventListener('touchmove', (e) => {
        if (isDown) {
            moveDrag(e);
        }
    }, { passive: true });
});
