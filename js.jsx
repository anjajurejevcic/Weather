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
}

function ura(timestamp) {
  let datum = new Date(timestamp);
  let hour = datum.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = datum.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  return `${hour}:${minute}`;
}
//lokacija v iskalniku in prikaz napisa
function city(event) {
  now();
  event.preventDefault();
  let city = document.querySelector("#type-city");
  let lokacija = document.querySelector("#lokacija");
  lokacija.innerHTML = city.value;

  function prikaz(response) {
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

    let weatherIcon = document.querySelector("#weather_icon");
    weatherIcon.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  }
  function napoved(response) {
    let jutriNapoved = document.querySelector("#jutri");
    let odgovor = response.data.list[0];
    jutriNapoved.innerHTML = `
      <div class="column">
        <span>${ura(odgovor.dt * 1000)}</span>
        <br />
        <img
          class="teden-ikona"
          src="http://openweathermap.org/img/wn/${
            odgovor.weather[0].icon
          }@2x.png"
        />
        <br />
        <span>${Math.round(odgovor.main.temp)}</span>
        °C
      </div>
    `;
    odgovor = response.data.list[1];
    jutriNapoved.innerHTML += `
      <div class="column">
        <span>${ura(odgovor.dt * 1000)}</span>
        <br />
        <img
          class="teden-ikona"
          src="http://openweathermap.org/img/wn/${
            odgovor.weather[0].icon
          }@2x.png"
        />
        <br />
        <span>${Math.round(odgovor.main.temp)}</span>
        °C
      </div>
    `;
    odgovor = response.data.list[2];
    jutriNapoved.innerHTML += `
      <div class="column">
        <span>${ura(odgovor.dt * 1000)}</span>
        <br />
        <img
          class="teden-ikona"
          src="http://openweathermap.org/img/wn/${
            odgovor.weather[0].icon
          }@2x.png"
        />
        <br />
        <span>${Math.round(odgovor.main.temp)}</span>
        °C
      </div>
    `;
    odgovor = response.data.list[3];
    jutriNapoved.innerHTML += `
      <div class="column">
        <span>${ura(odgovor.dt * 1000)}</span>
        <br />
        <img
          class="teden-ikona"
          src="http://openweathermap.org/img/wn/${
            odgovor.weather[0].icon
          }@2x.png"
        />
        <br />
        <span>${Math.round(odgovor.main.temp)}</span>
        °C
      </div>
    `;
  }
  function today(mesto) {
    let mestoZanimanja = mesto;
    let apiKey = "80ca9bc09bcdce0795252b3c82d6bba7";
    let urlToday = `https://api.openweathermap.org/data/2.5/weather?q=${mestoZanimanja}&units=metric&appid=${apiKey}`;
    axios.get(urlToday).then(prikaz);

    let urlNotToday = `https://api.openweathermap.org/data/2.5/forecast?q=${mestoZanimanja}&units=metric&appid=${apiKey}`;
    axios.get(urlNotToday).then(napoved);
  }
  let mesto = document.querySelector("#type-city").value;
  today(mesto);
}

let vsebina = document.querySelector("#vsebina");
vsebina.addEventListener("submit", city);
