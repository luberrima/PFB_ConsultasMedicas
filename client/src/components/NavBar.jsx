import React, { useContext } from 'react';
import './navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { LogOutButton } from './LogOutButton.jsx';
import logonavbar from '../assets/good-doctor-logo-navbar.svg';
import { AuthContext } from '../contexts/auth/AuthContext.js';
import { jwtDecode } from 'jwt-decode';
import { Button } from './Button.jsx';

export const NavBar = () => {
    const navigate = useNavigate();
    const { token } = useContext(AuthContext);

    let decodedToken = null;

    if (token && typeof token === 'string') {
        try {
            decodedToken = jwtDecode(token);
        } catch (error) {}
    }

    const handleClick = () => {
        navigate('/new-consult');
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-logo">
                    <Link to="/">
                        <img src={logonavbar} alt="logo Good Doctor" />
                    </Link>
                </div>

                <div className="navbar-links">
                    {/* USUARIO NO REGISTRADO */}
                    {!decodedToken && (
                        <ul>
                            <li>
                                <Link to="/" className="navbar-link">
                                    Inicio
                                </Link>
                            </li>
                            <li>
                                <Link to="/login" className="navbar-link">
                                    Iniciar Sesión
                                </Link>
                            </li>
                            <li>
                                <Link to="/registro" className="navbar-link">
                                    Registro
                                </Link>
                            </li>
                        </ul>
                    )}

                    {/* USUARIO PACIENTE */}

                    {decodedToken && decodedToken.role === 'paciente' && (
                        <ul>
                            <li>
                                <Link to="/" className="navbar-link">
                                    Inicio
                                </Link>
                            </li>
                            <li>
                                <Link to="/profile" className="navbar-link">
                                    Mi Perfil
                                </Link>
                            </li>
                            <li>
                                <Link to="/alldoctors" className="navbar-link">
                                    Doctores
                                </Link>
                            </li>
                            <li>
                                <LogOutButton />
                            </li>
                            <li>
                                <Button
                                    to="/new-consult"
                                    className="btn btn-naranja"
                                    handleClick={handleClick}
                                >
                                    Hacer una consulta
                                </Button>
                            </li>
                        </ul>
                    )}

                    {/* USUARIO DOCTOR */}

                    {decodedToken && decodedToken.role === 'doctor' && (
                        <ul>
                            <li>
                                <Link to="/" className="navbar-link">
                                    Inicio
                                </Link>
                            </li>
                            <li>
                                <Link to="/profile" className="navbar-link">
                                    Mi Perfil
                                </Link>
                            </li>
                            <li>
                                <Link to="/alldoctors" className="navbar-link">
                                    Doctores
                                </Link>
                            </li>

                            <li>
                                <LogOutButton />
                            </li>
                        </ul>
                    )}

                    {/* USUARIO ADMIN */}
                    {decodedToken && decodedToken.role === 'admin' && (
                        <ul>
                            <li>
                                <Link to="/" className="navbar-link">
                                    Inicio
                                </Link>
                            </li>
                            <li>
                                <Link to="/profile" className="navbar-link">
                                    Mi Perfil
                                </Link>
                            </li>
                            <li>
                                <Link to="/alldoctors" className="navbar-link">
                                    Doctores
                                </Link>
                            </li>

                            <li>
                                <LogOutButton />
                            </li>
                        </ul>
                    )}
                </div>
            </div>
        </nav>
    );
};
