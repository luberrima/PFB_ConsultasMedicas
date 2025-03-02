import { Link } from 'react-router-dom';
import { LoginForm } from '../components/forms/LoginForm.jsx';
import illustration from '../assets/login-illustration.svg';
import logo from '../assets/good-doctor-logo-login.svg';
import '../components/forms/forms.css';

export const LoginPage = () => {
    return (
        <div className="login-page">
            <img src={logo} alt="" />
            <div className="login-card">
                <h2>¡Hola de nuevo!</h2>
                <h1>Login</h1>
                <p>Escribe tus datos para iniciar sesión</p>
                <LoginForm />
                <p>
                    ¿No tienes cuenta?
                    <Link to="/registro" className="form-link">
                        Regístrate
                    </Link>
                </p>
            </div>
            <img src={illustration} alt="" />
        </div>
    );
};
