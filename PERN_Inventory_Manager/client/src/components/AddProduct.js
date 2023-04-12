import React, { useState } from 'react'

function AddProduct() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");

   


    const addproduct =async ()=>{
        
        console.log(name,price,category,company);

        const userid = JSON.parse(localStorage.getItem('user')).userid ;

      let result = await fetch('http://localhost:5000/add-products' , {
      method : 'post',
      body : JSON.stringify({userid , name,price,category ,company}),
      headers : {
        'Content-type' : 'application/json'
      },
    });

    result = await result.json();    ////this is response which we get from backend
    console.log(result);

    ////CLear the inputs
    alert("Product added")
    setName("");
    setPrice("");
    setCategory("");
    setCompany("");

    

    }

    
    
  return (
    <>
   <div className='adddiv'>
    <div className='formdiv' >
     <form  method='POST' className='signup' style={{border:"2px solid black" , backgroundImage: 'linear-gradient(to top,#fff,#fff)'}}>
     <h1 style={{fontFamily:"Times New Roman"}}>Add Product</h1>
        <input  type='text' placeholder='Name' value={name} onChange={(e)=>setName(e.target.value)} /> 
        <input  type='text' placeholder='Price' value={price} onChange={(e)=>setPrice(e.target.value)} />
        <input  type='text' placeholder='Category' value={category} onChange={(e)=>setCategory(e.target.value)} />
        <input  type='text' placeholder='Company' value={company} onChange={(e)=>setCompany(e.target.value)}  />
        <button type='button' onClick={addproduct} className='btn btn-outline-dark'>Add Product</button>
    </form>
    </div>
    </div>
     
    </>
  )
}

export default AddProduct