import { logoData } from "./logo";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
  // --- Lenis Smooth Scrolling Setup ---
  const lenis = new Lenis();
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  // --- Selecting DOM Elements ---
  const heroImgContainer = document.querySelector(".hero-img-container"); 
  const heroImgLogo = document.querySelector(".hero-img-logo"); 
  const heroImgCopy = document.querySelector(".hero-img-copy"); 
  const fadeOverlay = document.querySelector(".fade-overlay"); 
  const svgOverlay = document.querySelector(".overlay"); 
  
  // FIX: Target the H1 element for gradient/text effects
  const overlayCopy = document.querySelector(".overlay-copy h1"); 

  // --- Setting up the Logo Mask and its Dimensions ---
  const initialOverlayScale = 350;
  const logoContainer = document.querySelector(".logo-container");
  
  // FIX: Target the SVG path element by its ID
  const logoMask = document.querySelector("#logoMask"); 
  
  if (logoMask) {
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

    // Apply calculations to position and scale the SVG path
    logoMask.setAttribute(
      "transform",
      `translate(${logoHorizontalPosition}, ${logoVerticalPosition}) scale(${logoScaleFactor})`
    );
  }
  
  // Set initial state
  gsap.set(svgOverlay, { scale: initialOverlayScale });
  gsap.set(overlayCopy, { opacity: 0 });
  gsap.set(fadeOverlay, { opacity: 0 });
  gsap.set(overlayCopy, { transformOrigin: "center 0" }); 

  // --- Creating the ScrollTrigger Instance ---
  ScrollTrigger.create({
    trigger: ".hero",
    start: "top top",
    end: "500%", 
    pin: true, 
    scrub: 1, 
    
    onUpdate: (self) => {
      const progress = self.progress;

      // 1. Fading out Initial Elements (0% to 15%)
      const fadeOutEnd = 0.15;
      const fadeOpacity = Math.max(0, 1 - progress / fadeOutEnd);
      gsap.set([heroImgLogo, heroImgCopy], { opacity: fadeOpacity });

      // 2. Handling Scaling Effects (0% to 85%)
      const scaleEnd = 0.85;
      const normalizedScaleProgress = gsap.utils.clamp(0, 1, progress / scaleEnd);

      // Background image container scale (1.5 -> 1)
      const containerScale = 1.5 - (1.5 - 1) * normalizedScaleProgress;
      gsap.set(heroImgContainer, { scale: containerScale });

      // Overlay scale (initialScale -> 1, exponential decay)
      const power = 3;
      const overlayScale =
        initialOverlayScale * Math.pow(1 - normalizedScaleProgress, power) + 1;
      gsap.set(svgOverlay, { scale: overlayScale });

      // 3. Fading in White Overlay (25% to 65%)
      const fadeInStart = 0.25;
      const fadeInEnd = 0.65;
      const fadeOverlayProgress = gsap.utils.normalize(
        fadeInStart,
        fadeInEnd,
        progress
      );
      const fadeOverlayOpacity = gsap.utils.clamp(0, 1, fadeOverlayProgress);
      gsap.set(fadeOverlay, { opacity: fadeOverlayOpacity });

      // 4. Text Reveal Effect (60% to 85%)
      const textRevealStart = 0.6;
      const textRevealEnd = 0.85;
      const textProgress = gsap.utils.normalize(
        textRevealStart,
        textRevealEnd,
        progress
      );
      const clampedTextProgress = gsap.utils.clamp(0, 1, textProgress);

      if (progress < 0.06) {
        // Hide text initially
        gsap.set(overlayCopy, { opacity: 0 });
      } else {
        // Gradually increase the overall text opacity
        gsap.set(overlayCopy, { opacity: Math.min(1, progress * 2) }); 
      }
      
      // Calculate scale (1.25 -> 1)
      const textScale = 1.25 - (1.25 - 1) * clampedTextProgress;
      gsap.set(overlayCopy, { scale: textScale });

      // Calculate linear-gradient position (smooth reveal)
      const gradientSpread = 100; // 100px spread
      // Moves from 100% (bottom) to 0% (top)
      const bottomPosition = 100 - clampedTextProgress * 100;
      const topPosition = bottomPosition - gradientSpread; 

      // Apply the dynamic gradient for the clipping effect
      gsap.set(overlayCopy, {
        backgroundImage: `linear-gradient(to bottom, #fff ${topPosition}px, #000 ${bottomPosition}px)`,
      });
      
    }, // End of onUpdate
  });
});
