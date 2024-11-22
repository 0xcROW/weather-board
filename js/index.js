"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const form = document.querySelector('#formSection > form');
const input = document.querySelector('#location');
const weatherInfos = document.querySelector('#weatherSection');
const apiKey = ""; // Add your OpenWeatherMap API key here
form === null || form === void 0 ? void 0 : form.addEventListener('submit', (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    if (!input || !weatherInfos) {
        return;
    }
    const location = input.value;
    if (location.length < 3) {
        alert('Please enter a valid location');
        return;
    }
    try {
        const response = yield fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&lang=pt_br&units=metric`);
        const data = yield response.json();
        const weatherData = {
            city: data.name,
            temperature: Math.round(data.main.temp),
            icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
        };
        weatherInfos.innerHTML = `
        <div id="weatherData">
            <h2>${weatherData.city}</h2>
            <span>${weatherData.temperature}ºC</span>
        </div>
        <img src="${weatherData.icon}">
        `;
    }
    catch (error) {
        weatherInfos.innerHTML = `
        <div id="weatherData">
            <h2>Location not found</h2>
        </div>
        `;
    }
}));
