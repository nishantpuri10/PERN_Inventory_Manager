import React from 'react'
import { useState , useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

function ReceiptModal() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const [products, setProducts] = useState([]);

    var d = Date(Date.now());
    var a = d.toString();

    /////Show ProductList///////
    const handleShow = async () => {
      setShow(true);
      const userId = JSON.parse(localStorage.getItem('user')).userid ;
      try {
        let response =await fetch('http://localhost:5000/products' , {
                    method : 'post',
                body : JSON.stringify({userId}),
                headers : {
                  'Content-type' : 'application/json'
                },
              })       
       const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    };

    //////Searching Products///////
    const searchHandle = async (event)=>{
      const userId = JSON.parse(localStorage.getItem('user')).userid ;
      let key = event.target.value;
      
      if(key){
        let result = await fetch(`http://localhost:5000/search/${key}` , {
          method : 'post',
          body : JSON.stringify({userId}),
          headers : {
            'Content-type' : 'application/json'
          },
        } );
        result = await result.json();
        if(result){
          setProducts(result);
        }
      }
      else{     ////when input field is empty
        handleShow();
      }
    };

    const [prodname, setProdname] = useState("");
    
    

    const addproductid = async (productid)=>{
          localStorage.setItem('productid' , productid);
              
      let result = await fetch(`http://localhost:5000/prodname` , {
          method : 'post',
          body : JSON.stringify({productid}),
          headers : {
            'Content-type' : 'application/json'
          },
        } ); 

        result = await result.json();

        setProdname(result.name);
        
        handleClose();

      //   let res = await fetch(`http://localhost:5000/products/${productid}` , {
      //   method : 'Delete'
      // });
      
      
    }

    


   
    
    
   const auth = localStorage.getItem('productid');

  return (
    
    <>
    {auth? <span>{prodname}</span> : <Button variant="primary" onClick={handleShow} className='btn btn-outline-dark ' style={{backgroundColor:"#d5d4d6" , position:"relative" , bottom:"5px"  , fontWeight:"700" , width:"200px" }}>
        Model
      </Button>}
    
    

    <div style={{backgroundColor:"#e1e1ea"}}>
      <Modal show={show} onHide={handleClose}  dialogClassName="my-modal">
        <Modal.Header closeButton>
          <Modal.Title>Model Bought ...</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <input placeholder='Search Product' className='searchinp' onChange={searchHandle} style={{position:"relative" , right:"100px"}}/>
        <div className='proddiv'>

      {products.map((product) => (
        
        <div className="card" style={{width: '18rem'}}>
          
  <img className="card-img-top" src={product.photo} alt="Card image cap" height="170px"/>
  <div className="card-body" style={{display:"flex" , flexDirection:"row" , justifyContent:"space-between" ,backgroundColor:"#d1d1e0"}} >
    <div>
    <p className="card-text"><b>Name : </b>{product.name}</p>
    <p className="card-text"><b>Price : </b>{product.price}</p>
    <p className="card-text"><b>Category : </b>{product.category}</p>
    <p className="card-text"><b>Company : </b>{product.company}</p>
    </div>

    <div style={{display : "flex" , flexDirection:"column" , justifyContent:"space-evenly"}}>
    <button  ><FontAwesomeIcon icon={faCircleCheck} onClick={()=>addproductid(product.productid)}/></button>
    
    </div>
    

  </div>
</div>
    
      ))}
      </div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          
        </Modal.Footer>
      </Modal>
      </div>
    </>
  )
}

export default ReceiptModal