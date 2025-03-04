import { useState } from 'react';
import { useForm } from '../../hooks/useForm.js';
import { Button } from '../Button.jsx';
// import { Icon } from '../Icon.jsx';
import { Form } from './Form.jsx';
import { Input } from './Input.jsx';
import { newConsultSchema } from '../../schemas/consultations/newConsultSchema.js';
import { newConsultService } from '../../services/fetchBackEnd.js';
import { useAuth } from '../../hooks/useAuth.js';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ImageInput } from './ImageInput.jsx';

export const ConsultForm = () => {
    const { token } = useAuth();
    const { info, previews, /*errors,*/ validate, handleChange } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();

            validate(newConsultSchema);

            setIsLoading(true);
            const { message /*, data*/ } = await newConsultService(info, token);

            const params = new URLSearchParams({
                type: 'success',
                message,
            });
            toast.success('Consulta registrada');
            setTimeout(() => {
                setIsLoading(false);
                navigate(`/?${params.toString()}`);
            }, 3000);
        } catch (error) {
            setIsLoading(false);
            toast.error(error.message || 'Error al registrar la consulta');
        }
    };
    return (
        <Form className="form" handleSubmit={handleSubmit}>
            <Input
                label="Título de la consulta"
                name="title"
                type="text"
                placeholder="Escribe aquí"
                value={info.title}
                handleChange={handleChange}
            />
            <Input
                label="Especialidad"
                placeholder="Escribe aquí"
                type="number"
                name="skillId"
                value={info.skillId}
                handleChange={handleChange}
            />
            <Input
                label="Gravedad"
                name="gravedad"
                value={info.gravedad}
                handleChange={handleChange}
            />
            <Input
                label="Especialista"
                name="doctorId"
                value={info.doctorId}
                handleChange={handleChange}
            />
            <Input
                label="Descripción"
                type="textarea"
                placeholder="Escribe aquí"
                name="description"
                value={info.description}
                handleChange={handleChange}
            />

            <ImageInput label="Imágenes" name="images" previews={previews} />
            <Button
                id="register"
                className="btn btn-azul"
                type="submit"
                isLoading={isLoading}
            >
                {/* <Icon name="send" /> */}
                <span className="text">Consultar</span>
            </Button>
        </Form>
    );
};
