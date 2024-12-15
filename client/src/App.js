import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer/Footer';
import Login from './components/Login/Login';
import Navbar from './components/Navbar/Navbar';
import Cart from './pages/Cart/Cart';
import Home from './pages/Home/Home';
import MyOrders from './pages/MyOrders/MyOrders';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';

function App() {

  const[login,setLogin] = useState(false);
  return (
    <>
    {login ? <Login setLogin={setLogin}/>:<></>}

    <div className="App">
      <Navbar setLogin = {setLogin}/>
      <Routes>
        <Route path = "/" element={<Home/>}/>
        <Route path = "/cart" element={<Cart/>}/>
        <Route path = "/myorders" element={<MyOrders/>}/>
        <Route path = "/order" element={<PlaceOrder/>}/>
      </Routes>
    </div>

    <Footer/>
    </>
  );
}

export default App;
