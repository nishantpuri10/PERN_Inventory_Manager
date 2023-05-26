import React from 'react'
import { useState ,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const navigate = useNavigate();

  ///If Login is done then dont let user  visit the signup page
  useEffect(()=>{
    const auth = localStorage.getItem('user');
    if(auth){
      navigate('/')  //navigate to home page 
    }
  })

  // const handleLogin =async ()=>{
  //   console.log(email , password)

  //   let result = await fetch('http://localhost:5000/login' , {
  //     method : 'post',
  //     body : JSON.stringify({email , password}),
  //     headers : {
  //       'Content-type' : 'application/json'
  //     },
  //   });

  //   result = await result.json();    ////this is response which we get from backend
  //   console.log(result);

  //   if(result){
  //     localStorage.setItem('user' , JSON.stringify(result));
  //     navigate('/');
  //   }
  //   else{
  //     console.log("User not identified so please signup first")
  //   }
  // }

  const handleLogin = async () => {
    console.log(email, password);
  
    let response = await fetch('http://localhost:5000/login', {
      method: 'post',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-type': 'application/json'
      },
    });
  
    if (response.ok) {
      let result = await response.json();
      console.log(result);
  
      if (result && result.userid) {
        localStorage.setItem('user', JSON.stringify(result));
        navigate('/');
      } else {
        alert('User not found. Please sign up first.');
      }
    } else {
      alert(`Server returned status code ${response.status}: ${response.statusText}`);
    }
  };
  
   
  
  
  return (
    <>
    <div className='signupback' >
    <div className='formdiv'>
    <form  method='post' className='signup'>
    <h1 style={{fontFamily:"Times New Roman" , color:'white'}}>Log In</h1>
      <input  type='email' placeholder='Email' value={email} onChange={(e)=>{setemail(e.target.value) }} />
      <input  type='password' placeholder='Password' value={password} onChange={(e)=>{setpassword(e.target.value)}}  />
      <button type='button' onClick={handleLogin} className='btn btn-outline-dark'>Log In</button>
    </form>
    </div>
    </div>
    </>
  )
}

export default Login