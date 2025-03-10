import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/good-doctor-logo.svg'; // Logo
import notFoundImage from '../assets/notfound.png'; // Imagen del personaje con la manzana
import { Button } from '../components/Button.jsx';

export const NotFoundPage = () => {
    const navigate = useNavigate();
    useEffect(() => {
        document.body.classList.add('no-header-footer');

        return () => {
            document.body.classList.remove('no-header-footer');
        };
    }, []);

    return (
        <div className="error-container">
            {/* 🔹 Encabezado con el logo y la navegación */}
            <header className="notfound-header">
                <img
                    src={logo}
                    alt="Good Doctor Logo"
                    className="notfound-logo"
                />
                <nav className="notfound-nav">
                    <span>PAGINA </span>
                    <span>MENU </span>
                    <span></span>
                    <span></span>
                    <span className="consulta-medico">
                        {' '}
                        CONSULTA A UN MÉDICO
                    </span>
                </nav>
            </header>

            {/* 🔹 Sección principal con el 404 y el mensaje */}
            <section className="error-content">
                <h1 className="error-title">
                    <span className="red">4</span>0
                    <span className="red">4</span>
                </h1>
                <h2 className="error-message">Página no encontrada</h2>
                <p className="error-text">
                    Lo sentimos, la página que buscas no existe.
                </p>
                <Button
                    handleClick={() => navigate('/')}
                    className="btn btn-azul"
                >
                    VOLVER A INICIO
                </Button>
            </section>

            {/* 🔹 Imagen del personaje con la manzana */}
            <div className="error-character">
                <img src={notFoundImage} alt="Personaje con manzana" />
            </div>
        </div>
    );
};

