import React, { useContext } from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';
import { LogOutButton } from './LogOutButton.jsx';
import logonavbar from '../assets/good-doctor-logo-navbar.svg';
import { AuthContext } from '../contexts/auth/AuthContext.js';
import { jwtDecode } from 'jwt-decode';

export const NavBar = () => {
    const { token } = useContext(AuthContext);
    console.log('Token recibido en NavBar:', token);
    let decodedToken = null;

    if (token && typeof token === 'string') {
        try {
            decodedToken = jwtDecode(token);
        } catch (error) {
            console.error('Error al decodificar el token:', error);
        }
    } else {
        console.log('no hay usuario registrado');
    }
    // try {
    //     decodedToken = token ? jwtDecode(token) : null;
    // } catch (error) {
    //     console.error('Error al decodificar el token:', error);
    // }

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

                    {decodedToken && decodedToken.role === 'paciente' ? (
                        <Link
                            to="/new-consult"
                            className="navbar-link new-consultation-link"
                        >
                            Hacer una consulta
                        </Link>
                    ) : decodedToken && decodedToken.role === 'doctor' ? (
                        <></>
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
