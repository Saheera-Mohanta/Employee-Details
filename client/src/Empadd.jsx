// src/FormComponent.js
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'; // Import axios for HTTP requests
import "./Empadd.css";

function Empadd() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        contact: '',
        designation: '',
        gender: '',
        courses: [],
        image: null
    });
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');

    // Validate form data
    const validate = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.contact) newErrors.contact = 'Contact is required';
        if (!formData.designation) newErrors.designation = 'Designation is required';
        if (!formData.gender) newErrors.gender = 'Gender is required';
        if (!formData.courses.length) newErrors.courses = 'At least one course must be selected';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox') {
            setFormData(prevState => ({
                ...prevState,
                courses: checked
                    ? [...prevState.courses, value]
                    : prevState.courses.filter(course => course !== value)
            }));
        } else if (type === 'file') {
            setFormData(prevState => ({
                ...prevState,
                image: e.target.files[0]
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;

        const formDataToSend = new FormData();
        for (const key in formData) {
            if (Array.isArray(formData[key])) {
                formData[key].forEach(item => formDataToSend.append(key, item));
            } else {
                formDataToSend.append(key, formData[key]);
            }
        }

        axios.post('http://localhost:3001/addemps', formDataToSend, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            setMessage('Form submitted successfully!');
        })
        .catch(err => {
            setMessage('An error occurred');
            console.error(err);
        });
    };

    return (
        <div id='box-1'>
            <div className="container">
                <h2>Form Example</h2>
                <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        {errors.name && <div className="text-danger">{errors.name}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {errors.email && <div className="text-danger">{errors.email}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="contact">Contact:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="contact"
                            name="contact"
                            value={formData.contact}
                            onChange={handleChange}
                        />
                        {errors.contact && <div className="text-danger">{errors.contact}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="designation">Designation:</label>
                        <select
                            className="form-control"
                            id="designation"
                            name="designation"
                            value={formData.designation}
                            onChange={handleChange}
                        >
                            <option value="">Select Designation</option>
                            <option value="Developer">Developer</option>
                            <option value="Designer">Designer</option>
                            <option value="Manager">Manager</option>
                        </select>
                        {errors.designation && <div className="text-danger">{errors.designation}</div>}
                    </div>
                    <div className="form-group">
                        <label>Gender:</label>
                        <div className="form-check">
                            <input
                                type="radio"
                                className="form-check-input"
                                id="male"
                                name="gender"
                                value="Male"
                                checked={formData.gender === 'Male'}
                                onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="male">Male</label>
                        </div>
                        <div className="form-check">
                            <input
                                type="radio"
                                className="form-check-input"
                                id="female"
                                name="gender"
                                value="Female"
                                checked={formData.gender === 'Female'}
                                onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="female">Female</label>
                        </div>
                        {errors.gender && <div className="text-danger">{errors.gender}</div>}
                    </div>
                    <div className="form-group">
                        <label>Courses:</label>
                        <div className="form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="react"
                                name="courses"
                                value="React"
                                checked={formData.courses.includes('React')}
                                onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="react">React</label>
                        </div>
                        <div className="form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="node"
                                name="courses"
                                value="Node"
                                checked={formData.courses.includes('Node')}
                                onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="node">Node</label>
                        </div>
                        <div className="form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="python"
                                name="courses"
                                value="Python"
                                checked={formData.courses.includes('Python')}
                                onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="python">Python</label>
                        </div>
                        {errors.courses && <div className="text-danger">{errors.courses}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="image">Upload Image:</label>
                        <input
                            type="file"
                            className="form-control-file"
                            id="image"
                            name="image"
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                {message && <div className="alert alert-info mt-3">{message}</div>}
            </div>
        </div>
    );
}

export default Empadd;
