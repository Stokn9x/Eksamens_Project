import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

function LoginPage({ setIsAuthenticated }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await fetch('https://localhost:7265/api/Login/Login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            const message = await response.text();
            if (message === "Admin login successful") {
                setIsAuthenticated(true);
                navigate('/admin');
            } else {
                alert(message);
            }
        } else {
            const errorMessage = await response.text();
            setError(errorMessage);
        }
    };

    return (
        <div className="login-page-container">
            <h2 className="login-page-title">Login</h2>
            <form className="login-page-form" onSubmit={handleSubmit}>
                <div className="login-page-form-group">
                    <label htmlFor="username" className="login-page-label">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        className="login-page-input"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="login-page-form-group">
                    <label htmlFor="password" className="login-page-label">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="login-page-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <div className="login-page-error">{error}</div>}
                <button type="submit" className="login-page-button">Login</button>
            </form>
        </div>
    );
}

export default LoginPage;
