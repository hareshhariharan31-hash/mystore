import { Link } from "react-router-dom";

function Welcome(){

return(

<div style={{
height:"100vh",
background:"linear-gradient(135deg,#667eea,#764ba2)",
color:"white",
display:"flex",
flexDirection:"column",
justifyContent:"center",
alignItems:"center"
}}>

{/* Top Right Menu */}
<div style={{
position:"absolute",
top:"20px",
right:"40px"
}}>

<Link to="/login" style={{margin:"10px",color:"white"}}>Login</Link>
<Link to="/about" style={{margin:"10px",color:"white"}}>About</Link>
<Link to="/contact" style={{margin:"10px",color:"white"}}>Contact</Link>

</div>

<h1>Welcome to MyStore 🛍</h1>
<p>Best products at best price</p>

</div>

)

}

export default Welcome;