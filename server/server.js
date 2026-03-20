const express = require("express");
const cors = require("cors");
const path = require("path");
const mysql = require("mysql2");

const app = express();

app.use(cors());
app.use(express.json());

// DB connection
const db = mysql.createConnection({
  host: "localhost",   // ⚠️ WILL NOT WORK ON RENDER (we fix later)
  user: "root",
  password: "Haresh@2004",
  database: "ecommerce"
});

db.connect(err => {
  if (err) console.log(err);
  else console.log("MySQL Connected");
});

// Routes
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.get("/products", (req, res) => {
  db.query("SELECT * FROM products", (err, result) => {
    if (err) res.send(err);
    else res.json(result);
  });
});

app.get("/products/:id", (req, res) => {
  db.query("SELECT * FROM products WHERE id=?", [req.params.id], (err, result) => {
    if (err) res.send(err);
    else res.json(result[0]);
  });
});

app.get("/cart", (req, res) => {
  const query = `
    SELECT cart.id, products.name, products.price, cart.quantity
    FROM cart
    JOIN products ON cart.product_id = products.id
  `;
  db.query(query, (err, result) => {
    if (err) res.send(err);
    else res.json(result);
  });
});

app.post("/cart", (req, res) => {
  const { product_id, quantity } = req.body;

  db.query(
    "INSERT INTO cart (product_id, quantity) VALUES (?, ?)",
    [product_id, quantity],
    (err) => {
      if (err) res.send(err);
      else res.send("Added");
    }
  );
});

app.delete("/cart/:id", (req, res) => {
  db.query("DELETE FROM cart WHERE id=?", [req.params.id], (err) => {
    if (err) res.send(err);
    else res.send("Deleted");
  });
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});