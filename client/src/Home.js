import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Home() {

  const [products, setProducts] = useState([]);

  useEffect(() => {

  axios.get("/products")
    .then(res => {
      console.log("API DATA:", res.data); // 🔍 DEBUG

      if (Array.isArray(res.data)) {
        setProducts(res.data);
      } else {
        console.error("Not an array:", res.data);
        setProducts([]); // prevent crash
      }
    })
    .catch(err => {
      console.error("API ERROR:", err);
    });

}, []);

  return (

    <div>

      {/* HERO SECTION */}
      <div style={{
        height: "350px",
        background: "linear-gradient(120deg,#4facfe,#00f2fe)",
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center"
      }}>

        <h1>Welcome to MyStore</h1>
        <p>Best electronics at the best prices</p>

      </div>

      {/* ABOUT */}
      <div style={{ padding: "60px", textAlign: "center" }}>
        <h2>About Our Store</h2>
        <p style={{ maxWidth: "700px", margin: "auto" }}>
          MyStore provides high quality electronic products
          with affordable prices and fast delivery.
        </p>
      </div>

      {/* PRODUCTS */}
      <div style={{ padding: "40px" }}>
        <h2>Our Products</h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: "20px"
        }}>

          {/* ✅ SAFE MAP */}
          {Array.isArray(products) && products.map(product => (

            <div key={product.id} style={{
              border: "1px solid #ddd",
              padding: "20px",
              textAlign: "center",
              borderRadius: "10px"
            }}>

              <img src={product.image} alt={product.name} width="200" />

              <Link to={`/product/${product.id}`}>
                <h3>{product.name}</h3>
              </Link>

              <p>₹{product.price}</p>

            </div>

          ))}

        </div>

      </div>

    </div>

  );
}

export default Home;