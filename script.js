// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    mobileMenu.classList.add('hidden');
  });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 100) {
    navbar.classList.add('bg-white', 'shadow-lg');
  } else {
    navbar.classList.remove('bg-white', 'shadow-lg');
  }
});

// Contact form submission
document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  alert('Thank you for your message! We will get back to you within 24 hours.');
  this.reset();
});

// Fade-in animation on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('fade-in');
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('section').forEach(section => observer.observe(section));

// Counter animation
function animateCounters() {
  const counters = document.querySelectorAll('.text-3xl');
  counters.forEach(counter => {
    const target = parseInt(counter.textContent.replace(/\D/g, ''));
    if (target) {
      let current = 0;
      const increment = target / 100;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        counter.textContent = Math.floor(current) + (counter.textContent.includes('%') ? '%' : '+');
      }, 20);
    }
  });
}

const aboutSection = document.getElementById('about');
const aboutObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounters();
      aboutObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

aboutObserver.observe(aboutSection);
