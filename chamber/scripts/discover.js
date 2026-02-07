import { places } from "../data/places.mjs";

const container = document.getElementById("card-container");

// Create 8 cards based on the JSON-like object
places.forEach((item) => {
  const card = document.createElement("div");
  card.className = "card";

  card.innerHTML = `
                <h2>${item.name}</h2>
                <figure>
                    <img src="${item.photo_url}" alt="${item.name}" loading="lazy">
                </figure>
                <p>${item.description}</p>
                <address>${item.address}</address>
                <button>Learn More</button>
            `;

  container.appendChild(card);
});

const messageEl = document.getElementById("visit-message");

// get last visit from localStorage
const lastVisit = localStorage.getItem("lastVisit");

// get current time
const now = Date.now();

if (!lastVisit) {
  // FIRST VISIT
  messageEl.textContent = "Welcome! Let us know if you have any questions.";
} else {
  const timeDiff = now - Number(lastVisit);
  const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

  if (daysDiff < 1) {
    messageEl.textContent = "Back so soon! Awesome!";
  } else if (daysDiff === 1) {
    messageEl.textContent = "You last visited 1 day ago.";
  } else {
    messageEl.textContent = `You last visited ${daysDiff} days ago.`;
  }
}

// save current visit time
localStorage.setItem("lastVisit", now);