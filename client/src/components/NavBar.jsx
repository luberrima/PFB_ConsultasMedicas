// NavBar.jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LogOutButton } from './LogOutButton.jsx';
import logo from '../assets/good-doctor-logo.svg';
import { AuthContext } from '../contexts/auth/AuthContext.js';

export const NavBar = () => {
    const { token } = useContext(AuthContext);

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-logo">
                    <Link to="/" className="navbar-logo">
                        <img src={logo} alt="logo Good Doctor" />
                    </Link>
                </div>

                <div className="navbar-links">
                    <Link to="/" className="navbar-link">
                        Inicio
                    </Link>
                    <Link to="/about" className="navbar-link">
                        Acerca de
                    </Link>
                    <Link to="/contact" className="navbar-link">
                        Contacto
                    </Link>
                    {token ? (
                        <LogOutButton />
                    ) : (
                        <Link to="/login" className="navbar-link">
                            Iniciar Sesión
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};
