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

// Delete table
db.run("DROP TABLE TdTransactions", (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("table deleted");
});

// close the database connection
db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Close the database connection.");
});
