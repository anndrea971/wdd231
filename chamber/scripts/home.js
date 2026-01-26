// --- CONFIGURATION ---
const key = 'YOUR_API_KEY'; // Replace with your real key
const lat = '-33.5106'; // Maipú, Chile Latitude
const lon = '-70.7572'; // Maipú, Chile Longitude

const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${key}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${key}`;
const memberUrl = "data/members.json";

// --- WEATHER FUNCTIONALITY ---
async function fetchWeather() {
    try {
        const response = await fetch(weatherUrl);
        const data = await response.json();
        
        document.querySelector('#current-temp').innerHTML = `${Math.round(data.main.temp)}&deg;F`;
        const iconSrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
        const desc = data.weather[0].description;
        
        const weatherIcon = document.querySelector('#weather-icon');
        weatherIcon.setAttribute('src', iconSrc);
        weatherIcon.setAttribute('alt', desc);
        document.querySelector('figcaption').textContent = desc.toUpperCase();
    } catch (error) {
        console.error("Weather error:", error);
    }
}

async function fetchForecast() {
    try {
        const response = await fetch(forecastUrl);
        const data = await response.json();
        const forecastContainer = document.querySelector('#forecast');
        
        // Filter for 12:00 PM readings for the next 3 days
        const dailyData = data.list.filter(item => item.dt_txt.includes('12:00:00')).slice(0, 3);
        
        forecastContainer.innerHTML = ""; // Clear loader
        dailyData.forEach(day => {
            const date = new Date(day.dt * 1000);
            const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
            const div = document.createElement('div');
            div.innerHTML = `${dayName}: <strong>${Math.round(day.main.temp)}&deg;F</strong>`;
            forecastContainer.appendChild(div);
        });
    } catch (error) {
        console.error("Forecast error:", error);
    }
}

// --- SPOTLIGHT FUNCTIONALITY ---
async function fetchSpotlights() {
    try {
        const response = await fetch(memberUrl);
        const data = await response.json();
        displaySpotlights(data.members);
    } catch (error) {
        console.error("Spotlight error:", error);
    }
}

function displaySpotlights(members) {
    const container = document.querySelector('#member-container');
    // Filter for Gold (3) or Silver (2)
    const eligible = members.filter(m => m.membershipLevel === 3 || m.membershipLevel === 2);
    // Shuffle and pick 3
    const shuffled = eligible.sort(() => 0.5 - Math.random()).slice(0, 3);

    container.innerHTML = "";
    shuffled.forEach(member => {
        const card = document.createElement('section');
        card.className = "spotlight-card";
        card.innerHTML = `
            <h3>${member.name}</h3>
            <img src="images/${member.image}" alt="${member.name}" loading="lazy">
            <p>${member.phone}</p>
            <p><a href="${member.website}" target="_blank">Visit Website</a></p>
            <p>Level: <strong>${member.membershipLevel === 3 ? 'Gold' : 'Silver'}</strong></p>
        `;
        container.appendChild(card);
    });
}

// Initialize everything
fetchWeather();
fetchForecast();
fetchSpotlights();