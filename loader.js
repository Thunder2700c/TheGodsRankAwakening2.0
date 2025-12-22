document.addEventListener("DOMContentLoaded", () => {
  
  // ===================================================
  // TGRA LOADER - Interactive Sphere + Progress Bar
  // Terminal Modal + Sun Ray Reveal
  // ===================================================

  // === ELEMENTS ===
  const tgraLoader = document.getElementById('tgraLoader');
  const sphere = document.getElementById('sphere');
  const sphereContainer = document.getElementById('sphereContainer');
  const trailCanvas = document.getElementById('trailCanvas');
  const progressBarFill = document.getElementById('progressBarFill');
  const progressBarGlow = document.getElementById('progressBarGlow');
  const progressPercent = document.getElementById('progressPercent');
  const progressSection = document.getElementById('progressSection');
  const bgParticles = document.getElementById('bgParticles');
  
  const terminalModal = document.getElementById('terminalModal');
  const tgraLogo = document.getElementById('tgraLogo');
  const terminalWindow = document.getElementById('terminalWindow');
  const terminalLine1 = document.getElementById('terminalLine1');
  const terminalLine2 = document.getElementById('terminalLine2');
  const terminalInputLine = document.getElementById('terminalInputLine');
  const terminalYes = document.getElementById('terminalYes');
  const terminalNo = document.getElementById('terminalNo');
  
  const sunReveal = document.getElementById('sunReveal');
  const sunCore = document.getElementById('sunCore');
  const sunFlash = document.getElementById('sunFlash');
  
  const themeAudio = document.getElementById('themeAudio');
  const musicToggle = document.getElementById('musicToggle');
  const musicIcon = document.getElementById('musicIcon');
  
  // Exit if no loader
  if (!tgraLoader) {
    document.body.classList.add('gsap-loaded');
    return;
  }

  let musicEnabled = localStorage.getItem('musicEnabled') === 'true';

  // ===================================================
  // BACKGROUND PARTICLES
  // ===================================================
  
  function createBackgroundParticles() {
    if (!bgParticles) return;
    
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div');
      particle.className = 'bg-particle';
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.animationDelay = `${Math.random() * 15}s`;
      particle.style.animationDuration = `${15 + Math.random() * 10}s`;
      particle.style.opacity = Math.random() * 0.5 + 0.2;
      particle.style.width = `${3 + Math.random() * 4}px`;
      particle.style.height = particle.style.width;
      bgParticles.appendChild(particle);
    }
  }
  
  createBackgroundParticles();

  // ===================================================
  // INTERACTIVE SPHERE - RGB TRAIL EFFECT
  // ===================================================
  
  const ctx = trailCanvas?.getContext('2d');
  let particles = [];
  let hue = 0;
  let isInteracting = false;
  
  if (trailCanvas) {
    trailCanvas.width = 400;
    trailCanvas.height = 400;
  }
  
  class TrailParticle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.size = Math.random() * 8 + 4;
      this.speedX = (Math.random() - 0.5) * 4;
      this.speedY = (Math.random() - 0.5) * 4;
      this.life = 1;
      this.decay = Math.random() * 0.02 + 0.01;
      this.hue = hue;
    }
    
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.life -= this.decay;
      this.size *= 0.98;
    }
    
    draw() {
      if (!ctx) return;
      ctx.save();
      ctx.globalAlpha = this.life;
      ctx.fillStyle = `hsl(${this.hue}, 100%, 60%)`;
      ctx.shadowColor = `hsl(${this.hue}, 100%, 50%)`;
      ctx.shadowBlur = 15;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }
  
  function animateParticles() {
    if (!ctx) return;
    
    ctx.clearRect(0, 0, trailCanvas.width, trailCanvas.height);
    
    particles = particles.filter(p => p.life > 0);
    
    particles.forEach(particle => {
      particle.update();
      particle.draw();
    });
    
    hue = (hue + 1) % 360;
    
    requestAnimationFrame(animateParticles);
  }
  
  animateParticles();
  
  function handleSphereInteraction(e) {
    if (!trailCanvas || !sphereContainer) return;
    
    const rect = sphereContainer.getBoundingClientRect();
    const canvasRect = trailCanvas.getBoundingClientRect();
    
    let clientX, clientY;
    
    if (e.touches) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    
    const x = clientX - canvasRect.left;
    const y = clientY - canvasRect.top;
    
    // Create multiple particles
    for (let i = 0; i < 3; i++) {
      particles.push(new TrailParticle(x, y));
    }
    
    // Move sphere slightly toward cursor
    if (sphere) {
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const mouseX = clientX - rect.left;
      const mouseY = clientY - rect.top;
      
      const moveX = (mouseX - centerX) * 0.1;
      const moveY = (mouseY - centerY) * 0.1;
      
      gsap.to(sphere, {
        x: moveX,
        y: moveY,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  }
  
  // Mouse events
  sphereContainer?.addEventListener('mousemove', handleSphereInteraction);
  sphereContainer?.addEventListener('mouseenter', () => isInteracting = true);
  sphereContainer?.addEventListener('mouseleave', () => {
    isInteracting = false;
    gsap.to(sphere, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.5)" });
  });
  
  // Touch events
  sphereContainer?.addEventListener('touchmove', handleSphereInteraction);
  sphereContainer?.addEventListener('touchend', () => {
    gsap.to(sphere, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.5)" });
  });

  // ===================================================
  // SMOOTH PROGRESS BAR + COUNTER
  // ===================================================
  
  const progressObj = { value: 0 };
  
  gsap.to(progressObj, {
    value: 100,
    duration: 4,
    ease: "power2.inOut",
    onUpdate: function() {
      const percent = Math.round(progressObj.value);
      
      if (progressPercent) {
        progressPercent.textContent = percent;
      }
      
      if (progressBarFill) {
        progressBarFill.style.width = `${progressObj.value}%`;
      }
      
      if (progressBarGlow) {
        progressBarGlow.style.width = `${progressObj.value}%`;
      }
    },
    onComplete: transitionToTerminal
  });

  // ===================================================
  // TRANSITION: LOADER → TERMINAL MODAL
  // ===================================================
  
  function transitionToTerminal() {
    const tl = gsap.timeline();
    
    // Sphere morphs/zooms out
    tl.to(sphere, {
      scale: 15,
      opacity: 0,
      duration: 1,
      ease: "power2.in"
    });
    
    // Progress section fades
    tl.to(progressSection, {
      opacity: 0,
      y: 30,
      duration: 0.5,
      ease: "power2.in"
    }, "-=0.8");
    
    // Rings expand and fade
    tl.to('.sphere-ring', {
      scale: 3,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.in"
    }, "-=1");
    
    // Background fades
    tl.to('.loader-bg', {
      opacity: 0,
      duration: 0.5
    }, "-=0.3");
    
    // Hide loader
    tl.set(tgraLoader, { display: 'none' });
    
    // Show terminal modal
    tl.call(() => {
      terminalModal.classList.add('active');
    });
    
    tl.to(terminalModal, {
      opacity: 1,
      duration: 0.5
    });
    
    // Logo animates in (split)
    tl.to(tgraLogo, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "back.out(1.7)"
    });
    
    // Logo parts animate separately
    tl.fromTo('.logo-left', 
      { x: -30, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.4 },
      "-=0.3"
    );
    
    tl.fromTo('.logo-right',
      { x: 30, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.4 },
      "-=0.4"
    );
    
    tl.fromTo('.logo-divider',
      { scaleY: 0, opacity: 0 },
      { scaleY: 1, opacity: 1, duration: 0.3 },
      "-=0.2"
    );
    
    // Terminal window appears
    tl.to(terminalWindow, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.5,
      ease: "back.out(1.5)"
    });
    
    // Terminal lines type in
    tl.to(terminalLine1, { opacity: 1, duration: 0.1 });
    tl.call(() => typeText(terminalLine1, "Initializing audio system..."));
    
    tl.to(terminalLine2, { opacity: 1, duration: 0.1 }, "+=1");
    tl.call(() => typeText(terminalLine2, "Audio driver loaded successfully."));
    
    // Input line appears
    tl.to(terminalInputLine, { 
      opacity: 1, 
      duration: 0.3 
    }, "+=0.8");
  }
  
  function typeText(element, text) {
    const textSpan = element.querySelector('.terminal-text');
    if (!textSpan) return;
    
    let i = 0;
    const speed = 30;
    
    function type() {
      if (i < text.length) {
        textSpan.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    }
    
    textSpan.textContent = '';
    type();
  }

  // ===================================================
  // TERMINAL BUTTON HANDLERS
  // ===================================================
  
  function handleMusicChoice(enableMusic) {
    musicEnabled = enableMusic;
    localStorage.setItem('musicEnabled', enableMusic ? 'true' : 'false');
    
    // Add response to terminal
    const response = document.createElement('div');
    response.className = 'terminal-line';
    response.innerHTML = `
      <span class="terminal-prompt">></span>
      <span class="terminal-text" style="color: ${enableMusic ? '#28c840' : '#ff5f57'}">
        ${enableMusic ? 'Audio enabled. Enjoy! ♪' : 'Continuing without audio.'}
      </span>
    `;
    
    terminalInputLine.style.display = 'none';
    terminalWindow.querySelector('.terminal-body').appendChild(response);
    
    gsap.fromTo(response, { opacity: 0 }, { opacity: 1, duration: 0.3 });
    
    // Start audio if enabled
    if (enableMusic && themeAudio) {
      themeAudio.volume = 0.5;
      themeAudio.play().catch(e => console.log("Audio blocked:", e));
      musicToggle?.classList.add('playing');
      musicIcon?.classList.remove('fa-volume-xmark');
      musicIcon?.classList.add('fa-volume-high');
    }
    
    // Trigger sun reveal after short delay
    setTimeout(triggerSunReveal, 1000);
  }
  
  terminalYes?.addEventListener('click', () => handleMusicChoice(true));
  terminalNo?.addEventListener('click', () => handleMusicChoice(false));

  // ===================================================
  // SUN RAY REVEAL
  // ===================================================
  
  function triggerSunReveal() {
    const tl = gsap.timeline();
    
    // Fade out terminal
    tl.to(terminalModal, {
      opacity: 0,
      duration: 0.5
    });
    
    tl.set(terminalModal, { display: 'none' });
    
    // Show sun reveal
    tl.call(() => {
      sunReveal.classList.add('active');
    });
    
    tl.to(sunReveal, { opacity: 1, duration: 0.1 });
    
    // Sun core expands
    tl.to(sunCore, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out"
    });
    
    // Rays shoot out
    tl.to('.ray', {
      opacity: 1,
      duration: 0.1,
      stagger: {
        each: 0.03,
        from: "random"
      }
    });
    
    tl.to('.ray', {
      scaleX: 1.5,
      duration: 0.5,
      ease: "power2.out"
    }, "-=0.2");
    
    // Flash
    tl.to(sunFlash, {
      opacity: 1,
      duration: 0.3,
      ease: "power2.in"
    });
    
    // Core expands massively
    tl.to(sunCore, {
      scale: 50,
      duration: 0.8,
      ease: "power2.in"
    }, "-=0.2");
    
    // Everything fades out to reveal site
    tl.to(sunReveal, {
      opacity: 0,
      duration: 1,
      ease: "power2.out"
    });
    
    // Cleanup and show site
    tl.call(() => {
      sunReveal.remove();
      document.body.classList.add('gsap-loaded');
      revealMainSite();
    });
  }

  // ===================================================
  // REVEAL MAIN SITE
  // ===================================================
  
  function revealMainSite() {
    const tl = gsap.timeline();
    
    tl.fromTo(".hero-image-wrapper", 
      { opacity: 0, y: 50, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out" }
    );
    
    tl.fromTo(".hero-title",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      "-=0.5"
    );
    
    tl.fromTo(".hero-description",
      { opacity: 0, y: 20 },
      { opacity: 0.7, y: 0, duration: 0.6, ease: "power2.out" },
      "-=0.4"
    );
    
    tl.fromTo(".search-wrapper",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
      "-=0.3"
    );
    
    tl.fromTo(".cast-section",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
      "-=0.2"
    );
    
    tl.fromTo(".floating-dock",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.5)" },
      "-=0.2"
    );
    
    // Show music toggle
    tl.call(() => {
      if (musicToggle) {
        musicToggle.classList.add('visible');
        if (musicEnabled) {
          musicToggle.classList.add('playing');
        }
      }
    });
    
    // Stagger chapter cards
    tl.fromTo(".chapter-card",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: "power2.out" },
      "-=0.3"
    );
  }

  // ===================================================
  // MUSIC TOGGLE
  // ===================================================
  
  musicToggle?.addEventListener('click', function() {
    if (musicEnabled) {
      themeAudio?.pause();
      musicEnabled = false;
      this.classList.remove('playing');
      musicIcon?.classList.remove('fa-volume-high');
      musicIcon?.classList.add('fa-volume-xmark');
    } else {
      themeAudio?.play().catch(e => console.log("Audio blocked:", e));
      musicEnabled = true;
      this.classList.add('playing');
      musicIcon?.classList.remove('fa-volume-xmark');
      musicIcon?.classList.add('fa-volume-high');
    }
    localStorage.setItem('musicEnabled', musicEnabled ? 'true' : 'false');
  });
  
  // Keyboard shortcut
  document.addEventListener('keydown', function(e) {
    if (e.key.toLowerCase() === 'm' && musicToggle?.classList.contains('visible')) {
      musicToggle.click();
    }
  });

});
