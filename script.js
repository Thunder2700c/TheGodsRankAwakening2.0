let progress = 0;
const bar = document.getElementById("bar");
const percent = document.getElementById("percent");
const sphere = document.getElementById("sphere");
const loader = document.getElementById("loader");
const terminal = document.getElementById("terminal");
const glow = document.getElementById("glow");
const main = document.getElementById("main");

/* SPHERE FOLLOW */
document.addEventListener("mousemove", e => {
  gsap.to(sphere, {
    x: e.clientX - window.innerWidth / 2,
    y: e.clientY - window.innerHeight / 2,
    duration: 0.4,
    ease: "power3.out"
  });
});

/* FAKE LOADING */
const interval = setInterval(() => {
  progress++;
  bar.style.width = progress + "%";
  percent.textContent = progress + "%";

  if (progress >= 100) {
    clearInterval(interval);
    startTransition();
  }
}, 25);

function startTransition() {
  gsap.to("#bar-container, #percent", {
    opacity: 0,
    duration: 0.5
  });

  gsap.to(sphere, {
    scale: 1.6,
    borderRadius: "20%",
    duration: 1,
    onComplete: () => {
      loader.style.display = "none";
      terminal.classList.remove("hidden");
    }
  });
}

/* YES / NO INPUT */
document.addEventListener("keydown", e => {
  if (terminal.classList.contains("hidden")) return;

  if (e.key.toLowerCase() === "y" || e.key.toLowerCase() === "n") {
    launchMain();
  }
});

function launchMain() {
  gsap.to(terminal, {
    opacity: 0,
    duration: 0.5
  });

  gsap.to(glow, {
    opacity: 1,
    duration: 0.8,
    onComplete: () => {
      terminal.style.display = "none";
      main.classList.remove("hidden");

      gsap.to(glow, {
        opacity: 0,
        duration: 1.5
      });
    }
  });
}
