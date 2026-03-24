// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import GetProducts from './components/GetProducts';
import SignIn from './components/SignIn';
import AddProducts from './components/AddProducts';
import Mpesa from './components/Mpesa';
import SignUp  from './components/SignUp';


function App() {
  return (
    
    <Router>
    <div className="App">
      <header className="App-header">
        <h1>Fruitopia </h1>
      
      <nav>
        <Link to={"/signup"}  className='text-decoration-none text-white m-2 p-2'>Sign Up</Link> &nbsp;&nbsp;&nbsp;
        <Link to={"/signin"} className='text-decoration-none text-white m-2 p-2'>Sign In</Link> &nbsp;&nbsp;&nbsp;
        <Link to={"/"} className='text-decoration-none text-white m-2 p-2'>Get Products</Link> &nbsp;&nbsp;&nbsp;
        <Link to={"/addproducts"} className='text-decoration-none text-white m-2 p-2'>Add Products</Link>
      </nav>
      </header>

      <Routes>

        <Route path="/" element={<GetProducts />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn/>} />
        <Route path='/addproducts'  element={<AddProducts/>} />
        <Route path='/mpesa'  element={<Mpesa/>} />

      </Routes>

    </div>
    </Router>
  );
}

export default App;
