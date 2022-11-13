//  import csv-parser
const csv = require("csv-parser");
const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();

const results = [];

fs.createReadStream("input/td.csv")
  .pipe(csv())
  .on("data", (data) => results.push(data))
  .on("end", () => {
    console.log(results);
    addInput();
    closeDatabase();
  });

// open database in memory
let db = new sqlite3.Database(
  "./database/db.sqlite3",
  sqlite3.OPEN_READWRITE,
  (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Connected to the in-memory SQlite database.");
  }
);

// Loop through results array and add to existing table
function addInput() {
  for (let i = 0; i < results.length; i++) {
    db.run(
      `INSERT INTO TdTransactions (date, Description, Withdrawal, Deposit) VALUES (?, ?, ?, ?)`,
      [
        results[i].Date,
        results[i].Description,
        results[i].Debit,
        results[i].Credit,
      ],
      (err) => {
        if (err) {
          return console.error(err.message);
        }
        console.log(results[i].Debit);
      }
    );
  }
}

// close the database connection
function closeDatabase() {
  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Close the database connection.");
  });
}
