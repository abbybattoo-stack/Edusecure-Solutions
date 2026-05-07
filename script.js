/* ═══ CURSOR ═══ */
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top = my + 'px';
});

function animateRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top = ry + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll('a, button, .service-card, .pillar').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(2.5)';
    ring.style.width = '60px';
    ring.style.height = '60px';
    ring.style.borderColor = 'rgba(212,168,67,0.8)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    ring.style.width = '38px';
    ring.style.height = '38px';
    ring.style.borderColor = 'rgba(212,168,67,0.5)';
  });
});

/* ═══ SCROLL REVEAL ═══ */
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const siblings = [...entry.target.parentElement.children].filter(c => c.classList.contains('reveal'));
      const idx = siblings.indexOf(entry.target);
      setTimeout(() => entry.target.classList.add('up'), idx * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

reveals.forEach(el => observer.observe(el));

/* ═══ METRIC BARS ═══ */
const barObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.metric-bar').forEach(bar => {
        bar.style.transform = 'scaleX(' + bar.getAttribute('data-width') + ')';
      });
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });

document.querySelectorAll('.trust-metrics').forEach(el => barObserver.observe(el));

/* ═══ CARD MOUSE RADIAL ═══ */
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width * 100).toFixed(1) + '%';
    const y = ((e.clientY - rect.top) / rect.height * 100).toFixed(1) + '%';
    card.style.setProperty('--mx', x);
    card.style.setProperty('--my', y);
  });
});

/* ═══ NAV SCROLL ═══ */
window.addEventListener('scroll', () => {
  document.querySelector('nav').style.padding = window.scrollY > 50 ? '0.9rem 5vw' : '1.25rem 5vw';
});

/* ═══ CONTACT SCROLL ═══ */
function scrollToContact() {
  document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
}

/* ═══ FORM SUBMIT ═══ */
document.getElementById('contact-form').addEventListener('submit', async function(e) {
  e.preventDefault();
  const form = e.target;
  const btn = document.getElementById('form-submit');
  const messageBox = document.getElementById('form-message');

  btn.textContent = 'Sending...';
  btn.disabled = true;

  try {
    const response = await fetch(form.action, {
      method: form.method,
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      messageBox.textContent = '✅ Success! We\'ll be in touch.';
      messageBox.style.color = '#2ec4b6';
      btn.textContent = 'Sent ✓';
      form.reset();
    } else {
      messageBox.textContent = '❌ Error. Please try again.';
      messageBox.style.color = '#e05c3a';
      btn.textContent = 'Send Message →';
      btn.disabled = false;
    }
  } catch (error) {
    messageBox.textContent = '⚠️ Network error. Please try again.';
    messageBox.style.color = '#e05c3a';
    btn.textContent = 'Send Message →';
    btn.disabled = false;
  }
});
