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
	const { info, previews, errors, validate } = useForm();
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		try {
			e.preventDefault();

			validate(newConsultSchema);

			setIsLoading(true);
			const { message, data } = await newConsultService(info, token);

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
		<Form className='new-consult-form' handleSubmit={handleSubmit}>
			<Input label='Title' name='title' value={info.title} />
			<Input label='SkillId' name='skillId' value={info.place} />
            <Input label='Gravedad' name='gravedad' value={info.place} />
			<Input
				label='Description'
				type='textarea'
				name='description'
				value={info.description}
			/>

			<ImageInput label='Image' name='images' previews={previews} />
			<Button
				id='register'
				className='submit'
				type='submit'
				isLoading={isLoading}
			>
				<Icon name='send' />
				<span className='text'>Travel</span>
			</Button>
		</Form>
	);
}