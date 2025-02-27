import { Button } from "../components/Button.jsx";
import { Icon } from "../components/Icon.jsx";

import { CarruselDoctor } from "../components/Landing/CarruselDoctor.jsx";
import { useNavigate } from "react-router-dom";

import logo from "../assets/good-doctor-logo.svg"; // Logo
import equipo from "../assets/Fotomedicos.png"; // Equipo medico
import famila from "../assets/madrehijotablet.jpg"; // familiatablet


export const HomePage = () => {
  const navigate = useNavigate();

  const handleClickRegistro = () => {
    navigate("/registro");
  };
  const handleClickLogin = () => {
    navigate("/login");
  };

  
  return (
    
    
    <>
    <header>
      <img src= {logo} alt='logo Good Doctor'/>
      <h2>PAGINA MENU</h2>
    </header>
    <main>
      
      <CarruselDoctor />
      <section>
        <article>
          <img src ={equipo} alt ="Foto de equipo medico" />
          <h3>Equipo medico a ti disposición</h3>
          <p>Un lugar al que pertenecer, en el que puedes encontrar una red amplia de médicos a tu disposición y elección, ya que puedes ver su ratio de satisfacción de sus diagnósticos. </p>

        </article>
        <article>
        <img src ={famila} alt ="Foto de madre he hijo con una tablet" />
          <h3>En cualquier momento y lugar</h3>
          <p>Puedes encontrar diagnóstico de médicos sobre tus dolencias y todo a unos pocos clips. Puedes formar parte de nuestra comunidad, ver tu historial por si algún dolor o duda regresa. Todo ello en un entorno cómodo, intuitivo y responsive, puede verlo en tu Tablet, ordenador o teléfono.  </p>
        </article>
      </section>
    </main>
      <footer>
        <p3>Empieza a usar good doctor</p3>
        <p>Un lugar al que pertenecer, en el que puedes encontrar diagnóstico de médicos sobre tus dolencias y todo a unos pocos clips.</p>
      <button onClick={handleClickRegistro} className="registro">Registro</button>
      <button onClick={handleClickLogin} className="login">Login</button>

      </footer>
      
    </>
  );
};


