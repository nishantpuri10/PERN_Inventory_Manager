import React , {useState} from 'react';
import ReceiptModal from './ReceiptModal';
import BuyerList from './BuyerList';



function Receipt() {

        var d = Date(Date.now());
        var a = d.toString()

    const [bname, setBname] = useState("");
    const [address , setAddress] = useState("");
   

    const addbuyer = async()=>{
     
      let productid = localStorage.getItem("productid");
      const userid = JSON.parse(localStorage.getItem('user')).userid ;

  ///////PRODUCT NAME///////////
      let result = await fetch(`http://localhost:5000/prodname` , {
          method : 'post',
          body : JSON.stringify({productid}),
          headers : {
            'Content-type' : 'application/json'
          },
        } ); 

        result = await result.json();
      
        localStorage.removeItem('productid');

    /////ADD BUYER DETAILS///////////
      let res = await fetch(`http://localhost:5000/addbuyer` , {
        method : 'post',
          body : JSON.stringify({userid , bname , address , result, a}),
          headers : {
            'Content-type' : 'application/json'
          },
      }) ;
      res = await res.json();

      ////DELETE ITEM FROM PRODUCT TABLE
        let resp = await fetch(`http://localhost:5000/products/${productid}` , {
        method : 'Delete'
      });

      

      
    }

    
 
    
    
  return (
    <>
    <div>
      <h3 style={{fontFamily:"Times New Roman" , position:"relative" , left:"20px"}}>Buyer's Details ...</h3>
      <form className='recform'>
      
        <input placeholder="Buyer's Name" value={bname} onChange={(e)=>{setBname(e.target.value)}} />
        <textarea placeholder='Address' rows={5} cols={30} value={address} onChange={(e)=>{setAddress(e.target.value)}} />
        <ReceiptModal/> 
        <label>
          Date & Time : <input disabled placeholder={a}/>
        </label>
        <button className='btn btn-outline-dark' style={{width:"200px"}} onClick={addbuyer}>Add Details</button>
      </form>
    </div>
    <BuyerList/>
    </>
  )
}

export default Receipt