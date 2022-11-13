const sqlite3 = require("sqlite3").verbose();
// import express
const express = require("express");
const cors = require("cors");

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

// Create an express api which will return the data from the database
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

app.get("/transactions", (req, res) => {
  db.all("SELECT * FROM TdTransactions", [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.send(rows);
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
