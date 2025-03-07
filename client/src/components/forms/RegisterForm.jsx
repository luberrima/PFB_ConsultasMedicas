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

export const RegisterForm = () => {
    const {
        userInfo,
        errors,
        /* , validate, */ handleChangeUserInfo,
        doctorInfo,
        handleChangeDoctorInfo,
    } = useForm();

    console.log('info:', userInfo);

    const [isLoading, setIsLoading] = useState(false);
    const [userType, setUserType] = useState('patient');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {


            console.log('hasta aqui llega el try1');
            // const schema =
            //     userType === 'doctor' ? newDoctorSchema : newUserSchema;
            console.log('hasta aqui llega el try2');

            // const validationResult = validate(schema);
            console.log('hasta aqui llega el try3');

            // if (validationResult) {
            //     // Si hay errores, no continuamos
            //     toast.error('Hay errores en el formulario');
            //     return;
            // }
            console.log('hasta aqui llega el try4');

            setIsLoading(true);
            console.log('hasta aqui llega el try5');

          
            doctorInfo.username=userInfo.username;
            doctorInfo.email=userInfo.email;
            doctorInfo.password=userInfo.password;
            

            const message =
                userType === 'doctor'
                    ? await registerDoctorService(doctorInfo)
                    : await registerUserService(userInfo);
            console.log('hasta aqui llega el try6');

            const params = new URLSearchParams({ type: 'success', message });
            setTimeout(() => {
                navigate(`/login?${params.toString()}`);
                toast.info('Comprueba tu correo para activar tu cuenta');
            }, 2000);
            console.log('hasta aqui llega el try7');
        } catch (error) {
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
            {userType === 'doctor' && (
                <>
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
                    <fieldset>
                <label>Especialidad</label>
                <select
                    name="skillId"
                    value={doctorInfo.skillId}
                    onChange={handleChangeDoctorInfo}
                    className="form-select-input"
                >
                    <option value="">Selecciona una especialidad</option>
                    <option value="1" title="General">
                        1 - General
                    </option>
                    <option value="2" title="Urólogo">
                        2 - Urólogo
                    </option>
                    <option value="3" title="Traumatismos">
                        3 - Traumatismos
                    </option>
                    <option value="4" title="Cardiología">
                        4 - Cardiología
                    </option>
                    <option value="5" title="Otorrinolaringólogo">
                        5 - Otorrinolaringólogo
                    </option>
                    <option value="6" title="Anestesia">
                        6 - Anestesia
                    </option>
                </select>
            </fieldset>
                </>
            )}
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
