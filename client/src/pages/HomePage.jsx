import { Button } from "../components/Button.jsx";
import { Icon } from "../components/Icon.jsx";
import { CarruselDoctor } from "../components/Landing/CarruselDoctor.jsx";


export const HomePage = () => {

  
  return (
    
    
    <>
    <header>
      <img src= '../assets/good-doctor-logo.svg' alt='logo Good Doctor'/>
      <h2>PAGINA MENU</h2>
    </header>
    <main>
      
      <CarruselDoctor />
      <section>
        <article>
          <img src ='../assets/fotomedicos.png' alt ="Foto de equipo medico" />
          <h3>Equipo medico a ti disposición</h3>
          <p>Un lugar al que pertenecer, en el que puedes encontrar una red amplia de médicos a tu disposición y elección, ya que puedes ver su ratio de satisfacción de sus diagnósticos. </p>

        </article>
        <article>
        <img src ='../assets/madrehijotablet.jpg' alt ="Foto de madre he hijo con una tablet" />
          <h3>En cualquier momento y lugar</h3>
          <p>Puedes encontrar diagnóstico de médicos sobre tus dolencias y todo a unos pocos clips. Puedes formar parte de nuestra comunidad, ver tu historial por si algún dolor o duda regresa. Todo ello en un entorno cómodo, intuitivo y responsive, puede verlo en tu Tablet, ordenador o teléfono.  </p>
        </article>
      </section>
    </main>
      <footer>
        <p3>Empieza a usar good doctor</p3>
        <p>Un lugar al que pertenecer, en el que puedes encontrar diagnóstico de médicos sobre tus dolencias y todo a unos pocos clips.</p>
      <button>Registro</button>
      <button>Login</button>

      </footer>
      
    </>
  );
};


