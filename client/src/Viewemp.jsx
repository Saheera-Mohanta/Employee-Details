import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
function Viewemp() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/addemps')
            .then(response => {
                console.log(response.data); // Log response data
                setUsers(response.data);
            })
            .catch(err => console.error(err));
    }, []);

    return (
        <div className='w-100 vh-100 d-flex justify-content-center align-items-center'>
            <div className='w-50'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Contact</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => {
                           return <tr>
                                <td>{user.name}</td> {/* Note: Property name should match exactly */}
                                <td>{user.email}</td>
                                <td>{user.contact}</td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Viewemp;
