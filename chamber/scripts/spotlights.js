const memberURL = "data/members.json";
const spotlightDiv = document.querySelector('#member-container');

async function getMembers() {
    const response = await fetch(memberURL);
    const data = await response.json();
    displaySpotlights(data.members);
}

function displaySpotlights(members) {
    // 1. Filter: Only Gold (level 3) or Silver (level 2)
    const eligible = members.filter(m => m.membershipLevel === 'Gold' || m.membershipLevel === 'Silver');

    // 2. Randomize: Shuffle the filtered list
    const shuffled = eligible.sort(() => 0.5 - Math.random());

    // 3. Pick 2 or 3
    const selected = shuffled.slice(0, 3);

    // 4. Create and append the cards
    selected.forEach(member => {
        const card = document.createElement('section');
        card.className = "spotlight-card";
        
        card.innerHTML = `
            <h3>${member.name}</h3>
            <img src="${member.image}" alt="${member.name} logo" loading="lazy">
            <p>${member.phone}</p>
            <p>${member.address}</p>
            <p><a href="${member.website}" target="_blank">Website</a></p>
            <p>Level: <strong>${member.membershipLevel}</strong></p>
        `;
        spotlightDiv.appendChild(card);
    });
}

getMembers();