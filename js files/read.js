const sideBtn = document.querySelectorAll(".btn");
sideBtn.forEach((btn) => {
  btn.addEventListener("click", function () {
    sideBtn.forEach((btn) => {
      btn.classList.remove("active");
    });
    btn.classList.add("active");
  });
});
// Read page
let surahsData = [];
let surahText = [];

async function init() {
  surahsData = await getSurahName();
  for (let i = 1; i <= 114; i++) {
    surahText.push(await getSurahText(i));
  }
  console.log(surahText);
  addSurahName();
}

init();

async function getSurahName() {
  let response = await fetch("https://api.alquran.cloud/v1/surah");
  let data = await response.json();
  return data.data;
}
async function getSurahText(val) {
  let response = await fetch(`https://api.alquran.cloud/v1/surah/${val}`);
  let data = await response.json();
  return data.data;
}

const surahName = document.querySelector(".choose-surah");
function addSurahName() {
  for (let i = 0; i < surahsData.length; i++) {
    let opt = document.createElement("option");
    opt.innerHTML = surahsData[i].name;
    opt.value = i;
    surahName.appendChild(opt);
  }
}
let currentSurah = 0;
surahName.addEventListener("change", () => {
  currentSurah = surahName.value;
  showSurah(currentSurah);
});
let show = document.querySelector(".show-surah");
function showSurah(val) {
  clean();
  for (let i = 0; i <= surahText[val].ayahs.length; i++) {
    let p = document.createElement("p");
    p.classList.add("text");
    p.textContent = surahText[val].ayahs[i].text;
    let sp = document.createElement("span");
    sp.textContent = i + 1;
    sp.classList.add("ayah-number");
    p.appendChild(sp);
    show.appendChild(p);
  }
}
function clean() {
  show.replaceChildren();
}
function normalizeArabic(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[\u064B-\u065F\u0670]/g, "") // التشكيل والألف الصغيرة
    .replace(/[ۖۗۘۙۚۛۜ۝۞]/g, "") // رموز الوقف
    .replace(/[أإآٱ]/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/ى/g, "ي")
    .replace(/ؤ/g, "و")
    .replace(/ئ/g, "ي")
    .replace(/ـ/g, "")
    .replace(/[\u06D6-\u06ED]/g, "");
}
function searchOfAyah() {
  const searchAyah = document.querySelector(".search");

  searchAyah.addEventListener("input", function () {
    let ayah = show.getElementsByClassName("text");

    Array.from(ayah).forEach((ele) => {
      if (
        normalizeArabic(ele.textContent).includes(
          normalizeArabic(searchAyah.value),
        )
      ) {
        ele.style.display = "block";
      } else {
        ele.style.display = "none";
      }
    });
  });
}
searchOfAyah();
