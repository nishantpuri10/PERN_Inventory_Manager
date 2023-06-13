import React, { useState } from 'react';

function AddProduct() {
  const [product, setProduct] = useState({
    userid:JSON.parse(localStorage.getItem('user')).userid,
    name: '',
    price: '',
    quantity: '',
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
    formData.append('quantity', product.quantity);
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
        quantity: '',
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
     
        <input type="text" name="quantity" placeholder='quantity' value={product.quantity} onChange={handleInputChange} />
       
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
