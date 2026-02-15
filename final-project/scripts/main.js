// Exporting functions demonstrates ES Module usage
export function setDates() {
    const yearSpan = document.getElementById('year');
    const lastModSpan = document.getElementById('lastModified');
    
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    if (lastModSpan) {
        lastModSpan.textContent = document.lastModified;
    }
}

export function toggleMenu() {
    const hamburger = document.getElementById('hamburger');
    const navList = document.getElementById('nav-list');
    
    if (hamburger && navList) {
        hamburger.addEventListener('click', () => {
            navList.classList.toggle('open');
            hamburger.classList.toggle('open');
        });
    }
}

// Initialize global scripts
document.addEventListener('DOMContentLoaded', () => {
    setDates();
    toggleMenu();
});

// Toggle mobile menu
const menuBtn = document.getElementById('menu-btn');
const closeBtn = document.getElementById('close-btn');
const navBar = document.getElementById('nav-bar');
const overlay = document.getElementById('overlay');

// Open Menu
menuBtn.addEventListener('click', () => {
    navBar.classList.add('open');
    overlay.classList.add('open');
});

// Close Menu
const closeMenu = () => {
    navBar.classList.remove('open');
    overlay.classList.remove('open');
};

closeBtn.addEventListener('click', closeMenu);
overlay.addEventListener('click', closeMenu);