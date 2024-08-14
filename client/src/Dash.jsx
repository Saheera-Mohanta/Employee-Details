import React from 'react';
import { Link } from 'react-router-dom';
import "./dash.css" 

const Dash = () => {
  return (
    <div className='box'>
    <nav className='navbar'>
          <h1>Web<span>Dev.</span></h1>
        <div className='desktopMenu'>
        </div>
       <button> <Link to="/home" className="desktopMenuBtn">logout</Link></button>
    </nav>
    <div>
      <h2>Welcome Admin Panel</h2>
      <button> <Link to="/empadd" className="btn btn-link">Create Employee</Link></button>
      <button> <Link to="/viewemp" className="btn btn-link">Employee List</Link></button>
    </div>
    </div>
  );
}

export default Dash;