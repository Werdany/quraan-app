//    https://api.alfurqan.online

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
// Select Reader
const readers = document.querySelector(".mens");
async function selectReader() {
  const res = await fetch(`https://mp3quran.net/api/v3/reciters?language=ar `);
  const data = await res.json();
  for (let i = 0; i <= 238; i++) {
    let opt = document.createElement("option");
    opt.innerHTML = data.reciters[i].name;
    opt.value = data.reciters[i].id;
    readers.appendChild(opt);
  }
}
selectReader();

const mainPage = document.querySelector(".all-quraan");

const audio = document.querySelector("audio");
const playIcon = document.querySelector(".fa-play");
const forwardIcon = document.querySelector(".fa-forward");
const backIcon = document.querySelector(".fa-backword");
const audioRepeat = document.querySelector(".fa-repeat");
const progress = document.querySelector(".progress");
const audioDuration = document.querySelector(".counter");
const audioFixed = document.querySelector(".fixed");
const textFooter = document.querySelector(".text");
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

getSurah();
async function getSurah() {
  // طلب بيانات القارئ (رقم 1 هو العفاسي)
  const response = await fetch(
    "https://mp3quran.net/api/v3/reciters?language=ar",
  );
  const data = await response.json();
  console.log(data);
}
async function getSurahName() {
  // طلب بيانات القارئ (رقم 1 هو العفاسي)
  const response = await fetch("http://api.alquran.cloud/v1/surah");
  const data = await response.json();
  console.log(data);
  for (let i = 0; i < data.data.length; i++) {
    let num = document.createElement("span");
    let info = document.createElement("div");
    let surahArab = document.createElement("h3");
    let surahEng = document.createElement("p");
    let surah = document.createElement("div");

    num.innerHTML = i + 1;
    surahArab.innerHTML = data.data[i].name;
    surahEng.innerHTML = data.data[i].englishName;
    surah.classList.add("surah");
    info.classList.add("info");
    info.appendChild(surahArab);
    info.appendChild(surahEng);
    surah.appendChild(num);
    surah.appendChild(info);
    mainPage.appendChild(surah);
  }
}
getSurahName();
