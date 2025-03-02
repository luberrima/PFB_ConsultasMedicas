import { useContext } from 'react';
import { AuthContext } from '../contexts/auth/AuthContext.js';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button } from './Button.jsx';

export const LogOutButton = () => {
    const { onLogOut } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        onLogOut();
        toast.info('Has cerrado sesión');
        navigate('/login'); // Redirigir al login
    };

    return (
        <Button
            id="logout-btn"
            className="btn btn-naranja btn-logout"
            handleClick={handleLogout}
        >
            Cerrar Sesión
        </Button>
    );
};
