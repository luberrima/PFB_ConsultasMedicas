import { Link } from 'react-router-dom';
import { LoginForm } from '../components/forms/LoginForm.jsx';
import illustration from '../assets/login-illustration.svg';
import logo from '../assets/good-doctor-logo-login.svg';
import '../components/forms/forms.css';
import { useEffect } from 'react';

export const LoginPage = () => {
    useEffect(() => {
        document.body.classList.add('no-header-footer');

        return () => {
            document.body.classList.remove('no-header-footer');
        };
    }, []);
    return (
        <div className="login-page">
            <Link to="/">
                <img className="logo" src={logo} alt="logo Good Doctor" />
            </Link>
            <div className="form-card">
                <h2>¡Hola de nuevo!</h2>
                <h1>Login</h1>
                <p>Escribe tus datos para iniciar sesión</p>
                <LoginForm />
                <p>
                    ¿Olvidaste tu contraseña?{' '}
                    <Link to="/password-recovery" className="form-link">
                        Recupérala aquí
                    </Link>
                </p>
                <p>
                    ¿No tienes cuenta?
                    <Link to="/registro" className="form-link">
                        Regístrate
                    </Link>
                </p>
                <p>
                    <Link to="/" className="form-link-inicio">
                        Volver a Inicio
                    </Link>
                </p>
            </div>
            <img className="illustration" src={illustration} alt="" />
        </div>
    );
};
