const form = document.querySelector('#formSection > form');
const input = document.querySelector('#location') as HTMLInputElement;
const weatherInfos = document.querySelector('#weatherSection');
const apiKey = '' // Add your OpenWeatherMap API key here

form?.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!input || !weatherInfos) {
        return
    }

    const location = input.value;

    if (location.length < 3) {
        alert('Please enter a valid location');
        return;
    }

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&lang=pt_br&units=metric`);
        const data = await response.json();
    
        const weatherData = {
            city: data.name,
            temperature: Math.round(data.main.temp),
            icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
        }
    
        weatherInfos.innerHTML = `
        <div id="weatherData">
            <h2>${weatherData.city}</h2>
            <span>${weatherData.temperature}ºC</span>
        </div>
        <img src="${weatherData.icon}">
        `;    
    } catch (error) {
        weatherInfos.innerHTML = `
        <div id="weatherData">
            <h2>Location not found</h2>
        </div>
        `;
    }
})
