require("dotenv").config();
const express = require("express");
const db = require("./database");

const app = express();
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/form.html");
});

app.get("/data", (req, res) => {
  var sql =
    "SELECT users.id, users.name, address.address FROM users INNER JOIN address ON users.id=address.user_id";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.post("/", (req, res) => {
  const name = req.body.name;
  const address = req.body.addr;
  var sql;

  sql = `SELECT * FROM users WHERE name="${name}"`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    if (!result) {
      sql = `INSERT INTO users (name) VALUES ("${name}")`;
      db.query(sql, (err, result) => {
        if (err) throw err;
      });
    }
  });

  sql = `INSERT INTO address (user_id, address) VALUES ((SELECT id FROM users WHERE name=("${name}")), "${address}")`;
  db.query(sql, (err, result) => {
    if (err) throw err;
  });

  res.redirect("/");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
