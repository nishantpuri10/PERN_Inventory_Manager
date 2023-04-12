import React, { useEffect, useState } from 'react'
import { useParams , useNavigate } from 'react-router-dom';


function UpdateProduct() {

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
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
      setCategory(result.category);
      setCompany(result.company)
    }
    

////// UPDATING PRODUCT
   const updateproduct =async ()=>{
    console.log(name,price,category,company)

    let result = await fetch(`http://localhost:5000/products/${params.id}` , {
      method:'Put',
      body: JSON.stringify({name,price,category,company}),
      headers: {
        'Content-Type' : "application/json"
      }
    });
    navigate('/')

   
   }

  return (
    <><div className='adddiv'>
    <div className='formdiv' >
      
     <form  method='POST' className='signup' style={{border:"2px solid black" , backgroundImage: 'linear-gradient(to top,#fff,#fff)'}}>
     <h1 style={{fontFamily:"Times New Roman"}}>Add Product</h1>

        <input  type='text' placeholder='Name' value={name} onChange={(e)=>setName(e.target.value)} /> 
        <input  type='text' placeholder='Price' value={price} onChange={(e)=>setPrice(e.target.value)} />
        <input  type='text' placeholder='Category' value={category} onChange={(e)=>setCategory(e.target.value)} />
        <input  type='text' placeholder='Company' value={company} onChange={(e)=>setCompany(e.target.value)}  />
        <button type='button' onClick={updateproduct} className='btn btn-outline-dark'>Update Product</button>
    </form>
    </div>
    </div>
    </>
  )
}

export default UpdateProduct