"use strict";

// VARIABLE

const API_KEY = "25367dfb440f7b6539ae81db039573b8";
const search = document.querySelector(".search");
const btnSearch = document.querySelector(".btn-search");
const curTemp = document.querySelector(".detail-temp");
const weather = document.querySelector(".detail-weather");
const minTemp = document.querySelector(".min-temp");
const maxTemp = document.querySelector(".max-temp");
const cityName = document.querySelector(".city-name");
const countryName = document.querySelector(".country-name");
const windSpeedValue = document.querySelector(".wind-speed");
const visibilityValue = document.querySelector(".visibility");
const pressureValue = document.querySelector(".pressure");
const humidityValue = document.querySelector(".humidity");

const dataNow = document.querySelector(".data");
// const now = new Date();

// const options = {
//   hour: "numeric",
//   minute: "numeric",
//   day: "numeric",
//   month: "numeric",
//   year: "numeric",
//   weekday: "long",
// };
// //const locale = navigator.language;

// data.textContent = new Intl.DateTimeFormat("en-GB", options).format(now);

const weatherApp = {
  url: `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=25367dfb440f7b6539ae81db039573b8`,

  bodyChanger(weather) {
    if (weather === "Clouds") {
      document.body.style.backgroundImage = "url(image2.jpg)";
    }
    if (weather === "Clear") {
      document.body.style.backgroundImage = "url(image1.jpg)";
    }
    if (weather === "Snow") {
      document.body.style.backgroundImage = "url(image4.jpg)";
    }
    if (weather === "Rain" || weather === "Drizzle") {
      document.body.style.backgroundImage = "url(image6.jpg)";
    }
    if (weather === "Thunderstorm") {
      document.body.style.backgroundImage = "url(image5.jpg)";
    }
    if (weather === "Mist" || weather === "Fog" || weather === "Smoke") {
      document.body.style.backgroundImage = "url(image3.jpg)";
    }
  },

  renderData(data) {
    const { temp, humidity, pressure, temp_max, temp_min } = data.main;

    const { speed } = data.wind;
    curTemp.innerHTML = `${Math.ceil(temp)}&deg;C`;
    document.querySelector(
      ".weather-icon"
    ).src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    console.log(data.weather[0].icon);
    weather.innerHTML = data.weather[0].description;

    minTemp.innerHTML = `${Math.ceil(temp_min)}&deg;C`;

    maxTemp.innerHTML = `${Math.ceil(temp_max)}&deg;C`;

    cityName.innerHTML = data.name;

    countryName.innerHTML = data.sys.country;

    windSpeedValue.innerHTML = `${Math.floor((speed / 1000) * 3600)} km/h`;

    visibilityValue.innerHTML = `${data.visibility / 1000} km`;

    pressureValue.innerHTML = `${pressure} hPa`;

    humidityValue.innerHTML = `${humidity} %`;

    const time = data.timezone * 1000;
    const now = new Date().getTime();
    const offsetTime = now + time;
    const currentDate = new Date(offsetTime - 7200000);

    const options = {
      hour: "numeric",
      minute: "numeric",
      day: "numeric",
      month: "numeric",
      year: "numeric",
      weekday: "long",
    };
    //const locale = navigator.language;

    dataNow.textContent = new Intl.DateTimeFormat("en-GB", options).format(
      currentDate
    );

    this.bodyChanger(data.weather[0].main);
  },

  getData(country = "Krakow") {
    fetch(`${this.url}&q=${country}`)
      .then((response) => {
        console.log(response);
        if (!response.ok)
          throw new Error(`Country not found (${response.status})`);
        return response.json();
      })
      .then((data) => {
        this.renderData(data);
      });
  },
};

weatherApp.getData();

btnSearch.addEventListener("click", function () {
  weatherApp.getData(search.value);

  search.value = "";
});

document
  .querySelector(".weather-search-box")
  .addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      weatherApp.getData(search.value);

      search.value = "";
    }
  });
