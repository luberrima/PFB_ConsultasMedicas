import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/good-doctor-logo.svg"; // Logo
import notFoundImage from "../assets/notfound.png"; // Imagen del personaje con la manzana

export const NotFoundPage = () => {
    const navigate = useNavigate(); 

    return (
        <main className="notfound-container">
            {/* 🔹 Encabezado con el logo y la navegación */}
            <header className="notfound-header">
                <img src={logo} alt="Good Doctor Logo" className="notfound-logo" />
                <nav className="notfound-nav">
                    <span>PAGINA </span>
                    <span>MENU </span>
                    <span></span>
                    <span></span>
                    <span className="consulta-medico"> CONSULTA A UN MÉDICO</span>
                </nav>
            </header>

            {/* 🔹 Sección principal con el 404 y el mensaje */}
            <section className="notfound-content">
                <h1 className="notfound-title">
                    <span className="red">4</span>0<span className="red">4</span>
                </h1>
                <h2 className="notfound-message">Página no encontrada</h2>
                <p className="notfound-text">
                    Lo sentimos, la página que buscas no existe.
                </p>
                <button onClick={() => navigate("/")} className="notfound-button">
                    VOLVER AL INICIO
                </button>
            </section>

            {/* 🔹 Imagen del personaje con la manzana */}
            <div className="notfound-character">
                <img src={notFoundImage} alt="Personaje con manzana" />
            </div>
        </main>
    );
};


