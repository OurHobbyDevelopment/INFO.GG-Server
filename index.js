const express = require("express");
const mysql = require("mysql2");
require("dotenv").config();

const app = express();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
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
