import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useNavigate
  } from "react-router-dom";
import Profile from './Profile';
  
  

function Nav() {
  const auth = localStorage.getItem('user');
  const navigate = useNavigate();
  const logout = ()=>{
    localStorage.clear();
    navigate('/signup');
  }
  return (
    <>
    <div className='nav-div'>

   {  auth? <ul className='nav-ul' >

        <li><Link to="/">Products</Link></li>
        <li><Link to="/add">Add Product</Link></li>
        {/* <li><Link to="/update">Update Product</Link></li> */}
        
        {/* <li><Link to="/profile">Profile</Link></li> */}
        <li><Profile/></li>

        <li><Link to="/receipt">Receipt</Link></li>
        
        <div style={{position:"relative" , left:"800px"}}>
         <li ><Link onClick={logout} to="/signup" >Log Out</Link></li>
         </div>

          
    
    </ul>
    : <ul className='nav-ul '>
    <li><Link to="/signup">SignUp</Link></li>
    <li><Link to="/login">Log In</Link></li>
    </ul>
}
    </div>
    </>
   
  )
}

export default Nav