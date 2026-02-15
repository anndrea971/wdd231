// Import specific functionality if needed, or just run module code
// Site requires: Fetch, Async/Await, Try/Catch, Array Methods, DOM Manipulation

const container = document.getElementById('milestone-container');
const modal = document.getElementById('milestone-modal');
const closeModalBtn = document.getElementById('close-modal');
const saveFavBtn = document.getElementById('save-favorite');
const favMessage = document.getElementById('fav-message');
let allMilestones = []; // Store fetched data
let currentItem = null; // Track item in modal

// 1. Fetch Data (Async/Await + Try/Catch)
async function getMilestones() {
    try {
        const response = await fetch('data/milestones.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        allMilestones = data;
        displayMilestones(allMilestones);
    } catch (error) {
        console.error('Error fetching data:', error);
        container.innerHTML = `<p>Sorry, we could not load the milestones at this time.</p>`;
    }
}

// 2. Dynamic Content Generation (DOM Manipulation + Template Literals)
function displayMilestones(items) {
    container.innerHTML = ''; // Clear existing
    
    // Array Method: forEach
    items.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('card');
        
        // Template Literal for HTML construction
        card.innerHTML = `
            <h3>${item.skill}</h3>
            <p><strong>Age:</strong> ${item.age_range}</p>
            <p><strong>Category:</strong> ${item.category}</p>
            <button class="details-btn" data-id="${item.id}">View Details</button>
        `;
        
        container.appendChild(card);
    });

    // Add event listeners to new buttons
    document.querySelectorAll('.details-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.getAttribute('data-id'));
            openModal(id);
        });
    });
}

// 3. Modal Logic
function openModal(id) {
    // Array Method: find
    const item = allMilestones.find(m => m.id === id);
    currentItem = item; // Store for local storage usage

    if (item) {
        document.getElementById('modal-title').textContent = item.skill;
        document.getElementById('modal-age').textContent = item.age_range;
        document.getElementById('modal-category').textContent = item.category;
        document.getElementById('modal-desc').textContent = item.description;
        favMessage.textContent = ""; // Clear previous message
        
        modal.showModal();
    }
}

closeModalBtn.addEventListener('click', () => {
    modal.close();
});

// 4. Local Storage
saveFavBtn.addEventListener('click', () => {
    if (currentItem) {
        // Get existing favorites or initialize empty array
        let favorites = JSON.parse(localStorage.getItem('slpFavorites')) || [];
        
        // Check if already exists to avoid duplicates
        if (!favorites.some(fav => fav.id === currentItem.id)) {
            favorites.push(currentItem);
            localStorage.setItem('slpFavorites', JSON.stringify(favorites));
            favMessage.textContent = "Saved to Favorites!";
        } else {
            favMessage.textContent = "Already in Favorites.";
        }
    }
});

// 5. Array Methods (Filter)
document.getElementById('filter-all').addEventListener('click', () => {
    displayMilestones(allMilestones);
    updateActiveButton('filter-all');
});

document.getElementById('filter-speech').addEventListener('click', () => {
    // Array Method: filter
    const speechItems = allMilestones.filter(item => item.category === 'Speech');
    displayMilestones(speechItems);
    updateActiveButton('filter-speech');
});

document.getElementById('filter-social').addEventListener('click', () => {
    const socialItems = allMilestones.filter(item => item.category === 'Social');
    displayMilestones(socialItems);
    updateActiveButton('filter-social');
});

function updateActiveButton(id) {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

// Initialize
getMilestones();