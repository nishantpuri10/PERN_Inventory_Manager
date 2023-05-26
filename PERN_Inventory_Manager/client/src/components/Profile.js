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
  const handleShow = async() => {
    getuserdata();
    getcount();
    setShow(true);
  }

    // useEffect(()=>{
    //     getuserdata();
    //     getcount();
        
    // },[])

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
      <Button onClick={handleShow} style={{background:"#22426e" , border:"0px" , position:"relative" , bottom:"5px"  , fontWeight:"700" , fontFamily:"sans-serif"}}>
        Profile
      </Button>

<Modal show={show} onHide={handleClose} >
        <div style={{backgroundColor:"#e1e1ea"}}>
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
        </div>
      </Modal>

        
    </>
  )
}

export default Profile