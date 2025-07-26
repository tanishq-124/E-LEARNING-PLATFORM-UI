// --- YouTube Search (for study material) ---
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const videoContainer = document.getElementById("videoContainer");

if (searchBtn) {
  searchBtn.addEventListener("click", async () => {
    const query = searchInput.value + " college study material";
    videoContainer.innerHTML = "<p>Loading results...</p>";
    try {
      const res = await fetch(`https://noembed.com/embed?url=https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`);
      // Placeholder (can't directly fetch YouTube API here for free)
      videoContainer.innerHTML = `
        <p>Showing top study videos for "${query}" (sample):</p>
        <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" allowfullscreen></iframe>
      `;
    } catch (e) {
      videoContainer.innerHTML = "<p>Could not load videos.</p>";
    }
  });
}

// --- Course Playlists & Summaries ---
const coursePlaylists = {
  webdev: [
    { title: "HTML & CSS Basics", url: "https://www.youtube.com/embed/mU6anWqZJcc" },
    { title: "JavaScript Fundamentals", url: "https://www.youtube.com/embed/W6NZfCO5SIk" },
    { title: "Frontend Project", url: "https://www.youtube.com/embed/Qqx_wzMmFeA" }
  ],
  python: [
    { title: "Python Basics", url: "https://www.youtube.com/embed/_uQrJ0TkZlc" },
    { title: "Data Types & Loops", url: "https://www.youtube.com/embed/kqtD5dpn9C8" },
    { title: "Project: Automation", url: "https://www.youtube.com/embed/s8XjEuplx_U" }
  ],
  datasci: [
    { title: "Intro to Data Science", url: "https://www.youtube.com/embed/X3paOmcrTjQ" },
    { title: "Pandas & Numpy", url: "https://www.youtube.com/embed/r-uOLxNrNk8" },
    { title: "Visualization", url: "https://www.youtube.com/embed/a9UrKTVEeZA" }
  ]
};

const courseSummaries = {
  webdev: "Learn to build websites from scratch, covering HTML, CSS, JavaScript, and real projects.",
  python: "Master Python programming, from basics to automation, AI, and data analysis.",
  datasci: "Dive into Machine Learning, Data Analysis, Pandas, and visualization tools."
};

// --- Enroll System (with Email) ---
document.querySelectorAll(".enroll-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const courseKey = btn.getAttribute("data-course");
    const name = localStorage.getItem("user_name") || "Student";
    const email = localStorage.getItem("user_email") || "";

    localStorage.setItem(`enrolled_${courseKey}`, "true");
    alert(`You enrolled in ${courseKey.toUpperCase()}!`);

    // Send confirmation (requires EmailJS setup)
    if (email && window.emailjs) {
      emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your EmailJS key
      emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
        to_name: name,
        to_email: email,
        course: courseKey
      }).then(() => alert("Enrollment email sent!"))
        .catch(err => console.log(err));
    }

    window.location.href = `course-detail.html?course=${courseKey}`;
  });
});

// --- Course Detail Page Loader ---
const urlParams = new URLSearchParams(window.location.search);
const courseKey = urlParams.get("course");
const playlistContainer = document.getElementById("playlistContainer");

if (courseKey && playlistContainer) {
  document.getElementById("courseTitle").innerText = courseKey.toUpperCase() + " Course";
  document.getElementById("courseSummary").innerText = courseSummaries[courseKey] || "Course details.";

  const enrolled = localStorage.getItem(`enrolled_${courseKey}`);
  const enrollBtn = document.getElementById("enrollNow");

  if (enrolled) {
    enrollBtn.style.display = "none"; // Already enrolled, show playlist
    coursePlaylists[courseKey].forEach((vid, index) => {
      const div = document.createElement("div");
      div.className = "video-card";
      div.innerHTML = `<h4>${vid.title}</h4>
        <iframe src="${vid.url}" frameborder="0" allowfullscreen></iframe>
        <button class="btn watch-btn" data-course="${courseKey}" data-index="${index}">Mark as Watched</button>`;
      playlistContainer.appendChild(div);
    });
  } else {
    enrollBtn.addEventListener("click", () => {
      localStorage.setItem(`enrolled_${courseKey}`, "true");
      location.reload();
    });
  }
}

// --- Track Watched Progress ---
document.querySelectorAll(".watch-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const course = btn.dataset.course;
    const index = parseInt(btn.dataset.index);
    const key = `course_progress_${course}`;
    let watched = parseInt(localStorage.getItem(key)) || 0;
    watched = Math.max(watched, index + 1);
    localStorage.setItem(key, watched);
    alert("Marked as watched!");
  });
});

// --- Dashboard Progress ---
const dashboardProgress = document.getElementById("dashboardProgress");
if (dashboardProgress) {
  Object.keys(coursePlaylists).forEach(course => {
    const total = coursePlaylists[course].length;
    const watched = parseInt(localStorage.getItem(`course_progress_${course}`)) || 0;
    const percent = Math.floor((watched / total) * 100);
    const div = document.createElement("div");
    div.className = "course-card";
    div.innerHTML = `
      <h4>${course.toUpperCase()}</h4>
      <div class="progress-bar"><div style="width:${percent}%"></div></div>
      <p>${percent}% completed</p>
    `;
    dashboardProgress.appendChild(div);
  });

  // Show profile info
  const profileName = document.getElementById("profileName");
  const profileEmail = document.getElementById("profileEmail");
  if (profileName) {
    profileName.innerText = localStorage.getItem("user_name") || "Student";
    profileEmail.innerText = localStorage.getItem("user_email") || "Not set";
  }
}

// --- Certificates (Demo + Earned) ---
const certificateContainer = document.getElementById("certificateContainer");
if (certificateContainer) {
  const demo = document.createElement("div");
  demo.className = "course-card";
  demo.innerHTML = `<img src="images/certificate-template.jpg" alt="Demo Certificate" />
    <h4>Demo Certificate</h4><p>Complete any course to unlock real ones.</p>`;
  certificateContainer.appendChild(demo);

  Object.keys(coursePlaylists).forEach(course => {
    const watched = parseInt(localStorage.getItem(`course_progress_${course}`)) || 0;
    const total = coursePlaylists[course].length;
    if (watched >= total) {
      const div = document.createElement("div");
      div.className = "course-card";
      div.innerHTML = `<img src="images/certificate-template.jpg" alt="Certificate" />
        <h4>${course.toUpperCase()} Certificate</h4>
        <p>Awarded to ${localStorage.getItem("user_name") || "Student"}</p>`;
      certificateContainer.appendChild(div);
    }
  });
}

// --- Settings: Dark Mode & Reset ---
const toggleThemeBtn = document.getElementById("toggleThemeBtn");
const resetProgressBtn = document.getElementById("resetProgressBtn");
const saveNameBtn = document.getElementById("saveNameBtn");

if (toggleThemeBtn) {
  toggleThemeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
  });
}

if (resetProgressBtn) {
  resetProgressBtn.addEventListener("click", () => {
    localStorage.clear();
    alert("Progress and login cleared!");
    location.reload();
  });
}

if (saveNameBtn) {
  saveNameBtn.addEventListener("click", () => {
    const newName = document.getElementById("userName").value;
    localStorage.setItem("user_name", newName);
    alert("Name updated!");
  });
}
