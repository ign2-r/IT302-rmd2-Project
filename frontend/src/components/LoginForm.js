import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Rockwell Dela Rosa, IT302-451, IT302 Project, rmd2@njit.edu
function LoginForm({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Hook for navigation

    const handleSubmit = (event) => {
        event.preventDefault();

        // Hardcoded test user
        const testUser = { email: 'rmd2@njit.edu', password: 'password', name: 'Rockwell' };

        if (email === testUser.email && password === testUser.password) {
            onLogin(testUser); // Pass the entire user object
            navigate('/'); // Redirect to the main menu
        } else {
            alert('Invalid email or password.');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '0 auto', padding: '1rem', border: '1px solid #ddd', borderRadius: '5px' }}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '0.5rem',
                            border: '1px solid #ccc',
                            borderRadius: '5px',
                        }}
                    />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '0.5rem',
                            border: '1px solid #ccc',
                            borderRadius: '5px',
                        }}
                    />
                </div>
                <button
                    type="submit"
                    style={{
                        width: '100%',
                        padding: '0.5rem',
                        backgroundColor: '#007bff',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                >
                    Login
                </button>
            </form>
        </div>
    );
}

export default LoginForm;
