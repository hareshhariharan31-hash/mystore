const express = require("express");
const cors = require("cors");
const path = require("path");
const mysql = require("mysql2");

const app = express();

app.use(cors());
app.use(express.json());

/* ✅ MySQL Connection */
const db = mysql.createConnection({
  host: "localhost",   // change later for Render DB
  user: "root",
  password: "Haresh@2004",
  database: "ecommerce"
});

db.connect(err => {
  if (err) {
    console.log(err);
  } else {
    console.log("MySQL Connected");
  }
});

/* ✅ ROUTES */

// test
app.get("/api", (req, res) => {
  res.send("API working");
});

// products
app.get("/api/products", (req, res) => {
  db.query("SELECT * FROM products", (err, result) => {
    if (err) return res.send(err);
    res.json(result);
  });
});

// single product
app.get("/api/products/:id", (req, res) => {
  db.query(
    "SELECT * FROM products WHERE id=?",
    [req.params.id],
    (err, result) => {
      if (err) return res.send(err);
      res.json(result[0]);
    }
  );
});

// cart
app.get("/api/cart", (req, res) => {
  const query = `
    SELECT cart.id, products.name, products.price, cart.quantity
    FROM cart
    JOIN products ON cart.product_id = products.id
  `;
  db.query(query, (err, result) => {
    if (err) return res.send(err);
    res.json(result);
  });
});

// add to cart
app.post("/api/cart", (req, res) => {
  const { product_id, quantity } = req.body;

  db.query(
    "INSERT INTO cart (product_id, quantity) VALUES (?, ?)",
    [product_id, quantity],
    (err) => {
      if (err) return res.send(err);
      res.send("Added to cart");
    }
  );
});

// delete cart
app.delete("/api/cart/:id", (req, res) => {
  db.query("DELETE FROM cart WHERE id=?", [req.params.id], (err) => {
    if (err) return res.send(err);
    res.send("Deleted");
  });
});

/* ✅ SERVE REACT BUILD */
app.use(express.static(path.join(__dirname, "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

/* ✅ PORT FIX FOR RENDER */
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});