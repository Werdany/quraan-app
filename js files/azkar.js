const sideBtn = document.querySelectorAll("button");
sideBtn.forEach((btn) => {
  btn.addEventListener("click", function () {
    sideBtn.forEach((btn) => {
      btn.classList.remove("active");
    });
    btn.classList.add("active");
  });
});

let azkar = [];

async function init() {
  azkar = await getAzkar();
  morning();
  console.log(azkar);
}
init();

async function getAzkar() {
  const response = await fetch("./azkar_obj.json");

  const data = await response.json();

  console.log(data);
  return data;
}

let azkarList = document.querySelectorAll("ul li");
let showAzkar = document.querySelector(".show-azkar");

azkarList.forEach(function (ele) {
  ele.addEventListener("click", function () {
    if (ele.textContent === "الصباح") {
      morning();
    } else if (ele.textContent === "المساء") {
      evining();
    }
  });
});
function clean() {
  showAzkar.replaceChildren();
}
function morning() {
  clean();
  let morningAzkar = azkar.filter(function (ele) {
    return ele.category === "أذكار الصباح";
  });
  for (let i = 0; i < morningAzkar.length; i++) {
    let div = document.createElement("div");
    let alzekr = document.createElement("p");
    alzekr.classList.add("alzekr");
    alzekr.textContent = morningAzkar[i].zekr;
    let desc = document.createElement("p");
    desc.classList.add("describtion");
    desc.textContent = morningAzkar[i].description;
    let num = document.createElement("span");
    num.classList.add("count");
    num.textContent = Number(morningAzkar[i].count);
    num.addEventListener("click", () => {
      if (Number(num.textContent) > 0) {
        let val = Number(num.textContent);
        val--;
        num.textContent = val;
      }
      if (Number(num.textContent) == 0) {
        alzekr.classList.add("blackColor");
        desc.classList.add("blackColor");
        num.classList.add("blackBg");
        div.classList.add("blackBox");
      }
    });
    div.appendChild(alzekr);
    div.appendChild(desc);
    div.appendChild(num);
    showAzkar.appendChild(div);
  }
}
function evining() {
  clean();

  let eviningAzkar = azkar.filter(function (ele) {
    return ele.category === "أذكار المساء";
  });
  for (let i = 0; i < eviningAzkar.length; i++) {
    let div = document.createElement("div");
    let alzekr = document.createElement("p");
    alzekr.classList.add("alzekr");
    alzekr.textContent = eviningAzkar[i].zekr;
    let desc = document.createElement("p");
    desc.classList.add("describtion");
    desc.textContent = eviningAzkar[i].description;
    let num = document.createElement("span");
    num.classList.add("count");
    num.textContent = Number(eviningAzkar[i].count);
    num.addEventListener("click", () => {
      if (Number(num.textContent) > 0) {
        let val = Number(num.textContent);
        val--;
        num.textContent = val;
      } else if (Number(num.textContent) === 0) {
        alzekr.classList.add("blackAndWhite");
        desc.classList.add("blackAndWhite");
        num.classList.add("blackAndWhite");
      }
    });
    div.appendChild(alzekr);
    div.appendChild(desc);
    div.appendChild(num);
    showAzkar.appendChild(div);
  }
}
