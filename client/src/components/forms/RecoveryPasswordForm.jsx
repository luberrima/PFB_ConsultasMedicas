import { useState } from 'react';
import { Form } from './Form.jsx';
import { Input } from './Input.jsx';
import { Button } from '../Button.jsx';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

export const RecoveryPasswordForm = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showInstructions, setShowInstructions] = useState(false);
    const apiPath = import.meta.env.VITE_BACKEND_HOST;

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            const response = await fetch(`${apiPath}/users/password/recovery`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                const result = await response.json();
                toast.success(result.message);
                // En lugar de redirigir, mostramos un mensaje de instrucciones:
                setShowInstructions(true);
            } else {
                const errorResult = await response.json();
                toast.error(errorResult.message || 'Error en la recuperación');
            }
        } catch (error) {
          
            toast.error('Error en la conexión al servidor');
        } finally {
            setIsLoading(false);
        }
    };

    if (showInstructions) {
        return (
            <div className="recovery-pass-answer">
                <p>
                    Se ha enviado un correo a <strong>{email}</strong> con las
                    instrucciones para restablecer tu contraseña.
                </p>
                <p>
                    Revisa también la carpeta de spam. Si no lo recibes,
                    inténtalo de nuevo o comunícate con soporte.
                </p>
                <Link to="/" className="btn btn-azul">
                    Volver a inicio
                </Link>
            </div>
        );
    }

    return (
        <Form handleSubmit={handleSubmit} className="form">
            <Input
                handleChange={(e) => setEmail(e.target.value)}
                label="Correo Electrónico"
                type="email"
                name="email"
                value={email}
                placeholder="Introduce tu correo"
            />
            <Button
                type="submit"
                isLoading={isLoading}
                className="btn btn-azul"
            >
                Recuperar contraseña
            </Button>
        </Form>
    );
};
