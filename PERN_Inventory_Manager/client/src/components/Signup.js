import React from 'react'
import { useState , useEffect} from 'react';
import { useNavigate } from 'react-router-dom';



function Signup() {

  

  // const handleSignUp = () => {
  //   window.location.href = 'https://semiautotrader.netlify.app/';
  // };

  const [username , setusername] = useState("");
  const [password , setPassword] = useState("");
  const [email , setEmail] = useState("");
  

  const navigate = useNavigate();

  ///If Signup is done then dont let user  visit the signup page
  useEffect(()=>{
    const auth = localStorage.getItem('user');
    if(auth){
      navigate('/')  //navigate to home page when clicked on sign up button
    }
  })

  const collectData =async ()=>{
    console.log(username , email , password);
     ///To send form data to our backend
    let result = await fetch('http://localhost:5000/register' , {
      method : 'post',
      body : JSON.stringify({username , email , password}),
      headers : {
        'Content-type' : 'application/json'
      },
    });

    result = await result.json();    ////this is response which we get from backend
    

    // alert(userid);

    localStorage.setItem('user' , JSON.stringify(result)); /// We have to save user signup data in local storage so even after refreshing page , the user stays logged in . 

    ///To navigate to home page once signup form is submitted
    if(result){
      navigate('/')
    }
  }
  return (
    <>
    <div className='signupback' >
    <div className='formdiv'>
    <form  method='post' className='signup'>
      <h1 style={{fontFamily:"Times New Roman" , color:'white'}}>Sign Up</h1>
      <input  type='text' placeholder='Username' value={username} onChange={(e)=>setusername(e.target.value)}/> 
      <input  type='email' placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)} />
      <input  type='password' placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)} />
      <button type='button'  onClick={collectData}>Sign Up</button>
      {/* <button type='button' onClick={handleSignUp}>Sign Up</button> */}
    </form>
    </div>
    </div>
    </>
  )
}

export default Signup