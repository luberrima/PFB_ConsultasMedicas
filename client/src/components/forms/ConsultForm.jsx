import { useState, useEffect } from 'react';
import { useForm } from '../../hooks/useForm.js';
import { useParams } from 'react-router-dom';
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
import { getAllDoctorBySkill } from '../../hooks/getdoctorbyskill.js';

export const ConsultForm = () => {
    const { token } = useAuth();
    const { info, previews, /*errors,*/ validate, handleChange } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [skills, setSkills] = useState([]);
    const [doctores, setDoctores] = useState([]);
    const [skillSeleccionada, setSkillSeleccionada] = useState('');
    const [doctorSeleccionado, setDoctorSeleccionado] = useState('');
    const { doctorbyskills } = getAllDoctorBySkill();

    useEffect(() => {
        if (doctorbyskills && doctorbyskills.length > 0) {
            // Crear un Map para eliminar duplicados
            const skillsMap = new Map();

            doctorbyskills.forEach((item) => {
                if (!skillsMap.has(item.skillId)) {
                    skillsMap.set(item.skillId, {
                        id: item.skillId,
                        nombre: item.Name,
                    });
                }
            });

            const skillsArray = Array.from(skillsMap.values());
            setSkills(skillsArray);
        }
    }, [doctorbyskills]);

    const handleSkillChange = (e) => {
        const idSkill = e.target.value;
        setSkillSeleccionada(idSkill);
        info.skillId = e.target.value;
        setDoctorSeleccionado('');

        if (idSkill) {
            const doctoresFiltrados = doctorbyskills
                .filter((item) => item.skillId === parseInt(idSkill))
                .map((item) => ({
                    id: item.id,
                    nombre: item.username,
                }));

            setDoctores(doctoresFiltrados);
        } else {
            setDoctores([]);
        }
    };

    const handleDoctorChange = (e) => {
        setDoctorSeleccionado(e.target.value);
        info.doctorId = e.target.value;
    };

    const { urlid, urlskill } = useParams();
    if (!info.doctorId) {
        setTimeout(() => {
            if (urlid && urlskill) {
                setSkillSeleccionada(urlskill);

                const doctoresFiltrados = doctorbyskills
                    .filter((item) => item.skillId === parseInt(urlskill))
                    .map((item) => ({
                        id: item.id,
                        nombre: item.username,
                    }));

                setDoctores(doctoresFiltrados);

                setDoctorSeleccionado(urlid);
                info.doctorId = urlid;
                info.skillId = urlskill;
            }
        }, 1000);
    }

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
        <Form
            className="form new-consultation-form"
            handleSubmit={handleSubmit}
        >
            <Input
                label="Título de la consulta"
                name="title"
                type="text"
                placeholder="Escribe aquí"
                value={info.title}
                handleChange={handleChange}
            />

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
                <label htmlFor="selectSkill">Especialidad</label>
                <select
                    id="selectSkill"
                    value={skillSeleccionada}
                    onChange={handleSkillChange}
                    className="form-select-input"
                >
                    <option value="">Seleccione una especialidad</option>
                    {skills.map((skill) => (
                        <option key={skill.id} value={skill.id}>
                            {skill.nombre}
                        </option>
                    ))}
                </select>
            </fieldset>

            <fieldset>
                <label htmlFor="selectDoctor">Doctor</label>
                <select
                    id="selectDoctor"
                    value={doctorSeleccionado}
                    onChange={handleDoctorChange}
                    className="form-select-input"
                    disabled={!skillSeleccionada}
                >
                    <option value="">Seleccione un doctor</option>
                    {doctores.map((doctor) => (
                        <option key={doctor.id} value={doctor.id}>
                            {doctor.nombre}
                        </option>
                    ))}
                </select>
            </fieldset>

            <Input
                label="Descripción"
                type="text"
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
