import { ConsultForm } from '../components/forms/ConsultForm.jsx';

import { FormContextProvider } from '../contexts/forms/FormContextProvider.jsx';
import { useProtect } from '../hooks/useProtect.js';

export const NewConsultPage = () => {
	useProtect('/new-travel');

	return (
		<>
			<h2>Nueva Consulta </h2>
			<FormContextProvider>
				<ConsultForm />
			</FormContextProvider>
		</>
	);
};