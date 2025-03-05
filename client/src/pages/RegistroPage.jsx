import { RegisterForm } from '../components/forms/RegisterForm';
import { FormContextProvider } from '../contexts/forms/FormContextProvider.jsx';

export const RegistroPage = () => {
    return (
        <div>
            <h2>Registro</h2>
            <FormContextProvider>
                <RegisterForm />
            </FormContextProvider>
        </div>
    );
};
