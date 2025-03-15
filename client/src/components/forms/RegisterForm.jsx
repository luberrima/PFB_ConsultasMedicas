import { useNavigate } from 'react-router-dom';
import { Input } from './Input.jsx';
import { Button } from '../Button.jsx';
import { /* useContext, */ useState } from 'react';
// import { newUserSchema } from '../../schemas/users/registerUserSchema.js';
// import { newDoctorSchema } from '../../schemas/users/registerUserDoctorSchema.js';

import { Form } from './Form.jsx';
// import { FormContext } from '../../contexts/forms/FormContext.js';
import {
    registerUserService,
    registerDoctorService,
} from '../../services/fetchBackEnd.js';
import { toast } from 'react-toastify';
import { useForm } from '../../hooks/useForm.js';
import { getallskills } from '../../hooks/getallskills.js';

export const RegisterForm = () => {
    ////////////////////////////////////////////////////////////////////////////////////
    /**
     * Hook personalizado `useForm()` que maneja el estado del formulario.
     * - `userInfo`: Contiene los datos del usuario cuando se registra como paciente.
     * - `doctorInfo`: Contiene los datos cuando se registra como médico.
     * - `errors`: Almacena los errores de validación.
     * - `handleChangeUserInfo`: Función que actualiza los datos del paciente.
     * - `handleChangeDoctorInfo`: Función que actualiza los datos del médico.
     */
    ///////////////////////////////////////////////////////////////////////////////////

    const {
        userInfo,
        errors,
        /* , validate, */ handleChangeUserInfo,
        doctorInfo,
        handleChangeDoctorInfo,
    } = useForm();

    const [isLoading, setIsLoading] = useState(false);
    const [userType, setUserType] = useState('patient'); //Tipo de usuario (paciente/médico)//
    const navigate = useNavigate();
    const { skills } = getallskills(); //Obtiene la lista de habilidades/especialidades//
    const [selectedValue, setSelectedValue] = useState('');

    // Maneja el cambio en la selección de especialidad //
    const handleChange = (event) => {
        doctorInfo.skillId = event.target.value;
        setSelectedValue(event.target.value);
    };

    // Maneja el envío del formulario de registro //
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Validaciones desactivadas temporalmente
            // const schema = userType === 'doctor' ? newDoctorSchema : newUserSchema;
            // const validationResult = validate(schema);
            // if (validationResult) {
            //     toast.error('Hay errores en el formulario');
            //     return;
            // }

            setIsLoading(true);

            // Si es doctor, copia los datos de usuario en doctorInfo//
            doctorInfo.username = userInfo.username;
            doctorInfo.email = userInfo.email;
            doctorInfo.password = userInfo.password;

            // Llamada al servicio de registro según el tipo de usuario//
            const message =
                userType === 'doctor'
                    ? await registerDoctorService(doctorInfo)
                    : await registerUserService(userInfo);

            // Redirige a la pantalla de login después del registro exitoso//
            const params = new URLSearchParams({ type: 'success', message });
            setTimeout(() => {
                navigate(`/login?${params.toString()}`);
                toast.info('Comprueba tu correo para activar tu cuenta');
            }, 2000);
        } catch (error) {
            // Muestra error en caso de fallo en el registro//
            toast.error(error.message || 'Error al registrar el usuario');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Form className="form" handleSubmit={handleSubmit}>
            <span>¿Qué tipo de perfil eres?</span>
            <div className="form-switch">
                <div className="input-radio">
                    <input
                        type="radio"
                        id="radio1"
                        name="userType"
                        value="patient"
                        checked={userType === 'patient'}
                        onChange={() => setUserType('patient')}
                    />{' '}
                    <label htmlFor="radio1" className="radio-btn">
                        Paciente
                    </label>
                </div>
                <div className="input-radio">
                    <input
                        type="radio"
                        id="radio2"
                        name="userType"
                        value="doctor"
                        checked={userType === 'doctor'}
                        onChange={() => setUserType('doctor')}
                    />{' '}
                    <label htmlFor="radio2" className="radio-btn">
                        Médico
                    </label>
                </div>
            </div>

            {/* Campos del formulario */}
            <Input
                label="Nombre de Usuario"
                type="text"
                name="username"
                value={userInfo ? userInfo.username : doctorInfo.username}
                errors={errors}
                handleChange={
                    userInfo ? handleChangeUserInfo : handleChangeDoctorInfo
                }
            />
            <Input
                label="Email"
                type="email"
                name="email"
                value={userInfo ? userInfo.email : doctorInfo.email}
                errors={errors}
                handleChange={
                    userInfo ? handleChangeUserInfo : handleChangeDoctorInfo
                }
            />
            <Input
                label="Contraseña"
                type="password"
                name="password"
                value={userInfo ? userInfo.password : doctorInfo.password}
                errors={errors}
                handleChange={
                    userInfo ? handleChangeUserInfo : handleChangeDoctorInfo
                }
            />

            {/* Campos adicionales si el usuario es doctor */}
            {userType === 'doctor' && (
                <>
                    <div className="form-doc">
                        <Input
                            label="Nº de Colegiad@"
                            type="text"
                            name="collegeNumber"
                            value={doctorInfo.collegeNumber}
                            errors={errors}
                            handleChange={handleChangeDoctorInfo}
                        />
                        <Input
                            label="Fecha de Colegiad@"
                            type="date"
                            name="dateOfCollege"
                            value={doctorInfo.dateOfCollege}
                            errors={errors}
                            handleChange={handleChangeDoctorInfo}
                        />
                    </div>

                    {/* Selector de especialidad médica */}
                    <fieldset>
                        <label htmlFor="selectDoctor">Especialidad</label>
                        <select
                            label="Especialidad"
                            value={selectedValue}
                            onChange={handleChange}
                            className="form-select-input"
                        >
                            <option value="">Selecciona una opción</option>
                            {skills?.data?.skills?.map((skill) => (
                                <option key={skill.id} value={skill.id}>
                                    {skill.Name}
                                </option>
                            ))}
                        </select>
                    </fieldset>
                </>
            )}

            {/* Botón de envío del formulario */}
            <Button
                id="register"
                className="btn btn-azul"
                type="submit"
                isLoading={isLoading}
            >
                <span className="text">Registrarse</span>
            </Button>
        </Form>
    );
};
