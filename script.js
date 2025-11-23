import { logiData } from "./logo";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
  const lenis = new Lenis();
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

const heroImgContainer = document.querySelector(".hero-img-container");
const heroImgLogo = document.querySelector(".hero-img-logo");
const heroImgCopy = document.querySelector(".hero-img-copy");
const fadeOverlay = document.querySelector(".fade-overlay");
const svgOverlay = document.querySelector(".overlay");
const overlayCopy = document.querySelector("h1");

const initialOverlayScale = 350;
const logoContainer = document.querySelector(".logo-container");
const logoMask = document.querySelector("logoMask");

logoMask.setAttribute("d", logoData);

const logoDimensions = logocontainer.getBoundingClientRect();
const logoBoundingBox = logoMask.getBBox();

const horizontalScaleRatio = logoDimensions.width / logoBoundingBox.width;
const verticalScaleRatio = logoDimensions.height / logoBoundingBox.height;
const logoScaleFactor = Math.min(horizontalScaleRatio, verticalScaleRatio);

const logoHorizontalPosition =
  logoDimension.left +
  (logoDimensions.width - logoBoundingBox.width * logoScaleFactor) / 2 -
  logoBoundingBox.x * logoScaleFactor;
  const logoVerticalPosition = logoDimensions.
});
