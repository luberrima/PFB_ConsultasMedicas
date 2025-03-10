import { useEffect, useState } from 'react';
import { useUserProfile } from '../hooks/useUser.js';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button.jsx';
import { useNavigate } from 'react-router-dom';
const staticPath = import.meta.env.VITE_BACKEND_STATIC;

export const ProfileUserPage = () => {
    const navigate = useNavigate();
    const { usersOwn, loadingOwn, errorOwn } = useUserProfile();
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (
            usersOwn &&
            usersOwn.data &&
            usersOwn.data.user &&
            usersOwn.data.user.user &&
            usersOwn.data.user.user.length > 0
        ) {
            setUser(usersOwn.data.user.user[0]);
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

    return (
        <>
            <section className="ficha-user">
                <h1 className="page-title">Perfil de Usuario</h1>
                <article className="ficha-user-container">
                    <article className="ficha-user-img">
                        <img
                            src={`${staticPath}/avatars/${user.id}/${user.avatar}`}
                            alt="Foto usuario"
                        />
                    </article>

                    <article className="ficha-user-info">
                        <ul>
                            <li>
                                <h3>Nombre</h3>
                                <p>
                                    {user.nombre
                                        ? user.nombre
                                        : 'No especificado'}
                                </p>
                            </li>
                            <li>
                                <h3>Username</h3>
                                <p>{user.username}</p>
                            </li>
                            <li>
                                <h3>Biografía</h3>
                                <p>{user.bio ? user.bio : 'No especificado'}</p>
                            </li>
                            <li>
                                <h3>Email</h3>
                                <p>{user.email}</p>
                            </li>
                            <li className="ficha-user-edit-contraseña">
                                <h3>Contraseña</h3>
                                <p>******</p>
                                <Button
                                    handleClick={() =>
                                        navigate('/password-recovery')
                                    }
                                    className="btn btn-naranja"
                                >
                                    Cambiar Contraseña
                                </Button>
                            </li>
                            <li>
                                <Button
                                    handleClick={() =>
                                        navigate('/profile/edit')
                                    }
                                    className="btn btn-azul"
                                >
                                    Editar Perfil
                                </Button>
                            </li>
                        </ul>
                    </article>
                </article>
            </section>
        </>
    );
};
