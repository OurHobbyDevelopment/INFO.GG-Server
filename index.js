const express = require("express");
const mysql = require("mysql2");

const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "dbswhdgur2843!",
  database: "yun",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    throw err;
  }
  console.log("MySQL Connected...");
});

app.get("/", (req, res) => {
  let sql = "SELECT * FROM AimPointCode";
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      throw err;
    }
    console.log(result);
    res.json(result); // 변경된 부분
  });
});

app.listen("4000", () => {
  console.log("Server started on port 4000");
});
