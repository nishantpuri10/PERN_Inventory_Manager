// import React, { useState } from 'react'

// function AddProduct() {
//     const [name, setName] = useState("");
//     const [price, setPrice] = useState("");
//     const [category, setCategory] = useState("");
//     const [company, setCompany] = useState("");

   


//     const addproduct =async ()=>{
        
//         console.log(name,price,category,company);

//         const userid = JSON.parse(localStorage.getItem('user')).userid ;

//       let result = await fetch('http://localhost:5000/add-products' , {
//       method : 'post',
//       body : JSON.stringify({userid , name,price,category ,company}),
//       headers : {
//         'Content-type' : 'application/json'
//       },
//     });

//     result = await result.json();    ////this is response which we get from backend
//     console.log(result);

//     ////CLear the inputs
//     alert("Product added")
//     setName("");
//     setPrice("");
//     setCategory("");
//     setCompany("");

    

//     }

    
    
//   return (
//     <>
//    <div className='adddiv'>
//     <div className='formdiv' >
//      <form  method='POST' className='signup' style={{border:"2px solid black" , backgroundImage: 'linear-gradient(to top,#fff,#fff)'}}>
//      <h1 style={{fontFamily:"Times New Roman"}}>Add Product</h1>
//         <input  type='text' placeholder='Name' value={name} onChange={(e)=>setName(e.target.value)} /> 
//         <input  type='text' placeholder='Price' value={price} onChange={(e)=>setPrice(e.target.value)} />
//         <input  type='text' placeholder='Category' value={category} onChange={(e)=>setCategory(e.target.value)} />
//         <input  type='text' placeholder='Company' value={company} onChange={(e)=>setCompany(e.target.value)}  />
//         <button type='button' onClick={addproduct} className='btn btn-outline-dark'>Add Product</button>
//     </form>
//     </div>
//     </div>
     
//     </>
//   )
// }

// export default AddProduct

import React, { useState } from 'react';

function AddProduct() {
  const [product, setProduct] = useState({
    userid:JSON.parse(localStorage.getItem('user')).userid,
    name: '',
    price: '',
    category: '',
    company: '',
    photo: null
  });

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    setProduct({ ...product, [name]: value });
  };

  const handleFileChange = (event) => {
    setProduct({ ...product, photo: event.target.files[0] });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

  const userid = JSON.parse(localStorage.getItem('user')).userid ;


    // Create a FormData object to send the form data and file to the server
    const formData = new FormData();
    formData.append('userid', product.userid);
    formData.append('name', product.name);
    formData.append('price', product.price);
    formData.append('category', product.category);
    formData.append('company', product.company);
    formData.append('photo', product.photo);

    // Send the form data and file to the server using fetch()
    fetch('http://localhost:5000/add-products', {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));

     
      // Clear the input fields
      alert("Product Added")
      setProduct({
        userid:JSON.parse(localStorage.getItem('user')).userid,
        name: '',
        price: '',
        category: '',
        company: '',
        photo: null
      });
    
  };



  return (
    <div className='adddiv'>
    <div className='formdiv' >
    <form onSubmit={handleSubmit} className='addproduct' style={{border:"2px solid black" , height:"400px"}}>
    <h1 style={{fontFamily:"Times New Roman"}}>Add Product</h1>

        <input type="text" name="name" placeholder='Name' value={product.name} onChange={handleInputChange} />
       
        <input type="number" name="price" placeholder='Price' value={product.price} onChange={handleInputChange} />
     
        <input type="text" name="category" placeholder='Category' value={product.category} onChange={handleInputChange} />
       
        <input type="text" name="company" placeholder='Company' value={product.company} onChange={handleInputChange} />
   
        <label><b>Product Image :</b>
        <input type="file" name="photo" onChange={handleFileChange} className='btn btn-outline-dark' />
        </label>
      <button type="submit" className='btn btn-outline-dark'>Add Product</button>
    </form>
    </div>
    </div>
  );
}

export default AddProduct;
