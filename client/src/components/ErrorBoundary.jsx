import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useNavigate } from "react-router-dom";
import errorImage from "../assets/errorboundary.png"; // Imagen de error
import logo from "../assets/good-doctor-logo-navbar.svg"; // Logo de Good Doctor

function ErrorFallback() {
  const navigate = useNavigate();

  return (
    <div>
      <img src={logo} alt="Good Doctor" />
      <h1>¡UPS!</h1>
      <img src={errorImage} alt="Error" />
      <p>Lo sentimos, algo salió mal</p>
      <button onClick={() => navigate("/")}>VOLVER AL INICIO</button>
      <p>
        También puedes ponerte en contacto con nosotros en el siguiente correo:
        <br /> <strong>soporte@gooddoctor.com</strong>
      </p>
    </div>
  );
}

const AppErrorBoundary = ({ children }) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      {children}
    </ErrorBoundary>
  );
};

export default AppErrorBoundary;

