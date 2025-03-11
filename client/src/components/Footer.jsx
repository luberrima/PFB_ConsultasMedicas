import { Link } from 'react-router-dom';
import logo from '../assets/good-doctor-logo.svg';
import { Icon } from './Icon.jsx';

export const Footer = () => {
    return (
        <div className="footer">
            <img src={logo} alt="" />
            <ul>
                <li>
                    <Icon name="share" />
                </li>
                <li>
                    <Icon name="notifications" />
                </li>
                <li>
                    <Icon name="settings" />
                </li>
            </ul>
            <nav>
                <ul>
                    <li>
                        <Link to="/about" className="footer-link">
                            About
                        </Link>
                    </li>
                    <li>
                        <Link to="/contacto" className="footer-link">
                            Contacto
                        </Link>
                    </li>
                    <li>
                        <Link to="/aviso-legal" className="footer-link">
                            Aviso Legal
                        </Link>
                    </li>
                </ul>
            </nav>
            <p>
                Hecho con 🖤 por Lucía Franco, Javi Navarro, Alejandro Andrés,
                Rafa López, Dámaris Mercado y Fran Bejarano
            </p>
        </div>
    );
};
