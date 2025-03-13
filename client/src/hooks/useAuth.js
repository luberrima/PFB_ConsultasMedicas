import { useContext } from 'react';
import { AuthContext } from '../contexts/auth/AuthContext.js';

export const useAuth = () => {
	const { token, currentUser, onLogin, onLogOut } = useContext(AuthContext);

	return {
		token,
		currentUser,
		onLogin,
		onLogOut,
	};
};