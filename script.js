// Sidebar Toggle
const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");
const closeSidebar = document.getElementById("closeSidebar");

if (menuBtn && sidebar) {
  menuBtn.addEventListener("click", () => sidebar.classList.add("active"));
}
if (closeSidebar) {
  closeSidebar.addEventListener("click", () => sidebar.classList.remove("active"));
}

// Theme Toggle
const themeToggle = document.getElementById("themeToggle");
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
  });
  // Load theme
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
  }
}

// Register Logic
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("regUsername").value;
    const email = document.getElementById("regEmail").value;
    localStorage.setItem("user", JSON.stringify({ username, email }));
    window.location.href = "dashboard.html";
  });
}

// Login Logic
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser && savedUser.username === username && savedUser.email === email) {
      window.location.href = "dashboard.html";
    } else {
      alert("Invalid credentials. Please register first.");
    }
  });
}

// Show username on dashboard
const dashUsername = document.getElementById("dashUsername");
if (dashUsername) {
  const savedUser = JSON.parse(localStorage.getItem("user"));
  if (savedUser) {
    dashUsername.textContent = savedUser.username;
  }
}

// Progress Update (for demo)
const updateProgressBtn = document.getElementById("updateProgress");
if (updateProgressBtn) {
  updateProgressBtn.addEventListener("click", () => {
    const bar = document.getElementById("progress");
    const currentWidth = parseInt(bar.style.width) || 40;
    const newWidth = Math.min(currentWidth + 10, 100);
    bar.style.width = newWidth + "%";
  });
}

// Logout
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("user");
    window.location.href = "login.html";
  });
}
