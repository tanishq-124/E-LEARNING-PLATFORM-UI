// --- YouTube Search (Homepage + Courses Pages) ---
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const videoContainer = document.getElementById("videoContainer");

const API_KEY = "AIzaSyDemoKEY123"; // Replace with a real API key
const BASE_URL = "https://www.googleapis.com/youtube/v3/search";

async function searchVideos(query) {
  const url = `${BASE_URL}?part=snippet&maxResults=6&q=${encodeURIComponent(query + " college study material")}&key=${API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();

  if (videoContainer) {
    videoContainer.innerHTML = "";
    if (data.items) {
      data.items.forEach((item) => {
        const videoId = item.id.videoId;
        const title = item.snippet.title;
        const channel = item.snippet.channelTitle;

        const videoCard = document.createElement("div");
        videoCard.className = "video-card";
        videoCard.innerHTML = `
          <iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>
          <h4>${title}</h4>
          <p>${channel}</p>
        `;
        videoContainer.appendChild(videoCard);
      });
    } else {
      videoContainer.innerHTML = "<p>No videos found.</p>";
    }
  }
}

if (searchBtn) {
  searchBtn.addEventListener("click", () => {
    const query = searchInput.value.trim();
    if (query) searchVideos(query);
  });
}

// --- Course Playlist + Progress Tracking (course-detail.html) ---
const playlistContainer = document.getElementById("playlistContainer");
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");
const milestoneText = document.getElementById("milestoneText");
const markBtn = document.getElementById("markCompleteBtn");

// Sample playlists (course-specific)
const coursePlaylists = {
  webdev: [
    { title: "Introduction to HTML", videoId: "UB1O30fR-EE" },
    { title: "CSS Basics", videoId: "yfoY53QXEnI" },
    { title: "JavaScript Fundamentals", videoId: "hdI2bqOjy3c" },
    { title: "React Basics", videoId: "Ke90Tje7VS0" }
  ],
  python: [
    { title: "Python Basics", videoId: "rfscVS0vtbw" },
    { title: "Data Types & Loops", videoId: "xvFZjo5PgG0" },
    { title: "Functions & OOP", videoId: "WGJJIrtnfpk" }
  ],
  datasci: [
    { title: "Intro to Data Science", videoId: "ua-CiDNNj30" },
    { title: "Pandas Crash Course", videoId: "vmEHCJofslg" }
  ]
  // Add more playlists for each course...
};

// Detect which course
const params = new URLSearchParams(window.location.search);
const courseKey = params.get("course") || "webdev";

// Load playlist dynamically
if (playlistContainer && coursePlaylists[courseKey]) {
  const playlist = coursePlaylists[courseKey];
  playlist.forEach((item, index) => {
    const videoDiv = document.createElement("div");
    videoDiv.className = "video-card";
    videoDiv.innerHTML = `
      <iframe src="https://www.youtube.com/embed/${item.videoId}" frameborder="0" allowfullscreen></iframe>
      <h4>${item.title}</h4>
      <p>Chapter ${index + 1}</p>
    `;
    playlistContainer.appendChild(videoDiv);
  });
}

// --- Progress Tracking ---
const STORAGE_KEY = `course_progress_${courseKey}`;
let watchedCount = parseInt(localStorage.getItem(STORAGE_KEY)) || 0;

function updateProgress() {
  const total = coursePlaylists[courseKey]?.length || 1;
  const percent = Math.min(100, Math.round((watchedCount / total) * 100));
  if (progressBar) progressBar.style.width = percent + "%";
  if (progressText) progressText.innerText = `Progress: ${percent}%`;

  // Daily milestone (goal: 2 videos/day)
  const dailyGoal = 2;
  const milestone = Math.min(100, Math.round((watchedCount % dailyGoal) / dailyGoal * 100));
  if (milestoneText) milestoneText.innerText = `Daily Milestone: ${milestone}% completed`;
}

if (markBtn) {
  markBtn.addEventListener("click", () => {
    watchedCount++;
    localStorage.setItem(STORAGE_KEY, watchedCount);
    updateProgress();
  });
}

// Initialize progress
updateProgress();
