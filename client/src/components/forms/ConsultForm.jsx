import { useState, useEffect } from 'react';
import { useForm } from '../../hooks/useForm.js';
import { Button } from '../Button.jsx';
// import { Icon } from '../Icon.jsx';
import { Form } from './Form.jsx';
import { Input } from './Input.jsx';
import { newConsultSchema } from '../../schemas/consultations/newConsultSchema.js';
import { newConsultService, getDoctorsBySkill } from '../../services/fetchBackEnd.js';
import { useAuth } from '../../hooks/useAuth.js';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ImageInput } from './ImageInput.jsx';

export const ConsultForm = () => {
    const { token } = useAuth();
    const { info, previews, validate, handleChange } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [doctors, setDoctors] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        console.log("skillid :", info.skillId)
        const fetchDoctors = async () => {
            if (info.skillId) {
                try {
                    const data = await getDoctorsBySkill(info.skillId, token);
                    setDoctors(data);
                    console.log("Respuesta de la API:", data);
                } catch (error) {
                    toast.error(error.message || 'Error al cargar los médicos');
                }
            } else {
                setDoctors([]);
            }
        };
        fetchDoctors();
    }, [info.skillId, token]);

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            validate(newConsultSchema);
            setIsLoading(true);
            const { message } = await newConsultService(info, token);

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

            <fieldset>
                <label>Especialidad</label>
                <select
                    name="skillId"
                    value={info.skillId}
                    onChange={handleChange}
                    className="form-select-input"
                >
                    <option value="">Selecciona una especialidad</option>
                    <option value="1">1 - General</option>
                    <option value="2">2 - Urólogo</option>
                    <option value="3">3 - Traumatismos</option>
                    <option value="4">4 - Cardiología</option>
                    <option value="5">5 - Otorrinolaringólogo</option>
                    <option value="6">6 - Anestesia</option>
                </select>
            </fieldset>

            <fieldset>
                <label>Gravedad</label>
                <select
                    name="gravedad"
                    value={info.gravedad}
                    onChange={handleChange}
                    className="form-select-input"
                >
                    <option value="">Selecciona la gravedad</option>
                    <option value="Leve">Leve</option>
                    <option value="Normal">Normal</option>
                    <option value="Moderada">Moderada</option>
                    <option value="Grave">Grave</option>
                    <option value="Urgente">Urgente</option>
                </select>
            </fieldset>

            <fieldset>
                <label>Especialista (opcional)</label>
                <select
                    name="doctorId"
                    value={info.doctorId || ''}
                    onChange={handleChange}
                    className="form-select-input"
                >
                    <option value="">Selecciona un especialista</option>
                    {doctors.map((doctor) => (
                        <option key={doctor.id} value={doctor.id}>
                            {doctor.nombre}
                        </option>
                    ))}
                </select>
            </fieldset>

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
                <span className="text">Consultar</span>
            </Button>
        </Form>
    );
};