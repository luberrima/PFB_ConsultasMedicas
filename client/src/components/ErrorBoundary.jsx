import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useNavigate } from "react-router-dom";

function ErrorFallback() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>¡UPS!</h1>
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
