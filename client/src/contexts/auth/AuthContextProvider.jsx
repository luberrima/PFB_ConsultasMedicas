import { useState } from 'react';
import { AuthContext } from './AuthContext.js';
import { getFromLocalStorage, setToLocalStorage } from '../../utils/helpers.js';
import { toast } from 'react-toastify';
import { getOwnUserService } from '../../services/fetchApi.js';

export const AuthContextProvider = ({ children }) => {
	const [token, setToken] = useState(
		getFromLocalStorage('travelToken') || null
	);
	const [currentUser, setCurrentUser] = useState(null);

	const onLogin = async (token) => {
		try {
			setToken(token);
			setToLocalStorage('travelToken', token);

			const response = await getOwnUserService(token);

			if (response.ok) {
				const result = await response.json();
				setCurrentUser(result.data);
				toast.info('Bienvenido 🎉');
			} else {
				localStorage.removeItem('travelToken');
				setToken(null);
				setCurrentUser(null);

				const error = await response.json();
				throw new Error(error.message || 'Error de autenticación');
			}
		} catch (error) {
			localStorage.removeItem('travelToken');
			setToken(null);
			setCurrentUser(null);

			throw error;
		}
	};
	const onLogout = () => {
		localStorage.removeItem('travelToken');
		setToken(null);
		setCurrentUser(null);

		toast.info('Hasta luego 👋');
	};
	return (
		<AuthContext.Provider value={{ token, currentUser, onLogin, onLogout }}>
			{children}
		</AuthContext.Provider>
	);
};
