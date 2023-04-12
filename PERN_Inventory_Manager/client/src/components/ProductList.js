import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";




function ProductList() {

    const [products, setProducts] = useState([]);

    useEffect(()=>{
        getProducts();
    },[])
    
    const getProducts =async ()=>{
      const userId = JSON.parse(localStorage.getItem('user')).userid ;
        let result =await fetch('http://localhost:5000/products' , {
          method : 'post',
      body : JSON.stringify({userId}),
      headers : {
        'Content-type' : 'application/json'
      },
        } )
         
        result = await result.json();
        setProducts(result);
    }

///////////// Deleting Products//////
    const deleteItem =async (productid)=>{
      let result = await fetch(`http://localhost:5000/products/${productid}` , {
        method : 'Delete'
      });
      result = await result.json;
      if(result){
        getProducts();        ////getProducts is called so as to refresh the list after deleting
      }
    }

    ////////Searching Products///////
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
        getProducts()
      }
    }



  return (
    <>
    
    <h3 style={{textAlign : "center" , fontFamily:"Times New Roman" }}>Product List</h3>
    <input placeholder='Search Product' className='searchinp' onChange={searchHandle}/>

    <table>
    
      <tr>
        <td><b>S.no.</b></td>
        <td><b>Name</b></td>
        <td><b>Price</b></td>
        <td><b>Category</b></td>
        <td><b>Company</b></td>
      </tr>

      {
        products.map((item , index)=>
        <tr>
        <td>{index+1}</td>
        <td>{item.name}</td>
        <td>{item.price}</td>
        <td>{item.category}</td>
        <td>{item.company}</td>
        
        <td><button onClick={()=>deleteItem(item.productid)} style={{border : "0px"}}><FontAwesomeIcon icon={faTrash} /></button></td>
        <td><button style={{border : "0px"}}><Link to={"/update/" + item.productid} ><FontAwesomeIcon icon={ faPenToSquare} /></Link></button></td>

      </tr>
        )
      }
    </table>
    
    </>
  )
}

export default ProductList