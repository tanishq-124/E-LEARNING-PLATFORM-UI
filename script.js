// Update progress dynamically
document.addEventListener("DOMContentLoaded", () => {
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
