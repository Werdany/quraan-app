let ahadithNawawia = [];
let ahadithBukhary = [];
let ahadithMuslim = [];
let ahadithMalik = [];
let ahadithTermezy = [];

async function init() {
  ahadithNawawia = await nawawia();
  ahadithBukhary = await bukhary();
  ahadithMuslim = await muslim();
  ahadithMalik = await malik();
  ahadithTermezy = await Termezy();
  console.log(ahadithNawawia);
  console.log(ahadithBukhary);
  console.log(ahadithMuslim);
  console.log(ahadithMalik);
  console.log(ahadithTermezy);
  showHadithNw();
}
init();

async function nawawia() {
  const response = await fetch("./json/nawawi40_clean.json");

  const data = await response.json();

  return data;
}
async function bukhary() {
  const response = await fetch("./json/bukhari_clean.json");

  const data = await response.json();

  return data;
}
async function muslim() {
  const response = await fetch("./json/muslim_clean.json");

  const data = await response.json();

  return data;
}
async function malik() {
  const response = await fetch("./json/malik_clean.json");

  const data = await response.json();

  return data;
}
async function Termezy() {
  const response = await fetch("./json/tirmidhi_clean.json");

  const data = await response.json();

  return data;
}

let list = document.querySelector("select");
list.addEventListener("change", function () {
  if (list.value === "النوويه") {
    showHadithNw();
  }
  if (list.value === "البخاري") {
    showHadithBk();
  }
  if (list.value === "مسلم") {
    showHadithMu();
  }
  if (list.value === "الترمذي") {
    showHadithTr();
  }
  if (list.value === "مالك") {
    showHadithMa();
  }
});

let alhadith = document.querySelector(".show-azkar");
console.log(alhadith);
function clean() {
  alhadith.replaceChildren();
}

async function showHadithNw() {
  clean();

  for (let i = 0; i < ahadithNawawia.length; i++) {
    let div = document.createElement("div");
    let hadith = document.createElement("p");
    hadith.classList.add("alzekr");
    hadith.textContent = ahadithNawawia[i].content;
    let title = document.createElement("p");
    title.classList.add("describtion");
    title.textContent = ahadithNawawia[i].title;
    div.appendChild(hadith);
    div.appendChild(title);
    alhadith.appendChild(div);
  }
}
async function showHadithBk() {
  clean();

  for (let i = 0; i < ahadithBukhary.length; i++) {
    let div = document.createElement("div");
    let hadith = document.createElement("p");
    hadith.classList.add("alzekr");
    hadith.textContent = ahadithBukhary[i].content;
    let title = document.createElement("p");
    title.classList.add("describtion");
    title.textContent = ahadithBukhary[i].title;
    div.appendChild(hadith);
    div.appendChild(title);
    alhadith.appendChild(div);
  }
}
async function showHadithMu() {
  clean();

  for (let i = 0; i < ahadithMuslim.length; i++) {
    let div = document.createElement("div");
    let hadith = document.createElement("p");
    hadith.classList.add("alzekr");
    hadith.textContent = ahadithMuslim[i].content;
    let title = document.createElement("p");
    title.classList.add("describtion");
    title.textContent = ahadithMuslim[i].title;
    div.appendChild(hadith);
    div.appendChild(title);
    alhadith.appendChild(div);
  }
}
async function showHadithMa() {
  clean();

  for (let i = 0; i < ahadithMalik.length; i++) {
    let div = document.createElement("div");
    let hadith = document.createElement("p");
    hadith.classList.add("alzekr");
    hadith.textContent = ahadithMalik[i].content;
    let title = document.createElement("p");
    title.classList.add("describtion");
    title.textContent = ahadithMalik[i].title;
    div.appendChild(hadith);
    div.appendChild(title);
    alhadith.appendChild(div);
  }
}
async function showHadithTr() {
  clean();

  for (let i = 0; i < ahadithTermezy.length; i++) {
    let div = document.createElement("div");
    let hadith = document.createElement("p");
    hadith.classList.add("alzekr");
    hadith.textContent = ahadithTermezy[i].content;
    let title = document.createElement("p");
    title.classList.add("describtion");
    title.textContent = ahadithTermezy[i].title;
    div.appendChild(hadith);
    div.appendChild(title);
    alhadith.appendChild(div);
  }
}
