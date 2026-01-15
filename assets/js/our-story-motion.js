import { animate, inView, stagger } from "https://cdn.jsdelivr.net/npm/motion@10.16.4/+esm";

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (!prefersReducedMotion) {
  document.documentElement.classList.add("motion-ready");
}

const ease = [0.22, 1, 0.36, 1];
const animateElements = (elements, keyframes, options = {}) => {
  if (!elements) return;
  const targets = Array.from(elements);
  if (!targets.length) return;
  animate(targets, keyframes, { easing: ease, ...options });
};

const storySection = document.querySelector('[data-motion="our-story"]');

if (storySection && !prefersReducedMotion) {
  let hasAnimated = false;

  const runAnimations = () => {
    if (hasAnimated) return;
    hasAnimated = true;

    const overlay = storySection.querySelector(".story-overlay");
    const backgroundImage = storySection.querySelector(".story-background-image img");
    const glows = storySection.querySelectorAll(".story-glow");
    const content = storySection.querySelector(".story-content");
    const headingBlocks = storySection.querySelectorAll(".story-heading, .story-text");
    const features = storySection.querySelectorAll(".feature-item");
    const accentBox = storySection.querySelector(".story-accent-box");
    const amenitiesHeading = storySection.querySelector(".amenities-heading");
    const amenities = storySection.querySelectorAll(".amenity-item");

    if (overlay) {
      animate(overlay, { opacity: [0, 1] }, { duration: 0.8, easing: ease });
    }

    if (backgroundImage) {
      animate(
        backgroundImage,
        { opacity: [0, 1], scale: [1.08, 1] },
        { duration: 1.4, easing: ease }
      );
    }

    animateElements(glows, { opacity: [0, 1], scale: [0.9, 1] }, { duration: 1, delay: 0.1 });

    if (content) {
      animate(content, { opacity: [0, 1], y: [30, 0] }, { duration: 0.8, delay: 0.2, easing: ease });
    }

    animateElements(headingBlocks, { opacity: [0, 1], y: [24, 0] }, {
      duration: 0.7,
      delay: stagger(0.12, { start: 0.35 }),
    });

    animateElements(features, { opacity: [0, 1], y: [18, 0] }, {
      duration: 0.6,
      delay: stagger(0.08, { start: 0.55 }),
    });

    if (accentBox) {
      animate(
        accentBox,
        { opacity: [0, 1], scale: [0.92, 1], y: [20, 0] },
        { duration: 0.7, delay: 0.6, easing: ease }
      );
    }

    if (amenitiesHeading) {
      animate(amenitiesHeading, { opacity: [0, 1], y: [20, 0] }, { duration: 0.6, delay: 0.75, easing: ease });
    }

    animateElements(amenities, { opacity: [0, 1], y: [20, 0] }, {
      duration: 0.6,
      delay: stagger(0.08, { start: 0.85 }),
    });
  };

  inView(storySection, runAnimations, { amount: 0.35, once: true });
} else if (prefersReducedMotion) {
  document.documentElement.classList.remove("motion-ready");
}

const futureProjectsSection = document.querySelector('[data-motion="future-projects"]');

if (futureProjectsSection && !prefersReducedMotion) {
  let hasAnimated = false;

  const runFutureProjectsAnimations = () => {
    if (hasAnimated) return;
    hasAnimated = true;

    const heading = futureProjectsSection.querySelector(".future-projects-heading");
    const carousel = futureProjectsSection.querySelector(".carousel-inner");
    const buttons = futureProjectsSection.querySelectorAll(
      'button:has(.carousel-control-prev-icon), button:has(.carousel-control-next-icon)'
    );
    const activeSlides = futureProjectsSection.querySelectorAll(".carousel-item.active .interior-act");
    const activeCaptions = futureProjectsSection.querySelectorAll(".carousel-item.active .carousel-caption");

    animateElements([heading], { opacity: [0, 1], y: [24, 0] }, { duration: 0.7, delay: 0.15 });
    animateElements(buttons, { opacity: [0, 1], y: [16, 0] }, { duration: 0.6, delay: 0.25 });
    animateElements([carousel], { opacity: [0, 1], y: [20, 0] }, { duration: 0.7, delay: 0.35 });
    animateElements(activeSlides, { opacity: [0, 1], y: [18, 0], scale: [0.98, 1] }, { duration: 0.6, delay: 0.45 });
    animateElements(activeCaptions, { opacity: [0, 1], y: [18, 0] }, { duration: 0.5, delay: 0.55 });
  };

  inView(futureProjectsSection, runFutureProjectsAnimations, { amount: 0.35, once: true });

  const carousels = futureProjectsSection.querySelectorAll(".carousel");
  carousels.forEach((carousel) => {
    carousel.addEventListener("slid.bs.carousel", () => {
      const activeSlides = carousel.querySelectorAll(".carousel-item.active .interior-act");
      const activeCaptions = carousel.querySelectorAll(".carousel-item.active .carousel-caption");

      animateElements(activeSlides, { opacity: [0, 1], y: [16, 0], scale: [0.98, 1] }, { duration: 0.55 });
      animateElements(activeCaptions, { opacity: [0, 1], y: [16, 0] }, { duration: 0.45, delay: 0.05 });
    });
  });
}
