fetch("http://localhost:3000/transactions")
  .then((response) => response.json())
  .then((data) => {
    loop(data);
    console.log(data);
    displayTotals(data);
  })
  .catch((err) => console.log(err));

// create a function that loops through data [date, description, withdrawal, depsit] and displays it in a table
const headers = ["Date", "Description", "Withdrawal", "Deposit"];

function loop(data) {
  let table = document.createElement("table");
  let tr = table.insertRow(-1);

  for (let i = 0; i < headers.length; i++) {
    let th = document.createElement("th");
    th.innerHTML = headers[i];
    tr.appendChild(th);
  }

  for (let i = 0; i < data.length; i++) {
    tr = table.insertRow(-1);
    let tabCell = tr.insertCell(-1);
    tabCell.innerHTML = data[i].date;
    tabCell = tr.insertCell(-1);
    tabCell.innerHTML = data[i].Description;
    tabCell = tr.insertCell(-1);
    tabCell.innerHTML = data[i].Withdrawal;
    tabCell = tr.insertCell(-1);
    tabCell.innerHTML = data[i].Deposit;
  }

  let dvTable = document.getElementById("dvTable");
  dvTable.innerHTML = "";
  dvTable.appendChild(table);
}

// create a function that displays the totals of withdrawals and deposits
function displayTotals(data) {
  let totalWithdrawal = 0;
  let totalDeposit = 0;
  for (let i = 0; i < data.length; i++) {
    if (data[i].Withdrawal !== "") {
      totalWithdrawal += data[i].Withdrawal;
      console.log(data[i].Withdrawal);
    }
    if (data[i].Deposit !== "") {
      totalDeposit += data[i].Deposit;
    }
  }
  console.log(typeof totalWithdrawal, totalWithdrawal);
  // round to 2 decimal places
  totalWithdrawal = totalWithdrawal.toFixed(2);
  totalDeposit = totalDeposit.toFixed(2);
  // display totals
  let dvTotals = document.getElementById("dvTotals");
  dvTotals.innerHTML = "";
  dvTotals.innerHTML = `Withdrawal: ${totalWithdrawal} Deposit: ${totalDeposit}`;
}
