import { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./Navbar";
import Cart from "./Cart";
import ProductDetail from "./ProductDetail";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import Welcome from "./Welcome";
import Checkout from "./Checkout";
import Orders from "./Orders";

function App() {

  const [cartCount, setCartCount] = useState(0);

  const fetchCartCount = () => {
    axios.get("http://localhost:5000/cart")
    .then(res => {
      setCartCount(res.data.length);
    });
  };

  useEffect(() => {
    fetchCartCount();
  }, []);

  const isLogged = localStorage.getItem("isLogged");

  return (

    <BrowserRouter>

      {isLogged && <Navbar cartCount={cartCount} />}

      <Routes>

        <Route path="/" element={<Welcome />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/home"
          element={isLogged ? <Home fetchCartCount={fetchCartCount}/> : <Login />}
        />

        {/* ✅ FIXED */}
        <Route
          path="/cart"
          element={isLogged ? <Cart fetchCartCount={fetchCartCount}/> : <Login />}
        />

        {/* ✅ FIXED */}
        <Route
          path="/product/:id"
          element={isLogged ? <ProductDetail fetchCartCount={fetchCartCount}/> : <Login />}
        />

        <Route
          path="/checkout"
          element={isLogged ? <Checkout /> : <Login />}
        />

        <Route
          path="/orders"
          element={isLogged ? <Orders /> : <Login />}
        />

      </Routes>

    </BrowserRouter>

  );
}

export default App;