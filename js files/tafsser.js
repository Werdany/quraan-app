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
  let response = await fetch(
    `https://api.alquran.cloud/v1/surah/${val}/quran-simple`,
  );
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
async function showSurah(val) {
  val = Number(val);
  clean();
  let tafsirAyat = await getSurahTafsser(val + 1, surahText[val].ayahs.length);
  for (let i = 0; i <= surahText[val].ayahs.length; i++) {
    let mainAyah = document.createElement("div");
    let p = document.createElement("p");
    p.classList.add("text");
    p.textContent = surahText[val].ayahs[i].text;
    let sp = document.createElement("span");
    sp.textContent = i + 1;
    sp.classList.add("ayah-number");
    p.appendChild(sp);
    let div = document.createElement("div");
    div.classList.add("tafsir");
    div.textContent = tafsirAyat[i].tafsir;
    mainAyah.appendChild(p);
    mainAyah.appendChild(div);
    show.appendChild(mainAyah);
  }
}
function clean() {
  show.replaceChildren();
}
function normalizeArabic(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[\u064B-\u065F\u0670]/g, "")
    .replace(/[ۖۗۘۙۚۛۜ۝۞]/g, "")
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
async function getSurahTafsser(surah, ayah) {
  let tafsser = [];
  let requests = [];
  for (let i = 1; i <= ayah; i++) {
    requests.push(
      fetch(
        `https://api.alquran.cloud/v1/ayah/${surah}:${ayah}>/ar.muyassar`,
      ).then((res) => res.json()),
    );
  }
  const data = await Promise.all(requests);
  data.forEach(function (ele, index) {
    tafsser.push({
      ayah: index + 1,
      tafsir: ele.data.text,
    });
  });
  console.log(tafsser);
  return tafsser;
}
