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
const readers = document.querySelector(".reader");
const readersName = document.querySelector(".list");
const chosen = document.querySelector(".chosen");
const searchReader = document.querySelector(".search-reader");
searchReader.addEventListener("click", function () {
  readersName.style.opacity = "1";
  readersName.style.bottom = "-310px";
});
readers.onclick = function (e) {
  e.stopPropagation();
  readersName.style.opacity = "1";
  readersName.style.bottom = "-310px";
};
async function selectReader() {
  const res = await fetch(`https://mp3quran.net/api/v3/reciters?language=ar `);
  const data = await res.json();
  for (let i = 0; i <= 238; i++) {
    let div = document.createElement("div");
    div.innerHTML = data.reciters[i].name;
    div.classList.add("reader-name");
    div.dataset.counter = i + 1;
    readersName.appendChild(div);
    if (div.innerHTML === "ماهر المعيقلي") {
      div.classList.add("reader-active");
    }
  }
  syncName();
}
selectReader();
let dataCounter;
function syncName() {
  let allNames = readersName.getElementsByTagName("div");
  Array.from(allNames).forEach((ele) => {
    if (ele.classList.contains("reader-active")) {
      chosen.innerHTML = ele.innerHTML;
    }
    ele.addEventListener("click", function (e) {
      e.stopPropagation();
      readersName.style.bottom = "10000000px";
      readersName.style.opacity = "0";
      Array.from(allNames).forEach((ele) => {
        ele.classList.remove("reader-active");
        ele.style.display = "block";
      });
      ele.classList.add("reader-active");
      chosen.innerHTML = ele.innerHTML;
      searchReader.value = "";
      dataCounter = ele.dataset.counter;
      console.log(dataCounter);
    });
  });
}
document.addEventListener("click", function () {
  readersName.style.opacity = "0";
  readersName.style.bottom = "10000000px";
});
searchReader.addEventListener("input", function (e) {
  e.stopPropagation();
  let names = readersName.getElementsByTagName("div");
  Array.from(names).forEach((ele) => {
    if (ele.innerHTML.includes(searchReader.value)) {
      ele.style.display = "";
    } else {
      ele.style.display = "none";
    }
  });
});

const mainPage = document.querySelector(".all-quraan");

async function getSurahName() {
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
    surah.addEventListener("click", function () {
      let allSurah = mainPage.getElementsByClassName("surah");
      Array.from(allSurah).forEach((ele) => {
        ele.classList.remove("play-surah");
      });
      surah.classList.add("play-surah");
      if (dataCounter === undefined) {
        audio.src = `https://server12.mp3quran.net/maher/Almusshaf-Al-Mojawwad/${returnThreeDigits(num.innerHTML)}.mp3`;
        audio.play();
        playIcon.classList.remove("fa-play");
        playIcon.classList.add("fa-pause");
        let address = document.querySelector(".song-name h2");
        address.innerHTML = surahArab.innerHTML;
        console.log(dataCounter);
      } else {
        getSurahAudio(dataCounter, num.innerHTML, surahArab.innerHTML);
      }
      console.log(dataCounter);
      console.log(num.innerHTML);
    });
  }
  searchOfSurah();
}
function returnThreeDigits(num) {
  Number(num);
  if (num < 10) {
    return `00${num}`;
  } else if (num < 99) {
    return `0${num}`;
  } else {
    return num;
  }
}
getSurahName();

function cleanText(text) {
  if (!text) return "";

  return text
    .toLowerCase() // للإنجليزي
    .trim() // إزالة المسافات الزائدة في البداية والنهاية
    .replace(/[\u064B-\u0652]/g, "") // إزالة التشكيل العربي
    .replace(/[أإآ]/g, "ا") // توحيد الألف
    .replace(/ة/g, "ه") // توحيد التاء المربوطة
    .replace(/ى/g, "ي"); // توحيد الياء
}
function searchOfSurah() {
  const searchSurah = document.querySelector(".search");

  searchSurah.addEventListener("input", function () {
    let names = mainPage.getElementsByTagName("div");
    Array.from(names).forEach((ele) => {
      let text = cleanText(ele.innerHTML);
      if (text.includes(searchSurah.value)) {
        ele.style.display = "";
      } else {
        ele.style.display = "none";
      }
    });
  });
}

async function getSurahAudio(counter, surahNum, surahArab) {
  const response = await fetch(
    "https://mp3quran.net/api/v3/reciters?language=ar",
  );
  const data = await response.json();
  console.log(data);
  audio.src = `${data.reciters[counter - 1].moshaf[0].server}${returnThreeDigits(surahNum)}.mp3`;
  audio.play();
  playIcon.classList.remove("fa-play");
  playIcon.classList.add("fa-pause");
  let address = document.querySelector(".song-name h2");
  address.innerHTML = surahArab;
  let n = document.querySelector(".n");
  n.innerHTML = data.reciters[counter - 1].name;
}

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
  audioFixed.innerHTML = `${Math.floor(audio.duration / 60)}:${Math.floor(audio.duration % 60) < 10 ? "0" + Math.floor(audio.duration % 60) : Math.floor(audio.duration % 60)}`;
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
  }
});
progress.addEventListener("click", function () {
  audio.play();
  audio.currentTime = progress.value;
  playIcon.classList.remove("fa-play");
  playIcon.classList.add("fa-pause");
});
