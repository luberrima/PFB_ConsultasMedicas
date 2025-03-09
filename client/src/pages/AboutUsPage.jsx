import React from "react";
import javi from "../assets/team/javi.jpg";
import lucia from "../assets/team/lucia.jpg";
import rafa from "../assets/team/rafa.jpg";
import damaris from "../assets/team/damaris.jpg";
import alejandro from "../assets/team/alejandro.jpg";
import fran from "../assets/team/fran.jpg";
import appleIcon from "../assets/favicon/favicon.svg"; 


const teamMembers = [
  {
    name: "Javi Navarro",
    role: "Animador Estratega",
    description:
      "Javi siempre tiene ideas revolucionarias que pueden cambiar el mundo... o romper el servidor en el intento. Su frase favorita es '¿Y si lo hacemos más grande?'",
    avatar: javi,
    github: "https://github.com/JavierNavarroRobles",
    linkedin: "https://www.linkedin.com/in/javier-navarro-robles-948990ab/",
  },
  {
    name: "Lucía Franco",
    role: "Diseño y Coordinación",
    description:
      "Lucía mantiene todo en orden. Si el código colapsa, al menos el caos está bien organizado.También es la razón por la que la plataforma no se ve como una página de los años 90.",
    avatar: lucia,
    github: "https://github.com/luberrima",
    linkedin: "https://www.linkedin.com/in/luberrima?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
  },
  {
    name: "Rafa López",
    role: "Backend y Seguridad",
    description:
      "Rafa es el encargado de que todo funcione sin problemas... en teoría. Si ves a Rafa en silencio... es señal de que algo grave está pasando, pero sabemos que siempre encuentra una gran solución",
    avatar: rafa,
    github: "https://github.com/RafVianney",
    linkedin: "#",
  },
  {
    name: "Dámaris Mercado",
    role: "Detective de Logs y Errores",
    description:
      "Dámaris tiene un don especial: puede leer logs como si fueran novelas de misterio y siempre encuentra al culpable.",
    avatar: damaris,
    github: "https://github.com/Damarisconweb",
    linkedin: "https://www.linkedin.com/in/damariscontilde/",
  },
  {
    name: "Alejandro Andrés",
    role: "Integraciones y Base de Datos",
    description:
      "Ale es el encargado de que todo se comunique correctamente. Si una consulta tarda más de lo normal, lo verás escribiendo en Stack Overflow con cara de 'esto no debería estar pasando'.",
    avatar: alejandro,
    github: "https://github.com/Vikingracer89",
    linkedin: "https://www.linkedin.com/in/alejandro-andres-sorribas-436868152?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  },
  {
    name: "Fran Bejarano",
    role: "Simplificación y Optimización",
    description:
      "Fran ha optimizado más código del que podemos contar. Si algo se puede hacer en la mitad de líneas, él ya lo redujo antes de que lo pidieras.",
    avatar: fran,
    github: "https://github.com/Franollie",
    linkedin: "#",
  }
];

const AboutUs = () => {
  return (
    <div className="about-container">
      <section className="team-section">
        <h1 className="section-title">Conoce al Equipo</h1>
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-card">
              <img src={member.avatar} alt={member.name} className="avatar" />
              <h3>{member.name}</h3>
              <p className="role">{member.role}</p>
              <p>{member.description}</p>
              <div className="social-links">
                <a href={member.github} target="_blank" rel="noopener noreferrer">
                  <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="GitHub" />
                </a>
                {member.linkedin !== "#" && (
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                    <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="LinkedIn" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
      
      <section className="about-text">
        <h2>Sobre Nosotros</h2>
        <p>Somos un equipo de programadores apasionados por la tecnología y la salud...</p>
        <h2>Nuestra Misión</h2>
        <p>Facilitar el acceso a la atención médica a través de nuestra plataforma...</p>
        <h2>Nuestra Visión</h2>
        <p>Crear una plataforma donde médicos y pacientes puedan interactuar de manera sencilla...</p>
        <h2>Nuestros Valores</h2>
        <ul>
          <li><img src={appleIcon} alt="icono" className="icon" /> <b>Innovación:</b> Nos encanta explorar nuevas soluciones para mejorar la salud de las personas</li>
          <li><img src={appleIcon} alt="icono" className="icon" /> <b>Seguridad:</b> Protegemos la información médica con los más altos estándares.</li>
          <li><img src={appleIcon} alt="icono" className="icon" /> <b>Usabilidad:</b> Diseñamos pensando en el usuario.</li>
          <li><img src={appleIcon} alt="icono" className="icon" /> <b>Trabajo en equipo:</b> Cada línea de código es un esfuerzo conjunto.</li>
          <li><img src={appleIcon} alt="icono" className="icon" /> <b>Café:</b> Es el motor que impulsa nuestro desarrollo (quizás demasiado)</li>
        </ul>
      </section>
      <style>
        {`
          .about-container { text-align: center; padding: 2rem; }
          .team-section { background: #f4f4f4; padding: 3rem 1rem; border-radius: 10px; }
          .section-title { font-size: 2rem; color: #333; margin-bottom: 2rem; }
          .team-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; }
          .team-card { background: white; padding: 20px; border-radius: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); transition: transform 0.3s ease; }
          .team-card:hover { transform: scale(1.05); }
          .avatar { width: 100px; height: 100px; border-radius: 50%; margin-bottom: 10px; border: 3px solid #3498db; }
          .role { font-weight: bold; color: #3498db; }
          .social-links img { width: 24px; margin: 5px; cursor: pointer; transition: opacity 0.3s; }
          .social-links img:hover { opacity: 0.7; }
          .about-text ul { list-style: none; padding: 0; text-align: center; }
          .icon { width: 20px; height: 20px; margin-right: 10px; vertical-align: middle; }
        `}
      </style>
    </div>
  );
};

export default AboutUs;
