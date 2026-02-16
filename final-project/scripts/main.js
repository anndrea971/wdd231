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

export function setupMenu() {
    const menuBtn = document.getElementById('menu-btn');
    const closeBtn = document.getElementById('close-btn');
    const navBar = document.getElementById('nav-bar');
    const overlay = document.getElementById('overlay');

    // Función interna para cerrar
    const closeMenu = () => {
        navBar?.classList.remove('open');
        overlay?.classList.remove('open');
    };

    // Abrir menú
    menuBtn?.addEventListener('click', () => {
        navBar?.classList.add('open');
        overlay?.classList.add('open');
    });

    // Cerrar con botón X
    closeBtn?.addEventListener('click', closeMenu);

    // Cerrar con overlay (solo si existe en el HTML)
    overlay?.addEventListener('click', closeMenu);
}

// Initialize global script
document.addEventListener('DOMContentLoaded', () => {
    setDates();
    setupMenu();
});
