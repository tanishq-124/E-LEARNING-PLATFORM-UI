// Mobile Menu Toggle
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");
if (hamburger) {
  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });
}

// Fade-in animation on scroll
const faders = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.2 });

faders.forEach(fader => observer.observe(fader));
