const sqlite3 = require("sqlite3").verbose();

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

// Create a table
db.run(
  ` CREATE TABLE IF NOT EXISTS "TdTransactions" (
	"id"	INTEGER NOT NULL UNIQUE,
	"date"	TEXT NOT NULL,
	"Description"	INTEGER NOT NULL,
	"Withdrawal"	INTEGER,
	"Deposit"	INTEGER,
	PRIMARY KEY("id" AUTOINCREMENT)
    );`,
  (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Created table for bank transactions.");
  }
);

// close the database connection
db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Close the database connection.");
});
