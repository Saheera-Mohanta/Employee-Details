import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Signup.css';
import { Link } from 'react-router-dom'; 
import axios from 'axios'; 

const SignupForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  // Validate form data
  const validate = () => {
    const newErrors = {};
    if (!name) newErrors.name = 'Name is required';
    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    axios.post('http://localhost:3001/registers', { name, email, password })
      .then(response => {
        setMessage(response.data); // Set response message from the server
      })
      .catch(err => {
        setMessage('An error occurred'); // Display error message
        console.error(err);
      });
  };

  return (
    <div id='box'>
      <div className="container">
        <h2 className="mb-4">Signup Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <div className="text-danger">{errors.name}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <div className="text-danger">{errors.email}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <div className="text-danger">{errors.password}</div>}
          </div>
          <button type="submit" className="btn btn-primary">Sign Up</button>
          <p className="mt-3">Already have an account? <Link to="/login" className="btn btn-link">Login</Link></p>
        </form>
        {message && <div className="mt-3">{message}</div>} {/* Display server response */}
      </div>
    </div>
  );
};

export default SignupForm;
