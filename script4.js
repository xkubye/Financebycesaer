// BACK
function back() {
  window.location.href = "index.html";
}

// POPUP
function showPopup(text) {
  const popup = document.getElementById("popup");
  popup.innerHTML = `
    <p>${text}</p><br>
    <button onclick="closePopup()">Close</button>
  `;
  popup.classList.remove("hidden");
}

function closePopup() {
  document.getElementById("popup").classList.add("hidden");
}

// ABOUT APP
function showAboutApp() {
  showPopup("App ini digunakan untuk mencatat pemasukan dan pengeluaran harian secara offline.");
}

// ABOUT DEV
function showDeveloper() {
  showPopup("Dibuat oleh Caesar Kubilai Khan 🚀");
}

function setTheme(type) {
  window.setTheme(type);
}

function toggleDarkMode() {
  window.toggleDarkMode();
}

function resetSettings() {
  if (confirm("Reset semua pengaturan?")) {
    window.resetTheme();
    location.reload();
  }
}
