import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Checkout(){

  const [name,setName] = useState("");
  const [address,setAddress] = useState("");

  const navigate = useNavigate();

  const placeOrder = () => {

    axios.get("http://localhost:5000/cart")
    .then(res => {

      const cart = res.data;

      const total = cart.reduce((acc,item)=>{
        return acc + (item.price || 0) * (item.quantity || 1);
      },0);

      return axios.post("http://localhost:5000/orders", {
        name,
        address,
        items: cart,
        total
      });

    })
    .then(()=>{

      alert("Order Placed Successfully 🎉");

      // clear cart
      return axios.get("http://localhost:5000/cart");

    })
    .then(res => {

      const deleteRequests = res.data.map(item =>
        axios.delete(`http://localhost:5000/cart/${item.id}`)
      );

      return Promise.all(deleteRequests);

    })
    .then(()=>{
      navigate("/orders");
    });

  };

  return(

    <div style={{padding:"40px"}}>

      <h2>Checkout</h2>

      <input
        placeholder="Full Name"
        onChange={(e)=>setName(e.target.value)}
      />

      <br/><br/>

      <textarea
        placeholder="Address"
        onChange={(e)=>setAddress(e.target.value)}
      />

      <br/><br/>

      <button onClick={placeOrder}>
        Confirm Order
      </button>

    </div>

  )

}

export default Checkout;