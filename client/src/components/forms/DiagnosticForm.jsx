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
           

            toast.success('Diagnóstico enviado!');
            setTimeout(() => {
                navigate(0);
            }, 3000);
        } catch (error) {
            
        }
    };

    return (
        <Form handleSubmit={handleSubmitDiagnostic} className="diagnostic-form">
            <Input
                type="textarea"
                name="diagnostic"
                rows="7"
                cols="90"
                label=""
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
