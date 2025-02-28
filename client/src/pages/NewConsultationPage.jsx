import React from 'react'
import { ConsultForm } from '../components/newconsult/ConsultForm.jsx';

import { FormContextProvider } from '../contexts/forms/FormContextProvider.jsx';
import { useProtect } from '../hooks/useProtect.js';


 export const NewConsultationPage = () => {
  useProtect('/new-travel');

	return (
		<>
			<h2>New Travel Page</h2>
			<FormContextProvider>
				<ConsultForm />
			</FormContextProvider>
		</>
	);
}


