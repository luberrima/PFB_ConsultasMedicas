import { useNavigate } from 'react-router-dom';
import { Input } from './Input.jsx';
import { Button } from '../Button.jsx';
import { useContext, useState } from 'react';
import { newUserSchema } from '../../schemas/users/registerUserSchema.js';
import { newDoctorSchema } from '../../schemas/users/registerUserDoctorSchema.js';
import { Icon } from '../Icon.jsx';
import { Form } from './Form.jsx';
import { FormContext } from '../../contexts/forms/FormContext.js';
import { registerUserService, registerDoctorService } from '../../services/fetchBackEnd.js';
import { toast } from 'react-toastify';

export const RegisterForm = () => {
    const { info, errors, validate, handleChange } = useContext(FormContext);
    const [isLoading, setIsLoading] = useState(false);
    const [userType, setUserType] = useState('patient');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const schema = userType === 'doctor' ? newDoctorSchema : newUserSchema;
            const value = validate(schema);
            setIsLoading(true);

            const message = userType === 'doctor' 
                ? await registerDoctorService(value) 
                : await registerUserService(value);

            const params = new URLSearchParams({ type: 'success', message });
            setTimeout(() => {
                navigate(`/login?${params.toString()}`);
                toast.info('Comprueba tu correo para activar tu cuenta');
            }, 6000);
        } catch (error) {
            toast.error(error.message || 'Error al registrar el usuario');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Form className='register-form' handleSubmit={handleSubmit}>
            <div className='user-type-switch'>
                <label>
                    <input type='radio' name='userType' value='patient' 
                        checked={userType === 'patient'} 
                        onChange={() => setUserType('patient')} /> Paciente
                </label>
                <label>
                    <input type='radio' name='userType' value='doctor' 
                        checked={userType === 'doctor'} 
                        onChange={() => setUserType('doctor')} /> Médico
                </label>
            </div>
            <Input label='User Name' type='text' name='username' value={info.username} errors={errors} handleChange={handleChange} />
            <Input label='Email' type='email' name='email' value={info.email} errors={errors} handleChange={handleChange} />
            <Input label='Password' type='password' name='password' value={info.password} errors={errors} handleChange={handleChange} />
            {userType === 'doctor' && (
                <>
                    <Input label='College Number' type='text' name='collegeNumber' value={info.collegeNumber} errors={errors} handleChange={handleChange} />
                    <Input label='Date of College' type='date' name='dateOfCollege' value={info.dateOfCollege} errors={errors} handleChange={handleChange} />
                    <Input label='Skill ID' type='number' name='skillId' value={info.skillId} errors={errors} handleChange={handleChange} />
                </>
            )}
            <Button id='register' className='submit' type='submit' isLoading={isLoading}>
                <Icon name='send' />
                <span className='text'>Register</span>
            </Button>
        </Form>
    );
};