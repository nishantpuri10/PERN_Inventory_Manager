import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignJustify, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";



function ProductList() {
  const [products, setProducts] = useState([]);

      useEffect(()=>{
        fetchProducts();
    },[])
 

/////Show ProductList///////
    const fetchProducts = async () => {
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
        fetchProducts();
      }
    }

    /////////// Deleting Products//////
    const deleteItem =async (productid)=>{
      let result = await fetch(`http://localhost:5000/products/${productid}` , {
        method : 'Delete'
      });
      result = await result.json;
      if(result){
        fetchProducts();        ////getProducts is called so as to refresh the list after deleting
      }
    }


  return (
    <>
    <div className='plist'>
     <h3 style={{textAlign : "center" , fontFamily:"Times New Roman" ,color:"white"}}>Product List</h3>
     <input placeholder='Search Product' className='searchinp' onChange={searchHandle}/>

    <div className='proddiv'>
      {products.map((product) => (

        <div className="card" style={{width: '18rem'}}>
          
  <img className="card-img-top" src={product.photo} alt="Card image cap" height="190px"/>
  <div className="card-body" style={{display:"flex" , flexDirection:"row" , justifyContent:"space-between" ,backgroundColor:"#d1d1e0"}} >
    <div>
    <p className="card-text"><b>Name : </b>{product.name}</p>
    <p className="card-text"><b>Price : </b>$ {product.price}</p>
    <p className="card-text"><b>quantity : </b>{product.quantity}</p>
    <p className="card-text"><b>Company : </b>{product.company}</p>
    </div>
    <div style={{display : "flex" , flexDirection:"column" , justifyContent:"space-evenly"}}>
    <button  onClick={()=>deleteItem(product.productid)} style={{border : "0px"}}><FontAwesomeIcon icon={faTrash} /></button>
    <button style={{border : "0px"}}><Link to={"/update/" + product.productid} ><FontAwesomeIcon icon={ faPenToSquare} /></Link></button>
    </div>

  </div>
</div>
    
      ))}
      </div>
      </div>
    </>
  );
}

export default ProductList;
