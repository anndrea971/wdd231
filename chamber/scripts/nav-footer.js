// javaScript for Navigation Toggling
const navBar = document.querySelector("#nav-bar");
const menuBtn = document.querySelector("#menu-btn");
const closeBtn = document.querySelector("#close-btn");
const overLay = document.querySelector("#overlay");

function openMenu() {
  navBar.classList.add("show");
  overLay.classList.add("active");
}

function closeMenu() {
  navBar.classList.remove("show");
  overLay.classList.remove("active");
}
menuBtn.addEventListener("click", openMenu);
closeBtn.addEventListener("click", closeMenu);

// JavaScript For the Grid Icon
const gridIcon = document.querySelector("#grid-btn");
const icon = document.querySelector("#icon");
const mainContent = document.querySelector("#list");

gridIcon.addEventListener("click", () => {
  let isGrid = icon.src.includes("grid-view");

  icon.src = isGrid ? "images/list-view.svg" : "images/grid-view.svg";
  icon.alt = isGrid ? "List View" : "Grid View";

  mainContent.classList.toggle("list", isGrid);
});

// javaScript For The Copyright Year and Last Modification
const yearElement = document.querySelector("#year-element");
const lastModification = document.querySelector("#last-modified");

const date = new Date();
yearElement.textContent = `\u00A9 ${date.getFullYear()}`;
lastModification.textContent = `Last Modification: ${document.lastModified}`;