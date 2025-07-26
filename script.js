document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");
  const themeToggle = document.getElementById("themeToggle");
  const updateBtn = document.getElementById("updateProgress");
  const progressBar = document.getElementById("progress");
  const loginForm = document.getElementById("loginForm");
  const usernameDisplay = document.getElementById("usernameDisplay");
  const emailDisplay = document.getElementById("emailDisplay");
  const logoutBtn = document.getElementById("logoutBtn");

  /* Hamburger Menu */
  if (hamburger) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });
  }

  /* Dark/Light Mode */
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") document.body.classList.add("dark");
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
    });
  }

  /* Progress Button */
  if (updateBtn && progressBar) {
    updateBtn.addEventListener("click", () => {
      let width = parseInt(progressBar.style.width) || 0;
      if (width < 100) {
        progressBar.style.width = (width + 20) + "
