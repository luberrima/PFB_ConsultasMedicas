import './ProfileCard.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useUser } from '../../contexts/userContext';

export function ProfileCard({ avatar, nombre, username, email }) {
    
    const [user] = useUser();

    const URL_BACK = import.meta.env.VITE_BACKEND_STATIC;

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
                        {`${
                            nombre.charAt(0).toUpperCase() +
                            nombre.slice(1)
                        }`}
                    </p>
                    
                    <p>{email}</p>
                </div>
            </div>
            
        </div>
    );
};

ProfileCard.propTypes = {
    avatar: PropTypes.string,
    nombre: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
};
