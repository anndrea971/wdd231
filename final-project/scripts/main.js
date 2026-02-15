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