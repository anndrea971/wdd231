const year = document.querySelector("#currentyear");
year.innerHTML = new Date().getFullYear();

const lastMod = document.querySelector("#lastModified");
lastMod.innerHTML = `Last Modification: ${document.lastModified}`;