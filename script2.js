let data = JSON.parse(localStorage.getItem("data")) || [];
let filter = "all";

// FORMAT
function formatRupiah(num) {
  return num.toLocaleString("id-ID");
}

// RENDER
function render() {
  const list = document.getElementById("list");
  list.innerHTML = "";

  let keyword = document.getElementById("searchInput").value.toLowerCase();

  let filtered = data.filter(t => {
    let matchSearch = t.label.toLowerCase().includes(keyword);

    let date = new Date(t.date);
    let now = new Date();

    let matchFilter = true;

    if (filter === "month") {
      matchFilter = date.getMonth() === now.getMonth();
    }

    if (filter === "week") {
      let diff = (now - date) / (1000 * 60 * 60 * 24);
      matchFilter = diff <= 7;
    }

    return matchSearch && matchFilter;
  });

  filtered.reverse().forEach(t => {
    const div = document.createElement("div");
    div.className = "item";

    div.innerHTML = `
      <div class="left">
        <div class="icon">💰</div>
        <div>
          <b>${t.label}</b><br>
          <small>${t.date}</small>
        </div>
      </div>

      <div class="right">
        <b class="${t.type === 'income' ? 'plus' : 'minus'}">
          ${t.type === 'income' ? '+' : '-'}Rp ${formatRupiah(t.amount)}
        </b>
      </div>
    `;

    list.appendChild(div);
  });
}

// FILTER
function setFilter(type) {
  filter = type;
  render();
}

// SEARCH
document.getElementById("searchInput").addEventListener("input", render);

// BACK
function back() {
  window.location.href = "index.html";
}

// DOWNLOAD PDF
function downloadPDF() {
  let text = "Laporan Keuangan:\n\n";

  data.forEach(t => {
    text += `${t.label} - ${t.date} - Rp ${formatRupiah(t.amount)}\n`;
  });

  let blob = new Blob([text], { type: "text/plain" });
  let a = document.createElement("a");

  a.href = URL.createObjectURL(blob);
  a.download = "laporan.txt";
  a.click();
}

render();