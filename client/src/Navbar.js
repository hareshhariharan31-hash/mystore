import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import "./style.css";

function Navbar({ cartCount }) {

return(

<div className="navbar">

<h2>MyStore</h2>

<div className="nav-links">

<Link to="/">Products</Link>

<Link to="/cart" className="cart-icon">
<FaShoppingCart /> ({cartCount})
</Link>

</div>

</div>

)

}

export default Navbar;