import { useEffect, useState } from "react";
import axios from "axios";

function App() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div style={{padding:"40px"}}>
      <h1>My Ecommerce Store</h1>

      {products.map((product) => (
        <div key={product.id} style={{border:"1px solid gray",margin:"10px",padding:"10px"}}>
          <h2>{product.name}</h2>
          <p>Price: ₹{product.price}</p>
          <p>{product.description}</p>
        </div>
      ))}

    </div>
  );
}

export default App;