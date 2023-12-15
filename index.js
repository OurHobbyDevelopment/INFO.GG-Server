const express = require("express");
const mysql = require("mysql2");
require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(cors());
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

app.get("/aimpoint", (req, res) => {
  const code = req.query.code;
  const title = req.query.title;
  // const img = req.query.img;
  let sql = `INSERT INTO AimPointCode(code, title) values("${code}", "${title}")`;
  db.query(sql, (err, results, fields) => {
    if (err) {
      console.error("Error executing query:", err);
      throw err;
    }
  });
});

app.get("/seeAimpoint", (req, res) => {
  let sql = "SELECT * FROM AimPointCode";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      throw err;
    }
    res.send(results);
  });
});

app.listen("4000", () => {
  console.log("Server started on port 4000");
});
