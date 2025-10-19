const apiKey = "4184f09fb80de96d3bdffffa10515377";
const city = localStorage.getItem("selectedCity");

document.getElementById("cityTitle").textContent = `Perkiraan Cuaca: ${city}`;

window.onload = () => {
  fetchForecast(city);
  updateDateTime();
  setInterval(updateDateTime, 1000);
  applySavedTheme();
};

async function fetchForecast(city) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=id`;
  const container = document.getElementById("forecastContainer");

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Gagal memuat data");
    const data = await response.json();

    const forecastList = data.list.slice(0, 8); // 24 jam ke depan
    container.innerHTML = "";

    forecastList.forEach(item => {
      const card = document.createElement("div");
      card.className = "forecast-card";

      const time = new Date(item.dt * 1000).toLocaleTimeString('id-ID', {
        hour: '2-digit', minute: '2-digit'
      });
      const icon = `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;

      card.innerHTML = `
        <h3>${time}</h3>
        <img src="${icon}" alt="icon cuaca">
        <p>🌡️ ${item.main.temp} °C</p>
        <p>${item.weather[0].description}</p>
        <p>💧 ${item.main.humidity}%</p>
      `;
      container.appendChild(card);
    });
  } catch (e) {
    container.innerHTML = "<p>Gagal memuat prakiraan cuaca.</p>";
  }
}

// 🕒 Update waktu
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
