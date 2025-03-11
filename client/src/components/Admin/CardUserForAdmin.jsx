import React, { useContext } from 'react';
import {  useNavigate } from 'react-router-dom';
import { deleteUserService, validateDoctorService } from '../../services/fetchBackEnd.js';
import { Button } from '../Button.jsx';
import { toast } from 'react-toastify';
import { AuthContext } from '../../contexts/auth/AuthContext.js';

// const staticPath = import.meta.env.VITE_BACKEND_STATIC;

export const CardUserForAdmin = ({ user,refreshLink }) => {
    /* console.log('Que tenfo en CarAllUserForAdmin como userAll',user); */
    const doctor = user.role === 'doctor';
    const validado = user.validate === '1';
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleValidateUser = async () => {
            const userId = user.userId
            if (!user.userId || !token) {
                toast.error('Faltan datos para validar el doctor.');
                return;
            }
            try {
                const response = await validateDoctorService(
                    userId,
                    token
                );
                if (response.ok) {
                   
                    toast.success('Doctor validado correctamente');
                    refreshLink(prev => prev + 1);
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
            const userId = user.userId
            if (!user.userId || !token) {
                toast.error('Faltan datos para Eliminar usuario.');
                return;
            }
            try {
                const response = await deleteUserService(
                    userId,
                    token
                );
                if (response.ok) {
                   
                    toast.success('Usuario Eliminado correctamente');
                    refreshLink(prev => prev + 1);
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
            
                <li >
                <p>Usuario es:{user.username}</p> 
                <p>la id del usuario es:{user.userId}</p>
                <p>email es:{user.email}</p> 
                <p>Estado de Activo es:{user.active}</p>
                <p>Rol es:{user.role}</p>
                <Button
                    className="btn btn-naranja"
                    handleClick={handleDeleteUser}
                >
                    Eliminar Usuario
                </Button>
                
                {doctor &&(
                    <>
                        <p>Estado de Validacion es:{user.validate}</p>
                        <p>Su especialidad es:{user.Especialidad}</p>
                        <p>Numero de colegiado es:{user.collegeNumber}</p>
                        <p>Fecha de colegiado es:{user.validate}</p>
                                    
                    </>
                                )}
                {doctor && !(user.validate ===1) &&(
                    <>
        
                        <Button
                            className="btn btn-naranja"
                            handleClick={handleValidateUser}
                        >
                            Validar doctor
                        </Button>
                    </>
                                )}
                
                
                </li>
            
        </>
    );
};
