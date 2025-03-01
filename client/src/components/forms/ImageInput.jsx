import { useForm } from '../../hooks/useForm.js';
import archi from '../../assets/archi.jpg';
import { Preview } from './Preview.jsx';
export const ImageInput = ({ label, name, previews }) => {
	const { errors, handleChange } = useForm();

	const error = errors.find((error) => error.context.key === name);
	return (
		<fieldset className={`${error ? 'legend-error' : ''}`}>
			<legend className='legend-content'>{label}</legend>
			<label>
				<div className='input-container'>
					<input
						className='hidden'
						type='file'
						name={name}
						placeholder={label}
						autoComplete={`new-${name}`}
						multiple
						onChange={handleChange}
					/>
					<img src={archi} alt='Subida de archivos' />
				</div>
			</label>
           
			{previews.length > 0 && (
				<ul className='previews-container'>
					{previews.map((preview, index) => (
						<Preview key={index} preview={preview} index={index} />
					))}
				</ul>
			)}
			<span className='inputError' id={`error-${name}`}>
				{error && error.message.replaceAll('\\', '')}
			</span>
		</fieldset>
	);
};
