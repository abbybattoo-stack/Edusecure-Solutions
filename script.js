/* CURSOR */
const cursor = document.getElementById("cursor");
const ring = document.getElementById("cursorRing");

let mx = 0;
let my = 0;

let rx = 0;
let ry = 0;

document.addEventListener("mousemove", (e) => {
  mx = e.clientX;
  my = e.clientY;

  cursor.style.left = `${mx}px`;
  cursor.style.top = `${my}px`;
});

function animateRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;

  ring.style.left = `${rx}px`;
  ring.style.top = `${ry}px`;

  requestAnimationFrame(animateRing);
}

animateRing();

/* HOVER EFFECT */
document.querySelectorAll("a, button").forEach((el) => {
  el.addEventListener("mouseenter", () => {
    cursor.style.transform = "translate(-50%, -50%) scale(2.5)";
  });

  el.addEventListener("mouseleave", () => {
    cursor.style.transform = "translate(-50%, -50%) scale(1)";
  });
});

/* NAV SCROLL */
window.addEventListener("scroll", () => {
  const nav = document.querySelector("nav");

  nav.style.padding =
    window.scrollY > 50
      ? "0.9rem 5vw"
      : "1.25rem 5vw";
});

/* CONTACT SCROLL */
function scrollToContact() {
  document
    .getElementById("contact")
    .scrollIntoView({
      behavior: "smooth"
    });
}
