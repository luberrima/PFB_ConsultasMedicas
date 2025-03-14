import React, { useEffect } from 'react';
import { RecoveryPasswordForm } from '../components/forms/RecoveryPasswordForm';
import { Link } from 'react-router-dom';
import logo from '../assets/good-doctor-logo-navbar.svg';
import '../components/forms/forms.css';

export const RecoveryPasswordPage = () => {
    useEffect(() => {
        document.body.classList.add('no-header-footer');
        return () => {
            document.body.classList.remove('no-header-footer');
        };
    }, []);

    return (
        <div className="recovery-page">
            <Link to="/">
                <img className="logo" src={logo} alt="Good Doctor Logo" />
            </Link>
            <div className="form-card">
                <h1>Recuperar Contraseña</h1>
                <p>
                    Introduce tu correo para recibir instrucciones de
                    recuperación
                </p>
                <RecoveryPasswordForm />
                <p>
                    ¿Recordaste tu contraseña?{' '}
                    <Link to="/login" className="form-link">
                        Inicia Sesión
                    </Link>
                </p>
            </div>
        </div>
    );
};
