import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Components/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './Components/Signup';
import Home from './Components/Home';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';
import FoodCategory from './Components/FoodCategory';
import CategoryDishes from './Components/CategoryDishes';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Cart from './Components/Cart';
import { CartProvider } from './Context/CartContext';
import PaymentForm from './Components/PaymentForm';

function App() {
  return (
    <div className="App">
      <CartProvider>
        <BrowserRouter>
          <ToastContainer position='bottom-center' icon={false} />
          {/* <CustomNavbar /> */}
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/payment' element={<PaymentForm />} />
            <Route path='/cart' element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path='/order' element={<FoodCategory />} />
            <Route path='/category/:categoryName' element={<CategoryDishes />} /> {/* Add this route */}
          </Routes>
        </BrowserRouter>
      </CartProvider>
      {/* <Login /> */}
      {/* <Signup /> */}
    </div>
  );
}

export default App;