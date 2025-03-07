import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form } from '../components/forms/Form.jsx';
import { Input } from '../components/forms/Input.jsx';
import { Button } from '../components/Button.jsx';
import { toast } from 'react-toastify';

export const NewPasswordPage = () => {
    const { recoveryPassCode } = useParams();
    const [newPass, setNewPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const apiPath = import.meta.env.VITE_BACKEND_HOST;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPass !== confirmPass) {
            toast.error('Las contraseñas no coinciden');
            return;
        }
        setIsLoading(true);
        try {
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
                navigate('/login');
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
            <h2>Restablecer Contraseña</h2>
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
            </Form>
        </div>
    );
};
