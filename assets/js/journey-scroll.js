/**
 * Enhanced Journey Scroll Interaction
 * 1. Native Horizontal Overflow Handling
 * 2. Click and Drag (Grab to Scroll)
 */

document.addEventListener('DOMContentLoaded', function () {
    const journeyContainer = document.querySelector('.journey-container.journey-marquee');

    if (!journeyContainer) return;

    // --- 1. Click and Drag to Scroll (Grab to Scroll) ---
    let isDown = false;
    let startX;
    let scrollLeft;

    const startDrag = (e) => {
        isDown = true;
        journeyContainer.classList.add('grabbing');
        startX = (e.pageX || e.touches[0].pageX) - journeyContainer.offsetLeft;
        scrollLeft = journeyContainer.scrollLeft;
    };

    const endDrag = () => {
        isDown = false;
        journeyContainer.classList.remove('grabbing');
    };

    const moveDrag = (e) => {
        if (!isDown) return;
        
        const x = (e.pageX || (e.touches && e.touches[0].pageX)) - journeyContainer.offsetLeft;
        const walk = (x - startX) * 1.5; // Drag speed multiplier
        journeyContainer.scrollLeft = scrollLeft - walk;
    };

    // Mouse Events
    journeyContainer.addEventListener('mousedown', startDrag);
    window.addEventListener('mouseup', endDrag);
    journeyContainer.addEventListener('mouseleave', endDrag);
    journeyContainer.addEventListener('mousemove', (e) => {
        if (isDown) {
            e.preventDefault();
            moveDrag(e);
        }
    });

    // Touch Events
    journeyContainer.addEventListener('touchstart', startDrag, { passive: true });
    journeyContainer.addEventListener('touchend', endDrag, { passive: true });
    journeyContainer.addEventListener('touchmove', (e) => {
        if (isDown) {
            moveDrag(e);
        }
    }, { passive: true });
});

