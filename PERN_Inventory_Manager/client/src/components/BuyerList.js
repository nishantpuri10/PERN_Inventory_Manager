import React from 'react'
import { useEffect, useState } from 'react';


function BuyerList() {
    let [buyer, setBuyer] = useState([]);

    
 

/////////SHOW BUYER DETAILS//////////////////
    const getbuyer = async ()=>{
        try {
            const userid = JSON.parse(localStorage.getItem('user')).userid ;

            let result = await fetch("http://localhost:5000/buyerdetails" , {
                method : 'post',
                body : JSON.stringify({userid}),
                headers : {
                  'Content-type' : 'application/json'
                },
            });
            result = await result.json();
            
            setBuyer(result);

            
          
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(()=>{
      getbuyer();
  },[])

  return (
    <>
    <h3 style={{textAlign : "center" , fontFamily:"Times New Roman" }}>Buyers List</h3>
    <table class="table">
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Address</th>
      <th scope="col">Model</th>
      <th scope="col">Total</th>
      <th scope="col">Date&Time</th>
    </tr>
  </thead>
  <tbody>
    {/* <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr> */}
    {buyer.map((todo)=>(
        <tr>
            <td>{todo.name}</td>
            <td>{todo.address}</td>
            <td>{todo.prodname}</td>
            <td>{todo.total}</td>
            <td>{todo.datetime}</td>
            
        </tr>
    ))}
    
  </tbody>
  
</table>

    </>
  )
}

export default BuyerList