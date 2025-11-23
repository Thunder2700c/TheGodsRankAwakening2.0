import { logoData } from "./logo";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
  // --- Lenis Smooth Scrolling Setup (8:21) ---
  const lenis = new Lenis();
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  // --- Selecting DOM Elements (8:40) ---
  const heroImgContainer = document.querySelector(".hero-img-container"); // Container with background images
  const heroImgLogo = document.querySelector(".hero-img-logo"); // Logo that appears at the beginning
  const heroImgCopy = document.querySelector(".hero-img-copy"); // Scroll-down text
  const fadeOverlay = document.querySelector(".fade-overlay"); // White overlay that will fade in
  const svgOverlay = document.querySelector(".overlay"); // SVG container (where transform-origin is set)
  
  // Adjusted selector to target the H1 element inside .overlay-copy
  const overlayCopy = document.querySelector(".overlay-copy h1"); // Heading text that will appear later

  // --- Setting up the Logo Mask and its Dimensions (9:01) ---
  const initialOverlayScale = 350;
  const logoContainer = document.querySelector(".logo-container");
  
  // Target the SVG path element inside the mask definition
  const logoMask = document.querySelector("#logoMask"); 
  
  if (logoMask) {
    // Crucially, he sets the 'd' attribute of the SVG path to use the 'logoData' (9:01)
    logoMask.setAttribute("d", logoData);

    const logoDimensions = logoContainer.getBoundingClientRect();
    const logoBoundingBox = logoMask.getBBox();

    // Calculate scaling factors
    const horizontalScaleRatio = logoDimensions.width / logoBoundingBox.width;
    const verticalScaleRatio = logoDimensions.height / logoBoundingBox.height;
    const logoScaleFactor = Math.min(horizontalScaleRatio, verticalScaleRatio);

    // Calculate positioning for centering
    const logoHorizontalPosition =
      logoDimensions.left +
      (logoDimensions.width - logoBoundingBox.width * logoScaleFactor) / 2 -
      logoBoundingBox.x * logoScaleFactor;
      
    const logoVerticalPosition =
      logoDimensions.top +
      (logoDimensions.height - logoBoundingBox.height * logoScaleFactor) / 2 -
      logoBoundingBox.y * logoScaleFactor;

    // Apply calculations to position and scale the SVG path (10:54)
    logoMask.setAttribute(
      "transform",
      `translate(${logoHorizontalPosition}, ${logoVerticalPosition}) scale(${logoScaleFactor})`
    );
  }
  
  // Set initial state for elements
  gsap.set(svgOverlay, { scale: initialOverlayScale }); // Set initial large scale for the overlay
  gsap.set(overlayCopy, { opacity: 0 });
  gsap.set(fadeOverlay, { opacity: 0 });
  // The CSS already sets transform-origin: center 0 for h1, but we ensure it here
  gsap.set(overlayCopy, { transformOrigin: "center 0" }); 

  // --- Creating the ScrollTrigger Instance (10:54) ---
  // The '.hero' section is the trigger, start: "top top", end: "500%"
  ScrollTrigger.create({
    trigger: ".hero",
    start: "top top",
    end: "500%", // Animation takes place over 5 times the viewport height
    pin: true, // Keep the hero section fixed
    scrub: 1, // Slight delay for smoother feel
    // Define the onUpdate Callback for Scroll Progress (11:41)
    onUpdate: (self) => {
      // self.progress is the scroll progress (0 to 1) for this ScrollTrigger
      const progress = self.progress;

      // 1. Fading out Initial Elements (11:56): For the first 15% of scrolling
      const fadeOutEnd = 0.15;
      const fadeOpacity = Math.max(0, 1 - progress / fadeOutEnd);
      gsap.set([heroImgLogo, heroImgCopy], { opacity: fadeOpacity });

      // 2. Handling Scaling Effects (12:21): For the first 85% of scrolling
      const scaleEnd = 0.85;
      const normalizedScaleProgress = gsap.utils.clamp(0, 1, progress / scaleEnd);

      // Background image container scale (zoom-out effect)
      const containerScale = 1.5 - (1.5 - 1) * normalizedScaleProgress;
      gsap.set(heroImgContainer, { scale: containerScale });

      // Overlay scale (zooming-out effect through the logo shape)
      // Uses a power function for exponential transition (power = 3)
      const power = 3;
      const overlayScale =
        initialOverlayScale * Math.pow(1 - normalizedScaleProgress, power) + 1;
      gsap.set(svgOverlay, { scale: overlayScale });

      // 3. Fading in White Overlay (13:04): Between 25% and 65% of scrolling
      const fadeInStart = 0.25;
      const fadeInEnd = 0.65;
      const fadeOverlayProgress = gsap.utils.normalize(
        fadeInStart,
        fadeInEnd,
        progress
      );
      const fadeOverlayOpacity = gsap.utils.clamp(0, 1, fadeOverlayProgress);
      gsap.set(fadeOverlay, { opacity: fadeOverlayOpacity });

      // 4. Text Reveal Effect (13:30): Between 60% and 85% of scroll progress
      const textRevealStart = 0.6;
      const textRevealEnd = 0.85;
      const textProgress = gsap.utils.normalize(
        textRevealStart,
        textRevealEnd,
        progress
      );
      const clampedTextProgress = gsap.utils.clamp(0, 1, textProgress);

      if (progress < 0.06) {
        // Text is invisible if scroll progress is less than 6%
        gsap.set(overlayCopy, { opacity: 0 });
      } else {
        // Gradually increase the opacity of the entire text element
        gsap.set(overlayCopy, { opacity: Math.min(1, progress * 2) }); 
      }
      
      // Calculate scale (zoom effect: 1.25 -> 1)
      const textScale = 1.25 - (1.25 - 1) * clampedTextProgress;
      gsap.set(overlayCopy, { scale: textScale });

      // Calculate linear-gradient position (smooth reveal effect)
      const gradientSpread = 100; // Gradient height in pixels
      // 100% (bottom) corresponds to 0% progress, 0% (top) corresponds to 100% progress
      const bottomPosition = 100 - clampedTextProgress * 100;
      const topPosition = bottomPosition - gradientSpread; // 100px above bottom edge

      // Sets the linear-gradient as background-clip: text (handled by CSS)
      gsap.set(overlayCopy, {
        backgroundImage: `linear-gradient(to bottom, #fff ${topPosition}px, #000 ${bottomPosition}px)`,
      });
      
    }, // End of onUpdate
  });
});
