import { useContext } from 'react';
import { AuthContext } from '../contexts/auth/AuthContext.js';

export const useAuth = () => {
	const { token, currentUser, onLogin, onLogout } = useContext(AuthContext);

	return {
		token,
		currentUser,
		onLogin,
		onLogout,
	};
};
