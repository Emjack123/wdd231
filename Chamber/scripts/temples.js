// get current year
const currentYear = new Date().getFullYear();
// inject into the element
document.getElementById("year").textContent = currentYear;
// select the element and update it text
document.getElementById("lastModified").textContent = document.lastModified;

const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

hamButton.addEventListener('click', () => {
	navigation.classList.toggle('open');
	hamButton.classList.toggle('open');
});




// --- Filtering Event Listeners ---

document.querySelector("#old").addEventListener("click", () => {
  const oldTemples = temples.filter(t => new Date(t.dedicated).getFullYear() < 1900);
  displayTemples(oldTemples);
});

document.querySelector("#new").addEventListener("click", () => {
  const newTemples = temples.filter(t => new Date(t.dedicated).getFullYear() > 2000);
  displayTemples(newTemples);
});

document.querySelector("#large").addEventListener("click", () => {
  const largeTemples = temples.filter(t => t.area > 90000);
  displayTemples(largeTemples);
});

document.querySelector("#small").addEventListener("click", () => {
  const smallTemples = temples.filter(t => t.area < 90000);
  displayTemples(smallTemples);
});

document.querySelector("#all").addEventListener("click", () => {
  displayTemples(temples);
});


