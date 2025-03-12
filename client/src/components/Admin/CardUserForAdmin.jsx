import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    deleteUserService,
    validateDoctorService,
} from '../../services/fetchBackEnd.js';
import { Button } from '../Button.jsx';
import { toast } from 'react-toastify';
import { AuthContext } from '../../contexts/auth/AuthContext.js';

// const staticPath = import.meta.env.VITE_BACKEND_STATIC;

export const CardUserForAdmin = ({ user, refreshLink }) => {
    /* console.log('Que tenfo en CarAllUserForAdmin como userAll',user); */
    const doctor = user.role === 'doctor';
    const validado = user.validate === '1';
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleValidateUser = async () => {
        const userId = user.userId;
        if (!user.userId || !token) {
            toast.error('Faltan datos para validar el doctor.');
            return;
        }
        try {
            const response = await validateDoctorService(userId, token);
            if (response.ok) {
                toast.success('Doctor validado correctamente');
                refreshLink((prev) => prev + 1);
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            } else {
                throw new Error('No se pudo validar el doctor');
            }
        } catch (error) {
            console.error('Error al validar el doctor:', error);
            toast.error('Hubo un problema al validar el doctor');
        }
    };
    const handleDeleteUser = async () => {
        const userId = user.userId;
        if (!user.userId || !token) {
            toast.error('Faltan datos para Eliminar usuario.');
            return;
        }
        try {
            const response = await deleteUserService(userId, token);
            if (response.ok) {
                toast.success('Usuario Eliminado correctamente');
                refreshLink((prev) => prev + 1);
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            } else {
                throw new Error('No se pudo eliminar el usuario');
            }
        } catch (error) {
            console.error('Error al eliminar el usuario:', error);
            toast.error('Hubo un problema al eliminar el usuario');
        }
    };

    return (
        <>
            <li className="admin-user-card">
                <span>
                    <h4>Usuario</h4>
                    <p>{user.username}</p>
                </span>
                <span>
                    <h4>ID</h4>
                    <p>{user.userId}</p>
                </span>
                <span>
                    <h4>Email</h4>
                    <p>{user.email}</p>
                </span>
                <span>
                    <h4>Usuario Activo</h4>
                    <p>{user.active}</p>
                </span>
                <span>
                    <h4>Rol</h4>
                    <p>{user.role}</p>
                </span>

                {doctor && (
                    <>
                        <span>
                            <h4>Doctor Validado</h4>
                            <p>{user.validate}</p>
                        </span>
                        <span>
                            <h4>Especialidad</h4>
                            <p>{user.Especialidad}</p>
                        </span>
                        <span>
                            <h4>Nº de Colegiado</h4>
                            <p>{user.collegeNumber}</p>
                        </span>
                        <span>
                            <h4>Fecha de Colegiado</h4>
                            <p>{user.validate}</p>
                        </span>
                    </>
                )}
                <span className="admin-user-card-btns">
                    {doctor && !(user.validate === 1) && (
                        <>
                            <Button
                                className="btn btn-azul"
                                handleClick={handleValidateUser}
                            >
                                Validar doctor
                            </Button>
                        </>
                    )}
                    <Button
                        className="btn btn-naranja"
                        handleClick={handleDeleteUser}
                    >
                        Eliminar Usuario
                    </Button>
                </span>
            </li>
        </>
    );
};
