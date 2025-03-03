import React, { useContext } from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';
import { LogOutButton } from './LogOutButton.jsx';
import logonavbar from '../assets/good-doctor-logo-navbar.svg';
import { AuthContext } from '../contexts/auth/AuthContext.js';

export const NavBar = () => {
    const { token } = useContext(AuthContext);

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-logo">
                    <Link to="/">
                        <img src={logonavbar} alt="logo Good Doctor" />
                    </Link>
                </div>

                <div className="navbar-links">
                    <Link to="/" className="navbar-link">
                        Inicio
                    </Link>

                    {token ? (
                        <Link
                            to="/new-consult"
                            className="navbar-link new-consultation-link"
                        >
                            Hacer una consulta
                        </Link>
                    ) : (
                        <Link to="/signup" className="navbar-link">
                            Registrarse
                        </Link>
                    )}

                    {token && (
                        <Link to="/profile" className="navbar-link">
                            Mi Perfil
                        </Link>
                    )}

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
