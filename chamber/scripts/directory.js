const url = "data/members.json";
const cards = document.querySelector("#member-container");

async function getMemberData() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            
            displayMembers(data.members); 
        } else {
            console.error("Failed to fetch data");
        }
    } catch (error) {
        console.error("Error fetching member data:", error);
    }
}

const displayMembers = (members) => {
    // Clear the container before rendering to avoid duplicates
    cards.innerHTML = "";

    members.forEach((member) => {
        let card = document.createElement("section");
        card.classList.add("member-card"); // Helpful for CSS styling
        
        let image = document.createElement("img");
        // Ensure path is correct based on your folder structure
        image.setAttribute("src", `images/${member.image}`); 
        image.setAttribute("alt", `${member.name} logo`);
        image.setAttribute("loading", "lazy");
        image.setAttribute("width", "200");
        image.setAttribute("height", "150");

        let name = document.createElement("h3");
        let address = document.createElement("p");
        let phone = document.createElement("p");
        let website = document.createElement("a");
        let level = document.createElement("p");

        name.textContent = member.name;
        address.textContent = member.address;
        phone.textContent = member.phone;
        website.textContent = "Visit Website";
        website.setAttribute("href", member.website);
        website.setAttribute("target", "_blank");
        
        // Convert the number (3, 2, 1) to a readable string
        const levelNames = { 3: "Gold", 2: "Silver", 1: "Member" };
        level.innerHTML = `Membership Level: <strong>${levelNames[member.membershipLevel]}</strong>`;

        card.appendChild(image);
        card.appendChild(name);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(website);
        card.appendChild(level);

        cards.appendChild(card);
    });
}

// --- Grid/List Toggle Logic ---
const gridbutton = document.querySelector("#grid-view");
const listbutton = document.querySelector("#list-view");

if (gridbutton && listbutton) {
    gridbutton.addEventListener("click", () => {
        cards.classList.add("grid");
        cards.classList.remove("list");
    });

    listbutton.addEventListener("click", () => {
        cards.classList.add("list");
        cards.classList.remove("grid");
    });
}

getMemberData();