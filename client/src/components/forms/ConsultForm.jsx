import { useState } from 'react';
import { useForm } from '../../hooks/useForm.js';
import { Button } from '../Button.jsx';
import { Icon } from '../Icon.jsx';
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
        <Form className="new-consult-form" handleSubmit={handleSubmit}>
            <Input
                label="title"
                name="title"
                value={info.title}
                handleChange={handleChange}
            />
            <Input
                label="skillId"
                type="number"
                name="skillId"
                value={info.skillId}
                handleChange={handleChange}
            />
            <Input
                label="gravedad"
                name="gravedad"
                value={info.gravedad}
                handleChange={handleChange}
            />
            <Input
                label="doctorId"
                name="doctorId"
                value={info.doctorId}
                handleChange={handleChange}
            />
            <Input
                label="Description"
                type="textarea"
                name="description"
                value={info.description}
                handleChange={handleChange}
            />

            <ImageInput label="Image" name="images" previews={previews} />
            <Button
                id="register"
                className="submit"
                type="submit"
                isLoading={isLoading}
            >
                <Icon name="send" />
                <span className="text">Consultar</span>
            </Button>
        </Form>
    );
};
