import { useEffect, useState } from "react";
import axios from "axios";

function Orders(){

const [orders,setOrders] = useState([]);

useEffect(()=>{
axios.get("http://localhost:5000/orders")
.then(res=>{
setOrders(res.data);
});
})

return(

<div style={{padding:"40px"}}>

<h1>My Orders</h1>

{orders.map(order => (

<div key={order.id} style={{
border:"1px solid #ddd",
padding:"20px",
marginBottom:"20px"
}}>

<h3>Total: ₹{order.total}</h3>

{order.items.map((item,index)=>(
<p key={index}>
{item.name} (x{item.quantity})
</p>
))}

</div>

))}

</div>

);

}

export default Orders;
