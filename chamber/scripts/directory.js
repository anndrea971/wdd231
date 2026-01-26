// javaScript for the Companies Card
const cards = document.querySelector("#member-container"); // Matches the ID in your HTML

// Fetch the json Companies Data using async/await
const url = "data/members.json"; 

const getCompaniesData = async () => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    // Assuming your JSON uses the key 'members'
    displayData(data.members); 
  } catch (error) {
    console.error(error);
  }
};

getCompaniesData();

const displayData = (members) => {
  // Clear container to prevent duplicates
  cards.innerHTML = "";

  members.forEach((member) => {
    const section = document.createElement("section");
    section.classList.add("section"); 

    const img = document.createElement("img");
    img.classList.add("img"); 

    const companyName = document.createElement("p");
    
    // Address is usually hidden in list view in this design pattern
    const firstParagraph = document.createElement("p");
    firstParagraph.classList.add("hidden"); 

    const secondParagraph = document.createElement("p");
    const websiteDetails = document.createElement("p");
    const website = document.createElement("a");
    
    // New: Membership level (keeping your logic but his style)
    const levelParagraph = document.createElement("p");
    const levelNames = { 3: "Gold", 2: "Silver", 1: "Member" };

    // Setting attributes
    img.setAttribute("src", `images/${member.image}`);
    img.setAttribute("alt", `${member.name} logo`);
    img.setAttribute("loading", "lazy");
    img.width = 130;
    img.height = 100;

    companyName.textContent = `${member.name}`;
    firstParagraph.textContent = `${member.address}`;
    secondParagraph.textContent = `${member.phone}`;
    levelParagraph.textContent = `Level: ${levelNames[member.membershipLevel]}`;

    website.textContent = `Click Here For More Details`;
    website.setAttribute("href", `${member.website}`);
    website.setAttribute("target", `_blank`);
    website.setAttribute("rel", "noopener noreferrer");

    // Building the structure
    section.appendChild(img);
    section.appendChild(companyName);
    section.appendChild(firstParagraph);
    section.appendChild(secondParagraph);
    section.appendChild(levelParagraph);
    
    websiteDetails.appendChild(website);
    section.appendChild(websiteDetails);
    
    cards.appendChild(section);
  });
};

// --- Grid/List Toggle Logic ---
const gridbutton = document.querySelector("#grid-btn"); // Updated to match your HTML ID
const listbutton = document.querySelector("#list-view");

if (gridbutton) {
    gridbutton.addEventListener("click", () => {
        cards.classList.add("grid");
        cards.classList.remove("list");
    });
}