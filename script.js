// Custom cursor
(function () {
  const cursor = document.getElementById("cursor");
  const ring = document.getElementById("cursor-ring");
  if (!cursor || !ring) return;
  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener("mousemove", (e) => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + "px"; cursor.style.top = my + "px";
  });
  (function loop() {
    rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
    ring.style.left = rx + "px"; ring.style.top = ry + "px";
    requestAnimationFrame(loop);
  })();
  const enter = () => {
    cursor.style.transform = "translate(-50%, -50%) scale(2.5)";
    ring.style.width = "60px"; ring.style.height = "60px";
    ring.style.borderColor = "rgba(212,168,67,0.8)";
  };
  const leave = () => {
    cursor.style.transform = "translate(-50%, -50%) scale(1)";
    ring.style.width = "38px"; ring.style.height = "38px";
    ring.style.borderColor = "rgba(212,168,67,0.5)";
  };
  document.querySelectorAll("a, button, .service-card, .pillar").forEach((el) => {
    el.addEventListener("mouseenter", enter);
    el.addEventListener("mouseleave", leave);
  });
})();

// Reveal on scroll
(function () {
  const reveals = document.querySelectorAll(".reveal");
  const ro = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const siblings = [...(entry.target.parentElement?.children ?? [])].filter((c) => c.classList.contains("reveal"));
        const idx = siblings.indexOf(entry.target);
        setTimeout(() => entry.target.classList.add("up"), idx * 80);
        ro.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  reveals.forEach((el) => ro.observe(el));
})();

// Metric bars
(function () {
  const bo = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll(".metric-bar").forEach((bar) => {
          bar.style.transform = "scaleX(" + bar.getAttribute("data-width") + ")";
        });
        bo.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  document.querySelectorAll(".trust-metrics").forEach((el) => bo.observe(el));
})();

// Service card radial hover
document.querySelectorAll(".service-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mx", (((e.clientX - rect.left) / rect.width) * 100).toFixed(1) + "%");
    card.style.setProperty("--my", (((e.clientY - rect.top) / rect.height) * 100).toFixed(1) + "%");
  });
});

// Contact form
(function () {
  const form = document.getElementById("contact-form");
  const msg = document.getElementById("form-message");
  const btn = document.getElementById("submit-btn");
  if (!form) return;
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    btn.disabled = true; btn.textContent = "Sending...";
    msg.style.color = "var(--muted)"; msg.textContent = "Sending...";
    try {
      const res = await fetch(form.action, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } });
      if (res.ok) {
        msg.style.color = "var(--gold)"; msg.textContent = "✓ Thanks — we'll be in touch within 24 hours.";
        form.reset();
      } else {
        msg.style.color = "var(--coral)"; msg.textContent = "Something went wrong. Please email us directly.";
      }
    } catch {
      msg.style.color = "var(--coral)"; msg.textContent = "Network error. Please try again.";
    } finally {
      btn.disabled = false; btn.textContent = "Send Message →";
    }
  });
})();
