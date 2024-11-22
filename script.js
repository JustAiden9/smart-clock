// Update time
function updateTime() {
  const timeElement = document.getElementById('time');
  const dateElement = document.getElementById('date');
  const now = new Date();

  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12 || 12; // Convert to 12-hour format, with 12 replacing 0
  timeElement.textContent = `${hours}:${minutes} ${ampm}`;

  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  dateElement.textContent = now.toLocaleDateString('en-US', options);
}

// Fetch weather data from Open-Meteo
async function updateWeather() {
  const weatherElement = document.getElementById('weather');

  const latitude = 42.1539; // Barrington, IL
  const longitude = -88.1362;

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    // Extract current temperature and weather description
    const temp = data.current_weather.temperature;
    const condition = data.current_weather.weathercode;

    // Convert weather code to a description (basic mapping)
    const descriptions = {
      0: "Clear sky",
      1: "Mainly clear",
      2: "Partly cloudy",
      3: "Overcast",
      45: "Fog",
      48: "Depositing rime fog",
      51: "Drizzle",
      53: "Moderate drizzle",
      55: "Dense drizzle",
      61: "Rain",
      63: "Moderate rain",
      65: "Heavy rain",
      71: "Snowfall",
      73: "Moderate snowfall",
      75: "Heavy snowfall",
      95: "Thunderstorm",
      99: "Thunderstorm with hail"
    };

    weatherElement.textContent = `${temp}°C, ${descriptions[condition] || "Unknown"}`;
  } catch (error) {
    weatherElement.textContent = 'Unable to load weather.';
    console.error(error);
  }
}

// Initialize the clock and weather
function initializeClock() {
  updateTime();
  updateWeather();
  setInterval(updateTime, 60000); // Update time every minute
}

initializeClock();
