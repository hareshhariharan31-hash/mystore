const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

/* =========================
   ✅ SAMPLE DATA (TEMP)
   ========================= */

let products = [
  { id: 1, name: "Laptop", price: 50000 },
  { id: 2, name: "Smartphone", price: 25000 },
  { id: 3, name: "Headphones", price: 3000 }
];

let cart = [];

/* =========================
   ✅ API ROUTES
   ========================= */

// test
app.get("/api", (req, res) => {
  res.send("API working");
});

// get products
app.get("/products", (req, res) => {
  res.json(products);
});

// get single product
app.get("/products/:id", (req, res) => {
  const product = products.find(p => p.id == req.params.id);
  res.json(product);
});

// get cart
app.get("/cart", (req, res) => {
  res.json(cart);
});

// add to cart
app.post("/cart", (req, res) => {
  const { product_id, quantity } = req.body;

  const product = products.find(p => p.id == product_id);

  if (!product) {
    return res.status(404).send("Product not found");
  }

  const item = {
    id: Date.now(),
    product_id,
    name: product.name,
    price: product.price,
    quantity: quantity || 1
  };

  cart.push(item);

  res.send("Added to cart");
});

// delete cart item
app.delete("/cart/:id", (req, res) => {
  cart = cart.filter(item => item.id != req.params.id);
  res.send("Item removed");
});

/* =========================
   ✅ SERVE REACT BUILD
   ========================= */

app.use(express.static(path.join(__dirname, "build")));

// ✅ Express v5 safe fallback (IMPORTANT)
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

/* =========================
   ✅ START SERVER
   ========================= */

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});