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
    } else if (ele.textContent === "بعد الصلاه") {
      pray();
    } else if (ele.textContent === "قبل النوم") {
      sleeping();
    } else if (ele.textContent === "الاستيقاظ") {
      wakeUp();
    } else if (ele.textContent === "ادعية الصلاه") {
      insidePray();
    } else if (ele.textContent === "الرقية الشرعية") {
      roqea();
    } else if (ele.textContent === "أدعيه عامة") {
      random();
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
function pray() {
  clean();

  let prayAzkar = azkar.filter(function (ele) {
    return ele.category === "الأذكار بعد السلام من الصلاة";
  });
  for (let i = 0; i < prayAzkar.length; i++) {
    let div = document.createElement("div");
    let alzekr = document.createElement("p");
    alzekr.classList.add("alzekr");
    alzekr.textContent = prayAzkar[i].zekr;
    let desc = document.createElement("p");
    desc.classList.add("describtion");
    desc.textContent = prayAzkar[i].description;
    let num = document.createElement("span");
    num.classList.add("count");
    if (prayAzkar[i].count === "") {
      num.textContent = 1;
    } else {
      num.textContent = Number(prayAzkar[i].count);
    }
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
function sleeping() {
  clean();

  let sleepAzkar = azkar.filter(function (ele) {
    return ele.category === "أذكار النوم";
  });
  for (let i = 0; i < sleepAzkar.length; i++) {
    let div = document.createElement("div");
    let alzekr = document.createElement("p");
    alzekr.classList.add("alzekr");
    alzekr.textContent = sleepAzkar[i].zekr;
    let desc = document.createElement("p");
    desc.classList.add("describtion");
    desc.textContent = sleepAzkar[i].description;
    let num = document.createElement("span");
    num.classList.add("count");
    if (sleepAzkar[i].count === "") {
      num.textContent = 1;
    } else {
      num.textContent = Number(sleepAzkar[i].count);
    }
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
function wakeUp() {
  clean();

  let sleepAzkar = azkar.filter(function (ele) {
    return ele.category === "أذكار الاستيقاظ من النوم";
  });
  for (let i = 0; i < sleepAzkar.length; i++) {
    let div = document.createElement("div");
    let alzekr = document.createElement("p");
    alzekr.classList.add("alzekr");
    alzekr.textContent = sleepAzkar[i].zekr;
    let desc = document.createElement("p");
    desc.classList.add("describtion");
    desc.textContent = sleepAzkar[i].description;
    let num = document.createElement("span");
    num.classList.add("count");
    if (sleepAzkar[i].count === "") {
      num.textContent = 1;
    } else {
      num.textContent = Number(sleepAzkar[i].count);
    }
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
function insidePray() {
  clean();

  let prayAzkar = azkar.filter(function (ele) {
    return (
      ele.category === "أذكار الآذان" ||
      ele.category === "دعاء الاستفتاح" ||
      ele.category === "دعاء الركوع" ||
      ele.category === "دعاء الرفع من الركوع" ||
      ele.category === "دعاء السجود" ||
      ele.category === "دعاء الجلسة بين السجدتين" ||
      ele.category === "دعاء سجود التلاوة" ||
      ele.category === "التشهد" ||
      ele.category === "الصلاة على النبي بعد التشهد" ||
      ele.category === "الدعاء بعد التشهد الأخير قبل السلام"
    );
  });
  for (let i = 0; i < prayAzkar.length; i++) {
    let div = document.createElement("div");
    let alzekr = document.createElement("p");
    alzekr.classList.add("alzekr");
    alzekr.textContent = prayAzkar[i].zekr;
    let desc = document.createElement("p");
    desc.classList.add("describtion");
    desc.textContent = prayAzkar[i].category;
    let num = document.createElement("span");
    num.classList.add("count");
    if (prayAzkar[i].count === "") {
      num.textContent = 1;
    } else {
      num.textContent = Number(prayAzkar[i].count);
    }
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

function roqea() {
  clean();

  let roqeaAzkar = azkar.filter(function (ele) {
    return ele.category === "الرقية الشرعية من القرآن الكريم";
  });
  for (let i = 0; i < roqeaAzkar.length; i++) {
    let div = document.createElement("div");
    let alzekr = document.createElement("p");
    alzekr.classList.add("alzekr");
    alzekr.textContent = roqeaAzkar[i].zekr;
    let desc = document.createElement("p");
    desc.classList.add("describtion");
    desc.textContent = roqeaAzkar[i].description;
    let num = document.createElement("span");
    num.classList.add("count");
    if (roqeaAzkar[i].count === "") {
      num.textContent = 1;
    } else {
      num.textContent = Number(roqeaAzkar[i].count);
    }
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
function random() {
  clean();

  let randomAzkar = azkar.filter(function (ele) {
    return (
      ele.category !== "أذكار الصباح" &&
      ele.category !== "أذكار المساء" &&
      ele.category !== "أذكار النوم" &&
      ele.category !== "أذكار الاستيقاظ من النوم" &&
      ele.category !== "أذكار بعد السلام من الصلاة" &&
      ele.category !== "الرقية الشرعية من القرآن الكريم" &&
      ele.category !== "أذكار الآذان" &&
      ele.category !== "دعاء الاستفتاح" &&
      ele.category !== "دعاء الركوع" &&
      ele.category !== "دعاء الرفع من الركوع" &&
      ele.category !== "دعاء السجود" &&
      ele.category !== "دعاء الجلسة بين السجدتين" &&
      ele.category !== "دعاء سجود التلاوة" &&
      ele.category !== "التشهد" &&
      ele.category !== "الصلاة على النبي بعد التشهد" &&
      ele.category !== "الدعاء بعد التشهد الأخير قبل السلام"
    );
  });
  for (let i = 0; i < randomAzkar.length; i++) {
    let div = document.createElement("div");
    let alzekr = document.createElement("p");
    alzekr.classList.add("alzekr");
    alzekr.textContent = randomAzkar[i].zekr;
    let desc = document.createElement("p");
    desc.classList.add("describtion");
    desc.textContent = randomAzkar[i].category;
    let num = document.createElement("span");
    num.classList.add("count");
    if (randomAzkar[i].count === "" || "null") {
      num.textContent = 1;
    } else {
      num.textContent = Number(randomAzkar[i].count);
    }
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
