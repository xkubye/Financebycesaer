let transactions = JSON.parse(localStorage.getItem("data")) || [];

// FORMAT RUPIAH
function formatRupiah(num) {
  return num.toLocaleString("id-ID");
}

// PROFILE
const upload = document.getElementById("upload");
const profileImg = document.getElementById("profileImg");

upload.addEventListener("change", function() {
  const reader = new FileReader();
  reader.onload = e => {
    profileImg.src = e.target.result;
    localStorage.setItem("profile", e.target.result);
  };
  reader.readAsDataURL(this.files[0]);
});

if (localStorage.getItem("profile")) {
  profileImg.src = localStorage.getItem("profile");
}

// TAMBAH DATA
function addTransaction() {
  const label = document.getElementById("label").value;
  const amount = parseInt(document.getElementById("amount").value);
  const type = document.getElementById("type").value;

  if (!label || !amount) return alert("Isi semua!");

  transactions.push({
    label,
    amount,
    type,
    date: new Date().toLocaleString("id-ID")
  });

  localStorage.setItem("data", JSON.stringify(transactions));
  render();

  label.value = "";
  amount.value = "";
}

// RESET
function resetData() {
  if (confirm("Hapus semua data?")) {
    localStorage.clear();
    location.reload();
  }
}

// RENDER
function render() {
  const history = document.getElementById("history");
  history.innerHTML = "";

  let saldo = 0, income = 0, expense = 0;

  transactions.forEach(t => {
    const li = document.createElement("li");

    li.innerHTML = `
      <b>${t.label}</b><br>
      ${t.date}<br>
      ${t.type === "income" ? "+" : "-"}Rp ${formatRupiah(t.amount)}
    `;

    history.appendChild(li);

    if (t.type === "income") {
      saldo += t.amount;
      income += t.amount;
    } else {
      saldo -= t.amount;
      expense += t.amount;
    }
  });

  saldoEl = document.getElementById("saldo");
  incomeEl = document.getElementById("income");
  expenseEl = document.getElementById("expense");

  saldoEl.innerText = "Rp " + formatRupiah(saldo);
  incomeEl.innerText = formatRupiah(income);
  expenseEl.innerText = formatRupiah(expense);
}

// LOAD NAME
const usernameEl = document.getElementById("username");

const savedName = localStorage.getItem("username");
if (savedName) {
  usernameEl.innerText = savedName;
}

// EDIT NAME
function editName() {
  const newName = prompt("Masukkan nama baru:");
  if (newName) {
    usernameEl.innerText = newName;
    localStorage.setItem("username", newName);
  }
}

render();

