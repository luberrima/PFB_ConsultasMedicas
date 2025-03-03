import { useContext } from 'react';
import { FormContext } from '../contexts/forms/FormContext.js';

export const useForm = () => {
	const { info, previews, errors, validate, handleChange } =
		useContext(FormContext);

	return {
		info,
		previews,
		errors,
		validate,
		handleChange,
	};
}; ///ahora con useFron tengo todo el contexto