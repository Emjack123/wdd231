import { itemsOfInterest } from '../data/discover.mjs';

document.addEventListener("DOMContentLoaded", () => {
    handleVisitorMessage();
    renderDiscoverCards();
});

// --- visitor message logic using localStorage ---
function handleVisitorMessage() {
    const messageElement = document.getElementById("message-text");
    const lastVisit = localStorage.getItem("lastChamberVisit");
    const currentTimestamp = Date.now(); // Milliseconds since epoch

    // Always update localStorage with the current visit time for the next comparison
    localStorage.setItem("lastChamberVisit", currentTimestamp);

    if (!lastVisit) {
        messageElement.textContent = "Welcome! Let us know if you have any questions.";
        return;
    }

    // Calculate time difference
    const timeDifferenceMs = currentTimestamp - parseInt(lastVisit, 10);
    const msInADay = 24 * 60 * 60 * 1000;
    const daysDifference = Math.floor(timeDifferenceMs / msInADay);

    if (timeDifferenceMs < msInADay) {
        messageElement.textContent = "Back so soon! Awesome!";
    } else {
        if (daysDifference === 1) {
            messageElement.textContent = "You last visited 1 day ago.";
        } else {
            messageElement.textContent = `You last visited ${daysDifference} days ago.`;
        }
    }
}

// --- dynamic grid generation ---
function renderDiscoverCards() {
    const gridContainer = document.getElementById("discover-grid");
    gridContainer.innerHTML = ""; // Clear existing fallback text

    itemsOfInterest.forEach((item, index) => {
        const card = document.createElement("section");
        card.classList.add("discover-card");
        
        // Explicitly map each card to a named grid area
        card.style.gridArea = `cardArea${index}`;

        card.innerHTML = `
            <h2>${item.name}</h2>
            <figure class="gallery-figure">
                <img src="${item.image}" alt="${item.name}" width="300" height="200" loading="lazy">
            </figure>
            <address>${item.address}</address>
            <p>${item.description}</p>
            <button class="learn-more-btn">Learn More</button>
        `;
        
        gridContainer.appendChild(card);
    });
}