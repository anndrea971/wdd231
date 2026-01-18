const url = "data/members.json";
const cards = document.querySelector("#member-container");

async function getMemberData() {
    const response = await fetch(url);
    const data = await response.json();
    displayMembers(data);
}

const displayMembers = (members) => {
    members.forEach((member) => {
        let card = document.createElement("section");
        
        // --- ADDED: Image Logic ---
        let image = document.createElement("img");
        image.setAttribute("src", `images/${member.image}`); // Points to chamber/images/
        image.setAttribute("alt", `${member.name} logo`);
        image.setAttribute("loading", "lazy");
        image.setAttribute("width", "200");
        image.setAttribute("height", "150");

        let name = document.createElement("h3");
        let address = document.createElement("p");
        let phone = document.createElement("p");
        let website = document.createElement("a");

        name.textContent = member.name;
        address.textContent = member.address;
        phone.textContent = member.phone;
        website.textContent = "Visit Website";
        website.setAttribute("href", member.website);
        website.setAttribute("target", "_blank");

        // --- ADDED: Append image to the card ---
        card.appendChild(image);
        card.appendChild(name);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(website);

        cards.appendChild(card);
    });
}

// --- ADDED: Grid/List Toggle Logic ---
// These IDs must match the buttons in your directory.html
const gridbutton = document.querySelector("#grid-view");
const listbutton = document.querySelector("#list-view");

gridbutton.addEventListener("click", () => {
    cards.classList.add("grid");
    cards.classList.remove("list");
});

listbutton.addEventListener("click", () => {
    cards.classList.add("list");
    cards.classList.remove("grid");
});

getMemberData();