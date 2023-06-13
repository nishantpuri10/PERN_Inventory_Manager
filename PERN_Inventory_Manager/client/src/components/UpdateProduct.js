import React, { useEffect, useState } from 'react'
import { useParams , useNavigate } from 'react-router-dom';


function UpdateProduct() {

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setquantity] = useState("");
    const [company, setCompany] = useState("");
    const params = useParams();        ////useParams is a react hook which is used to get parameters of the current URL 
    const navigate = useNavigate();

    useEffect(()=>{
      getProductDetails();
    },[])

    ////SET THE VALUES IN INPUT FIELDS
    const getProductDetails =async ()=>{
      console.log(params);

      let result = await fetch(`http://localhost:5000/products/${params.id}`);
      result = await result.json();
      console.log(result)

      ///now set the values of input field
      setName(result.name);
      setPrice(result.price);
      setquantity(result.quantity);
      setCompany(result.company)
    }
    

////// UPDATING PRODUCT
   const updateproduct =async ()=>{
    console.log(name,price,quantity,company)

    let result = await fetch(`http://localhost:5000/products/${params.id}` , {
      method:'Put',
      body: JSON.stringify({name,price,quantity,company}),
      headers: {
        'Content-Type' : "application/json"
      }
    });
    navigate('/')

   
   }

  return (
    <><div className='adddiv'>
    <div className='formdiv' >
      
     <form  method='POST' className='addproduct' style={{border:"2px solid black" }}>
     <h1 style={{fontFamily:"Times New Roman"}}>Update Product</h1>

        <input  type='text' placeholder='Name' value={name} onChange={(e)=>setName(e.target.value)} /> 
        <input  type='text' placeholder='Price' value={price} onChange={(e)=>setPrice(e.target.value)} />
        <input  type='text' placeholder='quantity' value={quantity} onChange={(e)=>setquantity(e.target.value)} />
        <input  type='text' placeholder='Company' value={company} onChange={(e)=>setCompany(e.target.value)}  />
        <button type='button' onClick={updateproduct} className='btn btn-outline-dark'>Update Product</button>
    </form>
    </div>
    </div>
    </>
  )
}

export default UpdateProduct