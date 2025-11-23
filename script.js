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

  const initialOverlayScale = 350;

  // Apply logo SVG path
  if (logoMask) {
    logoMask.setAttribute("d", logoData);
  }

  gsap.set(svgOverlay, { scale: initialOverlayScale });
  gsap.set([overlayCopy, fadeOverlay], { opacity: 0 });

  ScrollTrigger.create({
    trigger: ".hero",
    start: "top top",
    end: "500%",
    pin: true,
    scrub: 1,
    onUpdate: (self) => {
      const p = self.progress;

      // Fade out initial logo + text
      gsap.set([heroImgLogo, heroImgCopy], { opacity: 1 - p * 6.6 });

      // Scale hero container
      gsap.set(heroImgContainer, { scale: 1.5 - 0.5 * Math.min(p / 0.85, 1) });

      // Scale overlay (reveals black)
      const overlayScale = initialOverlayScale * Math.pow(1 - Math.min(p / 0.85, 1), 3) + 1;
      gsap.set(svgOverlay, { scale: overlayScale });

      // White fade in
      const whiteProgress = gsap.utils.clamp(0, 1, (p - 0.25) / 0.4);
      gsap.set(fadeOverlay, { opacity: whiteProgress });

      // Text reveal
      if (p > 0.6) {
        const textProg = gsap.utils.clamp(0, 1, (p - 0.6) / 0.25);
        gsap.set(overlayCopy, {
          opacity: textProg,
          scale: 1.25 - 0.25 * textProg,
          backgroundImage: `linear-gradient(to bottom, #fff ${(1 - textProg) * 100}%, #444 100%)`
        });
      }
    }
  });
});
