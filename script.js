import { logoData } from "./logo.js";

gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis();
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));

document.addEventListener("DOMContentLoaded", () => {
  const heroImgContainer = document.querySelector(".hero-img-container");
  const heroImgLogo = document.querySelector(".hero-img-logo");
  const heroImgCopy = document.querySelector(".hero-img-copy");
  const fadeOverlay = document.querySelector(".fade-overlay");
  const svgOverlay = document.querySelector(".overlay");
  const overlayCopy = document.querySelector(".overlay-copy h1");
  const logoMask = document.querySelector("#logoMask");
  const logoContainer = document.querySelector(".logo-container");

  const initialScale = 400;

  // Apply your real logo path
  if (logoMask) logoMask.setAttribute("d", logoData);

  // Initial states
  gsap.set(svgOverlay, { scale: initialScale, transformOrigin: "center 15%" });
  gsap.set([overlayCopy, fadeOverlay, heroImgLogo, heroImgCopy], { opacity: 0 });

  ScrollTrigger.create({
    trigger: ".hero",
    start: "top top",
    end: "+500%",
    pin: true,
    scrub: 1,
    onUpdate: (self) => {
      const p = self.progress;

      // 1. Fade out initial logo + text
      gsap.set([heroImgLogo, heroImgCopy], { opacity: gsap.utils.clamp(0, 1, 1 - p * 5) });

      // 2. Zoom in background
      gsap.set(heroImgContainer, { scale: 1 + p * 0.6 });

      // 3. Reveal black overlay with logo shape
      const scaleVal = initialScale * Math.pow(1 - p, 3) + 1;
      gsap.set(svgOverlay, { scale: scaleVal });

      // 4. White flash
      const whiteOpacity = gsap.utils.clamp(0, 1, (p - 0.3) / 0.4);
      gsap.set(fadeOverlay, { opacity: whiteOpacity });

      // 5. Text reveal from bottom
      if (p > 0.55) {
        const textP = (p - 0.55) / 0.35;
        gsap.set(overlayCopy, {
            opacity: textP,
            scale: 1.3 - textP * 0.3,
            backgroundImage: `linear-gradient(to bottom, #fff ${(1-textP)*120}%, transparent 100%)`,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
        });
      }
    }
  });
});
