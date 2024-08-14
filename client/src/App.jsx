import { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './Signup';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Fixed typo here
import Login from './Login';
import Home from './home';
import Empadd from './Empadd'
import Viewemp from './Viewemp';
import Dash from './Dash';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/empadd' element={<Empadd />} />
        <Route path='/viewemp' element={<Viewemp />} />
        <Route path='/desh' element={<Dash />} />
      </Routes>
    </Router>
  );
}

export default App;
