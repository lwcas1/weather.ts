"use strict";

const apiKey = "8a486bd9fa2bb292b27f27c115d1236a";
const apiCountryURL = "https://flagsapi.com/";

const cityInput = document.querySelector<HTMLInputElement>("#inputCity");
const searchBtn = document.querySelector<HTMLButtonElement>("#search");
const cityElement = document.querySelector<HTMLElement>("#city");
const tempElement = document.querySelector<HTMLElement>("#temp span");
const descElement = document.querySelector<HTMLElement>("#description");
const weatherIconElement = document.querySelector<HTMLImageElement>("#weatherIcon");
const countryElement = document.querySelector<HTMLImageElement>("#country");
const humidityElement = document.querySelector<HTMLElement>("#humidity span");
const windElement = document.querySelector<HTMLElement>("#wind span");
const weatherContainer = document.getElementById("weatherData");

const getWeatherData = async (city: string) => {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;
    const res = await fetch(apiWeatherURL);
    const data = await res.json();
    return data;
};

const showWeatherData = async (city: string) => {
    const data = await getWeatherData(city);
    cityElement!.innerHTML = data.name;
    tempElement!.innerHTML = parseInt(data.main.temp).toString();
    descElement!.innerHTML = data.weather[0].description;
    weatherIconElement!.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
    countryElement!.setAttribute("src", `${apiCountryURL}${data.sys.country}/flat/64.png`);
    humidityElement!.innerHTML = `${data.main.humidity}%`;
    windElement!.innerHTML = `${data.wind.speed}km/h`;
    weatherContainer!.classList.remove("hide");
};

if (searchBtn) {
    searchBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const city = cityInput?.value;
        if (city) {
            showWeatherData(city);
        }
    });
}
