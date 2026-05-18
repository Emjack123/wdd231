// Paths & Elements
const dataUrl = 'data/members.json';
const display = document.querySelector('#directory-article');
const gridBtn = document.querySelector('#gridBtn');
const listBtn = document.querySelector('#listBtn');

// 1. Asynchronously Fetch Data
async function getMemberData() {
  try {
    const response = await fetch(dataUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    displayMembers(data);
  } catch (error) {
    console.error("Error fetching or parsing the member data:", error);
    display.innerHTML = `<p class="error">Unable to load directory information at this time.</p>`;
  }
}

// 2. Render Cards Dynamically
function displayMembers(members) {
  display.innerHTML = ""; // Clear existing fallback text

  members.forEach((member) => {
    // Create card element wrapper
    const card = document.createElement('section');
    card.classList.add('member-card');

    // Convert membership level integer to clear text
    const membershipTypes = { 1: 'Member', 2: 'Silver', 3: 'Gold' };
    const levelText = membershipTypes[member.membershipLevel] || 'General';

    // Inject templated markup
    card.innerHTML = `
      <img src="images/${member.image}" alt="Logo of ${member.name}" loading="lazy" width="150" height="150">
      <h3>${member.name}</h3>
      <p class="tagline"><em>"${member.tagline}"</em></p>
      <hr>
      <p class="address">${member.address}</p>
      <p class="phone">${member.phone}</p>
      <p class="url"><a href="${member.website}" target="_blank" rel="noopener">${member.website.replace('https://', '')}</a></p>
      <span class="membership-badge tier-${member.membershipLevel}">${levelText} Tier</span>
    `;
    
    display.appendChild(card);
  });
}

// 3. Handling  Grid and List View Toggle
gridBtn.addEventListener('click', () => {
  display.classList.add('grid-layout');
  display.classList.remove('list-layout');
  gridBtn.classList.add('active');
  listBtn.classList.remove('active');
});

listBtn.addEventListener('click', () => {
  display.classList.add('list-layout');
  display.classList.remove('grid-layout');
  listBtn.classList.add('active');
  gridBtn.classList.remove('active');
});


// Run on page load
getMemberData();