// Mobile menu toggle
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");
  if (hamburger) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });
  }

  // Progress bar increment
  const updateBtn = document.getElementById("updateProgress");
  const progressBar = document.getElementById("progress");
  if (updateBtn && progressBar) {
    updateBtn.addEventListener("click", () => {
      let currentWidth = parseInt(progressBar.style.width);
      if (currentWidth < 100) {
        progressBar.style.width = (currentWidth + 20) + "%";
      } else {
        alert("Course Completed!");
      }
    });
  }
});
