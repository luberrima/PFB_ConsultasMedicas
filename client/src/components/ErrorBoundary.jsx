import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Link /*, useNavigate*/ } from 'react-router-dom';
import errorImage from '../assets/errorboundary.png'; // Imagen de error
import logo from '../assets/good-doctor-logo.svg'; // Logo de Good Doctor
// import { Button } from './Button.jsx';

function ErrorFallback() {
    // const navigate = useNavigate();

    return (
        <section className="error-container">
            <article className="error-content">
                <img className="error-logo" src={logo} alt="Good Doctor" />
                <h1 className="error-title">¡UPS!</h1>
                <p className="error-text">Lo sentimos, algo salió mal</p>
                <Link to="/" className="btn btn-azul">
                    Volver a Inicio
                </Link>
                <p className="error-text">
                    También puedes ponerte en contacto con nosotros en el
                    siguiente correo:
                    <br /> <strong>soporte@gooddoctor.com</strong>
                </p>
            </article>
            <article className="error-character">
                <img src={errorImage} alt="Error" />
            </article>
        </section>
    );
}

export const AppErrorBoundary = ({ children }) => {
    return (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
            {children}
        </ErrorBoundary>
    );
};
