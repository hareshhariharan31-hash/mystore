const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Ecommerce API is running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Haresh@2004",
  database: "ecommerce"
});

db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("MySQL Connected");
  }
});
app.get("/products", (req, res) => {
  db.query("SELECT * FROM products", (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
});
app.post("/cart", (req, res) => {

  const { product_id, quantity } = req.body;

  db.query(
    "INSERT INTO cart (product_id, quantity) VALUES (?, ?)",
    [product_id, quantity],
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send("Product added to cart");
      }
    }
  );

});
app.get("/cart", (req, res) => {

  const query = `
    SELECT cart.id, products.name, products.price, cart.quantity
    FROM cart
    JOIN products ON cart.product_id = products.id
  `;

  db.query(query, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });

  app.delete("/cart/:id", (req, res) => {

  const id = req.params.id;

  db.query("DELETE FROM cart WHERE id = ?", [id], (err, result) => {

    if(err){
      res.send(err);
    }else{
      res.send("Item removed");
    }

  });

});

app.get("/products/:id",(req,res)=>{

const id = req.params.id;

db.query("SELECT * FROM products WHERE id=?",[id],(err,result)=>{

if(err){
res.send(err);
}else{
res.send(result[0]);
}

});

});

app.delete("/cart/:id", (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM cart WHERE id = ?", [id], (err, result) => {
    if (err) throw err;
    res.send("Item removed");
  });
});

});