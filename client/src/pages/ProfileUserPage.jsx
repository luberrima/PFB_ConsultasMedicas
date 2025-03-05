import { useEffect, useState } from 'react';
import { useUserProfile } from '../hooks/useUser.js';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button.jsx';
import { ChangePasswordForm } from '../components/forms/ChangePasswordForm.jsx';

const staticPath = import.meta.env.VITE_BACKEND_STATIC;

export const ProfileUserPage = () => {
    const { usersOwn, loadingOwn, errorOwn } = useUserProfile();
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (usersOwn && usersOwn.user && usersOwn.user.user && usersOwn.user.user.length > 0) {
            setUser(usersOwn.user.user[0]);
        }
    }, [usersOwn]);

    if (loadingOwn) {
        return <p>Cargando perfil...</p>;
    }

    if (errorOwn) {
        return <p>Error: {errorOwn}</p>;
    }

    if (!user) {
        return (
            <div>
                <p>No se encontró el perfil del usuario.</p>
                <Link to="/" className="navbar-link">
                    Vuelve a Inicio
                </Link>
            </div>
        );
    }

    return (<> 
        <div className="user-profile">
            <h2>Perfil de Usuario</h2>
            <span>
                <h3>Nombre:</h3>
                <p>{user.nombre ? user.nombre : 'No especificado'}</p>
            </span>
            <span>
                <h3>Avatar</h3>
                <img src={`${staticPath}/avatars/${user.id}/${user.avatar}`} alt="Foto usuario" />




                <h3>Username:</h3>
                <p>{user.username}</p>
            </span>
            <span>
                <h3>Email:</h3>
                <p>{user.email}</p>
            </span>
            <span>
                <h3>Contraseña:</h3>
                <p>******</p>
            </span>
            <span>
                <h3>Bio:</h3>
                <p>{user.bio ? user.bio : 'No especificado'}</p>
            </span>
            <Button className="edit-profile-btn">Editar Perfil</Button>
            <ChangePasswordForm email={user.email} />
        </div>
        </>
    );
};
