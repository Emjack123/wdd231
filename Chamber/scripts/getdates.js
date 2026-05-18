// get current year
const currentYear = new Date().getFullYear();
// inject into the element
document.getElementById("year").textContent = currentYear;
// select the element and update it text
document.getElementById("lastModified").textContent = document.lastModified;