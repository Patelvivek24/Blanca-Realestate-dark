document.addEventListener("DOMContentLoaded", function () {
  // Register GSAP plugins
  gsap.registerPlugin(ScrollTrigger);

  const slides = gsap.utils.toArray(".team-slide");
  const container = document.querySelector(".team-slides-container");
  const dots = gsap.utils.toArray(".progress-dot");

  if (!container || slides.length === 0) return;

  // Set initial state
  gsap.set(slides[0], { visibility: "visible", zIndex: 2 });

  // Create the master timeline
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".team-showcase-section",
      start: "top top",
      end: () => `+=${window.innerHeight * (slides.length - 1)}`,
      pin: true,
      scrub: 1, // Smooth scrolling
      snap: {
        snapTo: 1 / (slides.length - 1),
        duration: { min: 0.2, max: 0.5 },
        delay: 0.1,
        ease: "power2.inOut",
      },
      onUpdate: (self) => {
        // Update dots based on progress
        const activeIndex = Math.round(self.progress * (slides.length - 1));
        dots.forEach((dot, i) => {
          dot.classList.toggle("active", i === activeIndex);
        });
      },
    },
  });

  // Animate slides (Slide up reveal)
  slides.forEach((slide, i) => {
    if (i === 0) return; // Skip first slide

    const prevSlide = slides[i - 1];
    const currentImage = slide.querySelector("img");
    const currentContent = slide.querySelector(".team-slide-content");
    const currentText = slide.querySelector(".image-overlay-text h2");
    const memberInfo = slide.querySelectorAll(
      ".member-role, .member-name, .member-quote",
    );

    // Set initial positions for incoming elements
    gsap.set(slide, { y: "100%", visibility: "visible", zIndex: 10 + i });
    gsap.set(currentImage, { y: "20%" }); // Parallax start
    gsap.set(memberInfo, { y: 30, opacity: 0 });

    // Add to timeline
    tl.to(
      slide,
      {
        y: "0%",
        ease: "none", // Smooth scroll scrub
      },
      i - 1,
    );

    // Parallax effect for current image
    tl.to(
      currentImage,
      {
        y: "-10%",
        ease: "none",
      },
      i - 1,
    );

    // Slow down previous image (parallax)
    tl.to(
      prevSlide.querySelector("img"),
      {
        y: "-20%",
        ease: "none",
      },
      i - 1,
    );

    // Text animations
    tl.to(
      memberInfo,
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        ease: "power2.out",
      },
      i - 0.5,
    );
  });
});
