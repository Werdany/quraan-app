// const audio = document.querySelector("audio");
// const playIcon = document.querySelector(".fa-play");
// const forwardIcon = document.querySelector(".fa-forward");
// const backIcon = document.querySelector(".fa-backword");
// const audioRepeat = document.querySelector(".fa-repeat");
// const progress = document.querySelector(".progress");
// const audioDuration = document.querySelector(".counter");
// const audioFixed = document.querySelector(".fixed");
// const textFooter = document.querySelector(".text");
// // Select Reader
// const readers = document.querySelector(".reader");
// const readersName = document.querySelector(".list");
// const chosen = document.querySelector(".chosen");
// const searchReader = document.querySelector(".search-reader");

// const mainPage = document.querySelector(".all-quraan");

// let appState = {
//   currentSurah: 1,
//   currentReader: 0,
//   isPlaying: false,
// };
// // aside
// const sideBtn = document.querySelectorAll(".btn");
// sideBtn.forEach((btn) => {
//   btn.addEventListener("click", function () {
//     sideBtn.forEach((btn) => {
//       btn.classList.remove("active");
//     });
//     btn.classList.add("active");
//   });
// });
// readers.onclick = function (e) {
//   e.stopPropagation();
//   readersName.style.opacity = "1";
//   readersName.style.bottom = "-310px";
// };
// let readersOfQuraan = [];
// async function selectReader() {
//   const responseOfReaders = await fetch(
//     "https://mp3quran.net/api/v3/reciters?language=ar",
//   );
//   const readersData = await responseOfReaders.json();
//   readersOfQuraan = readersData.reciters;
//   for (let i = 0; i <= readersData.reciters.length; i++) {
//     let div = document.createElement("div");
//     div.innerHTML = readersData.reciters[i].name;
//     div.classList.add("reader-name");
//     div.dataset.counter = i + 1;
//     readersName.appendChild(div);
//     if (div.innerHTML === "ماهر المعيقلي") {
//       div.classList.add("reader-active");
//       appState.currentReader = div.dataset.counter;
//     }
//   }
//   syncName();
// }
// selectReader();
// function syncName() {
//   let allNames = readersName.getElementsByTagName("div");
//   Array.from(allNames).forEach((ele) => {
//     if (ele.classList.contains("reader-active")) {
//       chosen.innerHTML = ele.innerHTML;
//     }
//     ele.addEventListener("click", function (e) {
//       e.stopPropagation();
//       readersName.style.bottom = "10000000px";
//       readersName.style.opacity = "0";
//       Array.from(allNames).forEach((ele) => {
//         ele.classList.remove("reader-active");
//         ele.style.display = "block";
//       });
//       ele.classList.add("reader-active");
//       chosen.innerHTML = ele.innerHTML;
//       searchReader.value = "";
//       appState.currentReader = ele.dataset.counter;
//     });
//   });
// }
// document.addEventListener("click", function () {
//   readersName.style.opacity = "0";
//   readersName.style.bottom = "10000000px";
// });
// searchReader.addEventListener("input", function (e) {
//   e.stopPropagation();
//   let names = readersName.getElementsByTagName("div");
//   Array.from(names).forEach((ele) => {
//     if (ele.innerHTML.includes(searchReader.value)) {
//       ele.style.display = "";
//     } else {
//       ele.style.display = "none";
//     }
//   });
// });
// let nameOfSurahArab = [];
// let nameOfSurahEnglish = [];
// async function getSurahName() {
//   const response = await fetch("http://api.alquran.cloud/v1/surah");
//   const data = await response.json();
//   console.log(data);
//   for (let i = 0; i <= data.data.length; i++) {
//     nameOfSurahArab.push(data.data[i].name);
//     nameOfSurahEnglish.push(data.data[i].englishName);
//   }
// }
// getSurahName();
// console.log(nameOfSurahArab.length);
// console.log(nameOfSurahEnglish);
// for (let i = 0; i < 114; i++) {
//   console.log(nameOfSurahArab.length);
//   let num = document.createElement("span");
//   let info = document.createElement("div");
//   let surahArab = document.createElement("h3");
//   let surahEng = document.createElement("p");
//   let surah = document.createElement("div");
//   num.innerHTML = i + 1;
//   surahArab.innerHTML = nameOfSurahArab[i];
//   surahEng.innerHTML = nameOfSurahEnglish[i];
//   surah.classList.add("surah");
//   info.classList.add("info");
//   info.appendChild(surahArab);
//   info.appendChild(surahEng);
//   surah.appendChild(num);
//   surah.appendChild(info);
//   mainPage.appendChild(surah);
// }

