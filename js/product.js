// Product Page JavaScript

// Page Load Animation
window.addEventListener('load', () => {
  gsap.from('.product-gallery', {
    opacity: 0,
    x: -50,
    duration: 1,
    ease: 'power3.out'
  });
  
  gsap.from('.product-info-detail', {
    opacity: 0,
    x: 50,
    duration: 1,
    ease: 'power3.out'
  });
});

// Image Gallery
function changeImage(thumbnail) {
  const mainImage = document.getElementById('mainImage');
  
  // Remove active class from all thumbnails
  document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
  
  // Add active class to clicked thumbnail
  thumbnail.classList.add('active');
  
  // Animate and change main image
  gsap.to(mainImage, {
    opacity: 0,
    duration: 0.2,
    onComplete: () => {
      mainImage.src = thumbnail.src.replace('150x150', '600x800');
      gsap.to(mainImage, { opacity: 1, duration: 0.2 });
    }
  });
}

// Size Selection
document.querySelectorAll('.size-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
  });
});

// Quantity Controls
document.querySelector('.qty-btn.minus').addEventListener('click', () => {
  const input = document.getElementById('quantity');
  if (input.value > 1) {
    input.value = parseInt(input.value) - 1;
  }
});

document.querySelector('.qty-btn.plus').addEventListener('click', () => {
  const input = document.getElementById('quantity');
  if (input.value < 10) {
    input.value = parseInt(input.value) + 1;
  }
});

// Size Guide Modal
document.querySelector('.size-guide-link').addEventListener('click', (e) => {
  e.preventDefault();
  document.getElementById('sizeGuideModal').classList.add('active');
});

document.querySelector('.close-modal').addEventListener('click', () => {
  document.getElementById('sizeGuideModal').classList.remove('active');
});

// WhatsApp Order
document.getElementById('orderBtn').addEventListener('click', () => {
  const selectedSize = document.querySelector('.size-btn.active').dataset.size;
  const quantity = document.getElementById('quantity').value;
  
  const message = `Hi! 👋

I want to order from your website:

🛍️ *Product:* ${PRODUCT.name}
📁 *Category:* ${PRODUCT.category}
📏 *Size:* ${selectedSize}
🔢 *Quantity:* ${quantity}
💰 *Price:* ₹${PRODUCT.price} x ${quantity} = ₹${PRODUCT.price * quantity}

🔗 *Product Link:* ${PRODUCT.pageUrl}

Please confirm availability and share payment details.

Thank you! 🙏`;

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
});

// Share on WhatsApp
function shareOnWhatsApp() {
  const message = `Check out this ${PRODUCT.name} from Deepak Clothing!\n\nPrice: ₹${PRODUCT.price}\n\n${PRODUCT.pageUrl}`;
  const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
}

// Copy Link
function copyLink() {
  navigator.clipboard.writeText(PRODUCT.pageUrl).then(() => {
    alert('Link copied to clipboard!');
  });
}
