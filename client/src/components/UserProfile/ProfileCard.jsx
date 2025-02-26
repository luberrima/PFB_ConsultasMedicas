import './ProfileCard.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useUser } from '../../UserContext';

function ProfileCard({ avatar, nombre, username, email }) {
    const [createdConsultsCount, setCreatedConsultsCount] = useState(0);
    const [user] = useUser();

    const URL_BACK = import.meta.env.VITE_URL_BACK;

    useEffect(() => {
        const fetchCreatedMeetups = async () => {
            try {
                const response = await fetch(`${URL_BACK}/consultations`);
                if (!response.ok) {
                    throw new Error('Error fetching consultations');
                }
                const data = await response.json();

                const createdConsults = data.data.filter(
                    (consult) => consult.userId === user.id
                );
                setCreatedConsultsCount(createdConsults.length);
            } catch (err) {
                console.error('Error fetching created consults:', err);
            }
        };

        fetchCreatedConsults();
    }, [user.id]);

    return (
        <div id="profileCard">
            <div
                id="datosUsuarioContainer"
                style={{
                    backgroundImage: avatar
                        ? `url(${URL_BACK}/uploads/${avatar})`
                        : null,
                }}
            >
                <Link to="/user/avatar">
                    <button id="botonCambioAvatar">Editar avatar</button>
                </Link>
                <div id="datosUsuario">
                    <p>
                        {username.charAt(0).toUpperCase() + username.slice(1)}
                    </p>
                    <p>
                        {`${nombre.charAt(0).toUpperCase() + nombre.slice(1)}`}
                    </p>

                    <p>{email}</p>
                </div>
            </div>
            <div id="contenedorDatosConsultasUsuario">
                <div id="ConsultasEnPosesion">
                    <p>{createdConsultsCount}</p>
                    <p>Creados por usted</p>
                </div>
            </div>
        </div>
    );
}

export default ProfileCard;

ProfileCard.propTypes = {
    avatar: PropTypes.string,
    nombre: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    bio: PropTypes.isRequired,
};
