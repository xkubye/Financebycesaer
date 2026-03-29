let data = JSON.parse(localStorage.getItem("data")) || [];

// FORMAT
function formatRupiah(num) {
  return num.toLocaleString("id-ID");
}

// RENDER LIST
function render() {
  const list = document.getElementById("list");
  list.innerHTML = "";

  data.slice().reverse().forEach(t => {
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

      <div class="right ${t.type === 'income' ? 'plus' : 'minus'}">
        ${t.type === 'income' ? '+' : '-'}Rp ${formatRupiah(t.amount)}
      </div>
    `;

    list.appendChild(div);
  });
}

// BACK
function back() {
  window.location.href = "index.html";
}

// PDF DOWNLOAD
async function downloadPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFont("Helvetica");
  doc.setFontSize(14);

  doc.text("Laporan Keuangan", 10, 10);

  let y = 20;

  data.forEach(t => {
    doc.text(`${t.label} | ${t.date}`, 10, y);
    y += 6;
    doc.text(
      `${t.type === "income" ? "+" : "-"}Rp ${formatRupiah(t.amount)}`,
      10,
      y
    );
    y += 10;
  });

  doc.save("laporan-keuangan.pdf");
}

render();