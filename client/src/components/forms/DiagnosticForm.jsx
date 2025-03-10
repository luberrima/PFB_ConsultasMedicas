import { useState } from 'react';
import { Button } from '../Button.jsx';
import { Input } from './Input.jsx';
import { Form } from './Form.jsx';
import { updateDiagnosticService } from '../../services/fetchBackEnd.js';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const DiagnosticForm = ({ consultationId, token }) => {
    const [diagnostic, setDiagnostic] = useState('');
    const navigate = useNavigate();

    const handleDiagnosticChange = (event) => {
        setDiagnostic(event.target.value);
    };

    const handleSubmitDiagnostic = async (event) => {
        event.preventDefault();

        try {
            const response = await updateDiagnosticService(
                consultationId,
                token,
                diagnostic
            );
            console.log('Diagnóstico actualizado:', response);

            toast.success('Diagnóstico enviado!');
            setTimeout(() => {
                navigate(0);
            }, 3000);
        } catch (error) {
            console.error('Error al actualizar el diagnóstico:', error);
        }
    };

    return (
        <Form handleSubmit={handleSubmitDiagnostic} className="diagnostic-form">
            <Input
                type="textarea"
                name="diagnostic"
                label="Diagnóstico"
                value={diagnostic}
                handleChange={handleDiagnosticChange}
                placeholder="Escribe el diagnóstico aquí..."
            />
            <Button type="submit" className="btn btn-azul">
                Enviar Diagnóstico
            </Button>
        </Form>
    );
};
