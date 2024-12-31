import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import LocationDetails from './LocationDetails';

const Users = () => {
    const [isLogin, setIsLogin] = useState(true); // Toggle between login and register
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [message, setMessage] = useState('');
    const [user, setUser] = useState(null); // To store user data after successful login
    const navigate = useNavigate(); // Initialize useNavigate

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleAuth = async () => {
        const url = isLogin
            ? 'http://localhost:3000/api/user/login'
            : 'http://localhost:3000/api/user/add';

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.success) {
                setMessage(isLogin ? 'Login successful!' : 'Registration successful!');

                if (isLogin) {
                    // Store user data after successful login
                    setUser(data.data);

                    // Redirect to the home page after successful login
                    navigate('/'); // Redirect to the home page
                }
            } else {
                setMessage(data.message || 'An error occurred.');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('Failed to authenticate.');
        }
    };

    return (
        <div>
            <h1>{isLogin ? 'Login' : 'Register'}</h1>
            <form>
                {!isLogin && (
                    <label>
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                    </label>
                )}
                <br />
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <label>
                    Password:
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <button type="button" onClick={handleAuth}>
                    {isLogin ? 'Login' : 'Register'}
                </button>
                <button type="button" onClick={() => setIsLogin(!isLogin)}>
                    Switch to {isLogin ? 'Register' : 'Login'}
                </button>
            </form>
            {message && <p>{message}</p>}

            {/* Display user data after login */}
            {user && isLogin && (
                <div>
                    <h3>Welcome, {user.name}!</h3>
                    <p>Email: {user.email}</p>
                    <button type="button">
                        <a href="/setLocation">Set live Location</a>
                    </button>
                </div>
            )}
            <LocationDetails />
        </div>
    );
};

export default Users;
