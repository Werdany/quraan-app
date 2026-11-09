let fajr = document.querySelector(".fajr span");
let dhuhr = document.querySelector(".dhuhr span");
let asr = document.querySelector(".asr span");
let maghrib = document.querySelector(".maghrib span");
let isha = document.querySelector(".isha span");

navigator.geolocation.getCurrentPosition((position) => {
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
  getPrayerTimes(position.coords.latitude, position.coords.longitude);
});

async function getPrayerTimes(x, y) {
  const response = await fetch(
    `https://api.aladhan.com/v1/timings?latitude=${x}&longitude=${y}&method=5`,
  );

  const data = await response.json();
  fajr.innerHTML = data.data.timings.Fajr;
  dhuhr.innerHTML = data.data.timings.Dhuhr;
  asr.innerHTML = data.data.timings.Asr;
  maghrib.innerHTML = data.data.timings.Maghrib;
  isha.innerHTML = data.data.timings.Isha;
  console.log(data.data.timings);
}
