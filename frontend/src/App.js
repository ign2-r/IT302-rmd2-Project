import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import ComicsList from './components/ComicsList';
import Comic from './components/Comic';
import LoginForm from './components/LoginForm';
// Rockwell Dela Rosa, IT302-451, IT302 Project, rmd2@njit.edu
function App() {
    const [user, setUser] = useState(null);

    const handleLogin = (user) => {
        setUser(user); // Save the entire user object, including name and email
    };

    const handleLogout = () => {
        setUser(null); // Clear the user state
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <Link className="navbar-brand" to="/">
                        Comics App
                    </Link>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/rmd2_comics">
                                    Comics List
                                </Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav">
                            {user ? (
                                <>
                                    <li className="nav-item">
                                        <span className="navbar-text me-3">
                                            Welcome, {user.name}
                                        </span>
                                    </li>
                                    <li className="nav-item">
                                        <button
                                            className="btn btn-outline-light"
                                            onClick={handleLogout}
                                        >
                                            Logout
                                        </button>
                                    </li>
                                </>
                            ) : (
                                <li className="nav-item">
                                    <Link className="btn btn-outline-light" to="/login">
                                        Login
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="container mt-4">
                <Routes>
                    <Route path="/" element={<ComicsList />} />
                    <Route path="/rmd2_comics" element={<ComicsList />} />
                    <Route path="/rmd2_comics/id/:id" element={<Comic />} />
                    <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
