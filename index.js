const apiKey = "4184f09fb80de96d3bdffffa10515377"; // Ganti API key kamu
const popularCities = ["Jakarta", "New York", "Tokyo", "London", "Bejing", "Praha", "Barcelona", "Seoul", "Kamboja", "Bangkok", "Madrid"];

window.onload = () => {
  displayPopularCities();
  updateDateTime();
  setInterval(updateDateTime, 1000);
  applySavedTheme();
};

async function displayPopularCities() {
  const container = document.getElementById("cityContainer");
  container.innerHTML = "";

  for (let city of popularCities) {
    const weatherData = await fetchWeather(city);
    if (weatherData) {
      container.appendChild(createCityCard(weatherData));
    }
  }
}

async function searchCity() {
  const city = document.getElementById('cityInput').value;
  if (city === "") {
    alert("Masukkan nama kota terlebih dahulu!");
    return;
  }

  const container = document.getElementById("cityContainer");
  container.innerHTML = "";

  const weatherData = await fetchWeather(city);
  if (weatherData) {
    container.appendChild(createCityCard(weatherData));
  } else {
    alert("Kota tidak ditemukan.");
  }
}

async function fetchWeather(city) {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=id`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("Error");
    return await response.json();
  } catch (e) {
    return null;
  }
}

function createCityCard(data) {
  const card = document.createElement("div");
  card.className = "city-card";
  const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  card.innerHTML = `
    <h2>${data.name}</h2>
    <img src="${icon}" alt="icon cuaca">
    <p>🌡️ ${data.main.temp} °C</p>
    <p>${data.weather[0].description}</p>
    <button onclick="goToDetail('${data.name}')">Detail Cuaca</button>
  `;
  return card;
}

function goToDetail(city) {
  localStorage.setItem("selectedCity", city);
  window.location.href = "detail.html";
}

// 🕒 Tanggal dan waktu
function updateDateTime() {
  const now = new Date();
  const options = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit' 
  };
  document.getElementById('dateTime').textContent = now.toLocaleDateString('id-ID', options);
}

// 🌓 Dark mode
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
  const isDark = document.body.classList.contains("dark-mode");
  localStorage.setItem("theme", isDark ? "dark" : "light");
}

function applySavedTheme() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
  }
}
