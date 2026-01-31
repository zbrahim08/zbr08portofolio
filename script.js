const audio = document.getElementById("audio");
const playBtn = document.getElementById("playBtn");
const seek = document.getElementById("seek");
const current = document.getElementById("current");
const duration = document.getElementById("duration");

let started = false;

// Play / pause button
playBtn.onclick = () => {
  if (audio.paused) {
    audio.play();
    playBtn.textContent = "⏸";
  } else {
    audio.pause();
    playBtn.textContent = "▶";
  }
};

// Autoplay after first interaction (browser-safe)
document.addEventListener("click", () => {
  if (!started) {
    audio.play();
    playBtn.textContent = "⏸";
    started = true;
  }
}, { once: true });

// Metadata loaded
audio.onloadedmetadata = () => {
  seek.max = Math.floor(audio.duration);
  duration.textContent = format(audio.duration);
};

// Update progress
audio.ontimeupdate = () => {
  seek.value = Math.floor(audio.currentTime);
  current.textContent = format(audio.currentTime);
};

// Scrub
seek.oninput = () => {
  audio.currentTime = seek.value;
};

function format(t) {
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}
