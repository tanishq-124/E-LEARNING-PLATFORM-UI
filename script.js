// --- YouTube Search (Educational Videos) ---
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const videoContainer = document.getElementById("videoContainer");

// Use YouTube API (Free) - Replace with your own API key if needed
const API_KEY = "AIzaSyDemoKEY123"; // placeholder key
const BASE_URL = "https://www.googleapis.com/youtube/v3/search";

async function searchVideos(query) {
  const url = `${BASE_URL}?part=snippet&maxResults=6&q=${encodeURIComponent(query + " college study material")}&key=${API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();

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

if (searchBtn) {
  searchBtn.addEventListener("click", () => {
    const query = searchInput.value.trim();
    if (query) searchVideos(query);
  });
}

// --- Smooth Scroll Animation ---
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
