import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from './components/Nav';
import Signup from './components/Signup';
import Login from './components/Login';
import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';
import UpdateProduct from './components/UpdateProduct';
import PrivateComponent from './components/PrivateComponent';
import Profile from './components/Profile';
import Receipt from './components/Receipt';



function App() {
  return (
    <>
    <BrowserRouter>
    <Nav/>
      <Routes>

      <Route element={<PrivateComponent/>}>                {/*Private component does not allow any page to open before user is signed up*/}            <Route path="/" element={<ProductList/>} />
            <Route path="/" element={<ProductList/>} />
            <Route path="/add" element={<AddProduct/>} />
            <Route path="/update/:id" element={<UpdateProduct/>} />
            <Route path="/logout" element={<h1>logout component</h1>} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/receipt" element={<Receipt/>}/>
            
       </Route>

        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
