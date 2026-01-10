// script.js

// Register ScrollTrigger Plugin
gsap.registerPlugin(ScrollTrigger);

// Deepak's WhatsApp Number (Change This!)
const WHATSAPP_NUMBER = "919876543210";

// Hero Animation on Load
window.addEventListener('load', () => {
  const heroTl = gsap.timeline();
  
  heroTl
    .to('.hero-title', {
      opacity: 1,
      duration: 1.5,
      ease: 'power3.out'
    })
    .to('.hero-subtitle', {
      opacity: 1,
      duration: 1,
      ease: 'power3.out'
    }, '-=0.5')
    .to('.scroll-indicator', {
      opacity: 1,
      duration: 1,
      ease: 'power3.out'
    }, '-=0.5');
});

// Parallax Background Effect
gsap.utils.toArray('.section-bg').forEach(bg => {
  gsap.to(bg, {
    yPercent: -30,
    ease: 'none',
    scrollTrigger: {
      trigger: bg.parentElement,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    }
  });
});

// Hero Parallax
gsap.to('.hero-bg', {
  yPercent: -50,
  ease: 'none',
  scrollTrigger: {
    trigger: '.hero',
    start: 'top top',
    end: 'bottom top',
    scrub: true
  }
});

// Section Animations
gsap.utils.toArray('.category-section').forEach(section => {
  const title = section.querySelector('.section-title');
  const subtitle = section.querySelector('.section-subtitle');
  const cards = section.querySelectorAll('.product-card');
  
  // Title Animation
  gsap.to(title, {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: section,
      start: 'top 70%',
      end: 'top 30%',
      toggleActions: 'play none none reverse'
    }
  });
  
  // Subtitle Animation
  gsap.to(subtitle, {
    opacity: 1,
    y: 0,
    duration: 1,
    delay: 0.2,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: section,
      start: 'top 70%',
      end: 'top 30%',
      toggleActions: 'play none none reverse'
    }
  });
  
  // Product Cards Stagger Animation
  gsap.to(cards, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: section,
      start: 'top 50%',
      end: 'top 20%',
      toggleActions: 'play none none reverse'
    }
  });
});

// Category Indicator Update
const sections = gsap.utils.toArray('.category-section');
const indicator = document.querySelector('.indicator-text');

sections.forEach(section => {
  ScrollTrigger.create({
    trigger: section,
    start: 'top center',
    end: 'bottom center',
    onEnter: () => updateIndicator(section),
    onEnterBack: () => updateIndicator(section)
  });
});

function updateIndicator(section) {
  const category = section.dataset.category;
  const colors = {
    men: '#2d3436',
    women: '#8e4585',
    kids: '#38ef7d'
  };
  
  gsap.to(indicator, {
    opacity: 0,
    duration: 0.2,
    onComplete: () => {
      indicator.textContent = category.charAt(0).toUpperCase() + category.slice(1);
      indicator.style.color = colors[category];
      gsap.to(indicator, { opacity: 0.7, duration: 0.2 });
    }
  });
}

// Navbar Color Change
sections.forEach(section => {
  const category = section.dataset.category;
  const colors = {
    men: 'rgba(26, 26, 46, 0.9)',
    women: 'rgba(74, 25, 66, 0.9)',
    kids: 'rgba(17, 153, 142, 0.9)'
  };
  
  ScrollTrigger.create({
    trigger: section,
    start: 'top top',
    end: 'bottom top',
    onEnter: () => {
      gsap.to('.navbar', {
        background: colors[category],
        duration: 0.5
      });
    },
    onEnterBack: () => {
      gsap.to('.navbar', {
        background: colors[category],
        duration: 0.5
      });
    }
  });
});

// WhatsApp Order Function
document.querySelectorAll('.whatsapp-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    const card = this.closest('.product-card');
    const productName = card.dataset.product;
    const price = card.dataset.price;
    const category = card.closest('.category-section').dataset.category;
    
    orderOnWhatsApp(productName, price, category);
  });
});

function orderOnWhatsApp(productName, price, category) {
  const message = `Hi! 👋

I want to order:

🛍️ *Product:* ${productName}
📁 *Category:* ${category.charAt(0).toUpperCase() + category.slice(1)}
💰 *Price:* ₹${price}

Please confirm availability and share payment details.

Thank you! 🙏`;

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
}

// Smooth Scroll for Nav Links
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    
    gsap.to(window, {
      duration: 1,
      scrollTo: target,
      ease: 'power3.inOut'
    });
  });
});

// Refresh ScrollTrigger on Resize
window.addEventListener('resize', () => {
  ScrollTrigger.refresh();
});
