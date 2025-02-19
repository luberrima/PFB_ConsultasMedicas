import { genereErrorUtils } from './genereErrorUtils.js';

export const validateSchemaUtil = async (schema, data) => {
	try {
		await schema.validateAsync(data, {
			abortEarly: false,
			allowUnknown: false,
			stripUnknown: true,
		});
	} catch (error) {
		throw genereErrorUtils(400, 'BAD_DATA', error.message);
	}
};
