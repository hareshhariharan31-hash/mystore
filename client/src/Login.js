import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login(){

const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

const navigate = useNavigate();

const handleLogin = (e)=>{
e.preventDefault();

const storedUser = localStorage.getItem("user");

if(!storedUser){
alert("No user found. Please signup first.");
return;
}

const user = JSON.parse(storedUser);

if(user.email === email && user.password === password){

localStorage.setItem("isLogged","true");

alert("Login successful");

// ✅ redirect to product page
navigate("/home");

}else{
alert("Invalid login");
}

};

return(

<div style={{padding:"40px"}}>

<h2>Login</h2>

<form onSubmit={handleLogin}>

<input
type="email"
placeholder="Email"
onChange={(e)=>setEmail(e.target.value)}
required
/>

<br/><br/>

<input
type="password"
placeholder="Password"
onChange={(e)=>setPassword(e.target.value)}
required
/>

<br/><br/>

<button type="submit">Login</button>

</form>

<p>
New user? <Link to="/signup">Signup</Link>
</p>

</div>

)

}

export default Login;