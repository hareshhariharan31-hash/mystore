import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./style.css";

function ProductDetail({ fetchCartCount }){

    fetchCartCount(); // ✅ update cart icon

  const { id } = useParams();
  const [product,setProduct] = useState(null);

  useEffect(()=>{

    axios.get(`http://localhost:5000/products/${id}`)
    .then(res=>{
      setProduct(res.data);
    });

  },[id]);

  // ✅ FIXED addToCart
  const addToCart = () => {

    axios.get("http://localhost:5000/cart")
    .then(res => {

      const existing = res.data.find(
        item => item.product_id === product.id
      );

      if(existing){
        // ✅ update quantity if already exists
        axios.patch(`http://localhost:5000/cart/${existing.id}`, {
          quantity: existing.quantity + 1
        }).then(()=>{
          alert("Quantity updated in cart");
        });

      } else {
        // ✅ add full product details
        axios.post("http://localhost:5000/cart",{
          product_id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1
        }).then(()=>{
          alert("Added to cart");
        });
      }

    });

  };

  if(!product){
    return <h2 style={{padding:"40px"}}>Loading...</h2>;
  }

  return(

    <div className="container">

      <div className="card" style={{
        display:"flex",
        gap:"40px",
        alignItems:"center",
        justifyContent:"center"
      }}>

        <img 
          src={product.image} 
          alt={product.name}
          style={{
            width:"350px",
            borderRadius:"10px",
            transition:"0.3s"
          }}
        />

        <div>

          <h1>{product.name}</h1>

          <h2 className="price">₹{product.price}</h2>

          <p style={{maxWidth:"400px"}}>
            High quality product with modern design and best performance.
            Perfect choice for your needs.
          </p>

          <button onClick={addToCart}>
            Add to Cart
          </button>

        </div>

      </div>

    </div>

  )

}

export default ProductDetail;