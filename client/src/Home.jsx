import React from 'react';
import { Link } from 'react-router-dom';
import "./home.css" 

const Home = () => {
  return (
    <div className='box'>
    <nav className='navbar'>
          <h1>Web<span>Dev.</span></h1>
        <div className='desktopMenu'>
         
        </div>
       <button className='desktopMenuBtn'>
         Logout
       </button>
    </nav>
    <div>
      <h2>Welcome Admin Panel</h2>
      <button> <Link to="/Signup" className="btn btn-link">Register</Link></button>
    </div>
    </div>
  );
}

export default Home;