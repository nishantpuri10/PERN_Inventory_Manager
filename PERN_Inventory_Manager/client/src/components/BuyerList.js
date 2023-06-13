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
      

   <div >
   <h3 style={{textAlign : "center" , fontFamily:"Times New Roman" }}>Buyers List</h3>

            <table class="table">
            <tr>
            <td>S.no.</td>
            <td>Name</td>
            <td>Products Bought</td>
            <td>Quantity Bought</td>
            <td>Total</td>
            <td>Date</td>
            </tr>

            {buyerList.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.buyer_name}</td>
                <td>
                  {item.product_names.map((productName, index) => (
                    <span key={index}>{productName} &emsp;</span>
                  ))}
                </td>
                <td>
                  {item.quantities_sold.map((quantitySold, index) => (
                    <span key={index}>{quantitySold} &emsp;</span>
                  ))}
                </td>
                <td>$ {item.total_price}</td>
                <td>{date}</td>
              </tr>
            ))}

            </table>
        </div>
        

    </>
  );

  
}

export default BuyerList