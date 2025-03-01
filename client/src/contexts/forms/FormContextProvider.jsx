import { useState } from 'react';
import { FormContext } from './FormContext.js';
import { validateSchemaUtil } from '../../utils/validateSchemaUtil.js';

export const FormContextProvider = ({ children }) => {
	const [info, setInfo] = useState({});
	const [previews, setPreviews] = useState([]);
	const [errors, setErrors] = useState([]);

	const validate = (schema) => {
		const { value, error } = validateSchemaUtil(schema, info);

		if (error) {
			setErrors(error.details);
		} else {
			setErrors([]);
		}

		return value;
	};

	const handleChange = (e) => {
		const { type, name, value, files } = e.target;
		if (type === 'file') {
			setInfo((prev) => {
				const updateInfo = { ...prev };
				delete updateInfo.img1;
				delete updateInfo.img2;
				delete updateInfo.img3;
                delete updateInfo.img4;

				return updateInfo;
			});

			const selectFiles = Array.from(files).slice(0, 4);

			const updateInfo = {};

			const newPreviews = selectFiles.map((file, index) => {
				updateInfo[`img${index + 1}`] = file;
				return URL.createObjectURL(file);
			});

			setInfo((prev) => ({ ...prev, ...updateInfo }));
			setPreviews(newPreviews);
		} else {
			setInfo({ ...info, [name]: value });
		}
	};
	return (
		<FormContext.Provider
			value={{ info, previews, errors, validate, handleChange }}
		>
			{children}
		</FormContext.Provider>
	);
};
