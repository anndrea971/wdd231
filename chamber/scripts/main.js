/* --- CONFIGURATION --- */
const weatherUrl = "https://api.openweathermap.org/data/2.5/weather?lat=-33.51&lon=-70.77&units=metric&appid=0a2d342572fc7a9b609e7bd50e04c020";
const forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=-33.51&lon=-70.77&units=metric&appid=0a2d342572fc7a9b609e7bd50e04c020";
const membersUrl = "data/members.json";

/* --- WEATHER ELEMENTS --- */
const currentTemp = document.querySelector("#current-temp");
const currentDesc = document.querySelector("#weather-desc");
const weatherIcon = document.querySelector("#weather-icon");
const forecastContainer = document.querySelector("#forecast");

/* --- MEMBER ELEMENTS --- */
const spotlightContainer = document.querySelector("#member-container");

// 1. FETCH CURRENT WEATHER
async function getCurrentWeather() {
    try {
        const response = await fetch(weatherUrl);
        if (response.ok) {
            const data = await response.json();
            displayCurrentWeather(data);
        }
    } catch (error) {
        console.error("Weather Error:", error);
    }
}

function displayCurrentWeather(data) {
    if (currentTemp) currentTemp.innerHTML = `${Math.round(data.main.temp)}&deg;C`;
    if (currentDesc) currentDesc.textContent = data.weather[0].description;
    if (weatherIcon) {
        const iconSrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        weatherIcon.setAttribute("src", iconSrc);
        weatherIcon.setAttribute("alt", data.weather[0].description);
    }
}

// 2. FETCH 3-DAY FORECAST
async function getForecast() {
    try {
        const response = await fetch(forecastUrl);
        if (response.ok) {
            const data = await response.json();
            displayForecast(data);
        }
    } catch (error) {
        console.error("Forecast Error:", error);
    }
}

function displayForecast(data) {
    if (!forecastContainer) return;
    forecastContainer.innerHTML = "";

    // Filter to get one reading per day (around noon)
    const dailyData = data.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 3);

    dailyData.forEach(day => {
        const date = new Date(day.dt * 1000);
        const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
        
        const p = document.createElement("p");
        p.innerHTML = `${dayName}: <strong>${Math.round(day.main.temp)}&deg;C</strong>`;
        forecastContainer.appendChild(p);
    });
}

// 3. FETCH & DISPLAY MEMBER SPOTLIGHTS
async function getSpotlights() {
    try {
        const response = await fetch(membersUrl);
        if (response.ok) {
            const data = await response.json();
            // Using 'members' to match your directory script
            displaySpotlights(data.members); 
        }
    } catch (error) {
        console.error("Spotlight Error:", error);
    }
}

function displaySpotlights(members) {
    if (!spotlightContainer) return;
    
    // Filter for Gold (3) and Silver (2) members only
    const eligibleMembers = members.filter(m => m.membershipLevel === 2 || m.membershipLevel === 3);

    // Shuffle and pick 2 or 3 random members
    const shuffled = eligibleMembers.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);

    spotlightContainer.innerHTML = "";

    selected.forEach(member => {
        const card = document.createElement("section");
        card.className = "member-card"; // Make sure you have CSS for this class

        card.innerHTML = `
            <h4>${member.name}</h4>
            <img src="images/${member.image}" alt="${member.name} logo" loading="lazy" width="100">
            <p>${member.tagline || 'Local Business Partner'}</p>
            <hr>
            <p>Phone: ${member.phone}</p>
            <p><a href="${member.website}" target="_blank">Visit Website</a></p>
            <p>Level: <strong>${member.membershipLevel === 3 ? 'Gold' : 'Silver'}</strong></p>
        `;
        spotlightContainer.appendChild(card);
    });
}

/* --- FOOTER LOGIC --- */
const yearSpan = document.querySelector("#currentyear");
const lastModSpan = document.querySelector("#last-modified");

if (yearSpan) yearSpan.textContent = new Date().getFullYear();
if (lastModSpan) lastModSpan.textContent = `Last Modified: ${document.lastModified}`;

/* --- INITIALIZE --- */
getCurrentWeather();
getForecast();
getSpotlights();