import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup(){

const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

const navigate = useNavigate();

const handleSignup = (e)=>{
e.preventDefault();

const user = {
email: email,
password: password
};

localStorage.setItem("user", JSON.stringify(user));

alert("Signup successful");

navigate("/login");

};

return(

<div style={{padding:"40px"}}>

<h2>Signup</h2>

<form onSubmit={handleSignup}>

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

<button type="submit">Signup</button>

</form>

</div>

)

}

export default Signup;