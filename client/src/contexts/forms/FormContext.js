import { createContext } from 'react';

export const FormContext = createContext({
	info: {},
	previews: [],
	errors: [],
	validate: () => undefined,
	handleChange: () => undefined,
});
