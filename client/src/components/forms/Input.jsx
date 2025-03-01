import { useState } from 'react';
import { Button } from '../Button.jsx';
import { Icon } from '../Icon.jsx';
import { useForm } from '../../hooks/useForm.js';

export const Input = ({ label, type = 'text', name, value = '' }) => {
	const { errors, handleChange } = useForm();
	const [showPassword, setShowPassword] = useState(false);
	const [inputType, setInputType] = useState(type);

	const handleClick = () => {
		setShowPassword(!showPassword);
		setInputType(showPassword ? 'password' : type);
	};

	const error = errors.find((error) => error.context.key === name);
	return (
		<label className={error ? 'label-error' : ''}>
			<span className='label-content'>{label}</span>
			<div>
				{type === 'textarea' ? (
					<textarea
						name={name}
						value={value}
						placeholder={label}
						autoComplete={`new-${name}`}
						onChange={handleChange}
					></textarea>
				) : (
					<input
						type={inputType}
						name={name}
						value={value}
						placeholder={label}
						autoComplete={`new-${name}`}
						onChange={handleChange}
					/>
				)}
				{type === 'password' && (
					<Button
						id='viewPassword'
						className='visibility'
						handleClick={handleClick}
					>
						<Icon name={showPassword ? 'visibility_off' : 'visibility'} />
					</Button>
				)}
			</div>
			<span className='inputError' id={`error-${name}`}>
				{errors?.map((error) => {
					if (error.context.key === name) {
						return error.message;
					}
					return null;
				})}
			</span>
		</label>
	);
};