const mainPage = document.querySelector(".all-quraan");

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

// app state
let appState = {
  currentSurah: 1,
  currentReader: 0,
  isPlaying: false,
  repeat: false,
};

// data
let readersData = [];
let surahsData = [];

// footer
const readers = document.querySelector(".reader");
const readersName = document.querySelector(".list");
const chosen = document.querySelector(".chosen");
const searchReader = document.querySelector(".search-reader");

// audio
const audio = document.querySelector("audio");
const playIcon = document.querySelector(".fa-play");
const forwardIcon = document.querySelector(".fa-forward");
const backIcon = document.querySelector(".fa-backward");
const audioRepeat = document.querySelector(".fa-repeat");
const progress = document.querySelector(".progress");
const audioDuration = document.querySelector(".counter");
const audioFixed = document.querySelector(".fixed");

// init app
async function initApp() {
  await getReaders();
  await getSurahs();

  renderReaders();
  renderSurahs();

  syncReaderName();
}

initApp();

// get readers
async function getReaders() {
  const response = await fetch(
    "https://mp3quran.net/api/v3/reciters?language=ar",
  );

  const data = await response.json();

  readersData = data.reciters;
}

// get surahs
async function getSurahs() {
  const response = await fetch("https://api.alquran.cloud/v1/surah");

  const data = await response.json();

  surahsData = data.data;
}

// render readers
function renderReaders() {
  readersData.forEach((reader, index) => {
    let div = document.createElement("div");

    div.innerHTML = reader.name;
    div.classList.add("reader-name");

    if (reader.name === "ماهر المعيقلي") {
      div.classList.add("reader-active");
      appState.currentReader = index;
      chosen.innerHTML = reader.name;
    }

    div.addEventListener("click", function (e) {
      e.stopPropagation();

      let allReaders = document.querySelectorAll(".reader-name");

      allReaders.forEach((ele) => {
        ele.classList.remove("reader-active");
        ele.style.display = "block";
      });

      div.classList.add("reader-active");

      chosen.innerHTML = reader.name;

      appState.currentReader = index;

      searchReader.value = "";

      readersName.classList.remove("visible");
    });

    readersName.appendChild(div);
  });
}

// render surahs
function renderSurahs() {
  surahsData.forEach((surahData) => {
    let num = document.createElement("span");
    let info = document.createElement("div");
    let surahArab = document.createElement("h3");
    let surahEng = document.createElement("p");
    let surah = document.createElement("div");

    num.innerHTML = surahData.number;
    surahArab.innerHTML = surahData.name;
    surahEng.innerHTML = surahData.englishName;

    surah.classList.add("surah");
    info.classList.add("info");

    info.appendChild(surahArab);
    info.appendChild(surahEng);

    surah.appendChild(num);
    surah.appendChild(info);

    surah.addEventListener("click", function () {
      appState.currentSurah = surahData.number;

      playCurrentSurah();

      updateActiveSurah();
    });

    mainPage.appendChild(surah);
  });

  searchOfSurah();
}

// play current surah
function playCurrentSurah() {
  let currentReader = readersData[appState.currentReader];
  let currentSurah = surahsData[appState.currentSurah - 1];

  let server = currentReader.moshaf[0].server;

  audio.src = `${server}${returnThreeDigits(currentSurah.number)}.mp3`;

  audio.play();

  appState.isPlaying = true;

  updatePlayIcon();
  updateFooterInfo(currentSurah, currentReader);
}

// update footer
function updateFooterInfo(currentSurah, currentReader) {
  let address = document.querySelector(".song-name h2");
  let readerName = document.querySelector(".n");

  address.innerHTML = currentSurah.name;
  readerName.innerHTML = currentReader.name;
}

