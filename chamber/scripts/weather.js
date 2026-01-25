const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');
const forecastContainer = document.querySelector('#forecast');

// API URL - Replace with your key and coordinates
const key = 'YOUR_API_KEY_HERE';
const lat = '16.7666'; 
const lon = '-3.0026';

const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${key}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${key}`;

async function apiFetch() {
    try {
        // Fetch Current Weather
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            displayResults(data);
        } else {
            throw Error(await response.text());
        }

        // Fetch Forecast
        const fResponse = await fetch(forecastUrl);
        if (fResponse.ok) {
            const fData = await fResponse.json();
            displayForecast(fData);
        }
    } catch (error) {
        console.log(error);
    }
}

function displayResults(data) {
    currentTemp.innerHTML = `${Math.round(data.main.temp)}&deg;F`;
    const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    let desc = data.weather[0].description;
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);
    captionDesc.textContent = desc.toUpperCase();
}

function displayForecast(data) {
    // Filter the list to get one reading per day (around 12:00 PM)
    const dailyForecast = data.list.filter(item => item.dt_txt.includes('12:00:00')).slice(0, 3);

    forecastContainer.innerHTML = ""; // Clear loader text

    dailyForecast.forEach(day => {
        const date = new Date(day.dt * 1000);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
        
        const daySection = document.createElement('div');
        daySection.innerHTML = `<strong>${dayName}</strong>: ${Math.round(day.main.temp)}&deg;F`;
        forecastContainer.appendChild(daySection);
    });
}

apiFetch();