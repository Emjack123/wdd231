// Configuration Configuration
const WEATHER_API_KEY = '05606601fe3a8cf22c13222504e8de81';
const CHAMBER_LAT = '5.271239590280662'; // e.g., '40.7128'
const CHAMBER_LON = '7.6594063758256'; // e.g., '-74.0060'

// --- WEATHER SECTION ---
async function fetchWeatherData() {
  try {
    // 1. Fetch Current Weather
    const currentUrl = `//api.openweathermap.org/data/2.5/weather?lat={5.271239590280662}&lon={7.6594063758256}&appid={WEATHER_API_KEY}&units=imperial`;
    const currentResponse = await fetch(currentUrl);
    if (!currentResponse.ok) throw new Error('Current weather fetch failed');
    const currentData = await currentResponse.json();

    // 2. Fetch Forecast Data
    const forecastUrl = `api.openweathermap.org/data/2.5/forecast?lat=${CHAMBER_LAT}&lon=${CHAMBER_LON}&units=imperial&appid=${WEATHER_API_KEY}`;
    const forecastResponse = await fetch(forecastUrl);
    if (!forecastResponse.ok) throw new Error('Forecast fetch failed');
    const forecastData = await forecastResponse.json();
    displayWeather(currentData, forecastData);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    document.getElementById('weather-container').innerHTML = '<p>Weather data temporarily unavailable.</p>';
  }
}

function displayWeather(currentData, forecastData) {
  // Updating Current Weather section
  const currentTemp = Math.round(current.main.temp);
  const description = current.weather[0].description;
  
  document.getElementById('current-temp').textContent = `${currentTemp}°F`;
  document.getElementById('weather-desc').textContent = description.charAt(0).toUpperCase() + description.slice(1);

  // Process 3-Day Forecast
  // Filter the 3-hour chunks to find entries at noon to represent daily highs
  const dailyForecasts = forecastData.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 3);
  const forecastContainer = document.getElementById('forecast-panel');
  forecastContainer.innerHTML = ''; // Clear fallback text

  dailyForecasts.forEach(day => {
    const date = new Date(day.dt * 1000);
    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
    const temp = Math.round(day.main.temp);

    const forecastElement = document.createElement('div');
    forecastElement.className = 'forecast-day';
    forecastElement.innerHTML = `
      <span class="day-label">${dayName}:</span>
      <span class="day-temp">${temp}°F</span>
    `;
    forecastContainer.appendChild(forecastElement);
  });
}

// --- MEMBER SPOTLIGHTS SECTION ---



 // 1. Asynchronously Fetch Data
 const dataUrl = 'data/members.json';

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
const display = document.querySelector('#spotlights-container');

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

// --- INITIALIZE ON PAGE LOAD ---
document.addEventListener('DOMContentLoaded', () => {
  fetchWeatherData();
  getMemberData();
  
});