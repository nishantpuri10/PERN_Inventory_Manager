import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React , {useState} from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
///For printing
import ReactToPrint from 'react-to-print';
import { PDFViewer, PDFDownloadLink, Page, Text, Document } from '@react-pdf/renderer';
import BillDocument from './BillDocument';



function Generatebill() {

    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const componentRef = React.createRef();

    const handleClose = () =>{
      setShow(false);
    } 

    const Save = ()=>{
      localStorage.removeItem('buyerid');
      window.location = "/receipt";
    }

   
    const handleShow = async() => {
        buyerdetails();
        getProducts();
        getTottalPrice();
        setShow(true);

    }

    const [name , setName] = useState();
    const[email , setEmail] = useState();
    const [address, setAddress] = useState();
    const [products, setProducts] = useState([]);
    const [totalPrice , setTotalPrice] = useState();
    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

    ////Show buyer's details in bill /////
    const buyerdetails = async()=>{
        const buyerid = JSON.parse(localStorage.getItem('buyerid')) ;
        let response =await fetch('http://localhost:5000/buyerdetails' , {
                    method : 'post',
                body : JSON.stringify({buyerid}),
                headers : {
                  'Content-type' : 'application/json'
                },
              })
        
        const result = await response.json();
        
        setName(result.name);
        setEmail(result.bemail);
        setAddress(result.address);
        
        
    }

    const getProducts =async()=>{
        const buyerid = JSON.parse(localStorage.getItem('buyerid'));
        let result =await fetch('http://localhost:5000/showcart' , {
          method : 'post',
          body : JSON.stringify({buyerid}),
          headers : {
                'Content-type' : 'application/json'
             },
        } )
        result = await result.json();
        setProducts(result);
    }

    const getTottalPrice = async()=>{
         const buyerid = JSON.parse(localStorage.getItem('buyerid'));
         let result =await fetch('http://localhost:5000/calculateTotalPrice' , {
            method : 'post',
            body : JSON.stringify({buyerid}),
            headers : {
                  'Content-type' : 'application/json'
               },
          } )
          result = await result.json();
          setTotalPrice(result);
    }

    return (
      <>
        <Button variant="primary" onClick={handleShow} className='btn btn-outline-dark ' style={{backgroundColor:"#9494b8" , position:"relative" , bottom:"5px"  , fontWeight:"700" , width:"200px" }}>
        Generate Bill
      </Button>
  
        <Modal show={show} onHide={handleClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Invoice</Modal.Title>
          </Modal.Header>
         

        <h5>Billed To : </h5>
        <i>{name}</i>
        <i>{email}</i>
        <i>{address}                                                                                                                                                                                                                               &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; 
        {date}</i>
        <div style={{position:"relative" , top:"20px"}}>
            <table>
            <tr>
            <td>S.no.</td>
            <td>Name</td>
            <td>Company</td>
            <td>Price</td>
            </tr>

            {
        products.map((item , index)=>
        <tr >
        <td>{index + 1}</td>
        <td>{item.productname}</td>
        <td>{item.company}</td>
        <td>$ {item.price}</td>
      </tr>
        )
      }

            </table>
        </div>
        
        <div style={{position:"relative" , top:"30px" , left:"80px"}}>
        <h6>Total Price : $ {totalPrice}</h6>
        </div>
        <div style={{position:"relative" , top:"25px" , }}>
          <Modal.Footer>
          <PDFDownloadLink
          document={<BillDocument
              name={name}
              email={email}
              address={address}
              date={date}
              products={products}
              totalPrice={totalPrice}
                />}
            fileName="bill.pdf"
          >
  {({ blob, url, loading }) => (loading ? 'Loading...' : 'Download')}
</PDFDownloadLink>
            <Button variant="primary" onClick={Save}>
              Save Details
            </Button>
          </Modal.Footer></div>
        </Modal>
       

      </>
    );
}

export default Generatebill