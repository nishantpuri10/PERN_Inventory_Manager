import React from 'react'
import { useEffect, useState } from 'react';


function BuyerList() {
    let [buyerList, setBuyerList] = useState([]);
    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;


/////////SHOW BUYER DETAILS//////////////////
    const getbuyer = async ()=>{
        

        const userid = JSON.parse(localStorage.getItem('user')).userid ;
        let result = await fetch("http://localhost:5000/showBuyerAndProducts" , {
                method : 'post',
                body : JSON.stringify({userid}),
                headers : {
                  'Content-type' : 'application/json'
                },
            });

            result = await result.json();
          
            setBuyerList(result);

            
    }

    useEffect(()=>{
      getbuyer();
  },[])


  return (
    <>
      {/* {
        buyerList.map((buyer, index) => (
          <div key={index}>
            <h1>Buyer Name: {buyer.buyer_name}</h1>
            <h2>Product Names:</h2>
            <ul>
              {buyer.product_names.map((productName, index) => (
                <li key={index}>{productName}</li>
              ))}
            </ul>
            <h2>Total Price: {buyer.total_price}</h2>
          </div>
        ))
       } */}

   <div >
   <h3 style={{textAlign : "center" , fontFamily:"Times New Roman" }}>Buyers List</h3>

            <table class="table">
            <tr>
            <td>S.no.</td>
            <td>Name</td>
            <td>Products Bought</td>
            <td>Total</td>
            <td>Date</td>
            </tr>

            {
        buyerList.map((item , index)=>
        <tr >
        <td>{index + 1}</td>
        <td>{item.buyer_name}</td>
        <td>

              {item.product_names.map((productName, index) => (
                <span>{productName}   &emsp;</span>
              ))}
        

        </td>
        <td>$ {item.total_price}</td>
        <td>{date}</td>
      </tr>
        )
      }

            </table>
        </div>
        

    </>
  );

  
}

export default BuyerList