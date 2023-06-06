import React , {useState} from 'react';
import ReceiptModal from './ReceiptModal';
import BuyerList from './BuyerList';
import Generatebill from './Generatebill';



function Receipt() {

  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

    const [bname, setBname] = useState("");
    const [address , setAddress] = useState("");
    const [bemail,setbemail] = useState("");

    const addbuyer = async()=>{
      
      const userid = JSON.parse(localStorage.getItem('user')).userid ;

    /////ADD BUYER DETAILS///////////
      let res = await fetch(`http://localhost:5000/addbuyer` , {
        method : 'post',
          body : JSON.stringify({userid , bname ,bemail , address}),
          headers : {
            'Content-type' : 'application/json'
          },
      }) ;
      res = await res.json();

      
      localStorage.setItem('buyerid', JSON.stringify(res));
      alert("Buyer's Data added");

      
      
    }

    
 
    
    
  return (
    <>
    <div className='rec'>
      <h3 style={{fontFamily:"Times New Roman" , position:"relative" , left:"20px"}}>Buyer's Details ...</h3>
      <form className='recform'>
      
        <input placeholder="Buyer's Name" value={bname} onChange={(e)=>{setBname(e.target.value)}} />
        <input placeholder="Buyer's E-mail" value={bemail} onChange={(e)=>{setbemail(e.target.value)}}/>
        <textarea placeholder='Address' rows={5} cols={30} value={address} onChange={(e)=>{setAddress(e.target.value)}} />
        
        <label>
          Date : <input disabled placeholder={date}/>
        </label>
        <button type="button" className='btn btn-outline-dark' style={{width:"200px"}} onClick={addbuyer}>Add Details</button>
        
      </form>

      {/*     Models purchased     */}
      <div className='rec2'><b>&emsp; Models Purchased  &nbsp;-----> &nbsp;</b><ReceiptModal/>&emsp;&emsp;&emsp;
      <Generatebill/></div>
      
    </div>

    <BuyerList/>
    
    </>
  )
}

export default Receipt