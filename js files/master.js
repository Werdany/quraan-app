// aside
const sideBtn = document.querySelectorAll(".btn");
sideBtn.forEach((btn) => {
  btn.addEventListener("click", function () {
    sideBtn.forEach((btn) => {
      btn.classList.remove("active");
    });
    btn.classList.add("active");
  });
});
//footer
const audio = document.querySelector("audio");
const playIcon = document.querySelector(".fa-play");
const forwardIcon = document.querySelector(".fa-forward");
const backIcon = document.querySelector(".fa-backword");
const audioRepeat = document.querySelector(".fa-repeat");
const progress = document.querySelector(".progress");
const audioDuration = document.querySelector(".counter");
const audioFixed = document.querySelector(".fixed");

audio.onloadedmetadata = function () {
  audioFixed.innerHTML = `${Math.floor(audio.duration / 60)}:${Math.floor(audio.duration % 60)}`;
  progress.max = audio.duration;
  audio.ontimeupdate = function () {
    progress.value = audio.currentTime;
    audioDuration.innerHTML = `${Math.floor(audio.currentTime / 60)}:${Math.floor(audio.currentTime % 60) < 10 ? "0" + Math.floor(audio.currentTime % 60) : Math.floor(audio.currentTime % 60)}`;
  };
};
playIcon.addEventListener("click", function () {
  if (playIcon.classList.contains("fa-play")) {
    audio.play();
    playIcon.classList.remove("fa-play");
    playIcon.classList.add("fa-pause");
  } else {
    audio.pause();
    playIcon.classList.remove("fa-pause");
    playIcon.classList.add("fa-play");
  }
});
audioRepeat.onclick = function () {
  audioRepeat.classList.toggle("loop-audio");
};
audio.addEventListener("ended", function () {
  if (audioRepeat.classList.contains("loop-audio")) {
    audio.currentTime = 0;
    audio.play();
  } else {
    playIcon.classList.remove("fa-pause");
    playIcon.classList.add("fa-play");
  }
});
progress.addEventListener("click", function () {
  audio.play();
  audio.currentTime = progress.value;
});
