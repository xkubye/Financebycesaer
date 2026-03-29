// ==============================
// GLOBAL THEME SYSTEM
// ==============================

// APPLY THEME
function applyTheme() {
  const savedTheme = localStorage.getItem("theme");
  const isDark = localStorage.getItem("dark") === "true";

  // RESET
  document.body.classList.remove("dark");
  document.body.style.background = "";

  // 🔥 PRIORITAS: DARK MODE
  if (isDark) {
    document.body.classList.add("dark");
    return; // ⛔ STOP supaya tidak kena warna biru
  }

  // APPLY THEME (kalau tidak dark)
  if (savedTheme === "blue1") {
    document.body.style.background =
      "linear-gradient(135deg,#7b61ff,#9c7bff)";
  }

  if (savedTheme === "blue2") {
    document.body.style.background =
      "linear-gradient(135deg,#4facfe,#00f2fe)";
  }
}

// ==============================
// SET THEME (dipanggil dari settings)
// ==============================
function setTheme(theme) {
  localStorage.setItem("theme", theme);
  applyTheme();
}

// ==============================
// TOGGLE DARK MODE
// ==============================
function toggleDarkMode() {
  const isDark = document.body.classList.toggle("dark");
  localStorage.setItem("dark", isDark);
}

// ==============================
// RESET THEME
// ==============================
function resetTheme() {
  localStorage.removeItem("theme");
  localStorage.removeItem("dark");
  applyTheme();
}

// ==============================
// AUTO RUN (penting)
// ==============================
applyTheme();
