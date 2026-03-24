import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Cart({ fetchCartCount }) {

  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  const navigate = useNavigate();

  const loadCart = () => {

    axios.get("/cart") // ✅ FIXED
      .then(res => {

        if (Array.isArray(res.data)) {
          setCart(res.data);

          const sum = res.data.reduce((acc, item) => {
            return acc + (item.price || 0) * (item.quantity || 1);
          }, 0);

          setTotal(sum);
        } else {
          setCart([]);
          setTotal(0);
        }

      })
      .catch(err => {
        console.log(err);
        setCart([]);
      });

  };

  useEffect(() => {
    loadCart();
  }, []);

  const removeItem = (id) => {

    axios.delete(`/cart/${id}`) // ✅ FIXED
      .then(() => {
        loadCart();
        fetchCartCount();
      });

  };

  return (

    <div style={{ padding: "40px" }}>

      <h1>Your Cart</h1>

      {cart.length === 0 ? (
        <h3>Your cart is empty 🛒</h3>
      ) : (
        <>
          {cart.map(item => (

            <div key={item.id} style={{
              border: "1px solid #ddd",
              padding: "20px",
              marginBottom: "10px",
              borderRadius: "10px"
            }}>

              <h3>{item.name || "No Name"}</h3>
              <p>Price: ₹{item.price || 0}</p>
              <p>Quantity: {item.quantity || 1}</p>

              <button
                onClick={() => removeItem(item.id)}
                style={{
                  background: "orange",
                  color: "white",
                  border: "none",
                  padding: "8px 15px",
                  borderRadius: "5px"
                }}
              >
                Remove
              </button>

            </div>

          ))}

          <h2>Total: ₹{total}</h2>

          <button
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              background: "green",
              color: "white",
              border: "none",
              borderRadius: "5px"
            }}
            onClick={() => navigate("/checkout")}
          >
            Buy Now
          </button>
        </>
      )}

    </div>

  );

}

export default Cart;