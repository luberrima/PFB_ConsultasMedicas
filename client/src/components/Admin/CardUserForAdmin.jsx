import React, { useContext } from 'react';
import { Estrellas } from '../Estrellas.jsx';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { validateDoctorService } from '../../services/fetchBackEnd.js';
import { Button } from '../Button.jsx';
import { toast } from 'react-toastify';
import { AuthContext } from '../../contexts/auth/AuthContext.js';

// const staticPath = import.meta.env.VITE_BACKEND_STATIC;

export const CardUserForAdmin = ({ user }) => {
    console.log('Que tenfo en CarAllUserForAdmin como userAll',user);
    const doctor = user.role === 'doctor';
    const validado = user.validate === '1';
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleDeleteUser = async () => {
            
            if (!user.userId || !token) {
                toast.error('Faltan datos para eliminar el diagnostico.');
                return;
            }
            const deleteUserId = user.userId
    
            try {
                const response = await validateDoctorService(
                    deleteUserId,
                    token
                );
    
                if (response.ok) {
                   
                    toast.success('Usuario eliminado correctamente');
    
                    setTimeout(() => {
                        Navigate('/');
                    }, 2000);
                } else {
                    throw new Error('No se pudo eliminar el Usuario');
                }
            } catch (error) {
                console.error('Error al borrar el usuario:', error);
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
                                            handleClick={handleDeleteUser}
                                        >
                                            Valida doctor
                                        </Button>
                    </>
                                )}
                
                
                </li>
            
        </>
    );
};