// active surah
function updateActiveSurah() {
  let allSurahs = document.querySelectorAll(".surah");

  allSurahs.forEach((ele) => {
    ele.classList.remove("active-surah");
  });

  allSurahs[appState.currentSurah - 1].classList.add("active-surah");
}

// return 3 digits
function returnThreeDigits(num) {
  if (num < 10) {
    return `00${num}`;
  } else if (num < 100) {
    return `0${num}`;
  } else {
    return num;
  }
}

// reader list
readers.onclick = function () {
  readersName.classList.toggle("visible");
  console.log(readersName.classList);
};

searchReader.addEventListener("click", function (e) {
  e.stopPropagation();

  readersName.classList.add("visible");
});

// search reader
searchReader.addEventListener("input", function () {
  let names = readersName.getElementsByClassName("reader-name");

  Array.from(names).forEach((ele) => {
    if (cleanText(ele.innerHTML).includes(cleanText(searchReader.value))) {
      ele.style.display = "block";
    } else {
      ele.style.display = "none";
    }
  });
});

// sync reader name
function syncReaderName() {
  let activeReader = document.querySelector(".reader-active");

  if (activeReader) {
    chosen.innerHTML = activeReader.innerHTML;
  }
}

// play & pause
playIcon.addEventListener("click", function () {
  if (!audio.src) return;

  if (appState.isPlaying) {
    audio.pause();
    appState.isPlaying = false;
  } else {
    audio.play();
    appState.isPlaying = true;
  }

  updatePlayIcon();
});

// update icon
function updatePlayIcon() {
  if (appState.isPlaying) {
    playIcon.classList.remove("fa-play");
    playIcon.classList.add("fa-pause");
  } else {
    playIcon.classList.remove("fa-pause");
    playIcon.classList.add("fa-play");
  }
}

// next surah
forwardIcon.addEventListener("click", function () {
  if (appState.currentSurah < 114) {
    appState.currentSurah++;

    playCurrentSurah();

    updateActiveSurah();
  }
});

// previous surah
backIcon.addEventListener("click", function () {
  if (appState.currentSurah > 1) {
    appState.currentSurah--;

    playCurrentSurah();

    updateActiveSurah();
  }
});

// repeat
audioRepeat.onclick = function () {
  appState.repeat = !appState.repeat;

  audioRepeat.classList.toggle("loop-audio");
};

// audio ended
audio.addEventListener("ended", function () {
  if (appState.repeat) {
    audio.currentTime = 0;
    audio.play();
  } else {
    appState.isPlaying = false;

    updatePlayIcon();
  }
});

// audio duration
audio.onloadedmetadata = function () {
  progress.max = audio.duration;

  audioFixed.innerHTML = formatTime(audio.duration);
};

// audio update
audio.ontimeupdate = function () {
  progress.value = audio.currentTime;

  audioDuration.innerHTML = formatTime(audio.currentTime);
};

// progress
progress.addEventListener("input", function () {
  audio.currentTime = progress.value;
});

// format time
function formatTime(time) {
  let minutes = Math.floor(time / 60);

  let seconds = Math.floor(time % 60);

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${minutes}:${seconds}`;
}

// clean text
function cleanText(text) {
  if (!text) return "";

  return text
    .toLowerCase()
    .trim()
    .replace(/[\u064B-\u0652]/g, "")
    .replace(/[أإآ]/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/ى/g, "ي");
}

// search surah
function searchOfSurah() {
  const searchSurah = document.querySelector(".search");

  searchSurah.addEventListener("input", function () {
    let surahs = mainPage.getElementsByClassName("surah");

    Array.from(surahs).forEach((ele) => {
      let text = cleanText(ele.innerHTML);

      if (text.includes(cleanText(searchSurah.value))) {
        ele.style.display = "flex";
      } else {
        ele.style.display = "none";
      }
    });
  });
}

// close readers list
window.addEventListener("click", function (e) {
  if (!readers.contains(e.target)) {
    readersName.classList.remove("visible");
  }
});
