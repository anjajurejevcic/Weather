//Datum in ura

function now() {
  let datum = new Date();
  let hour = datum.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = datum.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  let days = [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
  ];

  let dan = datum.getDay();
  let day = days[dan];

  let rightTime = `${day} ${hour}:${minute}`;

  let danes = document.querySelector("#danes");
  danes.innerHTML = rightTime;

  let jutr = document.querySelector("#dan_dva");
  let jutrii = days[datum.getDay() + 1];
  jutr.innerHTML = jutrii;

  let poJutr = document.querySelector("#dan3");
  let poJutri = days[datum.getDay() + 2];
  poJutr.innerHTML = poJutri;

  let poPoJutr = document.querySelector("#dan4");
  let poPoJutri = days[datum.getDay() + 3];
  poPoJutr.innerHTML = poPoJutri;

  let poPoPoJutr = document.querySelector("#dan5");
  let poPoPoJutri = days[datum.getDay() + 4];
  poPoPoJutr.innerHTML = poPoPoJutri;
}

//lokacija v iskalniku in prikaz napisa
function city(event) {
  now();
  event.preventDefault();
  let city = document.querySelector("#type-city");
  let lokacija = document.querySelector("#lokacija");
  lokacija.innerHTML = city.value;

  function prikaz(response) {
    console.log(response);

    let todayTemperature = document.querySelector("#today-temperature");
    let temperaturica = Math.round(response.data.main.temp);
    todayTemperature.innerHTML = `${temperaturica}°C`;

    let feeling = document.querySelector("#feeling");
    let cuti = Math.round(response.data.main.feels_like);
    feeling.innerHTML = cuti;

    let humidity = document.querySelector("#humidity");
    let vlaga = Math.round(response.data.main.humidity);
    humidity.innerHTML = vlaga;

    let wind = document.querySelector("#wind");
    let veter = Math.round(response.data.wind.speed * 3.6);
    wind.innerHTML = veter;
  }
  function zaPrikazom(response) {
    let day2 = document.querySelector("#day2");
    let dan2 = Math.round(response.data.list[1].main.temp);
    day2.innerHTML = dan2;

    let day3 = document.querySelector("#day3");
    let dan3 = Math.round(response.data.list[2].main.temp);
    day3.innerHTML = dan3;

    let day4 = document.querySelector("#day4");
    let dan4 = Math.round(response.data.list[3].main.temp);
    day4.innerHTML = dan4;

    let day5 = document.querySelector("#day5");
    let dan5 = Math.round(response.data.list[4].main.temp);
    day5.innerHTML = dan5;

    console.log(response);
  }

  let mesto = city.value;
  function today(mesto) {
    let mestoZanimanja = mesto;
    let apiKey = "80ca9bc09bcdce0795252b3c82d6bba7";
    let urlToday = `https://api.openweathermap.org/data/2.5/weather?q=${mestoZanimanja}&units=metric&appid=${apiKey}`;
    axios.get(urlToday).then(prikaz);

    let urlNotToday = `https://api.openweathermap.org/data/2.5/forecast?q=${mestoZanimanja}&cnt=5&units=metric&appid=${apiKey}`;
    axios.get(urlNotToday).then(zaPrikazom);
  }
  today(mesto);
}
let vsebina = document.querySelector("#vsebina");
vsebina.addEventListener("submit", city);
