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
setInterval(updateDateTime, 1000);
updateDateTime();

// 🌙 Dark mode
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
}

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
}

// 📝 Form kritik
const form = document.getElementById('feedbackForm');
form.addEventListener('submit', e => {
  e.preventDefault();
  document.getElementById('feedbackMsg').textContent = "✅ Terima kasih atas kritik dan saran Anda!";
  form.reset();
});
