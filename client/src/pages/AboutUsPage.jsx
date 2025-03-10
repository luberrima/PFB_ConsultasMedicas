import React from 'react';
import javi from '../assets/team/javi.jpg';
import lucia from '../assets/team/lucia.jpg';
import rafa from '../assets/team/rafa.jpg';
import damaris from '../assets/team/damaris.jpg';
import alejandro from '../assets/team/alejandro.jpg';
import fran from '../assets/team/fran.jpg';
import appleIcon from '../assets/favicon/favicon.svg';

const teamMembers = [
    {
        name: 'Javi Navarro',
        role: 'Animador Estratega',
        description:
            "Javi siempre tiene ideas revolucionarias que pueden cambiar el mundo... o romper el servidor en el intento. Su frase favorita es '¿Y si lo hacemos más grande?'",
        avatar: javi,
        github: 'https://github.com/JavierNavarroRobles',
        linkedin: 'https://www.linkedin.com/in/javier-navarro-robles-948990ab/',
    },
    {
        name: 'Lucía Franco',
        role: 'Diseño y Coordinación',
        description:
            'Lucía mantiene todo en orden. Si el código colapsa, al menos el caos está bien organizado.También es la razón por la que la plataforma no se ve como una página de los años 90.',
        avatar: lucia,
        github: 'https://github.com/luberrima',
        linkedin:
            'https://www.linkedin.com/in/luberrima?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app',
    },
    {
        name: 'Rafa López',
        role: 'Backend y Seguridad',
        description:
            'Rafa es el encargado de que todo funcione sin problemas... en teoría. Si ves a Rafa en silencio... es señal de que algo grave está pasando, pero sabemos que siempre encuentra una gran solución',
        avatar: rafa,
        github: 'https://github.com/RafVianney',
        linkedin: '#',
    },
    {
        name: 'Dámaris Mercado',
        role: 'Detective de Logs y Errores',
        description:
            'Dámaris tiene un don especial: puede leer logs como si fueran novelas de misterio y siempre encuentra al culpable.',
        avatar: damaris,
        github: 'https://github.com/Damarisconweb',
        linkedin: 'https://www.linkedin.com/in/damariscontilde/',
    },
    {
        name: 'Alejandro Andrés',
        role: 'Integraciones y Base de Datos',
        description:
            "Ale es el encargado de que todo se comunique correctamente. Si una consulta tarda más de lo normal, lo verás escribiendo en Stack Overflow con cara de 'esto no debería estar pasando'.",
        avatar: alejandro,
        github: 'https://github.com/Vikingracer89',
        linkedin:
            'https://www.linkedin.com/in/alejandro-andres-sorribas-436868152?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
    },
    {
        name: 'Fran Bejarano',
        role: 'Simplificación y Optimización',
        description:
            'Fran ha optimizado más código del que podemos contar. Si algo se puede hacer en la mitad de líneas, él ya lo redujo antes de que lo pidieras.',
        avatar: fran,
        github: 'https://github.com/Franollie',
        linkedin: '#',
    },
];

export const AboutUsPage = () => {
    return (
        <div className="about-container">
            <section className="team-section">
                <h1 className="page-title">Conoce al Equipo</h1>
                <div className="team-grid">
                    {teamMembers.map((member, index) => (
                        <div key={index} className="team-card">
                            <img
                                src={member.avatar}
                                alt={member.name}
                                className="avatar"
                            />
                            <h3>{member.name}</h3>
                            <p className="role">{member.role}</p>
                            <p>{member.description}</p>
                            <div className="social-links">
                                <a
                                    href={member.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <img
                                        src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                                        alt="GitHub"
                                    />
                                </a>
                                {member.linkedin !== '#' && (
                                    <a
                                        href={member.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <img
                                            src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
                                            alt="LinkedIn"
                                        />
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="about-text">
                <span>
                    <h2 className="page-title-2">Sobre Nosotros</h2>
                    <p>
                        Somos un equipo de programadores apasionados por la
                        tecnología y la salud...
                    </p>
                </span>
                <span>
                    <h2 className="page-title-2">Nuestra Misión</h2>
                    <p>
                        Facilitar el acceso a la atención médica a través de
                        nuestra plataforma...
                    </p>
                </span>
                <span>
                    <h2 className="page-title-2">Nuestra Visión</h2>
                    <p>
                        Crear una plataforma donde médicos y pacientes puedan
                        interactuar de manera sencilla...
                    </p>
                </span>
                <span>
                    <h2 className="page-title-2">Nuestros Valores</h2>
                    <ul>
                        <li>
                            <img src={appleIcon} alt="icono" className="icon" />{' '}
                            <p>
                                <b>Innovación:</b> Nos encanta explorar nuevas
                                soluciones para mejorar la salud de las personas
                            </p>
                        </li>
                        <li>
                            <img src={appleIcon} alt="icono" className="icon" />{' '}
                            <p>
                                <b>Seguridad:</b> Protegemos la información
                                médica con los más altos estándares.
                            </p>
                        </li>
                        <li>
                            <img src={appleIcon} alt="icono" className="icon" />{' '}
                            <p>
                                <b>Usabilidad:</b> Diseñamos pensando en el
                                usuario.
                            </p>
                        </li>
                        <li>
                            <img src={appleIcon} alt="icono" className="icon" />{' '}
                            <p>
                                <b>Trabajo en equipo:</b> Cada línea de código
                                es un esfuerzo conjunto.
                            </p>
                        </li>
                        <li>
                            <img src={appleIcon} alt="icono" className="icon" />{' '}
                            <p>
                                <b>Café:</b> Es el motor que impulsa nuestro
                                desarrollo (quizás demasiado)
                            </p>
                        </li>
                    </ul>
                </span>
            </section>
        </div>
    );
};
