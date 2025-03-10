import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Form } from '../components/forms/Form.jsx';
import { Input } from '../components/forms/Input.jsx';
import { Button } from '../components/Button.jsx';
import { toast } from 'react-toastify';
import logo from '../assets/good-doctor-logo-navbar.svg';
import '../components/forms/forms.css';

export const NewPasswordPage = () => {
    const { recoveryPassCode } = useParams(); // El código viene desde el enlace enviado por email
    const [newPass, setNewPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const apiPath = import.meta.env.VITE_BACKEND_HOST;

    useEffect(() => {
        document.body.classList.add('no-header-footer');
        return () => {
            document.body.classList.remove('no-header-footer');
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Verificar que ambas contraseñas coincidan
        if (newPass !== confirmPass) {
            toast.error('Las contraseñas no coinciden');
            return;
        }
        setIsLoading(true);
        try {
            // Se hace la petición PUT al endpoint '/users/password/edit'
            const response = await fetch(`${apiPath}/users/password/edit`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    recoveryPassCode,
                    newPass,
                }),
            });
            if (response.ok) {
                const result = await response.json();
                toast.success(
                    result.message || 'Contraseña actualizada correctamente'
                );
                navigate('/login'); // Redirige al login después de actualizar la contraseña
            } else {
                const errorResult = await response.json();
                toast.error(
                    errorResult.message || 'Error al actualizar la contraseña'
                );
            }
        } catch (error) {
            console.error('Error en la conexión:', error);
            toast.error('Error en la conexión al servidor');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="new-password-page">
            <Link to="/">
                <img className="logo" src={logo} alt="Good Doctor Logo" />
            </Link>
            <div className="form-card">
                <h1>Restablecer Contraseña</h1>
                <Form handleSubmit={handleSubmit} className="form">
                    <Input
                        handleChange={(e) => setNewPass(e.target.value)}
                        label="Nueva Contraseña"
                        type="password"
                        name="newPass"
                        value={newPass}
                        placeholder="Escribe tu nueva contraseña"
                    />
                    <Input
                        handleChange={(e) => setConfirmPass(e.target.value)}
                        label="Confirmar Contraseña"
                        type="password"
                        name="confirmPass"
                        value={confirmPass}
                        placeholder="Confirma tu nueva contraseña"
                    />
                    <Button
                        type="submit"
                        isLoading={isLoading}
                        className="btn btn-azul"
                    >
                        Actualizar Contraseña
                    </Button>
                    <p>
                        <Link to="/" className="form-link-inicio">
                            Volver a Inicio
                        </Link>
                    </p>
                </Form>
            </div>
        </div>
    );
};
