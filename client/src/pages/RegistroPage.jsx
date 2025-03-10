import { useEffect } from 'react';
import { RegisterForm } from '../components/forms/RegisterForm';
import { FormContextProvider } from '../contexts/forms/FormContextProvider.jsx';
import illustration from '../assets/registro-ilu.svg';
import logo from '../assets/good-doctor-logo-login.svg';
import { Link } from 'react-router-dom';

export const RegistroPage = () => {
    useEffect(() => {
        document.body.classList.add('no-header-footer');

        return () => {
            document.body.classList.remove('no-header-footer');
        };
    }, []);
    return (
        <div className="registro-page">
            <Link to="/">
                <img className="logo" src={logo} alt="logo Good Doctor" />
            </Link>
            <div className="form-card">
                <h2>¡Te damos la bienvenida!</h2>
                <h1>Registro</h1>
                <p>Escribe tus datos para registrarte</p>
                <FormContextProvider>
                    <RegisterForm />
                </FormContextProvider>
                <p>
                    ¿Ya tienes cuenta?
                    <Link to="/login" className="form-link">
                        Inicia Sesión
                    </Link>
                </p>
                <p>
                    <Link to="/" className="form-link-inicio">
                        Volver a Inicio
                    </Link>
                </p>
            </div>
            <img
                className="illustration registro-illustration"
                src={illustration}
                alt=""
            />
        </div>
    );
};
