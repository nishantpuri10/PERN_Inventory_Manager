import React from 'react'
import { useState , useEffect} from 'react';
import pic from "../person.png";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


function Profile() {
    const [name, setName] = useState("");
    const[email,setEmail] = useState("");
    const[count,setCount] = useState("");
    const[sum,setSum] = useState("");
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    useEffect(()=>{
        getuserdata();
        getcount();
        
    },[])

//////////USER DATA/////////////////
    const getuserdata = async ()=>{
        const userId = JSON.parse(localStorage.getItem('user')).userid ;
          let result =await fetch('http://localhost:5000/profile' , {
            method : 'post',
            body : JSON.stringify({userId}),
            headers : {
                'Content-type' : 'application/json'
        },
          } )
           
          result = await result.json();
          setName(result.username);
          setEmail(result.email);
      }

////////COUNT///////////////
      const getcount = async ()=>{
        const userId = JSON.parse(localStorage.getItem('user')).userid ;
          let result =await fetch('http://localhost:5000/count' , {
            method : 'post',
            body : JSON.stringify({userId}),
            headers : {
                'Content-type' : 'application/json'
        },
          } )
           
          result = await result.json();
          setCount(result.count);
          setSum(result.sum);
      }


  




  return (
    <>
      <Button onClick={handleShow} style={{backgroundColor:"#110226" , border:"0px" , position:"relative" , bottom:"5px"  , fontWeight:"700" , fontFamily:"sans-serif"}}>
        Profile
      </Button>
      {/* <div className='formdiv'>
       <div className='profilediv'>
        <div className='pdiv'>
       <img src={pic} />
       </div>
       <div className='details'>
        <h2><i>name</i>: <span style={{color:"black"}}>{name}</span></h2>
        <h2><i>email</i>: <span style={{color:"black"}}>{email}</span></h2>
        <h3><i>Products listed</i>: <span style={{color:"black"}}>{count}</span></h3>
        <h3><i>Total price</i>: <span style={{color:"black"}}>{sum}</span></h3>
        </div>
        </div>
        </div> */}

<Modal show={show} onHide={handleClose}>
        <Modal.Header >
          <Modal.Title><div className='pdiv'><img src={pic} /></div></Modal.Title>
        </Modal.Header>
        <div className='details'>
        <Modal.Body><i>name</i>: <span style={{color:"black"}}>{name}</span></Modal.Body>
        <Modal.Body><i>email</i>: <span style={{color:"black"}}>{email}</span></Modal.Body>
        </div>
        <div className='details'>
        <Modal.Body><i>Products listed</i>: <span style={{color:"black"}}>{count}</span></Modal.Body>
        <Modal.Body><i>Total price</i>: <span style={{color:"black"}}>${sum}</span></Modal.Body>
        </div>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          
        </Modal.Footer>
      </Modal>

        
    </>
  )
}

export default Profile