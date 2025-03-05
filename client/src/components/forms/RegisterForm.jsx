import { useNavigate } from 'react-router-dom';
import { Input } from './Input.jsx';
import { Button } from '../Button.jsx';
import { /* useContext, */ useState } from 'react';
// import { newUserSchema } from '../../schemas/users/registerUserSchema.js';
// import { newDoctorSchema } from '../../schemas/users/registerUserDoctorSchema.js';
import { Icon } from '../Icon.jsx';
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
        <Form className="register-form" handleSubmit={handleSubmit}>
            <div className="user-type-switch">
                <label>
                    <input
                        type="radio"
                        name="userType"
                        value="patient"
                        checked={userType === 'patient'}
                        onChange={() => setUserType('patient')}
                    />{' '}
                    Paciente
                </label>
                <label>
                    <input
                        type="radio"
                        name="userType"
                        value="doctor"
                        checked={userType === 'doctor'}
                        onChange={() => setUserType('doctor')}
                    />{' '}
                    Médico
                </label>
            </div>

            <Input
                label="User Name"
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
                label="Password"
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
                        label="College Number"
                        type="text"
                        name="collegeNumber"
                        value={doctorInfo.collegeNumber}
                        errors={errors}
                        handleChange={handleChangeDoctorInfo}
                    />
                    <Input
                        label="Date of College"
                        type="date"
                        name="dateOfCollege"
                        value={doctorInfo.dateOfCollege}
                        errors={errors}
                        handleChange={handleChangeDoctorInfo}
                    />
                    <Input
                        label="Skill ID"
                        type="number"
                        name="skillId"
                        value={doctorInfo.skillId}
                        errors={errors}
                        handleChange={handleChangeDoctorInfo}
                    />
                </>
            )}
            <Button
                id="register"
                className="submit"
                type="submit"
                isLoading={isLoading}
            >
                <Icon name="send" />
                <span className="text">Register</span>
            </Button>
        </Form>
    );
};
